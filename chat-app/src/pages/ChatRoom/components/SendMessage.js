import React, { useState } from 'react';
import { sendMessage } from '../../../services/messagesRoom';

const SendMessage = ({ roomId, usersInRoom, currentUser }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const nameUser = currentUser;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar se há mais de um usuário na sala

        // Enviar mensagem normalmente
        console.log('MEU CURRTENT USER MANO ', nameUser)

        if (currentUser) {
          console.log('MEU CURRTENT USER MANO ', nameUser)
          
          await sendMessage(roomId, message, currentUser , currentUser);
        } else {
          console.error('Usuário não autenticado');
          setError('Usuário não autenticado. Faça login para enviar mensagens.');
          return; // Parar a execução da função se currentUser não estiver definido
        }
        setMessage('');
      setError('');
      } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setError('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" />
        <button type="submit">Enviar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SendMessage;
