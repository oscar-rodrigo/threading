import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Thread, Note, GeneratedMarkdown } from '@/types';
import {
  mockThreads,
  mockNotes,
  mockGeneratedMarkdown,
} from '@/data/mockData';

interface ThreadsContextType {
  // State
  threads: Thread[];
  notes: Note[];
  generatedMarkdown: GeneratedMarkdown[];
  selectedThreadId: string | null;

  // Thread actions
  createThread: (thread: Omit<Thread, 'id' | 'createdAt' | 'updatedAt' | 'noteCount'>) => Thread;
  updateThread: (id: string, updates: Partial<Thread>) => void;
  deleteThread: (id: string) => void;
  setSelectedThread: (id: string | null) => void;

  // Note actions
  getNotesByThreadId: (threadId: string) => Note[];
  getInboxNotes: () => Note[];
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  moveNote: (noteId: string, targetThreadId: string) => void;

  // Generated markdown actions
  getGeneratedMarkdownByThreadId: (threadId: string) => GeneratedMarkdown[];
  generateMarkdown: (threadId: string) => GeneratedMarkdown;
}

const ThreadsContext = createContext<ThreadsContextType | undefined>(undefined);

export function ThreadsProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<GeneratedMarkdown[]>(mockGeneratedMarkdown);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // Thread actions
  const createThread = (threadData: Omit<Thread, 'id' | 'createdAt' | 'updatedAt' | 'noteCount'>): Thread => {
    const newThread: Thread = {
      ...threadData,
      id: `thread-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      noteCount: 0,
    };
    setThreads(prev => [...prev, newThread]);
    return newThread;
  };

  const updateThread = (id: string, updates: Partial<Thread>) => {
    setThreads(prev =>
      prev.map(thread =>
        thread.id === id
          ? { ...thread, ...updates, updatedAt: new Date().toISOString() }
          : thread
      )
    );
  };

  const deleteThread = (id: string) => {
    setThreads(prev => prev.filter(thread => thread.id !== id));
    setNotes(prev => prev.filter(note => note.threadId !== id));
    setGeneratedMarkdown(prev => prev.filter(gen => gen.threadId !== id));
    if (selectedThreadId === id) {
      setSelectedThreadId(null);
    }
  };

  const setSelectedThread = (id: string | null) => {
    setSelectedThreadId(id);
  };

  // Note actions
  const getNotesByThreadId = (threadId: string): Note[] => {
    return notes.filter(note => note.threadId === threadId);
  };

  const getInboxNotes = (): Note[] => {
    return notes.filter(note => note.threadId === null);
  };

  const createNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note => {
    const newNote: Note = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [...prev, newNote]);

    // Update thread note count if assigned to a thread
    if (noteData.threadId) {
      setThreads(prev =>
        prev.map(thread =>
          thread.id === noteData.threadId
            ? {
                ...thread,
                noteCount: thread.noteCount + 1,
                updatedAt: new Date().toISOString(),
              }
            : thread
        )
      );
    }

    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const moveNote = (noteId: string, targetThreadId: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? { ...note, threadId: targetThreadId, updatedAt: new Date().toISOString() }
          : note
      )
    );

    // Update thread note counts
    setThreads(prev =>
      prev.map(thread => {
        if (thread.id === targetThreadId) {
          return {
            ...thread,
            noteCount: thread.noteCount + 1,
            updatedAt: new Date().toISOString(),
          };
        }
        return thread;
      })
    );
  };

  const deleteNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setNotes(prev => prev.filter(n => n.id !== id));

      // Update thread note count if it was assigned to a thread
      if (note.threadId) {
        setThreads(prev =>
          prev.map(thread =>
            thread.id === note.threadId
              ? {
                  ...thread,
                  noteCount: Math.max(0, thread.noteCount - 1),
                  updatedAt: new Date().toISOString(),
                }
              : thread
          )
        );
      }
    }
  };

  // Generated markdown actions
  const getGeneratedMarkdownByThreadId = (threadId: string): GeneratedMarkdown[] => {
    return generatedMarkdown.filter(gen => gen.threadId === threadId);
  };

  const generateMarkdown = (threadId: string): GeneratedMarkdown => {
    const thread = threads.find(t => t.id === threadId);
    const threadNotes = getNotesByThreadId(threadId);

    if (!thread) {
      throw new Error('Thread not found');
    }

    // Mock markdown generation
    const mockContent = `# ${thread.title}

## Summary

This is a generated summary of ${threadNotes.length} notes in the "${thread.title}" thread.

${threadNotes.map((note, idx) => `
### Note ${idx + 1}: ${note.emailMetadata?.subject || 'Untitled'}
${note.emailMetadata ? `**From**: ${note.emailMetadata.from}  ` : ''}
${note.emailMetadata ? `**Date**: ${new Date(note.emailMetadata.receivedAt).toLocaleDateString()}` : ''}

${note.content.extractedText}
`).join('\n')}

## Key Takeaways

- ${threadNotes.length} total notes collected
- Thread created: ${new Date(thread.createdAt).toLocaleDateString()}
- Last updated: ${new Date(thread.updatedAt).toLocaleDateString()}

---

*Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*
*Model: gemini-2.5-pro (mock)*
`;

    const newGeneration: GeneratedMarkdown = {
      id: `gen-${Date.now()}`,
      threadId,
      threadTitle: thread.title,
      content: mockContent,
      generatedAt: new Date().toISOString(),
      modelUsed: 'gemini-2.5-pro',
      noteCount: threadNotes.length,
    };

    setGeneratedMarkdown(prev => [...prev, newGeneration]);
    return newGeneration;
  };

  const value: ThreadsContextType = {
    threads,
    notes,
    generatedMarkdown,
    selectedThreadId,
    createThread,
    updateThread,
    deleteThread,
    setSelectedThread,
    getNotesByThreadId,
    getInboxNotes,
    createNote,
    updateNote,
    deleteNote,
    moveNote,
    getGeneratedMarkdownByThreadId,
    generateMarkdown,
  };

  return (
    <ThreadsContext.Provider value={value}>
      {children}
    </ThreadsContext.Provider>
  );
}

export function useThreadsContext() {
  const context = useContext(ThreadsContext);
  if (context === undefined) {
    throw new Error('useThreadsContext must be used within a ThreadsProvider');
  }
  return context;
}