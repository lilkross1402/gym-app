import { useEffect, useRef, useState } from "react";
import api from "../services/api";

export function useSesionInactividad({ onExpirar, onAdvertencia }) {
  const [duracionSesion, setDuracionSesion] = useState(300000); // 5 minutos por defecto
  const [tiempoAdvertencia, setTiempoAdvertencia] = useState(240000); // 4 minutos por defecto

  const timeoutRef = useRef(null);
  const advertenciaRef = useRef(null);

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      try {
        const res = await api.get("/configuraciones");
        setDuracionSesion(parseInt(res.data.duracion_sesion_inactividad));
        setTiempoAdvertencia(parseInt(res.data.tiempo_advertencia_ms));
      } catch (err) {
        console.error("⚠️ Error al obtener configuración de sesión:", err);
      }
    };

    obtenerConfiguracion();
  }, []);

  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(advertenciaRef.current);

      // Mostrar advertencia antes de expirar
      advertenciaRef.current = setTimeout(() => {
        if (typeof onAdvertencia === "function") {
          onAdvertencia();
        }
      }, tiempoAdvertencia);

      // Expirar sesión tras tiempo máximo
      timeoutRef.current = setTimeout(() => {
        if (typeof onExpirar === "function") {
          onExpirar();
        }
      }, duracionSesion);
    };

    const eventos = ["mousemove", "keydown", "scroll", "click"];
    eventos.forEach((event) => window.addEventListener(event, resetTimeout));

    resetTimeout();

    return () => {
      eventos.forEach((event) => window.removeEventListener(event, resetTimeout));
      clearTimeout(timeoutRef.current);
      clearTimeout(advertenciaRef.current);
    };
  }, [duracionSesion, tiempoAdvertencia, onExpirar, onAdvertencia]);
}
