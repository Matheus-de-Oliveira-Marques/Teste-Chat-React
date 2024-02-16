import { collection, query, where, getDoc , doc , getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// export const getUsersInRoom = async (roomId) => {
//   try {
//     const roomRef = doc(db, "chatRooms", roomId);

//     const roomSnapshot = await getDoc(roomRef);

//     // Verificar se o documento existe
//     if (!roomSnapshot.exists()) {
//       console.log("O documento da sala não existe.");
//       return [];
//     }

//     // Obter os dados do documento
//     const roomData = roomSnapshot.data();
    
//     // Verificar se os dados contêm a lista de participantes
//     if (!roomData || !roomData.participants) {
//       console.log("Os dados da sala não contêm a lista de participantes.");
//       return [];
//     }


//     const participantIds = roomData.participants || [];


//     // Aqui você pode implementar a lógica para buscar detalhes dos usuários com base nos IDs dos participantes
//     // Por exemplo, você pode fazer uma chamada para outra função que busca os detalhes dos usuários com base nos IDs

//     const userDetails = [];


//     for (const userId of participantIds) {
//       // Referência para o documento do usuário
//       const userDocRef = doc(db, "users", userId);


//       // Obter o documento do usuário
//       const userDocSnapshot = await getDoc(userDocRef);

//       // Verificar se o documento do usuário existe
//       if (userDocSnapshot.exists()) {
//         // Obter os dados do usuário
//         const userData = userDocSnapshot.data();
//         userDetails.push(userData);
//       } else {
//         console.warn(`O usuário com o ID ${userId} não foi encontrado.`);
//       }
//     }

//     // Retornar os detalhes dos usuários

//     return [{ details:userDetails, participants:participantIds}];



//   } catch (error) {
//     console.error("Erro ao obter usuários na sala com detalhes:", error);
//     throw error;
//   }
// };


export const getUsersInRoom = async (roomId) => {
  try {
    const usersRef = collection(db, "chatRooms", roomId, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error("Erro ao obter usuários na sala:", error);
    throw error;
  }
};
