import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INotification } from '../../notification/interfaces/INotification';

export const notificationAPI = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getNotifications: builder.query<INotification[], void>({
        query: () => ({
          url: 'notifications/', 
          method: 'GET',
        }),
      }),
    markAsRead: builder.mutation<INotification, { notificationId: number }>({
      query: ({ notificationId }) => ({
        url: `notifications/mark-as-read/?idNotification=${notificationId}`,
        method: 'PATCH',
      }),
    }),
    createNotification: builder.mutation<INotification, { userId: number, notificationType: string, origin: string }>({
      query: ({ userId, notificationType, origin }) => ({
        url: `notifications/`,
        method: 'POST',
        body: { user_id: userId, type: notificationType, origin },
      }),
    }),
  }),
});

export const { 
  useGetNotificationsQuery, 
  useMarkAsReadMutation, 
  useCreateNotificationMutation 
} = notificationAPI;
