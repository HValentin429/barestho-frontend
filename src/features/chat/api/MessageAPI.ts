import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMessage } from '../interfaces/IMessage';

export const messageAPI = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getMessages: builder.query<IMessage[], number>({
      query: (chatId) => ({
        url: `chat/${chatId}/messages`,
        method: 'GET',
      }),
    }),

    createMessage: builder.mutation<IMessage, { chatId: number, message: string, sender: string }>({
        query: ({ chatId, message, sender }) => ({
          url: `chat/${chatId}/messages/`,
          method: 'POST',
          body: { message, chat: chatId, sender }, 
        }),
      }),
  }),
});

export const { 
  useGetMessagesQuery, 
  useCreateMessageMutation, 
} = messageAPI;
