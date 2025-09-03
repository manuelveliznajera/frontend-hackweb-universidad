import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate, useParams } from "react-router";
import useDataStore from "../store/useDataStore";
import { Link } from "react-router";

export default function GetById( ) {
   
const { id } = useParams();
  const { data } = useDataStore();
  console.log(data);
  //const registro = datos.find(item => item._id === "68b6934f9cc7859ad10b431b");
const captura = data.find((item) => String(item._id) == id);
console.log("caputura", captura);

  if (!captura) {
    return <p>No se encontró la captura con ID {id}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Captura</h1>
        <h2>Universidad Rural: 4to. Ciclo</h2>
        <h2>Curso: Seguridad Informática</h2>
        <h2>Estudiante: Manuel Veliz</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 my-6">
  {/* Título */}
  <h2 className="text-2xl font-bold mb-6">
    Datos del usuario con IP: <span className="text-blue-600">{captura.ipPublica}</span>
  </h2>

  {/* Contenedor de 2 columnas en desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Columna 1: Ubicación */}
    <div>
      <h3 className="font-semibold mb-2 text-lg">Ubicación detectada:</h3>
      <p>Latitud: <span className="font-bold">{captura.ubicacion.lat}</span></p>
      <p>Longitud: <span className="font-bold">{captura.ubicacion.lon}</span></p>
      <p>Precisión: <span className="font-bold">{captura.ubicacion.accuracy} metros</span></p>
      <MapContainer
        center={[captura.ubicacion.lat, captura.ubicacion.lon]}
        zoom={16}
        style={{ height: "300px", width: "100%", borderRadius: 12 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[captura.ubicacion.lat, captura.ubicacion.lon]}>
          <Popup>¡Aquí estás!</Popup>
        </Marker>
      </MapContainer>
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
       <Link
                    to={`/escritorio`}
                    className="p-4 bg-black text-amber-50 mt-3"
                >
                  
                 Regresar al Escritorio
                </Link>
    </div>
  </div>
</div>
      
    </div>
    
    
  );
}