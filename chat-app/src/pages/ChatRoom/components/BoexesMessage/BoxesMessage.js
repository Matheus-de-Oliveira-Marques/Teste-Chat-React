import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";

const BoexesMessage = ({
  msg,
  createdAt,
  createdBy,
  roomId,
  usersInRoom,
  currentUser,
  nameUser,
}) => {
  const dataString = createdAt;

  const data = new Date(dataString);

  const opcoesDeFormato = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const dataFormatada = new Intl.DateTimeFormat(
    "pt-BR",
    opcoesDeFormato
  ).format(data);
  const isCurrentUser = usersInRoom.includes(currentUser);



  return (
    <div className={isCurrentUser ? "BoxMessageCurrent" : "BoxMessageOthers"}>
      <p className={isCurrentUser ? "NameMessage" : "NameMessageOthers"}>
        {createdBy}
      </p>
      <div className="LineMessage">
        <p className="Message">{msg}</p>
        <p className="DateCreat">{isCurrentUser ? createdAt : dataFormatada}</p>
      </div>
    </div>
  );
};

export default BoexesMessage;
