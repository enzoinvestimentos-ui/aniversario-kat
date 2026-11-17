import React from 'react';
import { motion } from 'motion/react';

export const SmallMessageSection: React.FC = () => {
  return (
    <section
      id="message"
      className="py-24 sm:py-32 px-6 bg-[#FFF7ED] border-t border-[#8B5947]/10"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="paper-texture relative rounded-2xl border border-[#8B5947]/15 px-7 py-12 sm:px-14 sm:py-16 polaroid-shadow text-center"
        >
          <div className="flex justify-center mb-6" aria-hidden="true">
            <motion.svg
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-7 h-7 text-[#D98C98]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </div>

          <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-4">
            Capítulo 03 · Uma Mensagem Minha
          </p>

          <h2
            className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A2925] tracking-tight leading-snug mb-6"
            style={{ textWrap: 'balance' }}
          >
            Tem uma coisa que eu queria que você soubesse...
          </h2>

          <p className="text-base sm:text-lg text-[#8B5947] leading-relaxed max-w-xl mx-auto mb-8">
            Algumas amizades surgem dos lugares mais inesperados e, de algum jeito, acabam se
            tornando algumas das partes mais significativas das nossas vidas.
          </p>

          <div className="h-[1px] w-20 bg-[#D6A36A]/45 mx-auto mb-8" aria-hidden="true" />

          <p
            className="font-serif italic text-2xl sm:text-3xl text-[#4A2925] leading-snug mb-4"
            style={{ textWrap: 'balance' }}
          >
            Fico muito feliz que os nossos caminhos tenham se cruzado.
          </p>

          <p className="font-hand text-xl text-[#D98C98]">
            continue rolando, ainda tem um pedacinho do meu coração logo abaixo
          </p>
        </motion.div>
      </div>
    </section>
  );
};
