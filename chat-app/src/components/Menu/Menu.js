import React from "react";
import "./style.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from '@mui/material/Divider';
import ForumIcon from '@mui/icons-material/Forum';


const Menu = ({ activeScreen, onItemClick, userParamsFirebase, currentUser }) => {

  const photo = userParamsFirebase?.photoURL
  const nameUser = currentUser.displayName;




  return (
    <div className="BodyMenu">
      <button
        className={activeScreen === "chatList" ? "ActiveMenu" : "DesativeMenu"}
        onClick={() => onItemClick("chatList")}
      >
        <FormatListBulletedIcon
          className={
            activeScreen === "chatList" ? "ActiveIcon" : "DesativeIcon"
          }
        />
         Explore Chats 
      </button>

      
      <button
        className={
          activeScreen === "MyChats" ? "ActiveMenu" : "DesativeMenu"
        }
        onClick={() => onItemClick("MyChats")}
      >
        <ForumIcon
          className={
            activeScreen === "MyChats" ? "ActiveIcon" : "DesativeIcon"
          }
        />
         Conversas
      </button>

      <button
        className={
          activeScreen === "createChat" ? "ActiveMenu" : "DesativeMenu"
        }
        onClick={() => onItemClick("createChat")}
      >
        <GroupAddIcon
          className={
            activeScreen === "createChat" ? "ActiveIcon" : "DesativeIcon"
          }
        />
        Novo Chat
      </button>

      <Divider />

      {/* <button
        className={activeScreen === "settings" ? "ActiveMenu" : "DesativeMenu"}
        onClick={() => onItemClick("settings")}
      >
        <SettingsIcon
          className={
            activeScreen === "settings" ? "ActiveIcon" : "DesativeIcon"
          }
        />
        Configurações
      </button> */}

      <button className="BtnUser">
        <img src={photo} className="UserPhoto" />
        {nameUser}
      </button>
    </div>
  );
};

export default Menu;
