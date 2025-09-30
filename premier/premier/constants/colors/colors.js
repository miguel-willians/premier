// constants/colors.js

/**
 * Paleta de Cores baseada no HEX principal (#0062C7) e em tons de cinza.
 * Convenção de Nomenclatura Tailwind CSS (cor-tonalidade).
 */

// --- PALETA AZUL (PRIMARY) ---

// Variações "Shades" (Mapeadas para tonalidades mais claras, 100 a 400)
const PRIMARY_400 = '#447EEB';
const PRIMARY_300 = '#6B9CFF';
const PRIMARY_200 = '#8FBAFF';
const PRIMARY_100 = '#B2DAFF';

// Cor Principal
const PRIMARY_600 = '#0062C7'; 

// Variações "Random Shades" (Mapeadas para tonalidades mais claras/escuras)
const PRIMARY_50 = '#D1F7FF'; // Mais clara/quase branca
const PRIMARY_500 = '#0059BC'; // Um pouco mais escura
const PRIMARY_900 = '#001E71'; // Muito escura

// Tonalidade de luz que estava em RANDOM_1
const PRIMARY_LIGHT_BLUE = '#9DC7FF'; 

// --- PALETA DE CINZAS E BÁSICAS ---

const WHITE = '#FFFFFF';
const BLACK = '#000000';

// Tons de Cinza do StyleSheet e o seu GRAY
const GRAY_900 = BLACK;        // Usado para texto principal (#000)
const GRAY_600 = '#888';       // Usado para texto desabilitado
const GRAY_400 = '#aaa';       // Usado para borda desabilitada
const GRAY_300 = '#ccc';       // Usado para borda padrão
const GRAY_100 = '#eeeeee';    // Usado como fundo disabled (Seu 'GRAY')
const GRAY_0 = WHITE;          // Usado como fundo padrão (#fff)

// Objeto para acesso por chaves (Exportado)
export const AppColors = {
  // Cores Primárias (Azul)
  'primary-900': PRIMARY_900,
  'primary-600': PRIMARY_600, // Cor base
  'primary-500': PRIMARY_500,
  'primary-400': PRIMARY_400,
  'primary-300': PRIMARY_300,
  'primary-200': PRIMARY_200,
  'primary-100': PRIMARY_100,
  'primary-50': PRIMARY_50,
  'primary-light': PRIMARY_LIGHT_BLUE, // Manteve para o tom específico

  // Cores de Grayscale (Cinza/Preto/Branco)
  'gray-900': GRAY_900, // Preto
  'gray-600': GRAY_600,
  'gray-400': GRAY_400,
  'gray-300': GRAY_300,
  'gray-100': GRAY_100, // Fundo disabled
  'gray-0': GRAY_0,     // Branco
};