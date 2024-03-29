import React from 'react'

import Button, { ButtonProps } from '@mui/material/Button';

import { styled } from '@mui/material/styles';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    marginTop:20,
    backgroundColor: '#0063cc',
    width:'30%',
    borderColor: '#0063cc',
    fontFamily: [
        "Inter-Regular",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

const BtnPrimary = () => {

    return (
        <div>
        <BootstrapButton size="medium" variant="contained" type='submit'>ENTRAR</BootstrapButton>
        </div>
    )
}

export default BtnPrimary   