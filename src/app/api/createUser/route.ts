import { NextRequest, NextResponse } from 'next/server';
import { app } from '@/app/firebase/firebase-admin-config';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación de campos requeridos
    const { uid, email, displayName } = data;

    if (!uid || !email || !displayName) {
      return NextResponse.json({ error: 'Faltan datos requeridos (uid, email, displayName)' }, { status: 400 });
    }

    const nuevoUsuario = {
      uid,
      email,
      displayName,
      fechaCreacion: new Date().toISOString(),
    };

    // Verifica si ya existe un usuario con ese UID
    const userDoc = await db.collection('users').doc(uid).get();

    if (userDoc.exists) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }

    // Guarda el usuario
    await db.collection('users').doc(uid).set(nuevoUsuario);

    return NextResponse.json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al registrar usuario:', error.message);
      return NextResponse.json({ error: 'Error al registrar el usuario: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
  }
}
