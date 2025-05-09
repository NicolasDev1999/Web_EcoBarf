"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navbar, Footer } from '../imports';

export default function About() {
    return (
        <section className='pt-17'>
            <Navbar />
            <motion.div
                className="min-h-screen px-1 py-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
            >
                {/* Historia */}
                <section className="max-w-4xl mx-auto mb-12 text-white">
                    <motion.h1 className="text-4xl font-bold mb-4 ">
                        Nuestra Historia
                    </motion.h1>
                    <motion.p className="text-lg mb-6">
                        En Ecobarf, nacimos del amor por los animales y el compromiso con la alimentación natural. Transformamos ingredientes reales en bienestar para los peludos de la casa.
                    </motion.p>
                </section>

                {/* Misión y Valores */}
                <section className="max-w-4xl mx-auto mb-16">
                    <motion.h2 className="text-2xl font-semibold mb-4">
                        Nuestra Misión
                    </motion.h2>
                    <motion.p className="text-lg mb-6">
                        Nutrir con propósito. Queremos que cada perro viva más y mejor gracias a una dieta fresca, natural y libre de procesados.
                    </motion.p>

                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Ingredientes Naturales', desc: 'Solo carne, vegetales y amor. Nada de ultraprocesados.' },
                            { title: 'Cuidado Ambiental', desc: 'Empaques compostables y prácticas sostenibles.' },
                            { title: 'Amor Perruno', desc: 'Porque ellos también merecen comida de verdad.' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-black-100 p-4 rounded-xl shadow-sm bg-[var(--blanco)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.2 }}
                            >
                                <h3 className="font-semibold text-lg mb-2 text-[var(--verdeOscuro)]">{item.title}</h3>
                                <p className="text-sm text-[var(--verdeOscuro)]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Galería */}
                <section className="max-w-5xl mx-auto mb-16">
                    <motion.h2 className="text-2xl font-semibold mb-6">
                        Nuestros Productos en Acción
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((n) => (
                            <motion.div
                                key={n}
                                className="rounded-lg overflow-hidden shadow-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 * n }}
                            >
                                <Image
                                    src={`/imagenes/rute/eco-product${n}.png`} // Reemplaza con tus imágenes reales
                                    alt={`Ecobarf ${n}`}
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Llamado a la acción */}
                <section className="text-center max-w-3xl mx-auto">
                    <motion.h2 className="text-3xl font-bold mb-4">
                        ¿Listo para mejorar la vida de tu perro?
                    </motion.h2>
                    <motion.p className="text-lg mb-6">
                        Explora nuestros productos naturales y súmate al movimiento #BarfConsciente.
                    </motion.p>
                    <motion.a
                        href="/products"
                        className="inline-block bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        Ver Productos
                    </motion.a>
                </section>
            </motion.div>
            <Footer />
        </section>
    );
}
