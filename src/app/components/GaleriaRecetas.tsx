
const recetas = [
  {
    id: 1,
    titulo: "Pollo con zanahoria",
    imagen: "/imagenes/gurmet.PNG",
  },
  {
    id: 2,
    titulo: "Res con calabaza",
    imagen: "/imagenes/pollo.PNG",
  },
  {
    id: 3,
    titulo: "Pavo y espinaca",
    imagen: "/imagenes/pavo.PNG",
  },
  {
    id: 4,
    titulo: "Cerdo y manzana",
    imagen: "/imagenes/gurmet.PNG",
  },
];

export default function GaleriaRecetas() {
  return (
    <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
        Recetas Naturales
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {recetas.map((receta) => (
          <div
            key={receta.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={receta.imagen}
              alt={receta.titulo}
              width={300}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{receta.titulo}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
