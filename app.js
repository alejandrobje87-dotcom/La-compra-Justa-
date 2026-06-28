(() => {
  // app-source-new5.jsx
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
    { id: "mercadona", name: "Mercadona", color: "#3F6B4F" },
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
    patatas: { unit: "kg", label: "Patatas", mercadona: 0.95, lidl: 0.85, carrefour: 1.05, dia: 0.89 },
    huevos: { unit: "docena", label: "Huevos", mercadona: 3, lidl: 2.7, carrefour: 2.6, dia: 3.1 },
    cebolla: { unit: "kg", label: "Cebolla", mercadona: 0.85, lidl: 0.75, carrefour: 0.95, dia: 0.79 },
    ensalada: { unit: "kg", label: "Lechuga y tomate", mercadona: 2.2, lidl: 1.95, carrefour: 2.45, dia: 2.05 },
    pollo: { unit: "kg", label: "Muslos de pollo", mercadona: 3.5, lidl: 3.2, carrefour: 3.6, dia: 3.25 },
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
    leche: { unit: "litro", label: "Leche", mercadona: 0.85, lidl: 0.75, carrefour: 0.95, dia: 0.8 },
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
    vinoBlancoCocina: { unit: "botella", label: "Vino blanco para cocinar", mercadona: 2.5, lidl: 2.1, carrefour: 2.8, dia: 2.3 }
  };
  var CATEGORIES = [
    { name: "Carnes", ids: ["pollo", "chorizo", "carnePicada", "pavoFilete", "jamonYork", "solomilloCerdo"] },
    { name: "Pescados y mariscos", ids: ["salmon", "merluza", "atun", "bacalao", "langostinos"] },
    { name: "Verduras y hortalizas", ids: ["patatas", "cebolla", "ensalada", "asar", "zanahoria", "boniato", "calabaza", "calabacin", "espinacas", "setas"] },
    { name: "Legumbres y cereales", ids: ["garbanzos", "lentejas", "arroz", "pasta", "quinoa"] },
    { name: "L\xE1cteos y huevos", ids: ["huevos", "leche", "quesoRallado", "parmesano"] },
    { name: "Despensa", ids: ["tomateFrito", "panHamburguesa", "masaPizza", "vinoBlancoCocina"] }
  ];
  var ALLERGEN_GROUPS = [
    { key: "gluten", emoji: "\u{1F33E}", label: "Gluten", ids: ["pasta", "masaPizza", "panHamburguesa"] },
    { key: "lactosa", emoji: "\u{1F95B}", label: "Lactosa", ids: ["leche", "quesoRallado", "parmesano"] },
    { key: "huevo", emoji: "\u{1F95A}", label: "Huevo", ids: ["huevos"] },
    { key: "pescado", emoji: "\u{1F41F}", label: "Pescado", ids: ["salmon", "merluza", "atun", "bacalao"] },
    { key: "marisco", emoji: "\u{1F990}", label: "Marisco", ids: ["langostinos"] },
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
  var STYLES = {
    sana: { label: "Sana", desc: "M\xE1s verdura, legumbre y pescado; menos procesados y frituras.", menu: MENU_SANA },
    normal: { label: "Normal", desc: "El equilibrio habitual entre sencillez, variedad y coste.", menu: MENU_NORMAL },
    elaborada: { label: "Elaborada", desc: "Ingredientes m\xE1s sofisticados: solomillo, marisco, risottos.", menu: MENU_ELABORADA }
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
    const [shareMsg, setShareMsg] = useState("");
    useEffect(() => {
      (async () => {
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
    const activeMenu = STYLES[menuStyle].menu;
    const getMeal = (day, mealType) => {
      const key = `${menuStyle}|${day}|${mealType}`;
      const overrideDay = swaps[key];
      if (overrideDay) {
        const sourceDay = activeMenu.find((d) => d.day === overrideDay);
        if (sourceDay) return sourceDay[mealType];
      }
      const original = activeMenu.find((d) => d.day === day);
      return original[mealType];
    };
    const swapMeal = (day, mealType, fromDay) => {
      const key = `${menuStyle}|${day}|${mealType}`;
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
      [activeMenu, swaps, menuStyle]
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
    const guardarSemana = (totalSemana) => {
      const entry = {
        id: Date.now(),
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
        style: STYLES[menuStyle].label,
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
    const compartirLista = async () => {
      let texto = `\u{1F6D2} Lista de la compra \u2014 La Compra Justa
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
        label: prices[id].label,
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
          style: { background: "#F3EEE3", color: "#6B6552", minHeight: "100vh" },
          className: "flex items-center justify-center font-mono text-sm"
        },
        "Cargando tu men\xFA\u2026"
      );
    }
    return /* @__PURE__ */ React.createElement("div", { style: { background: "#F3EEE3", color: "#20281F", minHeight: "100vh" }, className: "font-body" }, /* @__PURE__ */ React.createElement("style", null, `
        .font-body { font-family: 'Work Sans', sans-serif; }
        .font-display { font-family: 'Archivo Black', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; font-variant-numeric: tabular-nums; }
        .dotted-line { background-image: repeating-linear-gradient(to right, #20281F 0, #20281F 3px, transparent 3px, transparent 8px); height: 1px; }
        .ticket-edge::after {
          content: ""; display: block; height: 14px;
          background: repeating-linear-gradient(135deg, transparent 0 6px, #F3EEE3 6px 12px), repeating-linear-gradient(45deg, transparent 0 6px, #F3EEE3 6px 12px);
          background-color: #FBF8F0; margin-top: -1px;
        }
        .stamp { transform: rotate(-6deg); border: 3px solid #C2452F; color: #C2452F; }
        summary { list-style: none; }
        summary::-webkit-details-marker { display: none; }
        summary::after { content: '\u25BE'; float: right; color: #3F6B4F; transition: transform .2s; margin-left: 8px; }
        details[open] summary::after { transform: rotate(180deg); }
      `), /* @__PURE__ */ React.createElement("header", { className: "max-w-3xl mx-auto px-5 pt-10 pb-6" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs tracking-widest uppercase", style: { color: "#3F6B4F" } }, "Men\xFA semanal \xB7 comida y cena"), /* @__PURE__ */ React.createElement("h1", { className: "font-display text-3xl sm:text-4xl mt-2 leading-tight" }, "La Compra Justa"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm sm:text-base", style: { color: "#4A4536" } }, "Comidas sencillas para toda la semana, con el ticket real de lo que cuestan en cada supermercado.")), /* @__PURE__ */ React.createElement(
      "nav",
      {
        className: "sticky top-0 z-10 overflow-x-auto whitespace-nowrap px-5 py-2.5 mb-6",
        style: { background: "#F3EEE3", borderBottom: "1px solid #C9C0AC" },
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
          className: "font-mono text-xs px-2.5 py-1 rounded-sm flex-shrink-0",
          style: { border: "1px solid #C9C0AC", background: "#FBF8F0", color: "#3F6B4F" }
        },
        item.label
      )))
    ), /* @__PURE__ */ React.createElement("section", { id: "perfil", className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-4", style: { background: "#FBF8F0", border: "1.5px solid #3F6B4F" } }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-3" }, "Tu perfil"), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Presupuesto semanal para comida (opcional)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: presupuestoSemanal,
        onChange: (e) => updatePresupuestoSemanal(e.target.value),
        placeholder: "Ej. 70",
        className: "font-mono text-lg bg-transparent border-b outline-none w-24",
        style: { borderColor: "#3F6B4F" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm", style: { color: "#6B6552" } }, "\u20AC / semana"), parseFloat(presupuestoSemanal) > 0 && /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "font-mono text-xs ml-auto px-2 py-1 rounded-sm",
        style: {
          background: cheapest.total <= parseFloat(presupuestoSemanal) ? "#3F6B4F" : "#C2452F",
          color: "#FBF8F0"
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
        className: "font-mono text-xs px-3 py-1.5 rounded-sm",
        style: {
          border: `1.5px solid ${servings === h.n ? "#3F6B4F" : "#C9C0AC"}`,
          background: servings === h.n ? "#3F6B4F" : "#FFFFFF",
          color: servings === h.n ? "#FBF8F0" : "#20281F"
        }
      },
      h.label
    ))), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Nivel de comida"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-1" }, NIVELES.map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n.key,
        onClick: () => setStyle(n.key),
        className: "font-mono text-xs px-3 py-1.5 rounded-sm flex items-center gap-1.5",
        style: {
          border: `1.5px solid ${menuStyle === n.key ? "#3F6B4F" : "#C9C0AC"}`,
          background: menuStyle === n.key ? "#3F6B4F" : "#FFFFFF",
          color: menuStyle === n.key ? "#FBF8F0" : "#20281F"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, n.emoji),
      " ",
      n.label
    ))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: "#8A8470" } }, NIVELES.find((n) => n.key === menuStyle)?.sub, " \u2014 ", STYLES[menuStyle].desc), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Tu objetivo"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, OBJETIVOS.map((o) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: o.key,
        onClick: () => updateObjetivo(o.key),
        className: "font-mono text-xs px-3 py-1.5 rounded-sm flex items-center gap-1.5",
        style: {
          border: `1.5px solid ${objetivo === o.key ? "#3F6B4F" : "#C9C0AC"}`,
          background: objetivo === o.key ? "#3F6B4F" : "#FFFFFF",
          color: objetivo === o.key ? "#FBF8F0" : "#20281F"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, o.emoji),
      " ",
      o.label
    ))), objetivo === "ahorrar" && menuStyle !== "sana" && /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3", style: { color: "#3F6B4F" } }, "\u{1F4A1} Como tu objetivo es ahorrar, el nivel \u{1F7E2} Econ\xF3mico suele salir m\xE1s barato. Pru\xE9balo y compara el ticket."), objetivo === "saludable" && menuStyle !== "sana" && /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3", style: { color: "#3F6B4F" } }, "\u{1F4A1} El nivel \u{1F7E2} Econ\xF3mico es tambi\xE9n el m\xE1s ligero en procesados y frituras esta semana."))), objetivo === "saludable" && /* @__PURE__ */ React.createElement("section", { id: "progreso-peso", className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-4", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-1" }, "Tu progreso"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4", style: { color: "#8A8470" } }, "Esto es un registro personal, no sustituye el consejo de un profesional de la salud. M\xE1rcate objetivos graduales y realistas."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Peso actual"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: pesoActual,
        onChange: (e) => updatePesoActual(e.target.value),
        placeholder: "Ej. 78",
        className: "font-mono text-lg bg-transparent border-b outline-none w-16",
        style: { borderColor: "#3F6B4F" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "kg"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Peso al que te gustar\xEDa llegar"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: pesoObjetivo,
        onChange: (e) => updatePesoObjetivo(e.target.value),
        placeholder: "Ej. 72",
        className: "font-mono text-lg bg-transparent border-b outline-none w-16",
        style: { borderColor: "#3F6B4F" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "kg")))), /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-1", style: { color: "#6B6552" } }, "Fecha en la que te gustar\xEDa conseguirlo (opcional)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: fechaObjetivoPeso,
        onChange: (e) => updateFechaObjetivoPeso(e.target.value),
        className: "font-mono text-sm bg-transparent border-b outline-none mb-3",
        style: { borderColor: "#3F6B4F" }
      }
    ), parseFloat(pesoActual) > 0 && parseFloat(pesoObjetivo) > 0 && /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3", style: { color: "#4A4536" } }, "Te ", parseFloat(pesoActual) > parseFloat(pesoObjetivo) ? "faltan" : "sobran", " ", /* @__PURE__ */ React.createElement("strong", null, Math.abs(parseFloat(pesoActual) - parseFloat(pesoObjetivo)).toFixed(1), " kg"), " para llegar a tu objetivo", fechaObjetivoPeso ? ` antes del ${new Date(fechaObjetivoPeso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}` : "", "."), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#6B6552" } }, "Seguimiento mensual"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: anotarPesoMensual,
        className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm",
        style: { background: "#3F6B4F", color: "#FBF8F0" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "save", size: 13 }),
      " Anotar este mes"
    )), pesoMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#3F6B4F" } }, pesoMsg), pesoHistorial.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#6B6552" } }, 'A\xFAn no has anotado tu peso. Pulsa "Anotar este mes" cuando quieras empezar tu seguimiento.') : /* @__PURE__ */ React.createElement(React.Fragment, null, pesoHistorial.length >= 2 && /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-3 mb-3", style: { background: "#FFFFFF", border: "1px solid #C9C0AC", height: 140 } }, /* @__PURE__ */ React.createElement(MiniLineChart, { data: pesoHistorial, dataKey: "weight", unit: " kg" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, pesoHistorial.slice().reverse().map((p) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        className: "flex items-center justify-between px-3 py-2 rounded-sm",
        style: { background: "#FFFFFF", border: "1px solid #C9C0AC" }
      },
      /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, p.date),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm font-bold" }, p.weight, " kg"), /* @__PURE__ */ React.createElement("button", { onClick: () => borrarPesoEntry(p.id), "aria-label": `Borrar registro de ${p.date}`, style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 14 })))
    )))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Ingredientes a evitar (alergias o no me gusta) ", avoidIds.length > 0 ? `\xB7 ${avoidIds.length} seleccionados` : ""), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mt-3 mb-1.5", style: { color: "#3F6B4F" } }, "Alergias e intolerancias comunes"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#8A8470" } }, "Marca una y se excluyen de golpe todos los ingredientes relacionados."), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 mb-4" }, ALLERGEN_GROUPS.map((g) => {
      const active = g.ids.every((id) => avoidIds.includes(id));
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: g.key,
          onClick: () => toggleAllergenGroup(g.ids),
          className: "text-xs px-2.5 py-1 rounded-sm flex items-center gap-1",
          style: {
            border: `1.5px solid ${active ? "#C2452F" : "#3F6B4F"}`,
            background: active ? "#C2452F" : "#FBF8F0",
            color: active ? "#FBF8F0" : "#3F6B4F"
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
          className: "text-xs px-2.5 py-1 rounded-sm",
          style: {
            border: `1.5px solid ${active ? "#C2452F" : "#C9C0AC"}`,
            background: active ? "#C2452F" : "#FBF8F0",
            color: active ? "#FBF8F0" : "#20281F"
          }
        },
        ing.label
      );
    })))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-t-sm shadow-sm overflow-hidden", style: { background: "#FBF8F0" } }, /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs uppercase tracking-wide", style: { color: "#4A4536" } }, "Ticket de la semana"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#4A4536" } }, "14 comidas", extrasCount > 0 ? ` + ${extrasCount} extra${extrasCount > 1 ? "s" : ""}` : "", " \xB7 ", servings, " ", servings === 1 ? "raci\xF3n" : "raciones")), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex items-end justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#4A4536" } }, "M\xE1s barato en"), /* @__PURE__ */ React.createElement("p", { className: "font-display text-xl mt-1", style: { color: cheapest.color } }, cheapest.name)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#4A4536" } }, "Total"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-3xl font-bold" }, fmt(cheapest.total), " \u20AC"))), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mt-4 mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between flex-wrap gap-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#4A4536" } }, "Frente a comprarlo todo en ", priciest.name, ", te ahorras"), /* @__PURE__ */ React.createElement("span", { className: "stamp font-mono text-sm font-bold px-2 py-0.5 rounded-sm" }, "\u2212", fmt(savings), " \u20AC")), historial.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between flex-wrap gap-2 mt-3 pt-3", style: { borderTop: "1px dashed #C9C0AC" } }, /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#4A4536" } }, "Comparado con tu \xFAltima semana guardada (", historial[historial.length - 1].date, ")"), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "font-mono text-sm font-bold",
        style: { color: cheapest.total <= historial[historial.length - 1].total ? "#3F6B4F" : "#C2452F" }
      },
      cheapest.total <= historial[historial.length - 1].total ? "\u2212" : "+",
      fmt(Math.abs(cheapest.total - historial[historial.length - 1].total)),
      " \u20AC"
    ))), /* @__PURE__ */ React.createElement("div", { className: "ticket-edge" })), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2 flex items-start gap-1.5", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 14, className: "mt-0.5 flex-shrink-0" }), "Cubre solo las 14 comidas y cenas de abajo (no desayunos, snacks ni higiene). Es una referencia, no tu compra completa.", avoidedCount > 0 ? ` ${avoidedCount} plato${avoidedCount > 1 ? "s" : ""} con ingredientes a evitar no est\xE1${avoidedCount > 1 ? "n" : ""} incluido${avoidedCount > 1 ? "s" : ""} en el total.` : "")), /* @__PURE__ */ React.createElement("section", { id: "presupuesto", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer" }, "Tu presupuesto frente a la media nacional"), /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-4 mt-3", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Ingresos netos del hogar al mes (opcional)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: ingresos,
        onChange: (e) => updateIngresos(e.target.value),
        placeholder: "Ej. 2400",
        className: "font-mono text-lg bg-transparent border-b outline-none w-32",
        style: { borderColor: "#3F6B4F" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm", style: { color: "#6B6552" } }, "\u20AC / mes")), ingresosNum > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-2", style: { color: "#4A4536" } }, "En Espa\xF1a, lo habitual es destinar entre el 10% y el 20% del ingreso a alimentaci\xF3n (media nacional: 15,8%, seg\xFAn el INE). Para tus ingresos, eso es:"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-sm mb-3" }, /* @__PURE__ */ React.createElement("strong", null, fmt(presupuestoMin), " \u20AC \u2013 ", fmt(presupuestoMax), " \u20AC / mes"), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B6552" } }, " (media orientativa: ", fmt(presupuestoMedia), " \u20AC)")), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { color: "#4A4536" } }, "Tu men\xFA actual cuesta aprox."), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-lg font-bold" }, fmt(monthlyCost), " \u20AC / mes")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2", style: { color: monthlyCost <= presupuestoMax ? "#3F6B4F" : "#C2452F" } }, monthlyCost < presupuestoMin ? "Est\xE1 por debajo del rango habitual \u2014 quiz\xE1 haya margen para variar m\xE1s el men\xFA." : monthlyCost <= presupuestoMax ? "Est\xE1 dentro del rango habitual para tus ingresos." : "Est\xE1 por encima del rango habitual \u2014 revisa el editor de precios o reduce extras.")) : /* @__PURE__ */ React.createElement("p", { className: "text-xs", style: { color: "#8A8470" } }, "Indica tus ingresos para ver si el coste de este men\xFA es razonable para tu situaci\xF3n."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3 flex items-start gap-1.5", style: { color: "#8A8470" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 12, className: "mt-0.5 flex-shrink-0" }), "Referencia informativa (datos INE), no asesoramiento financiero. Tus gastos fijos (alquiler, hijos, deudas) cambian lo que es razonable para tu caso.")))), /* @__PURE__ */ React.createElement("section", { id: "menu-semana", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-4" }, "La semana, d\xEDa a d\xEDa"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, activeMenu.map((d) => /* @__PURE__ */ React.createElement("div", { key: d.day }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#3F6B4F" } }, d.day), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, ["comida", "cena"].map((mealType) => {
      const r = getMeal(d.day, mealType);
      const key = `${d.day}-${mealType}`;
      const swapKey = `${menuStyle}|${d.day}|${mealType}`;
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
          className: "border rounded-sm",
          style: { borderColor: avoided ? "#C2452F" : "#C9C0AC", background: "#FBF8F0" }
        },
        /* @__PURE__ */ React.createElement("div", { className: "w-full flex items-center justify-between px-4 py-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenMeal(isOpen ? null : key), className: "flex items-center gap-3 text-left flex-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, r.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase flex items-center gap-1", style: { color: avoided ? "#C2452F" : "#6B6552" } }, mealType === "comida" ? "Comida" : "Cena", " \xB7 ", r.time, isSwapped && /* @__PURE__ */ React.createElement("span", { style: { color: "#3F6B4F" } }, "\xB7 cambiado"), avoided && /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-0.5" }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 11 }), " revisa ingredientes")), /* @__PURE__ */ React.createElement("p", { className: "font-medium text-sm sm:text-base" }, r.name))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setSwapPickerKey(isPicking ? null : swapKey),
            "aria-label": "Cambiar este plato por otro de la semana",
            style: { color: isSwapped ? "#3F6B4F" : "#C9C0AC" }
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
              className: "text-xs px-2.5 py-1 rounded-sm flex items-center gap-1",
              style: {
                border: `1.5px solid ${isCurrentSource ? "#3F6B4F" : "#C9C0AC"}`,
                background: isCurrentSource ? "#3F6B4F" : "#FFFFFF",
                color: isCurrentSource ? "#FBF8F0" : "#20281F"
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
        isOpen && /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-4 pt-1 border-t", style: { borderColor: "#E3DCC9" } }, avoided && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 flex items-start gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13, className: "mt-0.5 flex-shrink-0" }), "Contiene un ingrediente que marcaste para evitar. No se incluye en el total de la semana \u2014 sustit\xFAyelo o coc\xEDnalo aparte."), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Preparaci\xF3n"), /* @__PURE__ */ React.createElement("ol", { className: "text-sm mb-4 space-y-1.5", style: { color: "#4A4536" } }, r.steps.map((step, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono flex-shrink-0", style: { color: "#3F6B4F" } }, i + 1, "."), /* @__PURE__ */ React.createElement("span", null, step)))), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Ingredientes para ", servings, " ", servings === 1 ? "persona" : "personas"), /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm font-mono" }, /* @__PURE__ */ React.createElement("tbody", null, r.items.map((it) => {
          const totalQty = it.qty * factor;
          const perPerson = totalQty / servings;
          return /* @__PURE__ */ React.createElement("tr", { key: it.id, style: { borderTop: "1px dashed #C9C0AC" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1.5" }, prices[it.id].label), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#20281F" } }, formatQty(totalQty, prices[it.id].unit)), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, " (", formatQty(perPerson, prices[it.id].unit), "/persona)")), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right pl-4" }, fmt((prices[it.id][cheapest.id] || 0) * totalQty), " \u20AC"));
        }))))
      );
    })))))), /* @__PURE__ */ React.createElement("section", { id: "lista-compra", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Lista de la compra"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: compartirLista, className: "font-mono text-xs underline flex items-center gap-1", style: { color: "#3F6B4F" } }, "Compartir"), /* @__PURE__ */ React.createElement("button", { onClick: vaciarLista, className: "font-mono text-xs underline", style: { color: "#6B6552" } }, "Desmarcar todo"))), shareMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-1", style: { color: "#3F6B4F" } }, shareMsg), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-4", style: { color: "#4A4536" } }, "Todo lo que necesitas esta semana, en un solo listado \u2014 para llevarlo al s\xFAper sin mirar receta por receta."), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3 mb-3 rounded-sm",
        style: { background: "#FBF8F0", border: "1.5px solid #3F6B4F" }
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { color: "#4A4536" } }, "Te queda por comprar"),
      /* @__PURE__ */ React.createElement("span", { className: "font-mono text-lg font-bold" }, fmt(shoppingTotalPendiente), " \u20AC")
    ), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, shoppingByCategory.map((cat) => /* @__PURE__ */ React.createElement("div", { key: cat.name }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#3F6B4F" } }, cat.name), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, cat.items.map((it) => {
      const checked = boughtItems.includes(it.id);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: it.id,
          onClick: () => toggleBought(it.id),
          "aria-pressed": checked,
          "aria-label": `Marcar ${it.label} como comprado`,
          className: "w-full flex items-center justify-between px-3 py-2 rounded-sm text-left",
          style: { background: "#FBF8F0", border: "1px solid #C9C0AC", opacity: checked ? 0.5 : 1 }
        },
        /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "span",
          {
            className: "flex items-center justify-center rounded-sm flex-shrink-0",
            style: { width: 18, height: 18, border: "1.5px solid #3F6B4F", background: checked ? "#3F6B4F" : "transparent" }
          },
          checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FBF8F0" })
        ), /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { textDecoration: checked ? "line-through" : "none" } }, it.label)),
        /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, it.qtyLabel)
      );
    })))), shoppingExtras.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#3F6B4F" } }, "Picoteo y extras"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, shoppingExtras.map((it) => {
      const checked = boughtItems.includes(it.id);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: it.id,
          onClick: () => toggleBought(it.id),
          "aria-pressed": checked,
          "aria-label": `Marcar ${it.label} como comprado`,
          className: "w-full flex items-center justify-between px-3 py-2 rounded-sm text-left",
          style: { background: "#FBF8F0", border: "1px solid #C9C0AC", opacity: checked ? 0.5 : 1 }
        },
        /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "span",
          {
            className: "flex items-center justify-center rounded-sm flex-shrink-0",
            style: { width: 18, height: 18, border: "1.5px solid #3F6B4F", background: checked ? "#3F6B4F" : "transparent" }
          },
          checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FBF8F0" })
        ), /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { textDecoration: checked ? "line-through" : "none" } }, it.label)),
        /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, it.qtyLabel)
      );
    }))))), /* @__PURE__ */ React.createElement("section", { id: "comparativa", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-4" }, "Comparativa de supermercados"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, totals.sort((a, b) => a.total - b.total).map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, className: "rounded-sm p-4 relative", style: { background: "#FBF8F0", border: `1.5px solid ${s.id === cheapest.id ? s.color : "#C9C0AC"}` } }, s.id === cheapest.id && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-2 -right-2 rounded-full p-1", style: { background: "#3F6B4F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FBF8F0" })), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#6B6552" } }, s.name), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xl font-bold mt-1" }, fmt(s.total), " \u20AC"))))), /* @__PURE__ */ React.createElement("section", { id: "historico", className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Hist\xF3rico de semanas"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => guardarSemana(cheapest.total),
        className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm",
        style: { background: "#3F6B4F", color: "#FBF8F0" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "archive", size: 13 }),
      " Guardar esta semana"
    )), historyMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#3F6B4F" } }, historyMsg), historial.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#6B6552" } }, 'A\xFAn no has guardado ninguna semana. Pulsa "Guardar esta semana" para empezar a ver c\xF3mo evoluciona tu gasto con el tiempo.') : /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Ver hist\xF3rico (", historial.length, " ", historial.length === 1 ? "semana guardada" : "semanas guardadas", ")"), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, historial.length >= 2 && /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-3 mb-3", style: { background: "#FBF8F0", border: "1px solid #C9C0AC", height: 160 } }, /* @__PURE__ */ React.createElement(MiniLineChart, { data: historial, dataKey: "total", unit: " \u20AC" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, historial.slice().reverse().map((h) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: h.id,
        className: "flex items-center justify-between px-3 py-2 rounded-sm",
        style: { background: "#FBF8F0", border: "1px solid #C9C0AC" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, h.date), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, h.style), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, h.servings, " pers.")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm font-bold" }, fmt(h.total), " \u20AC"), /* @__PURE__ */ React.createElement("button", { onClick: () => borrarSemana(h.id), "aria-label": `Borrar semana del ${h.date}`, style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 14 })))
    )))))), (repeatedIngredients.length > 0 || leftoverIngredients.length > 0) && /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer" }, "Aprovecha mejor la compra"), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, repeatedIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#3F6B4F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "repeat", size: 13 }), " Se repiten en varios platos"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, repeatedIngredients.map(([id, u]) => /* @__PURE__ */ React.createElement("div", { key: id, className: "flex items-center justify-between px-3 py-2 rounded-sm text-sm", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "en ", u.count, " platos \xB7 compra un pack m\xE1s grande, lo aprovechas todo"))))), leftoverIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13 }), " Esto te puede sobrar"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, leftoverIngredients.map((u) => /* @__PURE__ */ React.createElement("div", { key: u.id, className: "flex items-center justify-between px-3 py-2 rounded-sm text-sm", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[u.id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs text-right", style: { color: "#6B6552" } }, "usas ", fmtNum(u.totalQty), " de ", u.packagesNeeded, " ", prices[u.id].unit, " que compras")))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2", style: { color: "#8A8470" } }, "Aprovecha el resto en otra receta de la semana siguiente, o cong\xE9lalo si se puede."))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-display text-lg cursor-pointer flex items-center gap-2" }, "Picoteo y extras ", /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, "opcional")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3 mt-3", style: { color: "#4A4536" } }, "Para el d\xEDa corriente \u2014 patatas, encurtidos, bebidas... M\xE1rcalos si quieres que se sumen al ticket de la semana; si no, el men\xFA sigue siendo solo las 14 comidas."), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, EXTRA_CATEGORIES.map((catName) => {
      const items = EXTRAS.filter((ex) => ex.category === catName);
      if (items.length === 0) return null;
      return /* @__PURE__ */ React.createElement("div", { key: catName }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#3F6B4F" } }, catName), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, items.map((ex) => {
        const checked = !!extrasQty[ex.id];
        const qty = extrasQty[ex.id] || 1;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: ex.id,
            className: "flex items-center justify-between px-3 py-2 rounded-sm",
            style: { background: "#FBF8F0", border: `1.5px solid ${checked ? "#3F6B4F" : "#C9C0AC"}` }
          },
          /* @__PURE__ */ React.createElement("button", { onClick: () => toggleExtra(ex.id), className: "flex items-center gap-2 text-left flex-1" }, /* @__PURE__ */ React.createElement(
            "span",
            {
              className: "flex items-center justify-center rounded-sm",
              style: { width: 18, height: 18, border: "1.5px solid #3F6B4F", background: checked ? "#3F6B4F" : "transparent" }
            },
            checked && /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FBF8F0" })
          ), /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, ex.emoji), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, ex.label)),
          checked && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-mono text-sm" }, /* @__PURE__ */ React.createElement("button", { onClick: () => changeExtraQty(ex.id, -1), className: "px-1.5", style: { color: "#3F6B4F" } }, "\u2212"), /* @__PURE__ */ React.createElement("span", null, qty), /* @__PURE__ */ React.createElement("button", { onClick: () => changeExtraQty(ex.id, 1), className: "px-1.5", style: { color: "#3F6B4F" } }, "+"), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B6552", minWidth: 48, textAlign: "right" } }, fmt(ex[cheapest.id] * qty), " \u20AC"))
        );
      })));
    })))), /* @__PURE__ */ React.createElement("section", { id: "editor-precios", className: "max-w-3xl mx-auto px-5 mb-16" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditing((v) => !v),
        className: "font-mono text-xs uppercase tracking-wide underline",
        style: { color: "#3F6B4F" }
      },
      editing ? "Ocultar ajuste de precios" : "Ajustar precios a tu s\xFAper real \u2192"
    ), editing && /* @__PURE__ */ React.createElement("div", { className: "mt-4 rounded-sm p-4", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3", style: { color: "#6B6552" } }, "Cambia cualquier precio para que coincida con tu compra real. Se guarda solo en este dispositivo."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 flex items-start gap-1.5", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 13, className: "mt-0.5 flex-shrink-0" }), "Huevos, pollo, carne picada y salm\xF3n est\xE1n anclados a datos reales de comparadores de precios (FACUA, Mercastic, Supersupers) de mayo 2026. El resto son estimaciones orientativas \u2014 y los de Lidl en general, porque no vende online en Espa\xF1a y apenas hay seguimiento p\xFAblico de sus precios."), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm font-mono min-w-[480px]" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { borderBottom: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1 pr-2 text-left", style: { color: "#6B6552" } }, "Ingrediente"), STORES.map((s) => /* @__PURE__ */ React.createElement("td", { key: s.id, className: "py-1 px-2 text-right", style: { color: "#6B6552" } }, s.name)))), /* @__PURE__ */ React.createElement("tbody", null, CATEGORIES.map((cat) => {
      const catOpen = !!openCategories[cat.name];
      const idsPresent = cat.ids.filter((id) => prices[id]);
      if (idsPresent.length === 0) return null;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("tr", { key: cat.name, style: { background: "#F0EBDD" } }, /* @__PURE__ */ React.createElement("td", { colSpan: STORES.length + 1, className: "py-1.5" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setOpenCategories((p) => ({ ...p, [cat.name]: !p[cat.name] })),
          className: "flex items-center gap-1.5 font-mono text-xs uppercase",
          style: { color: "#3F6B4F" }
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
    })))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mt-4" }, /* @__PURE__ */ React.createElement("button", { onClick: savePrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm", style: { background: "#3F6B4F", color: "#FBF8F0" } }, /* @__PURE__ */ React.createElement(Icon, { name: "save", size: 13 }), " Guardar"), /* @__PURE__ */ React.createElement("button", { onClick: resetPrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm", style: { border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 13 }), " Restablecer"), saveMsg && /* @__PURE__ */ React.createElement("span", { className: "text-xs", style: { color: "#3F6B4F" } }, saveMsg)))), /* @__PURE__ */ React.createElement("footer", { className: "max-w-3xl mx-auto px-5 pb-10 text-xs", style: { color: "#8A8470" } }, "Prototipo \xB7 precios de referencia, no oficiales de cada cadena."));
  }
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
