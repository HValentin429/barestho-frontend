/* @ts-ignore */ 
import Bell from "../../../assets/icones/notif.svg?react";
import { INotification } from '../interfaces/INotification';
import { NOTIFICATION_TEXT } from '../constants/notificationConstants';
import { useMarkAsReadMutation } from "../api/NotificationAPI";
import { removeNotification } from "../api/NotificationSlice";
import { useDispatch } from "react-redux";
import formatDateTimeToday from "../../common/helpers/FormatDateTodayOrNot";

const NotificationDropdown = ({ notifications }: { notifications: INotification[] }) => {
    const dispatch = useDispatch();
    const [markAsRead, { isLoading }] = useMarkAsReadMutation();
    
    const handleMarkAsRead = async (notificationId: number) => {
        try {
          await markAsRead({ notificationId }).unwrap(); 
          dispatch(removeNotification(notificationId));
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      };

      console.log(notifications);
      
  return (
          <div className="absolute right-0 mt-2 w-80 max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div className="p-4">
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.map((notification: INotification) => (
                  <div onClick={() => handleMarkAsRead(notification.id)} key={notification.id} className="notification-item p-2 mb-2 border-b last:border-b-0">
                    <small className="text-gray-500">{formatDateTimeToday(notification.created_at)}</small>
                    <p className="font-semibold text-sm">{NOTIFICATION_TEXT[notification.type as keyof typeof NOTIFICATION_TEXT] }: {notification.sender}</p>
                  </div>
                ))
              )}
            </div>
          </div>
  );
};

export default NotificationDropdown;
