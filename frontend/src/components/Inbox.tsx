import { useThreads } from '@/hooks/useThreads';
import { InboxNoteCard } from './InboxNoteCard';
import { Button } from '@/components/ui/button';
import { Inbox as InboxIcon, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Inbox() {
  const { getInboxNotes, threads, moveNote, deleteNote } = useThreads();
  const navigate = useNavigate();
  const inboxNotes = getInboxNotes();

  const handleMoveNote = (noteId: string, threadId: string) => {
    moveNote(noteId, threadId);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
  };

  if (inboxNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">All Caught Up!</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Your inbox is empty. All notes have been sorted into threads.
        </p>
        <Button onClick={() => navigate('/')} variant="outline">
          Back to Threads
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto px-4 md:px-0">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg">
          <InboxIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Inbox</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {inboxNotes.length} unsorted {inboxNotes.length === 1 ? 'note' : 'notes'} needing review
          </p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {inboxNotes.map((note) => (
          <InboxNoteCard
            key={note.id}
            note={note}
            threads={threads}
            onMoveNote={handleMoveNote}
            onDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
}
