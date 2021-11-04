import { RootState } from '../store';

export const selectFetchStatus = (state: RootState) => state.stocks.status;
export const selectLogs = (state: RootState) => state.stocks.logs;
export const selectAll = (state: RootState) => state.stocks.all;
export const selectSummary = (state: RootState) => state.stocks.summary;
export const selectLoggerStatus = (state: RootState) =>
  state.stocks.isLoggerPause;
