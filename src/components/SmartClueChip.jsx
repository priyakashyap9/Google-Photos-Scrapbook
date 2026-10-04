import React from 'react';

/**
 * Individual Smart Clue Chip Pill
 */
export function SmartClueChip({
  chip,
  isActive,
  onSelect
}) {
  return (
    <button
      className={`smart-clue-chip ${isActive ? 'active' : ''} ${chip.variant || 'default'}`}
      onClick={() => onSelect(chip)}
      aria-pressed={isActive}
    >
      <span className="chip-label">{chip.label}</span>
      {chip.count !== undefined && (
        <span className="chip-badge-count">{chip.count}</span>
      )}
    </button>
  );
}
