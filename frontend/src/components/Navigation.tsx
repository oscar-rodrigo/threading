import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Inbox } from 'lucide-react';
import { useThreads } from '@/hooks/useThreads';

export function Navigation() {
  const location = useLocation();
  const { getInboxNotes } = useThreads();
  const inboxCount = getInboxNotes().length;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ThreadNotes</span>
            </Link>

            <div className="flex items-center gap-1">
              <Link to="/">
                <Button 
                  variant={location.pathname === '/' ? 'secondary' : 'ghost'} 
                  size="sm"
                >
                  Threads
                </Button>
              </Link>
              <Link to="/inbox">
                <Button 
                  variant={location.pathname === '/inbox' ? 'secondary' : 'ghost'} 
                  size="sm"
                  className="relative"
                >
                  <Inbox className="mr-2 h-4 w-4" />
                  Inbox
                  {inboxCount > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                      {inboxCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          <Link to="/threads/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Thread
            </Button>
          </Link>
        </div>
      </div>
      <Separator />
    </nav>
  );
}