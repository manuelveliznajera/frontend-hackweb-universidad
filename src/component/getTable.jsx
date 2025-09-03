import React, { useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline"; // Ícono "ver"
import { useNavigate } from "react-router";
import useDataStore from "../store/useDataStore";
import { Link } from "react-router";

const TablaUsuarios = () => {
    const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(false);

  const { data, fetchData, loading, error } = useDataStore();

  useEffect(() => {
    fetchData(); // carga automática al montar el componente
  }, [fetchData]);



  if (loading) return <div className="text-center mt-10">Cargando datos...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!data) return <div className="text-center mt-10 text-gray-500">No hay datos que mostrar</div>;

  let usersArray = [];
  if (data.updated) {
    usersArray = [data.updated];
  } else if (Array.isArray(data)) {
    usersArray = data;
  } else {
    return <div className="text-center mt-10 text-gray-500">No hay datos que mostrar</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4">Registros de Usuarios</h1>
        <h2>Proyecto Educativo - Universidad Rural Seccion Nueva Santa Rosa</h2>
        <img 
            src="/regional.png"
        />
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User Agent</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Creación</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Idioma</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Navegador y Versión</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">IP Pública</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sistema Operativo</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ubicación</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Activación de Cámara</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usersArray.map((user) => (
            <tr key={user._id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{user._id}</td>
              <td className="px-4 py-2 text-sm">{user.userAgent}</td>
              <td className="px-4 py-2 text-sm">{user.createdAt}</td>
              <td className="px-4 py-2 text-sm">{user.idiomaSistema}</td>
              <td className="px-4 py-2 text-sm">{user.navegadorYVersion}</td>
              <td className="px-4 py-2 text-sm">{user.ipPublica}</td>
              <td className="px-4 py-2 text-sm">{user.so}</td>
              <td className="px-4 py-2 text-sm">
                {user.ubicacion ? `lat: ${user.ubicacion.lat}, lon: ${user.ubicacion.lon}` : "No disponible"}
              </td>
              <td className="px-4 py-2 text-sm">{user.permisos?.camera || "No disponible"}</td>
              <td className="px-4 py-2 text-sm">

                <Link
                    to={`/usuario/${user._id}`}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <EyeIcon className="w-4 h-4" />
                  Ver
                </Link>
            
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
          {
        selectedUser && (
            <GetById data={selectedUser} />
        )
          }
    </div>
   
  );
};

export default TablaUsuarios;