import React, { useMemo } from 'react';
import { PhotoCard } from './PhotoCard';
import { getMonthName } from '../utils/dateUtils';

/**
 * Responsive Photo Grid component with date section headers
 */
export function PhotoGrid({ photos, onSelectPhoto, showHeaders = true }) {
  // Group photos by Year and Month for timeline view if showHeaders is true
  const groupedPhotos = useMemo(() => {
    if (!showHeaders) return null;

    const groups = {};
    photos.forEach(photo => {
      const key = `${photo.year}-${photo.month}`;
      if (!groups[key]) {
        groups[key] = {
          year: photo.year,
          month: photo.month,
          title: `${getMonthName(photo.month)} ${photo.year}`,
          items: []
        };
      }
      groups[key].items.push(photo);
    });

    // Sort group keys descending (newest first)
    return Object.values(groups).sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, [photos, showHeaders]);

  if (!photos || photos.length === 0) {
    return null;
  }

  if (!showHeaders || !groupedPhotos) {
    return (
      <div className="photo-grid">
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onSelectPhoto={onSelectPhoto}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="timeline-photo-grid">
      {groupedPhotos.map(group => (
        <section key={`${group.year}-${group.month}`} className="timeline-section">
          <div className="timeline-header">
            <h2 className="timeline-title">{group.title}</h2>
            <span className="timeline-count">{group.items.length} items</span>
          </div>
          <div className="photo-grid">
            {group.items.map(photo => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onSelectPhoto={onSelectPhoto}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
