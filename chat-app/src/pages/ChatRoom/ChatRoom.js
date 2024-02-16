import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendMessage from "./components/SendMessage";
import { getMessagesRealtime } from "../../services/messagesRoom";
import { getUsersInRoom } from "../../services/getUsersInRoom";
import { useAuth } from "../../services/AuthProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { leaveChat, joinChat } from "../../services/EnterAndLeavChat";
import MyChats from "../MyChats/MyChats";
import { Box, Button, Divider, Grid } from "@mui/material";

import "./style.css";
import BoexesMessage from "./components/BoexesMessage/BoxesMessage";

// Componente de Chat Individual
const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isJoined, setIsJoined] = useState(false); // Estado para verificar se o usuário está no chat

  const { currentUser } = useAuth();
  const nameUser = currentUser?.displayName;
  const currentIdUser = currentUser?.uid;

  useEffect(() => {
    const unsubscribeMessages = getMessagesRealtime(roomId, setMessages);
    // const fetchUsersInRoom = async () => {
    //   try {
    //     const users = await getUsersInRoom(roomId);

    //     const participants = users.map((users) => users.participants);
    //     const arrayParticpants = participants.flat();
    //     setUsersInRoom(arrayParticpants);

    //     // Verificar se o usuário está na lista de participantes da sala
    //     if (arrayParticpants.includes(currentIdUser)) {
    //       setIsJoined(true);
    //     } else {
    //       setIsJoined(false);
    //     }
    //   } catch (error) {
    //     console.error("Erro ao obter usuários na sala:", error);
    //   }
    // };
    // 
    // 
    // 
    // 

    const fetchUsersInRoom = async () => {
      try {
        const users = await getUsersInRoom(roomId);
        setUsersInRoom(users); // Defina os usuários na sala como uma lista de objetos de usuário
        // Verificar se o usuário está na lista de participantes da sala
        const participantIds = users.map(user => user.id);
        if (participantIds.includes(currentIdUser)) {
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
    <div style={{ display: "grid" }}>
      <div className="HeaderChat">
        <Button className="BtnExitChat" onClick={handleJoinLeaveChat}>
          {isJoined ? "Sair" : "Entrar"}
        </Button>
      </div>
      <Divider />

      <Box >
        <Grid container spacing={1} className="ContentChats" >
          <Grid item xs={4} className="ListOfMyChats">
            <MyChats userId={currentIdUser} />
          </Grid>

          <Grid item xs={8} className="Talks">
            <div>
              {/* {console.log("MENSAAAGENS", messages)} */}
              {messages.map((msg, index) => (
                <div key={index}>
                  <BoexesMessage
                    msg={msg.text}
                    createdAt={msg.createdAt}
                    createdBy={msg.createdBy}
                    roomId={roomId}
                    usersInRoom={usersInRoom}
                    currentUser={currentIdUser}
                    nameUser={nameUser}

                  />
                </div>
              ))}
              <SendMessage
              roomId={roomId}
              usersInRoom={usersInRoom}
              currentUser={currentIdUser}
              nameUser={nameUser}
            />
            </div>
            
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ChatRoom;
