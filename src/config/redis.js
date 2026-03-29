import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://redis:6379",
  socket: {
    reconnectStrategy: false,
  },
});
redisClient.on("error", () => {});

let isConnected = false;

try {
  await redisClient.connect();
  isConnected = true;
  console.log("Redis connected");
} catch (error) {
  console.log("Redis unavailable, running without cache:", error.message);
}

export { redisClient, isConnected };
