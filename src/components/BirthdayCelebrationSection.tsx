import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame } from 'lucide-react';

interface BirthdayCelebrationSectionProps {
  onTriggerConfetti: () => void;
}

export const BirthdayCelebrationSection: React.FC<BirthdayCelebrationSectionProps> = ({
  onTriggerConfetti,
}) => {
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    setWishMade((prev) => !prev);
    onTriggerConfetti();
  };

  return (
    <section
      id="celebration"
      className="relative py-24 sm:py-32 px-6 bg-[#FFF7ED] border-t border-[#8B5947]/10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Coluna esquerda: texto de celebração */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-4">
              Capítulo 01 · A Celebração
            </p>

            <h2
              className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#4A2925] tracking-tight leading-[1.1] mb-5"
              style={{ textWrap: 'balance' }}
            >
              FELIZ ANIVERSÁRIO, KIT KAT!
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-[#D98C98] mb-6">
              Hoje o dia é todo para celebrar você.
            </p>

            <p className="text-base sm:text-lg text-[#8B5947] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Espero que o seu dia seja cheio de risadas, surpresas lindas, das suas coisas
              favoritas e de toda a felicidade que você merece.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleMakeWish}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E9A6AD]/30 hover:bg-[#E9A6AD]/45 text-[#4A2925] border border-[#D98C98]/40 px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947] whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-[#D98C98]" aria-hidden="true" />
                <span>{wishMade ? 'Acender a vela novamente' : 'Fazer um pedido'}</span>
              </button>

              <button
                type="button"
                onClick={onTriggerConfetti}
                className="inline-flex items-center gap-2 rounded-xl bg-transparent hover:bg-[#8B5947]/8 text-[#8B5947] border border-[#8B5947]/25 px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#D6A36A]" aria-hidden="true" />
                <span>Jogar confetes</span>
              </button>
            </div>
          </div>

          {/* Coluna direita: Polaroid com panquecas e vela de aniversário */}
          <div className="lg:col-span-5 flex justify-center">
            <figure className="relative w-full max-w-sm bg-[#FFFBF4] p-4 pb-8 rounded-xl border border-[#8B5947]/15 polaroid-shadow rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
              <div
                className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm rotate-[-2deg] border border-[#8B5947]/10"
                aria-hidden="true"
              />

              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F7ECDF]">
                <img
                  src="/src/assets/images/birthday_pancake_candle_1794875888755.jpg"
                  alt="Uma pilha aconchegante de panquecas douradas com morangos e uma vela rosa de aniversário acesa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {wishMade && (
                  <div
                    className="absolute inset-0 bg-[#FFF7ED]/20 backdrop-blur-[0.5px] flex items-end justify-center p-4 transition-opacity duration-300"
                    aria-live="polite"
                  >
                    <p className="bg-[#FFFBF4]/92 text-[#4A2925] font-hand text-xl px-4 py-1.5 rounded-lg border border-[#D6A36A]/35 shadow-sm">
                      pedido enviado às estrelas ✨
                    </p>
                  </div>
                )}
              </div>

              <figcaption className="mt-4 text-center font-hand text-xl text-[#8B5947]">
                {wishMade
                  ? 'que todos os seus desejos se realizem'
                  : 'faça um pedido, Kit Kat'}
              </figcaption>
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
