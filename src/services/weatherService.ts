
export interface WeatherData {
  temp: number;
  condition: string;
  isCold: boolean;
}

export async function fetchDuhokWeather(): Promise<WeatherData> {
  // 1. Try local server proxy first (avoids browser iframe sandbox/CORS restrictions)
  try {
    const res = await fetch('/api/weather');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.temp === 'number') {
        return {
          temp: Math.round(data.temp),
          condition: data.condition || getWeatherCondition(data.weathercode ?? 0),
          isCold: data.isCold ?? data.temp < 22,
        };
      }
    }
  } catch {
    // Continue to fallback
  }

  // 2. Direct client-side fetch fallback
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=36.8659&longitude=42.9882&current_weather=true'
    );
    if (response.ok) {
      const data = await response.json();
      const current = data?.current_weather;
      if (current && typeof current.temperature === 'number') {
        const temp = Math.round(current.temperature);
        return {
          temp,
          condition: getWeatherCondition(current.weathercode ?? 0),
          isCold: temp < 22,
        };
      }
    }
  } catch {
    // Fall through to default
  }

  // 3. Graceful seasonal default for Duhok, Kurdistan
  return { temp: 28, condition: 'Clear sky', isCold: false };
}

function getWeatherCondition(code: number): string {
  // Simple mapping based on WMO Weather interpretation codes
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain showers';
  if (code <= 99) return 'Thunderstorm';
  return 'Clear';
}
