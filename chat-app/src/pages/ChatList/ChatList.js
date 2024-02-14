import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChatRooms } from "../../services/getChatRooms";
import { getUsersInRoom } from "../../services/getUsersInRoom";
import { joinChat, leaveChat } from "../../services/EnterAndLeavChat";
import Skeleton from "@mui/material/Skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import "./style.css";

const ChatList = ({ onItemClick, userId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRoomClick = async (roomId, isPrivate, invitees) => {
    try {
      if (!isPrivate || invitees.includes(userId)) {
        onItemClick(roomId);
      } else {
        alert("Esta sala é privada e requer um convite para entrar.");
      }
    } catch (error) {
      console.error("Erro ao verificar sala de chat:", error);
    }
  };

  const handleJoinLeaveChat = async (roomId, isPrivate, participants) => {
    try {
      if (!participants.includes(userId)) {
        // Se o usuário não estiver na lista de participantes, entra no chat
        await joinChat(roomId, userId);
      } else {
        // Caso contrário, sai do chat
        await leaveChat(roomId, userId);
      }
      // Atualiza a lista de salas de chat após a entrada/saída do chat
      const updatedRooms = await getChatRooms();
      setChatRooms(updatedRooms);
    } catch (error) {
      console.error("Erro ao entrar/sair do chat:", error);
    }
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error("Erro ao obter salas de chat:", error);
      }
    };

    const finishLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    fetchChatRooms();
    finishLoading();
  }, []);

  console.log("SAAALAS", chatRooms);

  return (
    <div className="DivListChats">
      <h2>Salas de Chat Disponíveis</h2>
      <ul>
        {chatRooms.map((room) =>
          !loading ? (
            <Card key={room.id} className="AllCard">
              <CardHeader
                className="CardHeader"
                title={
                  room.isPrivate ? <LockIcon color="disabled" size="medium"/>  : <LockOpenIcon color="disabled" size="medium"/>
                  
                }
              />

                <CardContent className="CardContent">
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://images.unsplash.com/photo-1516802273409-68526ee1bdd6"
                    className="imageChat"
                  />
                  <div  className="LittleInfos">
                  <p className="NameChat">{room.name}</p>
                  <p className="DescChat">{room.description}</p>

                  <Divider className="CardDivider"/>
                  <div className="ParticipantesList">
                  <p className="TextParticipants">
                    Participantes: {room.participants.join(", ")}
                  </p>
                  </div>
                  <div className="BtnRow">
                  <button
                    className="BtnEnterChat"
                    onClick={() =>
                      handleJoinLeaveChat(
                        room.id,
                        room.isPrivate,
                        room.participants
                      )
                    }
                  >
                    {room.participants.includes(userId)
                      ? "Sair"
                      : "Entrar"}
                  </button>
                  </div>
                  </div>
                </CardContent>
             
            </Card>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="80%"
                height="40"
              />

              <Skeleton animation="wave" width="40%" />
              <Skeleton animation="wave" width="80%" />
            </Box>
          )
        )}
      </ul>
    </div>
  );
};

export default ChatList;
