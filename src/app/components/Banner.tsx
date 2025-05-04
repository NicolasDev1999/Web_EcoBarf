import Link from "next/link";

export default function Banner() {
  return (
    <section className=" bg-black/45 flex flex-col md:flex-row items-center justify-between  text-white md:px-0 md:py-0 h-[381px] md:h-auto">
      {/* Imagen para mobile */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0 relative">
        <div className="md:hidden fixed w-full -z-10 top-[60px] md:top-0">
          <img
            src="/imagenes/bannermob.jpeg"
            alt="Imagen estática"
            width={520}
            height={600}
          />
        </div>
        <div className="hidden lg:block relative w-full">
          <img
            src="/imagenes/GoldenEcoBarf.png"
            alt="Perro feliz comiendo"
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Alimenta a tu perro como se merece, con recetas 100% naturales.
        </h2>

        <Link
          href="/productos"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 mb-6"
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
