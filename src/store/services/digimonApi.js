import { createApi } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery = ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await Promise.resolve({ a: 1, b: 2, baseUrl, url, method, data, params });
      return { data: result };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

// Define a service using a base URL and expected endpoints
export const digimonApi = createApi({
  reducerPath: 'digimonApi',
  // eslint-disable-next-line no-undef
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // eslint-disable-next-line no-undef
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDigimonByName: builder.query({
      query: (name) => `digimon/${name}`,
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          console.info('onQueryStarted', args, data);
        } catch (error) {
          // `onError` side-effect
          console.error('onQueryStarted', error);
        }
      },
    }),
    saveDigimon: builder.mutation({
      query: (body) => ({
        url: `digimon/save`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          console.info('onQueryStarted', args, data);
        } catch (error) {
          // `onError` side-effect
          console.error('onQueryStarted', error);
        }
      },
    }),
  }),
});

export default digimonApi;
