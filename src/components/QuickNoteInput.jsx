import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles, X } from 'lucide-react';

/**
 * Floating Quick Memory Note Input component for PhotoViewer
 */
export function QuickNoteInput({
  initialValue = '',
  onSaveNote,
  onCancel
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(initialValue || '');
  }, [initialValue]);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length > 0) {
      onSaveNote(trimmed);
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      if (onCancel) onCancel();
    }
  };

  const charCount = text.length;

  return (
    <div className={`quick-note-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {!isExpanded ? (
        <button
          className="quick-note-trigger"
          onClick={handleExpand}
          aria-label="Add memory note"
        >
          <span className="trigger-icon">💭</span>
          <span className="trigger-placeholder">
            {initialValue ? initialValue : 'Add a quick memory note...'}
          </span>
          <Sparkles className="sparkle-icon" size={16} />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="quick-note-form">
          <div className="input-wrapper">
            <span className="input-prefix-icon">💭</span>
            <input
              ref={inputRef}
              type="text"
              className="quick-note-input-field"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 60))}
              onKeyDown={handleKeyDown}
              placeholder="Add a quick memory note..."
              maxLength={60}
            />
            <span className={`char-counter ${charCount >= 55 ? 'near-limit' : ''}`}>
              {charCount}/60
            </span>
          </div>

          <div className="quick-note-actions">
            <button
              type="button"
              className="quick-note-btn cancel"
              onClick={() => {
                setIsExpanded(false);
                setText(initialValue || '');
                if (onCancel) onCancel();
              }}
              title="Cancel"
            >
              <X size={16} />
            </button>
            <button
              type="submit"
              className="quick-note-btn submit"
              disabled={text.trim().length === 0}
              title="Save Note"
            >
              <Check size={16} />
              <span>Done</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
