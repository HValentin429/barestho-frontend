import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../interfaces/IMessage';

interface messagesState {
  messages: IMessage[];
  isConnected: boolean;
}

const initialState: messagesState = {
  messages: [],
  isConnected: false,
};

const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    removeAll(state) {
      state.messages = [];
    }
  },
});

export const { addMessage, setConnectionStatus, removeAll } = messagesReducer.actions;

export default messagesReducer.reducer;
