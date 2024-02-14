import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Serviço de Listagem de Salas de Chat
export const getChatRooms = async () => {
  try {
    const snapshot = await getDocs(collection(db, "chatRooms"));
    const chatRooms = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const room = {
        id: doc.id,
        name: data.name,
        description: data.description,
        isPrivate: data.isPrivate || false,
        participants: data.participants || [], // Retorna a lista de participantes
        joinedUsers: data.joinedUsers || [], // Retorna a lista de usuários que já entraram
        // Outros campos...
      };
      chatRooms.push(room);
    });

    return chatRooms;
  } catch (error) {
    console.error("Erro ao obter salas de chat:", error);
    throw error;
  }
};

