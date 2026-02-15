"use client";

import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/entities/post";
import { useAppDispatch } from "@/shared/lib";
import { showToast } from "@/shared/lib";
import type { CreatePostPayload, UpdatePostPayload } from "@/entities/post";

/** Creates a post and shows success/error toast */
export function useCreatePostWithToast() {
  const [createPost, state] = useCreatePostMutation();
  const dispatch = useAppDispatch();

  const trigger = async (data: CreatePostPayload) => {
    try {
      await createPost(data).unwrap();
      dispatch(showToast("Post created successfully", "success"));
    } catch {
      dispatch(showToast("Failed to create post", "error"));
    }
  };

  return { trigger, ...state };
}

/** Updates a post and shows success/error toast. */
export function useUpdatePostWithToast() {
  const [updatePost, state] = useUpdatePostMutation();
  const dispatch = useAppDispatch();

  const trigger = async (args: { id: number; data: UpdatePostPayload }) => {
    try {
      await updatePost(args).unwrap();
      dispatch(showToast("Post updated successfully", "success"));
    } catch {
      dispatch(showToast("Failed to update post", "error"));
    }
  };

  return { trigger, ...state };
}

/** Deletes a post and shows success/error toast */
export function useDeletePostWithToast() {
  const [deletePost, state] = useDeletePostMutation();
  const dispatch = useAppDispatch();

  const trigger = async (id: number) => {
    try {
      await deletePost(id).unwrap();
      dispatch(showToast("Post deleted", "success"));
    } catch {
      dispatch(showToast("Failed to delete post", "error"));
    }
  };

  return { trigger, ...state };
}
