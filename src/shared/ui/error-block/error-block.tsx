"use client";

import Link from "next/link";
import s from "./error-block.module.scss";

interface ErrorBlockProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  backHref?: string;
  backLabel?: string;
}

/** Reusable error state with optional retry and back actions. */
export function ErrorBlock({
  message,
  onRetry,
  retryLabel = "Retry",
  backHref,
  backLabel = "Go Back",
}: ErrorBlockProps) {
  return (
    <div className={s.root}>
      <p className={s.message}>{message}</p>
      <div className={s.actions}>
        {onRetry && (
          <button onClick={onRetry} className={s.btn}>
            {retryLabel}
          </button>
        )}
        {backHref && (
          <Link href={backHref} className={s.btn}>
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
