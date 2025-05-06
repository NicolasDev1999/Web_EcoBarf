// firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAmRdpDSoHkeipwc7nF65ZyPDLpjwK3xs",
  authDomain: "ecobarfcolombia.firebaseapp.com",
  projectId: "ecobarfcolombia",
  storageBucket: "ecobarfcolombia.appspot.com",
  messagingSenderId: "901418930208",
  appId: "1:901418930208:web:6faebba127beed274bac45",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };