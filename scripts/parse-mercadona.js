#!/usr/bin/env node
// Lee la salida de "mercadona batch" (formato de texto, una línea por término
// buscado) y la convierte en { idIngrediente: precioEnEuros, ... }.
//
// Formato esperado de cada línea (documentado por el propio CLI):
//   • queso            → [51110] Queso rallado mozzarella pizza-Roma Hacendado — 1.60€ (8.000€/kg)
//
// Si en algún momento el CLI cambia su formato de salida y este script deja
// de encontrar coincidencias, NO rompe nada: simplemente no se actualiza
// precios-mercadona.json y la web sigue usando las estimaciones de siempre.

const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = process.argv[2] || "mercadona-output.txt";
const IDS_FILE = path.join(__dirname, "ingredient-ids.txt");
const RESULT_FILE = path.join(__dirname, "..", "web", "precios-mercadona.json");

const ids = fs
  .readFileSync(IDS_FILE, "utf-8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

const lines = fs.readFileSync(OUTPUT_FILE, "utf-8").split("\n");

// Une cada línea de salida con el ingrediente correspondiente por orden,
// ya que search-terms.txt e ingredient-ids.txt están alineados línea a línea.
const lineaRegex = /•\s*\S.*→\s*\[\d+\]\s*.+?—\s*([\d.,]+)\s*€/;

const resultado = {};
let coincidencias = 0;

let idx = 0;
for (const line of lines) {
  const m = line.match(lineaRegex);
  if (!m) continue;
  if (idx >= ids.length) break;
  const precio = parseFloat(m[1].replace(",", "."));
  if (!isNaN(precio)) {
    resultado[ids[idx]] = precio;
    coincidencias++;
  }
  idx++;
}

console.log(`Coincidencias encontradas: ${coincidencias} / ${ids.length}`);

if (coincidencias === 0) {
  console.error("No se encontró ninguna coincidencia. No se actualiza precios-mercadona.json.");
  process.exit(0); // no fallar el workflow, solo no actualizar nada
}

fs.mkdirSync(path.dirname(RESULT_FILE), { recursive: true });
fs.writeFileSync(RESULT_FILE, JSON.stringify(resultado, null, 2) + "\n");
console.log(`Escrito ${RESULT_FILE}`);
