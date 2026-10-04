import React, { useMemo } from 'react';
import { SmartClueChip } from './SmartClueChip';
import { getSeasonalChipLabel, getCurrentMonthNumber } from '../utils/dateUtils';

/**
 * Horizontally Scrollable Carousel of Smart Clue Chips
 */
export function SmartClueChips({
  activeChip,
  onSelectChip,
  photos = [],
  userNotes = {}
}) {
  // Generate list of Smart Clue Chips dynamically
  const chips = useMemo(() => {
    const currentMonthNum = getCurrentMonthNumber();

    // Counts for badge metadata
    const seasonalCount = photos.filter(p => p.month === currentMonthNum).length;
    const noteCount = photos.filter(p => (userNotes[p.id] && userNotes[p.id].trim().length > 0) || (p.memory_note && p.memory_note.trim().length > 0)).length;
    const sarahCount = photos.filter(p => p.people_tagged && p.people_tagged.includes('Sarah')).length;
    const siteBCount = photos.filter(p => p.location && p.location.includes('Site B')).length;

    return [
      {
        id: 'seasonal',
        type: 'seasonal',
        label: getSeasonalChipLabel(),
        queryText: '',
        count: seasonalCount,
        variant: 'seasonal'
      },
      {
        id: 'notes',
        type: 'notes',
        label: '📝 Site B Notes',
        queryText: 'Site B',
        count: noteCount,
        variant: 'notes'
      },
      {
        id: 'person-sarah',
        type: 'person',
        value: 'Sarah',
        label: '👥 Photos with Sarah',
        queryText: 'Sarah',
        count: sarahCount,
        variant: 'person'
      },
      {
        id: 'location-siteb',
        type: 'location',
        value: 'Site B',
        label: '📍 Site B',
        queryText: 'Site B',
        count: siteBCount,
        variant: 'location'
      },
      {
        id: 'category-work',
        type: 'category',
        value: 'Work',
        label: '💼 Work Projects',
        queryText: 'Work',
        variant: 'default'
      },
      {
        id: 'category-travel',
        type: 'category',
        value: 'Travel',
        label: '🌴 Travel',
        queryText: 'Travel',
        variant: 'default'
      }
    ];
  }, [photos, userNotes]);

  return (
    <div className="smart-chips-wrapper">
      <div className="smart-chips-carousel no-scrollbar">
        {chips.map(chip => (
          <SmartClueChip
            key={chip.id}
            chip={chip}
            isActive={activeChip && activeChip.id === chip.id}
            onSelect={onSelectChip}
          />
        ))}
      </div>
    </div>
  );
}
