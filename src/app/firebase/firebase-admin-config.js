// firebase-admin-config.js
import admin from "firebase-admin";
import path from "path";
import fs from "fs";

const serviceAccountPath = path.join(process.cwd(), "./src/app/firebase/serviceAccountKey.json");

// Verifica si el archivo existe
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`❌ No se encontró el archivo serviceAccountKey.json en: ${serviceAccountPath}`);
}

// Carga el archivo JSON
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

export { app };