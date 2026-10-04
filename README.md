# Google Photos — Scrapbook Notes & Smart Search MVP

A lightweight, high-polish research prototype inspired by the visual language, design system, and interaction patterns of **Google Photos (Material Design 3 / Material You)**.

Built for university graduation research projects exploring contextual photo memory capture and multi-dimensional search.

---

## 🌟 Overview

Modern photo libraries often store thousands of images, making retrieval based on personal context, seasonal recurrence, or casual notes challenging.

This MVP introduces two experimental interaction flows:
1. **Quick Memory Note Capture**: Rapid, 60-character floating memory note capture directly inside the full-screen photo viewer.
2. **Smart Search & Clue Chips**: Contextual search leveraging dynamic seasonal matching (`[Current Month] Past Years`), note-based clues (`Site B Notes`), people tagged (`Photos with Sarah`), and instant text filtering.

---

## 🎨 Design Reference & Visual Philosophy

### Selected Design System Reference:
* **Reference**: **Google Material You (Material Design 3) for Google Photos Core Mobile & Desktop Experience**
* **Primary Palette**: Google Primary Blue (`#1a73e8`), Neutral light surface (`#f8f9fa` / `#ffffff`), Amber accent (`#fef7e0` / `#b06000`), Dark backdrop viewer (`rgba(18, 19, 22, 0.96)`).
* **Typography**: Google Sans / Inter sans-serif stack.
* **Component Patterns**: 
  - Floating pill controls & active bottom tab indicators.
  - Horizontally scrollable chip carousels.
  - Floating semi-transparent quick-note input bar above viewer actions.
  - Responsive 2-4 column photo grid with smooth hover transitions.

---

## ✨ Features

- **🖼️ Timeline Photo Gallery**: Responsive grid displaying realistic high-resolution Unsplash photo records grouped by month and year.
- **💭 Quick Memory Note Capture**:
  - Full-screen photo viewer overlay.
  - Floating semi-transparent input bar (`💭 Add a quick memory note...`).
  - Max 60-character limit with real-time counter.
  - Instant persistent badge transformation (`💭 Site B inspection with Raj`).
  - Saved to browser `window.localStorage`.
- **🔍 Smart Search & Dynamic Clues**:
  - **Dynamic Seasonal Chip**: Automatically calculates `[Current Month] Past Years` dynamically using `new Date().getMonth() + 1`.
  - **Note Clue Chip**: Filters photos containing saved scrapbook notes (`📝 Site B Notes`).
  - **People & Context Chips**: Instant filtering for tagged individuals e.g. `👥 Photos with Sarah`.
  - **Instant Search**: Live query filtering across filenames, locations, people, seasons, and notes. No backend or API keys required.
- **📝 Scrapbook Notes Index**: Dedicated tab view presenting all saved memory notes in one place with quick jump to open in viewer.
- **🔄 Research Reset**: Discreet "Reset Demo Notes" feature with safety confirmation modal to clear `localStorage` notes for fresh demonstration rounds.
- **🛡️ Resilience & Fallbacks**: `ImageWithFallback` handles remote image loading failures gracefully; `storage.js` recovers safely if `localStorage` data is corrupted.

---

## 📁 Project Architecture

```text
gphotos-mvp/
├── package.json
├── vite.config.js
├── index.html
├── README.md
│
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── components/
    │   ├── AppShell.jsx            # Top header, tab manager, modal handler
    │   ├── BottomNavigation.jsx    # Material Design 3 bottom tab bar
    │   ├── PhotoGrid.jsx           # Responsive timeline grid
    │   ├── PhotoCard.jsx           # Individual photo card with note badge
    │   ├── PhotoViewer.jsx         # Full-screen photo viewer with controls
    │   ├── QuickNoteInput.jsx      # Floating 60-char expandable input
    │   ├── SavedNoteBadge.jsx      # Styled yellow scrapbook note badge
    │   ├── SearchBar.jsx           # Active live search input bar
    │   ├── SmartClueChips.jsx      # Dynamic scrollable carousel of chips
    │   ├── SmartClueChip.jsx       # Individual pill chip component
    │   ├── SearchResults.jsx       # Search page view with query status
    │   ├── EmptyState.jsx          # Polished empty state with recovery action
    │   ├── ImageWithFallback.jsx   # Image component with error handling
    │   ├── ScrapbookNotesView.jsx  # Dedicated memory notes index view
    │   └── ResetModal.jsx          # Reset demo confirmation modal
    │
    ├── data/
    │   └── mockPhotos.js           # 18 realistic photo metadata records
    │
    ├── hooks/
    │   ├── useLocalStorage.js      # Notes state & localStorage sync
    │   └── usePhotoSearch.js       # Live search & chip filtering logic
    │
    ├── utils/
    │   ├── photoFilters.js         # Multi-field filtering logic
    │   ├── dateUtils.js            # Dynamic month calculation & formatting
    │   └── storage.js              # Safe localStorage storage & recovery
    │
    └── styles/
        ├── variables.css           # MD3 design system tokens
        ├── globals.css             # Base reset & typography
        └── components.css          # Component styles & responsive layouts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher
- NPM `v9.0.0` or higher

### Installation

```bash
# Clone or navigate to project directory
cd "c:\Users\Lenovo\Downloads\Gphotos mvp"

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Production Build & Deployment

### Build for Production

```bash
npm run build
```

This compiles optimized assets into the `dist/` directory.

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploying to Vercel
```bash
npx vercel
```
Vercel automatically detects Vite and deploys the `dist/` directory.

### Deploying to GitHub Pages
Add `base: './'` to `vite.config.js` and run:
```bash
npm run build
npx gh-pages -d dist
```

---

## 💾 LocalStorage Data Structure

Notes are persisted in `window.localStorage` under key `gphotos_scrapbook_notes_v1`:

```json
{
  "1": "Site B inspection with Raj and Sarah",
  "4": "Autumn golden leaves on Paradise trail hike",
  "15": "Sunset after the project meeting at Site B"
}
```

If corrupted data is encountered, `storage.js` gracefully logs a warning, clears only invalid notes, and returns an empty object to prevent application crashes.

---

## 🔬 Research MVP Limitations

- **Client-Side Storage**: Notes are saved per browser instance via `window.localStorage`. No backend database is attached by design.
- **Client Filtering**: Search and chip filters execute in-memory via local JavaScript filtering.
- **Static Dataset**: Photo collection consists of 18 curated Unsplash photo records with realistic metadata.
