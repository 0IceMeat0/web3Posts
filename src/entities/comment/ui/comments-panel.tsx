"use client";

import { SkeletonComments, ErrorBlock } from "@/shared/ui";
import type { CommentsPanelProps } from "./types";
import { useGetCommentsQuery } from "../api/comment-api";
import s from "./comments-panel.module.scss";

export function CommentsPanel({ postId, isOpen }: CommentsPanelProps) {
  const { data: comments, isLoading, isError, isFetching } =
    useGetCommentsQuery(postId, {
      skip: !isOpen,
      pollingInterval: isOpen ? 30_000 : 0,
    });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={s.panel}>
      <div className={s.header}>
        <h4 className={s.heading}>Comments</h4>
        {isFetching && !isLoading && <span className={s.pulse} />}
      </div>

      {isLoading && <SkeletonComments />}

      {isError && <ErrorBlock message="Failed to load comments" />}

      {comments && (
        <div className={s.list}>
          {comments.map((comment, idx) => (
            <div
              key={comment.id}
              className={s.comment}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className={s.meta}>
                <span className={s.name}>{comment.name}</span>
                <span className={s.email}>{comment.email}</span>
              </div>
              <p className={s.commentBody}>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
