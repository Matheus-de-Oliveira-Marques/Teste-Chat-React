import {
  collection,
  query,
  getDoc,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Serviço de Envio de Mensagens
export const sendMessage = async (
  roomId,
  message,
  createdBy,
  currentUser,
  nameUser
) => {
  try {
    // Verificar se o remetente está na lista de participantes da sala
    const roomSnapshot = await getDoc(doc(db, "chatRooms", roomId));
    const roomData = roomSnapshot.data();

    if (!roomData.participants.includes(currentUser)) {
      console.error("Usuário não autorizado a enviar mensagens nesta sala.");
      return;
    }

    // Obter o nome do usuário atual
    const userName = nameUser || "Usuário Anônimo";

    // Enviar a mensagem original do usuário atual
    await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
      text: message,
      createdAt: new Date().toISOString(),
      createdBy: createdBy,
      name: userName,
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
};

// Função para obter todas as mensagens de uma sala de chat
export const getMessagesRealtime = (roomId, setMessages) => {
  try {
    const q = query(collection(db, `chatRooms/${roomId}/messages`));

    // Configurar um listener em tempo real para receber atualizações das mensagens
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages); // Atualizar o estado com as novas mensagens
    });

    // Retornar a função de unsubscribe para parar de ouvir as atualizações quando necessário
    return unsubscribe;
  } catch (error) {
    console.error(
      "Erro ao obter mensagens da sala de chat em tempo real:",
      error
    );
    throw error;
  }
};
