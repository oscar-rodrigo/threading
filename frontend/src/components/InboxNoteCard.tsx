import type { Note, Thread } from '@/types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Check, ChevronDown, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface InboxNoteCardProps {
  note: Note;
  threads: Thread[];
  onMoveNote: (noteId: string, threadId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

export function InboxNoteCard({ note, threads, onMoveNote, onDeleteNote }: InboxNoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const receivedAt = note.emailMetadata
    ? formatDistanceToNow(new Date(note.emailMetadata.receivedAt), { addSuffix: true })
    : formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });

  const content = note.content.extractedText;
  const isLong = content.length > 200;
  const displayContent = isExpanded || !isLong ? content : content.slice(0, 200) + '...';

  const suggestedThreadId = note.classification?.threadId;
  const suggestedThread = threads.find(t => t.id === suggestedThreadId);

  return (
    <Card className="overflow-hidden border-l-2 md:border-l-4 border-l-primary/20">
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
        </div>
      </CardHeader>

      <CardContent className="p-3 md:p-6 pt-0 pb-2 md:pb-3">
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
        
        {/* AI Suggestion Area */}
        {suggestedThread && (
          <div className="mt-3 md:mt-4 p-3 bg-muted/50 rounded-md border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Suggested Thread</span>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: suggestedThread.color }}
              />
              <span className="font-medium text-sm truncate">{suggestedThread.title}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                ({Math.round((note.classification?.confidence || 0) * 100)}%)
              </span>
            </div>
            {note.classification?.reasoning && (
              <p className="text-xs text-muted-foreground mt-2 pl-4 border-l-2 border-primary/20 italic">
                "{note.classification.reasoning}"
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-muted/20 p-3 md:p-6 md:py-3 flex flex-col sm:flex-row justify-between gap-2 border-t">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Approve suggestion button - shows when there's a suggestion */}
          {suggestedThread && (
            <Button
              size="sm"
              onClick={() => onMoveNote(note.id, suggestedThread.id)}
              className="w-full sm:w-auto min-h-[44px]"
            >
              <Check className="mr-1.5 h-3.5 w-3.5" />
              Approve suggestion
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px]">
                Move to...
                <ChevronDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {threads.map((thread) => (
                <DropdownMenuItem
                  key={thread.id}
                  onClick={() => onMoveNote(note.id, thread.id)}
                >
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: thread.color }}
                  />
                  <span className="truncate">{thread.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteNote(note.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto min-h-[44px]"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
