import { useThreadsContext } from '@/contexts/ThreadsContext';

/**
 * Custom hook to access threads context
 * Convenience wrapper around useThreadsContext
 */
export function useThreads() {
  return useThreadsContext();
}
