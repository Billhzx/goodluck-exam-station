import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { todayStr } from '../../utils/dateUtils';
import styles from './StudyNotes.module.css';

export default function StudyNotes() {
  const [notes, setNotes] = useLocalStorage('exam-prep-notes', []);
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [content, setContent] = useState(() => {
    const entry = (notes).find(n => n.date === todayStr());
    return entry ? entry.content : '';
  });

  function switchDate(dateStr) {
    setSelectedDate(dateStr);
    const entry = notes.find(n => n.date === dateStr);
    setContent(entry ? entry.content : '');
  }

  function saveNote() {
    if (!content.trim()) {
      setNotes(notes.filter(n => n.date !== selectedDate));
    } else {
      const existing = notes.find(n => n.date === selectedDate);
      if (existing) {
        setNotes(notes.map(n => n.date === selectedDate
          ? { ...n, content: content.trim(), updatedAt: new Date().toISOString() }
          : n
        ));
      } else {
        setNotes([...notes, { date: selectedDate, content: content.trim(), updatedAt: new Date().toISOString() }]);
      }
    }
  }

  const hasContent = content.trim().length > 0;
  const isToday = selectedDate === todayStr();

  return (
    <div className="card">
      <h3 className={styles.heading}>📖 每日备考记录</h3>

      <div className={styles.dateRow}>
        <input
          type="date"
          className={styles.dateInput}
          value={selectedDate}
          onChange={e => switchDate(e.target.value)}
          max={todayStr()}
        />
        {!isToday && (
          <span className={styles.dateHint}>查看历史记录</span>
        )}
      </div>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={isToday ? "今天学了什么？记录一下吧 🪷\n\n例：复习高数第三章，做了30道练习题..." : "该日期暂无记录"}
        rows={5}
      />

      {isToday && (
        <button className={styles.saveBtn} onClick={saveNote}>
          {hasContent ? '💾 保存记录' : '📝 开始记录'}
        </button>
      )}

      {!isToday && !hasContent && (
        <p className={styles.empty}>这一天还没有记录哦 🪷</p>
      )}

      {!isToday && hasContent && (
        <p className={styles.savedHint}>✅ 该日已有记录</p>
      )}
    </div>
  );
}
