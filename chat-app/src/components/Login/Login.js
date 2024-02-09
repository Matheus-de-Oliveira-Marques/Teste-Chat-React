import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../services/authService';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BtnPrimary from '../Buttons/BtnPrimary';


import './style.css'


  

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);

            // Redireciona para a página desejada após o login
            navigate("/home")
            //fazer modal rapido mostrando q ta sendo logado
            alert('Pode entrar!')
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
                        <form className="boxForm" onSubmit={submitLogin}>
                            <TextField
                                id="outlined-basic"
                                label="E-mail:"
                                variant="outlined"
                                type='text'
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

                            <BtnPrimary type="submit"  >Entrar</BtnPrimary>


                        </form>
                        <p>Não tem conta? <Link to="/register" className='Link'>Cadastre-se</Link></p>
                    </div>
                </Grid>
            </Box>
    )
}

export default Login