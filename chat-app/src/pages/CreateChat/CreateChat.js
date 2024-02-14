import React, {useState} from "react";
// import './style.css';

import { createChatRoom } from "../../services/createChatRoom";

const CreateChat = ({userId}) => {

  console.log('userid',userId)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [invitees, setInvitees] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChatRoom(name, description, "", isPrivate, invitees, userId);
      alert("Chat criado com sucesso");
      // Lógica para exibir mensagem de sucesso ou redirecionar
    } catch (error) {
      console.error("Erro ao criar sala de chat:", error);
      // Lógica para exibir mensagem de erro
    }
  };


  return (
    <div>
      <h2>Criar Nova Sala de Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Sala"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição da Sala"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Sala Privada
        </label>
        {isPrivate && (
          <input
            type="text"
            placeholder="Convidados (separados por vírgula)"
            value={invitees}
            onChange={(e) => setInvitees(e.target.value)}
          />
        )}
        <button type="submit">Criar Sala</button>
      </form>
    </div>
  );
};

export default CreateChat;
