import Image from "next/image";


const CardsSection = () => {
  return (
    <section className=" mx-auto p-8 bg-gray-100">
      <h2 className="text-5xl font-bold text-left text-[var(--verdeOscuro)] mb-10">
        Conoce nuestros beneficios
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/imagenes/perrito.png"
              alt="Icono perro"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold text-[var(--verdeOscuro)]">Nutrición Balanceada</h3>
          <p className="text-gray-600 mt-2">
            Ofrecemos alimentos diseñados para cubrir todas las necesidades nutricionales de tu mascota.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/imagenes/bocadillo.png"
              alt="Icono hueso"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold text-[var(--verdeOscuro)]">Ingredientes Naturales</h3>
          <p className="text-gray-600 mt-2">
            Solo usamos ingredientes frescos y naturales para garantizar la mejor calidad.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/imagenes/salud.png"
              alt="Icono corazón"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold text-[var(--verdeOscuro)]">Salud y Bienestar</h3>
          <p className="text-gray-600 mt-2">
            Con nuestros productos, contribuyes al bienestar físico y emocional de tu perro.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/imagenes/sostenibilidad.png"
              alt="Icono pata"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-xl font-semibold text-[var(--verdeOscuro)]">Sostenibilidad</h3>
          <p className="text-gray-600 mt-2">
            Nos importa el planeta, por eso nuestros envases son ecológicos y reciclables.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
