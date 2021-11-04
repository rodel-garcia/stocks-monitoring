import { NotificationType } from '../../app.definition';

import style from './notification-bar.component.module.scss';

const NotificationBar: React.FC<{
  type?: NotificationType;
  condition: boolean;
  message: string;
}> = ({ type, condition, message }) => (
  <div
    className={`${style['notification-bar']} ${
      type === NotificationType.Error ? style['error'] : ''
    } ${condition ? style['show'] : ''}`}
  >
    {message}
  </div>
);

export default NotificationBar;
