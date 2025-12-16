import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSesionInactividad } from "../hook/useSesionInactividad";

export default function ClasesInscritas() {
  const [clases, setClases] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // 🔒 Hook para detectar inactividad
  useSesionInactividad({
    onExpirar: () => {
      alert("⚠️ Tu sesión ha expirado por inactividad.");
      localStorage.clear();
      navigate("/login");
    },
    onAdvertencia: () => {
      const continuar = window.confirm("⚠️ Tu sesión está por vencer. ¿Deseas continuar?");
      if (!continuar) {
        localStorage.clear();
        navigate("/login");
      }
    }
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) return navigate("/login");

    setUsuario(storedUser);

    api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const { photo } = res.data;
      if (photo) setFotoPerfil(photo);
    });

    cargarClasesInscritas();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  const cargarClasesInscritas = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");
    try {
      const res = await api.get(`/clases/${storedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClases(res.data);
    } catch (err) {
      console.error("Error al obtener clases:", err);
    }
  };

  const abrirModal = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/clases/disponibles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasesDisponibles(res.data);
      setMensaje("");
      setModalVisible(true);
    } catch (err) {
      console.error("Error al cargar clases disponibles:", err);
    }
  };

  const inscribirClase = async (claseId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(
        "/clases/inscribir",
        { usuario, clase_id: claseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.mensaje) {
        setMensaje(res.data.mensaje);
        cargarClasesInscritas();
        setModalVisible(false);
      } else {
        setMensaje("⚠️ Ya estás inscrito en esta clase.");
      }
    } catch (err) {
      console.error("Error al inscribir clase:", err);
      if (err.response?.data?.error === "Ya estás inscrito en esta clase") {
        setMensaje("⚠️ Ya estás inscrito en esta clase.");
      } else {
        setMensaje("⚠️ Error al inscribir clase.");
      }
    }
  };

  const eliminarClase = async (idClase) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/clases/eliminar/${idClase}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarClasesInscritas();
    } catch (err) {
      console.error("Error al eliminar clase:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg')",
      }}
    >
      {/* Header */}
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
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cambiar contraseña</li>
                <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}>
                  Salir
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Panel Clases */}
      <main className="relative z-10 flex justify-center py-12 px-4">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-6 w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            📅 Clases Inscritas
          </h2>

          <div className="flex justify-between mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-gray-800"
            >
              ← Volver
            </button>
            <button
              onClick={abrirModal}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-white"
            >
              ➕ Inscribir Clase
            </button>
          </div>

          {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-2">Nombre de la Clase</th>
                  <th className="p-2">Entrenador</th>
                  <th className="p-2">Día</th>
                  <th className="p-2">Horario</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clases.length > 0 ? (
                  clases.map((c) => (
                    <tr key={c.id} className="border-t border-gray-300 text-black">
                      <td className="p-2">{c.nombre_clase}</td>
                      <td className="p-2">{c.entrenador}</td>
                      <td className="p-2">{c.dia || "-"}</td>
                      <td className="p-2">{c.horario}</td>
                      <td className="p-2">{new Date(c.fecha_inscripcion).toLocaleDateString()}</td>
                      <td className="p-2">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          onClick={() => eliminarClase(c.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-600">
                      No tienes clases inscritas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-5xl">
            <h3 className="text-xl font-bold mb-4 text-center text-black">
              📋 Clases Disponibles
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-100 text-black">
                    <th className="p-2">Clase</th>
                    <th className="p-2">Entrenador</th>
                    <th className="p-2">Día</th>
                    <th className="p-2">Horario</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clasesDisponibles.map((c) => (
                    <tr key={c.id} className="border-t border-gray-300 text-black">
                      <td className="p-2">{c.nombre_clase}</td>
                      <td className="p-2">{c.entrenador}</td>
                      <td className="p-2">{c.dia || "-"}</td>
                      <td className="p-2">{c.horario}</td>
                      <td className="p-2">
                        <button
                          onClick={() => inscribirClase(c.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Inscribir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setModalVisible(false)}
                className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
