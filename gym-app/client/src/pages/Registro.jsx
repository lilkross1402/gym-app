import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    contrasena: "",
    confirmar: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.contrasena !== form.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await api.post("/auth/registro", {
        nombre: form.nombre,
        correo: form.correo,
        usuario: form.usuario,
        contrasena: form.contrasena,
      });

      console.log("✅ Registro exitoso:", res.data);
      alert("¡Usuario registrado!");
      navigate("/login");
    } catch (err) {
      console.error("❌ Error al registrar:", err.response?.data || err.message);
      alert("Error al registrar usuario. Verifica los datos.");
    }
  };

  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      {/* Encabezado clickeable */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-6 flex items-center gap-2 font-bold text-lg text-white cursor-pointer px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 animate-fade-in-up"
      >
        <img src="/logo192.png" alt="Logo" className="h-8" />
        <span className="text-white text-2xl">GIMNASIO ASTREUS</span>
      </div>

      {/* Capa oscura general */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Formulario con animación */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-70 p-10 rounded max-w-md w-full space-y-4 shadow-xl animate-fade-in-up"
      >
        <h2 className="text-2xl font-bold text-center text-black">REGISTRA TUS DATOS</h2>

        {["nombre", "correo", "usuario", "contrasena", "confirmar"].map((field, idx) => (
          <input
            key={idx}
            type={field === "contrasena" || field === "confirmar" ? "password" : "text"}
            name={field}
            placeholder={
              field === "nombre"
                ? "NOMBRE Y APELLIDO"
                : field === "correo"
                ? "CORREO"
                : field === "usuario"
                ? "USUARIO"
                : field === "contrasena"
                ? "CONTRASEÑA"
                : "CONFIRMA TU CONTRASEÑA"
            }
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 rounded text-center bg-gray-100"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition w-full"
        >
          REGISTRAR
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm text-black underline hover:text-yellow-500 transition mt-2 w-full text-center"
        >
          Volver al inicio
        </button>
      </form>
    </section>
  );
}
