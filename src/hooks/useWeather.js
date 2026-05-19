import { useState, useEffect } from 'react';
import { api } from '../api/client';

export default function useWeather() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  async function fetchWeather() {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await api.get('/weather');
      setState({ loading: false, error: null, data });
    } catch (err) {
      setState({ loading: false, error: err.message, data: null });
    }
  }

  useEffect(() => { fetchWeather(); }, []);

  return { ...state, refresh: fetchWeather };
}
