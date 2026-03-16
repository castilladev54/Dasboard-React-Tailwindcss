import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#020617] border-t border-white/5 pt-16 pb-8 overflow-hidden z-20">
      {/* Background Details for aesthetic glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-end">
        <div className="w-[100vw] h-[50vh] bg-orange-600/5 rounded-[100%] blur-[120px] translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-16">
          {/* Brand Section */}
          <article className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
              <span className="text-3xl">🐾</span> Asistavet
            </h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Cuidando de la salud y el bienestar de tu peludo de manera integral. Porque ellos merecen lo mejor, brindamos atención dedicada las 24 horas.
            </p>
          </article>

          {/* Quick Links */}
          <nav aria-label="Enlaces rápidos" className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-white/90">Navegación</h4>
            <ul className="space-y-2 text-slate-400 font-light">
              <li><a href="#servicios" className="hover:text-orange-400 hover:translate-x-1 inline-block transition-all">Servicios de Salud</a></li>
              <li><a href="#ubicacion" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Nuestra Clínica</a></li>
              <li><Link to="/about" className="hover:text-orange-400 hover:translate-x-1 inline-block transition-all">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Agendar Cita</Link></li>
            </ul>
          </nav>

          {/* Socials & Info */}
          <address className="flex flex-col gap-4 not-italic">
            <h4 className="text-lg font-semibold text-white/90">Conecta con nosotros</h4>

            <div className="flex gap-4 mb-2">
              {/* Instagram */}
              <a href="https://www.instagram.com/asistavetdevzla/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-orange-500/20 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              {/* Github - El jeje del usuario */}
              <a href="https://github.com/castilladev54" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-zinc-700/50 hover:border-zinc-500/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            <div className="text-slate-400 font-light text-sm mt-2 flex flex-col gap-1">
              <a href="mailto:asistavet@gmail.com" className="hover:text-orange-400 transition-colors max-w-max">asistavet@gmail.com</a>
              <a href="https://wa.me/5804241731880" className="hover:text-orange-400 transition-colors max-w-max">+58 (0424) 173 1880</a>
            </div>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-light">
          <p>&copy; {new Date().getFullYear()} Asistavet de Venezuela. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Desarrollado con <span className="text-orange-500 text-lg">♥</span> CastillaWeb de confianza
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
