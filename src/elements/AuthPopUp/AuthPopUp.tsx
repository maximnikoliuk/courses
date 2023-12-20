import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AuthPopUpProps } from '../../types/misc';
import { AUTH_OPERATIONS } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { showSnackbar } from '../../redux/sliceNotifs';
import { useAppDispatch } from '../../redux/store';

function AuthPopUp ({dialogData, setDialogData}: AuthPopUpProps) {
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    displayName: ''
  });
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const isEmailValid = credentials.email && emailRegex.test(credentials.email);
  const disabledLoginBtn = !(isEmailValid && credentials.password);
  const disabledRegisterBtn = !(isEmailValid && credentials.password && credentials.displayName);
  const disabledButton = dialogData.type === AUTH_OPERATIONS.CREATE ? disabledRegisterBtn : disabledLoginBtn;
  const [showPassword, setShowPassword] = useState(false);

  const onAuthHandler = async () => {
    // Email and password validation should be added
    if (dialogData.type === AUTH_OPERATIONS.CREATE) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
        );
        const user = userCredential.user;
        if (user) {
          await updateProfile(user, {
            displayName: credentials.displayName
          })
        }
      } catch (error: any) { // Need better error handling here
        console.log("Sign up error: ", error);
        dispatch(showSnackbar({
          type: 'error',
          message: error?.message || 'Account creation error'
        }));
        // Mixpanel event track on error nofication can be here
      }
    } else {
      try {
        await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
        );
      } catch (error: any) { //Need better error handling here
        console.log("Sign in error: ", error);
        dispatch(showSnackbar({
          type: 'error',
          message: error?.message || 'Sign in error'
        }))
        // Mixpanel event track on error nofication can be here
      }
    }
    setDialogData({
      open: false,
      type: ''
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Dialog
      open={dialogData.open}
      onClose={() => setDialogData({
        open: false,
        type: ''
      })}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle id="auth-dialog-title">
        {
          dialogData.type === AUTH_OPERATIONS.LOGIN ? 'Login' : 'Sign up'
        }
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          {
              dialogData.type === AUTH_OPERATIONS.CREATE ? (
                  <TextField
                      fullWidth
                      required
                      name='authDisplayName'
                      size='small'
                      label='Display name'
                      variant='outlined'
                      value={credentials.displayName}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          displayName: e.target.value
                        });
                      }}
                  />
              ) : ""
          }
          <TextField
            fullWidth
            required
            name='authUserEmail'
            size='small'
            label='Email'
            variant='outlined'
            value={credentials.email}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                email: e.target.value
              });
            }}
          />
          <TextField
            fullWidth
            required
            name='authUserPassword'
            size='small'
            label='Password'
            variant='outlined'
            value={credentials.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              )
            }}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                password: e.target.value
              });
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          autoFocus
          onClick={() => setDialogData({
            open: false,
            type: ''
          })}
        >
          Cancel
        </Button>
        <Button
            variant='contained'
            disabled={disabledButton}
            onClick={() => onAuthHandler()}
            autoFocus
        >
          { dialogData.type === AUTH_OPERATIONS.LOGIN ? 'Login' : 'Register' }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthPopUp;