import { useThreads } from '@/hooks/useThreads';
import { ThreadCard } from './ThreadCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Inbox, Plus } from 'lucide-react';

export function ThreadsList() {
  const { threads } = useThreads();
  const navigate = useNavigate();

  const handleThreadClick = (threadId: string) => {
    navigate(`/threads/${threadId}`);
  };

  const handleNewThread = () => {
    navigate('/threads/new');
  };

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No threads yet</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Get started by creating your first thread to organize your notes
        </p>
        <Button onClick={handleNewThread} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Your First Thread
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Your Threads</h1>
        <p className="text-muted-foreground mt-1">
          {threads.length} {threads.length === 1 ? 'thread' : 'threads'}
        </p>
      </div>

      <div className="space-y-1 border rounded-lg overflow-hidden">
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onClick={() => handleThreadClick(thread.id)}
          />
        ))}
      </div>
    </div>
  );
}
