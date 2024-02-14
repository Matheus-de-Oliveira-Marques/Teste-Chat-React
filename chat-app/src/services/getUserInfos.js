import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Inicializa o módulo do Firestore
const firestore = getFirestore();

// Função para obter informações do usuário, incluindo a URL da foto
export const getUserInfo = async (userId) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData;
    } else {
      throw new Error("Usuário não encontrado.");
    }
  } catch (error) {
    throw error;
  }
};

