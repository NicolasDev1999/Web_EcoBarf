import { NextRequest, NextResponse } from 'next/server';
import { app } from '@/app/firebase/firebase-admin-config'; // Asegúrate de que esto esté correctamente configurado
import { getFirestore } from 'firebase-admin/firestore';


const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación de datos
    if (!data.nombre || !data.stock || !data.precio) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    // Validar que stock y precio sean números
    const stock = Number(data.stock);
    const precio = Number(data.precio);

    if (isNaN(stock) || isNaN(precio)) {
      return NextResponse.json({ error: 'Stock y precio deben ser números válidos' }, { status: 400 });
    }

    const nuevoProducto = {
      nombre: data.nombre,
      stock,  // Ya convertido a número
      precio, // Ya convertido a número
      fechaCreacion: new Date().toISOString(), // Fecha de creación
    };

    const docRef = await db.collection('inventory').add(nuevoProducto);

    // Respuesta exitosa con el ID del nuevo producto
    return NextResponse.json({ id: docRef.id, ...nuevoProducto }, { status: 201 });
  } catch (error: unknown) {
    // Manejo del error si es de tipo Error
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al guardar el producto en el servidor: ' + error.message }, { status: 500 });
    }
    
    // Si el error no es una instancia de Error
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
  }
}
