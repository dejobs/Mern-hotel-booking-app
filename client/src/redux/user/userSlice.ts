import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {signUpStart, signUpSuccess, signUpFailure} = userSlice.actions;

export default userSlice.reducer;
