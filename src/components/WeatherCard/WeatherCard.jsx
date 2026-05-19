import useWeather from '../../hooks/useWeather';
import { getWeatherInfo } from '../../utils/weatherCodes';
import styles from './WeatherCard.module.css';

export default function WeatherCard() {
  const { loading, error, data, refresh } = useWeather();

  return (
    <div className="card">
      <div className={styles.header}>
        <h3 className={styles.heading}>🌸 兰州天气</h3>
        <button className={styles.refreshBtn} onClick={refresh} title="刷新天气">🔄</button>
      </div>

      {loading && (
        <div className={styles.skeleton}>
          <div className={styles.skelIcon} />
          <div className={styles.skelTemp} />
          <div className={styles.skelText} />
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <span>天气获取失败 🥺</span>
          <button className={styles.retryBtn} onClick={refresh}>重试</button>
        </div>
      )}

      {data && (
        <div className={styles.body}>
          <div className={styles.main}>
            <span className={styles.icon}>{getWeatherInfo(data.weatherCode).icon}</span>
            <span className={styles.temp}>{data.temp}°C</span>
          </div>
          <p className={styles.desc}>{getWeatherInfo(data.weatherCode).description}</p>
          <div className={styles.details}>
            <span>💧 {data.humidity}%</span>
            <span>🔺 {data.high}°</span>
            <span>🔻 {data.low}°</span>
          </div>
        </div>
      )}
    </div>
  );
}
