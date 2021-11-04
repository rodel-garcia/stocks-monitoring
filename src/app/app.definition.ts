export const API_URL = '/stock-pricing';

export const FETCH_PER_SECONDS_INTERVAL = 2000;

export interface StocksState {
  logs: Log[];
  all: Stock[][];
  isLoggerPause: boolean;
  status: FetchState;
  summary: StocksSummary[];
}

export type Stock = {
  code: string;
  price: number;
};

export type Log = {
  data: Stock[];
  timeStamp: string;
};

export type StocksSummary = {
  code: string;
  starting: number;
  lowest: number;
  highest: number;
  current: number;
};

export enum FetchState {
  LOADING,
  DONE,
  FAILED,
}

export enum LoggerState {
  PAUSE,
  RESUME,
}

export enum NotificationType {
  Error,
  Message,
}
