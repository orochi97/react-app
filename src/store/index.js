import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export * from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;