import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[var(--grisClaro)] text-[var(--verdeOscuro)] p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-wide uppercase hidden lg:block">
        ECOBARF
      </div>

      {/* Links de Navegación */}
      <div className="flex gap-8">
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
    </nav>
  );
}
