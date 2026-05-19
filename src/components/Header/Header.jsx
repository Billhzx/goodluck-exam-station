import styles from './Header.module.css';

function formatDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[now.getDay()];
  return `${year}年${month}月${day}日 星期${weekDay}`;
}

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>好运🪷🪷的备考小站</h1>
      <p className={styles.date}>{formatDate()}</p>
    </header>
  );
}
