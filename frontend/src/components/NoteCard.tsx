import type { Note } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Mail, User, Calendar } from 'lucide-react';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const receivedAt = note.emailMetadata
    ? formatDistanceToNow(new Date(note.emailMetadata.receivedAt), { addSuffix: true })
    : formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });

  const content = note.content.extractedText;
  const isLong = content.length > 200;
  const displayContent = isExpanded || !isLong ? content : content.slice(0, 200) + '...';

  const getConfidenceBadgeVariant = (confidence?: number) => {
    if (!confidence) return 'secondary';
    if (confidence >= 0.9) return 'default';
    if (confidence >= 0.7) return 'secondary';
    return 'outline';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {note.emailMetadata && (
              <h3 className="font-semibold text-base leading-tight mb-2">
                {note.emailMetadata.subject}
              </h3>
            )}
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {note.emailMetadata && (
                <>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate">{note.emailMetadata.from}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{receivedAt}</span>
                  </div>
                </>
              )}
              {!note.emailMetadata && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Created {receivedAt}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
            {/* Badges removed per user request */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
