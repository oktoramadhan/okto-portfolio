// A line of items that scrolls sideways forever. Content is duplicated so the loop is seamless.
export default function Ticker({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <div className={`ticker ${className}`} aria-label={items.join(', ')}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) =>
          items.map((item, i) => <span key={`${copy}-${i}`}>{item},</span>)
        )}
      </div>
    </div>
  );
}
