import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.REACT_APP_API_KEY;

app.get("/api/weather", async (req, res) => {
  const city = req.query.q;

  if (!city) {
    return res.status(400).json({ error: "Missing 'q' parameter (city name)" });
  }

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
