import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../services/authService';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BtnPrimary from '../../components/Buttons/BtnPrimary';
import Button, { ButtonProps } from '@mui/material/Button';

import './style.css'
import ForgotPassword from '../../components/Modals/ForgotPassword';


  

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);

            const user = await signin(email, password);
            const userId = user.uid;
            navigate(`/home/${userId}`); 
         
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Exibir mensagem de erro para o usuário, se necessário
        }
    }

    return (

            <Box sx={{ flexGrow: 1 }} className="boxContainerLogin">
                <Grid item xs={6}>
                <h2 className='TittleLogin'>ChatApp</h2>

                    <div className='ContentLogin'>
                        <div className='ContainerLogo'>
                        <div className="logoSmall"/>
                        </div>
                        <form className="boxForm" onSubmit={submitLogin}>
                            <TextField
                                id="outlined-basic"
                                label="E-mail:"
                                variant="outlined"
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ m: 1, width: '40ch', height: '8ch' }}
                                size="small"
                                placeholder='E-mail:'

                            />
                            <TextField
                                id="outlined-basic"
                                label="Senha:"
                                variant="outlined"
                                type='password'
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ m: 1, width: '40ch', height: '8ch' }}
                                size="small"
                            />
                            <p  className='ForgotText'>Esqueceu a Senha? <Button style={{textTransform:'capitalize'}} onClick={handleOpen}>Clique aqui </Button></p>

                            <BtnPrimary type="submit" onClick={submitLogin} >Entrar</BtnPrimary>

                        </form>
                        <p className='TexthasCont'>Não tem conta? <Link to="/register" className='Link'>Cadastre-se</Link></p>
                        <ForgotPassword open={open} handleClose={handleClose} />
                    </div>
                </Grid>
            </Box>
    )
}

export default Login