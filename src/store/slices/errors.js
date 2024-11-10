import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = errorsSlice.actions;
export default errorsSlice.reducer;
