import React from 'react'
import { app } from './firebaseConfig'; // Importa a inicialização do Firebase


import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Index from './components/Home'

const App = () =>{
    return(

        
        <Router>
            <header></header>

            <div>
                <Routes>
                    <Route path="" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Index/>}/>

                </Routes>
            </div>
        </Router>
    )
}

export default App