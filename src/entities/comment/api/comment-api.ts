import { baseApi } from "@/shared/api";
import type { Comment } from "../types";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (_result, _error, postId) => [
        { type: "Comment", id: postId },
      ],
    }),
  }),
});

/** Fetches comments for a post */
export const useGetCommentsQuery = commentApi.endpoints.getComments.useQuery;
