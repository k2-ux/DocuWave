import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import WatchReducer from '../WatchListSlice';

export const store = configureStore({
  reducer: {
    watchlist: WatchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
