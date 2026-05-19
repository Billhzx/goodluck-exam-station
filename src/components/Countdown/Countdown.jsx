import { useState, useEffect } from 'react';
import { getCountdown } from '../../utils/dateUtils';
import styles from './Countdown.module.css';

const EXAM_DATE = '2026-12-19';

export default function Countdown() {
  const [time, setTime] = useState(() => getCountdown(EXAM_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCountdown(EXAM_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (time.passed) {
    return (
      <div className="card">
        <div className={styles.passed}>
          <span className={styles.passedIcon}>🎉</span>
          <p>恭喜上岸！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className={styles.heading}>📚 考研倒计时</h3>
      <div className={styles.timer}>
        <div className={styles.block}>
          <span className={styles.number}>{time.days}</span>
          <span className={styles.label}>天</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.block}>
          <span className={styles.number}>{String(time.hours).padStart(2, '0')}</span>
          <span className={styles.label}>时</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.block}>
          <span className={styles.number}>{String(time.minutes).padStart(2, '0')}</span>
          <span className={styles.label}>分</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.block}>
          <span className={styles.number}>{String(time.seconds).padStart(2, '0')}</span>
          <span className={styles.label}>秒</span>
        </div>
      </div>
      <p className={styles.motto}>加油！每一天都很珍贵！💖</p>
    </div>
  );
}
