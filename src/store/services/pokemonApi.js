import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  // eslint-disable-next-line no-undef
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    savePokemon: builder.mutation({
      query: (body) => ({
        url: `pokemon/save`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default pokemonApi;
