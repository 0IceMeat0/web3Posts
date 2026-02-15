import { baseApi } from "@/shared/api";
import type { Photo } from "../types";

export const photoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], void>({
      query: () => "/photos",
      providesTags: [{ type: "Photo", id: "LIST" }],
    }),
    getPhoto: builder.query<Photo, number>({
      query: (id) => `/photos/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Photo", id }],
    }),
  }),
});

/** Fetches all photos. */
export const useGetPhotosQuery = photoApi.endpoints.getPhotos.useQuery;
/** Fetches a single photo by id. */
export const useGetPhotoQuery = photoApi.endpoints.getPhoto.useQuery;
