import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { FloatingMotifs } from './FloatingMotifs';

interface ClosingSectionProps {
  onBackToTop: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onBackToTop }) => {
  return (
    <footer
      id="closing"
      className="relative py-28 sm:py-36 px-6 bg-[#FFF7ED] border-t border-[#8B5947]/10 overflow-hidden"
    >
      <FloatingMotifs variant="closing" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-4">
            Capítulo 05 · Só Mais Uma Coisa...
          </p>

          <h2
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A2925] tracking-tight leading-tight mb-8"
            style={{ textWrap: 'balance' }}
          >
            Um brinde a mais um capítulo lindo.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-[#8B5947] leading-relaxed mb-10">
            <p>
              Espero que a vida te surpreenda das melhores formas possíveis. Espero que você
              continue encontrando motivos para sorrir, músicas para cantar, lugares para descobrir
              e pequenos momentos que se transformam em lembranças lindas.
            </p>
            <p>
              Nunca se esqueça do quanto você é especial e do quanto merece todas as coisas boas
              que a vida tem a oferecer.
            </p>
          </div>

          <div className="h-[1px] w-20 bg-[#E9A6AD]/60 mx-auto mb-8" aria-hidden="true" />

          <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A2925] mb-2">
            Feliz aniversário, Kit Kat! <span aria-label="coração">❤️</span>
          </p>

          <p className="font-hand text-2xl text-[#D98C98] mb-12">
            Feito especialmente para você.
          </p>

          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 rounded-xl border border-[#8B5947]/25 bg-[#FFFBF4] hover:bg-[#F7ECDF] text-[#4A2925] px-6 py-3 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5947] shadow-sm whitespace-nowrap"
          >
            <ArrowUp className="w-4 h-4 text-[#8B5947]" aria-hidden="true" />
            <span>Voltar ao começo</span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
};
