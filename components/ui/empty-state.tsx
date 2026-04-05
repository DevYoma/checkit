'use client';

interface EmptyStateProps {
  message: string;
  suggestion?: string;
  onClear?: () => void;
}

/**
 * EmptyState
 * 
 * Reusable component for empty search results or lists.
 */
export default function EmptyState({ message, suggestion, onClear }: EmptyStateProps) {
  return (
    <div className="empty-state p-12 text-center bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-200">
      <p className="text-xl font-medium text-zinc-900 mb-2">{message}</p>
      {suggestion && (
        <p className="text-zinc-500 mb-6">{suggestion}</p>
      )}
      {onClear && (
        <button
          onClick={onClear}
          className="text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
