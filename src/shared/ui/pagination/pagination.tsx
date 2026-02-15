"use client";

import s from "./pagination.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  range?: number;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  range = 1,
}: PaginationProps) => {
  return (
    <div className={s.pagination}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={s.pageBtn}
      >
        ←
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        if (
          p === 1 ||
          p === totalPages ||
          Math.abs(p - page) <= range
        ) {
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={p === page ? s.pageBtnActive : s.pageBtn}
            >
              {p}
            </button>
          );
        }
        if (p === 2 && page > range + 2) {
          return (
            <span key="dots-start" className={s.pageDots}>
              ···
            </span>
          );
        }
        if (p === totalPages - 1 && page < totalPages - range - 1) {
          return (
            <span key="dots-end" className={s.pageDots}>
              ···
            </span>
          );
        }
        return null;
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={s.pageBtn}
      >
        →
      </button>
    </div>
  );
};
