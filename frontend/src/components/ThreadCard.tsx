import type { Thread } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { FileText } from 'lucide-react';

interface ThreadCardProps {
  thread: Thread;
  onClick?: () => void;
}

export function ThreadCard({ thread, onClick }: ThreadCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(thread.updatedAt), { addSuffix: true });

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
      style={{ borderLeftWidth: '4px', borderLeftColor: thread.color }}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl truncate">{thread.title}</CardTitle>
            <CardDescription className="mt-1.5 line-clamp-2">
              {thread.description}
            </CardDescription>
          </div>
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: thread.color }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>{thread.noteCount} {thread.noteCount === 1 ? 'note' : 'notes'}</span>
          </div>
          <span>Updated {lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
}
