import { useState, useMemo, useCallback } from 'react';
import { filterPhotos } from '../utils/photoFilters';

/**
 * Custom hook for smart search logic with live query filtering and chip support
 */
export function usePhotoSearch(photos, userNotes) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState(null);

  // Compute filtered photos whenever query, chip, photos, or notes change
  const filteredPhotos = useMemo(() => {
    return filterPhotos(photos, searchQuery, activeChip, userNotes);
  }, [photos, searchQuery, activeChip, userNotes]);

  const handleQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSelectChip = useCallback((chip) => {
    if (activeChip && activeChip.id === chip.id) {
      // Toggle off if clicking same active chip
      setActiveChip(null);
    } else {
      setActiveChip(chip);
      if (chip.queryText) {
        setSearchQuery(chip.queryText);
      }
    }
  }, [activeChip]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setActiveChip(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleQueryChange,
    activeChip,
    setActiveChip: handleSelectChip,
    filteredPhotos,
    clearSearch: handleClearSearch,
    totalCount: photos.length,
    filteredCount: filteredPhotos.length
  };
}
