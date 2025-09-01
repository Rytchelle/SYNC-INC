import React, { useState } from 'react';
import { LandingHeader } from '../../components/layout';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';

const Contato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviado(false);
    if (!nome || !email || !mensagem) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setErro('E-mail inválido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      setNome('');
      setEmail('');
      setMensagem('');
    }, 1200);
  };

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen w-full flex flex-col items-center bg-white py-10 px-4">
        <section className="max-w-xl w-full mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-4 animate-fadeInUp">Fale com a Sync</h1>
          <p className="text-base text-gray-700 mb-6 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            Entre em contato para dúvidas, sugestões, parcerias ou agendar uma demonstração. Nossa equipe terá prazer em responder!
          </p>
        </section>
        <section className="max-w-xl w-full mx-auto bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-8 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all duration-200"
              autoComplete="name"
              disabled={loading}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all duration-200"
              autoComplete="email"
              disabled={loading}
              required
            />
            <textarea
              placeholder="Mensagem"
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all duration-200 min-h-[100px] resize-y"
              disabled={loading}
              required
            />
            {erro && <div className="text-red-600 text-center animate-fadeInDown text-sm">{erro}</div>}
            {enviado && <div className="text-green-600 text-center animate-fadeInUp text-sm">Mensagem enviada com sucesso!</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg shadow transition-colors duration-300 animate-fadeInUp"
              style={{ animationDelay: '300ms' }}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </section>
        <section className="max-w-xl w-full mx-auto text-center animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col gap-4 items-center justify-center">
            <a href="mailto:contato@sync.com" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors" tabIndex={0} aria-label="E-mail">
              <FaEnvelope /> contato@sync.com
            </a>
            <a href="tel:+5511999999999" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors" tabIndex={0} aria-label="Telefone">
              <FaPhone /> (11) 99999-9999
            </a>
            <a href="https://linkedin.com/company/sync" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors" tabIndex={0} aria-label="LinkedIn">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contato; 