import React, { useState } from "react";

interface Slide {
  src: string;
  alt: string;
  text: string;
  isVideo?: boolean;
}

const slides: Slide[] = [
  { src: "/Img/download (2).jpg", alt: "Imagem 1", text: "Texto para Imagem 1" },
  { src: "/Img/carrossel1.jpg", alt: "Imagem 2", text: "Texto para Imagem 2" },
  { src: "/Img/Design sem nome.mp4", alt: "Imagem 3", text: "Texto para Imagem 3", isVideo: true },
];

const Carrosel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <section className="py-24 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-2">
          NOSSOS SERVIÇOS
        </h2>
        <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
          Soluções Abrangentes para o seu Sucesso empresarial!
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto h-96 overflow-hidden rounded-3xl">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
              index === current ? "translate-x-0 z-20" : "translate-x-full z-0"
            }`}
          >
            {slide.isVideo ? (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-6 left-6 bg-black/50 text-white px-4 py-2 rounded-2xl">
              {slide.text}
            </div>
          </div>
        ))}

        {/* Botões de navegação */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Carrosel;
