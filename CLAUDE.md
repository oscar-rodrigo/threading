# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Threads Writing Tool** is a single-user web application that collects notes from various sources (email, voice, manual entry), intelligently classifies them into thematic threads using Gemini LLMs, and synthesizes these threads into cohesive markdown documents.

**Current Status**: Phase 1 (Frontend with mock data) is substantially complete. Phase 2 (Backend integration) is planned but not started.

## Common Commands

All development happens in the `frontend/` directory:

```bash
cd frontend

# Development
npm run dev        # Start dev server (usually http://localhost:5173)
npm run build      # TypeScript compilation + production build
npm run preview    # Preview production build
npm run lint       # Run ESLint

# Utilities
npx tsc --noEmit   # Type-check without building
rm -rf node_modules/.vite  # Clear Vite cache if build issues occur
```

## Architecture & Data Flow

### State Management Pattern

The app uses **React Context API** for global state management, centered around `ThreadsContext`:

- **Single Source of Truth**: `ThreadsProvider` wraps the entire app in `App.tsx`
- **All Data Operations**: Thread and Note CRUD operations go through context methods
- **No Direct State Mutation**: Components use context methods like `createNote()`, `moveNote()`, `updateThread()`

### Core Data Model

Three primary entities (see `src/types/index.ts`):

1. **Thread** - Thematic collections with title, description, keywords, and color
2. **Note** - Individual content items with `threadId` (string) or `null` (for Inbox)
   - `threadId: null` = unsorted note in Inbox awaiting classification
   - `threadId: string` = note assigned to a thread
3. **GeneratedMarkdown** - AI-synthesized documents from thread notes

### Inbox Workflow

The Inbox is a key feature for managing unsorted notes:

- Notes with `threadId: null` appear in Inbox
- Each inbox note can have an AI `classification` suggestion
- Users can approve suggestions or manually move notes via `moveNote(noteId, targetThreadId)`
- Moving a note updates thread `noteCount` automatically

### Component Hierarchy

```
App (BrowserRouter + ThreadsProvider)
├── Navigation (with Inbox counter badge)
└── Routes:
    ├── "/" → ThreadsList (displays ThreadCard components)
    ├── "/inbox" → Inbox (displays InboxNoteCard components)
    ├── "/threads/new" → NewThreadForm
    └── "/threads/:id" → ThreadDetail (displays NoteCard components)
```

## TypeScript Configuration

**Important**: The project uses `verbatimModuleSyntax: true` in `tsconfig.app.json`.

- **Type-only imports** must use `import type` syntax:
  ```typescript
  import type { Thread, Note } from '@/types';  // ✅ Correct
  import { Thread, Note } from '@/types';       // ❌ Build error
  ```
- **Value imports** (functions, components) use regular import:
  ```typescript
  import { useThreadsContext } from '@/contexts/ThreadsContext';  // ✅ Correct
  ```

## Path Aliases

The project uses `@/` alias for `src/`:

```typescript
import { useThreadsContext } from '@/contexts/ThreadsContext';
import type { Thread } from '@/types';
import { mockThreads } from '@/data/mockData';
```

## String Literals Best Practice

**Always use template literals (backticks) for multi-line strings or strings with apostrophes:**

```typescript
// ✅ Good - template literal
const text = `Multi-line string
with apostrophes like don't and can't`;

// ❌ Bad - single quotes with escapes (can cause Vite/esbuild parse errors)
const text = 'Multi-line string\nwith apostrophes like don\'t and can\'t';
```

This prevents syntax errors that TypeScript may not catch but Vite's esbuild will reject.

## UI/UX Philosophy

Based on recent refinements, the project follows a "less is more" approach:

- **Minimal badges**: Avoid redundant labels and metadata displays
- **Clean headers**: Focus on content over metadata
- **Contextual actions**: Actions appear where needed (edit icons, move buttons)

## Shadcn/ui Components

The project uses Shadcn/ui (New York style) with Tailwind CSS. Components are in `src/components/ui/`.

Common components used:
- Dialog (for edit modals)
- DropdownMenu (for actions)
- Select (for moving notes)
- Separator (for visual dividers)
- Label, Button (throughout)

## Mock Data Structure

Mock data lives in `src/data/mockData.ts`:

- `mockThreads` - Sample threads with colors and metadata
- `mockNotes` - Sample notes (some with `threadId`, some with `threadId: null` for Inbox)
- `mockGeneratedMarkdown` - Pre-generated markdown examples

When adding mock data, use template literals for `plainText` and `extractedText` fields.

## Troubleshooting

### White Screen / Module Errors
1. Check browser console for actual error (module errors can be symptoms of syntax errors)
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check for multiple dev servers on different ports: `lsof -ti:5173,5174,5175`
4. Hard refresh browser (Cmd+Shift+R on macOS)

### Build Failures
1. Verify all type imports use `import type` syntax
2. Run `npx tsc --noEmit` to check TypeScript errors
3. Check for string literal syntax errors (use template literals)

### State Not Updating
Ensure you're calling context methods (like `updateThread`, `moveNote`) rather than directly mutating state. All state changes should flow through `ThreadsContext`.

## Future Backend Integration (Phase 2 - Not Yet Implemented)

The planned architecture includes:
- **Storage**: Supabase (PostgreSQL)
- **Ingestion**: Zapier (handles emails/voice notes → JSON)
- **AI Processing**: Supabase Edge Functions
  - Gemini 2.0 Flash for classification
  - Gemini 2.5 Pro for synthesis

When implementing backend integration, replace mock data imports with API calls while maintaining the same `ThreadsContext` interface.
