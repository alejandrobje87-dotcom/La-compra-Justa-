(() => {
  // app-source-new17.jsx
  var { useState, useEffect, useMemo } = React;
  var storage = {
    async get(key) {
      const v = localStorage.getItem(key);
      if (v === null) throw new Error("not found");
      return { key, value: v };
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem(key);
      return { key, deleted: true };
    }
  };
  var ICON_PATHS = {
    chevronDown: /* @__PURE__ */ React.createElement("polyline", { points: "6 9 12 15 18 9" }),
    check: /* @__PURE__ */ React.createElement("polyline", { points: "20 6 9 17 4 12" }),
    refresh: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 2.6-6.4" }), /* @__PURE__ */ React.createElement("polyline", { points: "3 4 3 10 9 10" })),
    save: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 4v5h8V4" }), /* @__PURE__ */ React.createElement("path", { d: "M8 20v-6h8v6" })),
    info: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "11", x2: "12", y2: "16" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "0.6", fill: "currentColor" })),
    archive: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "4", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" }), /* @__PURE__ */ React.createElement("line", { x1: "10", y1: "12", x2: "14", y2: "12" })),
    trash: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18" }), /* @__PURE__ */ React.createElement("path", { d: "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" })),
    star: /* @__PURE__ */ React.createElement("polygon", { points: "12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" }),
    alertTriangle: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 2 22 20 2 20Z" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "16.3", r: "0.6", fill: "currentColor" })),
    repeat: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M17 2 21 6 17 10" }), /* @__PURE__ */ React.createElement("line", { x1: "21", y1: "6", x2: "7", y2: "6" }), /* @__PURE__ */ React.createElement("path", { d: "M7 22 3 18 7 14" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "18", x2: "17", y2: "18" }))
  };
  function Icon({ name, size = 16, color = "currentColor", filled = false, style, className }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: filled ? color : "none",
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style,
        className
      },
      ICON_PATHS[name]
    );
  }
  function MiniLineChart({ data, dataKey = "total", unit = "" }) {
    if (!data || data.length < 2) return null;
    const W = 600, H = 150, pad = 28;
    const values = data.map((d) => d[dataKey]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const stepX = (W - pad * 2) / (data.length - 1);
    const points = data.map((d, i) => {
      const x = pad + i * stepX;
      const y = H - pad - (d[dataKey] - min) / range * (H - pad * 2);
      return { x, y, d };
    });
    const path = points.map((p) => `${p.x},${p.y}`).join(" ");
    return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: "100%", preserveAspectRatio: "none" }, /* @__PURE__ */ React.createElement("polyline", { points: path, fill: "none", stroke: "#3F6B4F", strokeWidth: "2" }), points.map((p, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: p.x, cy: p.y, r: "3", fill: "#3F6B4F" })), points.map((p, i) => /* @__PURE__ */ React.createElement("text", { key: i, x: p.x, y: H - 6, fontSize: "10", fontFamily: "Space Mono", textAnchor: "middle", fill: "#6B6552" }, p.d.date)));
  }
  var BASE_SERVINGS = 3;
  var STORES = [
    { id: "mercadona", name: "Mercadona", color: "#1FAA59" },
    { id: "lidl", name: "Lidl", color: "#0A5A3C" },
    { id: "carrefour", name: "Carrefour", color: "#1F4E8C" },
    { id: "dia", name: "D\xEDa", color: "#C2452F" }
  ];
  var HOUSEHOLDS = [
    { n: 1, label: "Vivo solo/a" },
    { n: 2, label: "Pareja / 2" },
    { n: 3, label: "3 personas" },
    { n: 4, label: "Familia de 4" },
    { n: 5, label: "Familia de 5" },
    { n: 6, label: "6 o m\xE1s" }
  ];
  var DEFAULT_PRICES = {
    patatas: { unit: "kg", label: "Patatas", mercadona: 1.23, lidl: 1.1, carrefour: 1.95, dia: 1.3 },
    huevos: { unit: "docena", label: "Huevos", mercadona: 3, lidl: 2.7, carrefour: 2.6, dia: 3.1 },
    cebolla: { unit: "kg", label: "Cebolla", mercadona: 1.15, lidl: 1, carrefour: 1.3, dia: 1.05 },
    ensalada: { unit: "kg", label: "Lechuga y tomate", mercadona: 2.2, lidl: 1.95, carrefour: 2.45, dia: 2.05 },
    pollo: { unit: "kg", label: "Muslos de pollo", mercadona: 4.5, lidl: 4.1, carrefour: 4.8, dia: 4.3 },
    asar: { unit: "kg", label: "Verduras variadas", mercadona: 1.8, lidl: 1.6, carrefour: 2, dia: 1.7 },
    pasta: { unit: "paquete 500g", label: "Pasta", mercadona: 0.65, lidl: 0.55, carrefour: 0.75, dia: 0.6 },
    tomateFrito: { unit: "lata 400g", label: "Tomate frito", mercadona: 0.75, lidl: 0.65, carrefour: 0.85, dia: 0.7 },
    atun: { unit: "pack 3 latas", label: "At\xFAn en lata", mercadona: 2.1, lidl: 1.85, carrefour: 2.3, dia: 1.95 },
    lentejas: { unit: "paquete 500g", label: "Lentejas", mercadona: 1.1, lidl: 0.95, carrefour: 1.25, dia: 1 },
    chorizo: { unit: "kg", label: "Chorizo", mercadona: 6.5, lidl: 5.8, carrefour: 7, dia: 6 },
    zanahoria: { unit: "kg", label: "Zanahoria", mercadona: 0.9, lidl: 0.8, carrefour: 1, dia: 0.85 },
    salmon: { unit: "kg", label: "Salm\xF3n", mercadona: 15.5, lidl: 11.5, carrefour: 16.9, dia: 14.2 },
    arroz: { unit: "kg", label: "Arroz", mercadona: 1.2, lidl: 1, carrefour: 1.35, dia: 1.05 },
    carnePicada: { unit: "kg", label: "Carne picada", mercadona: 9.5, lidl: 7.9, carrefour: 9.8, dia: 8.4 },
    panHamburguesa: { unit: "paquete 4 uds", label: "Pan de hamburguesa", mercadona: 1.2, lidl: 1, carrefour: 1.4, dia: 1.1 },
    boniato: { unit: "kg", label: "Boniato", mercadona: 1.6, lidl: 1.4, carrefour: 1.8, dia: 1.5 },
    calabaza: { unit: "kg", label: "Calabaza", mercadona: 0.95, lidl: 0.85, carrefour: 1.05, dia: 0.9 },
    leche: { unit: "litro", label: "Leche", mercadona: 0.9, lidl: 0.82, carrefour: 0.99, dia: 0.85 },
    espinacas: { unit: "kg", label: "Espinacas frescas", mercadona: 2.3, lidl: 2, carrefour: 2.55, dia: 2.15 },
    pavoFilete: { unit: "kg", label: "Filete de pavo", mercadona: 8.5, lidl: 7.6, carrefour: 9, dia: 7.9 },
    merluza: { unit: "kg", label: "Merluza", mercadona: 11.5, lidl: 10.2, carrefour: 12.5, dia: 10.8 },
    garbanzos: { unit: "paquete 500g", label: "Garbanzos", mercadona: 1.05, lidl: 0.9, carrefour: 1.2, dia: 0.95 },
    masaPizza: { unit: "unidad", label: "Base de pizza", mercadona: 1.8, lidl: 1.5, carrefour: 2, dia: 1.65 },
    jamonYork: { unit: "paquete", label: "Jam\xF3n cocido", mercadona: 1.6, lidl: 1.35, carrefour: 1.85, dia: 1.45 },
    quesoRallado: { unit: "paquete", label: "Queso rallado", mercadona: 2.1, lidl: 1.8, carrefour: 2.35, dia: 1.95 },
    quinoa: { unit: "paquete 500g", label: "Quinoa", mercadona: 2.8, lidl: 2.4, carrefour: 3.1, dia: 2.6 },
    calabacin: { unit: "kg", label: "Calabac\xEDn", mercadona: 1.5, lidl: 1.3, carrefour: 1.7, dia: 1.4 },
    solomilloCerdo: { unit: "kg", label: "Solomillo de cerdo", mercadona: 7.9, lidl: 6.9, carrefour: 8.5, dia: 7.4 },
    langostinos: { unit: "kg", label: "Langostinos", mercadona: 12.5, lidl: 10.9, carrefour: 13.9, dia: 11.5 },
    bacalao: { unit: "kg", label: "Bacalao desalado", mercadona: 13.5, lidl: 11.9, carrefour: 14.9, dia: 12.5 },
    setas: { unit: "kg", label: "Setas variadas", mercadona: 6.5, lidl: 5.8, carrefour: 7.2, dia: 6 },
    parmesano: { unit: "paquete", label: "Parmesano", mercadona: 3.2, lidl: 2.8, carrefour: 3.6, dia: 3 },
    vinoBlancoCocina: { unit: "botella", label: "Vino blanco para cocinar", mercadona: 2.5, lidl: 2.1, carrefour: 2.8, dia: 2.3 },
    brocoli: { unit: "kg", label: "Br\xF3coli", mercadona: 1.6, lidl: 1.4, carrefour: 1.8, dia: 1.5 },
    esparragos: { unit: "manojo", label: "Esp\xE1rragos trigueros", mercadona: 1.8, lidl: 1.55, carrefour: 2, dia: 1.65 },
    mejillones: { unit: "kg", label: "Mejillones", mercadona: 4.5, lidl: 3.9, carrefour: 4.9, dia: 4.1 },
    ternera: { unit: "kg", label: "Filete de ternera", mercadona: 12.5, lidl: 11, carrefour: 13.5, dia: 11.8 },
    judiasVerdes: { unit: "kg", label: "Jud\xEDas verdes", mercadona: 2.8, lidl: 2.5, carrefour: 3.1, dia: 2.65 },
    guisantes: { unit: "kg", label: "Guisantes", mercadona: 2.4, lidl: 2.1, carrefour: 2.65, dia: 2.2 },
    coliflor: { unit: "kg", label: "Coliflor", mercadona: 2.05, lidl: 1.8, carrefour: 2.3, dia: 1.9 },
    pimientos: { unit: "kg", label: "Pimientos", mercadona: 2.4, lidl: 2.1, carrefour: 2.7, dia: 2.25 },
    gambas: { unit: "kg", label: "Gambas peladas", mercadona: 6.35, lidl: 5.8, carrefour: 6.9, dia: 6 },
    dorada: { unit: "kg", label: "Dorada", mercadona: 7.5, lidl: 6.6, carrefour: 8.2, dia: 6.9 },
    terneraGuisar: { unit: "kg", label: "Ternera para guisar", mercadona: 10.5, lidl: 9.3, carrefour: 11.2, dia: 9.7 },
    champinones: { unit: "kg", label: "Champi\xF1ones", mercadona: 3.5, lidl: 3.1, carrefour: 3.9, dia: 3.25 },
    quesoCabra: { unit: "paquete", label: "Queso de cabra (rulo)", mercadona: 2.6, lidl: 2.3, carrefour: 2.9, dia: 2.4 },
    pavoPicado: { unit: "kg", label: "Pavo picado", mercadona: 7.9, lidl: 7, carrefour: 8.5, dia: 7.3 },
    pan: { unit: "barra", label: "Pan", mercadona: 0.55, lidl: 0.45, carrefour: 0.65, dia: 0.5 }
  };
  var CATEGORIES = [
    { name: "Carnes", ids: ["pollo", "chorizo", "carnePicada", "pavoFilete", "jamonYork", "solomilloCerdo", "ternera", "terneraGuisar", "pavoPicado"] },
    { name: "Pescados y mariscos", ids: ["salmon", "merluza", "atun", "bacalao", "langostinos", "mejillones", "gambas", "dorada"] },
    { name: "Verduras y hortalizas", ids: ["patatas", "cebolla", "ensalada", "asar", "zanahoria", "boniato", "calabaza", "calabacin", "espinacas", "setas", "brocoli", "esparragos", "judiasVerdes", "guisantes", "coliflor", "pimientos", "champinones"] },
    { name: "Legumbres y cereales", ids: ["garbanzos", "lentejas", "arroz", "pasta", "quinoa"] },
    { name: "L\xE1cteos y huevos", ids: ["huevos", "leche", "quesoRallado", "parmesano", "quesoCabra"] },
    { name: "Despensa", ids: ["tomateFrito", "panHamburguesa", "masaPizza", "vinoBlancoCocina", "pan"] }
  ];
  var ALLERGEN_GROUPS = [
    { key: "gluten", emoji: "\u{1F33E}", label: "Gluten", ids: ["pasta", "masaPizza", "panHamburguesa"] },
    { key: "lactosa", emoji: "\u{1F95B}", label: "Lactosa", ids: ["leche", "quesoRallado", "parmesano", "quesoCabra"] },
    { key: "huevo", emoji: "\u{1F95A}", label: "Huevo", ids: ["huevos"] },
    { key: "pescado", emoji: "\u{1F41F}", label: "Pescado", ids: ["salmon", "merluza", "atun", "bacalao", "dorada"] },
    { key: "marisco", emoji: "\u{1F990}", label: "Marisco", ids: ["langostinos", "mejillones", "gambas"] },
    { key: "legumbres", emoji: "\u{1FAD8}", label: "Legumbres", ids: ["garbanzos", "lentejas"] },
    { key: "cerdo", emoji: "\u{1F437}", label: "Cerdo", ids: ["chorizo", "jamonYork", "solomilloCerdo"] },
    { key: "alcohol", emoji: "\u{1F377}", label: "Alcohol (cocina)", ids: ["vinoBlancoCocina"] }
  ];
  var EXTRAS = [
    { id: "manzanas", emoji: "\u{1F34E}", label: "Manzanas (kg)", category: "Fruta", mercadona: 1.4, lidl: 1.2, carrefour: 1.6, dia: 1.3 },
    { id: "platanos", emoji: "\u{1F34C}", label: "Pl\xE1tanos (kg)", category: "Fruta", mercadona: 1.5, lidl: 1.3, carrefour: 1.7, dia: 1.4 },
    { id: "naranjas", emoji: "\u{1F34A}", label: "Naranjas (kg)", category: "Fruta", mercadona: 1.1, lidl: 0.95, carrefour: 1.25, dia: 1 },
    { id: "fresas", emoji: "\u{1F353}", label: "Fresas (bandeja)", category: "Fruta", mercadona: 2.2, lidl: 1.9, carrefour: 2.5, dia: 2.05 },
    { id: "pan", emoji: "\u{1F35E}", label: "Pan de barra", category: "Panader\xEDa", mercadona: 0.55, lidl: 0.45, carrefour: 0.65, dia: 0.5 },
    { id: "panMolde", emoji: "\u{1F35E}", label: "Pan de molde integral", category: "Panader\xEDa", mercadona: 1.6, lidl: 1.35, carrefour: 1.8, dia: 1.45 },
    { id: "yogures", emoji: "\u{1F95B}", label: "Yogures naturales (pack 4)", category: "L\xE1cteos", mercadona: 1.8, lidl: 1.5, carrefour: 2, dia: 1.65 },
    { id: "quesoLonchas", emoji: "\u{1F9C0}", label: "Queso en lonchas", category: "L\xE1cteos", mercadona: 1.9, lidl: 1.6, carrefour: 2.1, dia: 1.75 },
    { id: "quesoFresco", emoji: "\u{1F9C0}", label: "Queso fresco (tarrina)", category: "L\xE1cteos", mercadona: 1.7, lidl: 1.45, carrefour: 1.9, dia: 1.55 },
    { id: "patatasFritas", emoji: "\u{1F954}", label: "Patatas fritas (bolsa)", category: "Snacks salados", mercadona: 1.1, lidl: 0.95, carrefour: 1.25, dia: 1 },
    { id: "encurtidos", emoji: "\u{1FAD2}", label: "Aceitunas / encurtidos (frasco)", category: "Snacks salados", mercadona: 1.5, lidl: 1.3, carrefour: 1.7, dia: 1.4 },
    { id: "frutosSecos", emoji: "\u{1F95C}", label: "Frutos secos (bolsa)", category: "Snacks salados", mercadona: 2.2, lidl: 1.9, carrefour: 2.5, dia: 2.05 },
    { id: "helado", emoji: "\u{1F366}", label: "Helado (tarrina)", category: "Snacks dulces", mercadona: 3.5, lidl: 3, carrefour: 3.9, dia: 3.2 },
    { id: "chocolate", emoji: "\u{1F36B}", label: "Chocolate / galletas", category: "Snacks dulces", mercadona: 1.8, lidl: 1.5, carrefour: 2, dia: 1.65 },
    { id: "refrescos", emoji: "\u{1F964}", label: "Refrescos (pack 6 latas)", category: "Bebidas", mercadona: 3.3, lidl: 2.8, carrefour: 3.6, dia: 3 },
    { id: "cerveza", emoji: "\u{1F37A}", label: "Cerveza (pack 6)", category: "Bebidas", mercadona: 3.6, lidl: 3.1, carrefour: 3.9, dia: 3.3 },
    { id: "vino", emoji: "\u{1F377}", label: "Vino (botella)", category: "Bebidas", mercadona: 3, lidl: 2.6, carrefour: 3.4, dia: 2.8 }
  ];
  var EXTRA_CATEGORIES = ["Fruta", "Panader\xEDa", "L\xE1cteos", "Snacks salados", "Snacks dulces", "Bebidas"];
  var PRODUCT_VARIANTS = {
    atun: { sana: "al natural", normal: "en aceite de girasol", elaborada: "en aceite de oliva" },
    arroz: { sana: "integral", normal: "redondo", elaborada: "bomba / arborio" },
    pasta: { sana: "integral", normal: "normal", elaborada: "fresca al huevo" },
    pan: { sana: "integral", normal: "de barra", elaborada: "de masa madre" },
    panHamburguesa: { sana: "integral", normal: "cl\xE1sico", elaborada: "brioche" },
    leche: { sana: "desnatada", normal: "semidesnatada", elaborada: "entera fresca" },
    pollo: { sana: "pechuga sin piel", normal: "muslos", elaborada: "muslos de corral" },
    tomateFrito: { sana: "triturado natural", normal: "frito cl\xE1sico", elaborada: "frito casero / artesano" },
    quesoRallado: { sana: "light", normal: "rallado mezcla", elaborada: "parmesano / curado" }
  };
  var MENU_NORMAL = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F958}",
        name: "Garbanzos con espinacas",
        time: "30 min",
        items: [{ id: "garbanzos", qty: 1 }, { id: "espinacas", qty: 0.4 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Pica la cebolla en trozos peque\xF1os.",
          "Pon una sart\xE9n grande a fuego medio con un par de cucharadas de aceite de oliva.",
          "Sofr\xEDe la cebolla 6-8 minutos, removiendo de vez en cuando, hasta que est\xE9 blanda y transparente.",
          "A\xF1ade las espinacas frescas poco a poco (reducen mucho de volumen) y saltea 3-4 minutos hasta que se ablanden.",
          "Incorpora los garbanzos ya cocidos (de bote, escurridos y enjuagados) y un chorrito de agua.",
          "Cocina 5 minutos m\xE1s a fuego medio para que se integren los sabores, removiendo con cuidado de no romper los garbanzos.",
          "Prueba de sal, a\xF1ade un toque de comino si te gusta, y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de patatas con ensalada",
        time: "35 min",
        items: [{ id: "patatas", qty: 0.6 }, { id: "huevos", qty: 0.5 }, { id: "cebolla", qty: 0.2 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Pela las patatas y c\xF3rtalas en l\xE1minas finas (medio cent\xEDmetro aproximadamente).",
          "Pica la cebolla en juliana fina.",
          "Calienta abundante aceite en una sart\xE9n a fuego medio-bajo y echa las patatas y la cebolla juntas.",
          "Fr\xEDe lentamente 15-18 minutos, removiendo de tanto en tanto, hasta que las patatas est\xE9n blandas (no doradas, sino tiernas).",
          "Escurre bien el aceite y reserva las patatas en un bol.",
          "Bate los huevos en otro bol con una pizca de sal, mezcla con las patatas y deja reposar 2 minutos.",
          "Vierte la mezcla en una sart\xE9n peque\xF1a antiadherente con un poco de aceite y cuaja a fuego medio 3-4 minutos por lado.",
          "Deja reposar 1 minuto antes de cortar. Sirve con la ensalada ali\xF1ada con aceite, vinagre y sal."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F983}",
        name: "Pavo a la plancha con pur\xE9 de patata",
        time: "30 min",
        items: [{ id: "pavoFilete", qty: 0.6 }, { id: "patatas", qty: 0.6 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela las patatas, c\xF3rtalas en trozos medianos y ponlas a cocer en agua con sal 18-20 minutos, hasta que est\xE9n tiernas al pincharlas con un tenedor.",
          "Mientras cuecen, saca los filetes de pavo a temperatura ambiente y sazona con sal y pimienta por ambos lados.",
          "Escurre las patatas y mach\xE1calas con un tenedor o pasapur\xE9s.",
          "A\xF1ade la leche caliente poco a poco mientras mezclas, hasta conseguir la textura de pur\xE9 que te guste.",
          "Calienta una sart\xE9n o plancha a fuego fuerte con una gota de aceite.",
          "Cocina los filetes de pavo 3-4 minutos por lado, sin moverlos demasiado, hasta que est\xE9n dorados por fuera y jugosos por dentro.",
          "Sirve el pavo reci\xE9n hecho junto al pur\xE9 caliente."
        ]
      },
      cena: {
        emoji: "\u{1F357}",
        name: "Pollo al horno con verduras asadas",
        time: "45 min",
        items: [{ id: "pollo", qty: 0.9 }, { id: "asar", qty: 0.8 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Trocea las verduras variadas en trozos similares para que se asen de forma uniforme.",
          "Coloca el pollo y las verduras en una bandeja de horno, con un buen chorro de aceite de oliva.",
          "Sazona con sal, pimienta y las hierbas que m\xE1s te gusten (romero, tomillo u or\xE9gano).",
          "Hornea 35-40 minutos, dando la vuelta al pollo y removiendo las verduras a mitad de cocci\xF3n.",
          "Comprueba que el pollo est\xE1 hecho pinchando la parte m\xE1s gruesa: el jugo debe salir claro, no rosado.",
          "Deja reposar 5 minutos fuera del horno antes de servir."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz con verduras y jam\xF3n",
        time: "25 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "jamonYork", qty: 1 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Corta las verduras variadas en trozos peque\xF1os.",
          "Calienta un par de cucharadas de aceite en una sart\xE9n amplia o cazuela baja.",
          "Sofr\xEDe las verduras 5-6 minutos a fuego medio hasta que empiecen a ablandarse.",
          "A\xF1ade el arroz y remueve 1 minuto para que se impregne del aceite.",
          "Vierte el doble de agua o caldo que de arroz, sazona y deja cocer a fuego medio-bajo, tapado, 16-18 minutos sin destapar.",
          "Dos minutos antes de terminar, incorpora el jam\xF3n cocido cortado en taquitos.",
          "Deja reposar 2 minutos fuera del fuego antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F35D}",
        name: "Pasta con tomate y at\xFAn",
        time: "20 min",
        items: [{ id: "pasta", qty: 1 }, { id: "tomateFrito", qty: 1 }, { id: "atun", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal en una olla grande.",
          "Cuando hierva, a\xF1ade la pasta y cuece el tiempo que indique el paquete (normalmente 9-11 minutos), removiendo de vez en cuando.",
          "Mientras tanto, calienta el tomate frito en una sart\xE9n a fuego medio.",
          "Escurre bien el at\xFAn en lata y a\xF1\xE1delo al tomate, deshaci\xE9ndolo un poco con el tenedor.",
          "Cocina 2-3 minutos para que se integren los sabores.",
          "Escurre la pasta y m\xE9zclala directamente con la salsa en la sart\xE9n.",
          "Sirve caliente; un toque de queso rallado por encima es opcional."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F41F}",
        name: "Merluza al horno con patatas panadera",
        time: "40 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "patatas", qty: 0.6 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela y corta las patatas en rodajas finas, y la cebolla en juliana.",
          "Coloca las patatas y la cebolla en una bandeja de horno, con aceite, sal y un poco de agua para que no se sequen.",
          "Hornea 15 minutos para que las patatas empiecen a ablandarse.",
          "Saca la bandeja, coloca los lomos de merluza encima de las patatas, sazona y a\xF1ade un chorrito m\xE1s de aceite.",
          "Vuelve a hornear 12-15 minutos m\xE1s, hasta que el pescado est\xE9 blanco y se separe con facilidad al pincharlo.",
          "Sirve directamente en la misma bandeja o en platos individuales."
        ]
      },
      cena: {
        emoji: "\u{1F963}",
        name: "Lentejas con chorizo",
        time: "40 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "chorizo", qty: 0.3 }, { id: "cebolla", qty: 0.15 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Pica la cebolla y la zanahoria en trozos peque\xF1os.",
          "Calienta aceite en una olla y sofr\xEDe la cebolla y la zanahoria 5-6 minutos a fuego medio.",
          "A\xF1ade el chorizo cortado en rodajas y sofr\xEDe 2-3 minutos m\xE1s, hasta que suelte algo de su grasa y color.",
          "Incorpora las lentejas (si son secas, previamente puestas en remojo) y cubre con agua abundante.",
          "Lleva a ebullici\xF3n y luego baja el fuego, dejando cocer a fuego suave 25-30 minutos, removiendo de vez en cuando.",
          "Si usas lentejas de bote (ya cocidas), reduce el tiempo de cocci\xF3n a 10 minutos.",
          "Ajusta el punto de sal al final y sirve bien caliente."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F361}",
        name: "Alb\xF3ndigas en salsa de tomate con arroz",
        time: "35 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "tomateFrito", qty: 1 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Sazona la carne picada con sal, pimienta y, si quieres, un huevo y un poco de pan rallado para que liguen mejor.",
          "Forma bolitas del tama\xF1o de una nuez con las manos ligeramente h\xFAmedas.",
          "Calienta aceite en una sart\xE9n y dora las alb\xF3ndigas por todos los lados, 4-5 minutos en total, hasta que tengan un color tostado por fuera.",
          "Retira el exceso de aceite y a\xF1ade el tomate frito directamente a la sart\xE9n con las alb\xF3ndigas.",
          "Cocina a fuego medio-bajo 10-12 minutos, removiendo con cuidado, para que las alb\xF3ndigas terminen de hacerse por dentro en la salsa.",
          "Mientras, cuece el arroz en agua con sal seg\xFAn el tiempo del paquete (normalmente 15-18 minutos) y escurre.",
          "Sirve las alb\xF3ndigas con su salsa acompa\xF1adas del arroz blanco."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al horno con arroz",
        time: "30 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca los lomos de salm\xF3n en una bandeja con papel de horno, sazona con sal y pimienta.",
          "A\xF1ade un chorrito de aceite de oliva y unas rodajas de lim\xF3n por encima.",
          "Hornea 15-18 minutos, seg\xFAn el grosor del lomo, hasta que est\xE9 hecho pero jugoso por dentro.",
          "Mientras se hornea el salm\xF3n, cuece el arroz en agua con sal 15-18 minutos y escurre.",
          "Deja reposar el salm\xF3n 2 minutos antes de servir junto al arroz."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F355}",
        name: "Pizza casera de jam\xF3n y queso",
        time: "25 min",
        items: [{ id: "masaPizza", qty: 1 }, { id: "jamonYork", qty: 1 }, { id: "quesoRallado", qty: 1 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Precalienta el horno a 220\xB0C (o la temperatura m\xE1xima de tu horno) con la bandeja dentro para que se caliente.",
          "Extiende la base de pizza sobre papel de horno.",
          "Reparte el tomate frito por toda la base con el dorso de una cuchara, dejando un borde libre de 1-2 cm.",
          "Distribuye el jam\xF3n cocido en trozos o lonchas por encima del tomate.",
          "Cubre con el queso rallado de forma uniforme.",
          "Desl\xEDzala (con el papel) sobre la bandeja caliente y hornea 12-15 minutos, hasta que el queso est\xE9 dorado y burbujeante.",
          "Deja reposar 1-2 minutos antes de cortar en porciones."
        ]
      },
      cena: {
        emoji: "\u{1F354}",
        name: "Hamburguesas caseras con boniato",
        time: "30 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "panHamburguesa", qty: 1 }, { id: "boniato", qty: 0.8 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Pela el boniato y c\xF3rtalo en bastones tipo patatas fritas.",
          "Col\xF3calos en una bandeja con aceite, sal y un poco de piment\xF3n si te gusta, y hornea 25 minutos, d\xE1ndoles la vuelta a mitad de cocci\xF3n.",
          "Mientras, sazona la carne picada con sal y pimienta y forma hamburguesas con las manos, aplast\xE1ndolas ligeramente.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina las hamburguesas 3-4 minutos por lado, seg\xFAn el punto que te guste.",
          "Tuesta ligeramente el pan de hamburguesa y monta con tus ingredientes favoritos (lechuga, tomate, salsas).",
          "Sirve junto a los bastones de boniato reci\xE9n salidos del horno."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas con arroz y verduras",
        time: "35 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "arroz", qty: 0.2 }, { id: "zanahoria", qty: 0.2 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Pica la cebolla y la zanahoria en trozos peque\xF1os.",
          "Sofr\xEDe ambas en una olla con un poco de aceite, 5-6 minutos a fuego medio.",
          "A\xF1ade las lentejas (de bote, escurridas) y el arroz, removiendo 1 minuto.",
          "Cubre con agua o caldo (el doble de volumen que de arroz y lentejas juntos) y sazona.",
          "Cuece a fuego medio-bajo, tapado, 16-18 minutos, hasta que el arroz est\xE9 en su punto.",
          "Si queda muy espeso, a\xF1ade un poco m\xE1s de agua caliente; si queda caldoso, deja reducir un par de minutos m\xE1s sin tapa.",
          "Deja reposar 2 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F383}",
        name: "Crema de calabaza y tortilla francesa",
        time: "35 min",
        items: [{ id: "calabaza", qty: 1 }, { id: "leche", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Pela y corta la calabaza en trozos medianos.",
          "Cu\xE9cela en agua con sal 15-18 minutos, hasta que est\xE9 muy tierna al pincharla.",
          "Escurre (reservando un poco del agua de cocci\xF3n) y tritura con la batidora junto con la leche caliente, hasta conseguir una crema fina.",
          "Si queda demasiado espesa, a\xF1ade un poco del agua de cocci\xF3n reservada.",
          "Bate los huevos con una pizca de sal para la tortilla francesa.",
          "Calienta una sart\xE9n peque\xF1a con una gota de aceite y cuaja la tortilla 1-2 minutos por lado, sin que se dore demasiado.",
          "Sirve la crema bien caliente acompa\xF1ada de la tortilla reci\xE9n hecha."
        ]
      }
    }
  ];
  var MENU_SANA = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F957}",
        name: "Ensalada de garbanzos con at\xFAn",
        time: "15 min",
        salud: 9,
        items: [{ id: "garbanzos", qty: 1 }, { id: "atun", qty: 1 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Escurre y enjuaga los garbanzos de bote bajo el grifo.",
          "Escurre bien el at\xFAn en lata, separando los trozos con un tenedor.",
          "Lava y corta la lechuga y el tomate de la ensalada en trozos peque\xF1os.",
          "Mezcla todo en un bol grande: garbanzos, at\xFAn y verdura de la ensalada.",
          "Ali\xF1a con aceite de oliva, el zumo de medio lim\xF3n y una pizca de sal, removiendo bien.",
          "Deja reposar 5 minutos en la nevera antes de servir para que se integren los sabores."
        ]
      },
      cena: {
        emoji: "\u{1F952}",
        name: "Crema de calabac\xEDn con pollo a la plancha",
        time: "30 min",
        salud: 8,
        items: [{ id: "calabacin", qty: 0.8 }, { id: "pollo", qty: 0.5 }],
        steps: [
          "Lava el calabac\xEDn y c\xF3rtalo en trozos medianos (no es necesario pelarlo).",
          "Cu\xE9celo en agua con sal 12-15 minutos, hasta que est\xE9 muy tierno.",
          "Escurre, reservando un poco del agua de cocci\xF3n, y tritura con la batidora hasta conseguir una crema fina.",
          "Ajusta la textura a\xF1adiendo un poco del agua reservada si queda muy espesa.",
          "Sazona el pollo con sal y pimienta y c\xF3rtalo en filetes finos o tiras.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite y cocina el pollo 2-3 minutos por lado.",
          "Sirve la crema bien caliente con las tiras de pollo reci\xE9n hechas por encima."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Merluza al vapor con verduras",
        time: "25 min",
        salud: 8,
        items: [{ id: "merluza", qty: 0.6 }, { id: "asar", qty: 0.6 }],
        steps: [
          "Corta las verduras variadas en tiras o trozos peque\xF1os para que se cocinen r\xE1pido.",
          "Si tienes vaporera, coloca agua en la base y las verduras en la parte superior 5-6 minutos.",
          "A\xF1ade los lomos de merluza encima de las verduras y contin\xFAa al vapor 8-10 minutos m\xE1s, hasta que el pescado est\xE9 blanco y se separe con facilidad.",
          "Si no tienes vaporera, cuece la merluza en un poco de agua con sal en una sart\xE9n tapada 8-10 minutos.",
          "Para las verduras, salt\xE9alas en otra sart\xE9n con muy poco aceite y un par de cucharadas de agua, 5-6 minutos.",
          "Sirve el pescado reci\xE9n hecho junto a las verduras, con un chorrito de aceite de oliva por encima."
        ]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de espinacas",
        time: "20 min",
        salud: 9,
        items: [{ id: "espinacas", qty: 0.4 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Lava bien las espinacas frescas.",
          "Calienta una sart\xE9n con una gota de aceite y saltea las espinacas 3-4 minutos hasta que reduzcan bastante de volumen.",
          "Escurre el exceso de l\xEDquido que sueltan las espinacas.",
          "Bate los huevos en un bol con una pizca de sal.",
          "Mezcla las espinacas con el huevo batido.",
          "Vierte en la sart\xE9n a fuego suave y cuaja 3-4 minutos por lado, hasta que est\xE9 dorada pero jugosa por dentro."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas estofadas con verduras",
        time: "35 min",
        salud: 8,
        items: [{ id: "lentejas", qty: 1 }, { id: "zanahoria", qty: 0.3 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Pica la cebolla y la zanahoria en trozos peque\xF1os.",
          "Sofr\xEDe ambas en una olla con muy poco aceite, 6-7 minutos a fuego medio, hasta que se ablanden.",
          "A\xF1ade las lentejas de bote, escurridas y enjuagadas.",
          "Cubre con agua o caldo de verduras y deja cocer a fuego medio-bajo 15-18 minutos, removiendo de vez en cuando.",
          "Si usas lentejas secas, ponlas antes en remojo y alarga la cocci\xF3n a 30-35 minutos.",
          "Ajusta de sal al final y sirve caliente, sin necesidad de chorizo ni embutidos."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al papillote con ensalada",
        time: "25 min",
        salud: 8,
        items: [{ id: "salmon", qty: 0.5 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca cada lomo de salm\xF3n sobre un trozo de papel de horno grande.",
          "A\xF1ade unas rodajas de lim\xF3n, un chorrito de aceite de oliva, sal y las hierbas que te gusten.",
          "Cierra bien el papel formando un paquete (papillote) para que el vapor se quede dentro.",
          "Hornea 15 minutos; el salm\xF3n se cocina con su propio vapor, quedando muy jugoso.",
          "Abre el papillote con cuidado (sale vapor caliente) y sirve con la ensalada ali\xF1ada aparte."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo al horno con boniato y verduras",
        time: "40 min",
        salud: 8,
        items: [{ id: "pollo", qty: 0.7 }, { id: "boniato", qty: 0.5 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Retira la piel del pollo para aligerar el plato.",
          "Pela el boniato y c\xF3rtalo en dados, junto con las verduras variadas en trozos similares.",
          "Coloca todo en una bandeja de horno con un chorrito de aceite, sal y pimienta.",
          "Hornea 35 minutos, removiendo a mitad de cocci\xF3n para que se dore de forma pareja.",
          "Comprueba que el pollo est\xE9 hecho pinchando la parte m\xE1s gruesa (el jugo debe salir claro).",
          "Deja reposar 5 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F383}",
        name: "Crema de calabaza con huevo poch\xE9",
        time: "30 min",
        salud: 8,
        items: [{ id: "calabaza", qty: 0.8 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Pela y corta la calabaza en trozos medianos.",
          "Cuece en agua con sal 15-18 minutos hasta que est\xE9 muy tierna.",
          "Escurre y tritura con la batidora hasta conseguir una crema fina, ajustando con un poco de agua de cocci\xF3n si hace falta.",
          "Para el huevo poch\xE9: lleva a ebullici\xF3n suave una olla peque\xF1a con agua y un chorrito de vinagre.",
          "Casca el huevo en una taza y desl\xEDzalo con cuidado al agua, formando un peque\xF1o remolino con una cuchara.",
          "Cocina 3 minutos sin que hierva fuerte, hasta que la clara est\xE9 cuajada y la yema l\xEDquida.",
          "Sirve la crema caliente con el huevo poch\xE9 encima reci\xE9n escurrido."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F33E}",
        name: "Quinoa con verduras y at\xFAn",
        time: "20 min",
        salud: 8,
        items: [{ id: "quinoa", qty: 0.3 }, { id: "atun", qty: 1 }, { id: "asar", qty: 0.3 }],
        steps: [
          "Enjuaga la quinoa bajo el grifo con un colador fino.",
          "Cu\xE9cela en agua con sal (el doble de volumen de agua que de quinoa) 12-15 minutos, hasta que est\xE9 tierna y transl\xFAcida.",
          "Mientras cuece, corta las verduras variadas en trozos peque\xF1os y salt\xE9alas en una sart\xE9n con muy poco aceite, 5-6 minutos.",
          "Escurre el at\xFAn en lata, separando los trozos.",
          "Escurre la quinoa y m\xE9zclala en un bol con las verduras salteadas y el at\xFAn.",
          "Ali\xF1a con un chorrito de aceite de oliva y sirve templada o fr\xEDa."
        ]
      },
      cena: {
        emoji: "\u{1F952}",
        name: "Merluza con calabac\xEDn salteado",
        time: "25 min",
        salud: 9,
        items: [{ id: "merluza", qty: 0.5 }, { id: "calabacin", qty: 0.5 }],
        steps: [
          "Corta el calabac\xEDn en l\xE1minas finas (con piel, no es necesario pelarlo).",
          "Sazona los lomos de merluza con sal y pimienta.",
          "Calienta una plancha o sart\xE9n antiadherente con una gota de aceite a fuego medio-alto.",
          "Cocina la merluza 3-4 minutos por lado, hasta que est\xE9 blanca y se separe con facilidad.",
          "Retira y reserva. En la misma sart\xE9n, saltea el calabac\xEDn 4-5 minutos, removiendo, hasta que est\xE9 tierno pero con un poco de textura.",
          "Sirve la merluza con el calabac\xEDn reci\xE9n salteado."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F957}",
        name: "Ensalada completa con pollo",
        time: "15 min",
        salud: 8,
        items: [{ id: "ensalada", qty: 0.4 }, { id: "pollo", qty: 0.5 }],
        steps: [
          "Sazona el pollo con sal y pimienta y c\xF3rtalo en filetes finos.",
          "Calienta una plancha con una gota de aceite a fuego fuerte.",
          "Cocina el pollo 2-3 minutos por lado, hasta que est\xE9 dorado por fuera y hecho por dentro.",
          "Deja reposar 2 minutos y c\xF3rtalo en tiras.",
          "Lava y prepara la ensalada (lechuga, tomate y lo que tengas a mano).",
          "Monta la ensalada en un plato y coloca las tiras de pollo templado por encima.",
          "Ali\xF1a con aceite de oliva, vinagre y sal justo antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F955}",
        name: "Crema de zanahoria con tortilla francesa",
        time: "30 min",
        salud: 8,
        items: [{ id: "zanahoria", qty: 0.7 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Pela y corta la zanahoria en rodajas.",
          "Cu\xE9cela en agua con sal 18-20 minutos, hasta que est\xE9 muy tierna.",
          "Escurre, reservando un poco de agua de cocci\xF3n, y tritura con la batidora hasta que quede una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Bate los huevos para la tortilla francesa con una pizca de sal.",
          "Cuaja en una sart\xE9n peque\xF1a con una gota de aceite, 1-2 minutos por lado.",
          "Sirve la crema bien caliente junto a la tortilla reci\xE9n hecha."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al horno con verduras asadas",
        time: "35 min",
        salud: 8,
        items: [{ id: "salmon", qty: 0.5 }, { id: "asar", qty: 0.6 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Trocea las verduras variadas en trozos similares y col\xF3calas en una bandeja de horno con aceite y sal.",
          "Hornea las verduras solas 10 minutos para que empiecen a asarse.",
          "Saca la bandeja, a\xF1ade los lomos de salm\xF3n encima o al lado, con sal y un chorrito de aceite.",
          "Vuelve a hornear 18-20 minutos m\xE1s, hasta que el salm\xF3n est\xE9 hecho pero jugoso.",
          "Deja reposar 2 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Sopa de verduras con huevo",
        time: "25 min",
        salud: 8,
        items: [{ id: "zanahoria", qty: 0.3 }, { id: "asar", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Pica la zanahoria y las verduras variadas en trozos peque\xF1os.",
          "Ponlas a cocer en una olla con agua o caldo y una pizca de sal.",
          "Cuece a fuego medio 15-18 minutos, hasta que las verduras est\xE9n tiernas.",
          "Casca el huevo directamente dentro de la sopa hirviendo a fuego suave.",
          "Deja cocer 2-3 minutos sin remover demasiado, hasta que el huevo cuaje.",
          "Sirve bien caliente, repartiendo el huevo entre los platos."
        ]
      }
    }
  ];
  var MENU_ELABORADA = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F344}",
        name: "Risotto de setas con parmesano",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "setas", qty: 0.3 }, { id: "parmesano", qty: 1 }, { id: "vinoBlancoCocina", qty: 0.2 }],
        steps: [
          "Limpia las setas con un pa\xF1o h\xFAmedo y c\xF3rtalas en l\xE1minas.",
          "Calienta caldo (de verduras o pollo) en una olla aparte y mantenlo caliente a fuego muy bajo.",
          "En una sart\xE9n amplia, sofr\xEDe las setas con un poco de aceite 4-5 minutos, hasta que suelten su agua y se doren ligeramente. Reserva la mitad para decorar al final.",
          "En la misma sart\xE9n, a\xF1ade el arroz y remueve 1-2 minutos para que se impregne de los sabores.",
          "Vierte el vino blanco y deja que se evapore el alcohol, removiendo, durante 1 minuto.",
          "A\xF1ade el caldo caliente poco a poco, un cacillo cada vez, removiendo constantemente y esperando a que se absorba antes de a\xF1adir m\xE1s. Repite durante 16-18 minutos.",
          "Cuando el arroz est\xE9 cremoso y en su punto, retira del fuego y a\xF1ade el parmesano rallado, removiendo con energ\xEDa para que quede meloso.",
          "Sirve de inmediato con las setas reservadas por encima."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo de cerdo al horno con boniato",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "boniato", qty: 0.6 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela el boniato y c\xF3rtalo en dados; col\xF3calo en una bandeja con aceite y sal.",
          "Hornea el boniato 10 minutos mientras preparas la carne.",
          "Sazona el solomillo entero con sal y pimienta por todos los lados.",
          "Calienta una sart\xE9n con un poco de aceite a fuego fuerte y sella el solomillo 1-2 minutos por cada lado, hasta que est\xE9 dorado por fuera.",
          "Pasa el solomillo a la bandeja con el boniato y termina de hornear todo junto 12-15 minutos.",
          "Comprueba el punto pinchando con un cuchillo: el jugo debe salir ligeramente rosado, no rojo.",
          "Deja reposar la carne 5 minutos antes de cortarla en medallones, para que no pierda jugo."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao al horno con patatas y pimientos",
        time: "40 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "patatas", qty: 0.5 }, { id: "asar", qty: 0.3 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela y corta las patatas en rodajas finas y los pimientos en tiras.",
          "Coloca las patatas y pimientos como base en una bandeja, con aceite, sal y un poco de agua.",
          "Hornea esta base 15 minutos, hasta que las patatas empiecen a ablandarse.",
          "Coloca los lomos de bacalao desalado encima, con un chorrito de aceite de oliva.",
          "Hornea 10-12 minutos m\xE1s, hasta que el bacalao est\xE9 blanco y tierno, sin pasarse de cocci\xF3n.",
          "Deja reposar 2 minutos y sirve directamente de la bandeja."
        ]
      },
      cena: {
        emoji: "\u{1F990}",
        name: "Langostinos a la plancha con ensalada",
        time: "20 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Si los langostinos est\xE1n congelados, descong\xE9lalos antes en agua fr\xEDa.",
          "S\xE9calos bien con papel de cocina (importante para que se doren en vez de hervirse en su propio jugo).",
          "Pica un diente de ajo muy fino.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite y el ajo picado.",
          "Coloca los langostinos y cocina 2 minutos por lado, hasta que est\xE9n rosados y curvados.",
          "Sazona con un poco de sal gruesa justo al sacarlos.",
          "Sirve inmediatamente, reci\xE9n hechos, junto a la ensalada ali\xF1ada."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35D}",
        name: "Pasta con setas y parmesano",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "setas", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal para la pasta.",
          "Limpia y corta las setas en l\xE1minas.",
          "Cuece la pasta el tiempo que indique el paquete (normalmente 9-11 minutos).",
          "Mientras, saltea las setas en una sart\xE9n con un poco de aceite 5-6 minutos, hasta que se doren.",
          "Reserva un poco del agua de cocci\xF3n de la pasta antes de escurrirla.",
          "Mezcla la pasta escurrida con las setas en la sart\xE9n, a\xF1adiendo un chorrito del agua reservada para ligar.",
          "Retira del fuego y a\xF1ade un buen pu\xF1ado de parmesano rallado, removiendo bien antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n en salsa de vino blanco con arroz",
        time: "30 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.2 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Pon a cocer el arroz en agua con sal 15-18 minutos.",
          "Sazona los lomos de salm\xF3n con sal y pimienta.",
          "Calienta una sart\xE9n con un poco de aceite y cocina el salm\xF3n 3-4 minutos por lado, hasta que est\xE9 dorado. Retira y reserva.",
          "En la misma sart\xE9n (sin lavarla, para aprovechar los sabores), a\xF1ade el vino blanco y deja que reduzca a fuego medio 2-3 minutos.",
          "Si quieres una salsa m\xE1s untuosa, a\xF1ade una cucharada de nata o mantequilla y remueve hasta que se integre.",
          "Vierte la salsa sobre el salm\xF3n reservado y sirve con el arroz escurrido."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F969}",
        name: "Solomillo de cerdo con salsa y verduras",
        time: "35 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "asar", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Trocea las verduras variadas y col\xF3calas en una bandeja con aceite y sal.",
          "Sazona el solomillo y s\xE9llalo en una sart\xE9n caliente 1-2 minutos por lado, hasta dorarlo.",
          "Coloca el solomillo sobre las verduras y hornea todo junto 15-18 minutos.",
          "Mientras se hornea, puedes preparar una salsa r\xE1pida en la misma sart\xE9n de sellar, a\xF1adiendo un poco de caldo y dejando reducir 3-4 minutos.",
          "Deja reposar la carne 5 minutos antes de cortarla en medallones.",
          "Sirve con las verduras asadas y la salsa por encima."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza en salsa verde con patatas",
        time: "30 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "patatas", qty: 0.5 }],
        steps: [
          "Pela y cuece las patatas en agua con sal 18-20 minutos, hasta que est\xE9n tiernas.",
          "Pica un pu\xF1ado de perejil fresco muy fino.",
          "En una sart\xE9n baja, calienta un poco de caldo de pescado o agua con un chorrito de vino blanco.",
          "A\xF1ade los lomos de merluza y cuece a fuego suave 8-10 minutos, hasta que est\xE9n blancos y tiernos.",
          "Retira el pescado con cuidado y a\xF1ade el perejil picado al l\xEDquido de cocci\xF3n, removiendo para ligar la salsa.",
          "Sirve la merluza con la salsa verde por encima y las patatas cocidas al lado."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F990}",
        name: "Langostinos al ajillo con arroz",
        time: "25 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Pon a cocer el arroz en agua con sal 15-18 minutos.",
          "Pela los langostinos si lo prefieres, o d\xE9jalos enteros para m\xE1s sabor.",
          "Pica 2-3 dientes de ajo en l\xE1minas y, si te gusta el toque picante, una guindilla peque\xF1a.",
          "Calienta abundante aceite de oliva en una sart\xE9n y dora el ajo a fuego medio, sin que se queme.",
          "Sube el fuego, a\xF1ade los langostinos y saltea 2-3 minutos, hasta que cambien de color.",
          "Sirve los langostinos con su aceite de ajo por encima, acompa\xF1ados del arroz blanco escurrido."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Risotto de calabac\xEDn y parmesano",
        time: "30 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "calabacin", qty: 0.4 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Corta el calabac\xEDn en dados peque\xF1os.",
          "Calienta caldo en una olla aparte y mantenlo caliente a fuego bajo.",
          "Sofr\xEDe el calabac\xEDn en una sart\xE9n amplia con un poco de aceite 4-5 minutos.",
          "A\xF1ade el arroz y remueve 1-2 minutos para que se impregne.",
          "Incorpora el caldo caliente poco a poco, un cacillo cada vez, esperando a que se absorba antes de a\xF1adir m\xE1s, durante 16-18 minutos, removiendo a menudo.",
          "Cuando el arroz est\xE9 cremoso, retira del fuego y a\xF1ade el parmesano rallado, removiendo con energ\xEDa.",
          "Sirve inmediatamente, mientras est\xE1 bien meloso."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao confitado con pimientos",
        time: "35 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Corta los pimientos en tiras y \xE1salos en el horno a 200\xB0C durante 20 minutos, o salt\xE9alos en una sart\xE9n 10 minutos.",
          "Seca bien los lomos de bacalao desalado con papel de cocina.",
          "Cubre el fondo de una sart\xE9n con abundante aceite de oliva (debe cubrir el pescado) y calienta a fuego muy bajo, sin que llegue a hervir.",
          "Introduce el bacalao en el aceite templado y cocina 8-10 minutos a fuego muy suave, sin que el aceite burbujee, para que quede meloso.",
          "Retira con cuidado con una esp\xE1tula, escurriendo el exceso de aceite.",
          "Sirve el bacalao confitado con los pimientos asados al lado."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con boniato y reducci\xF3n de vino",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "boniato", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.15 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela el boniato, c\xF3rtalo en dados y horn\xE9alo con aceite y sal 25 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Sazona el solomillo y s\xE9llalo en una sart\xE9n caliente 1-2 minutos por cada lado.",
          "Termina de hacerlo al horno, junto al boniato, 12-15 minutos m\xE1s, hasta el punto que prefieras.",
          "Retira la carne y d\xE9jala reposar. En la misma sart\xE9n de sellar, a\xF1ade el vino blanco y deja reducir 3-4 minutos a fuego medio, removiendo para que se mezcle con los restos de la sart\xE9n.",
          "Corta el solomillo en medallones y sirve con la reducci\xF3n de vino por encima y el boniato asado al lado."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F958}",
        name: "Paella de marisco sencilla",
        time: "40 min",
        items: [{ id: "arroz", qty: 0.4 }, { id: "langostinos", qty: 0.4 }, { id: "asar", qty: 0.3 }],
        steps: [
          "Calienta caldo de pescado o marisco en una olla aparte y mantenlo caliente.",
          "Corta las verduras variadas en trozos peque\xF1os.",
          "En una paellera o sart\xE9n amplia y baja, sofr\xEDe las verduras con aceite 5-6 minutos.",
          "A\xF1ade el arroz y remueve 1-2 minutos para que se impregne del sofrito.",
          "Vierte el caldo caliente (el doble de volumen que de arroz) y reparte el arroz de forma uniforme por toda la sart\xE9n.",
          "Deja cocer sin remover a fuego medio-alto los primeros 10 minutos, y luego a fuego m\xE1s bajo otros 8-10 minutos.",
          "Cinco minutos antes de terminar, coloca los langostinos por encima para que se cocinen con el vapor del arroz.",
          "Deja reposar 3-5 minutos fuera del fuego, tapado con un pa\xF1o, antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Crema de setas con parmesano",
        time: "30 min",
        items: [{ id: "setas", qty: 0.5 }, { id: "leche", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Limpia las setas con un pa\xF1o h\xFAmedo y c\xF3rtalas en l\xE1minas.",
          "Saltea las setas en una sart\xE9n con un poco de aceite 6-7 minutos, hasta que se doren y suelten su aroma.",
          "A\xF1ade la leche y deja que se caliente a fuego suave, sin que llegue a hervir fuerte, 3-4 minutos.",
          "Tritura todo con la batidora hasta conseguir una crema fina (si te gusta con textura, reserva un par de l\xE1minas de setas para decorar).",
          "Vuelve a calentar la crema un par de minutos si se ha enfriado al triturar.",
          "Sirve bien caliente con parmesano rallado por encima."
        ]
      }
    }
  ];
  var MENU_SANA_2 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F966}",
        name: "Br\xF3coli salteado con pollo",
        time: "20 min",
        salud: 9,
        items: [{ id: "brocoli", qty: 0.4 }, { id: "pollo", qty: 0.5 }],
        steps: [
          "Separa el br\xF3coli en arbolitos peque\xF1os y l\xE1valos bien.",
          "Cu\xE9celo al vapor o en agua con sal 4-5 minutos, hasta que est\xE9 tierno pero firme. Escurre.",
          "Sazona el pollo con sal y pimienta y c\xF3rtalo en tiras.",
          "Calienta una sart\xE9n con una gota de aceite y saltea el pollo 4-5 minutos, hasta que est\xE9 dorado.",
          "A\xF1ade el br\xF3coli escurrido a la sart\xE9n y saltea 2 minutos m\xE1s, removiendo, para que se integren los sabores.",
          "Sirve caliente, con un chorrito de aceite de oliva si quieres."
        ]
      },
      cena: {
        emoji: "\u{1F957}",
        name: "Crema de esp\xE1rragos con huevo poch\xE9",
        time: "25 min",
        salud: 8,
        items: [{ id: "esparragos", qty: 1 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos y trocea el resto.",
          "Cu\xE9celos en agua con sal 10-12 minutos, hasta que est\xE9n muy tiernos.",
          "Escurre, reservando un poco del agua de cocci\xF3n, y tritura con la batidora hasta conseguir una crema fina.",
          "Para el huevo poch\xE9: en una olla peque\xF1a, calienta agua con un chorrito de vinagre sin que llegue a hervir fuerte.",
          "Casca el huevo en una taza y desliza con cuidado al agua, formando un remolino con una cuchara.",
          "Cocina 3 minutos, hasta que la clara est\xE9 cuajada y la yema l\xEDquida, y s\xEDrvelo sobre la crema caliente."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F33E}",
        name: "Quinoa con verduras y huevo",
        time: "20 min",
        salud: 8,
        items: [{ id: "quinoa", qty: 0.3 }, { id: "asar", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Enjuaga la quinoa bajo el grifo con un colador fino.",
          "Cu\xE9cela en agua con sal (el doble de volumen de agua que de quinoa) 12-15 minutos.",
          "Mientras, corta las verduras variadas en trozos peque\xF1os y salt\xE9alas con muy poco aceite 5-6 minutos.",
          "Cuece un huevo duro 9-10 minutos en agua hirviendo, enfr\xEDalo bajo el grifo y p\xE9lalo.",
          "Escurre la quinoa y m\xE9zclala con las verduras salteadas.",
          "Corta el huevo en cuartos y col\xF3calo por encima antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza con br\xF3coli al vapor",
        time: "20 min",
        salud: 10,
        items: [{ id: "merluza", qty: 0.5 }, { id: "brocoli", qty: 0.5 }],
        steps: [
          "Separa el br\xF3coli en arbolitos y l\xE1valo.",
          "Si tienes vaporera, cuece el br\xF3coli 5 minutos y a\xF1ade la merluza encima 8-10 minutos m\xE1s.",
          "Si no, cuece el br\xF3coli en agua con sal 5 minutos y la merluza en otra sart\xE9n con un poco de agua tapada 8-10 minutos.",
          "Comprueba que el pescado est\xE9 blanco y se separe con facilidad al pincharlo.",
          "Sirve con un chorrito de aceite de oliva y unas gotas de lim\xF3n."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F9AA}",
        name: "Ensalada de garbanzos con mejillones",
        time: "20 min",
        salud: 9,
        items: [{ id: "garbanzos", qty: 1 }, { id: "mejillones", qty: 0.4 }, { id: "ensalada", qty: 0.2 }],
        steps: [
          "Si los mejillones son frescos, l\xE1valos bien y cu\xE9celos al vapor 5-6 minutos, hasta que se abran. Desecha los que no se abran.",
          "Si son ya cocidos (en conserva o congelados cocidos), simplemente descongela o escurre.",
          "Escurre y enjuaga los garbanzos de bote.",
          "Lava y trocea la ensalada.",
          "Mezcla todo en un bol: garbanzos, mejillones sin la concha y la ensalada.",
          "Ali\xF1a con aceite de oliva, un toque de lim\xF3n y sal, y sirve templado o fr\xEDo."
        ]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de esp\xE1rragos",
        time: "20 min",
        salud: 8,
        items: [{ id: "esparragos", qty: 1 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos y trocea el resto en piezas peque\xF1as.",
          "Saltea los esp\xE1rragos en una sart\xE9n con una gota de aceite 5-6 minutos, hasta que est\xE9n tiernos.",
          "Bate los huevos en un bol con una pizca de sal.",
          "Mezcla los esp\xE1rragos salteados con el huevo batido.",
          "Vierte en la sart\xE9n a fuego suave y cuaja 3-4 minutos por lado."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo al horno con calabac\xEDn y zanahoria",
        time: "40 min",
        salud: 8,
        items: [{ id: "pollo", qty: 0.7 }, { id: "calabacin", qty: 0.3 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Corta el calabac\xEDn y la zanahoria en rodajas.",
          "Coloca el pollo y las verduras en una bandeja con aceite, sal y pimienta.",
          "Hornea 35 minutos, removiendo las verduras a mitad de cocci\xF3n.",
          "Comprueba que el pollo est\xE9 hecho pinchando la parte m\xE1s gruesa.",
          "Deja reposar 5 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F955}",
        name: "Crema de zanahoria con huevo duro",
        time: "30 min",
        salud: 8,
        items: [{ id: "zanahoria", qty: 0.7 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Pela y corta la zanahoria en rodajas.",
          "Cu\xE9cela en agua con sal 18-20 minutos, hasta que est\xE9 muy tierna.",
          "Mientras, cuece un huevo en otra olla 9-10 minutos, enfr\xEDalo y p\xE9lalo.",
          "Escurre la zanahoria, reservando un poco del agua, y tritura con la batidora hasta obtener una crema fina.",
          "Sirve la crema caliente con el huevo duro troceado por encima."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas con espinacas",
        time: "30 min",
        salud: 10,
        items: [{ id: "lentejas", qty: 1 }, { id: "espinacas", qty: 0.3 }],
        steps: [
          "Calienta las lentejas de bote, escurridas, en una olla con un poco de agua.",
          "A\xF1ade las espinacas frescas y deja que se ablanden 4-5 minutos, removiendo.",
          "Sazona con sal y un chorrito de aceite de oliva.",
          "Cocina 5 minutos m\xE1s a fuego suave para que se integren los sabores.",
          "Sirve caliente, sin necesidad de embutidos ni grasas a\xF1adidas."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al horno con esp\xE1rragos",
        time: "25 min",
        salud: 8,
        items: [{ id: "salmon", qty: 0.5 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Corta la parte le\xF1osa de los esp\xE1rragos.",
          "Coloca el salm\xF3n y los esp\xE1rragos en una bandeja con aceite, sal y unas rodajas de lim\xF3n.",
          "Hornea 15-18 minutos, hasta que el salm\xF3n est\xE9 hecho pero jugoso.",
          "Sirve directamente de la bandeja."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F963}",
        name: "Garbanzos con br\xF3coli",
        time: "25 min",
        salud: 10,
        items: [{ id: "garbanzos", qty: 1 }, { id: "brocoli", qty: 0.4 }],
        steps: [
          "Separa el br\xF3coli en arbolitos peque\xF1os y cu\xE9celo al vapor o en agua con sal 5 minutos.",
          "Escurre y enjuaga los garbanzos de bote.",
          "Calienta los garbanzos en una sart\xE9n con un poco de aceite y un toque de ajo si te gusta.",
          "A\xF1ade el br\xF3coli escurrido y saltea 2-3 minutos para que se integren.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza con tomate y calabac\xEDn",
        time: "25 min",
        salud: 8,
        items: [{ id: "merluza", qty: 0.5 }, { id: "tomateFrito", qty: 1 }, { id: "calabacin", qty: 0.3 }],
        steps: [
          "Corta el calabac\xEDn en rodajas finas.",
          "Saltea el calabac\xEDn en una sart\xE9n con un poco de aceite 5 minutos.",
          "A\xF1ade el tomate frito y deja que se caliente 2-3 minutos.",
          "Coloca los lomos de merluza sobre la salsa, tapa la sart\xE9n y cocina a fuego medio-bajo 8-10 minutos.",
          "Comprueba que el pescado est\xE9 blanco y tierno antes de servir."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F9AA}",
        name: "Mejillones a la marinera ligera",
        time: "25 min",
        salud: 7,
        items: [{ id: "mejillones", qty: 0.6 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Limpia los mejillones si son frescos, retirando las barbas.",
          "Calienta el tomate frito en una cazuela amplia con un diente de ajo picado.",
          "A\xF1ade los mejillones y tapa la cazuela.",
          "Cocina a fuego medio-alto 5-6 minutos, hasta que los mejillones se abran (desecha los que no se abran).",
          "Sirve calientes con su propia salsa, acompa\xF1ados de pan si quieres mojar."
        ]
      },
      cena: {
        emoji: "\u{1F96C}",
        name: "Crema de espinacas con huevo",
        time: "25 min",
        salud: 9,
        items: [{ id: "espinacas", qty: 0.4 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Lava bien las espinacas.",
          "Cu\xE9celas en una olla con muy poca agua 3-4 minutos, hasta que reduzcan.",
          "Tritura con la batidora junto con un poco del agua de cocci\xF3n hasta conseguir una crema fina.",
          "Cuece un huevo en otra olla 9-10 minutos, enfr\xEDalo, p\xE9lalo y troc\xE9alo.",
          "Sirve la crema caliente con el huevo troceado por encima."
        ]
      }
    }
  ];
  var MENU_NORMAL_2 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F35D}",
        name: "Macarrones con verduras y jam\xF3n",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "asar", qty: 0.3 }, { id: "jamonYork", qty: 1 }],
        steps: [
          "Pon a hervir agua con sal para la pasta.",
          "Cuece la pasta el tiempo que indique el paquete.",
          "Mientras, corta las verduras variadas en trozos peque\xF1os y salt\xE9alas con un poco de aceite 5-6 minutos.",
          "A\xF1ade el jam\xF3n cocido en taquitos a las verduras y saltea 1-2 minutos m\xE1s.",
          "Escurre la pasta y m\xE9zclala con las verduras y el jam\xF3n en la sart\xE9n.",
          "Sirve caliente, con queso rallado opcional por encima."
        ]
      },
      cena: {
        emoji: "\u{1F357}",
        name: "Pollo al ajillo con patatas",
        time: "35 min",
        items: [{ id: "pollo", qty: 0.8 }, { id: "patatas", qty: 0.5 }],
        steps: [
          "Pela y corta las patatas en dados, y cu\xE9celas en agua con sal 15 minutos, o fr\xEDelas si prefieres.",
          "Corta el pollo en trozos medianos y sazona con sal y pimienta.",
          "Calienta aceite en una sart\xE9n y dora 2-3 dientes de ajo en l\xE1minas, sin que se quemen.",
          "A\xF1ade el pollo y cocina 10-12 minutos a fuego medio, removiendo, hasta que est\xE9 dorado y hecho por dentro.",
          "A\xF1ade las patatas escurridas a la sart\xE9n y saltea 2-3 minutos m\xE1s para que se impregnen del sabor.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas con verduras",
        time: "35 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "zanahoria", qty: 0.2 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Pica la cebolla y la zanahoria en trozos peque\xF1os.",
          "Sofr\xEDe ambas en una olla con aceite 6-7 minutos.",
          "A\xF1ade las lentejas de bote, escurridas, y cubre con agua.",
          "Cuece a fuego medio-bajo 15-18 minutos, removiendo de vez en cuando.",
          "Ajusta de sal al final y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza con verduras variadas",
        time: "25 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "asar", qty: 0.5 }],
        steps: [
          "Corta las verduras variadas en trozos peque\xF1os.",
          "Salt\xE9alas en una sart\xE9n con un poco de aceite 6-7 minutos.",
          "Coloca los lomos de merluza encima de las verduras, tapa la sart\xE9n.",
          "Cocina a fuego medio-bajo 8-10 minutos, hasta que el pescado est\xE9 blanco y tierno.",
          "Sirve directamente de la sart\xE9n."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz con pollo y verduras",
        time: "30 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "pollo", qty: 0.5 }, { id: "asar", qty: 0.3 }],
        steps: [
          "Corta el pollo en trozos peque\xF1os y las verduras en dados.",
          "Sofr\xEDe el pollo en una cazuela baja con aceite 4-5 minutos, hasta que se dore.",
          "A\xF1ade las verduras y sofr\xEDe 3-4 minutos m\xE1s.",
          "Incorpora el arroz y remueve 1 minuto.",
          "Vierte el doble de agua o caldo que de arroz, sazona y cuece tapado 16-18 minutos sin destapar.",
          "Deja reposar 2 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F952}",
        name: "Tortilla de calabac\xEDn con ensalada",
        time: "25 min",
        items: [{ id: "calabacin", qty: 0.5 }, { id: "huevos", qty: 0.5 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Corta el calabac\xEDn en l\xE1minas finas.",
          "Saltea el calabac\xEDn en una sart\xE9n con un poco de aceite 5-6 minutos, hasta que est\xE9 tierno.",
          "Bate los huevos con una pizca de sal y mezcla con el calabac\xEDn.",
          "Vierte en la sart\xE9n y cuaja a fuego medio 3-4 minutos por lado.",
          "Sirve con la ensalada ali\xF1ada aparte."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F963}",
        name: "Garbanzos con chorizo",
        time: "30 min",
        items: [{ id: "garbanzos", qty: 1 }, { id: "chorizo", qty: 0.25 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Pica la cebolla y sofr\xEDela en una olla con un poco de aceite 5-6 minutos.",
          "A\xF1ade el chorizo en rodajas y sofr\xEDe 2-3 minutos m\xE1s.",
          "Incorpora los garbanzos de bote, escurridos, y un chorrito de agua.",
          "Cocina 5-6 minutos a fuego medio para que se integren los sabores.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n con patatas al horno",
        time: "35 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "patatas", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela y corta las patatas en rodajas finas, col\xF3calas en una bandeja con aceite y sal.",
          "Hornea las patatas solas 15 minutos.",
          "A\xF1ade el salm\xF3n encima o al lado, con un chorrito de aceite.",
          "Hornea 15 minutos m\xE1s, hasta que el salm\xF3n est\xE9 hecho pero jugoso."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F35D}",
        name: "Pasta a la carbonara sencilla",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "huevos", qty: 0.5 }, { id: "jamonYork", qty: 1 }],
        steps: [
          "Pon a hervir agua con sal y cuece la pasta el tiempo del paquete.",
          "Mientras, corta el jam\xF3n cocido en taquitos y d\xF3ralo en una sart\xE9n sin aceite 2-3 minutos.",
          "Bate los huevos en un bol con una pizca de pimienta.",
          "Escurre la pasta (reservando un poco de agua de cocci\xF3n) y m\xE9zclala fuera del fuego con el huevo batido, removiendo r\xE1pido para que cuaje suavemente sin cuajarse del todo (usa el calor residual).",
          "A\xF1ade el jam\xF3n dorado y un poco del agua reservada si queda muy seco.",
          "Sirve enseguida, reci\xE9n mezclado."
        ]
      },
      cena: {
        emoji: "\u{1F355}",
        name: "Pizza casera de at\xFAn y cebolla",
        time: "25 min",
        items: [{ id: "masaPizza", qty: 1 }, { id: "atun", qty: 1 }, { id: "cebolla", qty: 0.2 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Precalienta el horno a 220\xB0C con la bandeja dentro.",
          "Extiende la masa de pizza sobre papel de horno y reparte el tomate frito.",
          "Corta la cebolla en aros finos y rep\xE1rtela por encima.",
          "A\xF1ade el at\xFAn escurrido y desmenuzado.",
          "Hornea 12-15 minutos, hasta que los bordes est\xE9n dorados.",
          "Deja reposar 1-2 minutos antes de cortar."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F354}",
        name: "Hamburguesas con boniato",
        time: "30 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "panHamburguesa", qty: 1 }, { id: "boniato", qty: 0.6 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Pela el boniato, c\xF3rtalo en bastones y hornea con aceite y sal 25 minutos.",
          "Sazona la carne picada y forma las hamburguesas.",
          "Calienta una plancha y cocina las hamburguesas 3-4 minutos por lado.",
          "Tuesta el pan y monta con tus ingredientes favoritos.",
          "Sirve junto al boniato reci\xE9n horneado."
        ]
      },
      cena: {
        emoji: "\u{1F383}",
        name: "Crema de calabaza con tropezones de jam\xF3n",
        time: "30 min",
        items: [{ id: "calabaza", qty: 1 }, { id: "leche", qty: 0.2 }, { id: "jamonYork", qty: 1 }],
        steps: [
          "Pela y corta la calabaza en trozos, cu\xE9cela en agua con sal 15-18 minutos.",
          "Escurre y tritura con la leche caliente hasta obtener una crema fina.",
          "Corta el jam\xF3n cocido en taquitos peque\xF1os y d\xF3ralo en una sart\xE9n sin aceite 2 minutos, hasta que est\xE9 crujiente.",
          "Sirve la crema caliente con los tropezones de jam\xF3n por encima."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F361}",
        name: "Alb\xF3ndigas con arroz",
        time: "35 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "tomateFrito", qty: 1 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Sazona la carne picada y forma bolitas peque\xF1as con las manos h\xFAmedas.",
          "D\xF3ralas en una sart\xE9n con aceite por todos los lados, 4-5 minutos.",
          "A\xF1ade el tomate frito y cocina a fuego medio-bajo 10-12 minutos, hasta que se hagan por dentro.",
          "Cuece el arroz en agua con sal 15-18 minutos y escurre.",
          "Sirve las alb\xF3ndigas con su salsa junto al arroz."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza con patatas panadera",
        time: "40 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "patatas", qty: 0.5 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Corta las patatas en rodajas finas y la cebolla en juliana.",
          "Col\xF3calas en una bandeja con aceite, sal y un poco de agua, y hornea 15 minutos.",
          "A\xF1ade la merluza encima y hornea 12-15 minutos m\xE1s.",
          "Sirve directamente de la bandeja."
        ]
      }
    }
  ];
  var MENU_ELABORADA_2 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F344}",
        name: "Risotto de esp\xE1rragos con parmesano",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "esparragos", qty: 1 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos y trocea el resto.",
          "Calienta caldo en una olla aparte y mantenlo caliente a fuego bajo.",
          "Saltea los esp\xE1rragos en una sart\xE9n amplia con aceite 4-5 minutos.",
          "A\xF1ade el arroz y remueve 1-2 minutos.",
          "Incorpora el caldo caliente poco a poco, esperando a que se absorba antes de a\xF1adir m\xE1s, 16-18 minutos en total.",
          "Retira del fuego y a\xF1ade el parmesano rallado, removiendo con energ\xEDa hasta que quede meloso."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Ternera a la plancha con boniato",
        time: "35 min",
        items: [{ id: "ternera", qty: 0.5 }, { id: "boniato", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Pela el boniato, c\xF3rtalo en dados y hornea con aceite y sal 25 minutos.",
          "Saca el filete de ternera a temperatura ambiente y sazona con sal y pimienta.",
          "Calienta una plancha a fuego fuerte con una gota de aceite.",
          "Cocina la ternera 2-3 minutos por lado para un punto jugoso (m\xE1s tiempo si la prefieres m\xE1s hecha).",
          "Deja reposar 2 minutos antes de cortar y sirve con el boniato."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F9AA}",
        name: "Mejillones a la marinera con vino blanco",
        time: "25 min",
        items: [{ id: "mejillones", qty: 0.6 }, { id: "vinoBlancoCocina", qty: 0.2 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Limpia los mejillones, retirando las barbas si son frescos.",
          "Calienta el tomate frito en una cazuela con un diente de ajo picado.",
          "A\xF1ade el vino blanco y deja que reduzca 2 minutos.",
          "Incorpora los mejillones, tapa la cazuela y cocina a fuego medio-alto 5-6 minutos, hasta que se abran.",
          "Desecha los que no se hayan abierto y sirve calientes con la salsa."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Bacalao con esp\xE1rragos trigueros",
        time: "30 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos.",
          "Salt\xE9alos en una sart\xE9n con aceite 5-6 minutos, hasta que est\xE9n tiernos.",
          "Seca bien el bacalao desalado con papel de cocina.",
          "En otra sart\xE9n, d\xF3ralo con un poco de aceite 3-4 minutos por lado, hasta que est\xE9 dorado por fuera y tierno por dentro.",
          "Sirve el bacalao con los esp\xE1rragos al lado."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35D}",
        name: "Pasta con langostinos y ajo",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "langostinos", qty: 0.3 }],
        steps: [
          "Pon a hervir agua con sal y cuece la pasta el tiempo del paquete.",
          "Pela los langostinos si lo prefieres.",
          "Calienta aceite en una sart\xE9n con 2 dientes de ajo en l\xE1minas, sin que se quemen.",
          "A\xF1ade los langostinos y saltea 2-3 minutos, hasta que cambien de color.",
          "Escurre la pasta (reservando un poco de agua) y m\xE9zclala con los langostinos y su aceite de ajo.",
          "Sirve enseguida, reci\xE9n hecho."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo de cerdo con salsa de setas",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "setas", qty: 0.3 }],
        steps: [
          "Sazona el solomillo y s\xE9llalo en una sart\xE9n caliente 1-2 minutos por cada lado.",
          "Retira y reserva. Baja el fuego y a\xF1ade las setas en l\xE1minas a la misma sart\xE9n.",
          "Saltea las setas 5-6 minutos, hasta que se doren y suelten su jugo.",
          "A\xF1ade un poco de caldo o agua y deja reducir 2-3 minutos para hacer una salsa ligera.",
          "Vuelve a meter el solomillo en la sart\xE9n 5-6 minutos m\xE1s para que termine de hacerse en la salsa.",
          "Deja reposar 3 minutos antes de cortar en medallones."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F969}",
        name: "Ternera al horno con patatas",
        time: "40 min",
        items: [{ id: "ternera", qty: 0.5 }, { id: "patatas", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Pela y corta las patatas en rodajas, col\xF3calas en una bandeja con aceite y sal.",
          "Hornea las patatas 15 minutos.",
          "Sazona la ternera y s\xE9llala en una sart\xE9n caliente 1-2 minutos por lado.",
          "Col\xF3cala sobre las patatas y hornea todo junto 10-12 minutos m\xE1s, seg\xFAn el punto que prefieras.",
          "Deja reposar 5 minutos antes de cortar y servir."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Risotto de langostinos",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "langostinos", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Pela los langostinos y reserva las c\xE1scaras para dar sabor al caldo si quieres (opcional).",
          "Calienta caldo en una olla aparte y mantenlo caliente.",
          "Saltea los langostinos 2 minutos en una sart\xE9n amplia, retira y reserva.",
          "En la misma sart\xE9n, a\xF1ade el arroz y remueve 1-2 minutos.",
          "Incorpora el caldo caliente poco a poco, durante 16-18 minutos, removiendo a menudo.",
          "Cuando el arroz est\xE9 cremoso, a\xF1ade los langostinos reservados y el parmesano, mezclando bien antes de servir."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao confitado con br\xF3coli",
        time: "30 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "brocoli", qty: 0.4 }],
        steps: [
          "Separa el br\xF3coli en arbolitos y cu\xE9celo al vapor o en agua con sal 5 minutos.",
          "Seca bien el bacalao desalado con papel de cocina.",
          "Cubre el fondo de una sart\xE9n con abundante aceite y calienta a fuego muy bajo, sin que hierva.",
          "Confita el bacalao 8-10 minutos a fuego muy suave, hasta que est\xE9 melosos por dentro.",
          "Sirve el bacalao con el br\xF3coli al lado y un chorrito del aceite de confitar."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con reducci\xF3n de vino y esp\xE1rragos",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.15 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos y salt\xE9alos en una sart\xE9n con aceite 5-6 minutos. Reserva.",
          "Sazona el solomillo y s\xE9llalo en otra sart\xE9n caliente 1-2 minutos por lado.",
          "Termina de hacerlo a fuego medio 8-10 minutos m\xE1s, seg\xFAn el punto que prefieras. Retira y deja reposar.",
          "En la misma sart\xE9n, a\xF1ade el vino blanco y deja reducir 3-4 minutos, removiendo para recoger los restos del fondo.",
          "Corta el solomillo en medallones y sirve con la reducci\xF3n de vino por encima y los esp\xE1rragos al lado."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F958}",
        name: "Paella de mejillones y langostinos",
        time: "40 min",
        items: [{ id: "arroz", qty: 0.4 }, { id: "mejillones", qty: 0.4 }, { id: "langostinos", qty: 0.3 }],
        steps: [
          "Limpia los mejillones y pela los langostinos.",
          "Calienta caldo de pescado en una olla aparte y mantenlo caliente.",
          "En una paellera, sofr\xEDe un poco de ajo y tomate (o un sofrito simple) con aceite.",
          "A\xF1ade el arroz y remueve 1-2 minutos.",
          "Vierte el caldo caliente (el doble de volumen que de arroz) y reparte el arroz de forma uniforme.",
          "Cuece sin remover 10 minutos a fuego medio-alto, luego a\xF1ade los mejillones y langostinos, y sigue 8-10 minutos m\xE1s a fuego m\xE1s bajo.",
          "Deja reposar 3-5 minutos tapado con un pa\xF1o antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Ternera con setas al vino",
        time: "30 min",
        items: [{ id: "ternera", qty: 0.5 }, { id: "setas", qty: 0.3 }, { id: "vinoBlancoCocina", qty: 0.15 }],
        steps: [
          "Sazona la ternera y s\xE9llala en una sart\xE9n caliente 2 minutos por lado. Retira y reserva.",
          "En la misma sart\xE9n, saltea las setas en l\xE1minas 5-6 minutos, hasta que se doren.",
          "A\xF1ade el vino blanco y deja reducir 2-3 minutos.",
          "Vuelve a a\xF1adir la ternera a la sart\xE9n 1-2 minutos m\xE1s para que se caliente con la salsa.",
          "Sirve inmediatamente."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n con salsa de parmesano y esp\xE1rragos",
        time: "30 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "parmesano", qty: 1 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Corta la parte le\xF1osa de los esp\xE1rragos y salt\xE9alos con aceite 5-6 minutos. Reserva.",
          "Sazona el salm\xF3n y coc\xEDnalo en una sart\xE9n con un poco de aceite, 3-4 minutos por lado.",
          "Retira el salm\xF3n y reserva. En la misma sart\xE9n, a\xF1ade un poco de nata o leche y el parmesano rallado, removiendo a fuego suave hasta que se forme una salsa.",
          "Vierte la salsa sobre el salm\xF3n y sirve con los esp\xE1rragos al lado."
        ]
      },
      cena: {
        emoji: "\u{1F966}",
        name: "Crema de br\xF3coli con parmesano",
        time: "25 min",
        items: [{ id: "brocoli", qty: 0.6 }, { id: "leche", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Separa el br\xF3coli en arbolitos y cu\xE9celo en agua con sal 10-12 minutos, hasta que est\xE9 muy tierno.",
          "Escurre, reservando un poco del agua, y tritura con la leche caliente hasta obtener una crema fina.",
          "Calienta de nuevo si se ha enfriado al triturar.",
          "Sirve bien caliente con parmesano rallado por encima."
        ]
      }
    }
  ];
  var MENU_SANA_3 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1FADB}",
        name: "Jud\xEDas verdes con patata y huevo",
        time: "25 min",
        salud: 8,
        items: [{ id: "judiasVerdes", qty: 0.4 }, { id: "patatas", qty: 0.4 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Lava las jud\xEDas verdes y c\xF3rtalas en trozos, pela y trocea las patatas.",
          "Cuece ambas en agua con sal 15-18 minutos, hasta que est\xE9n tiernas.",
          "Cuece un huevo aparte 9-10 minutos, enfr\xEDalo y p\xE9lalo.",
          "Escurre las verduras y ali\xF1a con un chorrito de aceite de oliva.",
          "Sirve con el huevo troceado por encima."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Dorada al horno con verduras",
        time: "30 min",
        salud: 8,
        items: [{ id: "dorada", qty: 0.6 }, { id: "asar", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca la dorada y las verduras variadas en una bandeja con aceite, sal y pimienta.",
          "Hornea 20-25 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F957}",
        name: "Ensalada de quinoa con verduras",
        time: "20 min",
        salud: 9,
        items: [{ id: "quinoa", qty: 0.3 }, { id: "pimientos", qty: 0.3 }, { id: "ensalada", qty: 0.2 }],
        steps: [
          "Enjuaga la quinoa y cu\xE9cela en agua con sal 12-15 minutos.",
          "Corta los pimientos y la ensalada en trozos peque\xF1os.",
          "Escurre la quinoa y d\xE9jala templar.",
          "Mezcla la quinoa con las verduras crudas.",
          "Ali\xF1a con aceite, lim\xF3n y sal."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de coliflor",
        time: "25 min",
        salud: 8,
        items: [{ id: "coliflor", qty: 0.6 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela y trocea la coliflor.",
          "Cuece la coliflor en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de un chorrito de aceite de oliva."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo al lim\xF3n con guisantes",
        time: "25 min",
        salud: 8,
        items: [{ id: "pollo", qty: 0.6 }, { id: "guisantes", qty: 0.3 }],
        steps: [
          "Sazona el pollo y c\xF3rtalo en tiras.",
          "Saltea el pollo en una sart\xE9n con un poco de aceite 5-6 minutos.",
          "A\xF1ade los guisantes y un chorrito de zumo de lim\xF3n.",
          "Cocina 4-5 minutos m\xE1s, hasta que todo est\xE9 hecho.",
          "Sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F966}",
        name: "Br\xF3coli y zanahoria al vapor con huevo",
        time: "20 min",
        salud: 9,
        items: [{ id: "brocoli", qty: 0.4 }, { id: "zanahoria", qty: 0.2 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Prepara el br\xF3coli y la zanahoria en trozos.",
          "Cuece el br\xF3coli y la zanahoria al vapor o en agua 5 minutos.",
          "A\xF1ade un huevo escalfado y cocina al vapor 8-10 minutos m\xE1s.",
          "Comprueba que est\xE9 en su punto.",
          "Sirve con un chorrito de aceite de oliva."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n con jud\xEDas verdes",
        time: "25 min",
        salud: 8,
        items: [{ id: "salmon", qty: 0.5 }, { id: "judiasVerdes", qty: 0.4 }],
        steps: [
          "Sazona el salm\xF3n con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina el salm\xF3n 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara las jud\xEDas verdes cocidas al vapor 8 minutos.",
          "Deja reposar 2 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F957}",
        name: "Ensalada templada de garbanzos",
        time: "20 min",
        salud: 9,
        items: [{ id: "garbanzos", qty: 1 }, { id: "espinacas", qty: 0.2 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Saltea las espinacas y la zanahoria rallada en una sart\xE9n 4-5 minutos.",
          "A\xF1ade los garbanzos escurridos y calienta 3-4 minutos.",
          "Ali\xF1a con aceite y un toque de comino.",
          "Sirve templada."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F990}",
        name: "Gambas salteadas con verduras",
        time: "20 min",
        salud: 8,
        items: [{ id: "gambas", qty: 0.3 }, { id: "calabacin", qty: 0.3 }, { id: "pimientos", qty: 0.2 }],
        steps: [
          "Corta el calabac\xEDn y los pimientos en trozos peque\xF1os.",
          "Calienta una sart\xE9n con un poco de aceite a fuego medio-alto.",
          "Saltea el calabac\xEDn y los pimientos 5-6 minutos, removiendo.",
          "A\xF1ade las gambas y saltea 4-5 minutos m\xE1s, hasta que est\xE9 hecho.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de guisantes",
        time: "25 min",
        salud: 7,
        items: [{ id: "guisantes", qty: 0.5 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela y trocea los guisantes.",
          "Cuece los guisantes en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de unas hojas de menta opcional."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F41F}",
        name: "Merluza con pisto de verduras",
        time: "30 min",
        salud: 8,
        items: [{ id: "merluza", qty: 0.5 }, { id: "pimientos", qty: 0.3 }, { id: "calabacin", qty: 0.3 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Corta los pimientos y el calabac\xEDn en dados.",
          "Sofr\xEDelos en una sart\xE9n con aceite 8-10 minutos.",
          "A\xF1ade el tomate frito y cocina 5 minutos para hacer el pisto.",
          "Coloca la merluza sobre el pisto, tapa y cocina 8-10 minutos.",
          "Sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F957}",
        name: "Ensalada de espinacas y queso de cabra",
        time: "15 min",
        salud: 8,
        items: [{ id: "espinacas", qty: 0.3 }, { id: "quesoCabra", qty: 1 }, { id: "zanahoria", qty: 0.1 }],
        steps: [
          "Lava las espinacas frescas y col\xF3calas en un plato.",
          "A\xF1ade la zanahoria rallada.",
          "Corta el queso de cabra en rodajas y rep\xE1rtelo por encima.",
          "Ali\xF1a con aceite de oliva, sal y un toque de miel o vinagre.",
          "Sirve fr\xEDa."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F958}",
        name: "Guiso de garbanzos con verduras",
        time: "35 min",
        salud: 9,
        items: [{ id: "garbanzos", qty: 1 }, { id: "coliflor", qty: 0.3 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Pica la coliflor y la zanahoria en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade los garbanzos escurridos y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Dorada a la plancha con ensalada",
        time: "20 min",
        salud: 9,
        items: [{ id: "dorada", qty: 0.5 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Sazona la dorada con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina la dorada 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara la ensalada ali\xF1ada.",
          "Deja reposar 2 minutos antes de servir."
        ]
      }
    }
  ];
  var MENU_SANA_4 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F957}",
        name: "Pollo con ensalada de espinacas",
        time: "20 min",
        salud: 9,
        items: [{ id: "pollo", qty: 0.5 }, { id: "espinacas", qty: 0.3 }, { id: "zanahoria", qty: 0.1 }],
        steps: [
          "Sazona el pollo en tiras con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina el pollo en tiras 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara una ensalada de espinacas y zanahoria.",
          "Deja reposar 2 minutos antes de servir."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de calabac\xEDn y guisantes",
        time: "25 min",
        salud: 8,
        items: [{ id: "calabacin", qty: 0.4 }, { id: "guisantes", qty: 0.3 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela y trocea el calabac\xEDn y los guisantes.",
          "Cuece el calabac\xEDn y los guisantes en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de un chorrito de aceite."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao con pimientos asados",
        time: "30 min",
        salud: 8,
        items: [{ id: "bacalao", qty: 0.5 }, { id: "pimientos", qty: 0.4 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca el bacalao y los pimientos en tiras en una bandeja con aceite, sal y pimienta.",
          "Hornea 20-22 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      },
      cena: {
        emoji: "\u{1FADB}",
        name: "Jud\xEDas verdes salteadas con jam\xF3n",
        time: "20 min",
        salud: 7,
        items: [{ id: "judiasVerdes", qty: 0.4 }, { id: "jamonYork", qty: 1 }],
        steps: [
          "Cuece las jud\xEDas verdes en agua con sal 12-15 minutos.",
          "Escurre bien.",
          "Corta el jam\xF3n cocido en taquitos.",
          "Saltea las jud\xEDas con el jam\xF3n en una sart\xE9n con poco aceite 3-4 minutos.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz integral con verduras y huevo",
        time: "25 min",
        salud: 7,
        items: [{ id: "arroz", qty: 0.3 }, { id: "asar", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Cuece el arroz en agua con sal el tiempo del paquete.",
          "Saltea las verduras variadas en una sart\xE9n 5-6 minutos.",
          "Cuece un huevo a la plancha o escalfado.",
          "Mezcla el arroz con las verduras.",
          "Sirve con el huevo encima."
        ]
      },
      cena: {
        emoji: "\u{1F966}",
        name: "Coliflor gratinada ligera",
        time: "30 min",
        salud: 6,
        items: [{ id: "coliflor", qty: 0.5 }, { id: "quesoRallado", qty: 1 }],
        steps: [
          "Cuece la coliflor en arbolitos 10 minutos.",
          "Escurre y coloca en una fuente.",
          "Espolvorea un poco de queso rallado por encima.",
          "Gratina en el horno 8-10 minutos a 200\xB0C.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F990}",
        name: "Gambas con quinoa y verduras",
        time: "25 min",
        salud: 8,
        items: [{ id: "gambas", qty: 0.3 }, { id: "quinoa", qty: 0.3 }, { id: "pimientos", qty: 0.2 }],
        steps: [
          "Cuece la quinoa en agua con sal 12-15 minutos.",
          "Saltea los pimientos en dados 5 minutos.",
          "A\xF1ade las gambas y saltea 3 minutos m\xE1s.",
          "Mezcla con la quinoa escurrida.",
          "Sirve templado."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Merluza al vapor con guisantes",
        time: "25 min",
        salud: 8,
        items: [{ id: "merluza", qty: 0.5 }, { id: "guisantes", qty: 0.3 }],
        steps: [
          "Prepara los guisantes en trozos.",
          "Cuece los guisantes al vapor o en agua 5 minutos.",
          "A\xF1ade la merluza y cocina al vapor 8-10 minutos m\xE1s.",
          "Comprueba que est\xE9 en su punto.",
          "Sirve con un chorrito de aceite de oliva."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo guisado con verduras",
        time: "35 min",
        salud: 8,
        items: [{ id: "pollo", qty: 0.6 }, { id: "zanahoria", qty: 0.2 }, { id: "guisantes", qty: 0.2 }],
        steps: [
          "Pica la zanahoria y los guisantes en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade el pollo en trozos y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F957}",
        name: "Ensalada de garbanzos y at\xFAn",
        time: "15 min",
        salud: 9,
        items: [{ id: "garbanzos", qty: 1 }, { id: "atun", qty: 1 }, { id: "ensalada", qty: 0.2 }],
        steps: [
          "Escurre los garbanzos y el at\xFAn.",
          "Trocea la ensalada.",
          "Mezcla todo en un bol.",
          "Ali\xF1a con aceite, lim\xF3n y sal.",
          "Sirve fr\xEDo."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F41F}",
        name: "Dorada con verduras al horno",
        time: "30 min",
        salud: 9,
        items: [{ id: "dorada", qty: 0.6 }, { id: "calabacin", qty: 0.3 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca la dorada y el calabac\xEDn y la zanahoria en rodajas en una bandeja con aceite, sal y pimienta.",
          "Hornea 22-25 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de coliflor y zanahoria",
        time: "25 min",
        salud: 8,
        items: [{ id: "coliflor", qty: 0.4 }, { id: "zanahoria", qty: 0.3 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela y trocea la coliflor y la zanahoria.",
          "Cuece la coliflor y la zanahoria en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de un poco de perejil."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F957}",
        name: "Quinoa con verduras salteadas",
        time: "20 min",
        salud: 9,
        items: [{ id: "quinoa", qty: 0.3 }, { id: "calabacin", qty: 0.3 }, { id: "guisantes", qty: 0.2 }],
        steps: [
          "Cuece la quinoa en agua con sal 12-15 minutos.",
          "Saltea el calabac\xEDn en dados y los guisantes 6-7 minutos.",
          "Mezcla con la quinoa escurrida.",
          "Ali\xF1a con aceite y sal.",
          "Sirve templado."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al papillote con verduras",
        time: "25 min",
        salud: 8,
        items: [{ id: "salmon", qty: 0.5 }, { id: "judiasVerdes", qty: 0.3 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca el salm\xF3n y las jud\xEDas sobre papel de horno con lim\xF3n, aceite y sal.",
          "Cierra el papillote.",
          "Hornea 15-18 minutos.",
          "Abre con cuidado y sirve."
        ]
      }
    }
  ];
  var MENU_NORMAL_3 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F35D}",
        name: "Espaguetis con champi\xF1ones y jam\xF3n",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "champinones", qty: 0.3 }, { id: "jamonYork", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal.",
          "Cuece la pasta el tiempo que indique el paquete, removiendo de vez en cuando.",
          "Mientras, prepara los champi\xF1ones laminados salteados con el jam\xF3n en taquitos.",
          "Escurre la pasta reservando un poco de agua de cocci\xF3n.",
          "Mezcla la pasta con la salsa y sirve enseguida."
        ]
      },
      cena: {
        emoji: "\u{1F357}",
        name: "Pollo asado con pimientos",
        time: "35 min",
        items: [{ id: "pollo", qty: 0.7 }, { id: "pimientos", qty: 0.3 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Coloca el pollo y los pimientos en tiras en una bandeja con aceite, sal y pimienta.",
          "Hornea 30-35 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F958}",
        name: "Guiso de ternera con patatas",
        time: "45 min",
        items: [{ id: "terneraGuisar", qty: 0.5 }, { id: "patatas", qty: 0.4 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Pica la zanahoria, a\xF1adiendo las patatas a media cocci\xF3n en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade la ternera para guisar y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza rebozada con ensalada",
        time: "25 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "huevos", qty: 0.5 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Sazona la merluza en filetes.",
          "P\xE1salos por huevo batido y harina.",
          "Fr\xEDe en aceite caliente 2-3 minutos por lado.",
          "Escurre sobre papel de cocina.",
          "Sirve con la ensalada ali\xF1ada."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz con champi\xF1ones y pavo",
        time: "30 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "champinones", qty: 0.3 }, { id: "pavoFilete", qty: 0.4 }],
        steps: [
          "Corta el pavo en tiras y los champi\xF1ones en l\xE1minas.",
          "Sofr\xEDe el pavo en una cazuela 4-5 minutos.",
          "A\xF1ade los champi\xF1ones y saltea 3-4 minutos.",
          "Incorpora el arroz y el doble de agua o caldo.",
          "Cuece tapado 16-18 minutos y deja reposar."
        ]
      },
      cena: {
        emoji: "\u{1F95A}",
        name: "Revuelto de calabac\xEDn y gambas",
        time: "20 min",
        items: [{ id: "calabacin", qty: 0.3 }, { id: "gambas", qty: 0.2 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Corta el calabac\xEDn en dados peque\xF1os.",
          "Salt\xE9alo en una sart\xE9n con aceite 5 minutos.",
          "A\xF1ade las gambas y saltea 2 minutos.",
          "Incorpora los huevos batidos y remueve hasta cuajar.",
          "Sirve enseguida."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F354}",
        name: "Hamburguesa de pavo con patatas",
        time: "30 min",
        items: [{ id: "pavoPicado", qty: 0.5 }, { id: "panHamburguesa", qty: 1 }, { id: "patatas", qty: 0.5 }],
        steps: [
          "Sazona el pavo picado y forma las hamburguesas.",
          "Hornea las patatas en bastones 25 minutos a 200\xB0C.",
          "Cocina las hamburguesas a la plancha 4 minutos por lado.",
          "Tuesta el pan.",
          "Monta y sirve con las patatas."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de calabaza con picatostes",
        time: "30 min",
        items: [{ id: "calabaza", qty: 0.7 }, { id: "leche", qty: 0.2 }, { id: "pan", qty: 1 }],
        steps: [
          "Cuece la calabaza troceada 15-18 minutos.",
          "Tritura con la leche hasta obtener una crema.",
          "Corta el pan en daditos y tu\xE9stalos en la sart\xE9n.",
          "Sirve la crema con los picatostes por encima."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F958}",
        name: "Lentejas con verduras y chorizo",
        time: "35 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "zanahoria", qty: 0.2 }, { id: "chorizo", qty: 0.2 }],
        steps: [
          "Pica la zanahoria en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade las lentejas con el chorizo en rodajas y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Dorada al horno con patatas",
        time: "35 min",
        items: [{ id: "dorada", qty: 0.5 }, { id: "patatas", qty: 0.4 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca la dorada y las patatas en rodajas finas en una bandeja con aceite, sal y pimienta.",
          "Hornea 25-30 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F35D}",
        name: "Pasta con at\xFAn y tomate",
        time: "20 min",
        items: [{ id: "pasta", qty: 1 }, { id: "atun", qty: 1 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal.",
          "Cuece la pasta el tiempo que indique el paquete, removiendo de vez en cuando.",
          "Mientras, prepara el tomate frito con el at\xFAn escurrido.",
          "Escurre la pasta reservando un poco de agua de cocci\xF3n.",
          "Mezcla la pasta con la salsa y sirve enseguida."
        ]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de patatas y pimientos",
        time: "35 min",
        items: [{ id: "patatas", qty: 0.5 }, { id: "pimientos", qty: 0.2 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Fr\xEDe las patatas y los pimientos en l\xE1minas a fuego suave 15 minutos.",
          "Escurre el aceite.",
          "Bate los huevos y mezcla con las patatas.",
          "Cuaja la tortilla 3-4 minutos por lado.",
          "Sirve templada."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo al curry suave con arroz",
        time: "30 min",
        items: [{ id: "pollo", qty: 0.6 }, { id: "leche", qty: 0.2 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Corta el pollo en dados y d\xF3ralo en una sart\xE9n.",
          "A\xF1ade un poco de curry en polvo y la leche.",
          "Cocina a fuego suave 10 minutos para hacer la salsa.",
          "Cuece el arroz aparte.",
          "Sirve el pollo con su salsa sobre el arroz."
        ]
      },
      cena: {
        emoji: "\u{1F957}",
        name: "Ensalada completa con huevo",
        time: "15 min",
        items: [{ id: "ensalada", qty: 0.4 }, { id: "huevos", qty: 0.5 }, { id: "atun", qty: 1 }],
        steps: [
          "Cuece un huevo 9-10 minutos, enfr\xEDalo y p\xE9lalo.",
          "Trocea la ensalada.",
          "A\xF1ade el at\xFAn escurrido y el huevo en cuartos.",
          "Ali\xF1a con aceite, vinagre y sal.",
          "Sirve fr\xEDo."
        ]
      }
    }
  ];
  var MENU_NORMAL_4 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz a la cubana",
        time: "25 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "huevos", qty: 0.5 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Cuece el arroz en agua con sal.",
          "Calienta el tomate frito.",
          "Fr\xEDe un huevo por persona.",
          "Sirve el arroz con el tomate y el huevo frito encima.",
          "Listo para servir."
        ]
      },
      cena: {
        emoji: "\u{1F357}",
        name: "Pollo a la plancha con verduras",
        time: "25 min",
        items: [{ id: "pollo", qty: 0.6 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Sazona el pollo con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina el pollo 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara las verduras salteadas.",
          "Deja reposar 2 minutos antes de servir."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F35D}",
        name: "Macarrones bolo\xF1esa",
        time: "30 min",
        items: [{ id: "pasta", qty: 1 }, { id: "carnePicada", qty: 0.4 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal.",
          "Cuece la pasta el tiempo que indique el paquete, removiendo de vez en cuando.",
          "Mientras, prepara la carne picada dorada con el tomate frito.",
          "Escurre la pasta reservando un poco de agua de cocci\xF3n.",
          "Mezcla la pasta con la salsa y sirve enseguida."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza en salsa verde",
        time: "30 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "guisantes", qty: 0.2 }],
        steps: [
          "Calienta un poco de caldo en una sart\xE9n baja.",
          "A\xF1ade perejil picado y los guisantes.",
          "Coloca la merluza y cuece a fuego suave 8-10 minutos.",
          "Mueve la sart\xE9n para ligar la salsa.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F958}",
        name: "Ternera estofada con guisantes",
        time: "45 min",
        items: [{ id: "terneraGuisar", qty: 0.5 }, { id: "guisantes", qty: 0.2 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Pica la zanahoria y los guisantes en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade la ternera para guisar y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F355}",
        name: "Pizza de champi\xF1ones y jam\xF3n",
        time: "25 min",
        items: [{ id: "masaPizza", qty: 1 }, { id: "champinones", qty: 0.2 }, { id: "jamonYork", qty: 1 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Precalienta el horno a 220\xB0C.",
          "Extiende la masa y reparte el tomate.",
          "A\xF1ade los champi\xF1ones laminados y el jam\xF3n.",
          "Hornea 12-15 minutos.",
          "Sirve reci\xE9n hecha."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F357}",
        name: "Muslos de pollo al horno con boniato",
        time: "40 min",
        items: [{ id: "pollo", qty: 0.8 }, { id: "boniato", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Coloca los muslos de pollo y el boniato en dados en una bandeja con aceite, sal y pimienta.",
          "Hornea 35-40 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      },
      cena: {
        emoji: "\u{1F95A}",
        name: "Tortilla de champi\xF1ones",
        time: "20 min",
        items: [{ id: "champinones", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: [
          "Lamina los champi\xF1ones y salt\xE9alos 5-6 minutos.",
          "Bate los huevos con sal.",
          "Mezcla con los champi\xF1ones.",
          "Cuaja la tortilla 3-4 minutos por lado.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz con gambas y verduras",
        time: "30 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "gambas", qty: 0.3 }, { id: "pimientos", qty: 0.2 }],
        steps: [
          "Sofr\xEDe los pimientos en dados.",
          "A\xF1ade el arroz y rehoga 1 minuto.",
          "Vierte el doble de caldo y cuece 16-18 minutos.",
          "A\xF1ade las gambas a media cocci\xF3n.",
          "Deja reposar y sirve."
        ]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Crema de zanahoria y patata",
        time: "25 min",
        items: [{ id: "zanahoria", qty: 0.4 }, { id: "patatas", qty: 0.3 }, { id: "leche", qty: 0.2 }],
        steps: [
          "Pela y trocea la zanahoria y la patata.",
          "Cuece la zanahoria y la patata en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de un chorrito de aceite."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F958}",
        name: "Garbanzos guisados con espinacas",
        time: "30 min",
        items: [{ id: "garbanzos", qty: 1 }, { id: "espinacas", qty: 0.3 }, { id: "chorizo", qty: 0.15 }],
        steps: [
          "Pica las espinacas, a\xF1adidas al final en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade los garbanzos con el chorizo y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n a la plancha con verduras",
        time: "25 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "calabacin", qty: 0.3 }],
        steps: [
          "Sazona el salm\xF3n con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina el salm\xF3n 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara el calabac\xEDn salteado.",
          "Deja reposar 2 minutos antes de servir."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F354}",
        name: "Hamburguesas caseras con ensalada",
        time: "25 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "panHamburguesa", qty: 1 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Sazona la carne y forma las hamburguesas.",
          "Coc\xEDnalas a la plancha 4 minutos por lado.",
          "Tuesta el pan.",
          "Monta con la ensalada.",
          "Sirve con guarnici\xF3n al gusto."
        ]
      },
      cena: {
        emoji: "\u{1F35D}",
        name: "Espaguetis con gambas al ajillo",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "gambas", qty: 0.3 }],
        steps: [
          "Pon a hervir agua abundante con sal.",
          "Cuece la pasta el tiempo que indique el paquete, removiendo de vez en cuando.",
          "Mientras, prepara las gambas salteadas con ajo en l\xE1minas.",
          "Escurre la pasta reservando un poco de agua de cocci\xF3n.",
          "Mezcla la pasta con la salsa y sirve enseguida."
        ]
      }
    }
  ];
  var MENU_ELABORADA_3 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F990}",
        name: "Risotto de gambas",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "gambas", qty: 0.3 }, { id: "parmesano", qty: 1 }, { id: "vinoBlancoCocina", qty: 0.15 }],
        steps: [
          "Saltea las gambas 2 minutos y reserva.",
          "Rehoga el arroz con un poco de aceite.",
          "A\xF1ade el vino y deja evaporar.",
          "Incorpora caldo caliente poco a poco 16-18 minutos.",
          "Termina con las gambas y el parmesano."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con salsa de champi\xF1ones",
        time: "35 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "champinones", qty: 0.3 }],
        steps: [
          "Sella el solomillo 2 minutos por lado y reserva.",
          "Saltea los champi\xF1ones laminados 5 minutos.",
          "A\xF1ade un poco de caldo y nata, reduce 3 minutos.",
          "Vuelve a meter el solomillo 5 minutos.",
          "Corta en medallones y sirve con la salsa."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F420}",
        name: "Dorada a la sal con verduras",
        time: "40 min",
        items: [{ id: "dorada", qty: 0.6 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Precalienta el horno a 200\xB0C.",
          "Cubre la dorada con sal gruesa h\xFAmeda.",
          "Hornea 25-30 minutos.",
          "Saltea las verduras como guarnici\xF3n.",
          "Retira la costra de sal y sirve."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Pasta con champi\xF1ones y queso de cabra",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "champinones", qty: 0.3 }, { id: "quesoCabra", qty: 1 }],
        steps: [
          "Pon a hervir agua abundante con sal.",
          "Cuece la pasta el tiempo que indique el paquete, removiendo de vez en cuando.",
          "Mientras, prepara los champi\xF1ones salteados con el queso de cabra desmenuzado.",
          "Escurre la pasta reservando un poco de agua de cocci\xF3n.",
          "Mezcla la pasta con la salsa y sirve enseguida."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F9AA}",
        name: "Mejillones al vino blanco",
        time: "25 min",
        items: [{ id: "mejillones", qty: 0.6 }, { id: "vinoBlancoCocina", qty: 0.2 }],
        steps: [
          "Limpia los mejillones.",
          "Sofr\xEDe ajo picado en una cazuela.",
          "A\xF1ade el vino y los mejillones, tapa.",
          "Cocina 5-6 minutos hasta que se abran.",
          "Sirve con su caldo."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Ternera con pimientos",
        time: "30 min",
        items: [{ id: "ternera", qty: 0.5 }, { id: "pimientos", qty: 0.3 }],
        steps: [
          "Corta los pimientos en trozos peque\xF1os.",
          "Calienta una sart\xE9n con un poco de aceite a fuego medio-alto.",
          "Saltea los pimientos 5-6 minutos, removiendo.",
          "A\xF1ade la ternera en tiras y saltea 4-5 minutos m\xE1s, hasta que est\xE9 hecho.",
          "Ajusta de sal y sirve caliente."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F990}",
        name: "Gambas al ajillo con arroz",
        time: "25 min",
        items: [{ id: "gambas", qty: 0.4 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Cuece el arroz aparte.",
          "Dora ajo en l\xE1minas en aceite abundante.",
          "A\xF1ade las gambas y guindilla, saltea 3 minutos.",
          "Sirve sobre el arroz con su aceite.",
          "Listo para servir."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Bacalao gratinado",
        time: "35 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "quesoRallado", qty: 1 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Coloca el bacalao en una fuente con el tomate.",
          "Cubre con queso rallado.",
          "Gratina al horno 12-15 minutos a 200\xB0C.",
          "Deja reposar 2 minutos.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F969}",
        name: "Solomillo al horno con boniato",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "boniato", qty: 0.5 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca el solomillo sellado y el boniato en dados en una bandeja con aceite, sal y pimienta.",
          "Hornea 15-18 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Risotto de champi\xF1ones",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "champinones", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Saltea los champi\xF1ones y reserva la mitad.",
          "Rehoga el arroz 1 minuto.",
          "A\xF1ade caldo caliente poco a poco 16-18 minutos.",
          "Termina con parmesano y los champi\xF1ones reservados.",
          "Sirve meloso."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F420}",
        name: "Dorada al horno con patatas panadera",
        time: "40 min",
        items: [{ id: "dorada", qty: 0.6 }, { id: "patatas", qty: 0.4 }, { id: "cebolla", qty: 0.15 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca la dorada y las patatas y cebolla en rodajas en una bandeja con aceite, sal y pimienta.",
          "Hornea 30 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      },
      cena: {
        emoji: "\u{1F990}",
        name: "Langostinos a la plancha con ensalada",
        time: "20 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "ensalada", qty: 0.3 }],
        steps: [
          "Sazona los langostinos con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina los langostinos 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara la ensalada.",
          "Deja reposar 2 minutos antes de servir."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F969}",
        name: "Ternera guisada al vino tinto",
        time: "45 min",
        items: [{ id: "terneraGuisar", qty: 0.5 }, { id: "zanahoria", qty: 0.2 }, { id: "vinoBlancoCocina", qty: 0.2 }],
        steps: [
          "Pica la zanahoria en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade la ternera para guisar con el vino y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F9AA}",
        name: "Mejillones gratinados",
        time: "30 min",
        items: [{ id: "mejillones", qty: 0.5 }, { id: "quesoRallado", qty: 1 }],
        steps: [
          "Cuece los mejillones al vapor hasta que se abran.",
          "Retira media concha.",
          "Cubre con queso rallado y un poco de pan rallado.",
          "Gratina 5-6 minutos.",
          "Sirve caliente."
        ]
      }
    }
  ];
  var MENU_ELABORADA_4 = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F344}",
        name: "Risotto de queso de cabra y champi\xF1ones",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "champinones", qty: 0.3 }, { id: "quesoCabra", qty: 1 }],
        steps: [
          "Saltea los champi\xF1ones laminados.",
          "Rehoga el arroz 1 minuto.",
          "A\xF1ade caldo caliente poco a poco 16-18 minutos.",
          "Termina con el queso de cabra desmenuzado.",
          "Sirve cremoso."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con reducci\xF3n de vino",
        time: "35 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.15 }, { id: "patatas", qty: 0.3 }],
        steps: [
          "Sella el solomillo y res\xE9rvalo.",
          "Cuece las patatas en dados.",
          "Reduce el vino en la sart\xE9n 3-4 minutos.",
          "Termina el solomillo en la salsa.",
          "Corta y sirve con las patatas."
        ]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F990}",
        name: "Paella de marisco",
        time: "45 min",
        items: [{ id: "arroz", qty: 0.4 }, { id: "gambas", qty: 0.3 }, { id: "mejillones", qty: 0.3 }],
        steps: [
          "Calienta caldo de pescado.",
          "Sofr\xEDe un poco de tomate y ajo en la paellera.",
          "A\xF1ade el arroz y rehoga.",
          "Vierte el caldo y reparte el arroz, cuece 18 minutos.",
          "A\xF1ade el marisco a media cocci\xF3n y deja reposar."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Dorada con salsa de almendras",
        time: "30 min",
        items: [{ id: "dorada", qty: 0.5 }, { id: "asar", qty: 0.3 }],
        steps: [
          "Hornea la dorada con verduras 20 minutos.",
          "Tritura almendras con ajo y un poco de caldo.",
          "Calienta esta salsa en una sart\xE9n.",
          "Vierte sobre la dorada.",
          "Sirve caliente."
        ]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F969}",
        name: "Ternera a la pimienta con patatas",
        time: "35 min",
        items: [{ id: "ternera", qty: 0.5 }, { id: "patatas", qty: 0.4 }],
        steps: [
          "Sazona la ternera con pimienta machacada.",
          "S\xE9llala 3 minutos por lado.",
          "A\xF1ade un poco de nata y caldo, reduce.",
          "Sirve con patatas cocidas o fritas.",
          "Listo para servir."
        ]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Crema de champi\xF1ones con parmesano",
        time: "30 min",
        items: [{ id: "champinones", qty: 0.5 }, { id: "leche", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: [
          "Pela y trocea los champi\xF1ones salteados con la leche.",
          "Cuece los champi\xF1ones salteados con la leche en agua con sal 15-18 minutos, hasta que est\xE9 muy tierno.",
          "Escurre reservando un poco del agua y tritura con la batidora hasta obtener una crema fina.",
          "Ajusta la textura con el agua reservada si hace falta.",
          "Sirve caliente acompa\xF1ado de parmesano rallado."
        ]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F9AA}",
        name: "Mejillones a la marinera con gambas",
        time: "30 min",
        items: [{ id: "mejillones", qty: 0.5 }, { id: "gambas", qty: 0.2 }, { id: "tomateFrito", qty: 1 }],
        steps: [
          "Sofr\xEDe ajo y a\xF1ade el tomate frito.",
          "Incorpora las gambas y saltea 2 minutos.",
          "A\xF1ade los mejillones y tapa.",
          "Cocina 5-6 minutos hasta que se abran.",
          "Sirve con su salsa."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con verduras al horno",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "asar", qty: 0.4 }],
        steps: [
          "Precalienta el horno a 190\xB0C.",
          "Coloca el solomillo sellado y las verduras variadas en una bandeja con aceite, sal y pimienta.",
          "Hornea 18-20 minutos, dando la vuelta a mitad de cocci\xF3n.",
          "Comprueba el punto antes de servir.",
          "Deja reposar unos minutos."
        ]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F420}",
        name: "Bacalao confitado con pimientos",
        time: "35 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "pimientos", qty: 0.4 }],
        steps: [
          "Asa los pimientos en tiras 20 minutos.",
          "Confita el bacalao en aceite a fuego muy bajo 8-10 minutos.",
          "Escurre con cuidado.",
          "Sirve sobre los pimientos.",
          "Riega con un poco del aceite."
        ]
      },
      cena: {
        emoji: "\u{1F990}",
        name: "Risotto de langostinos y esp\xE1rragos",
        time: "35 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "langostinos", qty: 0.3 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Saltea los langostinos y los esp\xE1rragos troceados.",
          "Rehoga el arroz 1 minuto.",
          "A\xF1ade caldo caliente poco a poco 16-18 minutos.",
          "Incorpora el marisco y los esp\xE1rragos al final.",
          "Sirve enseguida."
        ]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F969}",
        name: "Ternera guisada con champi\xF1ones",
        time: "45 min",
        items: [{ id: "terneraGuisar", qty: 0.5 }, { id: "champinones", qty: 0.3 }, { id: "zanahoria", qty: 0.2 }],
        steps: [
          "Pica la zanahoria y los champi\xF1ones en trozos peque\xF1os y sofr\xEDelos en una olla con aceite 6-7 minutos.",
          "A\xF1ade la ternera para guisar y d\xF3ralo un par de minutos.",
          "Cubre con agua o caldo y lleva a ebullici\xF3n.",
          "Baja el fuego y cuece a fuego suave 25-30 minutos, hasta que todo est\xE9 tierno.",
          "Ajusta de sal y sirve caliente."
        ]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Dorada a la plancha con esp\xE1rragos",
        time: "25 min",
        items: [{ id: "dorada", qty: 0.5 }, { id: "esparragos", qty: 1 }],
        steps: [
          "Sazona la dorada con sal y pimienta.",
          "Calienta una plancha o sart\xE9n a fuego fuerte con una gota de aceite.",
          "Cocina la dorada 3-4 minutos por lado, hasta que est\xE9 dorado.",
          "Mientras, prepara los esp\xE1rragos salteados.",
          "Deja reposar 2 minutos antes de servir."
        ]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F990}",
        name: "Langostinos al curry con arroz",
        time: "30 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "leche", qty: 0.2 }, { id: "arroz", qty: 0.3 }],
        steps: [
          "Cuece el arroz aparte.",
          "Saltea los langostinos 2 minutos y reserva.",
          "Haz una salsa con curry y leche, cuece 5 minutos.",
          "A\xF1ade los langostinos a la salsa.",
          "Sirve sobre el arroz."
        ]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con salsa de queso de cabra",
        time: "35 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "quesoCabra", qty: 1 }],
        steps: [
          "Sella el solomillo y res\xE9rvalo.",
          "Funde el queso de cabra con un poco de leche en la sart\xE9n.",
          "Termina el solomillo en la salsa 5 minutos.",
          "Corta en medallones.",
          "Sirve con la salsa por encima."
        ]
      }
    }
  ];
  var STYLES = {
    sana: { label: "Sana", desc: "M\xE1s verdura, legumbre y pescado; menos procesados y frituras.", weeks: [MENU_SANA, MENU_SANA_2, MENU_SANA_3, MENU_SANA_4] },
    normal: { label: "Normal", desc: "El equilibrio habitual entre sencillez, variedad y coste.", weeks: [MENU_NORMAL, MENU_NORMAL_2, MENU_NORMAL_3, MENU_NORMAL_4] },
    elaborada: { label: "Elaborada", desc: "Ingredientes m\xE1s sofisticados: solomillo, marisco, risottos.", weeks: [MENU_ELABORADA, MENU_ELABORADA_2, MENU_ELABORADA_3, MENU_ELABORADA_4] }
  };
  var NIVELES = [
    { key: "sana", emoji: "\u{1F7E2}", label: "Econ\xF3mico", sub: "Sana y sencilla" },
    { key: "normal", emoji: "\u{1F7E1}", label: "Equilibrado", sub: "Lo habitual" },
    { key: "elaborada", emoji: "\u{1F534}", label: "Variado / gourmet", sub: "M\xE1s sofisticado" }
  ];
  var OBJETIVOS = [
    { key: "ahorrar", emoji: "\u{1F4B0}", label: "Ahorrar" },
    { key: "saludable", emoji: "\u{1F966}", label: "Comer saludable" },
    { key: "equilibrado", emoji: "\u2696\uFE0F", label: "Equilibrado" }
  ];
  var fmt = (n) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var fmtNum = (n) => n.toLocaleString("es-ES", { maximumFractionDigits: n < 10 ? 2 : 0 });
  var formatQty = (qty, unit) => {
    if (unit === "kg" && qty < 1) return `${fmtNum(qty * 1e3)} g`;
    if (unit === "litro" && qty < 1) return `${fmtNum(qty * 1e3)} ml`;
    if (unit === "litro") return `${fmtNum(qty)} l`;
    return `${fmtNum(qty)} ${unit}`;
  };
  function App() {
    const [prices, setPrices] = useState(DEFAULT_PRICES);
    const [loaded, setLoaded] = useState(false);
    const [openMeal, setOpenMeal] = useState(null);
    const [editing, setEditing] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");
    const [servings, setServings] = useState(BASE_SERVINGS);
    const [extrasQty, setExtrasQty] = useState({});
    const [showExtras, setShowExtras] = useState(false);
    const [ingresos, setIngresos] = useState("");
    const [menuStyle, setMenuStyle] = useState("normal");
    const [weekNumber, setWeekNumber] = useState(1);
    const [historial, setHistorial] = useState([]);
    const [historyMsg, setHistoryMsg] = useState("");
    const [openCategories, setOpenCategories] = useState({});
    const [avoidIds, setAvoidIds] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [presupuestoSemanal, setPresupuestoSemanal] = useState("");
    const [objetivo, setObjetivo] = useState("equilibrado");
    const [pesoActual, setPesoActual] = useState("");
    const [pesoObjetivo, setPesoObjetivo] = useState("");
    const [fechaObjetivoPeso, setFechaObjetivoPeso] = useState("");
    const [pesoHistorial, setPesoHistorial] = useState([]);
    const [pesoMsg, setPesoMsg] = useState("");
    const [swaps, setSwaps] = useState({});
    const [swapPickerKey, setSwapPickerKey] = useState(null);
    const [selectedDay, setSelectedDay] = useState("Lunes");
    const [shareMsg, setShareMsg] = useState("");
    const [mercadonaReal, setMercadonaReal] = useState(false);
    useEffect(() => {
      (async () => {
        try {
          const res0 = await fetch("./precios-mercadona.json");
          if (res0.ok) {
            const real = await res0.json();
            setPrices((prev) => {
              const merged = { ...prev };
              Object.keys(real).forEach((k) => {
                if (merged[k] && typeof real[k] === "number") {
                  merged[k] = { ...merged[k], mercadona: real[k] };
                }
              });
              return merged;
            });
            setMercadonaReal(true);
          }
        } catch (e) {
        }
        try {
          const res = await storage.get("precios-custom");
          if (res && res.value) {
            const custom = JSON.parse(res.value);
            setPrices((prev) => {
              const merged = { ...prev };
              Object.keys(custom).forEach((k) => {
                if (merged[k]) merged[k] = { ...merged[k], ...custom[k] };
              });
              return merged;
            });
          }
        } catch (e) {
        }
        try {
          const res2 = await storage.get("raciones");
          if (res2 && res2.value) setServings(parseInt(res2.value, 10));
        } catch (e) {
        }
        try {
          const res3 = await storage.get("extras-seleccionados");
          if (res3 && res3.value) setExtrasQty(JSON.parse(res3.value));
        } catch (e) {
        }
        try {
          const res4 = await storage.get("ingresos-mensuales");
          if (res4 && res4.value) setIngresos(res4.value);
        } catch (e) {
        }
        try {
          const res5 = await storage.get("estilo-menu");
          if (res5 && res5.value) setMenuStyle(res5.value);
        } catch (e) {
        }
        try {
          const res5b = await storage.get("semana-numero");
          if (res5b && res5b.value) setWeekNumber(parseInt(res5b.value, 10));
        } catch (e) {
        }
        try {
          const res6 = await storage.get("historial-semanas");
          if (res6 && res6.value) setHistorial(JSON.parse(res6.value));
        } catch (e) {
        }
        try {
          const res7 = await storage.get("ingredientes-evitar");
          if (res7 && res7.value) setAvoidIds(JSON.parse(res7.value));
        } catch (e) {
        }
        try {
          const res8 = await storage.get("favoritos");
          if (res8 && res8.value) setFavoritos(JSON.parse(res8.value));
        } catch (e) {
        }
        try {
          const res9 = await storage.get("lista-compra-comprados");
          if (res9 && res9.value) setBoughtItems(JSON.parse(res9.value));
        } catch (e) {
        }
        try {
          const res10 = await storage.get("presupuesto-semanal");
          if (res10 && res10.value) setPresupuestoSemanal(res10.value);
        } catch (e) {
        }
        try {
          const res11 = await storage.get("objetivo-usuario");
          if (res11 && res11.value) setObjetivo(res11.value);
        } catch (e) {
        }
        try {
          const res12 = await storage.get("peso-actual");
          if (res12 && res12.value) setPesoActual(res12.value);
        } catch (e) {
        }
        try {
          const res13 = await storage.get("peso-objetivo");
          if (res13 && res13.value) setPesoObjetivo(res13.value);
        } catch (e) {
        }
        try {
          const res14 = await storage.get("fecha-objetivo-peso");
          if (res14 && res14.value) setFechaObjetivoPeso(res14.value);
        } catch (e) {
        }
        try {
          const res15 = await storage.get("peso-historial");
          if (res15 && res15.value) setPesoHistorial(JSON.parse(res15.value));
        } catch (e) {
        }
        try {
          const res16 = await storage.get("intercambios-platos");
          if (res16 && res16.value) setSwaps(JSON.parse(res16.value));
        } catch (e) {
        }
        setLoaded(true);
      })();
    }, []);
    const saveExtras = async (next) => {
      try {
        await storage.set("extras-seleccionados", JSON.stringify(next));
      } catch (e) {
      }
    };
    const toggleExtra = (id) => {
      setExtrasQty((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = 1;
        saveExtras(next);
        return next;
      });
    };
    const changeExtraQty = (id, delta) => {
      setExtrasQty((prev) => {
        const current = prev[id] || 1;
        const updated = Math.max(1, current + delta);
        const next = { ...prev, [id]: updated };
        saveExtras(next);
        return next;
      });
    };
    const updatePrice = (ingId, storeId, value) => {
      setPrices((prev) => ({
        ...prev,
        [ingId]: { ...prev[ingId], [storeId]: value === "" ? "" : parseFloat(value) }
      }));
    };
    const savePrices = async () => {
      try {
        const toSave = {};
        Object.keys(prices).forEach((k) => {
          toSave[k] = STORES.reduce((acc, s) => ({ ...acc, [s.id]: prices[k][s.id] }), {});
        });
        await storage.set("precios-custom", JSON.stringify(toSave));
        setSaveMsg("Precios guardados \u2713");
        setTimeout(() => setSaveMsg(""), 2e3);
      } catch (e) {
        setSaveMsg("No se pudieron guardar");
      }
    };
    const resetPrices = async () => {
      setPrices(DEFAULT_PRICES);
      try {
        await storage.delete("precios-custom");
      } catch (e) {
      }
    };
    const setHousehold = async (n) => {
      setServings(n);
      try {
        await storage.set("raciones", String(n));
      } catch (e) {
      }
    };
    const factor = servings / BASE_SERVINGS;
    const recipeCost = useMemo(() => {
      return (recipe, storeId) => recipe.items.reduce((sum, it) => {
        const p = prices[it.id]?.[storeId];
        return sum + (typeof p === "number" ? p * it.qty * factor : 0);
      }, 0);
    }, [prices, factor]);
    const activeMenu = STYLES[menuStyle].weeks[weekNumber - 1];
    const getMeal = (day, mealType) => {
      const key = `${menuStyle}|${weekNumber}|${day}|${mealType}`;
      const overrideDay = swaps[key];
      if (overrideDay) {
        const sourceDay = activeMenu.find((d) => d.day === overrideDay);
        if (sourceDay) return sourceDay[mealType];
      }
      const original = activeMenu.find((d) => d.day === day);
      return original[mealType];
    };
    const swapMeal = (day, mealType, fromDay) => {
      const key = `${menuStyle}|${weekNumber}|${day}|${mealType}`;
      setSwaps((prev) => {
        const next = { ...prev };
        if (fromDay === day) delete next[key];
        else next[key] = fromDay;
        storage.set("intercambios-platos", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
      setSwapPickerKey(null);
    };
    const allMeals = useMemo(
      () => activeMenu.flatMap((d) => [
        { ...getMeal(d.day, "comida"), day: d.day, type: "Comida" },
        { ...getMeal(d.day, "cena"), day: d.day, type: "Cena" }
      ]),
      [activeMenu, swaps, menuStyle, weekNumber]
    );
    const hasAvoided = (recipe) => recipe.items.some((it) => avoidIds.includes(it.id));
    const DISCRETE_UNITS = /* @__PURE__ */ new Set([
      "docena",
      "paquete 500g",
      "lata 400g",
      "pack 3 latas",
      "paquete",
      "paquete 4 uds",
      "unidad",
      "botella"
    ]);
    const ingredientUsage = useMemo(() => {
      const usage = {};
      allMeals.filter((r) => !hasAvoided(r)).forEach((r) => {
        r.items.forEach((it) => {
          if (!usage[it.id]) usage[it.id] = { totalQty: 0, count: 0 };
          usage[it.id].totalQty += it.qty * factor;
          usage[it.id].count += 1;
        });
      });
      return usage;
    }, [allMeals, avoidIds, factor]);
    const repeatedIngredients = Object.entries(ingredientUsage).filter(([, u]) => u.count >= 3).sort((a, b) => b[1].count - a[1].count);
    const leftoverIngredients = Object.entries(ingredientUsage).filter(([id, u]) => DISCRETE_UNITS.has(prices[id].unit)).map(([id, u]) => {
      const packagesNeeded = Math.max(1, Math.ceil(u.totalQty));
      const leftoverFraction = packagesNeeded - u.totalQty;
      return { id, ...u, packagesNeeded, leftoverFraction };
    }).filter((u) => u.leftoverFraction > 0.25).sort((a, b) => b.leftoverFraction - a.leftoverFraction);
    const weeklyTotal = useMemo(() => {
      return (storeId) => {
        const mealsTotal = allMeals.filter((r) => !hasAvoided(r)).reduce((sum, r) => sum + recipeCost(r, storeId), 0);
        const extrasTotal = Object.entries(extrasQty).reduce((sum, [id, qty]) => {
          const ex = EXTRAS.find((e) => e.id === id);
          return sum + (ex ? ex[storeId] * qty : 0);
        }, 0);
        return mealsTotal + extrasTotal;
      };
    }, [allMeals, recipeCost, extrasQty, avoidIds]);
    const updateIngresos = (value) => {
      setIngresos(value);
      storage.set("ingresos-mensuales", value).catch(() => {
      });
    };
    const setStyle = (s) => {
      setMenuStyle(s);
      setOpenMeal(null);
      storage.set("estilo-menu", s).catch(() => {
      });
    };
    const setWeek = (n) => {
      setWeekNumber(n);
      setOpenMeal(null);
      storage.set("semana-numero", String(n)).catch(() => {
      });
    };
    const guardarSemana = (totalSemana) => {
      const entry = {
        id: Date.now(),
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
        style: `${STYLES[menuStyle].label} S${weekNumber}`,
        servings,
        total: totalSemana
      };
      setHistorial((prev) => {
        const next = [...prev, entry].slice(-12);
        storage.set("historial-semanas", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
      setHistoryMsg("Semana guardada \u2713");
      setTimeout(() => setHistoryMsg(""), 2e3);
    };
    const borrarSemana = (id) => {
      setHistorial((prev) => {
        const next = prev.filter((h) => h.id !== id);
        storage.set("historial-semanas", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const toggleAvoid = (id) => {
      setAvoidIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        storage.set("ingredientes-evitar", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const toggleAllergenGroup = (groupIds) => {
      setAvoidIds((prev) => {
        const allActive = groupIds.every((id) => prev.includes(id));
        const next = allActive ? prev.filter((id) => !groupIds.includes(id)) : [.../* @__PURE__ */ new Set([...prev, ...groupIds])];
        storage.set("ingredientes-evitar", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const toggleFavorito = (key) => {
      setFavoritos((prev) => {
        const next = prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key];
        storage.set("favoritos", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const toggleBought = (id) => {
      setBoughtItems((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        storage.set("lista-compra-comprados", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const vaciarLista = () => {
      setBoughtItems([]);
      storage.set("lista-compra-comprados", JSON.stringify([])).catch(() => {
      });
    };
    const STORAGE_KEYS = [
      "estilo-menu",
      "extras-seleccionados",
      "favoritos",
      "fecha-objetivo-peso",
      "historial-semanas",
      "ingredientes-evitar",
      "ingresos-mensuales",
      "intercambios-platos",
      "lista-compra-comprados",
      "objetivo-usuario",
      "peso-actual",
      "peso-historial",
      "peso-objetivo",
      "precios-custom",
      "presupuesto-semanal",
      "raciones",
      "semana-numero"
    ];
    const exportarDatos = async () => {
      const data = {};
      for (const k of STORAGE_KEYS) {
        try {
          const res = await storage.get(k);
          if (res && res.value !== void 0) data[k] = res.value;
        } catch (e) {
        }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `la-compra-justa-datos-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    const importarDatos = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          for (const k of STORAGE_KEYS) {
            if (data[k] !== void 0) {
              await storage.set(k, data[k]);
            }
          }
          setShareMsg("Datos importados \u2713 Recargando...");
          setTimeout(() => window.location.reload(), 1200);
        } catch (err) {
          setShareMsg("Archivo no v\xE1lido");
          setTimeout(() => setShareMsg(""), 2500);
        }
      };
      reader.readAsText(file);
    };
    const compartirLista = async () => {
      let texto = `\u{1F6D2} Lista de la compra \u2014 La Cesta Inteligente
M\xE1s barato en ${cheapest.name}: ${fmt(shoppingTotalAll)} \u20AC
`;
      shoppingByCategory.forEach((cat) => {
        texto += `
${cat.name}:
`;
        cat.items.forEach((it) => {
          texto += `- ${it.label} (${it.qtyLabel})
`;
        });
      });
      if (shoppingExtras.length > 0) {
        texto += `
Picoteo y extras:
`;
        shoppingExtras.forEach((it) => {
          texto += `- ${it.label} (${it.qtyLabel})
`;
        });
      }
      if (navigator.share) {
        try {
          await navigator.share({ title: "Lista de la compra", text: texto });
          return;
        } catch (e) {
        }
      }
      try {
        await navigator.clipboard.writeText(texto);
        setShareMsg("Copiada al portapapeles \u2713");
      } catch (e) {
        setShareMsg("No se pudo copiar");
      }
      setTimeout(() => setShareMsg(""), 2500);
    };
    const updatePresupuestoSemanal = (value) => {
      setPresupuestoSemanal(value);
      storage.set("presupuesto-semanal", value).catch(() => {
      });
    };
    const updateObjetivo = (value) => {
      setObjetivo(value);
      storage.set("objetivo-usuario", value).catch(() => {
      });
    };
    const updatePesoActual = (value) => {
      setPesoActual(value);
      storage.set("peso-actual", value).catch(() => {
      });
    };
    const updatePesoObjetivo = (value) => {
      setPesoObjetivo(value);
      storage.set("peso-objetivo", value).catch(() => {
      });
    };
    const updateFechaObjetivoPeso = (value) => {
      setFechaObjetivoPeso(value);
      storage.set("fecha-objetivo-peso", value).catch(() => {
      });
    };
    const anotarPesoMensual = () => {
      const peso = parseFloat(pesoActual);
      if (!peso) return;
      const entry = {
        id: Date.now(),
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { month: "short", year: "2-digit" }),
        weight: peso
      };
      setPesoHistorial((prev) => {
        const next = [...prev, entry].slice(-24);
        storage.set("peso-historial", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
      setPesoMsg("Peso anotado \u2713");
      setTimeout(() => setPesoMsg(""), 2e3);
    };
    const borrarPesoEntry = (id) => {
      setPesoHistorial((prev) => {
        const next = prev.filter((p) => p.id !== id);
        storage.set("peso-historial", JSON.stringify(next)).catch(() => {
        });
        return next;
      });
    };
    const ingresosNum = parseFloat(ingresos) || 0;
    const presupuestoMin = ingresosNum * 0.1;
    const presupuestoMax = ingresosNum * 0.2;
    const presupuestoMedia = ingresosNum * 0.158;
    const extrasCount = Object.keys(extrasQty).length;
    const avoidedCount = allMeals.filter((r) => hasAvoided(r)).length;
    const { totals, cheapest, priciest, savings, monthlyCost } = useMemo(() => {
      const t = STORES.map((s) => ({ ...s, total: weeklyTotal(s.id) }));
      const c = t.reduce((a, b) => b.total < a.total ? b : a, t[0]);
      const p = t.reduce((a, b) => b.total > a.total ? b : a, t[0]);
      return { totals: t, cheapest: c, priciest: p, savings: p.total - c.total, monthlyCost: weeklyTotal(c.id) * 4.33 };
    }, [weeklyTotal]);
    const shoppingByCategory = CATEGORIES.map((cat) => ({
      name: cat.name,
      items: cat.ids.filter((id) => ingredientUsage[id]).map((id) => ({
        id,
        label: prices[id].label + (PRODUCT_VARIANTS[id] && PRODUCT_VARIANTS[id][menuStyle] ? ` (${PRODUCT_VARIANTS[id][menuStyle]})` : ""),
        qtyLabel: formatQty(ingredientUsage[id].totalQty, prices[id].unit),
        cost: (prices[id][cheapest.id] || 0) * ingredientUsage[id].totalQty
      }))
    })).filter((cat) => cat.items.length > 0);
    const shoppingExtras = Object.entries(extrasQty).map(([id, qty]) => {
      const ex = EXTRAS.find((e) => e.id === id);
      return { id: `extra-${id}`, label: ex.label, qtyLabel: `${qty} ud.`, cost: ex[cheapest.id] * qty };
    });
    const allShoppingItems = [...shoppingByCategory.flatMap((c) => c.items), ...shoppingExtras];
    const shoppingTotalAll = allShoppingItems.reduce((s, it) => s + it.cost, 0);
    const shoppingTotalPendiente = allShoppingItems.filter((it) => !boughtItems.includes(it.id)).reduce((s, it) => s + it.cost, 0);
    if (!loaded) {
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          style: { background: "#F4F7F4", color: "#6B6552", minHeight: "100vh" },
          className: "flex items-center justify-center font-mono text-sm"
        },
        "Cargando tu men\xFA\u2026"
      );
    }
    return /* @__PURE__ */ React.createElement("div", { style: { background: "#F4F7F4", color: "#20281F", minHeight: "100vh" }, className: "font-body pb-safe" }, /* @__PURE__ */ React.createElement("style", null, `
        .font-body { font-family: 'Work Sans', sans-serif; }
        .font-display { font-family: 'Nunito', sans-serif; font-weight: 800; letter-spacing: -0.01em; }
        .font-mono { font-family: 'Space Mono', monospace; font-variant-numeric: tabular-nums; }
        .dotted-line { background-image: repeating-linear-gradient(to right, #20281F 0, #20281F 3px, transparent 3px, transparent 8px); height: 1px; }
        .ticket-edge::after {
          content: ""; display: block; height: 14px;
          background: repeating-linear-gradient(135deg, transparent 0 6px, #F4F7F4 6px 12px), repeating-linear-gradient(45deg, transparent 0 6px, #F4F7F4 6px 12px);
          background-color: #FFFFFF; margin-top: -1px;
        }
        .stamp { transform: rotate(-6deg); border: 3px solid #C2452F; color: #C2452F; }
        summary { list-style: none; }
        summary::-webkit-details-marker { display: none; }
        summary::after { content: '\u25BE'; float: right; color: #1FAA59; transition: transform .2s; margin-left: 8px; }
        details[open] summary::after { transform: rotate(180deg); }
        .card-soft { box-shadow: 0 1px 2px rgba(32,40,31,0.04), 0 4px 16px rgba(32,40,31,0.06); border: none !important; }
        .card-hero { box-shadow: 0 2px 4px rgba(32,40,31,0.06), 0 12px 32px rgba(32,40,31,0.10); }
        body { -webkit-font-smoothing: antialiased; }
        .tap-scale { transition: transform .08s ease; }
        .tap-scale:active { transform: scale(0.97); }
      `), /* @__PURE__ */ React.createElement("style", null, `
        @media (max-width: 640px) { .pb-safe { padding-bottom: 88px; } }
      `), /* @__PURE__ */ React.createElement("header", { style: { background: "#FFFFFF" }, className: "pt-8 pb-4 border-b" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto px-5 flex justify-center" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "./logo.png",
        alt: "La Cesta Inteligente \u2014 La compra adaptada a tu vida",
        style: { maxWidth: "340px", width: "100%", height: "auto" }
      }
    ))), /* @__PURE__ */ React.createElement(
      "nav",
      {
        className: "fixed bottom-0 left-0 right-0 z-20 px-2 py-1.5 sm:hidden",
        style: { background: "#FFFFFF", boxShadow: "0 -2px 12px rgba(32,40,31,0.08)" },
        "aria-label": "Navegaci\xF3n principal"
      },
      /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto flex justify-around" }, [
        { href: "#perfil", label: "Perfil", icon: "\u{1F464}" },
        { href: "#menu-semana", label: "Men\xFA", icon: "\u{1F37D}\uFE0F" },
        { href: "#lista-compra", label: "Lista", icon: "\u{1F6D2}" },
        { href: "#comparativa", label: "S\xFApers", icon: "\u{1F3EA}" },
        { href: "#editor-precios", label: "Precios", icon: "\u{1F3F7}\uFE0F" }
      ].map((item) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: item.href,
          href: item.href,
          className: "flex flex-col items-center gap-0.5 px-2 py-1 tap-scale",
          style: { color: "#4A4536" }
        },
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, item.icon),
        /* @__PURE__ */ React.createElement("span", { className: "font-mono", style: { fontSize: 10 } }, item.label)
      )))
    ), /* @__PURE__ */ React.createElement(
      "nav",
      {
        className: "sticky top-0 z-10 overflow-x-auto whitespace-nowrap px-5 py-2.5 mb-6 hidden sm:block",
        style: { background: "rgba(244,247,244,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E3E8E3" },
        "aria-label": "Navegaci\xF3n r\xE1pida entre secciones"
      },
      /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto flex gap-2" }, [
        { href: "#perfil", label: "Perfil" },
        { href: "#menu-semana", label: "Men\xFA" },
        { href: "#lista-compra", label: "Lista" },
        { href: "#comparativa", label: "S\xFApers" },
        { href: "#presupuesto", label: "Presupuesto" },
        { href: "#historico", label: "Hist\xF3rico" },
        { href: "#editor-precios", label: "Precios" }
      ].map((item) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: item.href,
          href: item.href,
          className: "font-mono text-xs px-2.5 py-1 rounded-xl flex-shrink-0 tap-scale",
          style: { background: "#FFFFFF", color: "#1FAA59", boxShadow: "0 1px 2px rgba(32,40,31,0.06)" }
        },
        item.label
      )))
    ), /* @__PURE__ */ React.createElement("section", { id: "perfil", className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "card-soft rounded-2xl p-5", style: { background: "#FFFFFF" } }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-3" }, "Tu perfil"), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Presupuesto semanal para comida (opcional)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: presupuestoSemanal,
        onChange: (e) => updatePresupuestoSemanal(e.target.value),
        placeholder: "Ej. 70",
        className: "font-mono text-lg bg-transparent border-b outline-none w-24",
        style: { borderColor: "#1FAA59" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm", style: { color: "#6B6552" } }, "\u20AC / semana"), parseFloat(presupuestoSemanal) > 0 && /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "font-mono text-xs ml-auto px-2 py-1 rounded-xl",
        style: {
          background: cheapest.total <= parseFloat(presupuestoSemanal) ? "#1FAA59" : "#C2452F",
          color: "#FFFFFF"
        }
      },
      cheapest.total <= parseFloat(presupuestoSemanal) ? "Dentro" : "Por encima",
      " \xB7 ",
      fmt(cheapest.total),
      " \u20AC"
    )), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Personas en casa"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-4" }, HOUSEHOLDS.map((h) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: h.n,
        onClick: () => setHousehold(h.n),
        className: "font-mono text-xs px-3 py-1.5 rounded-xl",
        style: {
          border: `1.5px solid ${servings === h.n ? "#1FAA59" : "#C9C0AC"}`,
          background: servings === h.n ? "#1FAA59" : "#FFFFFF",
          color: servings === h.n ? "#FFFFFF" : "#20281F"
        }
      },
      h.label
    ))), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Nivel de comida"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-1" }, NIVELES.map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n.key,
        onClick: () => setStyle(n.key),
        className: "font-mono text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5",
        style: {
          border: `1.5px solid ${menuStyle === n.key ? "#1FAA59" : "#C9C0AC"}`,
          background: menuStyle === n.key ? "#1FAA59" : "#FFFFFF",
          color: menuStyle === n.key ? "#FFFFFF" : "#20281F"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, n.emoji),
      " ",
      n.label
    ))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: "#8A8470" } }, NIVELES.find((n) => n.key === menuStyle)?.sub, " \u2014 ", STYLES[menuStyle].desc), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Semana"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-4" }, STYLES[menuStyle].weeks.map((_, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: () => setWeek(i + 1),
        className: "font-mono text-xs px-3 py-1.5 rounded-xl",
        style: {
          border: `1.5px solid ${weekNumber === i + 1 ? "#1FAA59" : "#C9C0AC"}`,
          background: weekNumber === i + 1 ? "#1FAA59" : "#FFFFFF",
          color: weekNumber === i + 1 ? "#FFFFFF" : "#20281F"
        }
      },
      "Semana ",
      i + 1
    ))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: "#8A8470" } }, "Alterna entre semanas para no repetir siempre los mismos platos."), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Tu objetivo"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, OBJETIVOS.map((o) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: o.key,
        onClick: () => updateObjetivo(o.key),
        className: "font-mono text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5",
        style: {
          border: `1.5px solid ${objetivo === o.key ? "#1FAA59" : "#C9C0AC"}`,
          background: objetivo === o.key ? "#1FAA59" : "#FFFFFF",
          color: objetivo === o.key ? "#FFFFFF" : "#20281F"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, o.emoji),
      " ",
      o.label
    ))), objetivo === "ahorrar" && menuStyle !== "sana" && /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3", style: { color: "#1FAA59" } }, "\u{1F4A1} Como tu objetivo es ahorrar, el nivel \u{1F7E2} Econ\xF3mico suele salir m\xE1s barato. Pru\xE9balo y compara el ticket."), objetivo === "saludable" && menuStyle !== "sana" && /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3", style: { color: "#1FAA59" } }, "\u{1F4A1} El nivel \u{1F7E2} Econ\xF3mico es tambi\xE9n el m\xE1s ligero en procesados y frituras esta semana."))), objetivo === "saludable" && /* @__PURE__ */ React.createElement("section", { id: "progreso-peso", className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-xl p-4", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-1" }, "Tu progreso"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: "#8A8470" } }, "Esto es un registro personal, no sustituye el consejo de un profesional de la salud. M\xE1rcate objetivos graduales y realistas."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Peso actual"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: pesoActual,
        onChange: (e) => updatePesoActual(e.target.value),
        placeholder: "Ej. 78",
        className: "font-mono text-lg bg-transparent border-b outline-none w-16",
        style: { borderColor: "#1FAA59" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "kg"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Peso al que te gustar\xEDa llegar"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: pesoObjetivo,
        onChange: (e) => updatePesoObjetivo(e.target.value),
        placeholder: "Ej. 72",
        className: "font-mono text-lg bg-transparent border-b outline-none w-16",
        style: { borderColor: "#1FAA59" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "kg")))), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Fecha en la que te gustar\xEDa conseguirlo (opcional)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: fechaObjetivoPeso,
        onChange: (e) => updateFechaObjetivoPeso(e.target.value),
        className: "font-mono text-sm bg-transparent border-b outline-none mb-3",
        style: { borderColor: "#1FAA59" }
      }
    ), parseFloat(pesoActual) > 0 && parseFloat(pesoObjetivo) > 0 && /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3", style: { color: "#4A4536" } }, "Te ", parseFloat(pesoActual) > parseFloat(pesoObjetivo) ? "faltan" : "sobran", " ", /* @__PURE__ */ React.createElement("strong", null, Math.abs(parseFloat(pesoActual) - parseFloat(pesoObjetivo)).toFixed(1), " kg"), " para llegar a tu objetivo", fechaObjetivoPeso ? ` antes del ${new Date(fechaObjetivoPeso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}` : "", "."), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#6B6552" } }, "Seguimiento mensual"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: anotarPesoMensual,
        className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
        style: { background: "#1FAA59", color: "#FFFFFF" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "save", size: 13 }),
      " Anotar este mes"
    )), pesoMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#1FAA59" } }, pesoMsg), pesoHistorial.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#6B6552" } }, 'A\xFAn no has anotado tu peso. Pulsa "Anotar este mes" cuando quieras empezar tu seguimiento.') : /* @__PURE__ */ React.createElement(React.Fragment, null, pesoHistorial.length >= 2 && /* @__PURE__ */ React.createElement("div", { className: "rounded-xl p-3 mb-3", style: { background: "#FFFFFF", border: "1px solid #C9C0AC", height: 140 } }, /* @__PURE__ */ React.createElement(MiniLineChart, { data: pesoHistorial, dataKey: "weight", unit: " kg" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, pesoHistorial.slice().reverse().map((p) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        className: "flex items-center justify-between px-3 py-2 rounded-xl",
        style: { background: "#FFFFFF", border: "1px solid #C9C0AC" }
      },
      /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, p.date),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm font-bold" }, p.weight, " kg"), /* @__PURE__ */ React.createElement("button", { onClick: () => borrarPesoEntry(p.id), "aria-label": `Borrar registro de ${p.date}`, style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 14 })))
    )))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Ingredientes a evitar (alergias o no me gusta) ", avoidIds.length > 0 ? `\xB7 ${avoidIds.length} seleccionados` : ""), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mt-3 mb-1.5", style: { color: "#1FAA59" } }, "Alergias e intolerancias comunes"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#8A8470" } }, "Marca una y se excluyen de golpe todos los ingredientes relacionados."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 mb-4" }, ALLERGEN_GROUPS.map((g) => {
      const active = g.ids.every((id) => avoidIds.includes(id));
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: g.key,
          onClick: () => toggleAllergenGroup(g.ids),
          className: "text-xs px-2.5 py-1 rounded-xl flex items-center gap-1",
          style: {
            border: `1.5px solid ${active ? "#C2452F" : "#1FAA59"}`,
            background: active ? "#C2452F" : "#FFFFFF",
            color: active ? "#FFFFFF" : "#1FAA59"
          }
        },
        /* @__PURE__ */ React.createElement("span", null, g.emoji),
        " ",
        g.label
      );
    })), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#6B6552" } }, "O ingrediente por ingrediente"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, Object.entries(prices).map(([id, ing]) => {
      const active = avoidIds.includes(id);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: id,
          onClick: () => toggleAvoid(id),
          className: "text-xs px-2.5 py-1 rounded-xl",
          style: {
            border: `1.5px solid ${active ? "#C2452F" : "#C9C0AC"}`,
            background: active ? "#C2452F" : "#FFFFFF",
            color: active ? "#FFFFFF" : "#20281F"
          }
        },
        ing.label
      );
    })))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-8 mt-6" }, /* @__PURE__ */ React.createElement("div", { className: "card-hero rounded-2xl overflow-hidden", style: { background: "#FFFFFF" } }, /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs uppercase tracking-wide", style: { color: "#8A8470" } }, "Ticket de la semana"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, "14 comidas", extrasCount > 0 ? ` + ${extrasCount} extra${extrasCount > 1 ? "s" : ""}` : "", " \xB7 ", servings, " ", servings === 1 ? "raci\xF3n" : "raciones")), /* @__PURE__ */ React.createElement("p", { className: "font-display leading-none", style: { fontSize: "3.25rem", color: "#1FAA59" } }, fmt(cheapest.total), " \u20AC"), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2", style: { color: "#4A4536" } }, "Lo m\xE1s barato esta semana, comprando en", " ", /* @__PURE__ */ React.createElement("span", { style: { color: cheapest.color, fontWeight: 700 } }, cheapest.name)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mt-4" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "font-mono text-xs font-bold px-3 py-1.5 rounded-xl",
        style: { background: "#1FAA59", color: "#FFFFFF" }
      },
      "Ahorras ",
      fmt(savings),
      " \u20AC vs ",
      priciest.name
    ), historial.length > 0 && /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "font-mono text-xs font-bold px-3 py-1.5 rounded-xl",
        style: {
          background: cheapest.total <= historial[historial.length - 1].total ? "rgba(31,170,89,0.12)" : "rgba(227,178,60,0.18)",
          color: cheapest.total <= historial[historial.length - 1].total ? "#1FAA59" : "#B8860B"
        }
      },
      cheapest.total <= historial[historial.length - 1].total ? "\u25BC" : "\u25B2",
      " ",
      fmt(Math.abs(cheapest.total - historial[historial.length - 1].total)),
      " \u20AC vs semana anterior"
    )))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2 flex items-start gap-1.5 px-1", style: { color: "#8A8470" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 14, className: "mt-0.5 flex-shrink-0" }), "Cubre solo las 14 comidas y cenas de abajo (no desayunos, snacks ni higiene). Es una referencia, no tu compra completa.", avoidedCount > 0 ? ` ${avoidedCount} plato${avoidedCount > 1 ? "s" : ""} con ingredientes a evitar no est\xE1${avoidedCount > 1 ? "n" : ""} incluido${avoidedCount > 1 ? "s" : ""} en el total.` : "")), /* @__PURE__ */ React.createElement("section", { id: "presupuesto", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer" }, "Tu presupuesto frente a la media nacional"), /* @__PURE__ */ React.createElement("div", { className: "rounded-xl p-4 mt-3", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Ingresos netos del hogar al mes (opcional)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: ingresos,
        onChange: (e) => updateIngresos(e.target.value),
        placeholder: "Ej. 2400",
        className: "font-mono text-lg bg-transparent border-b outline-none w-32",
        style: { borderColor: "#1FAA59" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm", style: { color: "#6B6552" } }, "\u20AC / mes")), ingresosNum > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-2", style: { color: "#4A4536" } }, "En Espa\xF1a, lo habitual es destinar entre el 10% y el 20% del ingreso a alimentaci\xF3n (media nacional: 15,8%, seg\xFAn el INE). Para tus ingresos, eso es:"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-sm mb-3" }, /* @__PURE__ */ React.createElement("strong", null, fmt(presupuestoMin), " \u20AC \u2013 ", fmt(presupuestoMax), " \u20AC / mes"), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B6552" } }, " (media orientativa: ", fmt(presupuestoMedia), " \u20AC)")), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { color: "#4A4536" } }, "Tu men\xFA actual cuesta aprox."), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-lg font-bold" }, fmt(monthlyCost), " \u20AC / mes")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2", style: { color: monthlyCost <= presupuestoMax ? "#1FAA59" : "#C2452F" } }, monthlyCost < presupuestoMin ? "Est\xE1 por debajo del rango habitual \u2014 quiz\xE1 haya margen para variar m\xE1s el men\xFA." : monthlyCost <= presupuestoMax ? "Est\xE1 dentro del rango habitual para tus ingresos." : "Est\xE1 por encima del rango habitual \u2014 revisa el editor de precios o reduce extras.")) : /* @__PURE__ */ React.createElement("p", { className: "text-xs", style: { color: "#8A8470" } }, "Indica tus ingresos para ver si el coste de este men\xFA es razonable para tu situaci\xF3n."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3 flex items-start gap-1.5", style: { color: "#8A8470" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 12, className: "mt-0.5 flex-shrink-0" }), "Referencia informativa (datos INE), no asesoramiento financiero. Tus gastos fijos (alquiler, hijos, deudas) cambian lo que es razonable para tu caso.")))), /* @__PURE__ */ React.createElement("section", { id: "menu-semana", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-3" }, "La semana, d\xEDa a d\xEDa"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          const i = activeMenu.findIndex((d) => d.day === selectedDay);
          setSelectedDay(activeMenu[(i - 1 + activeMenu.length) % activeMenu.length].day);
          setOpenMeal(null);
        },
        "aria-label": "D\xEDa anterior",
        className: "flex-shrink-0 px-2 py-1.5 rounded-xl",
        style: { border: "1px solid #C9C0AC", color: "#1FAA59" }
      },
      "\u2039"
    ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 overflow-x-auto flex-1" }, activeMenu.map((d) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.day,
        onClick: () => {
          setSelectedDay(d.day);
          setOpenMeal(null);
        },
        className: "font-mono text-xs px-2.5 py-1.5 rounded-xl flex-shrink-0",
        style: {
          border: `1.5px solid ${selectedDay === d.day ? "#1FAA59" : "#C9C0AC"}`,
          background: selectedDay === d.day ? "#1FAA59" : "#FFFFFF",
          color: selectedDay === d.day ? "#FFFFFF" : "#20281F"
        }
      },
      d.day.slice(0, 3)
    ))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          const i = activeMenu.findIndex((d) => d.day === selectedDay);
          setSelectedDay(activeMenu[(i + 1) % activeMenu.length].day);
          setOpenMeal(null);
        },
        "aria-label": "D\xEDa siguiente",
        className: "flex-shrink-0 px-2 py-1.5 rounded-xl",
        style: { border: "1px solid #C9C0AC", color: "#1FAA59" }
      },
      "\u203A"
    )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, activeMenu.filter((d) => d.day === selectedDay).map((d) => /* @__PURE__ */ React.createElement("div", { key: d.day }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#1FAA59" } }, d.day), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, ["comida", "cena"].map((mealType) => {
      const r = getMeal(d.day, mealType);
      const key = `${d.day}-${mealType}`;
      const swapKey = `${menuStyle}|${weekNumber}|${d.day}|${mealType}`;
      const isSwapped = !!swaps[swapKey];
      const isOpen = openMeal === key;
      const isPicking = swapPickerKey === swapKey;
      const costCheapest = recipeCost(r, cheapest.id);
      const avoided = hasAvoided(r);
      const isFav = favoritos.includes(key);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key,
          className: "border rounded-xl",
          style: { borderColor: avoided ? "#C2452F" : "#C9C0AC", background: "#FFFFFF" }
        },
        /* @__PURE__ */ React.createElement("div", { className: "w-full flex items-center justify-between px-4 py-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenMeal(isOpen ? null : key), className: "flex items-center gap-3 text-left flex-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, r.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase flex items-center gap-1", style: { color: avoided ? "#C2452F" : "#6B6552" } }, mealType === "comida" ? "Comida" : "Cena", " \xB7 ", r.time, isSwapped && /* @__PURE__ */ React.createElement("span", { style: { color: "#1FAA59" } }, "\xB7 cambiado"), avoided && /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-0.5" }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 11 }), " revisa ingredientes")), /* @__PURE__ */ React.createElement("p", { className: "font-medium text-sm sm:text-base flex items-center gap-2" }, r.name, menuStyle === "sana" && r.salud && /* @__PURE__ */ React.createElement(
          "span",
          {
            className: "font-mono text-xs px-1.5 py-0.5 rounded-lg flex-shrink-0",
            style: {
              background: r.salud >= 8 ? "#1FAA59" : r.salud >= 6 ? "#E3B23C" : "#C2452F",
              color: "#FFFFFF"
            },
            title: "Valoraci\xF3n nutricional del plato"
          },
          r.salud,
          "/10 salud"
        )))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setSwapPickerKey(isPicking ? null : swapKey),
            "aria-label": "Cambiar este plato por otro de la semana",
            style: { color: isSwapped ? "#1FAA59" : "#C9C0AC" }
          },
          /* @__PURE__ */ React.createElement(Icon, { name: "repeat", size: 15 })
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => toggleFavorito(key),
            "aria-pressed": isFav,
            "aria-label": isFav ? "Quitar de favoritos" : "Marcar como favorito"
          },
          /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 16, filled: isFav, color: isFav ? "#E8AE3D" : "#C9C0AC" })
        ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm" }, fmt(costCheapest), " \u20AC"), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setOpenMeal(isOpen ? null : key),
            "aria-expanded": isOpen,
            "aria-label": isOpen ? "Ocultar receta" : "Ver receta completa"
          },
          /* @__PURE__ */ React.createElement(Icon, { name: "chevronDown", size: 18, style: { transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" } })
        ))),
        isPicking && /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-3 pt-1 border-t", style: { borderColor: "#E3DCC9" } }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Cambiar por el ", mealType === "comida" ? "almuerzo" : "cena", " de otro d\xEDa"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, activeMenu.map((other) => {
          const candidate = other[mealType];
          const isCurrentSource = swaps[swapKey] ? swaps[swapKey] === other.day : other.day === d.day;
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: other.day,
              onClick: () => swapMeal(d.day, mealType, other.day),
              className: "text-xs px-2.5 py-1 rounded-xl flex items-center gap-1",
              style: {
                border: `1.5px solid ${isCurrentSource ? "#1FAA59" : "#C9C0AC"}`,
                background: isCurrentSource ? "#1FAA59" : "#FFFFFF",
                color: isCurrentSource ? "#FFFFFF" : "#20281F"
              }
            },
            /* @__PURE__ */ React.createElement("span", null, candidate.emoji),
            " ",
            candidate.name
          );
        })), isSwapped && /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => swapMeal(d.day, mealType, d.day),
            className: "font-mono text-xs underline mt-2",
            style: { color: "#C2452F" }
          },
          "Volver al plato original"
        )),
        isOpen && /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-4 pt-1 border-t", style: { borderColor: "#E3DCC9" } }, avoided && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 flex items-start gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13, className: "mt-0.5 flex-shrink-0" }), "Contiene un ingrediente que marcaste para evitar. No se incluye en el total de la semana \u2014 sustit\xFAyelo o coc\xEDnalo aparte."), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Preparaci\xF3n"), /* @__PURE__ */ React.createElement("ol", { className: "text-sm mb-4 space-y-1.5", style: { color: "#4A4536" } }, r.steps.map((step, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono flex-shrink-0", style: { color: "#1FAA59" } }, i + 1, "."), /* @__PURE__ */ React.createElement("span", null, step)))), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Ingredientes para ", servings, " ", servings === 1 ? "persona" : "personas"), /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm font-mono" }, /* @__PURE__ */ React.createElement("tbody", null, r.items.map((it) => {
          const totalQty = it.qty * factor;
          const perPerson = totalQty / servings;
          return /* @__PURE__ */ React.createElement("tr", { key: it.id, style: { borderTop: "1px dashed #C9C0AC" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1.5" }, prices[it.id].label, PRODUCT_VARIANTS[it.id] && PRODUCT_VARIANTS[it.id][menuStyle] && /* @__PURE__ */ React.createElement("span", { className: "text-xs", style: { color: "#1FAA59" } }, " ", "\xB7 ", PRODUCT_VARIANTS[it.id][menuStyle])), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#20281F" } }, formatQty(totalQty, prices[it.id].unit)), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, " (", formatQty(perPerson, prices[it.id].unit), "/persona)")), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right pl-4" }, fmt((prices[it.id][cheapest.id] || 0) * totalQty), " \u20AC"));
        }))))
      );
    })))))), /* @__PURE__ */ React.createElement("section", { id: "lista-compra", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Lista de la compra"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: compartirLista, className: "font-mono text-xs underline flex items-center gap-1", style: { color: "#1FAA59" } }, "Compartir"), /* @__PURE__ */ React.createElement("button", { onClick: vaciarLista, className: "font-mono text-xs underline", style: { color: "#6B6552" } }, "Desmarcar todo"))), shareMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-1", style: { color: "#1FAA59" } }, shareMsg), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-4", style: { color: "#4A4536" } }, "Todo lo que necesitas esta semana, en un solo listado \u2014 para llevarlo al s\xFAper sin mirar receta por receta."), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3 mb-3 rounded-xl",
        style: { background: "#FFFFFF", border: "1.5px solid #1FAA59" }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { color: "#4A4536" } }, "Te queda por comprar"),
      /* @__PURE__ */ React.createElement("span", { className: "font-mono text-lg font-bold" }, fmt(shoppingTotalPendiente), " \u20AC")
    ), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, shoppingByCategory.map((cat) => {
      const catTotal = cat.items.reduce((s, it) => s + it.cost, 0);
      const catBought = cat.items.filter((it) => boughtItems.includes(it.id)).length;
      return /* @__PURE__ */ React.createElement("details", { key: cat.name, className: "rounded-xl", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase px-3 py-2.5 cursor-pointer flex items-center justify-between", style: { color: "#1FAA59" } }, /* @__PURE__ */ React.createElement("span", null, cat.name, " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#8A8470" } }, "(", catBought, "/", cat.items.length, ")")), /* @__PURE__ */ React.createElement("span", null, fmt(catTotal), " \u20AC")), /* @__PURE__ */ React.createElement("div", { className: "px-3 pb-3 space-y-1.5" }, cat.items.map((it) => {
        const checked = boughtItems.includes(it.id);
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: it.id,
            onClick: () => toggleBought(it.id),
            "aria-pressed": checked,
            "aria-label": `Marcar ${it.label} como comprado`,
            className: "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left",
            style: { background: "#FFFFFF", border: "1px solid #C9C0AC", opacity: checked ? 0.5 : 1 }
          },
          /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "flex items-center justify-center rounded-xl flex-shrink-0",
              style: { width: 18, height: 18, border: "1.5px solid #1FAA59", background: checked ? "#1FAA59" : "transparent" }
            },
            checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FFFFFF" })
          ), /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { textDecoration: checked ? "line-through" : "none" } }, it.label)),
          /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, it.qtyLabel)
        );
      })));
    }), shoppingExtras.length > 0 && (() => {
      const extrasTotal = shoppingExtras.reduce((s, it) => s + it.cost, 0);
      const extrasBought = shoppingExtras.filter((it) => boughtItems.includes(it.id)).length;
      return /* @__PURE__ */ React.createElement("details", { className: "rounded-xl", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase px-3 py-2.5 cursor-pointer flex items-center justify-between", style: { color: "#1FAA59" } }, /* @__PURE__ */ React.createElement("span", null, "Picoteo y extras ", /* @__PURE__ */ React.createElement("span", { style: { color: "#8A8470" } }, "(", extrasBought, "/", shoppingExtras.length, ")")), /* @__PURE__ */ React.createElement("span", null, fmt(extrasTotal), " \u20AC")), /* @__PURE__ */ React.createElement("div", { className: "px-3 pb-3 space-y-1.5" }, shoppingExtras.map((it) => {
        const checked = boughtItems.includes(it.id);
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: it.id,
            onClick: () => toggleBought(it.id),
            "aria-pressed": checked,
            "aria-label": `Marcar ${it.label} como comprado`,
            className: "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left",
            style: { background: "#FFFFFF", border: "1px solid #C9C0AC", opacity: checked ? 0.5 : 1 }
          },
          /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "flex items-center justify-center rounded-xl flex-shrink-0",
              style: { width: 18, height: 18, border: "1.5px solid #1FAA59", background: checked ? "#1FAA59" : "transparent" }
            },
            checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FFFFFF" })
          ), /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { textDecoration: checked ? "line-through" : "none" } }, it.label)),
          /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, it.qtyLabel)
        );
      })));
    })())), /* @__PURE__ */ React.createElement("section", { id: "comparativa", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-4" }, "Comparativa de supermercados"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, totals.sort((a, b) => a.total - b.total).map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, className: "rounded-xl p-4 relative", style: { background: "#FFFFFF", border: `1.5px solid ${s.id === cheapest.id ? s.color : "#C9C0AC"}` } }, s.id === cheapest.id && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-2 -right-2 rounded-full p-1", style: { background: "#1FAA59" } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FFFFFF" })), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#6B6552" } }, s.name), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xl font-bold mt-1" }, fmt(s.total), " \u20AC"))))), /* @__PURE__ */ React.createElement("section", { id: "historico", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Hist\xF3rico de semanas"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => guardarSemana(cheapest.total),
        className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
        style: { background: "#1FAA59", color: "#FFFFFF" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "archive", size: 13 }),
      " Guardar esta semana"
    )), historyMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#1FAA59" } }, historyMsg), historial.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#6B6552" } }, 'A\xFAn no has guardado ninguna semana. Pulsa "Guardar esta semana" para empezar a ver c\xF3mo evoluciona tu gasto con el tiempo.') : /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Ver hist\xF3rico (", historial.length, " ", historial.length === 1 ? "semana guardada" : "semanas guardadas", ")"), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, historial.length >= 2 && /* @__PURE__ */ React.createElement("div", { className: "rounded-xl p-3 mb-3", style: { background: "#FFFFFF", border: "1px solid #C9C0AC", height: 160 } }, /* @__PURE__ */ React.createElement(MiniLineChart, { data: historial, dataKey: "total", unit: " \u20AC" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, historial.slice().reverse().map((h) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: h.id,
        className: "flex items-center justify-between px-3 py-2 rounded-xl",
        style: { background: "#FFFFFF", border: "1px solid #C9C0AC" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, h.date), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, h.style), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, h.servings, " pers.")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm font-bold" }, fmt(h.total), " \u20AC"), /* @__PURE__ */ React.createElement("button", { onClick: () => borrarSemana(h.id), "aria-label": `Borrar semana del ${h.date}`, style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 14 })))
    )))))), (repeatedIngredients.length > 0 || leftoverIngredients.length > 0) && /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer" }, "Aprovecha mejor la compra"), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, repeatedIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#1FAA59" } }, /* @__PURE__ */ React.createElement(Icon, { name: "repeat", size: 13 }), " Se repiten en varios platos"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, repeatedIngredients.map(([id, u]) => /* @__PURE__ */ React.createElement("div", { key: id, className: "flex items-center justify-between px-3 py-2 rounded-xl text-sm", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "en ", u.count, " platos \xB7 compra un pack m\xE1s grande, lo aprovechas todo"))))), leftoverIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13 }), " Esto te puede sobrar"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, leftoverIngredients.map((u) => /* @__PURE__ */ React.createElement("div", { key: u.id, className: "flex items-center justify-between px-3 py-2 rounded-xl text-sm", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[u.id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs text-right", style: { color: "#6B6552" } }, "usas ", fmtNum(u.totalQty), " de ", u.packagesNeeded, " ", prices[u.id].unit, " que compras")))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2", style: { color: "#8A8470" } }, "Aprovecha el resto en otra receta de la semana siguiente, o cong\xE9lalo si se puede."))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer flex items-center gap-2" }, "Picoteo y extras ", /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, "opcional")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3 mt-3", style: { color: "#4A4536" } }, "Para el d\xEDa corriente \u2014 patatas, encurtidos, bebidas... M\xE1rcalos si quieres que se sumen al ticket de la semana; si no, el men\xFA sigue siendo solo las 14 comidas."), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, EXTRA_CATEGORIES.map((catName) => {
      const items = EXTRAS.filter((ex) => ex.category === catName);
      if (items.length === 0) return null;
      return /* @__PURE__ */ React.createElement("div", { key: catName }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#1FAA59" } }, catName), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, items.map((ex) => {
        const checked = !!extrasQty[ex.id];
        const qty = extrasQty[ex.id] || 1;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: ex.id,
            className: "flex items-center justify-between px-3 py-2 rounded-xl",
            style: { background: "#FFFFFF", border: `1.5px solid ${checked ? "#1FAA59" : "#C9C0AC"}` }
          },
          /* @__PURE__ */ React.createElement("button", { onClick: () => toggleExtra(ex.id), className: "flex items-center gap-2 text-left flex-1" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "flex items-center justify-center rounded-xl",
              style: { width: 18, height: 18, border: "1.5px solid #1FAA59", background: checked ? "#1FAA59" : "transparent" }
            },
            checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FFFFFF" })
          ), /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, ex.emoji), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, ex.label)),
          checked && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-sm" }, /* @__PURE__ */ React.createElement("button", { onClick: () => changeExtraQty(ex.id, -1), className: "px-1.5", style: { color: "#1FAA59" } }, "\u2212"), /* @__PURE__ */ React.createElement("span", null, qty), /* @__PURE__ */ React.createElement("button", { onClick: () => changeExtraQty(ex.id, 1), className: "px-1.5", style: { color: "#1FAA59" } }, "+"), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B6552", minWidth: 48, textAlign: "right" } }, fmt(ex[cheapest.id] * qty), " \u20AC"))
        );
      })));
    })))), /* @__PURE__ */ React.createElement("section", { id: "editor-precios", className: "max-w-3xl mx-auto px-5 mb-16" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditing((v) => !v),
        className: "font-mono text-xs uppercase tracking-wide underline",
        style: { color: "#1FAA59" }
      },
      editing ? "Ocultar ajuste de precios" : "Ajustar precios a tu s\xFAper real \u2192"
    ), editing && /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-xl p-4", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3", style: { color: "#6B6552" } }, "Cambia cualquier precio para que coincida con tu compra real. Se guarda solo en este dispositivo."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 flex items-start gap-1.5", style: { color: mercadonaReal ? "#1FAA59" : "#6B6552" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 13, className: "mt-0.5 flex-shrink-0" }), mercadonaReal ? "Los precios de Mercadona se actualizan autom\xE1ticamente cada semana desde su cat\xE1logo real. El resto son estimaciones orientativas." : "Varios ingredientes clave (huevos, pollo, carne picada, salm\xF3n, patatas, gambas, dorada, ternera, champi\xF1ones y m\xE1s) est\xE1n calibrados con datos reales de comparadores (FACUA, Mercastic, Supersupers, Soysuper) de 2026. El resto son estimaciones orientativas \u2014 y los de Lidl en general, porque no vende online en Espa\xF1a y apenas hay seguimiento p\xFAblico de sus precios."), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm font-mono min-w-[480px]" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { borderBottom: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1 pr-2 text-left", style: { color: "#6B6552" } }, "Ingrediente"), STORES.map((s) => /* @__PURE__ */ React.createElement("td", { key: s.id, className: "py-1 px-2 text-right", style: { color: "#6B6552" } }, s.name)))), /* @__PURE__ */ React.createElement("tbody", null, CATEGORIES.map((cat) => {
      const catOpen = !!openCategories[cat.name];
      const idsPresent = cat.ids.filter((id) => prices[id]);
      if (idsPresent.length === 0) return null;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("tr", { key: cat.name, style: { background: "#F0EBDD" } }, /* @__PURE__ */ React.createElement("td", { colSpan: STORES.length + 1, className: "py-1.5" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setOpenCategories((p) => ({ ...p, [cat.name]: !p[cat.name] })),
          className: "flex items-center gap-1.5 font-mono text-xs uppercase",
          style: { color: "#1FAA59" }
        },
        /* @__PURE__ */ React.createElement(Icon, { name: "chevronDown", size: 13, style: { transform: catOpen ? "rotate(180deg)" : "none" } }),
        cat.name,
        " (",
        idsPresent.length,
        ")"
      ))), catOpen && idsPresent.map((id) => {
        const ing = prices[id];
        return /* @__PURE__ */ React.createElement("tr", { key: id, style: { borderBottom: "1px dashed #E3DCC9" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1.5 pr-2 pl-4" }, ing.label), STORES.map((s) => /* @__PURE__ */ React.createElement("td", { key: s.id, className: "py-1.5 px-2 text-right" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            step: "0.01",
            value: ing[s.id],
            onChange: (e) => updatePrice(id, s.id, e.target.value),
            className: "w-16 text-right bg-transparent border-b outline-none",
            style: { borderColor: "#C9C0AC" }
          }
        ))));
      }));
    })))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mt-4" }, /* @__PURE__ */ React.createElement("button", { onClick: savePrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-xl", style: { background: "#1FAA59", color: "#FFFFFF" } }, /* @__PURE__ */ React.createElement(Icon, { name: "save", size: 13 }), " Guardar"), /* @__PURE__ */ React.createElement("button", { onClick: resetPrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-xl", style: { border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 13 }), " Restablecer"), saveMsg && /* @__PURE__ */ React.createElement("span", { className: "text-xs", style: { color: "#1FAA59" } }, saveMsg)))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-16" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Copia de seguridad y pasar a otro dispositivo"), /* @__PURE__ */ React.createElement("div", { className: "mt-3 rounded-xl p-4", style: { background: "#FFFFFF", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3", style: { color: "#4A4536" } }, "Tus datos se guardan solo en este navegador. Para usarlos en otro dispositivo (o no perderlos si borras el navegador), exporta un archivo aqu\xED e imp\xF3rtalo en el otro."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-3" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: exportarDatos,
        className: "font-mono text-xs uppercase px-3 py-1.5 rounded-xl",
        style: { background: "#1FAA59", color: "#FFFFFF" }
      },
      "Exportar mis datos"
    ), /* @__PURE__ */ React.createElement(
      "label",
      {
        className: "font-mono text-xs uppercase px-3 py-1.5 rounded-xl cursor-pointer",
        style: { border: "1px solid #C9C0AC", color: "#20281F" }
      },
      "Importar datos",
      /* @__PURE__ */ React.createElement("input", { type: "file", accept: "application/json", onChange: importarDatos, style: { display: "none" } })
    ), shareMsg && /* @__PURE__ */ React.createElement("span", { className: "text-xs", style: { color: "#1FAA59" } }, shareMsg))))), /* @__PURE__ */ React.createElement("footer", { className: "max-w-3xl mx-auto px-5 pb-10 text-xs", style: { color: "#8A8470" } }, "Prototipo \xB7 precios de referencia, no oficiales de cada cadena."));
  }
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
