// Serviço de Entrada no Chat
import { collection, getDocs , doc, updateDoc, arrayUnion,arrayRemove} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const joinChat = async (roomId, userId) => {
    try {
      const roomRef = doc(db, "chatRooms", roomId);
      await updateDoc(roomRef, {
        participants: arrayUnion(userId), // Adiciona o usuário à lista de participantes
        joinedUsers: arrayUnion(userId) // Adiciona o usuário à lista de usuários que já entraram
      });
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
  