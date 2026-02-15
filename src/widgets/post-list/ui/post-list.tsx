"use client";

import { useState, useMemo, useTransition, useCallback } from "react";
import Link from "next/link";
import { useGetPostsQuery, PostCard } from "@/entities/post";
import { useDeletePostWithToast } from "@/features/post-crud";
import { PostActions } from "./post-actions";
import { PostFooter } from "./post-footer";
import { useDebounce, useSessionState, filterByTitle, paginate } from "@/shared/lib";
import { SearchInput, SkeletonPostList, ErrorBlock, Pagination } from "@/shared/ui";
import s from "./post-list.module.scss";

const POSTS_PER_PAGE = 10;

export function PostList() {
  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery();
  const deleteMutation = useDeletePostWithToast();
  const [search, setSearch] = useSessionState("posts-search", "");
  const [page, setPage] = useSessionState("posts-page", 1);
  const [, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 250);

  const [openComments, setOpenComments] = useState<Set<number>>(new Set());
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return filterByTitle(posts, debouncedSearch);
  }, [posts, debouncedSearch]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(
    () => paginate(filteredPosts, page, POSTS_PER_PAGE),
    [filteredPosts, page]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    startTransition(() => setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    startTransition(() => setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleComments = useCallback((postId: number) => {
    setOpenComments((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  }, []);

  const handleDelete = useCallback(
    async (postId: number) => {
      if (confirmDeleteId !== postId) {
        setConfirmDeleteId(postId);
        return;
      }
      await deleteMutation.trigger(postId);
      setConfirmDeleteId(null);
    },
    [confirmDeleteId, deleteMutation]
  );

  return (
    <div>
      <div className={s.header}>
        <div>
          <h1 className={s.title}>Posts</h1>
          <p className={s.subtitle}>
            {filteredPosts.length} posts
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </p>
        </div>
        <Link href="/posts/new" className={s.newBtn}>
          <span>+</span> New Post
        </Link>
      </div>

      <div className={s.search}>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search posts by title..."
        />
      </div>

      {isLoading && <SkeletonPostList />}

      {isError && <ErrorBlock message="Failed to load posts" onRetry={() => refetch()} />}

      {!isLoading && !isError && (
        <>
          {paginatedPosts.length === 0 ? (
            <div className={s.empty}>
              <p className={s.emptyText}>
                {debouncedSearch
                  ? "No posts match your search"
                  : "No posts yet"}
              </p>
            </div>
          ) : (
            <div className={s.list}>
              {paginatedPosts.map((post, idx) => {
                const commentsOpen = openComments.has(post.id);
                const isConfirming = confirmDeleteId === post.id;

                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={idx}
                    actions={
                      <PostActions
                        postId={post.id}
                        isConfirming={isConfirming}
                        isDeleting={deleteMutation.isLoading}
                        onDelete={() => handleDelete(post.id)}
                        onCancelDelete={() => setConfirmDeleteId(null)}
                      />
                    }
                    footer={
                      <PostFooter
                        postId={post.id}
                        commentsOpen={commentsOpen}
                        onToggle={() => toggleComments(post.id)}
                      />
                    }
                  />
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
