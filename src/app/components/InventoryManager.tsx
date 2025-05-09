'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
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
  const [error, setError] = useState<string | null>(null);

  const predefinedProducts = [
    'Galletas-manzana',
    'Galletas-Banano',
    'Galletas-Zanahoria/pollo',
    'Galletas-Gato/hígado',
    'Galletas-Remolacha',
    'Kid de Ecomist.jabón, shampoo, y esencia de Romeo',
    'Esencia de Romeo',
    'Jabón de Romeo'
  ];

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'inventory'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.stock <= 0 || newProduct.price <= 0) {
      setError('Completa todos los campos con valores válidos.');
      return;
    }

    setError(null);

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
    if (!product || quantity <= 0) return;

    const newStock = product.stock - quantity;

    try {
      await updateDoc(doc(db, 'inventory', id), { stock: newStock });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
      );
    } catch (err) {
      console.error('Error al registrar venta', err);
    }
  };

  const handleIncreaseStock = async (id: string, quantity: number) => {
    const product = products.find((p) => p.id === id);
    if (!product || quantity <= 0) return;

    const newStock = product.stock + quantity;

    try {
      await updateDoc(doc(db, 'inventory', id), { stock: newStock });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
      );
    } catch (err) {
      console.error('Error al aumentar stock', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'inventory', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  };

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalPrice = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-emerald-700">Gestión de Inventario</h2>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Formulario */}
        <div className="w-full md:w-1/2 space-y-4 border rounded-lg p-5 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-700">Agregar Producto</h3>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <select
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="text-emerald-700 w-full p-2.5 rounded border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="" disabled>Selecciona un producto</option>
            {predefinedProducts.map((product) => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock inicial"
            value={newProduct.stock || ''}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            className=" text-emerald-700 w-full p-2.5 rounded border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className=" text-emerald-700 w-full p-2.5 rounded border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={handleAddProduct}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition"
          >
            + Agregar Producto
          </button>
        </div>

        {/* Inventario */}
        <div className="w-full md:w-1/2 space-y-4 border rounded-lg p-5 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Inventario</h3>
          <p className="text-sm text-gray-600">Total en stock: <span className="font-bold">{totalStock}</span></p>
          <p className="text-sm text-gray-600">Valor total: <span className="font-bold">{totalPrice.toLocaleString()} COP</span></p>
          
          <ul className="space-y-4">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-start flex-wrap border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="text-sm text-gray-800">
                  <p className="font-medium">{p.name}</p>
                  <p>Stock: {p.stock}</p>
                  <p>Precio: {p.price.toLocaleString()} COP</p>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1.5 rounded"
                    onClick={() => handleSale(p.id!, 1)}
                    disabled={p.stock === 0}
                  >
                    Vender
                  </button>
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1.5 rounded"
                    onClick={() => handleIncreaseStock(p.id!, 1)}
                  >
                    +1
                  </button>
                  <button
                    className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded"
                    onClick={() => handleDeleteProduct(p.id!)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
