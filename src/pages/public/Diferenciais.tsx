import React from 'react';
import { LandingHeader } from '../../components/layout';
import { FaChartLine, FaCogs, FaShieldAlt, FaUsers, FaRocket, FaCheckCircle } from 'react-icons/fa';

const features = [
  {
    icon: <FaChartLine className="w-8 h-8" />, title: 'Monitoramento em Tempo Real', desc: 'Acompanhe todos os indicadores da sua produção em tempo real, de qualquer lugar.'
  },
  {
    icon: <FaCogs className="w-8 h-8" />, title: 'Automação Inteligente', desc: 'Automatize processos complexos com IA e machine learning para máxima eficiência.'
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />, title: 'Segurança Industrial', desc: 'Proteção completa dos seus dados e equipamentos com criptografia de ponta.'
  },
  {
    icon: <FaUsers className="w-8 h-8" />, title: 'Gestão de Equipes', desc: 'Gerencie equipes, permissões e responsabilidades de forma centralizada.'
  },
  {
    icon: <FaRocket className="w-8 h-8" />, title: 'Implementação Rápida', desc: 'Comece a usar em minutos, sem necessidade de infraestrutura complexa.'
  },
  {
    icon: <FaCheckCircle className="w-8 h-8" />, title: 'Resultados Comprovados', desc: 'Mais de 500 empresas já aumentaram sua produtividade em média 40%.'
  },
];

const Diferenciais: React.FC = () => {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen w-full flex flex-col items-center bg-white py-10 px-4">
        <section className="max-w-7xl w-full mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6 animate-fadeInUp">Por que escolher a <span className="text-[var(--primary)]">Sync</span>?</h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            Nossa plataforma oferece tudo que você precisa para modernizar sua operação industrial
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-gradient-to-br from-white to-[var(--accent)] rounded-2xl border border-gray-100 hover:border-[var(--primary)/20] hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-4">{f.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Diferenciais; 