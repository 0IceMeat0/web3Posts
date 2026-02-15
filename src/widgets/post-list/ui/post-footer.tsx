"use client";

import { CommentsPanel } from "@/entities/comment";
import s from "./post-list.module.scss";

interface PostFooterProps {
  postId: number;
  commentsOpen: boolean;
  onToggle: () => void;
}

export const PostFooter = ({
  postId,
  commentsOpen,
  onToggle,
}: PostFooterProps) => {
  return (
    <div className={s.footer}>
      <button onClick={onToggle} className={s.footerBtn}>
        <span className={commentsOpen ? s.chevronOpen : s.chevron}>▸</span>
        {commentsOpen ? "Hide Comments" : "Show Comments"}
      </button>
      <CommentsPanel postId={postId} isOpen={commentsOpen} />
    </div>
  );
};
