"use client";

import { useMemo, useTransition } from "react";
import { useGetPhotosQuery, PhotoItem } from "@/entities/photo";
import { useDebounce, useSessionState, filterByTitle, paginate } from "@/shared/lib";
import { SearchInput, SkeletonPhotoGrid, ErrorBlock, Pagination } from "@/shared/ui";
import { GalleryHeader } from "./gallery-header";
import s from "./photo-gallery.module.scss";

const ITEMS_PER_PAGE = 40;

export function PhotoGallery() {
  const { data: photos, isLoading, isError, refetch } = useGetPhotosQuery();
  const [search, setSearch] = useSessionState("photos-search", "");
  const [page, setPage] = useSessionState("photos-page", 1);
  const [, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 300);

  const filteredPhotos = useMemo(() => {
    if (!photos) return [];
    return filterByTitle(photos, debouncedSearch);
  }, [photos, debouncedSearch]);

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE);

  const paginatedPhotos = useMemo(
    () => paginate(filteredPhotos, page, ITEMS_PER_PAGE),
    [filteredPhotos, page]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    startTransition(() => setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div>
        <GalleryHeader />
        <SkeletonPhotoGrid count={12} />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <GalleryHeader />
        <ErrorBlock message="Failed to load photos" onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div>
      <GalleryHeader />

      <div className={s.searchArea}>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search photos by title..."
        />
        <p className={s.count}>
          {filteredPhotos.length.toLocaleString()} photos
          {debouncedSearch && ` matching "${debouncedSearch}"`}
          {" · "}page {page} of {totalPages}
        </p>
      </div>

      {paginatedPhotos.length === 0 ? (
        <div className={s.emptyState}>
          <p className={s.emptyText}>No photos match your search</p>
        </div>
      ) : (
        <div className={s.grid}>
          {paginatedPhotos.map((photo, idx) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              priority={idx < 8}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          range={2}
        />
      )}
    </div>
  );
}
