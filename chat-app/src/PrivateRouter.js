import React from 'react';
import {BrowserRouter as Router , Route, Navigate, Routes} from 'react-router-dom'
import { useAuth } from './services/AuthProvider';

const PrivateRouter = ({ element }) => {
  const { currentUser } = useAuth();
  console.log('PIMBA', currentUser)

  console.log('PIMBA', element)


  // Verifica se há um usuário autenticado
  // Se houver, renderiza o elemento fornecido
  // Se não houver, redireciona para a página de login

    if(currentUser){
     return element
    }else{
<Navigate to="/" replace />
    }


  // <Route
  //     {...rest}
  //     element={currentUser ? element : <Navigate to="/" replace />}
  //   />
    
  
};

export default PrivateRouter;
