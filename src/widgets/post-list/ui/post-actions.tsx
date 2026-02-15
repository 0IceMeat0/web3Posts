"use client";

import Link from "next/link";
import s from "./post-list.module.scss";

interface PostActionsProps {
  postId: number;
  isConfirming: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  onCancelDelete: () => void;
}

export const PostActions = ({
  postId,
  isConfirming,
  isDeleting,
  onDelete,
  onCancelDelete,
}: PostActionsProps) => {
  return (
    <>
      <Link href={`/posts/${postId}/edit`} className={s.editBtn}>
        Edit
      </Link>
      {isConfirming ? (
        <div className={s.confirmRow}>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className={s.confirmYes}
          >
            {isDeleting ? "..." : "Yes"}
          </button>
          <button onClick={onCancelDelete} className={s.confirmNo}>
            No
          </button>
        </div>
      ) : (
        <button onClick={onDelete} className={s.delBtn}>
          Del
        </button>
      )}
    </>
  );
};
