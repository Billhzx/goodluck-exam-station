import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    try { setTodos(await api.get('/todos')); } catch (e) { console.warn(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const addTodo = async (text) => {
    const todo = await api.post('/todos', { text });
    setTodos(prev => [...prev, todo]);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    const updated = await api.patch(`/todos/${id}`, { completed: !todo.completed });
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return { todos, loading, addTodo, toggleTodo, deleteTodo };
}
