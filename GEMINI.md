# Threads Writing Tool - Project Context

## Project Overview
**Name:** Threads Writing Tool
**Purpose:** A single-user web application designed to collect notes (via email or manual entry), classify them into threads using LLMs (Gemini), and synthesize them into cohesive markdown documents.
**Current Status:** **Phase 1 (Frontend Only)**. The application currently runs with mock data. The backend (FastAPI + Python) is planned for Phase 2.

## Tech Stack
*   **Frontend:** React 18+ (Vite), TypeScript
*   **UI Framework:** Tailwind CSS, Shadcn/ui
*   **State Management:** React Context API
*   **Icons:** Lucide React
*   **Routing:** React Router DOM
*   **Backend (Planned):** Python 3.12+, FastAPI, Gemini 2.0/2.5 models
*   **Database (Planned):** Supabase (PostgreSQL)
*   **Ingestion (Planned):** Zapier (Email & Voice Notes)

## Project Structure
The project is currently monorepo-style, with the frontend living in the `frontend/` directory.

```
/
├── plan.md                 # Detailed implementation plan and architecture
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # UI components (includes Shadcn/ui in /ui)
│   │   ├── contexts/       # React Context (ThreadsContext)
│   │   ├── data/           # Mock data (mockData.ts)
│   │   ├── hooks/          # Custom hooks (useThreads.ts)
│   │   ├── lib/            # Utilities
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main component & Routing
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML entry point
│   └── package.json        # Dependencies and scripts
└── backend/                # (Planned for Phase 2)
```

## Development Workflow

### Prerequisites
*   Node.js (v18+ recommended)
*   npm

### Frontend Commands (Run from `frontend/` directory)
*   **Install Dependencies:** `npm install`
*   **Start Dev Server:** `npm run dev` (Runs on http://localhost:5173)
*   **Build for Production:** `npm run build`
*   **Lint Code:** `npm run lint`
*   **Preview Build:** `npm run preview`

### Testing
*   Currently, the project relies on **manual testing**.
*   No automated test runner (Jest/Vitest) is currently configured in `package.json`.

## Key Conventions
*   **Frontend-First:** The current phase focuses entirely on UI/UX using realistic mock data (`src/data/mockData.ts`).
*   **Type Safety:** Strict TypeScript usage. Interfaces are defined in `src/types/index.ts`.
*   **Component Library:** Use Shadcn/ui components (`src/components/ui`) whenever possible.
*   **Path Aliases:** Use `@/` to import from the `src` directory (e.g., `import { Button } from "@/components/ui/button"`).
*   **Styling:** Use Tailwind CSS utility classes.
*   **State:** Use `useThreads` hook to access global state.

## Data Models (TypeScript Interfaces)
Key interfaces defined in `src/types/index.ts`:
*   `Thread`: Represents a collection of notes (id, title, description, keywords).
*   `Note`: Individual content pieces (id, threadId, content, source).
*   `GeneratedMarkdown`: LLM-synthesized documents.

## Future Roadmap (Phase 2)
*   Implement Python/FastAPI backend.
*   Set up **Supabase** (PostgreSQL) for persistent storage.
*   Set up **Zapier** webhook to ingest emails and voice notes (sending clean JSON to backend).
*   Integrate Gemini API for note classification and markdown generation.
*   Replace mock data with real API calls.
