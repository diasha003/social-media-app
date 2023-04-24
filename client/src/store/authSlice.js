import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    setLogin(state, action) {
      //state - have access to initialState
      //action - transfer from outside (action.payload)
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
