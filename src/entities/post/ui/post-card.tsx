import Link from "next/link";
import type { PostCardProps } from "./types";
import s from "./post-card.module.scss";

export function PostCard({ post, index, actions, footer }: PostCardProps) {
  return (
    <article
      className={s.card}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={s.body}>
        <div className={s.content}>
          <span className={s.id}>#{post.id}</span>
          <Link href={`/posts/${post.id}`} className={s.titleLink}>
            <h3 className={s.title}>{post.title}</h3>
          </Link>
          <p className={s.excerpt}>{post.body}</p>
        </div>
        {actions && <div className={s.actions}>{actions}</div>}
      </div>
      {footer}
    </article>
  );
}
