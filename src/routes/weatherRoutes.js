import { getWeather } from "../controllers/weatherController.js";
import express from "express";

const router = express.Router();
router.get("/weather/:city", getWeather);
router.get("/", (req, res) => {
  res.send("Hello");
});

export default router;
