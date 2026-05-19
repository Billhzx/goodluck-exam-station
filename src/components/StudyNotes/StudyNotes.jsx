import { useState } from 'react';
import useNotes from '../../hooks/useNotes';
import { todayStr } from '../../utils/dateUtils';
import styles from './StudyNotes.module.css';

export default function StudyNotes() {
  const { saveNote, getNoteByDate } = useNotes();
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [content, setContent] = useState(() => {
    const entry = getNoteByDate(todayStr());
    return entry ? entry.content : '';
  });

  function switchDate(dateStr) {
    setSelectedDate(dateStr);
    const entry = getNoteByDate(dateStr);
    setContent(entry ? entry.content : '');
  }

  function handleSave() {
    saveNote(selectedDate, content.trim());
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
        placeholder={isToday ? "今天学了什么？记录一下吧 🪷" : "该日期暂无记录"}
        rows={5}
      />

      {isToday && (
        <button className={styles.saveBtn} onClick={handleSave}>
          {hasContent ? '💾 保存记录' : '📝 开始记录'}
        </button>
      )}

      {!isToday && !hasContent && (
        <p className={styles.empty}>这一天还没有记录哦 🪷</p>
      )}
    </div>
  );
}
