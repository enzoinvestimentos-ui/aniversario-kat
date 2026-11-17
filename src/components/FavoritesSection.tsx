import React, { useState } from 'react';
import { motion } from 'motion/react';

interface FavoriteCardData {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  handwrittenNote: string;
  imageSrc: string;
  imageAlt: string;
  theme: 'chocolate' | 'pancakes' | 'music';
}

const FAVORITE_CARDS: FavoriteCardData[] = [
  {
    id: 'kitkat',
    number: '01',
    label: 'Kit Kat',
    title: 'Um pouco de doçura',
    description:
      'Algumas pessoas simplesmente deixam a vida um pouco mais doce. Você com certeza é uma delas.',
    handwrittenNote: 'Sempre vale a pena dividir o melhor pedaço com você.',
    imageSrc: '/src/assets/images/card_kitkat_chocolate_1794875889041.jpg',
    imageAlt: 'Tabletes de wafer cobertos com chocolate ao lado de botões de rosa secos sobre papel artesanal creme',
    theme: 'chocolate',
  },
  {
    id: 'pancakes',
    number: '02',
    label: 'Panquecas',
    title: 'Felicidade em forma de panqueca',
    description:
      'Porque todo dia bom merece uma pilha de panquecas, algo docinho e absolutamente nenhuma pressa.',
    handwrittenNote: 'Manhãs tranquilas, calda quentinha e zero despertador.',
    imageSrc: '/src/assets/images/card_pancake_breakfast_1794875889293.jpg',
    imageAlt: 'Mesa ensolarada de café da manhã com panquecas fofinhas, morangos frescos e calda dourada',
    theme: 'pancakes',
  },
  {
    id: 'music',
    number: '03',
    label: 'Música ao Vivo',
    title: 'Uma vida cheia de música',
    description:
      'Que o seu próximo capítulo seja repleto de shows inesquecíveis, das suas músicas favoritas, memórias incríveis e momentos que fazem você se sentir viva.',
    handwrittenNote: 'Energia de primeira fila para cada música que você ama.',
    imageSrc: '/src/assets/images/card_live_music_tickets_1794875890734.jpg',
    imageAlt: 'Ingressos antigos de show ao lado de uma palheta dourada sob luzes suaves de palco',
    theme: 'music',
  },
];

export const FavoritesSection: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="favorites"
      className="py-24 sm:py-32 px-6 bg-[#F7ECDF]/55 border-t border-[#8B5947]/10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-3">
            Capítulo 02 · Coisas Que Você Ama
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A2925] tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            Um pouquinho de você
          </h2>
          <p className="text-sm sm:text-base text-[#8B5947]">
            Três pequenas lembranças dos momentos que têm tudo a ver com você. Toque em qualquer
            cartão para abrir um bilhetinho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {FAVORITE_CARDS.map((card, index) => {
            const isRevealed = Boolean(revealedIds[card.id]);

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col bg-[#FFFBF4] rounded-2xl border border-[#8B5947]/15 polaroid-shadow overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                {card.theme === 'chocolate' && (
                  <div className="h-2 w-full bg-[#4A2925] flex" aria-hidden="true">
                    <span className="flex-1 border-r border-[#FFFBF4]/25" />
                    <span className="flex-1 border-r border-[#FFFBF4]/25" />
                    <span className="flex-1 border-r border-[#FFFBF4]/25" />
                    <span className="flex-1 bg-[#E9A6AD]" />
                  </div>
                )}
                {card.theme === 'pancakes' && (
                  <div
                    className="h-2 w-full bg-gradient-to-r from-[#D6A36A] via-[#E5BC8B] to-[#E9A6AD]"
                    aria-hidden="true"
                  />
                )}
                {card.theme === 'music' && (
                  <div
                    className="h-2 w-full wafer-stripe bg-[#4A2925]/15 border-b border-dashed border-[#8B5947]/30"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => toggleNote(card.id)}
                  aria-expanded={isRevealed}
                  className="flex flex-col flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B5947] cursor-pointer"
                >
                  <div className="p-4 pb-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F7ECDF]">
                      <img
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs tracking-[0.14em] uppercase text-[#8B5947] mb-2">
                      {card.number} · {card.label}
                    </p>

                    <h3 className="font-serif text-xl font-semibold text-[#4A2925] mb-3">
                      {card.title}
                    </h3>

                    <p className="text-sm text-[#8B5947] leading-relaxed flex-1">
                      {card.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-dashed border-[#8B5947]/25">
                      {isRevealed ? (
                        <p className="font-hand text-lg text-[#4A2925] leading-snug">
                          “{card.handwrittenNote}”
                        </p>
                      ) : (
                        <span className="text-xs font-medium text-[#D98C98] group-hover:text-[#4A2925] transition-colors">
                          {card.theme === 'music'
                            ? 'Ingresso único · Toque para ler uma nota'
                            : 'Toque no cartão para ver um bilhetinho'}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
