import { getWeatherService } from "../services/weatherService.js";
export const getWeather = async (req, res, next) => {
  try {
    const city = req.params.city;
    const data = await getWeatherService(city);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
