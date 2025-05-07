'use client';

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      localStorage.setItem("uid", uid);
      router.push("/UserDashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Credenciales inválidas");
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  from-green-100 via-white to-green-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 pt-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100 relative"
      >
        <div className="flex justify-center -mt-16 mb-2">
          <img
            src="/imagenes/GoldenEcoBarf.png" // Asegúrate de tener esta imagen en `public/logo.png`
            alt="Logo de la marca"
            className="w-24 h-24 object-contain rounded-full border-4 border-white shadow-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center">Iniciar sesión</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
