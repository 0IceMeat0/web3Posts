"use client";

import { use } from "react";
import Link from "next/link";
import { SkeletonPostDetail, ErrorBlock } from "@/shared/ui";
import { useGetPostQuery } from "@/entities/post";
import { CommentsPanel } from "@/entities/comment";
import type { PostDetailPageProps } from "./types";
import s from "./page.module.scss";

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id: idStr } = use(params);
  const postId = Number(idStr);
  const { data: post, isLoading, isError } = useGetPostQuery(postId);

  return (
    <div>
      <div className={s.header}>
        <Link href="/posts" className={s.backLink}>
          ← Back to Posts
        </Link>

        {post && (
          <div className={s.titleRow}>
            <h1 className={s.title}>
              <span className={s.titleId}>#{post.id} </span>
              {post.title}
            </h1>
            <Link href={`/posts/${postId}/edit`} className={s.editLink}>
              Edit
            </Link>
          </div>
        )}
      </div>

      {isLoading && <SkeletonPostDetail />}

      {isError && (
        <ErrorBlock message="Failed to load post" backHref="/posts" />
      )}

      {post && (
        <>
          <div className={s.card}>
            <p className={s.body}>{post.body}</p>
            <div className={s.meta}>User ID: {post.userId}</div>
          </div>

          <div className={s.commentsSection}>
            <div className={s.commentsHeader}>
              <h2 className={s.commentsTitle}>Comments</h2>
            </div>
            <CommentsPanel postId={postId} isOpen />
          </div>
        </>
      )}
    </div>
  );
}
