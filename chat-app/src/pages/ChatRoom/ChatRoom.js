import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SendMessage from './components/SendMessage';
import { getMessagesRealtime } from '../../services/messagesRoom';
import { getUsersInRoom } from '../../services/getUsersInRoom';
import { useAuth } from '../../services/AuthProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'
import { leaveChat, joinChat } from '../../services/EnterAndLeavChat';

// Componente de Chat Individual
const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isJoined, setIsJoined] = useState(false); // Estado para verificar se o usuário está no chat

  const { currentUser } = useAuth();
  const nameUser = currentUser?.displayName;

  useEffect(() => {
    const unsubscribeMessages = getMessagesRealtime(roomId, setMessages);
    const fetchUsersInRoom = async () => {
      try {
        const users = await getUsersInRoom(roomId);
        setUsersInRoom(users);

        // Verificar se o usuário está na lista de participantes da sala
        if (users.map(user => user.id).includes(currentUser.uid)) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
        }
      } catch (error) {
        console.error("Erro ao obter usuários na sala:", error);
      }
    };

    fetchUsersInRoom();

    // Remover o listener quando o componente for desmontado
    return () => {
      unsubscribeMessages();
    };
  }, [roomId, currentUser.uid]);

  const handleJoinLeaveChat = async () => {
    try {
      if (isJoined) {
        // Se o usuário já estiver no chat, sair do chat
        await leaveChat(roomId, currentUser.uid);
        setIsJoined(false);
      } else {
        // Caso contrário, entrar no chat
        await joinChat(roomId, currentUser.uid);
        setIsJoined(true);
      }
      // Atualizar a lista de usuários na sala após a entrada/saída do chat
      const updatedUsers = await getUsersInRoom(roomId);
      setUsersInRoom(updatedUsers);
    } catch (error) {
      console.error("Erro ao entrar/sair do chat:", error);
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <p>Participantes: {usersInRoom.map(user => user.name).join(", ")}</p>
      <button onClick={handleJoinLeaveChat}>
        {isJoined ? "Sair do Chat" : "Entrar no Chat"}
      </button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
            <p>Enviado por: {msg.createdBy}</p>
          </div>
        ))}
      </div>
      <SendMessage roomId={roomId} usersInRoom={usersInRoom} currentUser={nameUser} />
    </div>
  );
};


export default ChatRoom;
