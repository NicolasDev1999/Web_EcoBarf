'use client';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Comprobar si el usuario ya está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario ya está autenticado, redirige al dashboard
        router.push("/UserDashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

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
    <div className="flex items-center justify-center min-h-screen from-green-100 via-white to-green-50 px-4 relative">
      
      {/* Flecha de regreso */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 md:top-8 md:left-8 text-green-600 hover:text-green-800 transition-colors"
        aria-label="Volver al inicio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 pt-6 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-100 relative"
      >
        <div className="flex justify-center -mt-16 mb-2">
          <Image
            src="/imagenes/GoldenEcoBarf.png"
            alt="Logo de la marca"
            className="w-24 h-24 object-contain rounded-full border-4 border-white shadow-md"
            width={96}
            height={96}
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

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            tabIndex={-1}
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.032.105-.07.21-.114.314M2.458 12c1.276 4.057 5.067 7 9.542 7 4.478 0 8.268-2.943 9.542-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.21-3.568m1.735-1.732A9.974 9.974 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.978 9.978 0 01-1.507 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </button>
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
