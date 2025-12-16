import React from "react";

export default function Testimonios() {
  const testimonios = [
    {
      nombre: "Carlos Delgado",
      edad: 29,
      historia:
        "Llegué al gimnasio con obesidad grado 1 y mucha ansiedad. Con el plan de nutrición personalizado y clases de Zumba tres veces por semana, logré perder 12 kg en 4 meses. Hoy me siento con más energía y confianza.",
      imagen:
        "https://images.pexels.com/photos/16161339/pexels-photo-16161339/free-photo-of-hombre-sonriente-sonriendo-ejercicio.jpeg?auto=compress&cs=tinysrgb&w=600",
      posicion: "object-top", // Ajustamos la posición
    },
    {
      nombre: "Monica Perez",
      edad: 35,
      historia:
        "Después de una lesión de rodilla y años de inactividad, pensaba que no podría volver a entrenar. Pero con la ayuda de los entrenadores y clases funcionales, recuperé movilidad y gané fuerza. Ahora corro 5km cada semana.",
      imagen:
        "https://images.pexels.com/photos/13965346/pexels-photo-13965346.jpeg?auto=compress&cs=tinysrgb&w=600",
      posicion: "object-center",
    },
    {
      nombre: "Alvaro Reyes",
      edad: 52,
      historia:
        "Nunca pensé que a mi edad me inscribiría en un gimnasio. Empecé con yoga para mejorar mi postura, pero ahora también hago spinning y pesas. Me siento más joven, más fuerte y feliz conmigo mismo.",
      imagen:
        "https://images.pexels.com/photos/28455391/pexels-photo-28455391/free-photo-of-gimnasio.jpeg?auto=compress&cs=tinysrgb&w=600",
      posicion: "object-center",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4">
      <div className="text-center w-full max-w-7xl">
        <h1 className="text-4xl font-extrabold mb-10 animate-fade-in-up">TESTIMONIOS</h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((testimonio, i) => (
            <div
              key={i}
              className="bg-yellow-400 text-black rounded-lg overflow-hidden shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${i * 0.2}s`, animationFillMode: "both" }}
            >
              <img
                src={testimonio.imagen}
                alt={`Foto de ${testimonio.nombre}`}
                className={`w-full h-64 object-cover ${testimonio.posicion}`}
              />
              <div className="p-4">
                <p className="italic text-md mb-2">
                  {testimonio.nombre}, {testimonio.edad}
                </p>
                <p className="text-sm text-justify">{testimonio.historia}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
