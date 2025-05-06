// src/app/api/createUser/route.ts

import { app } from "../../firebase/firebase-admin-config"; // ajusta según tu estructura

export async function POST(req: Request) {
  const body = await req.json();
  const { uid, email, displayName } = body;

  if (!uid || !email || !displayName) {
    return new Response(JSON.stringify({ error: "Faltan campos" }), {
      status: 400,
    });
  }

  try {
    const db = app.firestore();
    await db.collection("users").doc(uid).set({
      email,
      displayName,
      createdAt: Date.now(),
    });

    return new Response(JSON.stringify({ message: "Usuario guardado" }), {
      status: 200,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error desconocido al guardar el usuario";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}
