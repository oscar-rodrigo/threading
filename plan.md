# Thread-Based Notes Collection App - Implementation Plan

## Overview

Build a single-user web app that receives notes via email, classifies them into threads using LLM, and generates cohesive markdown documents with Gemini.

**Development Approach**: Frontend-first with mock data, then backend integration.

## Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **UI**: Shadcn/ui + Tailwind CSS
- **State**: React Context
- **Backend** (Phase 2): Python 3.12+ with FastAPI
- **Database** (Phase 2): Supabase (PostgreSQL)
- **Ingestion** (Phase 2): Zapier (Email & Voice Note processing)
- **LLMs** (Phase 2):
  - Gemini 2.0 Flash (fast classification)
  - Gemini 2.5 Pro (high-quality markdown generation)

## Project Structure

### Phase 1: Frontend Only

```
threads-writing-tool/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Shadcn components
│   │   │   ├── ThreadsList.tsx
│   │   │   ├── ThreadDetail.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NewThreadForm.tsx
│   │   │   └── MarkdownPreview.tsx
│   │   ├── contexts/
│   │   │   └── ThreadsContext.tsx   # Global state
│   │   ├── hooks/
│   │   │   └── useThreads.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── data/
│   │   │   └── mockData.ts          # Mock threads and notes
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

### Phase 2: Full Stack (Zapier + Supabase + Edge Functions)

```
threads-writing-tool/
├── frontend/                        # React Application
├── supabase/                        # Supabase Configuration
│   ├── functions/                   # Edge Functions (Deno/TypeScript)
│   │   ├── classify-note/           # Triggered on Note insert (Gemini Flash)
│   │   └── generate-markdown/       # Triggered by UI (Gemini Pro)
│   └── migrations/                  # SQL Schema
└── zapier/                          # Zapier Workflow Config (Metadata)
```

## Data Model

### TypeScript Interfaces (`frontend/src/types/index.ts`)

```typescript
export interface Thread {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  createdAt: string;  // ISO8601
  updatedAt: string;  // ISO8601
  noteCount: number;
  color: string;      // Hex color
}

