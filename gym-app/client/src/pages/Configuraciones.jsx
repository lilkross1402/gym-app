import { useEffect, useState } from "react";
import api from "../services/api";

export default function Configuraciones() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get("/configuraciones")
      .then(res => setConfig(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!config) return <p>Cargando...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Configuración de sesión</h2>

      <p>⏱️ Duración máxima: {config.duracion_sesion_inactividad / 60000} minutos</p>
      <p>⚠️ Advertencia: {config.tiempo_advertencia_ms / 60000} minutos</p>
    </div>
  );
}
