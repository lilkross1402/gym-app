import { useEffect, useRef, useState } from "react";
import api from "../services/api";

export function useSesionInactividad({ onExpirar, onAdvertencia }) {
  const [duracionSesion, setDuracionSesion] = useState(null);
  const [tiempoAdvertencia, setTiempoAdvertencia] = useState(null);

  const timeoutRef = useRef(null);
  const advertenciaRef = useRef(null);

  // 🔹 Cargar configuración UNA SOLA VEZ
  useEffect(() => {
    const obtenerConfiguracion = async () => {
      try {
        const res = await api.get("/configuraciones");

        const duracion = Number(res.data.duracion_sesion_inactividad);
        const advertencia = Number(res.data.tiempo_advertencia_ms);

        // ⛔ Protección absoluta
        if (duracion > 0 && advertencia > 0 && advertencia < duracion) {
          setDuracionSesion(duracion);
          setTiempoAdvertencia(advertencia);
        } else {
          console.error("⚠️ Configuración inválida de sesión", res.data);
        }
      } catch (err) {
        console.error("⚠️ Error al obtener configuración de sesión:", err);
      }
    };

    obtenerConfiguracion();
  }, []);

  // 🔹 NO arrancar timers hasta tener valores válidos
  useEffect(() => {
    if (!duracionSesion || !tiempoAdvertencia) return;

    const resetTimeout = () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(advertenciaRef.current);

      advertenciaRef.current = setTimeout(() => {
        onAdvertencia && onAdvertencia();
      }, tiempoAdvertencia);

      timeoutRef.current = setTimeout(() => {
        onExpirar && onExpirar();
      }, duracionSesion);
    };

    const eventos = ["mousemove", "keydown", "scroll", "click"];
    eventos.forEach((e) => window.addEventListener(e, resetTimeout));

    resetTimeout();

    return () => {
      eventos.forEach((e) => window.removeEventListener(e, resetTimeout));
      clearTimeout(timeoutRef.current);
      clearTimeout(advertenciaRef.current);
    };
  }, [duracionSesion, tiempoAdvertencia, onExpirar, onAdvertencia]);
}
