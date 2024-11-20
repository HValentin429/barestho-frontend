import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../interfaces/INotification';

interface notificationsState {
  notifications: INotification[];
}

const initialState: notificationsState = {
  notifications: []
};

const notificationsReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
        state.notifications = state.notifications.filter((notification) => 
          !(notification.origin === action.payload.origin &&
            notification.sender === action.payload.sender &&
            notification.type === action.payload.type)
        );
        state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(
        (notification : INotification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = notificationsReducer.actions;

export default notificationsReducer.reducer;
