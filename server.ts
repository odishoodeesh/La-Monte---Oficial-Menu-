import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Weather API proxy to prevent client-side iframe fetch/CORS errors
  let cachedWeather: { data: any; timestamp: number } | null = null;

  app.get("/api/weather", async (_req, res) => {
    const now = Date.now();
    // Cache for 15 minutes
    if (cachedWeather && now - cachedWeather.timestamp < 15 * 60 * 1000) {
      return res.json(cachedWeather.data);
    }

    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=36.8659&longitude=42.9882&current_weather=true"
      );
      if (!response.ok) {
        throw new Error(`OpenMeteo HTTP ${response.status}`);
      }
      const data: any = await response.json();
      const current = data?.current_weather;
      const temp = current?.temperature ?? 26;
      const weathercode = current?.weathercode ?? 0;

      const result = {
        temp: Math.round(temp),
        weathercode,
        condition: getConditionText(weathercode),
        isCold: temp < 22,
      };

      cachedWeather = { data: result, timestamp: now };
      res.json(result);
    } catch {
      // Graceful fallback if external service is unreachable
      const fallback = cachedWeather?.data || {
        temp: 26,
        weathercode: 0,
        condition: "Clear sky",
        isCold: false,
      };
      res.json(fallback);
    }
  });

  function getConditionText(code: number): string {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain showers";
    if (code <= 99) return "Thunderstorm";
    return "Clear";
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
