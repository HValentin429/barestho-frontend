import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../interfaces/IMessage';

interface WebSocketState {
  messages: IMessage[];
  isConnected: boolean;
}

const initialState: WebSocketState = {
  messages: [],
  isConnected: false,
};

const messagesReducer = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { addMessage, setConnectionStatus } = messagesReducer.actions;

export default messagesReducer.reducer;
