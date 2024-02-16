import React, { useState } from 'react';
import { handleForgotPassword } from '../../services/authService';
import Modal from '@mui/material/Modal';
import BtnPrimary from '../Buttons/BtnPrimary';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';


import './style.css'

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


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

const SuccessRegister = ({open, handleClose}) => {


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >     
    <Box sx={style} className="BoxModal">

      <p className='UserSucess'>Chat  Cadastrado com sucesso!</p>



      </Box>

    </Modal>
  );
}

export default SuccessRegister;
