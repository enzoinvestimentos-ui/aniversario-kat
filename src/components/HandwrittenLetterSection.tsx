import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Expand, ImagePlus, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { HANDWRITTEN_LETTER_IMAGE_SRC } from '../config/letterConfig';

export const HandwrittenLetterSection: React.FC = () => {
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeSrc = previewSrc || HANDWRITTEN_LETTER_IMAGE_SRC;
  const hasPhoto = Boolean(activeSrc) && !imageLoadError;

  useEffect(() => {
    return () => {
      if (previewSrc && previewSrc.startsWith('blob:')) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
        setZoomed(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewSrc && previewSrc.startsWith('blob:')) {
      URL.revokeObjectURL(previewSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setImageLoadError(false);
    setPreviewSrc(objectUrl);
  };

  const clearPreview = () => {
    if (previewSrc && previewSrc.startsWith('blob:')) {
      URL.revokeObjectURL(previewSrc);
    }
    setPreviewSrc('');
    setImageLoadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section
      id="letter"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-[#F7ECDF]/70 border-t border-[#8B5947]/10"
    >
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho acima da fotografia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-xs tracking-[0.18em] uppercase text-[#8B5947] mb-3">
            Capítulo 04 · Para Você Ler Com Carinho
          </p>
          <h2
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A2925] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Eu escrevi algo para você...
          </h2>
        </motion.div>

        {/* Apresentação em estilo Polaroid / Carta impressa */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <figure className="paper-texture relative w-full max-w-2xl rounded-xl border border-[#8B5947]/18 p-4 sm:p-6 pb-8 sm:pb-10 polaroid-shadow">
            {/* Fitas adesivas decorativas nos cantos superiores */}
            <div
              className="washi-tape absolute -top-2.5 left-8 w-16 h-5 rounded-sm -rotate-6 border border-[#8B5947]/10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="washi-tape absolute -top-2.5 right-8 w-16 h-5 rounded-sm rotate-6 border border-[#8B5947]/10 pointer-events-none"
              aria-hidden="true"
            />

            {hasPhoto ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Abrir carta de aniversário escrita à mão em tamanho ampliado"
                  className="group relative block w-full rounded-lg overflow-hidden bg-[#F7ECDF]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2925] cursor-zoom-in"
                >
                  <img
                    src={activeSrc}
                    alt="Carta de aniversário escrita à mão para a Kit Kat"
                    referrerPolicy="no-referrer"
                    onError={() => setImageLoadError(true)}
                    className="block w-full h-auto max-h-[82vh] object-contain mx-auto"
                  />

                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[#4A2925]/85 text-[#FFF7ED] px-3 py-1.5 text-xs font-medium opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                    <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Toque para ampliar</span>
                  </span>
                </button>

                {previewSrc && !HANDWRITTEN_LETTER_IMAGE_SRC && (
                  <div className="mt-3 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={clearPreview}
                      className="inline-flex items-center gap-1.5 text-xs text-[#8B5947] hover:text-[#4A2925] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Limpar prévia</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                data-letter-placeholder="true"
                className="relative aspect-[3/4] max-w-md mx-auto rounded-lg border-2 border-dashed border-[#8B5947]/30 bg-[#FFF7ED]/70 flex flex-col items-center justify-center p-6 sm:p-10 text-center"
              >
                <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D6A36A]/65" aria-hidden="true" />
                <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D6A36A]/65" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D6A36A]/65" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D6A36A]/65" aria-hidden="true" />

                <div className="w-12 h-12 rounded-full bg-[#E9A6AD]/25 flex items-center justify-center mb-4">
                  <ImagePlus className="w-5 h-5 text-[#4A2925]" aria-hidden="true" />
                </div>

                <p className="font-serif text-xl sm:text-2xl text-[#4A2925] mb-2">
                  Espaço da Carta Escrita à Mão
                </p>

                <p className="text-sm text-[#8B5947] leading-relaxed max-w-xs mb-5">
                  Reservado para a fotografia da sua carta. Adicione o caminho da imagem em{' '}
                  <code className="px-1.5 py-0.5 rounded bg-[#F7ECDF] text-[#4A2925] text-xs font-mono">
                    HANDWRITTEN_LETTER_IMAGE_SRC
                  </code>{' '}
                  no arquivo{' '}
                  <code className="px-1.5 py-0.5 rounded bg-[#F7ECDF] text-[#4A2925] text-xs font-mono">
                    src/config/letterConfig.ts
                  </code>
                  .
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="letter-preview-upload"
                />

                <label
                  htmlFor="letter-preview-upload"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4A2925] text-[#FFF7ED] px-5 py-2.5 text-sm font-medium hover:bg-[#5E3631] transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-[#D98C98]"
                >
                  <ImagePlus className="w-4 h-4" aria-hidden="true" />
                  <span>Pré-visualizar sua foto aqui</span>
                </label>

                <p className="mt-3 text-xs text-[#8B5947]/80">
                  Fotos na vertical ou horizontal são exibidas por completo, sem cortes.
                </p>
              </div>
            )}

            {/* Legenda manuscrita abaixo da fotografia */}
            <figcaption className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
              <span className="font-hand text-2xl text-[#4A2925]">
                Feito com amor, só para você.
              </span>
              {hasPhoto && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8B5947] hover:text-[#4A2925] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Abrir em tamanho real</span>
                </button>
              )}
            </figcaption>
          </figure>
        </motion.div>

        <p className="mt-8 text-center text-base sm:text-lg text-[#8B5947] leading-relaxed">
          Cada palavra vem do coração. Leia sem pressa.{' '}
          <span aria-label="coração">❤️</span>
        </p>
      </div>

      {/* Lightbox em tela cheia para leitura confortável */}
      <AnimatePresence>
        {lightboxOpen && hasPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada da carta de aniversário escrita à mão"
            className="fixed inset-0 z-50 bg-[#2A1715]/92 backdrop-blur-sm flex flex-col"
            onClick={() => {
              setLightboxOpen(false);
              setZoomed(false);
            }}
          >
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-4 text-[#FFF7ED]"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-hand text-xl text-[#FFF7ED]/90">
                Feito com amor, só para você.
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF7ED]/12 hover:bg-[#FFF7ED]/22 text-[#FFF7ED] px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9A6AD]"
                >
                  {zoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4" aria-hidden="true" />
                      <span>Ajustar à tela</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4" aria-hidden="true" />
                      <span>Ampliar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLightboxOpen(false);
                    setZoomed(false);
                  }}
                  aria-label="Fechar ampliação da carta"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#FFF7ED]/12 hover:bg-[#FFF7ED]/22 text-[#FFF7ED] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9A6AD]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className={`flex-1 flex items-center justify-center p-4 sm:p-6 ${
                zoomed ? 'overflow-auto items-start' : 'overflow-hidden'
              }`}
            >
              <img
                src={activeSrc}
                alt="Carta de aniversário escrita à mão para a Kit Kat (ampliada)"
                referrerPolicy="no-referrer"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
                className={`rounded-md shadow-2xl transition-transform duration-200 ${
                  zoomed
                    ? 'max-w-none w-[150vw] sm:w-[960px] h-auto object-contain cursor-zoom-out'
                    : 'max-w-[94vw] max-h-[84vh] w-auto h-auto object-contain cursor-zoom-in'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
