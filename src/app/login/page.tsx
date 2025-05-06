'use client';

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "next/navigation"; // Importar useRouter

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar carga
  const router = useRouter(); // Instancia de useRouter para redirección

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Cambiar el estado de carga
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      localStorage.setItem("uid", uid); // Guarda el UID

      // Redirigir al dashboard después de un login exitoso
      router.push("/UserDashboard"); // Aquí se redirige a la ruta del dashboard
    } catch (err: unknown) {
      // Verificar que 'err' sea una instancia de Error antes de acceder a sus propiedades
      if (err instanceof Error) {
        setError("Credenciales inválidas: " + err.message);
      } else {
        // Si no es un Error, manejarlo adecuadamente
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-green-600 text-white p-2" disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
