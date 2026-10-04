import React from 'react';
import { SearchBar } from './SearchBar';
import { SmartClueChips } from './SmartClueChips';
import { PhotoGrid } from './PhotoGrid';
import { EmptyState } from './EmptyState';
import { Sparkles } from 'lucide-react';

/**
 * Smart Search Screen Component
 */
export function SearchResults({
  searchQuery,
  onSearchChange,
  activeChip,
  onSelectChip,
  onClearSearch,
  filteredPhotos,
  allPhotos,
  userNotes,
  onSelectPhoto
}) {
  const hasFilterActive = Boolean(searchQuery || activeChip);

  return (
    <div className="search-results-page">
      {/* Search Header */}
      <div className="search-header-section">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onClearSearch}
          activeChip={activeChip}
        />

        {/* Smart Clue Chips Carousel */}
        <div className="smart-chips-section">
          <div className="section-label">
            <Sparkles size={14} className="text-amber-500 inline mr-1" />
            <span>Smart Clues & Memory Filters</span>
          </div>
          <SmartClueChips
            activeChip={activeChip}
            onSelectChip={onSelectChip}
            photos={allPhotos}
            userNotes={userNotes}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="results-status-bar">
        {hasFilterActive ? (
          <span className="status-text">
            Found <strong>{filteredPhotos.length}</strong> {filteredPhotos.length === 1 ? 'memory' : 'memories'}
          </span>
        ) : (
          <span className="status-text">
            Explore <strong>{filteredPhotos.length}</strong> photos by seasonal, location, note, or people clues
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="results-content-section">
        {filteredPhotos.length > 0 ? (
          <PhotoGrid
            photos={filteredPhotos}
            onSelectPhoto={onSelectPhoto}
            showHeaders={false}
          />
        ) : (
          <EmptyState
            searchQuery={searchQuery}
            activeChip={activeChip}
            onResetSearch={onClearSearch}
          />
        )}
      </div>
    </div>
  );
}
