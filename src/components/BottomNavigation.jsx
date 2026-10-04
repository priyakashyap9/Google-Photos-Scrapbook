import React from 'react';
import { Image, Search, BookmarkCheck } from 'lucide-react';

/**
 * Mobile-First Bottom Navigation Bar styled in Material Design 3 Google Photos aesthetic
 */
export function BottomNavigation({
  activeTab,
  onTabChange,
  notesCount = 0
}) {
  return (
    <nav className="bottom-navigation" aria-label="Main Navigation">
      <div className="bottom-nav-container">
        <button
          className={`nav-item ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => onTabChange('photos')}
          aria-label="Photos Tab"
        >
          <div className="nav-icon-wrapper">
            <Image size={22} />
          </div>
          <span className="nav-label">Photos</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => onTabChange('search')}
          aria-label="Search Tab"
        >
          <div className="nav-icon-wrapper">
            <Search size={22} />
          </div>
          <span className="nav-label">Search</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'scrapbook' ? 'active' : ''}`}
          onClick={() => onTabChange('scrapbook')}
          aria-label="Scrapbook Notes Tab"
        >
          <div className="nav-icon-wrapper">
            <BookmarkCheck size={22} />
            {notesCount > 0 && (
              <span className="nav-badge">{notesCount}</span>
            )}
          </div>
          <span className="nav-label">Notes</span>
        </button>
      </div>
    </nav>
  );
}
