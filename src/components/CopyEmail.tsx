'use client';

import { useState } from 'react';

export default function CopyEmail({ email, className = 'btn btn-ghost' }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={className} onClick={copy}>
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  );
}
