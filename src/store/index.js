import { configureStore } from '@reduxjs/toolkit';
import { apiReducers, apiMiddlewares } from './services';
import rootReducer from './reducer';

export * from './reducer';

const store = configureStore({
  reducer: {
    ...rootReducer,
    ...apiReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddlewares),
});

export default store;