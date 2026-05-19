import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try { setNotes(await api.get('/notes')); } catch (e) { console.warn(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const saveNote = async (date, content) => {
    const note = await api.post('/notes', { date, content });
    setNotes(prev => {
      const idx = prev.findIndex(n => n.date === date);
      if (idx >= 0) return prev.map(n => n.date === date ? note : n);
      return [...prev, note];
    });
  };

  const getNoteByDate = (date) => notes.find(n => n.date === date);

  return { notes, loading, saveNote, getNoteByDate };
}
