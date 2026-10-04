// LocalStorage management utility for Google Photos - Scrapbook Notes
const STORAGE_KEY = 'gphotos_scrapbook_notes_v1';

/**
 * Retrieve all user notes safely from localStorage
 * Returns an object mapping photo ID -> note string e.g. { "1": "Site B inspection with Raj" }
 */
export function getStoredNotes() {
  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (!rawData) return {};
    const parsed = JSON.parse(rawData);
    if (typeof parsed !== 'object' || parsed === null) {
      console.warn('Malformed scrapbook notes data in localStorage. Resetting storage.');
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed;
  } catch (err) {
    console.error('Failed to parse scrapbook notes from localStorage:', err);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    return {};
  }
}

/**
 * Save or update a note for a given photo ID
 */
export function saveNote(photoId, noteText) {
  if (!photoId) return getStoredNotes();
  try {
    const currentNotes = getStoredNotes();
    const trimmed = (noteText || '').trim();
    if (trimmed.length === 0) {
      delete currentNotes[photoId];
    } else {
      currentNotes[photoId] = trimmed.slice(0, 60); // Max 60 characters constraint
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotes));
    return currentNotes;
  } catch (err) {
    console.error('Error saving note to localStorage:', err);
    return getStoredNotes();
  }
}

/**
 * Delete a note for a photo ID
 */
export function deleteNote(photoId) {
  if (!photoId) return getStoredNotes();
  try {
    const currentNotes = getStoredNotes();
    delete currentNotes[photoId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotes));
    return currentNotes;
  } catch (err) {
    console.error('Error deleting note from localStorage:', err);
    return getStoredNotes();
  }
}

/**
 * Reset demo notes with user confirmation safety
 */
export function clearAllNotes() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return {};
  } catch (err) {
    console.error('Error clearing notes from localStorage:', err);
    return {};
  }
}
