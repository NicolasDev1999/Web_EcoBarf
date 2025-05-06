'use client';

import { useState } from "react";
import { auth } from "../firebase/firebase-config"; // Ajusta la ruta
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import '../globals.css';

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Crear usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Actualizar displayName
      await updateProfile(user, { displayName });

      // 3. Enviar datos al backend para guardarlo en Firestore
      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Usuario creado y guardado");
      } else {
        setMessage(data.error || "❌ Error al guardar en Firestore");
      }
    } catch (error: unknown) {
      // Verificar que 'error' es una instancia de 'Error' antes de acceder a sus propiedades
      if (error instanceof Error) {
        console.error(error);
        setMessage("❌ " + error.message);
      } else {
        // Si no es un error del tipo 'Error', manejar el caso
        setMessage("❌ Error desconocido");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Contraseña" value={password}
        onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Nombre" value={displayName}
        onChange={(e) => setDisplayName(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-green-600 text-white p-2">Crear Usuario</button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
