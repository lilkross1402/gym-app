import { useNavigate } from "react-router-dom";

export default function QuienesSomos() {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-white px-6 py-12"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      {/* Superposición oscura */}
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <div className="lg:w-1/2 text-left space-y-6 animate-fade-in-left">
          <h2 className="text-4xl font-extrabold text-yellow-400 uppercase leading-tight">
            Sobre nuestra <br /> familia deportista
          </h2>
          <p className="text-lg">
            Somos una comunidad apasionada por el deporte y el bienestar. Nuestro gimnasio está equipado
            con tecnología de punta y un equipo de entrenadores profesionales listos para ayudarte a alcanzar tus metas.
          </p>
          <button
            onClick={() => navigate("/")}
            className="underline text-white hover:text-yellow-300 text-sm"
          >
            Volver
          </button>
        </div>

        {/* Cuadro de 4 imágenes */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-6 animate-fade-in-right">
          {[
            "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://media.istockphoto.com/id/2027278927/es/foto/joven-mujer-atl%C3%A9tica-haciendo-ejercicio-con-barra-durante-el-entrenamiento-deportivo-en-un.jpg?s=612x612&w=0&k=20&c=r9pa57g6zvU-keyNhqtZ7dBoWubAmXfMNn1VnXrZWhk=",
            "https://blog.trainingym.com/hs-fs/hubfs/AdobeStock_174212531%20(1).jpeg?width=999&height=667&name=AdobeStock_174212531%20(1).jpeg",
            "https://images.pexels.com/photos/2105493/pexels-photo-2105493.jpeg?auto=compress&cs=tinysrgb&w=600",
          ].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Foto ${i + 1}`}
              className="w-full h-[300px] object-cover rounded shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
