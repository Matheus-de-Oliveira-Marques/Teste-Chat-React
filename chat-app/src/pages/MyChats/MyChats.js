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

const MyChats = ({ userId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms(userId);
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

  return (
    <div className="DivListChats">
      <h2>Minhas Salas</h2>
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
                    <Link to={`/chat-room/${room.id}`} className="BtnEnterChat">
                      ChatRoom
                    </Link>
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

export default MyChats;
