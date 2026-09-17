# HL App Builder

A modern full-stack web application starter built with **Vue 3**, **TypeScript**, **ShadCN UI**, and **Firebase** (Auth, Firestore, Cloud Functions).

## Tech Stack

- **Frontend**: [Vue 3](https://vuejs.org) (Composition API, `<script setup>`) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn-vue](https://shadcn-vue.com/) with Radix Vue primitives
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Backend & Cloud**: [Firebase](https://firebase.google.com/)
  - **Firebase Auth**: Reactive authentication helpers and state composable (`useAuth`)
  - **Cloud Firestore**: Database client utilities and secure baseline security rules
  - **Cloud Functions**: Serverless HTTPS Callable & HTTP Functions (TypeScript v2)
  - **Firebase Emulators**: Full local development emulator suite

## Project Structure

```
hl-app-builder/
├── .env.example                    # Firebase environment variables template
├── .firebaserc                     # Firebase project aliases
├── firebase.json                   # Hosting, Firestore, Functions & Emulator configs
├── firestore.rules                 # Firestore security rules
├── firestore.indexes.json          # Firestore composite indexes
├── package.json                    # Root scripts & dependencies
├── vite.config.ts                  # Vite config with ESM @/ alias
├── tsconfig.json                   # Root TypeScript config
├── components.json                 # shadcn-vue configuration
├── functions/                      # Firebase Cloud Functions (TypeScript)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts                # HTTP & Callable function handlers
└── src/
    ├── main.ts                     # Vue entrypoint
    ├── App.vue                     # Hello World dashboard view
    ├── style.css                   # Tailwind v4 & Shadcn design tokens
    ├── components/ui/              # shadcn-vue UI components (button, card, badge, tabs, input...)
    ├── lib/utils.ts                # Tailwind class merge utility (`cn`)
    └── firebase/
        ├── config.ts               # Firebase App initialization & emulator bridge
        ├── auth.ts                 # Reactive `useAuth` composable & auth helpers
        ├── firestore.ts            # Typed Firestore database operations
        ├── functions.ts            # Cloud Functions callable client helpers
        └── index.ts                # Unified Firebase barrel export
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
npm --prefix functions install
```

### 2. Configure Firebase Credentials (Optional)
Copy `.env.example` to `.env` and fill in your Firebase project configuration:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
# Build frontend and cloud functions
npm run build:all
```

### 5. Local Firebase Emulators
To run local Firebase emulators for Firestore, Auth, and Functions:
```bash
npm run emulators
```
To connect the frontend to the local emulators during development, set `VITE_USE_FIREBASE_EMULATOR=true` in your `.env`.
