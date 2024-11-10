import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = menuSlice.actions;

export default menuSlice.reducer;
