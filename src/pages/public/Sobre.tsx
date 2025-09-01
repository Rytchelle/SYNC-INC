import React from 'react';
import { LandingHeader } from '../../components/layout';
import { FaLinkedin, FaArrowRight, FaRegCalendarAlt } from 'react-icons/fa';

const team = [
  {
    name: 'Karine Costa',
    role: 'Scrum Master & Banco De Dados',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399755183680126996/8e55d784-1919-4d73-be9c-fc5d04052881.png?ex=688a2719&is=6888d599&hm=50aae1997bc22cf489ebf95ac73c9dc13f4ecdaa3c0f599a2c03397b6fe13282&=&format=webp&quality=lossless&width=655&height=873',
    desc: 'Apaixonada por inovação e indústria 4.0.',
    linkedin: 'https://linkedin.com/in/ana-martins-sync'
  },
  {
    name: 'Gustavo Scarabelli',
    role: 'TechLead & Banco De Dados',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399754889738977290/55adb709-ae6c-4733-bb01-d4d1659eed91.png?ex=688a26d3&is=6888d553&hm=496acf42bfdd6bc20c0840a4bbf7bc4178ff68a967d09c3e06eaea0081c635a8&=&format=webp&quality=lossless&width=491&height=873',
    desc: 'Transformando tecnologia em soluções reais.',
    linkedin: 'https://linkedin.com/in/lucas-almeida-sync'
  },
  {
    name: 'Arthur Sena',
    role: 'TechLead & Backend',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399755402135998546/6bc910f9-7dee-49af-b61d-78c50194c956.png?ex=688a274e&is=6888d5ce&hm=2a8b106a790f3369e5e7922bf611bee89ec4ab1df217afa8a2087d05772ce4b0&=&format=webp&quality=lossless&width=655&height=873',
    desc: 'Foco total na experiência do usuário.',
    linkedin: 'https://linkedin.com/in/marina-souza-sync'
  },
  {
    name: 'Rafael Cremasco',
    role: 'Backend ',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399755424479318208/b8be11d8-d7e5-4ede-ada9-5f766b2ae03d.png?ex=688a2753&is=6888d5d3&hm=8a9af67ba9cd749e7106f8378c225e0f89cbeb89615993d95fe85a813f96afa3&=&format=webp&quality=lossless&width=655&height=873',
    desc: 'Código limpo, produto robusto.',
    linkedin: 'https://linkedin.com/in/carlos-pereira-sync'
  },
  {
    name: 'Júlio César',
    role: 'UX/UI Designer & Frontend',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399755201035894794/90d98cb0-fad4-4d4b-8a3b-8b67658051e2.png?ex=688a271e&is=6888d59e&hm=76d4d3ee76d76fb8daac150bd75153fc7075ab94b181c47c9801d4d060402c95&=&format=webp&quality=lossless&width=655&height=873',
    desc: 'Design que conecta pessoas e tecnologia.',
    linkedin: 'https://linkedin.com/in/fernanda-dias-sync'
  },
  {
    name: 'Kauã Rytchelle',
    role: 'Project Owner & Frontend',
    avatar: 'https://media.discordapp.net/attachments/1116395396130938991/1399755446025191574/aee9111c-331c-4470-bb64-676ab529131b.png?ex=688a2758&is=6888d5d8&hm=0d80c9aa84917f2e082b829481ee4f87334e5fa7dbbe04b67c8cfd1417a74647&=&format=webp&quality=lossless&width=266&height=350',
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
      <main className="min-h-screen w-full flex flex-col items-center bg-white py-10 px-4">
        <section className="w-full flex justify-center mb-10">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Ambiente industrial moderno" className="rounded-2xl shadow max-h-64 w-full object-cover object-center" style={{maxWidth: 900}} />
        </section>
        <section className="max-w-3xl w-full mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-4 animate-fadeInUp">Sobre o Sync</h1>
          <p className="text-base text-gray-700 mb-6 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            O Sync é um sistema supervisório (SCADA) de última geração, projetado para empresas que buscam excelência operacional, rastreabilidade e tomada de decisão baseada em dados. Integrando tecnologias de IIoT, automação industrial, analytics e dashboards em tempo real, o Sync permite o monitoramento centralizado de processos, controle de ativos, gestão de alarmes, coleta e historização de dados, além de relatórios inteligentes para manutenção preditiva e eficiência energética.<br/><br/>
            Nossa plataforma é escalável, segura e flexível, suportando protocolos industriais (Modbus, OPC, MQTT), integração com ERPs e dispositivos IoT, além de arquitetura cloud e edge computing. O Sync se adapta a diferentes segmentos industriais, promovendo interoperabilidade, redução de custos, sustentabilidade e inovação contínua.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 mb-8">
            <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <span className="font-bold">ODS 9</span> Inovação e infraestrutura
            </span>
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded-full text-sm font-medium border border-green-200 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <span className="font-bold">ODS 12</span> Produção e consumo responsáveis
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 animate-fadeInUp" style={{ animationDelay: '350ms' }}>
              <h3 className="font-bold text-[var(--primary)] mb-2">Missão</h3>
              <p className="text-sm text-gray-700">Transformar a gestão industrial por meio de tecnologia acessível, conectando pessoas, máquinas e dados para uma produção mais eficiente e sustentável.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <h3 className="font-bold text-[var(--primary)] mb-2">Visão</h3>
              <p className="text-sm text-gray-700">Ser referência nacional em sistemas supervisórios, promovendo inovação, transparência e responsabilidade ambiental no setor industrial.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 animate-fadeInUp" style={{ animationDelay: '450ms' }}>
              <h3 className="font-bold text-[var(--primary)] mb-2">Valores</h3>
              <p className="text-sm text-gray-700">Inovação, ética, colaboração, sustentabilidade, excelência técnica e foco no cliente.</p>
            </div>
          </div>
        </section>
        <section className="max-w-2xl w-full mx-auto mb-12">
          <h2 className="text-lg font-semibold text-[var(--primary)] mb-4 text-center animate-fadeInUp">Nossa História</h2>
          <ol className="relative border-l-2 border-[var(--primary)] ml-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            {timeline.map((item, idx) => (
              <li key={idx} className="mb-6 ml-4 flex items-start group">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-sm border-2 border-white -ml-8 group-hover:scale-110 transition-transform duration-200">
                  <FaRegCalendarAlt className="text-base" aria-label="Ano" />
                </span>
                <div className="ml-4">
                  <span className="text-xs text-gray-400">{item.year}</span>
                  <p className="text-sm text-gray-700 font-medium leading-tight">{item.event}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="max-w-2xl w-full mx-auto mb-12">
          <div className="bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] rounded-xl p-6 flex flex-col items-start animate-fadeInUp" style={{ animationDelay: '600ms' }}>
            <p className="text-base text-gray-700 italic mb-2">“Acreditamos que a tecnologia deve ser uma ponte para um futuro mais eficiente, humano e sustentável. O Sync nasceu desse propósito: simplificar o complexo e empoderar pessoas.”</p>
            <span className="font-bold text-[var(--primary)]">Karine Costa, CEO & Fundadora</span>
          </div>
        </section>
        <section className="max-w-4xl w-full mx-auto">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-6 text-center animate-fadeInUp">Nosso Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center animate-fadeInUp group transition-all duration-200 hover:shadow-lg hover:border-[var(--primary)] hover:-translate-y-1"
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                <img src={m.avatar} alt={`Foto de ${m.name}`} className="w-16 h-16 rounded-full mb-3 border border-gray-200 object-cover group-hover:border-[var(--primary)] transition-colors duration-200" />
                <h3 className="text-base font-bold text-[var(--primary)] mb-1 text-center group-hover:text-[var(--primary-dark)] transition-colors duration-200">{m.name}</h3>
                <span className="text-xs text-gray-500 mb-1">{m.role}</span>
                <p className="text-xs text-gray-600 text-center italic mb-2">“{m.desc}”</p>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${m.name}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors text-lg mt-1" tabIndex={0}>
                  <FaLinkedin />
                </a>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full flex flex-col items-center py-10">
          <a href="/diferenciais" className="btn-primary px-8 py-3 text-base font-bold rounded-xl shadow hover-lift animate-fadeInUp" style={{ animationDelay: '700ms' }}>
            Veja nossos recursos <FaArrowRight className="inline ml-2" />
          </a>
        </section>
      </main>
    </>
  );
};

export default Sobre; 