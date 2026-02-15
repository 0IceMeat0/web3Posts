import { baseApi } from "@/shared/api";
import type { Post, CreatePostPayload, UpdatePostPayload } from "../types";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<Post, CreatePostPayload>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.unshift(newPost);
            })
          );
        } catch {}
      },
    }),

    updatePost: builder.mutation<
      Post,
      { id: number; data: UpdatePostPayload }
    >({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updated } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const idx = draft.findIndex((p) => p.id === id);
              if (idx !== -1) draft[idx] = updated;
            })
          );
          dispatch(
            postApi.util.updateQueryData("getPost", id, () => updated)
          );
        } catch {}
      },
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const idx = draft.findIndex((p) => p.id === id);
            if (idx !== -1) draft.splice(idx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

/** Fetches all posts. */
export const useGetPostsQuery = postApi.endpoints.getPosts.useQuery;
/** Fetches a single post by id. */
export const useGetPostQuery = postApi.endpoints.getPost.useQuery;
/** Creates a new post. */
export const useCreatePostMutation = postApi.endpoints.createPost.useMutation;
/** Updates an existing post. */
export const useUpdatePostMutation = postApi.endpoints.updatePost.useMutation;
/** Deletes a post. */
export const useDeletePostMutation = postApi.endpoints.deletePost.useMutation;
