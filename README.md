# Willi Cat Clicker

## Requirements
- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build for hosting
```bash
npm run build
```

Vite writes the production website to `dist/`. Deploy the contents of that folder to a static hosting provider that supports single-page applications.

## Notes
- The game currently saves progress in the player's browser using localStorage.
- Browser-local progress is not automatically shared between devices or accounts.
