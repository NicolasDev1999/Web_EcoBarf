'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import {InventoryManager} from '../imports';

interface UserInfo {
  displayName: string | null;
  email: string | null;   
  uid: string;
  photoURL: string | null;
}

export default function UserDashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const { displayName, email, uid, photoURL } = currentUser;
      setUserInfo({ displayName, email, uid, photoURL });
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!userInfo) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen  from-green-50 via-white to-green-100 p-6">
      {/* Encabezado */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-6 mb-8">
        <Image
          src={userInfo.photoURL || '/imagenes/GoldenEcoBarf.png'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-green-400"
          width={80}  
          height={80}
           priority
           
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">¡Hola, {userInfo.displayName || 'Usuario'}!</h1>
          <p className="text-sm text-gray-600">Correo: {userInfo.email}</p>
          <p className="text-xs text-gray-400">UID: {userInfo.uid}</p>
        </div>
      </div>

      {/* Tarjetas de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <DashboardCard
          title="Mi Perfil"
          description="Ver y editar tu información personal"
          color="blue"
          onClick={() => router.push('/UserDashboard')}
        />
        <DashboardCard
          title="Configuración"
          description="Personaliza tu experiencia"
          color="purple"
          onClick={() => router.push('/admin')}
        />
        <DashboardCard
          title="Cerrar sesión"
          description="Salir de la cuenta"
          color="red"
          onClick={() => {
            auth.signOut();
            router.push('/login');
          }}
        />
      </div>
      <InventoryManager/> {/* Componente de gestión de inventario */}
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'red';
  onClick: () => void;
};

function DashboardCard({ title, description, color, onClick }: CardProps) {
  const bgColor = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    red: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={`p-5 rounded-xl shadow-md text-white ${bgColor[color]} transition duration-300 text-left`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm mt-1">{description}</p>
    </button>
  );
}
