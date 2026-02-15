"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { PostFormProps } from "./types";
import s from "./post-form.module.scss";

export function PostForm({
  initialTitle = "",
  initialBody = "",
  onSubmit,
  submitLabel,
  isPending,
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title is required";
    if (!body.trim()) e.body = "Body is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      return;
    }
    await onSubmit({ title: title.trim(), body: body.trim() });
    router.push("/posts");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div>
        <label htmlFor="post-title" className={s.label}>
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          className={s.input}
        />
        {errors.title && <p className={s.fieldError}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="post-body" className={s.label}>
          Body
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post content..."
          rows={8}
          className={s.textarea}
        />
        {errors.body && <p className={s.fieldError}>{errors.body}</p>}
      </div>

      <div className={s.actions}>
        <button type="submit" disabled={isPending} className={s.submitBtn}>
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link href="/posts" className={s.cancelBtn}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
