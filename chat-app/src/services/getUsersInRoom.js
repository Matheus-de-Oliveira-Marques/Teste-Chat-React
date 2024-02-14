import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"

export const getUsersInRoom = async (roomId) => {
  try {
    const usersRef = collection(db, "chatRooms", roomId, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  } catch (error) {
    console.error("Erro ao obter usuários na sala:", error);
    throw error;
  }
};
