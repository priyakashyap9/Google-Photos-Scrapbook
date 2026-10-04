import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

/**
 * Google Photos Modern SearchBar with Live Typing Filtering
 */
export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search your photos",
  activeChip = null
}) {
  return (
    <div className="search-bar-container">
      <div className={`search-bar-pill ${value || activeChip ? 'has-active' : ''}`}>
        <Search className="search-icon" size={20} />
        
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search photos"
        />

        {(value || activeChip) && (
          <button
            className="search-clear-btn"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {activeChip && (
        <div className="active-chip-indicator">
          <span>Filtering by: <strong>{activeChip.label}</strong></span>
          <button onClick={onClear} className="indicator-remove" title="Remove filter">✕</button>
        </div>
      )}
    </div>
  );
}
