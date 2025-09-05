import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router";
import useDataStore from "../store/useDataStore";
import { Link } from "react-router";

import L from "leaflet";

// Importar iconos de Leaflet correctamente para Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Map from "./Map";

export default function GetById( ) {
   
const { id } = useParams();
  const { data } = useDataStore();
  //const registro = datos.find(item => item._id === "68b6934f9cc7859ad10b431b");
const captura = data.find((item) => String(item._id) == id);

  if (!captura) {
    return <p>No se encontró la captura con ID {id}</p>;
  }

  return (
    <div className="bg-amber-100 p-8 mx-auto  rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Captura</h1>
        <h2> <strong>Universidad Regional: </strong> 9veno. Semestre</h2>
        <h2 className="text-2xl text-amber-600"> Curso: Criminalista</h2>
        <h2 className="text-3xl text-blue-600 px-3 py-2 bg-amber-300 border-2">Estudiante: Mavelin Pindea & Yaminet Zepeda</h2>
      <div className=" mx-auto bg-white shadow-lg rounded-xl p-6 my-6">
         <Link
                    to={`/escritorio`}
                    className="p-2 bg-black text-amber-50 "
                >
    
                 Regresar al Escritorio
                </Link>
  {/* Título */}
  <h2 className="text-2xl font-bold mb-6">
    Datos del usuario con IP: <span className="text-blue-600">{captura.ipPublica}</span>
  </h2>

  {/* Contenedor de 2 columnas en desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {/* Columna 1: Ubicación */}
    <div className="w-full">
      <h3 className="font-semibold mb-2 text-lg">Ubicación detectada:</h3>
      <p>Latitud: <span className="font-bold">{captura.ubicacion.lat}</span></p>
      <p>Longitud: <span className="font-bold">{captura.ubicacion.lon}</span></p>
      <p>Precisión: <span className="font-bold">{captura.ubicacion.accuracy} metros</span></p>
      <Map captura={captura.ubicacion} />
      
     
    </div>

    {/* Columna 2: Datos del sistema */}
    <div>
      <h3 className="font-semibold mb-2 text-lg">Datos del sistema:</h3>
      <p><strong>Sistema Operativo:</strong> {captura.so}</p>
      <p><strong>Navegador y Versión:</strong> {captura.navegadorYVersion}</p>
      <p><strong>Idioma del Sistema:</strong> {captura.idiomaSistema}</p>
      <p><strong>Dirección IP Pública:</strong> {captura.ipPublica}</p>
      <p><strong>User Agent:</strong> {captura.userAgent}</p>

      <h4 className="font-semibold mt-3 mb-1">Permisos:</h4>
      <p><strong>Cámara:</strong> {captura.permisos?.camera || "No disponible"}</p>
      <p><strong>Geolocalización:</strong> {captura.permisos?.geolocation || "No disponible"}</p>
      <p><strong>Micrófono:</strong> {captura.permisos?.microphone || "No disponible"}</p>
      <p><strong>Notificaciones:</strong> {captura.permisos?.notifications || "No disponible"}</p>

      <p className="mt-3 mb-3"><strong>Fecha de Creación:</strong> {captura.createdAt}</p>
       
    </div>
   
  </div>

</div>
      
    </div>
    
    
  );
}