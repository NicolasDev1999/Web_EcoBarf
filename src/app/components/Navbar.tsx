'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-[var(--grisClaro)] text-[var(--verdeOscuro)] p-4 flex justify-between items-center w-full shadow-md fixed top-0 left-0 z-50">
      <div className="text-3xl font-bold tracking-wide uppercase">
        ECOBARF
      </div>

      {/* Menú móvil */}
      <div className="lg:hidden relative">
        <button onClick={toggleMenu} className="text-3xl">
          ☰
        </button>
        {menuOpen && (
          <div className="absolute top-12 left-0 right-0 bg-white p-4 z-10 shadow-lg">
            <Link href="/benefits" className="block py-2 hover:underline" onClick={closeMenu}>
              Beneficios
            </Link>
            <Link href="/products" className="block py-2 hover:underline" onClick={closeMenu}>
              Productos
            </Link>
            <Link href="/admin" className="block py-2 hover:underline" onClick={closeMenu}>
              Conócenos
            </Link>
            <Link href="/login" className="block py-2 hover:underline" onClick={closeMenu}>
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Links de navegación para escritorio */}
      <div className="hidden lg:flex gap-8">
        <Link href="/benefits" className="hover:underline">
          Beneficios
        </Link>
        <Link href="/products" className="hover:underline">
          Productos
        </Link>
        <Link href="/admin" className="hover:underline">
          Conócenos
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}
