import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { app } from '@/app/firebase/firebase-admin-config';

const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Verificación de datos recibidos
    if (!data.productId || !data.quantity) {
      return NextResponse.json({ error: 'Faltan datos necesarios: productId o quantity' }, { status: 400 });
    }

    // Realiza la lógica de venta en tu inventario
    const productRef = db.collection('inventory').doc(data.productId);
    const product = await productRef.get();
    
    if (!product.exists) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const updatedStock = product.data()?.stock - data.quantity;
    
    if (updatedStock < 0) {
      return NextResponse.json({ error: 'No hay suficiente stock disponible' }, { status: 400 });
    }

    // Actualiza el inventario
    await productRef.update({ stock: updatedStock });

    // Respuesta exitosa
    return NextResponse.json({ success: true, updatedStock }, { status: 200 });
  } catch (error: unknown) {
    // Manejo de errores genéricos
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: `Error al procesar la venta: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error desconocido al procesar la venta' }, { status: 500 });
  }
}
