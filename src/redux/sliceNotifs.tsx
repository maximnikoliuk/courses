import { createSlice } from '@reduxjs/toolkit';
import { SnackbarState } from '../types/misc';

const initialState: SnackbarState = {
  notificationSnackbar: {
    open: false,
    type: 'success',
    message: '',
  }
};

export const sliceNotifs = createSlice({
  name: 'auth',
  initialState: initialState as SnackbarState,
  reducers: {
    showSnackbar: (state, { payload }) => {
      state.notificationSnackbar = {
        ...payload,
        open: true
      };
    },
    closeSnackbar: () => initialState,
  },
});

export const {
  showSnackbar,
  closeSnackbar
} = sliceNotifs.actions;

export default sliceNotifs.reducer;