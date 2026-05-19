import { useState, useEffect } from 'react';
import { getWeatherInfo } from '../utils/weatherCodes';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=36.06&longitude=103.79&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Shanghai&forecast_days=1';

export default function useWeather() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  async function fetchWeather() {
    setState({ loading: true, error: null, data: null });
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error('网络请求失败');
      const json = await res.json();
      const current = json.current;
      const daily = json.daily;
      setState({
        loading: false,
        error: null,
        data: {
          temp: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          weatherCode: current.weather_code,
          high: daily.temperature_2m_max[0],
          low: daily.temperature_2m_min[0],
          dailyCode: daily.weather_code[0],
        },
      });
    } catch (err) {
      setState({ loading: false, error: err.message, data: null });
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return { ...state, refresh: fetchWeather };
}
