/** Formatea un monto en UF con separadores chilenos y hasta 2 decimales. */
export const formatoUF = (n: number) =>
  new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2 }).format(n);
