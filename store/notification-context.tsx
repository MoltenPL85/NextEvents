import React, { createContext, useEffect, useState } from 'react';
import { NotificationProps } from '../components/ui/notification';

type InitialStateType = {
  notification: NotificationProps | null | undefined;
  showNotification: (notificationData: NotificationProps) => void;
  hideNotification: () => void;
};

const initialState = {
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
};

const NotificationContext = createContext<InitialStateType>(initialState);

export const NotificationContextProvider: React.FC = ({ children }) => {
  const [
    activeNotification,
    setActiveNotification,
  ] = useState<NotificationProps | null>();

  useEffect(() => {
    if (
      activeNotification?.status === 'success' ||
      activeNotification?.status === 'error'
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: NotificationProps) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
