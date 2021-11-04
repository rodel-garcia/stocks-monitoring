import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetStocks } from './store/stocks/stocks.reducers';
import { selectAll, selectFetchStatus } from './store/stocks/stocks.selectors';
import {
  FetchState,
  FETCH_PER_SECONDS_INTERVAL,
  NotificationType,
} from './app.definition';

import Logger from './components/logger/logger.component';
import Summary from './components/summary/summary.component';
import NotificationBar from './components/notification-bar/notification-bar.component';

import style from './app.module.scss';

const App = () => {
  const fetchStatus = useAppSelector(selectFetchStatus);
  const stocks = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetchStatus !== FetchState.LOADING) {
        dispatch(fetStocks());
      }
    }, FETCH_PER_SECONDS_INTERVAL);
    return () => clearInterval(interval);
  }, [dispatch, fetchStatus]);

  return (
    <>
      {stocks.length && (
        <div className={style['stocks-monitoring']}>
          <Logger />
          <Summary />
        </div>
      )}
      <NotificationBar condition={!stocks.length} message='Loading ..' />
      <NotificationBar
        condition={fetchStatus === FetchState.FAILED}
        type={NotificationType.Error}
        message='Having trouble fetching data ..'
      />
    </>
  );
};

export default App;
