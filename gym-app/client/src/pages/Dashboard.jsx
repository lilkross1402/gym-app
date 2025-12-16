import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSesionInactividad } from "../hook/useSesionInactividad";


export default function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tiempoMaximo, setTiempoMaximo] = useState(null);
  const [tiempoAdvertencia, setTiempoAdvertencia] = useState(null);
  const menuRef = useRef(null);

  // ⏱️ Hook personalizado de inactividad
  useSesionInactividad({
    tiempoInactividad: tiempoAdvertencia,
    tiempoMaximo: tiempoMaximo,
    onExpirar: () => {
      alert("⚠️ Tu sesión ha expirado por inactividad.");
      localStorage.clear();
      navigate("/");
    },
    onAdvertencia: () => {
      alert("⚠️ Tu sesión está por vencer. Haz clic o mueve el mouse para continuar.");
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!stored || !token) {
      navigate("/login");
    } else {
      setUsuario(stored);
      api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        const { photo } = res.data;
        if (photo) setFotoPerfil(photo);
      }).catch((err) => {
        console.error("Error al obtener imagen de perfil:", err);
      });
    }

    // 👉 Obtener parámetros desde la base de datos
    api.get("/configuraciones")
      .then((res) => {
        setTiempoMaximo(res.data.duracion_sesion_inactividad);
        setTiempoAdvertencia(res.data.tiempo_advertencia_ms);
      })
      .catch((err) => {
        console.error("Error al obtener configuración de sesión:", err);
      });

    // 👂 Cierre del menú
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  const sections = [
    { icon: "📅", title: "Clases inscritas", desc: "Aquí verás tus clases activas.", route: "/clases-inscritas" },
    { icon: "🕒", title: "Horarios", desc: "Consulta tus horarios personalizados.", route: "/horarios" },
    { icon: "🏋️", title: "Entrenadores", desc: "Tus entrenadores asignados por plan." },
    { icon: "💳", title: "Pagos", desc: "Historial de pagos y facturas." },
    { icon: "📦", title: "Planes disponibles", desc: "Explora y actualiza tus planes." },
    { icon: "📈", title: "Progreso físico", desc: "Sigue tu evolución en el entrenamiento." },
    { icon: "🍎", title: "Nutrición", desc: "Consejos y planes alimenticios personalizados." },
    { icon: "📣", title: "Eventos", desc: "No te pierdas las actividades del mes." },
    { icon: "💬", title: "Mensajes", desc: "Revisa mensajes de tus entrenadores." },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg')",
      }}
    >
      <header className="z-50 relative bg-black bg-opacity-80 text-white flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo192.png" alt="Logo" className="h-8" />
          <span>GIMNASIO ASTREUS</span>
        </div>

        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setMenuVisible((prev) => !prev)}
          >
            <span className="text-white font-semibold">Bienvenido, {usuario}</span>
            <img
              src={fotoPerfil || "https://i.pravatar.cc/40"}
              alt="Perfil"
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
          </div>

          {menuVisible && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-[999] w-48">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/modificar")}>
                  Modificar datos
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Cambiar contraseña
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Salir
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="bg-white bg-opacity-50 rounded-xl shadow-lg p-10 max-w-7xl w-full z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((item, idx) => (
              <div
                key={idx}
                className="bg-white bg-opacity-50 rounded-xl shadow p-6 transition hover:shadow-2xl hover:scale-[1.03] hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (item.route) navigate(item.route);
                }}
              >
                <h2 className="text-lg font-bold mb-2">
                  {item.icon} {item.title}
                </h2>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
