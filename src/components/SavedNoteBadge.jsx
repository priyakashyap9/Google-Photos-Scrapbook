import React from 'react';
import { MessageSquareText, Edit2, Trash2 } from 'lucide-react';

/**
 * Saved Note Badge displaying persistent memory notes
 */
export function SavedNoteBadge({
  noteText,
  onEdit,
  onDelete,
  compact = false
}) {
  if (!noteText || noteText.trim().length === 0) return null;

  return (
    <div className={`saved-note-badge ${compact ? 'compact' : 'full'}`}>
      <div className="saved-note-content">
        <span className="saved-note-icon">💭</span>
        <span className="saved-note-text">{noteText}</span>
      </div>

      {!compact && (onEdit || onDelete) && (
        <div className="saved-note-actions">
          {onEdit && (
            <button
              className="note-action-btn edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              title="Edit Note"
              aria-label="Edit Note"
            >
              <Edit2 size={14} />
            </button>
          )}
          {onDelete && (
            <button
              className="note-action-btn delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete Note"
              aria-label="Delete Note"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
