import React, { useState } from "react";
import { sendMessage } from "../../../services/messagesRoom";
import { Button } from "@mui/material";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";

const SendMessage = ({ roomId, usersInRoom, currentUser, nameUser }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const currentIdUser = currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar se há mais de um usuário na sala
      // Enviar mensagem normalmente
      if (currentUser) {
        await sendMessage(roomId, message, nameUser, currentIdUser);
      } else {
        console.error("Usuário não autenticado");
        setError("Usuário não autenticado. Faça login para enviar mensagens.");
        return; // Parar a execução da função se currentUser não estiver definido
      }
      setMessage("");
      setError("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setError("Erro ao enviar mensagem. Por favor, tente novamente.");
    }
  };

  return (
    <div className="DivSendMessage">
      <form onSubmit={handleSubmit} className="FormSendMessage">
        <input
          className="TextFieldMessage"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <Button type="submit" className="SendMessageBtn">
          <SendIcon />
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SendMessage;
