
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../firebaseConfig'


// Função para criar uma nova sala de chat
export const createChatRoom = (name, description, createdBy, isPrivate, invitees, userId,photoURL) => {
  addDoc(collection(db, 'chatRooms' ),{
    name,
    photoURL,
    description,
    isPrivate,
    participants: [], // Inicializa com um array vazio
    joinedUsers: [],
    invitees,
    createdAt: new Date().toISOString(),
    createdBy,
    userId
  })

};
