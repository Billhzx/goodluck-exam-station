import { useState } from 'react';
import useTodos from '../../hooks/useTodos';
import styles from './TodoList.module.css';

export default function TodoList() {
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [text, setText] = useState('');

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setText('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd();
  }

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="card">
      <h3 className={styles.heading}>📝 待办事项</h3>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="🐣 添加备考任务..."
        />
        <button className={styles.addBtn} onClick={handleAdd}>+</button>
      </div>

      {loading && <p className={styles.empty}>加载中...</p>}
      {!loading && todos.length === 0 && (
        <p className={styles.empty}>还没有待办事项 ✨ 加一个吧~</p>
      )}

      <ul className={styles.list}>
        {[...activeTodos, ...completedTodos].map(todo => (
          <li key={todo.id} className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
            <button
              className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.completed ? '❤️' : '🤍'}
            </button>
            <span className={styles.todoText}>{todo.text}</span>
            <button className={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
