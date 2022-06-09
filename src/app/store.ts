import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coreSlice from '../features/counter/coreSlice';

export const store = configureStore({
  reducer: {
    core: coreSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
