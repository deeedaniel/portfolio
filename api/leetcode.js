import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const CACHE_KEY = "leetcode:deeedaniel:stats";
const CACHE_TTL_SECONDS = 60 * 60;

// LeetCode username - update this in src/data/info.ts
const username = "deeedaniel";

export default async function handler(req, res) {
  const cached = await redis.get(CACHE_KEY);

  if (cached) {
    return res.status(200).json({ ...cached, cached: true });
  }

  try {
    const response = await fetch(
      `https://leetcode-stats.tashif.codes/${username}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch LeCode stats: ${response.statusText}`);
    }

    const data = await response.json();

    const stats = {
      easySolved: data.easySolved,
      hardSolved: data.hardSolved,
      mediumSolved: data.mediumSolved,
      totalSolved: data.totalSolved,
      submissionCalendar: data.submissionCalendar,
    };

    await redis.set(CACHE_KEY, stats, { ex: CACHE_TTL_SECONDS });

    res.status(200).json({ ...stats, cached: false });
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);

    if (cachedStats) {
      return res.status(200).json({
        ...cachedStats,
        cached: true,
        warning: "API error, showing internal cached data",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
