export async function rateLimiter(ip) {
    const redisKey = `rate_limit:${ip}`;
    const maxRequests = 10;
    const timeWindow = 60;

    try {
        const [incrementResult] = await redisClient
            .multi()
            .incr(redisKey)
            .expire(redisKey, timeWindow)
            .exec();

        return incrementResult <= maxRequests;
    } catch (error) {
        console.error('Error in rate limiter:', error);
        return false;  
    }
}
