import { getValidAccessToken } from "./token-manager.js";
import {
  isRateLimited,
  getRateLimitInfo,
  handleRateLimitResponse,
} from "./rate-limit-manager.js";

// Fetch preview URL from Spotify embed page (workaround for deprecated preview_url)
// Source - https://stackoverflow.com/a/79238027
// Posted by Diego Perez, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-18, License - CC BY-SA 4.0
async function fetchPreviewUrlFromEmbed(trackId) {
  if (!trackId) return null;

  try {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    const response = await fetch(embedUrl);

    if (!response.ok) {
      console.log(`Failed to fetch embed page: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // Look for the audioPreview URL in the HTML
    // It's typically embedded in a script tag with JSON data
    const regex = /"audioPreview":\s*{\s*"url":\s*"([^"]+)"/;
    const match = html.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    // Alternative pattern - sometimes it's nested differently
    const altRegex = /"audioPreview":\s*"([^"]+)"/;
    const altMatch = html.match(altRegex);

    if (altMatch && altMatch[1]) {
      return altMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Error fetching preview URL from embed:", error);
    return null;
  }
}

export default async function handler(req, res) {
  // Cache at Vercel's edge CDN — 3 min fresh, serve stale while revalidating for 30s
  res.setHeader("Cache-Control", "s-maxage=180, stale-while-revalidate=30");

  // Check if we're rate limited before making any requests
  if (isRateLimited()) {
    const rateLimitInfo = getRateLimitInfo();
    return res.status(429).json({
      error: "Rate limited",
      message: `Please wait ${rateLimitInfo.remainingSeconds} seconds before retrying`,
      retryAfter: rateLimitInfo.remainingSeconds,
    });
  }

  try {
    const accessToken = await getValidAccessToken();

    const spRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const rateLimitResult = handleRateLimitResponse(spRes);
    if (rateLimitResult.isRateLimited) {
      return res.status(429).json({
        error: "Spotify rate limit exceeded",
        message: rateLimitResult.message,
        retryAfter: rateLimitResult.retryAfterSeconds,
      });
    }

    if (spRes.status === 204) {
      // Nothing currently playing, fetch recently played track
      console.log("Calling recently played");
      try {
        const recentlyPlayedRes = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        console.log("recentlyPlayedRes", recentlyPlayedRes);
        if (recentlyPlayedRes.ok) {
          const recentData = await recentlyPlayedRes.json();

          if (recentData.items && recentData.items.length > 0) {
            const lastTrack = recentData.items[0].track;

            let previewUrl = lastTrack.preview_url;
            if (!previewUrl && lastTrack.id) {
              console.log(
                `Preview URL not in API response, fetching from embed for recently played track ${lastTrack.id}`,
              );
              previewUrl = await fetchPreviewUrlFromEmbed(lastTrack.id);
            }

            return res.status(200).json({
              is_playing: false,
              recently_played: true,
              played_at: recentData.items[0].played_at,
              item: {
                id: lastTrack.id,
                name: lastTrack.name,
                artists: lastTrack.artists.map((a) => a.name),
                album: lastTrack.album?.name,
                album_image: lastTrack.album?.images?.[0]?.url,
                spotify_url: lastTrack.external_urls?.spotify,
                preview_url: previewUrl,
              },
            });
          }
        }
      } catch (recentError) {
        console.error("Error fetching recently played:", recentError);
      }

      return res.status(200).json({ is_playing: false, item: null });
    }

    if (!spRes.ok) {
      const text = await spRes.text();
      return res.status(spRes.status).json({
        error: "Spotify API error",
        details: text,
      });
    }

    const now = await spRes.json();

    let previewUrl = now.item?.preview_url;
    if (!previewUrl && now.item?.id) {
      console.log(
        `Preview URL not in API response, fetching from embed for track ${now.item.id}`,
      );
      previewUrl = await fetchPreviewUrlFromEmbed(now.item.id);
    }

    const simplified = {
      is_playing: now.is_playing,
      progress_ms: now.progress_ms,
      item: now.item
        ? {
            id: now.item.id,
            name: now.item.name,
            artists: now.item.artists.map((a) => a.name),
            album: now.item.album?.name,
            album_image: now.item.album?.images?.[0]?.url,
            spotify_url: now.item.external_urls?.spotify,
            preview_url: previewUrl,
          }
        : null,
    };

    return res.status(200).json(simplified);
  } catch (error) {
    console.error("Error in now-playing API:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
