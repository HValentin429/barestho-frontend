import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../interfaces/IMessage';

interface MessageState {
  messages: IMessage[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload); 
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
