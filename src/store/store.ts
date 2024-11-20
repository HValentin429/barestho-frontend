// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { chatAPI } from '../features/chat/api/ChatAPI';
import { messageAPI } from '../features/chat/api/MessageAPI';
import mobileReducer from '../features/common/slices/ResponsiveSlice';
import messagesReducer from '../features/chat/api/MessageSlice';

const store = configureStore({
  reducer: {
    [chatAPI.reducerPath]: chatAPI.reducer, 
    [messageAPI.reducerPath]: messageAPI.reducer,
    mobile: mobileReducer,
    webSocket: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAPI.middleware, messageAPI.middleware), 

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
