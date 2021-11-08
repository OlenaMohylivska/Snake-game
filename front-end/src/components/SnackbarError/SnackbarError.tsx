import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './SnackbarError.scss';

type Props = {
  error: string | null;
  message: string | null
};

export const SnackbarError: React.FC<Props> = ({ error, message }) => {
  const [openSnackbar, setOpenSnackbar] = useState(!!error);
  
  const handleClose = () => {
    setOpenSnackbar(false);
  };
  
  return (
    <Snackbar
      className='snackbar'
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity='error'>
        {message}
        {error}
      </Alert>
    </Snackbar>
  );
};
