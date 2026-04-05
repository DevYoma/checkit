interface PaginationControlsProps {
  page: number;
  hasNextPage: boolean;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * PaginationControls
 *
 * A pure presentational component — no data fetching, no routing logic.
 * Receives everything it needs via props, keeping it easily testable.
 */
export default function PaginationControls({
  page,
  hasNextPage,
  isFetching,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
      <button
        id="pagination-previous"
        onClick={onPrevious}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <span aria-live="polite" aria-atomic="true">
        Page {page} {isFetching ? '(loading…)' : ''}
      </span>

      <button
        id="pagination-next"
        onClick={onNext}
        disabled={!hasNextPage}
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
}
