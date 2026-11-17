import React from 'react';
import { motion } from 'motion/react';
import { FloatingMotifs } from './FloatingMotifs';

interface HeroSurpriseSectionProps {
  isOpened: boolean;
  onOpenSurprise: () => void;
}

export const HeroSurpriseSection: React.FC<HeroSurpriseSectionProps> = ({
  isOpened,
  onOpenSurprise,
}) => {
  return (
    <section
      id="surprise"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden bg-[#FFF7ED]"
    >
      <FloatingMotifs variant="hero" />

      {/* Brilho radial suave atrás do cartão principal */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] h-[min(90vw,640px)] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle, rgba(233,166,173,0.18) 0%, rgba(214,163,106,0.10) 48%, rgba(255,247,237,0) 74%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <div className="paper-texture relative rounded-2xl border border-[#8B5947]/15 px-7 py-12 sm:px-14 sm:py-16 polaroid-shadow">
          {/* Fita adesiva decorativa no topo */}
          <div
            className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-sm rotate-[-1.5deg] border border-[#8B5947]/10"
            aria-hidden="true"
          />

          <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-5">
            Um Pequeno Mundo · Feito Só Para Você
          </p>

          {/* Detalhe sutil de tablete de chocolate */}
          <div className="flex items-center justify-center gap-2.5 mb-6" aria-hidden="true">
            <span className="h-[1px] w-10 bg-[#8B5947]/25" />
            <svg className="w-6 h-4 text-[#4A2925]" viewBox="0 0 36 20" fill="none">
              <rect x="1" y="3" width="14" height="14" rx="2" fill="currentColor" />
              <rect x="20" y="2" width="14" height="14" rx="2" transform="rotate(6 20 2)" fill="#8B5947" />
            </svg>
            <span className="h-[1px] w-10 bg-[#8B5947]/25" />
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#4A2925] tracking-tight leading-[1.12] mb-5"
            style={{ textWrap: 'balance' }}
          >
            Oi, Kit Kat! <span className="inline-block" aria-label="coração">❤️</span>
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#8B5947] leading-relaxed mb-3">
            Eu preparei uma coisinha especial para você...
          </p>

          <p className="text-sm sm:text-base text-[#8B5947]/90 max-w-md mx-auto leading-relaxed mb-9">
            Porque alguém tão especial quanto você merece uma pequena celebração.
          </p>

          <div className="flex flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={onOpenSurprise}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#4A2925] text-[#FFF7ED] px-8 py-4 text-base font-medium shadow-md hover:bg-[#5E3631] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D98C98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFBF4] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{isOpened ? 'Continuar sua surpresa ✨' : 'Abrir sua surpresa ✨'}</span>
            </motion.button>

            <span className="font-hand text-lg text-[#8B5947]/80">
              {isOpened ? 'role para baixo quando quiser' : 'toque para abrir'}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
