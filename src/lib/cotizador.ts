// Cálculo del cotizador. Función pura: no contiene precios, solo aplica las reglas
// definidas en src/data/cotizador.ts.
import type { Categoria } from "../data/cotizador";

/** Respuestas del usuario, indexadas por el id de cada pregunta. */
export type Seleccion = Record<string, string | string[] | number | undefined>;

export type Linea = { etiqueta: string; uf: number };

export type Resultado = {
  /** Suma de los montos definidos; null si ninguna respuesta tiene monto. */
  totalUF: number | null;
  /** Montos que componen el total. */
  lineas: Linea[];
  /** Respuestas que afectan el precio pero se cotizan según el caso. */
  porCotizar: string[];
  /** Todas las respuestas, en texto, para enviarlas en la solicitud. */
  resumen: string[];
};

export function calcular(
  categoria: Categoria,
  seleccion: Seleccion,
  mostrarPrecios = true,
): Resultado {
  const lineas: Linea[] = [];
  const porCotizar: string[] = [];
  const resumen: string[] = [];

  for (const p of categoria.preguntas) {
    const v = seleccion[p.id];

    if (p.tipo === "numero") {
      if (typeof v !== "number" || Number.isNaN(v) || v < p.min) continue;
      resumen.push(`${p.etiqueta}: ${v}`);
      if (p.ufPorUnidad === null) porCotizar.push(`${p.etiqueta}: ${v}`);
      else if (typeof p.ufPorUnidad === "number") {
        lineas.push({ etiqueta: `${p.etiqueta}: ${v}`, uf: v * p.ufPorUnidad });
      }
      continue;
    }

    const valores = Array.isArray(v) ? v : typeof v === "string" && v ? [v] : [];
    const elegidas = p.opciones.filter((o) => valores.includes(o.valor));
    if (elegidas.length === 0) continue;
    resumen.push(`${p.etiqueta}: ${elegidas.map((o) => o.etiqueta).join(", ")}`);
    for (const o of elegidas) {
      if (typeof o.uf === "number") lineas.push({ etiqueta: o.etiqueta, uf: o.uf });
      else if (o.uf === null) porCotizar.push(o.etiqueta);
    }
  }

  const totalUF =
    mostrarPrecios && lineas.length > 0 ? lineas.reduce((suma, l) => suma + l.uf, 0) : null;

  return { totalUF, lineas: mostrarPrecios ? lineas : [], porCotizar, resumen };
}
