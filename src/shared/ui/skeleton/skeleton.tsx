import s from "./skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
}

/** Animated placeholder bar(s). */
export function Skeleton({ width = "100%", height = "0.875rem", count = 1 }: SkeletonProps) {
  if (count === 1) {
    return <div className={s.bar} style={{ width, height }} />;
  }

  return (
    <div className={s.group}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={s.bar} style={{ width, height }} />
      ))}
    </div>
  );
}

/** Skeleton wrapped in a bordered card. */
export function SkeletonCard({ children }: { children: React.ReactNode }) {
  return <div className={s.card}>{children}</div>;
}

/** Skeleton grid for photo gallery list. */
export function SkeletonPhotoGrid({ count = 12 }: { count?: number }) {
  return (
    <div className={s.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={s.gridItem}>
          <div className={s.gridThumb} />
          <div className={s.gridLabel}>
            <div className={s.gridBar} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skeleton for post list — 5 card placeholders. */
export function SkeletonPostList() {
  return (
    <div className={s.group}>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i}>
          <Skeleton width="4rem" height="12px" />
          <Skeleton width="75%" height="1rem" />
          <Skeleton width="100%" height="12px" />
        </SkeletonCard>
      ))}
    </div>
  );
}

/** Skeleton for single post detail page. */
export function SkeletonPostDetail() {
  return (
    <SkeletonCard>
      <Skeleton width="60%" height="1.5rem" />
      <Skeleton count={3} />
    </SkeletonCard>
  );
}

/** Skeleton for post create/edit form. */
export function SkeletonPostForm() {
  return (
    <SkeletonCard>
      <Skeleton width="6rem" height="1rem" />
      <Skeleton height="2.5rem" />
      <Skeleton width="4rem" height="1rem" />
      <Skeleton height="10rem" />
    </SkeletonCard>
  );
}

/** Skeleton for single photo detail page. */
export function SkeletonPhotoDetail() {
  return (
    <SkeletonCard>
      <div style={{ aspectRatio: "16/9", width: "100%" }}>
        <Skeleton width="100%" height="100%" />
      </div>
      <Skeleton width="70%" />
      <Skeleton width="30%" height="0.75rem" />
    </SkeletonCard>
  );
}

/** Skeleton for comments panel — 3 rows. */
export function SkeletonComments() {
  return (
    <div className={s.group}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={s.group}>
          <Skeleton width="8rem" height="12px" />
          <Skeleton height="12px" />
        </div>
      ))}
    </div>
  );
}
