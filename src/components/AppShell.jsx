import React, { useState } from 'react';
import { PhotoGrid } from './PhotoGrid';
import { SearchResults } from './SearchResults';
import { ScrapbookNotesView } from './ScrapbookNotesView';
import { PhotoViewer } from './PhotoViewer';
import { BottomNavigation } from './BottomNavigation';
import { ResetModal } from './ResetModal';
import { ImageWithFallback } from './ImageWithFallback';
import { Search, Sparkles, RefreshCw, BookmarkCheck } from 'lucide-react';
import { MOCK_PHOTOS } from '../data/mockPhotos';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePhotoSearch } from '../hooks/usePhotoSearch';

/**
 * Main Mobile-First Application Shell for Google Photos Scrapbook MVP
 */
export function AppShell() {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'search' | 'scrapbook'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // LocalStorage notes state
  const { userNotes, saveNote, deleteNote, clearAllNotes } = useLocalStorage();

  // Search logic state
  const {
    searchQuery,
    setSearchQuery,
    activeChip,
    setActiveChip,
    filteredPhotos,
    clearSearch
  } = usePhotoSearch(MOCK_PHOTOS, userNotes);

  const notesCount = Object.keys(userNotes).filter(k => userNotes[k] && userNotes[k].trim().length > 0).length;

  const handleOpenPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  const handleSaveNote = (photoId, noteText) => {
    saveNote(photoId, noteText);
    // Update active selected photo state object to immediately reflect new note
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(prev => ({
        ...prev,
        user_note: noteText,
        effective_note: noteText
      }));
    }
  };

  const handleDeleteNote = (photoId) => {
    deleteNote(photoId);
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(prev => ({
        ...prev,
        user_note: null,
        effective_note: prev.memory_note || ''
      }));
    }
  };

  const handleConfirmReset = () => {
    clearAllNotes();
    setIsResetModalOpen(false);
    if (selectedPhoto) {
      setSelectedPhoto(prev => ({
        ...prev,
        user_note: null,
        effective_note: prev.memory_note || ''
      }));
    }
  };

  // Quick action from header to jump to search with a chip
  const handleQuickSearchChip = (chipId, label, queryText) => {
    setActiveTab('search');
    setActiveChip({ id: chipId, type: 'notes', label, queryText });
    setSearchQuery(queryText);
  };

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="app-top-bar">
        <div className="top-bar-left" onClick={() => setActiveTab('photos')} role="button" tabIndex={0}>
          <div className="google-photos-logo-icon">
            <span className="logo-petal red"></span>
            <span className="logo-petal blue"></span>
            <span className="logo-petal green"></span>
            <span className="logo-petal yellow"></span>
          </div>
          <div className="brand-title">
            <span className="brand-name">Google Photos</span>
            <span className="brand-tag">Scrapbook MVP</span>
          </div>
        </div>

        <div className="top-bar-actions">
          {activeTab !== 'search' && (
            <button
              className="top-bar-icon-btn"
              onClick={() => setActiveTab('search')}
              title="Search photos"
              aria-label="Search photos"
            >
              <Search size={20} />
            </button>
          )}

          <button
            className="reset-demo-header-btn"
            onClick={() => setIsResetModalOpen(true)}
            title="Reset demo notes"
          >
            <RefreshCw size={14} className="mr-1 inline" />
            <span>Reset</span>
          </button>

          <div className="user-avatar" title="Research User">
            <span>RU</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-main-content">
        {activeTab === 'photos' && (
          <div className="photos-tab-page">
            <div className="photos-banner">
              <div className="banner-badge">
                <Sparkles size={14} className="text-amber-500 mr-1 inline" />
                <span>Quick Scrapbook Capture Active</span>
              </div>
              <p className="banner-text">
                Tap any photo to add a quick 60-character memory note or test smart clue search.
              </p>
            </div>

            <PhotoGrid
              photos={MOCK_PHOTOS.map(p => ({
                ...p,
                user_note: userNotes[p.id] !== undefined ? userNotes[p.id] : null
              }))}
              onSelectPhoto={handleOpenPhoto}
              showHeaders={true}
            />
          </div>
        )}

        {activeTab === 'search' && (
          <SearchResults
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeChip={activeChip}
            onSelectChip={setActiveChip}
            onClearSearch={clearSearch}
            filteredPhotos={filteredPhotos}
            allPhotos={MOCK_PHOTOS}
            userNotes={userNotes}
            onSelectPhoto={handleOpenPhoto}
          />
        )}

        {activeTab === 'scrapbook' && (
          <ScrapbookNotesView
            photos={MOCK_PHOTOS}
            userNotes={userNotes}
            onSelectPhoto={handleOpenPhoto}
            onDeleteNote={handleDeleteNote}
            onResetDemo={() => setIsResetModalOpen(true)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notesCount={notesCount}
      />

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <PhotoViewer
          photo={{
            ...selectedPhoto,
            user_note: userNotes[selectedPhoto.id] !== undefined ? userNotes[selectedPhoto.id] : null
          }}
          allPhotos={MOCK_PHOTOS}
          onClose={handleClosePhoto}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
        />
      )}

      {/* Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
