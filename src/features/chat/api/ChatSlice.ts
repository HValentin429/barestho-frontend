import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../interfaces/IChat';

interface ChatState {
  chats: IChat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IChat>) => {
      state.chats.push(action.payload); 
    },
  },
});

export const { addItem } = chatSlice.actions;
export default chatSlice.reducer;
