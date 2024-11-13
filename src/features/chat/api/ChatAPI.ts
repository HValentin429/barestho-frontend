import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatApiResponse, IChat } from '../interfaces/IChat';

export const chatAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], { search?: string }>({
      query: ({ search } = {}) => ({
        url: 'chats',
        params: {
          search, 
        },
      }),
    }),
    getChat: builder.query<IChat, number >({
      query: ( chatId ) => ({
        url: `chats/${chatId}`,
      }),
    }),
  }),
});

export const { useGetChatsQuery, useGetChatQuery } = chatAPI;
