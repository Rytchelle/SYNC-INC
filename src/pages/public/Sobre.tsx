import React from 'react';
import LandingHeader from '../../components/layout/LandingHeader';
import { FaArrowRight, FaLinkedin, FaRegCalendarAlt } from 'react-icons/fa';

const team = [
  {
    name: 'Karine Costa',
    role: 'Scrum Master & Banco De Dados',
    avatar: 'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 08.23.49_1e7c5b33.jpg',
    desc: 'Apaixonada por inovação e indústria 4.0.',
    linkedin: 'https://linkedin.com/in/ana-martins-sync'
  },
  {
    name: 'Gustavo Scarabelli',
    role: 'TechLead & Banco De Dados',
    avatar: 'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 08.23.48_c9fc3fa5.jpg',
    desc: 'Transformando tecnologia em soluções reais.',
    linkedin: 'https://linkedin.com/in/lucas-almeida-sync'
  },
  
  {
    name: 'Arthur Sena',
    role: 'TechLead & Backend',
    avatar: 'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 08.23.49_b4ee71a6.jpg',
    desc: 'Foco total na experiência do usuário.',
    linkedin: 'https://linkedin.com/in/marina-souza-sync'
  },

  {
    name: 'Rafael Cremasco',
    role: 'Backend ',
    avatar:'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 08.23.48_beef8bd6.jpg',
    desc: 'Código limpo, produto robusto.',
    linkedin: 'https://linkedin.com/in/carlos-pereira-sync'
  },
  
  {
    name: 'Júlio César',
    role: 'UX/UI Designer & Frontend',
    avatar: 'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 08.23.49_c7f723f0.jpg',
    desc: 'Design que conecta pessoas e tecnologia.',
    linkedin: 'https://linkedin.com/in/fernanda-dias-sync'
  },

  {
    name: 'Kauã Rytchelle',
    role: 'Project Owner & Frontend',
    avatar: 'src/assets/images/Imagem do WhatsApp de 2025-09-08 à(s) 09.11.45_1ae6dee6.jpg',
    desc: 'Dados são o novo petróleo.',
    linkedin: 'https://linkedin.com/in/pedro-santos-sync'
  },

];

const timeline = [
  { year: '2021', event: 'Fundação do projeto Sync' },
  { year: '2022', event: 'Primeiro piloto em indústria de médio porte' },
  { year: '2022', event: 'Lançamento do dashboard em tempo real' },
  { year: '2023', event: 'Integração com ERPs e IoT' },
  { year: '2023', event: 'Reconhecimento em prêmio de inovação industrial' },
  { year: '2024', event: 'Expansão para novos segmentos e ODS' },
];

