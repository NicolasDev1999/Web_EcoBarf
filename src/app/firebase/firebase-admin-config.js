// src/app/firebase/firebaseAdmin.ts
import admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("❌ Faltan variables de entorno de Firebase.");
}

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    })
  : admin.app();

const db = getFirestore(app);

export { app, db };
