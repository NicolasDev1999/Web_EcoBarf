// components/Banner.tsx
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-background text-white ">
      <div className="w-full md:w-1/2 mb-6 md:mb-0 hidden lg:block relative">
        <Image
          src="/imagenes/GoldenEcoBarf.png"
          alt="Perro feliz comiendo"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative md:hidden">
              <Image
                src="/imagenes/mobileeco.jpeg"
                alt="Imagen estática con sombra"
                width={520}
                height={600}
              />
            </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Alimenta a tu perro como se merece, con recetas 100% naturales.
        </h2>

        <Link
          href="/productos"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
