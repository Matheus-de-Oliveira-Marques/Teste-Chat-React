import React, { useEffect, useState } from "react";
import  { useNavigate }  from "react-router-dom";
import { getChatRooms } from "../../services/getChatRooms";
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

const ChatList = ({ userId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allInfoUSer, setAllInfoUser] = useState('');
  const navigate = useNavigate();

 

  const handleJoinLeaveChat = async (roomId, isPrivate,invitees ,userId, name,photo, participants) => {
    try {

     
      const photoUrl = photo === undefined ?  'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6' : photo

      if (!participants.includes(userId) && !isPrivate || invitees.includes(userId)) {
        // Se o usuário não estiver na lista de participantes, entra no chat
        await joinChat(roomId, userId);
        navigate(`/chatRoom/${roomId}`);

      } else {
        // Caso contrário, sai do chat
        await leaveChat(roomId, userId);
      }
      // Atualiza a lista de salas de chat após a entrada/saída do chat
      const updatedRooms = await getChatRooms();
      setChatRooms(updatedRooms);
    } catch (error) {
    alert('Sala Bloqueada');
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
      }, 5000);
    };

    fetchChatRooms();
    finishLoading();    


  }, []);


  console.log('PIMBEI',chatRooms)


  return (
    <div className="DivListChats">
      <h2 className="TitlePage">Chats Disponiveis</h2>
      <ul className="ContentChats">
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
                  image={room.photo}
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
                          room.invitees,
                          userId,
                          room.name,
                          room.photo,
                          room.participants.join(", ")
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
            <Box sx={{ pt: 1 }} style={{margin:10}} >
              <Skeleton
                animation="wave"
                variant="rectangqular"
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
