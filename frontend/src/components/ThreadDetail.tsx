import { useParams, useNavigate } from 'react-router-dom';
import { useThreads } from '@/hooks/useThreads';
import { NoteCard } from './NoteCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ArrowLeft, FileText, Sparkles, Inbox, Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { threads, getNotesByThreadId, generateMarkdown, updateThread } = useThreads();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const thread = threads.find((t) => t.id === id);
  const notes = id ? getNotesByThreadId(id) : [];

  // Initialize form when thread loads or dialog opens
  useEffect(() => {
    if (thread) {
      setEditTitle(thread.title);
      setEditDescription(thread.description);
    }
  }, [thread, isEditDialogOpen]);

  const handleGenerateMarkdown = async () => {
    if (!id) return;
    setIsGenerating(true);
    try {
      // Simulate generation delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const generated = generateMarkdown(id);
      console.log('Generated markdown:', generated);
      alert('Markdown generated successfully! (In a real app, this would show a preview)');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdit = () => {
    if (!id || !editTitle.trim()) return;
    
    updateThread(id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditDialogOpen(false);
  };

  if (!thread) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-semibold mb-2">Thread not found</h2>
        <p className="text-muted-foreground mb-6">
          This thread doesn't exist or may have been deleted
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Threads
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Threads
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{thread.title}</h1>
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: thread.color }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-2"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Edit thread</span>
              </Button>
            </div>
            <p className="text-muted-foreground text-lg">{thread.description}</p>
          </div>
          <Button
            onClick={handleGenerateMarkdown}
            disabled={notes.length === 0 || isGenerating}
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Markdown'}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>
          <span>•</span>
          <span>
            Created {new Date(thread.createdAt).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            Last updated {new Date(thread.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Separator />

      {/* Notes List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Notes</h2>
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No notes yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Notes sent to this thread via email will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>

      {/* Edit Thread Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Thread</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Thread title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="What is this thread about?"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}