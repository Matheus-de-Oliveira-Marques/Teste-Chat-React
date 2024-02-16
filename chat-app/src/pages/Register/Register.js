import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import BtnPrimary from '../../components/Buttons/BtnPrimary';
import { Link } from 'react-router-dom'


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SuccessRegister from '../../components/Modals/SuccessRegister';
import ErrorRegister from '../../components/Modals/ErrorRegister';

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [erro, setError] = useState(false)
    const [modalInfo,setModalInfo] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const DEFAULT_PHOTO_URL = 'https://mtpost.com.br/wp-content/uploads/2022/09/flork-desenho-meme.jpg';


    const submitRegister = async (e) => {
        e.preventDefault()

        try {
            // Se não houver foto, usar a URL padrão
            const photoUrl = photo || DEFAULT_PHOTO_URL;
            await signup(email, password, name, photoUrl);
            setModalInfo(true)

            
          } catch (error) {
            setError(true);
          }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file ? file : DEFAULT_PHOTO_URL);

      };


    return (
        <Box  className="boxContainerRegister">
            <Grid container spacing={2}>
                <Grid item xs={6} className='SiderLeft'>
                    < div className='btnBackLogin'><Link to="/" className='LinkBack'> <ArrowBackIcon size="medium"/> Voltar </Link></div>

                    <h2 className='TittleRegister'>Crie uma Conta</h2>
                    <form className="boxFormRegister" onSubmit={submitRegister}>

                        <TextField
                            id="outlined-basic"
                            label="Nome:"
                            variant="outlined"
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{ m: 1, width: '40ch', height: '5ch' }}
                            size="small"
                            placeholder='Nome:'
                        />

                            {/* <input type="file" className="FileInput" accept="image/*" onChange={handleFileChange} /> */}

                        <TextField
                            id="outlined-basic"
                            label="E-mail:"
                            variant="outlined"
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ m: 1, width: '40ch', height: '5ch' }}
                            size="small"
                            placeholder='E-mail:'

                        /> <TextField
                            id="outlined-basic"
                            label="Senha:"
                            variant="outlined"
                            type='password'
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ m: 1, width: '40ch', height: '5ch' }}
                            size="small"
                        />

                        <BtnPrimary type="submit"  >Cadastrar</BtnPrimary>
                        <SuccessRegister open={modalInfo} handleClose={handleClose}/>
                        <ErrorRegister open={erro} handleClose={handleClose}/>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <div className='RegisterRight' >
                        {/* <h2 className='TittleApp'>LiveChat</h2> */}
                        <div className='imgLogo'/>
                    </div>
                </Grid>

                {/* fazer modal para mosrtar que foi cadastrado e voltar para tela de login */}
            </Grid>
        </Box>
    )
}

export default Register