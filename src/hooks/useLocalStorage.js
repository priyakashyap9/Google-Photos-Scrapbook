import { useState, useEffect, useCallback } from 'react';
import { getStoredNotes, saveNote, deleteNote, clearAllNotes } from '../utils/storage';

/**
 * Custom hook to manage user scrapbook notes with localStorage persistence
 */
export function useLocalStorage() {
  const [userNotes, setUserNotes] = useState(() => getStoredNotes());

  // Listen for storage events across tabs or external updates
  useEffect(() => {
    const handleStorageChange = () => {
      setUserNotes(getStoredNotes());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSaveNote = useCallback((photoId, noteText) => {
    const updated = saveNote(photoId, noteText);
    setUserNotes({ ...updated });
    return updated;
  }, []);

  const handleDeleteNote = useCallback((photoId) => {
    const updated = deleteNote(photoId);
    setUserNotes({ ...updated });
    return updated;
  }, []);

  const handleClearAllNotes = useCallback(() => {
    const updated = clearAllNotes();
    setUserNotes({ ...updated });
    return updated;
  }, []);

  return {
    userNotes,
    saveNote: handleSaveNote,
    deleteNote: handleDeleteNote,
    clearAllNotes: handleClearAllNotes
  };
}
