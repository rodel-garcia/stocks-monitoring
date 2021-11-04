import LoggerBody from './logger-body/logger-body.component';
import LoggerHeader from './logger-header/logger-header.component';

import style from './logger.component.module.scss';

const Logger: React.FC = () => {
  return (
    <section className={style['logger-component']}>
      <LoggerHeader />
      <LoggerBody />
    </section>
  );
};

export default Logger;
