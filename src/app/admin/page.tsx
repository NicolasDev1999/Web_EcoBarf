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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Título */}
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Crear Cuenta</h2>

      {/* Campo Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 text-black"
      />

      {/* Campo Contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 text-black"
      />

      {/* Campo Nombre */}
      <input
        type="text"
        placeholder="Nombre Completo"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 text-black"
      />

      {/* Botón de Enviar */}
      <button
        type="submit"
        className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
      >
        Crear Usuario
      </button>

      {/* Mensaje de feedback */}
      {message && (
        <p className={`mt-4 text-center text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
