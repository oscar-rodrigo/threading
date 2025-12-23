import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ThreadNotes</span>
          </Link>

          {!isHome && (
            <Link to="/threads/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Thread
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Separator />
    </nav>
  );
}
