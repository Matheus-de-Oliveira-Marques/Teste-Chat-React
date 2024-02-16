import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChatRoomsByUserId } from "../../services/getChatRooms";
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
        const rooms = await getChatRoomsByUserId(userId);
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


  console.log('chatRooms',chatRooms)

  return (
    <div className="DivListChatsMY">
      <h2 className="TitlePage">Minhas Conversas</h2>
      <ul>
        {chatRooms.map((room) =>
          !loading ? (

            <Card key={room.id} className="AllMyCard">
              <Link to={`/chatRoom/${room.id}`} style={{textDecoration:'none'}}>
                    
              <CardContent className="CardContentMy">
                <CardMedia
                  component="img"
                  height="194"
                  image={room.photo}
                  className="imageMyChat"
                />
                <div  className="LittleInfos">
                  <p className="NameMyChat">{room.name}</p>
                  <div className="ParticipantesListMY">
                    <p className="TextParticipantsMy">
                      Participantes: {room.participants.join(", ")}
                    </p>
                  </div>
                  
                </div>
           
              </CardContent>
        
                </Link>
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
