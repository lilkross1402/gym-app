import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const rutasSinBotones = ['/registro', '/login', '/modificar', '/dashboard', '/clases'];
  const soloLogo = rutasSinBotones.includes(location.pathname);

  const items = [
    { label: 'LOGIN', path: '/login' },
    { label: 'QUIENES SOMOS', path: '/quienes-somos' },
    { label: 'PLANES', path: '/planes' },
    { label: 'TESTIMONIOS', path: '/testimonios' }, // ✅ Ruta corregida
    { label: 'CONTÁCTANOS', path: '/contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-60 text-white flex justify-between items-center px-6 py-4 z-50">
      <div className="flex items-center gap-2 font-bold text-lg">
        {soloLogo ? (
          <>
            <img src="/logo192.png" alt="Logo" className="h-8" />
            <span>GIMNASIO ASTREUS</span>
          </>
        ) : (
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo192.png" alt="Logo" className="h-8" />
            <span>GIMNASIO ASTREUS</span>
          </Link>
        )}
      </div>

      {!soloLogo && (
        <div className="flex gap-4">
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 font-semibold rounded"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
