import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '../../src/api/auth';
import { Alert } from 'react-native';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};




// confirmSignup

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.error = null
    },
  },
  extraReducers: builder => {
    // signin cases
    builder.addCase(signin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {

      //console.log("authSLice.js line 29", action)
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      //console.log("authSLice, Line 36", action)

      state.isLoading = false;
      state.isError = true;
      Alert.alert("Error", action.payload.detail)
    });

    // signup cases
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      //console.log("authSLice.js line 48", action)
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      //console.log("authSLice, Line 54", action)

      state.isLoading = false;
      state.isError = true;
      Alert.alert("Error", action.payload.detail)

    });
  },
});
export const { logout } = authSlice.actions
export default authSlice.reducer;