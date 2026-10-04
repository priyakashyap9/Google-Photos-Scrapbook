import React from 'react';
import { SearchX, Sparkles, RefreshCw } from 'lucide-react';

/**
 * Polished Empty State component when search returns 0 results
 */
export function EmptyState({
  searchQuery,
  activeChip,
  onResetSearch
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon-wrapper">
        <SearchX size={48} className="empty-state-icon" />
      </div>

      <h3 className="empty-state-title">No memories found</h3>
      
      <p className="empty-state-subtitle">
        {searchQuery ? (
          <>We couldn't find any photos matching "<strong>{searchQuery}</strong>".</>
        ) : activeChip ? (
          <>No photos found under the "<strong>{activeChip.label}</strong>" filter.</>
        ) : (
          'Try another search or explore a smart clue.'
        )}
      </p>

      <p className="empty-state-hint">
        Try typing location keywords like <em>"Site B"</em>, people like <em>"Sarah"</em> or <em>"Raj"</em>, or tap a Smart Clue chip above.
      </p>

      {onResetSearch && (
        <button
          className="empty-state-btn"
          onClick={onResetSearch}
        >
          <RefreshCw size={16} className="mr-2" />
          <span>Show All Photos</span>
        </button>
      )}
    </div>
  );
}
