import type { ReactNode } from "react";
import type { Post } from "../types";

export interface PostCardProps {
  post: Post;
  index: number;
  /** Slot for action buttons (edit, delete) */
  actions?: ReactNode;
  /** Slot for expandable footer (e.g. comments) */
  footer?: ReactNode;
}
