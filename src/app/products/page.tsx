"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar, Footer } from "../imports";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Barf Pollo & Verduras",
    description: "Receta balanceada con pollo, zanahoria, espinaca y aceite de coco.",
    price: "$22.000 / 500g",
    image: "/imagenes/eco-product1.png",
  },
  {
    id: 2,
    name: "Barf Res Premium",
    description: "Con carne de res magra, calabaza, manzana y cúrcuma.",
    price: "$24.000 / 500g",
    image: "/imagenes/eco-product2.png",
  },
  {
    id: 3,
    name: "Snack Natural Deshidratado",
    description: "Orejas de cerdo y carne deshidratada 100% natural.",
    price: "$15.000 / pack",
    image: "/imagenes/eco-product3.png",
  },
];

export default function ProductList() {
  return (
    <section className="pt-16">
      <Navbar />
      <motion.div
        className="bg-white py-16 px-6 md:px-16 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[var(--verdeOscuro)]">
            Nuestros Productos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elaborados con ingredientes frescos, sin conservantes ni rellenos. Alimentación natural, como debe ser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-green-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="relative h-60">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[var(--verdeOscuro)]">{product.name}</h2>
                <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                <p className="text-green-800 font-bold text-lg mt-4">{product.price}</p>
                <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-full transition">
                  Comprar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </section>
  );
}
