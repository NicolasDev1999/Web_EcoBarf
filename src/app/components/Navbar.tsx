'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[var(--grisClaro)] text-[var(--verdeOscuro)] p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-wide uppercase">
        ECOBARF
      </div>

      {/* Menú móvil */}
      <div className="lg:hidden">
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label htmlFor="menu-toggle" className="text-3xl cursor-pointer">
        ☰
        </label>

        <div
          className="menu-items absolute top-16 left-0 right-0 bg-white p-4 hidden z-10 shadow-lg"
          id="menu"
        >
          <Link href="/benefits" className="block py-2 hover:underline">
            Beneficios
          </Link>
          <Link href="/products" className="block py-2 hover:underline">
            Productos
          </Link>
          <Link href="/about" className="block py-2 hover:underline">
            Conócenos
          </Link>
        </div>
      </div>

      {/* Links de navegación para desktop */}
      <div className="hidden lg:flex gap-8">
        <Link href="/benefits" className="hover:underline">
          Beneficios
        </Link>
        <Link href="/products" className="hover:underline">
          Productos
        </Link>
        <Link href="/about" className="hover:underline">
          Conócenos
        </Link>
      </div>

      <style jsx>{`
        /* Menú móvil */
        #menu-toggle:checked + label + .menu-items {
          display: block;
        }
      `}</style>
    </nav>
  );
}
