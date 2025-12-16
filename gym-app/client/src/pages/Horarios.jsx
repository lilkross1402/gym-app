import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSesionInactividad } from "../hook/useSesionInactividad";


export default function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // 🕒 Control de inactividad por hook personalizado
  useSesionInactividad({
    onExpirar: () => {
      alert("⚠️ Tu sesión ha expirado por inactividad.");
      localStorage.clear();
      navigate("/");
    },
    onAdvertencia: () => {
      const continuar = window.confirm("⚠️ Tu sesión está por vencer. ¿Deseas continuar?");
      if (!continuar) {
        localStorage.clear();
        navigate("/");
      }
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) return navigate("/login");

    setUsuario(storedUser);

    // Foto de perfil
    api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { photo } = res.data;
      if (photo) setFotoPerfil(photo);
    });

    // Horarios
    api.get(`/clases/${storedUser}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setHorarios(res.data))
      .catch((err) => console.error("Error al cargar horarios:", err));

    // Cierre del menú
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg')",
      }}
    >
      {/* Barra superior */}
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
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/modificar")}
                >
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

      {/* Panel de horarios */}
      <main className="relative z-10 flex justify-center py-12 px-4">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-6 w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            🕒 Horarios de tus Clases
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-2">Clase</th>
                  <th className="p-2">Entrenador</th>
                  <th className="p-2">Horario</th>
                  <th className="p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {horarios.length > 0 ? (
                  horarios.map((c, index) => (
                    <tr key={index} className="border-t border-gray-300 text-black">
                      <td className="p-2">{c.nombre_clase}</td>
                      <td className="p-2">{c.entrenador}</td>
                      <td className="p-2">{c.horario}</td>
                      <td className="p-2">
                        {new Date(c.fecha_inscripcion).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-600">
                      No tienes clases programadas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-gray-800"
            >
              ← Volver
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
