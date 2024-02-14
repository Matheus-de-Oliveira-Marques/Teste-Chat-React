import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Inicializa o módulo de autenticação
const auth = getAuth();

// Inicializa o módulo do Firestore
const firestore = getFirestore();

// Função para criar uma nova conta de usuário
export const signup = async (email, password, name, photoURL) => {
  try {
    // Cria um novo usuário com e-mail e senha
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Atualiza o perfil do usuário com o nome
    await updateProfile(userCredential.user, { displayName: name });

    // Salva a URL da foto do usuário no Firestore
    if (photoURL) {
      await setUserPhotoURL(userCredential.user.uid, photoURL);
    }

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Função para fazer upload da URL da foto do usuário para o Firestore
const setUserPhotoURL = async (userId, photoURL) => {
  const userRef = doc(firestore, "users", userId);
  await setDoc(userRef, { photoURL }, { merge: true });
};
// Função para fazer login com e-mail e senha
export const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Função para fazer logout
export const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Função para verificar o estado de autenticação do usuário
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Função para enviar e-mail de redefinição de senha
export const handleForgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Um email de redefinição de senha foi enviado para o endereço fornecido.");
  } catch (error) {
    console.error("Erro ao enviar o email de redefinição de senha:", error.message);
  }
};
