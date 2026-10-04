import React, { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Search, Sparkles, MapPin, Calendar, Trash2, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

/**
 * Dedicated Scrapbook Notes view listing all photos with memory notes attached
 */
export function ScrapbookNotesView({
  photos,
  userNotes,
  onSelectPhoto,
  onDeleteNote,
  onResetDemo
}) {
  const [filterQuery, setFilterQuery] = useState('');

  // Collect photos that have an active memory note
  const annotatedPhotos = photos.map(photo => {
    const userNote = userNotes[photo.id];
    const displayNote = userNote !== undefined && userNote !== null ? userNote : photo.memory_note;
    const isUserNote = userNote !== undefined && userNote !== null;
    return {
      ...photo,
      displayNote,
      isUserNote
    };
  }).filter(p => p.displayNote && p.displayNote.trim().length > 0);

  // Apply query search if provided
  const filteredAnnotated = annotatedPhotos.filter(p => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      p.displayNote.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.filename.toLowerCase().includes(q)
    );
  });

  return (
    <div className="scrapbook-notes-page">
      <header className="scrapbook-header">
        <div className="header-title-block">
          <div className="flex items-center gap-2">
            <span className="scrapbook-emoji">💭</span>
            <h2 className="scrapbook-title">Scrapbook Notes Memory Index</h2>
          </div>
          <p className="scrapbook-subtitle">
            All captured quick memory notes associated with photos in your collection.
          </p>
        </div>

        <div className="scrapbook-search-bar">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            className="scrapbook-input"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter saved memory notes..."
          />
        </div>
      </header>

      <div className="scrapbook-content">
        {filteredAnnotated.length > 0 ? (
          <div className="scrapbook-notes-grid">
            {filteredAnnotated.map(photo => (
              <div
                key={photo.id}
                className="scrapbook-note-card"
                onClick={() => onSelectPhoto(photo)}
              >
                <div className="card-thumb-wrapper">
                  <ImageWithFallback
                    src={photo.image_url}
                    alt={photo.filename}
                    aspectRatio="4/3"
                    className="card-thumb-img"
                  />
                  {photo.isUserNote && (
                    <span className="user-captured-tag">User Captured</span>
                  )}
                </div>

                <div className="card-note-details">
                  <div className="card-note-bubble">
                    <span className="note-icon">💭</span>
                    <p className="note-text">"{photo.displayNote}"</p>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-item">
                      <Calendar size={13} className="mr-1 inline" />
                      {formatDate(photo.date_captured)}
                    </span>
                    <span className="meta-item">
                      <MapPin size={13} className="mr-1 inline" />
                      {photo.location}
                    </span>
                  </div>

                  <div className="card-action-row">
                    <span className="open-photo-link">
                      Open in viewer <ArrowRight size={14} className="ml-1 inline" />
                    </span>
                    {photo.isUserNote && (
                      <button
                        className="card-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNote(photo.id);
                        }}
                        title="Delete custom note"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="scrapbook-empty">
            <Sparkles size={40} className="text-amber-500 mb-2" />
            <h3>No memory notes match your filter</h3>
            <p>Tap any photo in your gallery to capture a quick memory note!</p>
          </div>
        )}
      </div>

      <footer className="scrapbook-footer">
        <button
          className="reset-demo-btn"
          onClick={onResetDemo}
        >
          Reset Demo Notes
        </button>
      </footer>
    </div>
  );
}
