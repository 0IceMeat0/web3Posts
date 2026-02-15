"use client";

import { use } from "react";
import Link from "next/link";
import { SkeletonPostForm, ErrorBlock } from "@/shared/ui";
import { useGetPostQuery } from "@/entities/post";
import { PostForm, useUpdatePostWithToast } from "@/features/post-crud";
import type { EditPostPageProps } from "./types";
import s from "./page.module.scss";

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id: idStr } = use(params);
  const postId = Number(idStr);
  const { data: post, isLoading, isError } = useGetPostQuery(postId);
  const updateMutation = useUpdatePostWithToast();

  const handleUpdate = async (data: { title: string; body: string }) => {
    await updateMutation.trigger({
      id: postId,
      data: { title: data.title, body: data.body },
    });
  };

  return (
    <div>
      <div className={s.header}>
        <Link href={`/posts/${postId}`} className={s.backLink}>
          ← Back to Post
        </Link>
        <h1 className={s.title}>
          Edit Post <span className={s.titleId}>#{postId}</span>
        </h1>
      </div>

      {isLoading && <SkeletonPostForm />}

      {isError && (
        <ErrorBlock message="Failed to load post" backHref="/posts" />
      )}

      {post && (
        <div className={s.card}>
          <PostForm
            initialTitle={post.title}
            initialBody={post.body}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
            isPending={updateMutation.isLoading}
          />
        </div>
      )}
    </div>
  );
}
