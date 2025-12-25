import type { Thread } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { FileText } from 'lucide-react';

interface ThreadCardProps {
  thread: Thread;
  onClick?: () => void;
}

export function ThreadCard({ thread, onClick }: ThreadCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(thread.updatedAt), { addSuffix: true });

  return (
    <div
      className="flex items-center justify-between py-4 px-4 cursor-pointer transition-colors hover:bg-muted/50 rounded-md"
      onClick={onClick}
    >
      <h3 className="text-base font-medium flex-1 min-w-0 pr-4 truncate">
        {thread.title}
      </h3>
      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          <span>{thread.noteCount} {thread.noteCount === 1 ? 'note' : 'notes'}</span>
        </div>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Updated {lastUpdated}</span>
      </div>
    </div>
  );
}
