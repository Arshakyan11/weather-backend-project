import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries >= 2) {
        return new Error("Retry attempts exhausted");
      }
      return 1000;
    },
  },
});

let isConnected = false;

redisClient.on("connect", () => {
  isConnected = true;
  console.log("Redis connected");
});

redisClient.on("end", () => {
  isConnected = false;
  console.log("Redis disconnected");
});

redisClient.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.log("Redis is not running (connection refused)");
  } else {
    console.log("Redis error:", err.message);
  }
});
export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log("Redis unavailable, running without cache:", error.message);
  }
};

export { redisClient, isConnected };
