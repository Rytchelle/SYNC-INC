import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[var(--primary)] tracking-tight">Sync</h1>
          </div>


          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/diferenciais" 
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
              style={{ fontWeight: 600 }}
            >
              Recursos
            </Link>
            <Link 
              to="/sobre" 
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
              style={{ fontWeight: 600 }}
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
              style={{ fontWeight: 600 }}
            >
              Contato
            </Link>
          </nav>


          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200"
            >
              Entrar
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Começar Agora
            </Link>
          </div>


          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[var(--primary)] transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>


        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/diferenciais" 
                className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
                style={{ fontWeight: 600 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Recursos
              </Link>
              <Link 
                to="#precos" 
                className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </Link>
              <Link 
                to="/sobre" 
                className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
                style={{ fontWeight: 600 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/contato" 
                className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--primary)] pb-1"
                style={{ fontWeight: 600 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/login"
                  className="block w-full text-center bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Começar Agora
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader; 