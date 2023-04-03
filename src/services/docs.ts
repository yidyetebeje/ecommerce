import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { DocsList } from './types'

// Define a service using a base URL and expected endpoints
export const docsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getDocsList: builder.query<DocsList, void>({
      query: () => `/docs_list`,
    }),
    deleteDoc: builder.mutation<void, string>({
      query: (docId) => ({
        url: `/docs/${docId}`,
        method: 'DELETE',
      }),
    }),
  }),
  reducerPath: 'docsApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDocsListQuery } = docsApi
