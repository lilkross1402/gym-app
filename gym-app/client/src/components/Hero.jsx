import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-6xl font-extrabold italic mb-6">SÉ TU MEJOR VERSIÓN</h1>
        <button
          onClick={() => navigate('/registro')}
          className="px-6 py-3 bg-yellow-400 font-bold text-black hover:bg-yellow-300 transition rounded animate-pulse"
        >
          ÚNETE HOY
        </button>
      </div>
    </section>
  );
}
