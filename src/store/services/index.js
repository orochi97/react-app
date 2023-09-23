import pokemonApi  from './pokemonApi';
import digimonApi  from './digimonApi';

export { default as pokemonApi }  from './pokemonApi';
export { default as digimonApi }  from './digimonApi';

export const apiReducers = {
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [digimonApi.reducerPath]: digimonApi.reducer,
};

export const apiMiddlewares = [
  pokemonApi.middleware,
  digimonApi.middleware,
];
