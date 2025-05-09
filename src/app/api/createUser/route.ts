// src/app/api/createUser/route.ts
import * as admin from "firebase-admin";

// Inicializa Firebase Admin con las credenciales adecuadas
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Manejo de salto de línea
      }),
    });
  } catch (error) {
    console.error("Error al inicializar Firebase Admin:", error);
  }
}

// Obtenemos una referencia a Firestore
const db = admin.firestore();

export async function POST(req: Request) {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const body = await req.json();
    const { uid, email, displayName } = body;

    // Validación: asegúrate de que los datos necesarios están presentes
    if (!uid || !email || !displayName) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        {
          status: 400, // Código de error 400 si faltan datos
        }
      );
    }

    // Intentamos crear el usuario en Firestore
    await db.collection("users").doc(uid).set({
      email,
      displayName,
      createdAt: Date.now(),
    });

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ message: "Usuario creado con éxito" }),
      {
        status: 200, // Código de éxito 200
      }
    );
  } catch (err) {
    // Manejo de errores
    console.error("Error al crear usuario:", err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return new Response(JSON.stringify({ error: message }), {
      status: 500, // Error interno del servidor
    });
  }
}
