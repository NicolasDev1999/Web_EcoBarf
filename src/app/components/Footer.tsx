"use client";

import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      className="bg-green-900 text-white pt-10 pb-6 px-6 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Sección 1: Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EcoBarf</h2>
          <p className="text-sm text-gray-300">
            Alimentación natural para mascotas. Sostenible, saludable y con amor por la vida animal.
          </p>
        </div>

        {/* Sección 2: Navegación */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Enlaces útiles</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Sección 3: Contacto y redes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contáctanos</h3>
          <p className="text-sm text-gray-200">Email: hola@ecobarf.com</p>
          <p className="text-sm text-gray-200 mb-3">WhatsApp: +57 311 8854690</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-green-300 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-green-300 transition" />
            </a>
            <a href="https://wa.me/573118854690" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-xl hover:text-green-300 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Línea final */}
      <div className="border-t border-green-700 pt-4 text-center text-sm text-gray-400">
        © 2025 EcoBarf. Todos los derechos reservados.
      </div>
    </motion.footer>
  );
}
