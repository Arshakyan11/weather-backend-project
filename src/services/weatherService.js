import axios from "axios";
import { isConnected, redisClient } from "../config/redis.js";

export const getWeatherService = async (city) => {
  const editedCity = city.trim().toLowerCase();
  const cacheKey = `weather:${editedCity}`;
  if (isConnected) {
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("FROM REDIS");
        return JSON.parse(cachedData);
      }
    } catch (error) {
      console.log("Redis read error:", error.message);
    }
  }

  let result;
  try {
    result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${editedCity}&appid=${process.env.WEATHER_API_KEY}`,
    );
  } catch (err) {
    const error = new Error(
      err.response?.data?.message || "Failed to fetch weather data",
    );
    error.status = err.response?.status || 500;
    throw error;
  }

  if (isConnected) {
    try {
      await redisClient.setEx(
        cacheKey,
        Number(process.env.REDIS_TTL) || 100,
        JSON.stringify(result.data),
      );
    } catch (error) {
      console.log("Redis write error:", error.message);
    }
  }
  console.log("FROM API");
  return result.data;
};
