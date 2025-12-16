import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModificarDatos from './pages/ModificarDatos';
import QuienesSomos from './pages/QuienesSomos';
import Planes from './pages/Planes';
import ClasesInscritas from './pages/ClasesInscritas';
import Horarios from './pages/Horarios'; // ✅ Importación añadida
import Testimonios from './pages/Testimonios'; // ✅ Importación añadida
import Contactanos from "./pages/Contactanos";

function AppContent() {
  const location = useLocation();

  // ✅ Rutas que no deben mostrar el Navbar
  const rutasSinNavbar = ['/registro', '/login', '/modificar', '/clases-inscritas', '/horarios'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!rutasSinNavbar.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modificar" element={<ModificarDatos />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/clases-inscritas" element={<ClasesInscritas />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/testimonios" element={<Testimonios />} /> 
        <Route path="/contacto" element={<Contactanos />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
