import { useState } from "react";

import '../src/index.css';
import { BottonFacebook } from "./BottonFacebook";

export default function IphoneProduct() {
  const colors = [
    { name: "Negro espacial", value: "black", hex: "#1d1d1f" },
    { name: "Blanco perla", value: "white", hex: "#f5f5f7" },
    { name: "Azul profundo", value: "blue", hex: "#1c3d5a" },
    { name: "Titanio del desierto", value: "gold", hex: "#d4af37" },
  ];

  const capacities = ["128 GB", "256 GB", "512 GB", "1 TB"];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacities[0]);

  return (
    <div className="items-center   p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full p-8">
        <div className="flex flex-row w-full gap-8">
          {/* Columna Izquierda: Imagen (40%) */}
          <div className="flex flex-col  items-center justify-center w-2/5">
            <img
              src="/iphone.webp"
              alt="iPhone 16"
              className="object-contain mb-4"
            />
          </div>

          {/* Columna Derecha: Info (60%) */}
          <div className="flex flex-col justify-between w-3/5 ">
            <div>
               <div className="flex flex-col  items-center justify-center w-2/5">
            <img
              src="/sat.png"
              alt="Sat"
              className="object-contain mb-4"
            />
            <span>La Super Intendencia de Administración Tributaria - SAT, te invita a participar
            en la compra de este producto. a través de nuestra plataforma de compras en línea. con 95% de descuento.
            </span>
          </div>
              <h1 className="text-2xl font-bold">iPhone 16 Pro Max</h1>
              <p className="text-gray-500 mb-4"> Precio Normal Q11,999.00 GTQ</p>
            <p className="text-3xl font-extrabold text-blue-600 mb-4"> Precio Oferta 599.95 GTQ</p>
              <p className="text-gray-700 mb-6">
                El iPhone 16 Pro Max cuenta con una pantalla OLED de 6.7 pulgadas,
                cámara cuádruple de 48 MP, chip A18 Bionic, y soporte para 5G.
                Disponible en varios colores y capacidades de almacenamiento.
              </p>
             

              {/* Colores */}
              <div className="mb-4">
                <h2 className="font-semibold mb-2">Color</h2>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor.value === color.value
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Seleccionado: {selectedColor.name}
                </p>
              </div>

              {/* Capacidades */}
              <div className="mb-4">
                <h2 className="font-semibold mb-2">Capacidad</h2>
                <div className="flex gap-3">
                  {capacities.map((cap) => (
                    <button
                      key={cap}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedCapacity === cap
                          ? "bg-black text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSelectedCapacity(cap)}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Seleccionado: {selectedCapacity}
                </p>
              </div>
            </div>

            {/* Botón */}
            <p>Para adquirir el producto debes Iniciar Sesión en Facebook y poder registrarte</p>
            <BottonFacebook />
            {/* <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              Agregar al carrito
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}