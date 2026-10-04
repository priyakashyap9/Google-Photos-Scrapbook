// Photo Filtering Utilities for Google Photos Smart Search
import { getCurrentMonthNumber } from './dateUtils';

/**
 * Merge initial mock photos with user saved notes from localStorage
 */
export function getPhotosWithUserNotes(photos, userNotes = {}) {
  return photos.map(photo => {
    const userNote = userNotes[photo.id];
    return {
      ...photo,
      user_note: userNote !== undefined ? userNote : null,
      // Active display note prioritizes user note if present, else default memory_note
      effective_note: userNote !== undefined && userNote !== null ? userNote : (photo.memory_note || '')
    };
  });
}

/**
 * Filter photos by text query and optional smart filter chip
 */
export function filterPhotos(photos, query = '', activeChip = null, userNotes = {}) {
  const photosWithNotes = getPhotosWithUserNotes(photos, userNotes);
  const q = (query || '').toLowerCase().trim();

  let results = photosWithNotes;

  // 1. Apply Active Chip Filters if specified
  if (activeChip) {
    if (activeChip.type === 'seasonal') {
      const currentMonth = getCurrentMonthNumber();
      results = results.filter(p => p.month === currentMonth);
    } else if (activeChip.type === 'notes') {
      results = results.filter(p => (p.user_note && p.user_note.trim().length > 0) || (p.memory_note && p.memory_note.trim().length > 0));
    } else if (activeChip.type === 'person') {
      const targetPerson = (activeChip.value || 'Sarah').toLowerCase();
      results = results.filter(p =>
        p.people_tagged && p.people_tagged.some(person => person.toLowerCase().includes(targetPerson))
      );
    } else if (activeChip.type === 'location') {
      const targetLoc = (activeChip.value || 'Site B').toLowerCase();
      results = results.filter(p =>
        p.location && p.location.toLowerCase().includes(targetLoc)
      );
    } else if (activeChip.type === 'season_name') {
      const targetSeason = (activeChip.value || 'Fall').toLowerCase();
      results = results.filter(p =>
        p.season && p.season.toLowerCase() === targetSeason
      );
    } else if (activeChip.type === 'category') {
      const targetCat = (activeChip.value || '').toLowerCase();
      results = results.filter(p =>
        p.category && p.category.toLowerCase() === targetCat
      );
    }
  }

  // 2. Apply Text Search Query if provided
  if (q.length > 0) {
    results = results.filter(p => {
      const filenameMatch = p.filename.toLowerCase().includes(q);
      const locationMatch = p.location.toLowerCase().includes(q);
      const seasonMatch = p.season.toLowerCase().includes(q);
      const categoryMatch = p.category ? p.category.toLowerCase().includes(q) : false;
      const yearMatch = p.year.toString().includes(q);
      const peopleMatch = p.people_tagged && p.people_tagged.some(person => person.toLowerCase().includes(q));
      const memoryNoteMatch = p.memory_note ? p.memory_note.toLowerCase().includes(q) : false;
      const userNoteMatch = p.user_note ? p.user_note.toLowerCase().includes(q) : false;
      const effectiveNoteMatch = p.effective_note ? p.effective_note.toLowerCase().includes(q) : false;

      return (
        filenameMatch ||
        locationMatch ||
        seasonMatch ||
        categoryMatch ||
        yearMatch ||
        peopleMatch ||
        memoryNoteMatch ||
        userNoteMatch ||
        effectiveNoteMatch
      );
    });
  }

  return results;
}
