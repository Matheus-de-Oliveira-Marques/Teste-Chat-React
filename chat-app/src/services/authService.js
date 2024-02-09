import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Inicializa o módulo de autenticação
const auth = getAuth();

// Inicializa o módulo de armazenamento
const storage = getStorage();

// Função para criar uma nova conta de usuário

export const signup = async (email, password, name, photo) => {
  try {
    // Cria um novo usuário com e-mail e senha
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Atualiza o perfil do usuário com o nome
    await updateUserProfile(userCredential.user, name);

    // Se uma foto for fornecida, faz o upload dela para o Firebase Storage e atualiza o perfil com a URL da foto
    if (photo) {
      const photoURL = await uploadPhoto(photo, userCredential.user.uid);
      await updateUserProfile(userCredential.user, name, photoURL);
    }
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Função para fazer upload do arquivo de foto para o Firebase Storage e retornar a URL
const uploadPhoto = async (photo, userId) => {
  const photoRef = ref(storage, `profile-images/${userId}-profile.jpg`);
  await uploadBytes(photoRef, photo);
  return await getDownloadURL(photoRef);
};

// Função para atualizar o perfil do usuário com o nome e a URL da foto
const updateUserProfile = async (user, name, photoURL = null) => {
  const profile = { displayName: name };
  if (photoURL) {
    profile.photoURL = photoURL;
  }
  await updateProfile(user, profile);
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


export const handleForgotPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    console.log("Um email de redefinição de senha foi enviado para o endereço fornecido.");
  } catch (error) {
    console.error("Erro ao enviar o email de redefinição de senha:", error.message);
  }
};