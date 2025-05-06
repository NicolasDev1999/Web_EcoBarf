// src/app/api/getUsers/route.ts
import { app } from "../../firebase/firebase-admin-config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return new Response(JSON.stringify({ error: "UID requerido" }), { status: 400 });
  }

  try {
    const db = app.firestore();
    const doc = await db.collection("users").doc(uid).get();

    if (!doc.exists) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado. Por favor comuníquese con soporte." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(doc.data()), { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error desconocido al obtener el usuario";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
