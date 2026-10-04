import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { MapPin, Users } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

/**
 * Individual Photo Card for Gallery and Search Results
 */
export function PhotoCard({ photo, onSelectPhoto }) {
  const displayNote = photo.user_note !== null && photo.user_note !== undefined
    ? photo.user_note
    : photo.memory_note;

  const hasNote = displayNote && displayNote.trim().length > 0;

  return (
    <div
      className="photo-card"
      onClick={() => onSelectPhoto(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectPhoto(photo);
        }
      }}
      aria-label={`Photo ${photo.filename} - ${photo.location}`}
    >
      <ImageWithFallback
        src={photo.image_url}
        alt={photo.filename}
        aspectRatio="4/3"
        className="photo-card-image"
      />


      {/* Subtle overlay on hover/focus */}
      <div className="photo-card-overlay">
        <div className="photo-card-meta">
          <div className="meta-date">{formatDate(photo.date_captured)}</div>
          <div className="meta-location">
            <MapPin size={12} className="inline mr-1" />
            <span>{photo.location}</span>
          </div>
          {photo.people_tagged && photo.people_tagged.length > 0 && (
            <div className="meta-people">
              <Users size={12} className="inline mr-1" />
              <span>{photo.people_tagged.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
