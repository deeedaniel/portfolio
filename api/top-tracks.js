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

    const regex = /"audioPreview":\s*{\s*"url":\s*"([^"]+)"/;
    const match = html.match(regex);

    if (match && match[1]) {
      return match[1];
    }

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
  // Cache at Vercel's edge CDN — 24h fresh, serve stale for up to 1h while revalidating
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");

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
      "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const rateLimitResult = handleRateLimitResponse(spRes);
    if (rateLimitResult.isRateLimited) {
      return res.status(429).json({
        error: "Spotify rate limit exceeded",
        message: rateLimitResult.message,
        retryAfter: rateLimitResult.retryAfterSeconds,
      });
    }

    if (!spRes.ok) {
      const text = await spRes.text();
      return res.status(spRes.status).json({
        error: "Spotify API error",
        details: text,
      });
    }

    const data = await spRes.json();

    const simplified = await Promise.all(
      data.items.map(async (track) => {
        let previewUrl = track.preview_url;
        if (!previewUrl && track.id) {
          console.log(
            `Preview URL not in API response, fetching from embed for track ${track.id}`
          );
          previewUrl = await fetchPreviewUrlFromEmbed(track.id);
        }

        return {
          id: track.id,
          name: track.name,
          artists: track.artists.map((a) => a.name).join(", "),
          album: track.album.name,
          album_image: track.album.images[0]?.url,
          spotify_url: track.external_urls.spotify,
          preview_url: previewUrl,
        };
      })
    );

    return res.status(200).json({ tracks: simplified });
  } catch (error) {
    console.error("Error in top-tracks API:", error);
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
