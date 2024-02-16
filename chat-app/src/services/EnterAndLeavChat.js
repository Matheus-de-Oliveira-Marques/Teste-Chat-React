// Serviço de Entrada no Chat
import { collection, getDoc , doc, updateDoc, arrayUnion,arrayRemove} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const joinChat = async (roomId, userId) => {

  console.log('roomId, userId',roomId, userId)

  try {
    const roomRef = doc(db, "chatRooms", roomId);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();

    if (roomData.isPrivate && !roomData.invitees.includes(userId)) {
      throw new Error("Esta sala é privada e requer um convite para entrar.");
    }

    await updateDoc(roomRef, {
      participants: arrayUnion(userId ) // Adiciona o usuário à lista de participantes
    });

    return roomId; // Retorne o ID da sala para redirecionamento, se necessário
  } catch (error) {
    console.error("Erro ao entrar no chat:", error);
    throw error;
  }
};


  
  // Serviço de Saída do Chat
  export const leaveChat = async (roomId, userId) => {
    try {
      const roomRef = doc(db, "chatRooms", roomId);
      await updateDoc(roomRef, {
        participants: arrayRemove(userId) // Remove o usuário da lista de participantes
      });
    } catch (error) {
      console.error("Erro ao sair do chat:", error);
      throw error;
    }
  };
  