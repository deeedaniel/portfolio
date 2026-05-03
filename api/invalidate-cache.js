import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  // Only allow POST with the correct secret
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = req.headers["x-invalidate-secret"];
  if (secret !== process.env.CACHE_INVALIDATION_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const keys = [
    "spotify:top-tracks",
    "spotify:now-playing",
    "leetcode:deeedaniel:stats",
  ];

  await Promise.all(keys.map((key) => redis.del(key)));

  return res.status(200).json({ invalidated: keys });
}
