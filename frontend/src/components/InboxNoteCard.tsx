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
import { Calendar, Check, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface InboxNoteCardProps {
  note: Note;
  threads: Thread[];
  onMoveNote: (noteId: string, threadId: string) => void;
}

export function InboxNoteCard({ note, threads, onMoveNote }: InboxNoteCardProps) {
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
    <Card className="overflow-hidden border-l-4 border-l-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {note.emailMetadata && (
              <h3 className="font-semibold text-base leading-tight mb-2">
                {note.emailMetadata.subject}
              </h3>
            )}
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {note.emailMetadata ? receivedAt : `Created ${receivedAt}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
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
          <div className="mt-4 p-3 bg-muted/50 rounded-md border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Suggested Thread</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: suggestedThread.color }}
                />
                <span className="font-medium">{suggestedThread.title}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round((note.classification?.confidence || 0) * 100)}% confidence)
                </span>
              </div>
              <Button 
                size="sm" 
                onClick={() => onMoveNote(note.id, suggestedThread.id)}
                className="h-8"
              >
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Approve
              </Button>
            </div>
            {note.classification?.reasoning && (
              <p className="text-xs text-muted-foreground mt-2 pl-4 border-l-2 border-primary/20 italic">
                "{note.classification.reasoning}"
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-muted/20 py-3 flex justify-end border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
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
      </CardFooter>
    </Card>
  );
}
