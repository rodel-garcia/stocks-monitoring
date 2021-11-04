import { FetchState } from '../../../app.definition';
import { useAppSelector } from '../../../store/hooks';
import {
  selectFetchStatus,
  selectLoggerStatus,
  selectLogs,
} from '../../../store/stocks/stocks.selectors';

import style from './logger-body.component.module.scss';

const LoggerBody: React.FC = () => {
  const logs = useAppSelector(selectLogs);
  const isLoggerPause = useAppSelector(selectLoggerStatus);
  const fetchingStatus = useAppSelector(selectFetchStatus);

  return (
    <div className={style['logger-body']}>
      {logs.map((log, i) => (
        <div
          key={i}
          className={`${style['log-list-item']} ${
            fetchingStatus === FetchState.DONE && !isLoggerPause && i === 0
              ? style['new-item']
              : ''
          }`}
        >
          <div className={style['log-content-header']}>
            Updates for {new Date(log.timeStamp).toLocaleDateString()}{' '}
            {new Date(log.timeStamp).toLocaleTimeString()}
          </div>
          <div className={style['log-content-body']}>
            {log.data.map((stock, j) => (
              <span key={j}>
                {stock.code}: ${stock.price}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoggerBody;
