import React from 'react'
import { app } from './firebaseConfig'; // Importa a inicialização do Firebase

import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Index from './pages/Home'
import { AuthProvider } from './services/AuthProvider';
import PrivateRouter from './PrivateRouter';
import ChatRoom from './pages/ChatRoom/ChatRoom';



// import { useParams } from 'react-router-dom';

const App = () =>{
    // const { userId } = useParams();

    return(

        <AuthProvider>

        <Router>
            <header></header>

            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path='/home/:userId' element ={
                        <PrivateRouter  path="/home/:userId" element={<Index/>}/>
                       
                    }/>
                    {/* <Private path="/home/:userId" element={<Index/>}/> */}
                    <Route path='/chatRoom/:roomId' element={<ChatRoom/>}/>

                </Routes>
            </div>

        </Router>
        </AuthProvider>


    )
}

export default App