import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* @ts-ignore */ 
import Bell from "../../../assets/icones/notif.svg?react";
import { INotification } from '../interfaces/INotification';
import { setConnectionStatus } from '../../chat/api/MessageSlice';
import { addNotification } from '../api/NotificationSlice';
import { useGetNotificationsQuery } from '../api/NotificationAPI';
import NotificationDropdown from './NotificationDropdown';

const NotificationComponent = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.notifications.notifications);
  const { data: initialMessages } = useGetNotificationsQuery();
  
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (initialMessages) {
      initialMessages.forEach((notification: INotification) => {
        dispatch(addNotification(notification));
      });
    }
  }, [initialMessages, dispatch]);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws/notifications/');
    setWs(websocket);

    websocket.onopen = () => {
      dispatch(setConnectionStatus(true));
      console.log('WebSocket connected for notifications');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(addNotification(data.notification.message));
    };

    websocket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    websocket.onclose = () => {
      dispatch(setConnectionStatus(false));
      console.log('WebSocket closed for notifications');
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative inline-block">
        <div className="notification-bell cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <Bell className="h-8 w-8" />
          
          {notifications.length > 0 && (
            <div className="absolute top-0 right-0 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </div>
          )}
        </div>
        
        {dropdownOpen && (
          <div ref={dropdownRef}>
            <NotificationDropdown notifications={notifications} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
