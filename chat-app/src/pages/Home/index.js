import React, { useState , useEffect} from "react";
import "./style.css";
import Menu from "../../components/Menu/Menu";
import ChatList from "../ChatList/ChatList";
import ChatRoom from "../ChatRoom/ChatRoom";
import Settings from "../Settings/Settings";
import CreateChat from "../CreateChat/CreateChat";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useAuth } from '../../services/AuthProvider';

import { getUserInfo } from "../../services/getUserInfos";

const Index = () => {
  const { userId } = useParams();
  const [activeScreen, setActiveScreen] = useState("chatList");
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Estado para armazenar o ID da sala selecionada
  const [userParamsFirebase, setUserParamsFirebase] = useState(null);
  const { currentUser } = useAuth();


  const handleMenuClick = (screen, roomId = null) => {
    setActiveScreen(screen);
    setSelectedRoomId(roomId); // Define o ID da sala selecionada
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getUserInfo(userId);
        console.log("Informações do usuário:", userInfo);
        setUserParamsFirebase(userInfo);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Box sx={{ flexGrow: 1 }} className="GridContent">
      <Grid container spacing={2}>
        <Grid item xs={1.5} style={{height:'104.5vh'}} >
          <Menu activeScreen={activeScreen} onItemClick={handleMenuClick}  userParamsFirebase={userParamsFirebase} currentUser={currentUser} />
        </Grid>
        <Grid item xs={8.5}>
          {activeScreen === "chatList" && (
            <ChatList
              onItemClick={(roomId) => handleMenuClick("chatRoom", roomId)}
            />
          )}
          {activeScreen === "MyChats" && <MyChats userId={userId}  roomId={selectedRoomId} />}
          {activeScreen === "settings" && <Settings />}
          {activeScreen === "createChat" && <CreateChat userId={userId} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
