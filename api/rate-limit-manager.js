import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const RATE_LIMIT_KEY = "spotify:rate-limited";

export async function isRateLimited() {
  const limited = await redis.get(RATE_LIMIT_KEY);
  return limited !== null;
}

export async function getRateLimitInfo() {
  const limited = await redis.get(RATE_LIMIT_KEY);
  if (!limited) return { isLimited: false };

  // redis.ttl() returns remaining seconds on the key
  const remainingSeconds = await redis.ttl(RATE_LIMIT_KEY);
  return {
    isLimited: true,
    remainingSeconds,
    remainingMs: remainingSeconds * 1000,
  };
}

export async function setRateLimit(retryAfterSeconds) {
  await redis.set(RATE_LIMIT_KEY, "1", { ex: retryAfterSeconds });
  console.log(`Rate limited for ${retryAfterSeconds} seconds`);
}

export async function handleRateLimitResponse(response) {
  if (response.status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const retryAfterSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;

    await setRateLimit(retryAfterSeconds);
    return {
      isRateLimited: true,
      retryAfterSeconds,
      message: `Rate limited. Retry after ${retryAfterSeconds} seconds.`,
    };
  }

  return { isRateLimited: false };
}
