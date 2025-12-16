import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Contactanos() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      {/* Contenedor central */}
      <div className="relative z-10 bg-yellow-400 bg-opacity-90 text-black rounded-lg p-10 max-w-3xl w-full mx-4 text-center shadow-lg animate-fade-in-up">
        <h2 className="text-4xl font-extrabold mb-6 uppercase">
          ¡Ponte en contacto hoy!
        </h2>

        {/* Info de contacto */}
        <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
          <div>
            <h3 className="font-bold italic text-lg mb-1">Dirección</h3>
            <p>Av. Fortaleza, Edificio Hercules, Local 5-12</p>
          </div>
          <div>
            <h3 className="font-bold italic text-lg mb-1">Correo</h3>
            <p>info@gymastreus.com</p>
          </div>
          <div>
            <h3 className="font-bold italic text-lg mb-1">Teléfono</h3>
            <p>+58 212 3336669</p>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center gap-6 text-2xl text-black">
          <a
            href="https://facebook.com/gymastreus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-transform hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com/gymastreus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/gymastreus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-transform hover:scale-110"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/584241234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
}
