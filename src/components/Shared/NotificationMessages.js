
import { notification, Icon } from 'antd';
import React from 'react';

export const openNotification = (error) => {
    notification.open({
      message: 'Notification',
      description:
        error,
      icon: <Icon type="exclamation-circle" style={{ color: '#d63031' }} />,
      placement: "topRight"
    });
  };

  export const successNotifiaction = (error) => {
    notification.open({
      message: 'Notification',
      description:
        error,
      icon: <Icon type="check-circle" style={{ color: '#1dd1a1'}} />,
      placement: "topRight"
    });
  };