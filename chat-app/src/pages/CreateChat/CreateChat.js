import React, { useState } from "react";
// import './style.css';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import Checkbox from "@mui/material/Checkbox";

import { createChatRoom } from "../../services/createChatRoom";
import "./style.css";
import SuccessRegister from "../../components/Modals/SucessChatCreat";

const CreateChat = ({ userId }) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [invitees, setInvitees] = useState("");
  const [photo, setPhoto] = useState("");

    const [modalInfo,setModalInfo] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setModalInfo(false);
    const [open, setOpen] = useState(false);


  const DEFAULT_PHOTO_URL =
    "https://mtpost.com.br/wp-content/uploads/2022/09/flork-desenho-meme.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photoUrl = photo || DEFAULT_PHOTO_URL;
      await createChatRoom(
        name,
        description,
        "",
        isPrivate,
        invitees,
        userId,
        photoUrl
      );
      setModalInfo(true)
      // Lógica para exibir mensagem de sucesso ou redirecionar
    } catch (error) {
      console.error("Erro ao criar sala de chat:", error);
      // Lógica para exibir mensagem de erro
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    console.log('file',file)
    setPhoto(file ? file : DEFAULT_PHOTO_URL);
  };

  return (
    <div className="DivCreatChat">
      <h2 className="TitlePageChat">Criar Nova Sala de Chat</h2>
      <form onSubmit={handleSubmit} className="formChat">
        <TextField
          id="outlined-basic"
          label="Nome:"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ m: 1, width: "40ch", height: "5ch" }}
          size="small"
          placeholder="Nome"
        />

        <TextField
          id="outlined-basic"
          label="Descrição:"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ m: 1, width: "40ch", height: "5ch" }}
          size="small"
          placeholder="Descrição"
        />

    
        {/* <input
          className="FileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        /> */}

        <label className="CheckBoxLabel">
          <Checkbox
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
          Sala Privada
        </label>
        {isPrivate && (
          <TextField
            id="outlined-basic"
            label="E-mail:"
            variant="outlined"
            type="text"
            value={invitees}
            onChange={(e) => setInvitees(e.target.value)}
            required
            sx={{ m: 1, width: "40ch", height: "5ch" }}
            size="small"
            placeholder="Convidados (separados por vírgula)"
          />
        )}
        <BtnPrimary type="submit">Cadastrar</BtnPrimary>

        <SuccessRegister open={modalInfo} handleClose={handleClose} />

      </form>
    </div>
  );
};

export default CreateChat;
