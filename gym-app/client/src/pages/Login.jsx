import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: "", contrasena: "", recordar: false });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        usuario: form.usuario,
        contrasena: form.contrasena,
      });

      const { token, usuario, nombre } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("nombre", nombre);

      alert("✅ Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.error || "Error al iniciar sesión";
      setError(msg);
    }
  };

  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      {/* Encabezado con logo y nombre clickeable */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-10 flex items-center gap-2 font-bold text-lg text-white cursor-pointer transition-transform transform hover:scale-105"
      >
        <img src="/logo192.png" alt="Logo" className="h-8" />
        <span className="text-white text-2xl">GIMNASIO ASTREUS</span>
      </div>

      <div className="absolute inset-0 bg-black opacity-40" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-80 p-10 rounded max-w-md w-full space-y-4 shadow-xl animate-fade-in-up"
      >
        <h2 className="text-2xl font-bold text-center text-black animate-fade-in-up">
          INICIAR SESIÓN
        </h2>

        <input
          type="text"
          name="usuario"
          placeholder="USUARIO"
          value={form.usuario}
          onChange={handleChange}
          required
          className="w-full p-2 rounded text-center bg-gray-100 animate-fade-in-up"
        />

        <input
          type="password"
          name="contrasena"
          placeholder="CONTRASEÑA"
          value={form.contrasena}
          onChange={handleChange}
          required
          className="w-full p-2 rounded text-center bg-gray-100 animate-fade-in-up"
        />

        <div className="flex items-center gap-2 text-sm animate-fade-in-up">
          <input
            type="checkbox"
            name="recordar"
            checked={form.recordar}
            onChange={handleChange}
          />
          <label htmlFor="recordar" className="text-black">RECORDAR USUARIO</label>
        </div>

        {error && <p className="text-red-600 text-sm text-center animate-fade-in-up">{error}</p>}

        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition-all duration-200 w-full animate-fade-in-up"
        >
          INGRESAR
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm text-black underline hover:text-yellow-500 transition mt-2 w-full text-center animate-fade-in-up"
        >
          Volver al inicio
        </button>
      </form>
    </section>
  );
}
