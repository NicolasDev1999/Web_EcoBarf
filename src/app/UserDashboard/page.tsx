// src/components/ImagenTexto.tsx
import React from 'react';

const ImagenTexto = () => {
  return (
    <div className="flex items-center space-x-4 p-6">
  
      <div className="text-lg text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Texto de prueba</h2>
        <p>
          Este es un componente de ejemplo con una imagen a la izquierda y texto a la derecha.
          Puedes personalizarlo fácilmente para agregar más contenido.
        </p>
      </div>
    </div>
  );
};

export default ImagenTexto;