const Sobre: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Sobre o Sync | Sistema Supervisório';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Conheça o Sync, sistema supervisório (SCADA) inovador para gestão industrial, alinhado às ODS 9 e 12. Veja missão, visão, valores e equipe.');
  }, []);

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen w-full flex flex-col items-center py-0 px-0">
        {/* Imagem de topo full width */}
        <section className="w-full mb-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="Ambiente industrial moderno"
            className="w-full h-[320px] md:h-[420px] object-cover object-center shadow-lg"
            style={{ maxWidth: '100vw' }}
          />
        </section>
        {/* Bloco principal centralizado */}
        <section className="max-w-4xl w-full mx-auto text-center -mt-20 mb-12 px-4">
          <div className="bg-transparent backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-8">
            <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-6 animate-fadeInUp">Sobre o Sync</h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              O Sync é um sistema supervisório (SCADA) de última geração, projetado para empresas que buscam excelência operacional, rastreabilidade e tomada de decisão baseada em dados. Integrando tecnologias de IIoT, automação industrial, analytics e dashboards em tempo real, o Sync permite o monitoramento centralizado de processos, controle de ativos, gestão de alarmes, coleta e historização de dados, além de relatórios inteligentes para manutenção preditiva e eficiência energética.<br/><br/>
              Nossa plataforma é escalável, segura e flexível, suportando protocolos industriais (Modbus, OPC, MQTT), integração com ERPs e dispositivos IoT, além de arquitetura cloud e edge computing. O Sync se adapta a diferentes segmentos industriais, promovendo interoperabilidade, redução de custos, sustentabilidade e inovação contínua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 mb-8">
              <span className="inline-flex items-center gap-2 bg-yellow-200/80 text-yellow-900 px-6 py-2 rounded-full text-base font-semibold border border-yellow-300 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <span className="font-bold">ODS 9</span> Inovação e infraestrutura
              </span>
              <span className="inline-flex items-center gap-2 bg-green-200/80 text-green-900 px-6 py-2 rounded-full text-base font-semibold border border-green-300 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <span className="font-bold">ODS 12</span> Produção e consumo responsáveis
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow animate-fadeInUp" style={{ animationDelay: '350ms' }}>
                <h3 className="font-bold text-[var(--primary)] mb-2 text-lg">Missão</h3>
                <p className="text-base text-gray-700">Transformar a gestão industrial por meio de tecnologia acessível, conectando pessoas, máquinas e dados para uma produção mais eficiente e sustentável.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <h3 className="font-bold text-[var(--primary)] mb-2 text-lg">Visão</h3>
                <p className="text-base text-gray-700">Ser referência nacional em sistemas supervisórios, promovendo inovação, transparência e responsabilidade ambiental no setor industrial.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow animate-fadeInUp" style={{ animationDelay: '450ms' }}>
                <h3 className="font-bold text-[var(--primary)] mb-2 text-lg">Valores</h3>
                <p className="text-base text-gray-700">Inovação, ética, colaboração, sustentabilidade, excelência técnica e foco no cliente.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Timeline */}
        <section className="max-w-3xl w-full mx-auto mb-12 px-4">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center animate-fadeInUp">Nossa História</h2>
          <ol className="relative border-l-4 border-[var(--primary)] ml-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            {timeline.map((item, idx) => (
              <li key={idx} className="mb-8 ml-4 flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg border-2 border-white -ml-8 group-hover:scale-110 transition-transform duration-200">
                  <FaRegCalendarAlt className="text-xl" aria-label="Ano" />
                </span>
                <div className="ml-6">
                  <span className="text-sm text-gray-400">{item.year}</span>
                  <p className="text-base text-gray-700 font-semibold leading-tight">{item.event}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        {/* Frase de impacto */}
        <section className="max-w-2xl w-full mx-auto mb-12 px-4">
          <div className="bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] rounded-2xl p-8 flex flex-col items-start animate-fadeInUp shadow" style={{ animationDelay: '600ms' }}>
            <p className="text-lg text-gray-700 italic mb-2">“Acreditamos que a tecnologia deve ser uma ponte para um futuro mais eficiente, humano e sustentável. O Sync nasceu desse propósito: simplificar o complexo e empoderar pessoas.”</p>
            <span className="font-bold text-[var(--primary)] text-base">Karine Costa, CEO & Fundadora</span>
          </div>
        </section>
        {/* Time */}
        <section className="max-w-6xl w-full mx-auto px-4">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8 text-center animate-fadeInUp">Nosso Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 flex flex-col items-center animate-fadeInUp group transition-all duration-200 hover:shadow-2xl hover:border-[var(--primary)] hover:-translate-y-2"
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                <img src={m.avatar} alt={`Foto de ${m.name}`} className="w-20 h-20 rounded-full mb-4 border-2 border-gray-200 object-cover group-hover:border-[var(--primary)] transition-colors duration-200 shadow" />
                <h3 className="text-lg font-bold text-[var(--primary)] mb-1 text-center group-hover:text-[var(--primary-dark)] transition-colors duration-200">{m.name}</h3>
                <span className="text-sm text-gray-500 mb-2">{m.role}</span>
                <p className="text-sm text-gray-600 text-center italic mb-3">“{m.desc}”</p>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${m.name}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors text-xl mt-1" tabIndex={0}>
                  <FaLinkedin />
                </a>
              </div>
            ))}
          </div>
        </section>
        {/* Botão de recursos */}
        <section className="w-full flex flex-col items-center py-12">
          <a href="/diferenciais" className="btn-primary px-10 py-4 text-lg font-bold rounded-2xl shadow-lg hover-lift animate-fadeInUp" style={{ animationDelay: '700ms' }}>
            Veja nossos recursos <FaArrowRight className="inline ml-2" />
          </a>
        </section>
      </main>
    </>
  );
};

export default Sobre;