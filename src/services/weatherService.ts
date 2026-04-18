
export interface WeatherData {
  temp: number;
  condition: string;
  isCold: boolean;
}

export async function fetchDuhokWeather(): Promise<WeatherData> {
  try {
    // Duhok Coordinates: 36.8659, 42.9882
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.8659&longitude=42.9882&current_weather=true');
    const data = await response.json();
    
    const temp = data.current_weather.temperature;
    
    return {
      temp,
      condition: getWeatherCondition(data.current_weather.weathercode),
      isCold: temp < 22
    };
  } catch (error) {
    console.error('Weather fetch failed:', error);
    // Fallback to reasonable defaults for Duhok if API fails
    return { temp: 25, condition: 'Sunny', isCold: false };
  }
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
