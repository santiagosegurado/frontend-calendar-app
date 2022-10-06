import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status:'checking', // 'checking', 'authenticated' or 'not-authenticated'
    user:{},
    errorMsg: undefined
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMsg = undefined; 
    },
    onLogging: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMsg = undefined;
    },
    onLoggout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMsg = payload; 
    },
    clearErrorMsg: (state) => {
      state.errorMsg = undefined;
    },
  },
});


export const { onChecking, onLogging, onLoggout, clearErrorMsg } = authSlice.actions