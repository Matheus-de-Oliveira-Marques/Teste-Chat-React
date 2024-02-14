import React, { useState } from 'react';
import { handleForgotPassword } from '../../services/authService';
import Modal from '@mui/material/Modal';
import BtnPrimary from '../Buttons/BtnPrimary';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';


import './style.css'

import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:'transparent',
  boxShadow: 10,
  borderRadius:3,
  padding:5,
  transition:0.5
};

const ForgotPassword = ({open, handleClose}) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleForgotPassword(email);
    alert('E-mail enviado')
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >     
    <Box sx={style}>

      <p className='textRecovry'> Será enviado um E-mail para recuperação de senha</p>

     <form onSubmit={handleSubmit} className='FormRecovery'>
      

          <TextField
              id="outlined-basic"
              label="E-mail:"
              variant="outlined"
              type='email'
              value={email}
              onChange={handleEmailChange} 
              required
              sx={{ m: 1, width: '40ch', height: '8ch' }}
              size="small"
              placeholder='E-mail:'

            />
            <Button type="submit" >ENVIAR</Button>
      </form>
      </Box>

    </Modal>
  );
}

export default ForgotPassword;
