import { createClient } from 'redis';

// const redisClient = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// });

 const redisClient = createClient({
  url: process.env.REDIS_URL,
});
 
redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export const connectRedis = async () => {
    try {
        if (!isConnected) {
            await redisClient.connect();
            isConnected = true;
            console.log("Connected to Redis!");
        }
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
};

export const disconnectRedis = async () => {
    await redisClient.quit();
};

export default redisClient;
