import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ModificarDatos() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", usuario: "", contrasena: "" });
  const [foto, setFoto] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");
    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUsuarioNombre(storedUser);
    }

    const fetchDatos = async () => {
      try {
        const res = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { user, photo } = res.data;
        setForm({ ...user, contrasena: "" });
        if (photo) setVistaPrevia(photo);
      } catch (err) {
        console.error(err);
        setMensaje("Error al cargar el perfil");
      }
    };

    fetchDatos();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setVistaPrevia(URL.createObjectURL(file));
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setMensaje("");
    const token = localStorage.getItem("token");

    try {
      await api.put("/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (foto) {
        const data = new FormData();
        data.append("image", foto);

        const response = await api.post("/user/photo", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.image_url) {
          setVistaPrevia(response.data.image_url);
        }
      }

      setMensaje("✅ Datos actualizados correctamente");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar los cambios");
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
      {/* Barra superior */}
      <header className="bg-black bg-opacity-80 text-white flex justify-between items-center px-6 py-4 shadow z-40 relative">
        <div className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo192.png" alt="Logo" className="h-8" />
          <span>GIMNASIO ASTREUS</span>
        </div>

        <div className="relative z-50" ref={menuRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setMenuVisible((prev) => !prev)}
          >
            <span className="text-white font-semibold">{usuarioNombre}</span>
            <img
              src={vistaPrevia || "https://i.pravatar.cc/40"}
              alt="Perfil"
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
          </div>

          {menuVisible && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-50 w-48">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/modificar")}>
                  Modificar datos
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cambiar contraseña</li>
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

      {/* Formulario con botón de regreso */}
      <div className="pt-20 px-4 pb-10 flex flex-col items-center">
        <form
          onSubmit={handleGuardar}
          className="bg-white bg-opacity-90 shadow p-6 rounded-lg w-full max-w-md relative pt-12"
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img
              src={vistaPrevia || "https://i.pravatar.cc/100"}
              alt="Vista previa"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />
          </div>

          <h2 className="text-xl font-bold mb-4 text-center mt-4">Modificar Datos</h2>

          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block text-sm font-medium">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block text-sm font-medium">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <label className="block text-sm font-medium">Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <label className="block text-sm font-medium">Foto de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFoto}
            className="w-full mb-3"
          />

          {mensaje && <p className="text-sm text-center mb-3">{mensaje}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
          >
            Guardar Cambios
          </button>
        </form>

        {/* Botón de regreso al dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 text-sm text-blue-600 underline hover:text-blue-800 transition"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
