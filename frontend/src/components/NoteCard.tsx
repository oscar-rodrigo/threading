import type { Note } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onDeleteNote?: (noteId: string) => void;
}

export function NoteCard({ note, onDeleteNote }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const receivedAt = note.emailMetadata
    ? formatDistanceToNow(new Date(note.emailMetadata.receivedAt), { addSuffix: true })
    : formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });

  const content = note.content.extractedText;
  // Show less text on mobile (100 chars) vs desktop (200 chars)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const charLimit = isMobile ? 100 : 200;
  const isLong = content.length > charLimit;
  const displayContent = isExpanded || !isLong ? content : content.slice(0, charLimit) + '...';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-6 pb-2 md:pb-3">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div className="flex-1 min-w-0">
            {note.emailMetadata && (
              <h3 className="font-semibold text-sm md:text-base leading-tight mb-1.5 md:mb-2">
                {note.emailMetadata.subject}
              </h3>
            )}
            <div className="flex flex-wrap gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                <span>
                  {note.emailMetadata ? receivedAt : `Created ${receivedAt}`}
                </span>
              </div>
            </div>
          </div>
          {onDeleteNote && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteNote(note.id)}
              className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete note</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:underline mt-2 font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
        {isExpanded && note.classification && (
          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            <p className="font-medium mb-1">Classification reasoning:</p>
            <p className="italic">{note.classification.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}