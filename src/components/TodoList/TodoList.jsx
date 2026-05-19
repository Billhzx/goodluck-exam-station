import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './TodoList.module.css';

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage('exam-prep-todos', []);
  const [text, setText] = useState('');

  function addTodo() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: makeId(), text: trimmed, completed: false, createdAt: new Date().toISOString() }]);
    setText('');
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTodo();
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
        <button className={styles.addBtn} onClick={addTodo}>+</button>
      </div>

      {todos.length === 0 && (
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
