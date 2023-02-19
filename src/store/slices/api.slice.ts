import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  endpoints: (build) => ({
    getRepos: build.query({
      query: (args) => {
        const { q, perPage, page } = args;
        return {
          url: 'search/repositories',
          params: { q, per_page: perPage, page },
        };
      },
    }),
  }),
});

export const { useGetReposQuery } = api;
