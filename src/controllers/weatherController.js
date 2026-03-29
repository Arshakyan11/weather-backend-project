import axios from "axios";
import { redisClient, isConnected } from "../config/redis.js";
export const getWeather = async (req, res, next) => {
  const { city } = req.params;
  try {
    if (isConnected) {
      const cachedData = await redisClient.get(city);
      if (cachedData) {
        console.log("FROM REDIS");
        return res.json(JSON.parse(cachedData));
      }
    }
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`,
    );
    if (isConnected) {
      await redisClient.setEx(city, 100, JSON.stringify(result.data));
    }
    console.log("FROM API");
    res.json(result.data);
  } catch (error) {
    next(error);
  }
};
