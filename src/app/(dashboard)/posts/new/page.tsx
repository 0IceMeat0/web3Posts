"use client";

import Link from "next/link";
import { PostForm, useCreatePostWithToast } from "@/features/post-crud";
import s from "./page.module.scss";

export default function NewPostPage() {
  const createMutation = useCreatePostWithToast();

  const handleCreate = async (data: { title: string; body: string }) => {
    await createMutation.trigger({
      title: data.title,
      body: data.body,
      userId: 1,
    });
  };

  return (
    <div>
      <div className={s.header}>
        <Link href="/posts" className={s.backLink}>
          ← Back to Posts
        </Link>
        <h1 className={s.title}>New Post</h1>
      </div>

      <div className={s.card}>
        <PostForm
          onSubmit={handleCreate}
          submitLabel="Create Post"
          isPending={createMutation.isLoading}
        />
      </div>
    </div>
  );
}
