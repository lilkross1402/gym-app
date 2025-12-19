import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [perfil, setPerfil] = useState({
    usuario: "",
    nombre: "",
    correo: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPerfil({
          usuario: res.data.usuario,
          nombre: res.data.nombre,
          correo: res.data.correo,
        });
      })
      .catch((err) => {
        console.error("Error cargando perfil:", err);
        setError("No se pudo cargar el perfil");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div className="p-6">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Perfil del usuario</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Usuario
            </label>
            <input
              value={perfil.usuario}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Nombre
            </label>
            <input
              value={perfil.nombre}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Correo
            </label>
            <input
              value={perfil.correo}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
