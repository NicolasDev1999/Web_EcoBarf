'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beneficios" },
  { href: "/products", label: "Productos" },
  { href: "/about", label: "Conócenos" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cierra menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-[var(--grisClaro)] text-[var(--verdeOscuro)] px-6 py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide uppercase">
          ECOBARF
        </Link>

        {/* Menú Desktop */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:underline font-medium">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl focus:outline-none"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {/* Menú Móvil Animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white shadow-md mt-2 rounded-md px-6 py-4 space-y-3"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[var(--verdeOscuro)] hover:underline font-medium"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
