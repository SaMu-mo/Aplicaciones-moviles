export const colores = {
  fondo: '#FFF8F1',
  tarjeta: '#FFFFFF',
  primario: '#E8590C',
  primarioOscuro: '#C2410C',
  acentoSuave: '#FFEBDD',
  texto: '#2B1D14',
  textoSuave: '#7A6455',
  borde: '#F1E2D3',
  estrella: '#F5A524',
  estrellaVacia: '#E7D8C9',
  peligro: '#DC2626',
  peligroSuave: '#FDECEC',
  blanco: '#FFFFFF',
};

export const sombra = {
  shadowColor: '#7A3E12',
  shadowOpacity: 0.12,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4,
};

export const pintarEstrellas = (calificacion: number) =>
  '★'.repeat(calificacion) + '☆'.repeat(Math.max(0, 5 - calificacion));
