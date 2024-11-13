import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MobileState {
  isMobile: boolean;
}

const initialState: MobileState = {
  isMobile: window.innerWidth < 768,
};

const reponsiveSlice = createSlice({
  name: 'mobile',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = reponsiveSlice.actions;
export default reponsiveSlice.reducer;