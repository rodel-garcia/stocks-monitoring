import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FetchState,
  Stock,
  StocksState,
  StocksSummary,
} from '../../app.definition';
import { getStocks } from './stocks.api';

const initialState: StocksState = {
  logs: [],
  all: [],
  summary: [],
  isLoggerPause: false,
  status: FetchState.DONE,
};

export const fetStocks = createAsyncThunk(
  'stocks/fetStocks',
  async () => await getStocks()
);

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    pauseLogger: (state) => ({
      ...state,
      isLoggerPause: true,
    }),
    resumeLogger: (state) => ({
      ...state,
      isLoggerPause: false,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetStocks.pending, (state) => ({
        ...state,
        status: FetchState.LOADING,
      }))
      .addCase(fetStocks.fulfilled, _buildFulfilledState)
      .addCase(fetStocks.rejected, (state) => ({
        ...state,
        status: FetchState.FAILED,
      })),
});

export default stocksSlice.reducer;

function _buildFulfilledState(
  state: StocksState,
  action: PayloadAction<Stock[]>
) {
  return {
    ...state,
    logs: !state.isLoggerPause
      ? [
          { data: action.payload, timeStamp: new Date().toString() },
          ...state.logs,
        ]
      : state.logs,
    all: [...state.all, action.payload],
    summary: _buildSummaryData(action.payload, state),
    status: FetchState.DONE,
  };
}

const _buildSummaryData = (
  payload: Stock[],
  state: StocksState
): StocksSummary[] => {
  const summary = [] as StocksSummary[];
  const stateSummary = state.summary;

  payload.forEach((stock) => {
    const { price } = stock;
    const stockSummary = stateSummary.filter(
      (sum) => sum.code === stock.code
    )[0];
    summary.push({
      code: stock.code,
      starting: !state.all.length
        ? price
        : state.all[0].filter((s) => s.code === stock.code)[0].price,
      lowest: !state.all.length
        ? price
        : stockSummary && stockSummary?.lowest < price
        ? stockSummary?.lowest
        : price,
      highest: !state.all.length
        ? price
        : stockSummary && stockSummary?.highest > price
        ? stockSummary?.highest
        : price,
      current: price,
    });
  });

  return summary;
};
