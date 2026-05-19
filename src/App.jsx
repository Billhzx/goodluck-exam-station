import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Countdown from './components/Countdown/Countdown';
import TodoList from './components/TodoList/TodoList';
import StudyNotes from './components/StudyNotes/StudyNotes';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.grid}>
        <WeatherCard />
        <Countdown />
        <TodoList />
        <StudyNotes />
      </main>
      <footer className={styles.footer}>
        <p>💪 每天进步一点点，考研上岸不是梦！🪷</p>
      </footer>
    </div>
  );
}