export interface Note {
  id: string;
  threadId: string;
  source: 'email' | 'manual' | 'voice';
  emailMetadata?: {
    from: string;
    subject: string;
    receivedAt: string;
  };
  content: {
    plainText: string;
    html?: string;
    extractedText: string;
  };
  classification?: {
    threadId: string;
    confidence: number;
    reasoning: string;
    modelUsed: string;
    classifiedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedMarkdown {
  id: string;
  threadId: string;
  threadTitle: string;
  content: string;
  generatedAt: string;
  modelUsed: string;
  noteCount: number;
}
```

### Supabase Schema (Phase 2)

**Table: `threads`**
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `keywords` (text[])
- `color` (text)
- `user_id` (uuid)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Table: `notes`**
- `id` (uuid, primary key)
- `thread_id` (uuid, foreign key)
- `source` (text) -- 'email', 'voice', 'manual'
- `content` (jsonb) -- { plain_text, html, extracted_text }
- `metadata` (jsonb) -- { from, subject, received_at }
- `classification` (jsonb) -- { confidence, reasoning, model }
- `created_at` (timestamptz)

## UI Features (Phase 1)

### 1. Thread Management
- View all threads in a grid/list layout
- Create new threads with title, description, keywords, color
- Edit thread metadata
- Delete threads (with confirmation)
- Search/filter threads
- Color-coded visual organization

### 2. Note Viewing
- Display notes grouped by thread
- Show email metadata (sender, subject, timestamp)
- Expandable note content
- Classification confidence badges
- Sort/filter notes within thread

### 3. Markdown Generation
- "Generate Markdown" button on thread detail
- Mock generation with loading state
- Preview generated markdown
- Download markdown file
- View generation history
- Copy to clipboard

### 4. Navigation & UX
- Responsive design (mobile, tablet, desktop)
- Intuitive routing between views
- Loading states and skeletons
- Empty states (no threads, no notes)
- Toast notifications for actions
- Error boundaries

---

## Backend Features (Phase 2)

### 1. Zapier Ingestion (Email & Voice)

**Endpoint**: `POST /ingestion/zapier`

**Flow**:
1. **Zapier Trigger**: New Email (Gmail) OR New Voice Note (Otter.ai/iOS).
2. **Zapier Action**: Clean/Format data -> POST to your Backend URL.
   - Payload: `{ "source": "email", "subject": "...", "body": "...", "from": "..." }`
3. **Backend**:
   - Validates payload.
   - Extract plain text.
   - Calls **LLM Classifier** to determine thread.
   - Saves to **Supabase** (`notes` table).
   - Returns 200 OK.

**Why this is better**:
- No complex MIME parsing.
- Zapier handles timeouts and retries.
- Easy to add new sources (Slack, Notion, etc.) without code changes.

### 2. LLM Classification

**Service**: `app/services/llm_classifier.py`

**Strategy**:
- Model: Gemini 2.0 Flash (fast, cost-effective)
- Temperature: 0.3 (consistent results)
- Input: Note content + subject + available threads (fetched from Supabase)
- Output: JSON with `{thread_id, confidence, reasoning}`
- Fallback: If confidence < 0.5, mark as "unclassified"

**Prompt Structure**:
```
You are a note classification assistant.

Available Threads:
- ID: {id}, Title: {title}, Description: {desc}, Keywords: {keywords}
...

Note to Classify:
Subject: {subject}
Content: {content}

Select the best matching thread ID and provide confidence + reasoning.
Return JSON: {"thread_id": "...", "confidence": 0.95, "reasoning": "..."}
```

### 3. Markdown Generation

**Service**: `app/services/markdown_generator.py`

**Strategy**:
- Model: Gemini 2.5 Pro (high quality)
- Temperature: 0.7 (creative synthesis)
- Trigger: On-demand via UI button
- Input: All notes from thread (fetched from Supabase)
- Output: Markdown with frontmatter

**Prompt Structure**:
```
Synthesize these notes into a cohesive markdown document.

Thread: {title}
Description: {description}

Notes:
1. Subject: {subject}
   From: {from}
   Date: {date}
   Content: {content}
...

Create a well-structured markdown document that:
- Synthesizes ideas across notes
- Maintains logical flow
- Preserves important details
- Uses clear headings and formatting
```

### 4. Thread Management UI

**Pages**:
- `GET /` - List all threads
- `GET /threads/{id}` - View thread details + notes
- `GET /threads/new` - Create new thread form
- `GET /notes/{id}` - Note detail/edit

**API Endpoints**:
- `GET/POST /api/threads` - List/create threads
- `GET/PATCH/DELETE /api/threads/{id}` - Thread CRUD
- `POST /api/threads/{id}/generate` - Generate markdown
- `GET /api/threads/{id}/generated` - List generated files
- `POST /api/notes/{id}/reclassify` - Re-run classification

### 5. Storage Layer (Supabase)

**Critical Features**:
- **PostgreSQL**: Robust, relational data storage.
- **Row Level Security (RLS)**: Secure data access if we add auth later.
- **Real-time**: Potential to push updates to UI when new notes arrive.

**Key Functions** (`app/services/supabase_client.py`):
- `get_all_threads()` / `create_thread()`
- `get_notes_for_thread()` / `create_note()`
- `save_generated_markdown()`

## Implementation Steps

## PHASE 1: FRONTEND WITH MOCK DATA (Start Here!)

### Step 1: Project Setup (Day 1)
1. ✓ Initialize Vite + React + TypeScript project
   ```bash
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   ```
2. ✓ Install and configure Tailwind CSS
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. ✓ Install Shadcn/ui
   ```bash
   npx shadcn-ui@latest init
   ```
4. ✓ Install dependencies
   ```bash
   npm install react-router-dom date-fns lucide-react
   ```
5. ✓ Set up project structure (folders: components, contexts, hooks, types, data)

### Step 2: TypeScript Types & Mock Data (Day 1)
6. ✓ Create TypeScript interfaces in `src/types/index.ts`
   - Thread, Note, GeneratedMarkdown interfaces
7. ✓ Create mock data in `src/data/mockData.ts`
   - 3-5 sample threads with different topics
   - 10-15 sample notes distributed across threads
   - 2-3 sample generated markdown files
   - Helper functions to query mock data

### Step 3: State Management (Day 2)
8. ✓ Create ThreadsContext (`src/contexts/ThreadsContext.tsx`)
   - State: threads, notes, selectedThread
   - Actions: createThread, updateThread, deleteThread, getNotesByThread
   - Initialize with mock data
9. ✓ Create custom hook `useThreads` (`src/hooks/useThreads.ts`)
   - Wraps ThreadsContext for easier consumption

### Step 4: Shadcn Components Setup (Day 2)
10. ✓ Install needed Shadcn components:
    ```bash
    npx shadcn-ui@latest add button card input textarea badge
    npx shadcn-ui@latest add dialog select dropdown-menu separator
    ```

### Step 5: Core UI Components (Days 3-4)
11. ✓ Build `ThreadsList.tsx`
    - Display grid/list of thread cards
    - Show thread title, description, note count
    - Color-coded cards
    - Click to navigate to detail
12. ✓ Build `ThreadCard.tsx`
    - Reusable card component
    - Shows metadata, note count, last updated
13. ✓ Build `ThreadDetail.tsx`
    - Thread header with title, description, keywords
    - List of notes in thread
    - "Generate Markdown" button
    - Edit/delete thread actions
14. ✓ Build `NoteCard.tsx`
    - Display note content preview
    - Email metadata (from, subject, date)
    - Expandable full content
    - Classification info badge
15. ✓ Build `NewThreadForm.tsx`
    - Dialog/modal form
    - Fields: title, description, keywords, color picker
    - Form validation
    - Calls context action to create thread

### Step 6: Routing & Navigation (Day 4)
16. ✓ Set up React Router in `App.tsx`
    - Route: `/` → ThreadsList
    - Route: `/threads/:id` → ThreadDetail
    - Route: `/threads/new` → NewThreadForm (modal)
17. ✓ Create navigation bar
    - Home link, "New Thread" button
    - App title/branding

### Step 7: Markdown Generation UI (Day 5)
18. ✓ Build `MarkdownPreview.tsx`
    - Shows generated markdown content
    - Download button for markdown file
    - Copy to clipboard button
    - Syntax highlighting (optional)
19. ✓ Add "Generate Markdown" flow in ThreadDetail
    - Button triggers mock generation
    - Loading state
    - Show generated content in dialog/drawer
    - Store in context state
20. ✓ Build generation history view
    - List previous generations
    - Timestamp, model used, note count
    - View/download each generation

### Step 8: Polish & UX (Day 5-6)
21. ✓ Add loading states and skeletons
22. ✓ Add empty states (no threads, no notes)
23. ✓ Add error boundaries
24. ✓ Add toast notifications for actions
25. ✓ Responsive design (mobile, tablet, desktop)
26. ✓ Add search/filter for threads
27. ✓ Add keyboard shortcuts (optional)
28. ✓ Dark mode support (optional, Shadcn makes this easy)

### Step 9: Testing & Documentation (Day 6)
29. ✓ Manual testing of all user flows
30. ✓ Write README with setup instructions
31. ✓ Document component usage
32. ✓ Create sample screenshots

---

## PHASE 2: BACKEND INTEGRATION (Later)

### Step 10: FastAPI & Supabase Setup (Day 7-8)
33. ✓ Create backend directory structure
34. ✓ Set up Python virtual environment
35. ✓ Install dependencies (FastAPI, Supabase-py, etc.)
36. ✓ Set up Supabase project (create tables)
37. ✓ Build service to read/write to Supabase
38. ✓ Build thread and note API endpoints
39. ✓ Test API with curl/Postman

### Step 11: Zapier Integration (Day 9)
40. ✓ Create "Ingestion" API endpoint (`POST /ingestion/zapier`)
41. ✓ Configure Zapier Trigger (Gmail/Otter.ai)
42. ✓ Configure Zapier Action (POST to backend)
43. ✓ Test flow: Email -> Zapier -> Backend -> Supabase

### Step 12: LLM Integration (Day 10-11)
44. ✓ Integrate Gemini API for classification
45. ✓ Build classification service (called during ingestion)
46. ✓ Integrate Gemini for markdown generation
47. ✓ Test classification accuracy
48. ✓ Test markdown quality

### Step 13: Frontend-Backend Connection (Day 12)
49. ✓ Replace mock data with API calls
50. ✓ Add API client (`src/lib/api.ts`)
51. ✓ Update ThreadsContext to use API
52. ✓ Add loading/error states for API calls
53. ✓ Test full end-to-end flow

### Step 14: Deployment (Day 13)
54. ✓ Deploy Backend (Render/Railway/Fly.io)
55. ✓ Deploy Frontend (Vercel/Netlify)
56. ✓ Update Zapier to point to production URL
57. ✓ Final production test

## Critical Files

### Phase 1: Frontend (Priority)

1. **`frontend/src/types/index.ts`** - TypeScript interfaces for Thread, Note, GeneratedMarkdown
2. **`frontend/src/data/mockData.ts`** - Mock data for development
3. **`frontend/src/contexts/ThreadsContext.tsx`** - Global state management
4. **`frontend/src/components/ThreadsList.tsx`** - Main threads view
5. **`frontend/src/components/ThreadDetail.tsx`** - Thread detail with notes
6. **`frontend/src/components/NoteCard.tsx`** - Note display component
7. **`frontend/src/components/MarkdownPreview.tsx`** - Generated markdown viewer
8. **`frontend/src/App.tsx`** - Routing and layout

### Phase 2: Backend (Later)

9. **`backend/app/services/supabase_client.py`** - Database interaction
10. **`backend/app/routers/ingestion.py`** - Zapier webhook receiver
11. **`backend/app/services/llm_classifier.py`** - LLM-powered classification
12. **`backend/app/services/markdown_generator.py`** - Markdown synthesis

## Configuration

### Phase 1: Frontend Configuration

**`frontend/package.json`** (key dependencies):
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "date-fns": "^3.3.1",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.4",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.18"
  }
}
```

**`frontend/.env`** (for Phase 2 API connection):
```bash
VITE_API_URL=http://localhost:8000
```

### Phase 2: Backend Configuration

**`.env`** (backend):
```bash
# Application
APP_ENV=development

# Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key

# CORS (for frontend)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**`backend/requirements.txt`**:
```
fastapi==0.115.0
uvicorn[standard]==0.32.0
supabase==2.3.0
pydantic==2.10.0
pydantic-settings==2.6.0
python-dotenv==1.0.1
google-genai==0.4.0
pytest==8.3.3
httpx==0.27.0
```

## Running Locally

### Phase 1: Frontend Only
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### Phase 2: Full Stack
**Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# API runs on http://localhost:8000
```

**Frontend** (in separate terminal):
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## Deployment (Phase 2)

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_URL` to production backend URL

### Backend
- Deploy FastAPI to Render, Railway, or Fly.io
- Set up Supabase project
- Set up environment variables

### Zapier Setup
1. Create a Zap
2. **Trigger**: New Email (Gmail) or New Recording (Otter.ai)
3. **Formatter (Optional)**: Extract text if needed
4. **Action**: Webhook (POST) to `https://your-backend.com/ingestion/zapier`
   - Data: JSON with `subject`, `content`, `source`

## Key Design Decisions

1. **Frontend-first development**: Build UI with mock data before backend complexity
2. **React + TypeScript**: Type safety, modern tooling, great DX
3. **Shadcn/ui + Tailwind**: Pre-built components, easy customization, modern design
4. **React Context**: Simple state management, no library overhead
5. **Zapier Ingestion**: Offload complex parsing logic to iPaaS
6. **Supabase Storage**: Reliable, scalable, SQL database (replaces files)
7. **Two-model LLM strategy**: Fast classification (Flash) + quality generation (Pro)
8. **Manual thread creation**: User controls structure, LLM assists with classification

## Success Criteria

### Phase 1: Frontend (MVP)
- ✓ Complete UI for viewing threads and notes
- ✓ Can create, edit, delete threads
- ✓ Notes display with email metadata
- ✓ Mock markdown generation works
- ✓ UI is responsive (mobile, tablet, desktop)
- ✓ Intuitive navigation and interactions
- ✓ TypeScript types are comprehensive
- ✓ Mock data is realistic and useful

### Phase 2: Full Stack
- ✓ Frontend connects to backend API successfully
- ✓ Zapier successfully pushes clean JSON to backend
- ✓ Notes are stored in Supabase
- ✓ LLM classifies notes with >80% accuracy
- ✓ Generates well-structured, cohesive markdown
- ✓ Handles 50+ notes per thread efficiently

## Mock Data Design Guidelines

The mock data should be realistic and comprehensive to enable full UI development:

### Sample Threads (3-5)
1. **"Product Ideas"** - 5-6 notes about product features, brainstorming
2. **"Meeting Notes"** - 3-4 notes from different meetings with action items
3. **"Research Links"** - 4-5 notes with URLs and research summaries
4. **"Quick Thoughts"** - Random ideas, shorter notes
5. **"Project Planning"** - Technical specs, architecture notes

### Sample Notes Structure
- Mix of long and short notes
- Different email senders (team@company.com, user@gmail.com, etc.)
- Varied subjects (descriptive, vague, emoji-laden)
- Different timestamps (spread over weeks)
- Some with high classification confidence, some lower
- Include both plain text and HTML content

### Sample Generated Markdown
- 2-3 examples per thread
- Different generation timestamps
- Show progression (earlier vs later generations as notes accumulate)
- Realistic markdown structure with headers, lists, links

**Location**: `frontend/src/data/mockData.ts`

**Helper Functions**:
```typescript
export const getAllThreads = (): Thread[] => { ... }
export const getThreadById = (id: string): Thread | undefined => { ... }
export const getNotesByThreadId = (threadId: string): Note[] => { ... }
export const getNoteById = (id: string): Note | undefined => { ... }
export const getGeneratedMarkdownByThreadId = (threadId: string): GeneratedMarkdown[] => { ... }
```

## Quick Start (Phase 1)

Ready to start building? Here's the fastest path:

```bash
# 1. Initialize project
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install

# 2. Install Tailwind + Shadcn
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init

# 3. Install dependencies
npm install react-router-dom date-fns lucide-react

# 4. Start coding!
npm run dev
```

**First files to create**:
1. `src/types/index.ts` - Define all TypeScript interfaces
2. `src/data/mockData.ts` - Create comprehensive mock data
3. `src/contexts/ThreadsContext.tsx` - Set up state management

Then build components in this order:
- ThreadCard → ThreadsList → Navigation → App routing
- NoteCard → ThreadDetail
- NewThreadForm → MarkdownPreview

## Next Steps

When ready to implement, start with **Phase 1, Step 1: Project Setup**. This frontend-first approach lets you iterate on UX/UI quickly without backend complexity, then seamlessly integrate the backend later.
