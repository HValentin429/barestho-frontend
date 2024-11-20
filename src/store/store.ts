// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { chatAPI } from '../features/chat/api/ChatAPI';
import { messageAPI } from '../features/chat/api/MessageAPI';
import mobileReducer from '../features/common/slices/ResponsiveSlice';
import messagesReducer from '../features/chat/api/MessageSlice';
import { notificationAPI } from '../features/notification/api/NotificationAPI';
import notificationReducer from '../features/notification/api/NotificationSlice';

const store = configureStore({
  reducer: {
    [chatAPI.reducerPath]: chatAPI.reducer, 
    [messageAPI.reducerPath]: messageAPI.reducer,
    [notificationAPI.reducerPath]: notificationAPI.reducer,

    mobile: mobileReducer,
    messages: messagesReducer,
    notifications : notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAPI.middleware, messageAPI.middleware, notificationAPI.middleware), 

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
