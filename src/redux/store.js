import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './features/repo.slice';
import filterReducer from './features/filter.slice';

export const store = configureStore({
  reducer: {
      repo: repoReducer,
      filter: filterReducer
  },
})