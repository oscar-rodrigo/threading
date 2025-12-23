import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThreadsProvider } from '@/contexts/ThreadsContext';
import { Navigation } from '@/components/Navigation';
import { ThreadsList } from '@/components/ThreadsList';
import { ThreadDetail } from '@/components/ThreadDetail';
import { NewThreadForm } from '@/components/NewThreadForm';

function App() {
  return (
    <BrowserRouter>
      <ThreadsProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ThreadsList />} />
              <Route path="/threads/new" element={<NewThreadForm />} />
              <Route path="/threads/:id" element={<ThreadDetail />} />
            </Routes>
          </main>
        </div>
      </ThreadsProvider>
    </BrowserRouter>
  );
}

export default App;
