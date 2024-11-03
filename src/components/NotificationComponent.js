import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081/ws/notifications/');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;