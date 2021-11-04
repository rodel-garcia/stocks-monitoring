import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stocksReducer from './stocks/stocks.reducers';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
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
