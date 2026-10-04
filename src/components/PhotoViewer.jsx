import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Star,
  Info,
  MapPin,
  Calendar,
  Users,
  Tag,
  Trash2,
  Sparkles,
  Edit3
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { QuickNoteInput } from './QuickNoteInput';
import { SavedNoteBadge } from './SavedNoteBadge';
import { formatDate } from '../utils/dateUtils';

/**
 * Modern Google Photos Full-Screen Photo Viewer with Floating Scrapbook Quick-Note Capture
 */
export function PhotoViewer({
  photo,
  allPhotos = [],
  onClose,
  onSaveNote,
  onDeleteNote
}) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Current photo index in gallery for prev/next navigation
  const currentIndex = allPhotos.findIndex(p => p.id === photo?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < allPhotos.length - 1;

  const currentDisplayNote = photo
    ? (photo.user_note !== null && photo.user_note !== undefined ? photo.user_note : photo.memory_note)
    : '';

  const hasNote = currentDisplayNote && currentDisplayNote.trim().length > 0;

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const handleSave = (noteText) => {
    onSaveNote(photo.id, noteText);
    setIsEditingNote(false);
  };

  const handleDelete = () => {
    onDeleteNote(photo.id);
    setIsEditingNote(false);
  };

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      className="photo-viewer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer - ${photo.filename}`}
    >
      {/* Viewer Header */}
      <header className="viewer-header">
        <button
          className="viewer-icon-btn back-btn"
          onClick={onClose}
          title="Back to gallery (Esc)"
          aria-label="Back to gallery"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="viewer-header-info">
          <h2 className="viewer-title">{photo.filename}</h2>
          <span className="viewer-date">{formatDate(photo.date_captured)}</span>
        </div>

        <div className="viewer-header-actions">
          <button
            className={`viewer-icon-btn ${isStarred ? 'starred' : ''}`}
            onClick={() => setIsStarred(!isStarred)}
            title="Star photo"
            aria-label="Star photo"
          >
            <Star size={20} fill={isStarred ? '#fbbc04' : 'none'} color={isStarred ? '#fbbc04' : '#fff'} />
          </button>
          <button
            className={`viewer-icon-btn ${showInfoPanel ? 'active' : ''}`}
            onClick={() => setShowInfoPanel(!showInfoPanel)}
            title="Photo Info"
            aria-label="Photo Info"
          >
            <Info size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="viewer-body">
        {/* Main Image View */}
        <div className="viewer-image-container">
          <ImageWithFallback
            src={photo.image_url}
            alt={photo.filename}
            aspectRatio="auto"
            className="viewer-main-img"
          />

          {/* Floating Memory Note Section directly above action bar */}
          <div className="viewer-floating-note-bar">
            {hasNote && !isEditingNote ? (
              <SavedNoteBadge
                noteText={currentDisplayNote}
                onEdit={() => setIsEditingNote(true)}
                onDelete={handleDelete}
              />
            ) : (
              <QuickNoteInput
                initialValue={currentDisplayNote}
                onSaveNote={handleSave}
                onCancel={() => setIsEditingNote(false)}
              />
            )}
          </div>
        </div>

        {/* Info Side Drawer on larger viewports or modal toggle */}
        {showInfoPanel && (
          <aside className="viewer-info-panel">
            <div className="info-panel-header">
              <h3>Photo Info</h3>
              <button className="viewer-icon-btn dark" onClick={() => setShowInfoPanel(false)}>✕</button>
            </div>
            <div className="info-panel-content">
              <div className="info-item">
                <Calendar size={18} className="info-icon" />
                <div>
                  <div className="info-label">Date Captured</div>
                  <div className="info-value">{formatDate(photo.date_captured)} ({photo.season})</div>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">{photo.location}</div>
                </div>
              </div>

              {photo.people_tagged && photo.people_tagged.length > 0 && (
                <div className="info-item">
                  <Users size={18} className="info-icon" />
                  <div>
                    <div className="info-label">People</div>
                    <div className="info-value">{photo.people_tagged.join(', ')}</div>
                  </div>
                </div>
              )}

              <div className="info-item">
                <Tag size={18} className="info-icon" />
                <div>
                  <div className="info-label">Category</div>
                  <div className="info-value">{photo.category || 'General'}</div>
                </div>
              </div>

              <div className="info-item note">
                <Sparkles size={18} className="info-icon text-amber-400" />
                <div>
                  <div className="info-label">Scrapbook Note</div>
                  <div className="info-value">
                    {currentDisplayNote || 'No memory note captured yet.'}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Action Bar */}
      <footer className="viewer-bottom-bar">
        <button
          className="bottom-action-btn"
          onClick={handleShare}
          title="Share link copied"
        >
          <Share2 size={18} />
          <span>{copiedShare ? 'Copied Link!' : 'Share'}</span>
        </button>

        <button
          className="bottom-action-btn highlight"
          onClick={() => setIsEditingNote(!isEditingNote)}
        >
          <Edit3 size={18} />
          <span>{hasNote ? 'Edit Note' : 'Add Note'}</span>
        </button>

        {hasNote && (
          <button
            className="bottom-action-btn danger"
            onClick={handleDelete}
            title="Delete Note"
          >
            <Trash2 size={18} />
            <span>Clear Note</span>
          </button>
        )}
      </footer>
    </div>
  );
}
