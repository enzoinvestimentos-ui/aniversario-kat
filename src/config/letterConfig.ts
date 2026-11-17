/**
 * ============================================================================
 * FOTOGRAFIA DA CARTA DE ANIVERSÁRIO ESCRITA À MÃO
 * ============================================================================
 * Substitua a string vazia abaixo pelo caminho ou URL da fotografia da sua
 * carta escrita à mão.
 *
 * Exemplo:
 *   1. Salve a sua foto na pasta `/public` (ex: `/public/carta-aniversario.jpg`)
 *   2. Atualize a linha abaixo para:
 *      export const HANDWRITTEN_LETTER_IMAGE_SRC = '/carta-aniversario.jpg';
 *
 * O quadro preserva automaticamente a proporção original (vertical ou
 * horizontal), exibe a foto inteira sem cortes e permite abrir em tela cheia.
 * ============================================================================
 */
export const HANDWRITTEN_LETTER_IMAGE_SRC = '/carta.jpeg';

/**
 * ============================================================================
 * MÚSICA AMBIENTE DE ANIVERSÁRIO (OPCIONAL)
 * ============================================================================
 * Por padrão, o player reproduz uma melodia suave estilo caixinha de música.
 * Caso queira usar um arquivo MP3 próprio (ex: `/public/musica.mp3`),
 * preencha o caminho e o título abaixo.
 * ============================================================================
 */
export const BACKGROUND_MUSIC_SRC = '';
export const BACKGROUND_MUSIC_TITLE = 'Caixinha de Aniversário';

export interface ChapterItem {
  id: string;
  label: string;
  number: string;
}

export const CHAPTERS: ChapterItem[] = [
  { id: 'surprise', label: 'Surpresa', number: '01' },
  { id: 'celebration', label: 'Aniversário', number: '02' },
  { id: 'favorites', label: 'Sobre Você', number: '03' },
  { id: 'message', label: 'Um Recado', number: '04' },
  { id: 'letter', label: 'A Carta', number: '05' },
  { id: 'closing', label: 'Desejos', number: '06' },
];
