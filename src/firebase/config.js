import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-iqNypSCLMX67axfTM81emtZKsyC9ZPc",
  authDomain: "amigo-secreto-3724c.firebaseapp.com",
  projectId: "amigo-secreto-3724c",
  storageBucket: "amigo-secreto-3724c.firebasestorage.app",
  messagingSenderId: "913773116348",
  appId: "1:913773116348:web:e55399f5f858aa5d7649b9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const db = getFirestore(app);

export default app;

