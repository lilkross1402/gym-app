export default function Planes() {
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-white px-6 py-16"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      {/* Superposición oscura */}
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-5xl font-extrabold text-yellow-400 uppercase mb-4 animate-fade-in-up">
          Nuestros Planes
        </h2>
        <p className="text-lg mb-12 text-gray-200 animate-fade-in-up">
          Encuentra el plan que mejor se adapte a tus metas de entrenamiento y estilo de vida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Plan Básico */}
          <div className="flip-card h-[400px] w-full max-w-[400px] mx-auto animate-fade-in-up">
            <div className="flip-card-inner">
              {/* Frente */}
              <div
                className="flip-card-front bg-cover bg-center shadow-lg text-white rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://web-back.perfectgym.com/sites/default/files/styles/460x/public/equipment%20%286%29.jpg?itok=bC0T32-K')",
                }}
              >
                <div className="bg-black bg-opacity-70 rounded-lg p-6 h-full flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold italic mb-2">PLAN BÁSICO</h3>
                  <p className="text-sm text-center">
                    Acceso regular, sin clases grupales ni entrenador personalizado.
                  </p>
                </div>
              </div>

              {/* Detrás */}
              <div className="flip-card-back bg-yellow-400 text-black shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold italic mb-4">$15 / mes</h3>
                <ul className="text-left space-y-1">
                  <li>✅ Acceso regular</li>
                  <li>❌ Clases grupales</li>
                  <li>❌ Entrenador personal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan Silver */}
          <div className="flip-card h-[400px] w-full max-w-[400px] mx-auto animate-fade-in-up">
            <div className="flip-card-inner">
              {/* Frente */}
              <div
                className="flip-card-front bg-cover bg-center shadow-lg text-white rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74wpLBMoZAJlUVXizoauFZqctGNYuMRUrZA&s')",
                }}
              >
                <div className="bg-black bg-opacity-70 rounded-lg p-6 h-full flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold italic mb-2">PLAN SILVER</h3>
                  <p className="text-sm text-center">
                    Acceso al gimnasio, clases grupales y asesoría general.
                  </p>
                </div>
              </div>

              {/* Detrás */}
              <div className="flip-card-back bg-yellow-400 text-black shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold italic mb-4">$25 / mes</h3>
                <ul className="text-left space-y-1">
                  <li>✅ Acceso 24/7</li>
                  <li>✅ Clases grupales</li>
                  <li>✅ Asesoría general</li>
                  <li>❌ Entrenador personal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan Gold */}
          <div className="flip-card h-[400px] w-full max-w-[400px] mx-auto animate-fade-in-up">
            <div className="flip-card-inner">
              {/* Frente */}
              <div
                className="flip-card-front bg-cover bg-center shadow-lg text-white rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/foto-gratis/gimnasio-equipo-ciclismo-indoor_23-2149270210.jpg')",
                }}
              >
                <div className="bg-black bg-opacity-70 rounded-lg p-6 h-full flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold italic mb-2">PLAN GOLD</h3>
                  <p className="text-sm text-center">
                    Acceso total, clases ilimitadas, entrenamientos personalizados, nutrición.
                  </p>
                </div>
              </div>

              {/* Detrás */}
              <div className="flip-card-back bg-yellow-400 text-black shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold italic mb-4">$40 / mes</h3>
                <ul className="text-left space-y-1">
                  <li>✅ Acceso ilimitado</li>
                  <li>✅ Entrenador personal</li>
                  <li>✅ Asesoría nutricional</li>
                  <li>✅ Clases ilimitadas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
