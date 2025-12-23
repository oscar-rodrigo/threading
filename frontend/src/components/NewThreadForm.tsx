import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThreads } from '@/hooks/useThreads';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
];

export function NewThreadForm() {
  const navigate = useNavigate();
  const { createThread } = useThreads();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAddKeyword = () => {
    const keyword = keywordsInput.trim().toLowerCase();
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeywordsInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleKeywordsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (keywords.length === 0) {
      newErrors.keywords = 'Add at least one keyword';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newThread = createThread({
      title: title.trim(),
      description: description.trim(),
      keywords,
      color: selectedColor,
    });

    navigate(`/threads/${newThread.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
        <h1 className="text-3xl font-bold">Create New Thread</h1>
        <p className="text-muted-foreground mt-1">
          Organize your notes by creating a new thread
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thread Details</CardTitle>
          <CardDescription>
            Provide information about your thread to help classify incoming notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Product Ideas, Meeting Notes, Research"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what kind of notes belong in this thread..."
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label htmlFor="keywords">
                Keywords <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="keywords"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  onKeyDown={handleKeywordsKeyDown}
                  placeholder="Add keywords (press Enter)"
                  className={errors.keywords ? 'border-destructive' : ''}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddKeyword}
                  disabled={!keywordsInput.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {errors.keywords && !keywords.length && (
                <p className="text-sm text-destructive">{errors.keywords}</p>
              )}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveKeyword(keyword)}
                    >
                      {keyword}
                      <span className="ml-1.5">×</span>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Keywords help classify incoming notes to the right thread
              </p>
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <Label>Thread Color</Label>
              <div className="flex flex-wrap gap-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-md transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-primary scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Create Thread
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
