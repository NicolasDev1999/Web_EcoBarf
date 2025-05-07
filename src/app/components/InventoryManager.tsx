'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase-config';

type Product = {
  id?: string;
  name: string;
  stock: number;
  price: number;
};

const InventoryManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock: 0, price: 0 });

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'inventory'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, 'inventory'), {
        name: newProduct.name,
        stock: newProduct.stock,
        price: newProduct.price,
        fechaCreacion: new Date().toISOString(),
      });
      setProducts((prev) => [...prev, { id: docRef.id, ...newProduct }]);
      setNewProduct({ name: '', stock: 0, price: 0 });
    } catch (err) {
      console.error('Error al agregar producto', err);
    }
  };

  const handleSale = async (id: string, quantity: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newStock = product.stock - quantity;

    try {
      await updateDoc(doc(db, 'inventory', id), {
        stock: newStock,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, stock: newStock } : p
        )
      );
    } catch (err) {
      console.error('Error al registrar venta', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Gestión de Inventario</h2>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="number"
          placeholder="Stock inicial"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          className="w-full p-2 border rounded text-black"
        />
        <button onClick={handleAddProduct} className="w-full bg-green-600 text-white p-2 rounded">
          Agregar Producto
        </button>
      </div>

      <hr />

      <h3 className="text-xl font-semibold text-black ">Inventario</h3>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="text-black flex justify-between items-center border p-2 rounded">
            <span>{p.name} - Stock: {p.stock}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleSale(p.id!, 1)}
              disabled={p.stock === 0}
            >
              Vender 1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;
