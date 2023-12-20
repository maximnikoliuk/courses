import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { closeSnackbar } from '../../redux/sliceNotifs';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NotifSnackbar() {
  const dispatch = useAppDispatch();
  const { notificationSnackbar } = useAppSelector(
      (state) => state.notifs,
  );

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar())
  };

  return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={notificationSnackbar.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notificationSnackbar.type} sx={{ width: '100%' }}>
            {notificationSnackbar.message}
          </Alert>
        </Snackbar>
      </Stack>
  );
}

export default NotifSnackbar;