import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  pauseLogger,
  resumeLogger,
} from '../../../store/stocks/stocks.actions';
import { selectLoggerStatus } from '../../../store/stocks/stocks.selectors';

import style from './logger-header.component.module.scss';

const LoggerHeader: React.FC = () => {
  const isLoggerPause = useAppSelector(selectLoggerStatus);
  const dispatch = useAppDispatch();

  const toggleLogger = () => {
    if (isLoggerPause) {
      dispatch(resumeLogger());
    } else {
      dispatch(pauseLogger());
    }
  };

  return (
    <div className={style['logger-header']}>
      <h2>Log</h2>
      <button onClick={() => toggleLogger()}>
        {isLoggerPause ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};

export default LoggerHeader;
