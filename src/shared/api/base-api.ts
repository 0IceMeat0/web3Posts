import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/** RTK Query base API for JSONPlaceholder */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post", "Comment", "Photo"],
  endpoints: () => ({}),
});
