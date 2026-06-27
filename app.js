(() => {
  // app-source.jsx
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
  function MiniLineChart({ data }) {
    if (!data || data.length < 2) return null;
    const W = 600, H = 150, pad = 28;
    const totals = data.map((d) => d.total);
    const min = Math.min(...totals);
    const max = Math.max(...totals);
    const range = max - min || 1;
    const stepX = (W - pad * 2) / (data.length - 1);
    const points = data.map((d, i) => {
      const x = pad + i * stepX;
      const y = H - pad - (d.total - min) / range * (H - pad * 2);
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
  var EXTRAS = [
    { id: "patatasFritas", emoji: "\u{1F954}", label: "Patatas fritas (bolsa)", mercadona: 1.1, lidl: 0.95, carrefour: 1.25, dia: 1 },
    { id: "encurtidos", emoji: "\u{1FAD2}", label: "Aceitunas / encurtidos (frasco)", mercadona: 1.5, lidl: 1.3, carrefour: 1.7, dia: 1.4 },
    { id: "frutosSecos", emoji: "\u{1F95C}", label: "Frutos secos (bolsa)", mercadona: 2.2, lidl: 1.9, carrefour: 2.5, dia: 2.05 },
    { id: "refrescos", emoji: "\u{1F964}", label: "Refrescos (pack 6 latas)", mercadona: 3.3, lidl: 2.8, carrefour: 3.6, dia: 3 },
    { id: "cerveza", emoji: "\u{1F37A}", label: "Cerveza (pack 6)", mercadona: 3.6, lidl: 3.1, carrefour: 3.9, dia: 3.3 },
    { id: "vino", emoji: "\u{1F377}", label: "Vino (botella)", mercadona: 3, lidl: 2.6, carrefour: 3.4, dia: 2.8 },
    { id: "helado", emoji: "\u{1F366}", label: "Helado (tarrina)", mercadona: 3.5, lidl: 3, carrefour: 3.9, dia: 3.2 },
    { id: "chocolate", emoji: "\u{1F36B}", label: "Chocolate / galletas", mercadona: 1.8, lidl: 1.5, carrefour: 2, dia: 1.65 }
  ];
  var MENU_NORMAL = [
    {
      day: "Lunes",
      comida: {
        emoji: "\u{1F958}",
        name: "Garbanzos con espinacas",
        time: "30 min",
        items: [{ id: "garbanzos", qty: 1 }, { id: "espinacas", qty: 0.4 }, { id: "cebolla", qty: 0.15 }],
        steps: ["Sofr\xEDe la cebolla, a\xF1ade las espinacas hasta que reduzcan y mezcla con los garbanzos cocidos."]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de patatas con ensalada",
        time: "35 min",
        items: [{ id: "patatas", qty: 0.6 }, { id: "huevos", qty: 0.5 }, { id: "cebolla", qty: 0.2 }, { id: "ensalada", qty: 0.3 }],
        steps: ["Sofr\xEDe las patatas en l\xE1minas con la cebolla.", "Bate los huevos, mezcla y cuaja la tortilla por ambos lados."]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F983}",
        name: "Pavo a la plancha con pur\xE9 de patata",
        time: "30 min",
        items: [{ id: "pavoFilete", qty: 0.6 }, { id: "patatas", qty: 0.6 }, { id: "leche", qty: 0.2 }],
        steps: ["Plancha los filetes de pavo 3-4 min por lado.", "Cuece y machaca las patatas con la leche."]
      },
      cena: {
        emoji: "\u{1F357}",
        name: "Pollo al horno con verduras asadas",
        time: "45 min",
        items: [{ id: "pollo", qty: 0.9 }, { id: "asar", qty: 0.8 }],
        steps: ["Sazona el pollo y hornea junto a las verduras troceadas, 200\xB0C 35-40 min."]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35A}",
        name: "Arroz con verduras y jam\xF3n",
        time: "25 min",
        items: [{ id: "arroz", qty: 0.35 }, { id: "jamonYork", qty: 1 }, { id: "asar", qty: 0.4 }],
        steps: ["Sofr\xEDe las verduras, a\xF1ade el arroz y agua.", "Casi al final, incorpora el jam\xF3n en taquitos."]
      },
      cena: {
        emoji: "\u{1F35D}",
        name: "Pasta con tomate y at\xFAn",
        time: "20 min",
        items: [{ id: "pasta", qty: 1 }, { id: "tomateFrito", qty: 1 }, { id: "atun", qty: 1 }],
        steps: ["Cuece la pasta.", "Calienta el tomate frito con el at\xFAn escurrido y mezcla."]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F41F}",
        name: "Merluza al horno con patatas panadera",
        time: "40 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "patatas", qty: 0.6 }, { id: "cebolla", qty: 0.15 }],
        steps: ["Patatas en rodajas con cebolla como base, encima la merluza, horno 25-30 min a 190\xB0C."]
      },
      cena: {
        emoji: "\u{1F963}",
        name: "Lentejas con chorizo",
        time: "40 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "chorizo", qty: 0.3 }, { id: "cebolla", qty: 0.15 }, { id: "zanahoria", qty: 0.2 }],
        steps: ["Sofr\xEDe cebolla y zanahoria, a\xF1ade chorizo, lentejas y agua.", "Cuece 30 min."]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F361}",
        name: "Alb\xF3ndigas en salsa de tomate con arroz",
        time: "35 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "tomateFrito", qty: 1 }, { id: "arroz", qty: 0.3 }],
        steps: ["Forma las alb\xF3ndigas, d\xF3ralas y termina de cocinarlas en el tomate frito.", "Sirve con arroz."]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al horno con arroz",
        time: "30 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "arroz", qty: 0.3 }],
        steps: ["Hornea el salm\xF3n con lim\xF3n 15-18 min a 190\xB0C.", "Cuece el arroz aparte."]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F355}",
        name: "Pizza casera de jam\xF3n y queso",
        time: "25 min",
        items: [{ id: "masaPizza", qty: 1 }, { id: "jamonYork", qty: 1 }, { id: "quesoRallado", qty: 1 }, { id: "tomateFrito", qty: 1 }],
        steps: ["Extiende la base, a\xF1ade tomate, jam\xF3n y queso.", "Horno 220\xB0C 12-15 min."]
      },
      cena: {
        emoji: "\u{1F354}",
        name: "Hamburguesas caseras con boniato",
        time: "30 min",
        items: [{ id: "carnePicada", qty: 0.5 }, { id: "panHamburguesa", qty: 1 }, { id: "boniato", qty: 0.8 }],
        steps: ["Forma las hamburguesas y plancha 3-4 min por lado.", "Boniato en bastones al horno 25 min."]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas con arroz y verduras",
        time: "35 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "arroz", qty: 0.2 }, { id: "zanahoria", qty: 0.2 }, { id: "cebolla", qty: 0.15 }],
        steps: ["Sofr\xEDe cebolla y zanahoria, a\xF1ade lentejas, arroz y agua.", "Cuece hasta que est\xE9 tierno."]
      },
      cena: {
        emoji: "\u{1F383}",
        name: "Crema de calabaza y tortilla francesa",
        time: "35 min",
        items: [{ id: "calabaza", qty: 1 }, { id: "leche", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: ["Cuece la calabaza y tritura con la leche.", "Acompa\xF1a con una tortilla francesa sencilla."]
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
        steps: ["Mezcla los garbanzos cocidos con el at\xFAn escurrido y la ensalada.", "Ali\xF1a con aceite de oliva y lim\xF3n."]
      },
      cena: {
        emoji: "\u{1F952}",
        name: "Crema de calabac\xEDn con pollo a la plancha",
        time: "30 min",
        items: [{ id: "calabacin", qty: 0.8 }, { id: "pollo", qty: 0.5 }],
        steps: ["Cuece el calabac\xEDn y tritura.", "Plancha el pollo en tiras finas y sirve junto a la crema."]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Merluza al vapor con verduras",
        time: "25 min",
        items: [{ id: "merluza", qty: 0.6 }, { id: "asar", qty: 0.6 }],
        steps: ["Cuece la merluza al vapor 10-12 min.", "Saltea las verduras ligeramente con muy poco aceite."]
      },
      cena: {
        emoji: "\u{1F373}",
        name: "Tortilla de espinacas",
        time: "20 min",
        items: [{ id: "espinacas", qty: 0.4 }, { id: "huevos", qty: 0.5 }],
        steps: ["Saltea las espinacas hasta que reduzcan, bate los huevos, mezcla y cuaja a fuego suave."]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F963}",
        name: "Lentejas estofadas con verduras",
        time: "35 min",
        items: [{ id: "lentejas", qty: 1 }, { id: "zanahoria", qty: 0.3 }, { id: "cebolla", qty: 0.15 }],
        steps: ["Sofr\xEDe cebolla y zanahoria, a\xF1ade lentejas y agua.", "Cuece a fuego medio sin chorizo ni grasas a\xF1adidas."]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al papillote con ensalada",
        time: "25 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "ensalada", qty: 0.3 }],
        steps: ["Envuelve el salm\xF3n en papel de horno con lim\xF3n y hierbas, 15 min a 190\xB0C.", "Sirve con ensalada."]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F357}",
        name: "Pollo al horno con boniato y verduras",
        time: "40 min",
        items: [{ id: "pollo", qty: 0.7 }, { id: "boniato", qty: 0.5 }, { id: "asar", qty: 0.4 }],
        steps: ["Hornea el pollo junto al boniato y las verduras troceadas, 200\xB0C 35 min, sin piel para aligerar."]
      },
      cena: {
        emoji: "\u{1F383}",
        name: "Crema de calabaza con huevo poch\xE9",
        time: "30 min",
        items: [{ id: "calabaza", qty: 0.8 }, { id: "huevos", qty: 0.5 }],
        steps: ["Cuece y tritura la calabaza.", "Escalfa el huevo aparte y col\xF3calo encima de la crema."]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F33E}",
        name: "Quinoa con verduras y at\xFAn",
        time: "20 min",
        items: [{ id: "quinoa", qty: 0.3 }, { id: "atun", qty: 1 }, { id: "asar", qty: 0.3 }],
        steps: ["Cuece la quinoa 12-15 min.", "Mezcla con las verduras salteadas y el at\xFAn escurrido."]
      },
      cena: {
        emoji: "\u{1F952}",
        name: "Merluza con calabac\xEDn salteado",
        time: "25 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "calabacin", qty: 0.5 }],
        steps: ["Plancha la merluza 3-4 min por lado.", "Saltea el calabac\xEDn en l\xE1minas finas."]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F957}",
        name: "Ensalada completa con pollo",
        time: "15 min",
        items: [{ id: "ensalada", qty: 0.4 }, { id: "pollo", qty: 0.5 }],
        steps: ["Plancha el pollo y c\xF3rtalo en tiras.", "Sirve sobre la ensalada con un ali\xF1o ligero."]
      },
      cena: {
        emoji: "\u{1F955}",
        name: "Crema de zanahoria con tortilla francesa",
        time: "30 min",
        items: [{ id: "zanahoria", qty: 0.7 }, { id: "huevos", qty: 0.5 }],
        steps: ["Cuece y tritura la zanahoria.", "Acompa\xF1a con una tortilla francesa sencilla."]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n al horno con verduras asadas",
        time: "35 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "asar", qty: 0.6 }],
        steps: ["Hornea el salm\xF3n junto a las verduras troceadas, 190\xB0C 18-20 min."]
      },
      cena: {
        emoji: "\u{1F372}",
        name: "Sopa de verduras con huevo",
        time: "25 min",
        items: [{ id: "zanahoria", qty: 0.3 }, { id: "asar", qty: 0.3 }, { id: "huevos", qty: 0.5 }],
        steps: ["Cuece las verduras troceadas en agua o caldo.", "Casca el huevo dentro al final, 2-3 min."]
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
        steps: ["Sofr\xEDe las setas, a\xF1ade el arroz y ve incorporando caldo poco a poco con un toque de vino blanco.", "Termina con parmesano."]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo de cerdo al horno con boniato",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "boniato", qty: 0.6 }],
        steps: ["Sella el solomillo en la sart\xE9n y termina en el horno 15 min a 190\xB0C.", "Sirve con boniato asado."]
      }
    },
    {
      day: "Martes",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao al horno con patatas y pimientos",
        time: "40 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "patatas", qty: 0.5 }, { id: "asar", qty: 0.3 }],
        steps: ["Coloca patatas y pimientos como base, encima el bacalao, horno 25 min a 190\xB0C."]
      },
      cena: {
        emoji: "\u{1F990}",
        name: "Langostinos a la plancha con ensalada",
        time: "20 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "ensalada", qty: 0.3 }],
        steps: ["Plancha los langostinos 2-3 min por lado con un poco de ajo.", "Sirve con ensalada fresca."]
      }
    },
    {
      day: "Mi\xE9rcoles",
      comida: {
        emoji: "\u{1F35D}",
        name: "Pasta con setas y parmesano",
        time: "25 min",
        items: [{ id: "pasta", qty: 1 }, { id: "setas", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: ["Saltea las setas, cuece la pasta y mezcla con un buen pu\xF1ado de parmesano rallado."]
      },
      cena: {
        emoji: "\u{1F420}",
        name: "Salm\xF3n en salsa de vino blanco con arroz",
        time: "30 min",
        items: [{ id: "salmon", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.2 }, { id: "arroz", qty: 0.3 }],
        steps: ["Plancha el salm\xF3n y reserva.", "En la misma sart\xE9n, reduce el vino blanco para la salsa.", "Sirve con arroz."]
      }
    },
    {
      day: "Jueves",
      comida: {
        emoji: "\u{1F969}",
        name: "Solomillo de cerdo con salsa y verduras",
        time: "35 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "asar", qty: 0.5 }],
        steps: ["Sella el solomillo y termina al horno.", "Acompa\xF1a con las verduras asadas."]
      },
      cena: {
        emoji: "\u{1F41F}",
        name: "Merluza en salsa verde con patatas",
        time: "30 min",
        items: [{ id: "merluza", qty: 0.5 }, { id: "patatas", qty: 0.5 }],
        steps: ["Cuece la merluza en caldo con perejil y un toque de vino.", "Sirve con patatas cocidas."]
      }
    },
    {
      day: "Viernes",
      comida: {
        emoji: "\u{1F990}",
        name: "Langostinos al ajillo con arroz",
        time: "25 min",
        items: [{ id: "langostinos", qty: 0.4 }, { id: "arroz", qty: 0.3 }],
        steps: ["Saltea los langostinos con ajo y guindilla.", "Sirve sobre arroz blanco."]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Risotto de calabac\xEDn y parmesano",
        time: "30 min",
        items: [{ id: "arroz", qty: 0.3 }, { id: "calabacin", qty: 0.4 }, { id: "parmesano", qty: 1 }],
        steps: ["Sofr\xEDe el calabac\xEDn, a\xF1ade el arroz y caldo poco a poco.", "Termina con parmesano rallado."]
      }
    },
    {
      day: "S\xE1bado",
      comida: {
        emoji: "\u{1F41F}",
        name: "Bacalao confitado con pimientos",
        time: "35 min",
        items: [{ id: "bacalao", qty: 0.5 }, { id: "asar", qty: 0.4 }],
        steps: ["Confita el bacalao a fuego muy suave en aceite.", "Sirve con los pimientos asados."]
      },
      cena: {
        emoji: "\u{1F969}",
        name: "Solomillo con boniato y reducci\xF3n de vino",
        time: "40 min",
        items: [{ id: "solomilloCerdo", qty: 0.5 }, { id: "boniato", qty: 0.5 }, { id: "vinoBlancoCocina", qty: 0.15 }],
        steps: ["Sella el solomillo, reserva.", "Reduce el vino en la sart\xE9n para la salsa.", "Sirve con boniato asado."]
      }
    },
    {
      day: "Domingo",
      comida: {
        emoji: "\u{1F958}",
        name: "Paella de marisco sencilla",
        time: "40 min",
        items: [{ id: "arroz", qty: 0.4 }, { id: "langostinos", qty: 0.4 }, { id: "asar", qty: 0.3 }],
        steps: ["Sofr\xEDe las verduras, a\xF1ade el arroz, el caldo y los langostinos al final.", "Cuece sin remover 18-20 min."]
      },
      cena: {
        emoji: "\u{1F344}",
        name: "Crema de setas con parmesano",
        time: "30 min",
        items: [{ id: "setas", qty: 0.5 }, { id: "leche", qty: 0.3 }, { id: "parmesano", qty: 1 }],
        steps: ["Saltea las setas, cuece con la leche y tritura.", "Sirve con parmesano rallado por encima."]
      }
    }
  ];
  var STYLES = {
    sana: { label: "Sana", desc: "M\xE1s verdura, legumbre y pescado; menos procesados y frituras.", menu: MENU_SANA },
    normal: { label: "Normal", desc: "El equilibrio habitual entre sencillez, variedad y coste.", menu: MENU_NORMAL },
    elaborada: { label: "Elaborada", desc: "Ingredientes m\xE1s sofisticados: solomillo, marisco, risottos.", menu: MENU_ELABORADA }
  };
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
    const allMeals = useMemo(
      () => activeMenu.flatMap((d) => [
        { ...d.comida, day: d.day, type: "Comida" },
        { ...d.cena, day: d.day, type: "Cena" }
      ]),
      [activeMenu]
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
    const toggleFavorito = (key) => {
      setFavoritos((prev) => {
        const next = prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key];
        storage.set("favoritos", JSON.stringify(next)).catch(() => {
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
    if (!loaded) return null;
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
      `), /* @__PURE__ */ React.createElement("header", { className: "max-w-3xl mx-auto px-5 pt-10 pb-6" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs tracking-widest uppercase", style: { color: "#3F6B4F" } }, "Men\xFA semanal \xB7 comida y cena"), /* @__PURE__ */ React.createElement("h1", { className: "font-display text-3xl sm:text-4xl mt-2 leading-tight" }, "La Compra Justa"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm sm:text-base", style: { color: "#4A4536" } }, "Comidas sencillas para toda la semana, con el ticket real de lo que cuestan en cada supermercado.")), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Estilo de men\xFA"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, Object.entries(STYLES).map(([key, s]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key,
        onClick: () => setStyle(key),
        className: "font-mono text-xs px-3 py-1.5 rounded-sm",
        style: {
          border: `1.5px solid ${menuStyle === key ? "#3F6B4F" : "#C9C0AC"}`,
          background: menuStyle === key ? "#3F6B4F" : "#FBF8F0",
          color: menuStyle === key ? "#FBF8F0" : "#20281F"
        }
      },
      s.label
    ))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-1.5", style: { color: "#8A8470" } }, STYLES[menuStyle].desc)), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "\xBFPara cu\xE1ntos cocinas?"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, HOUSEHOLDS.map((h) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: h.n,
        onClick: () => setHousehold(h.n),
        className: "font-mono text-xs px-3 py-1.5 rounded-sm",
        style: {
          border: `1.5px solid ${servings === h.n ? "#3F6B4F" : "#C9C0AC"}`,
          background: servings === h.n ? "#3F6B4F" : "#FBF8F0",
          color: servings === h.n ? "#FBF8F0" : "#20281F"
        }
      },
      h.label
    )))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-6" }, /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", { className: "font-mono text-xs uppercase cursor-pointer", style: { color: "#6B6552" } }, "Ingredientes a evitar (alergias o no me gusta) ", avoidIds.length > 0 ? `\xB7 ${avoidIds.length} seleccionados` : ""), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 mt-3" }, Object.entries(prices).map(([id, ing]) => {
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
    })))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "rounded-t-sm shadow-sm overflow-hidden", style: { background: "#FBF8F0" } }, /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs uppercase tracking-wide", style: { color: "#4A4536" } }, "Ticket de la semana"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#4A4536" } }, "14 comidas", extrasCount > 0 ? ` + ${extrasCount} extra${extrasCount > 1 ? "s" : ""}` : "", " \xB7 ", servings, " ", servings === 1 ? "raci\xF3n" : "raciones")), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex items-end justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#4A4536" } }, "M\xE1s barato en"), /* @__PURE__ */ React.createElement("p", { className: "font-display text-xl mt-1", style: { color: cheapest.color } }, cheapest.name)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#4A4536" } }, "Total"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-3xl font-bold" }, fmt(cheapest.total), " \u20AC"))), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mt-4 mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between flex-wrap gap-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#4A4536" } }, "Frente a comprarlo todo en ", priciest.name, ", te ahorras"), /* @__PURE__ */ React.createElement("span", { className: "stamp font-mono text-sm font-bold px-2 py-0.5 rounded-sm" }, "\u2212", fmt(savings), " \u20AC"))), /* @__PURE__ */ React.createElement("div", { className: "ticket-edge" })), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2 flex items-start gap-1.5", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 14, className: "mt-0.5 flex-shrink-0" }), "Cubre solo las 14 comidas y cenas de abajo (no desayunos, snacks ni higiene). Es una referencia, no tu compra completa.", avoidedCount > 0 ? ` ${avoidedCount} plato${avoidedCount > 1 ? "s" : ""} con ingredientes a evitar no est\xE1${avoidedCount > 1 ? "n" : ""} incluido${avoidedCount > 1 ? "s" : ""} en el total.` : "")), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-3" }, "Tu presupuesto"), /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-4", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("label", { className: "font-mono text-xs uppercase block mb-2", style: { color: "#6B6552" } }, "Ingresos netos del hogar al mes (opcional)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: ingresos,
        onChange: (e) => updateIngresos(e.target.value),
        placeholder: "Ej. 2400",
        className: "font-mono text-lg bg-transparent border-b outline-none w-32",
        style: { borderColor: "#3F6B4F" }
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm", style: { color: "#6B6552" } }, "\u20AC / mes")), ingresosNum > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-2", style: { color: "#4A4536" } }, "En Espa\xF1a, lo habitual es destinar entre el 10% y el 20% del ingreso a alimentaci\xF3n (media nacional: 15,8%, seg\xFAn el INE). Para tus ingresos, eso es:"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-sm mb-3" }, /* @__PURE__ */ React.createElement("strong", null, fmt(presupuestoMin), " \u20AC \u2013 ", fmt(presupuestoMax), " \u20AC / mes"), /* @__PURE__ */ React.createElement("span", { style: { color: "#6B6552" } }, " (media orientativa: ", fmt(presupuestoMedia), " \u20AC)")), /* @__PURE__ */ React.createElement("div", { className: "dotted-line mb-3" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm", style: { color: "#4A4536" } }, "Tu men\xFA actual cuesta aprox."), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-lg font-bold" }, fmt(monthlyCost), " \u20AC / mes")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mt-2", style: { color: monthlyCost <= presupuestoMax ? "#3F6B4F" : "#C2452F" } }, monthlyCost < presupuestoMin ? "Est\xE1 por debajo del rango habitual \u2014 quiz\xE1 haya margen para variar m\xE1s el men\xFA." : monthlyCost <= presupuestoMax ? "Est\xE1 dentro del rango habitual para tus ingresos." : "Est\xE1 por encima del rango habitual \u2014 revisa el editor de precios o reduce extras.")) : /* @__PURE__ */ React.createElement("p", { className: "text-xs", style: { color: "#8A8470" } }, "Indica tus ingresos para ver si el coste de este men\xFA es razonable para tu situaci\xF3n."), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-3 flex items-start gap-1.5", style: { color: "#8A8470" } }, /* @__PURE__ */ React.createElement(Icon, { name: "info", size: 12, className: "mt-0.5 flex-shrink-0" }), "Referencia informativa (datos INE), no asesoramiento financiero. Tus gastos fijos (alquiler, hijos, deudas) cambian lo que es razonable para tu caso."))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-4" }, "La semana, d\xEDa a d\xEDa"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, activeMenu.map((d) => /* @__PURE__ */ React.createElement("div", { key: d.day }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-1.5", style: { color: "#3F6B4F" } }, d.day), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, ["comida", "cena"].map((mealType) => {
      const r = d[mealType];
      const key = `${d.day}-${mealType}`;
      const isOpen = openMeal === key;
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
        /* @__PURE__ */ React.createElement("div", { className: "w-full flex items-center justify-between px-4 py-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenMeal(isOpen ? null : key), className: "flex items-center gap-3 text-left flex-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, r.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase flex items-center gap-1", style: { color: avoided ? "#C2452F" : "#6B6552" } }, mealType === "comida" ? "Comida" : "Cena", " \xB7 ", r.time, avoided && /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-0.5" }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 11 }), " revisa ingredientes")), /* @__PURE__ */ React.createElement("p", { className: "font-medium text-sm sm:text-base" }, r.name))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleFavorito(key) }, /* @__PURE__ */ React.createElement(Icon, { name: "star", size: 16, filled: isFav, color: isFav ? "#E8AE3D" : "#C9C0AC" })), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm" }, fmt(costCheapest), " \u20AC"), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenMeal(isOpen ? null : key) }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronDown", size: 18, style: { transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" } })))),
        isOpen && /* @__PURE__ */ React.createElement("div", { className: "px-4 pb-4 pt-1 border-t", style: { borderColor: "#E3DCC9" } }, avoided && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-3 flex items-start gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13, className: "mt-0.5 flex-shrink-0" }), "Contiene un ingrediente que marcaste para evitar. No se incluye en el total de la semana \u2014 sustit\xFAyelo o coc\xEDnalo aparte."), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Preparaci\xF3n"), /* @__PURE__ */ React.createElement("ol", { className: "text-sm mb-4 space-y-1.5", style: { color: "#4A4536" } }, r.steps.map((step, i) => /* @__PURE__ */ React.createElement("li", { key: i, className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono flex-shrink-0", style: { color: "#3F6B4F" } }, i + 1, "."), /* @__PURE__ */ React.createElement("span", null, step)))), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2", style: { color: "#6B6552" } }, "Ingredientes para ", servings, " ", servings === 1 ? "persona" : "personas"), /* @__PURE__ */ React.createElement("table", { className: "w-full text-sm font-mono" }, /* @__PURE__ */ React.createElement("tbody", null, r.items.map((it) => {
          const totalQty = it.qty * factor;
          const perPerson = totalQty / servings;
          return /* @__PURE__ */ React.createElement("tr", { key: it.id, style: { borderTop: "1px dashed #C9C0AC" } }, /* @__PURE__ */ React.createElement("td", { className: "py-1.5" }, prices[it.id].label), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right", style: { color: "#6B6552" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#20281F" } }, formatQty(totalQty, prices[it.id].unit)), /* @__PURE__ */ React.createElement("span", { className: "text-xs" }, " (", formatQty(perPerson, prices[it.id].unit), "/persona)")), /* @__PURE__ */ React.createElement("td", { className: "py-1.5 text-right pl-4" }, fmt((prices[it.id][cheapest.id] || 0) * totalQty), " \u20AC"));
        }))))
      );
    })))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-4" }, "Comparativa de supermercados"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, totals.sort((a, b) => a.total - b.total).map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, className: "rounded-sm p-4 relative", style: { background: "#FBF8F0", border: `1.5px solid ${s.id === cheapest.id ? s.color : "#C9C0AC"}` } }, s.id === cheapest.id && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-2 -right-2 rounded-full p-1", style: { background: "#3F6B4F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 12, color: "#FBF8F0" })), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase", style: { color: "#6B6552" } }, s.name), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xl font-bold mt-1" }, fmt(s.total), " \u20AC"))))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Hist\xF3rico de semanas"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => guardarSemana(cheapest.total),
        className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm",
        style: { background: "#3F6B4F", color: "#FBF8F0" }
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "archive", size: 13 }),
      " Guardar esta semana"
    )), historyMsg && /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-2", style: { color: "#3F6B4F" } }, historyMsg), historial.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-sm", style: { color: "#6B6552" } }, 'A\xFAn no has guardado ninguna semana. Pulsa "Guardar esta semana" para empezar a ver c\xF3mo evoluciona tu gasto con el tiempo.') : /* @__PURE__ */ React.createElement(React.Fragment, null, historial.length >= 2 && /* @__PURE__ */ React.createElement("div", { className: "rounded-sm p-3 mb-3", style: { background: "#FBF8F0", border: "1px solid #C9C0AC", height: 160 } }, /* @__PURE__ */ React.createElement(MiniLineChart, { data: historial })), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, historial.slice().reverse().map((h) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: h.id,
        className: "flex items-center justify-between px-3 py-2 rounded-sm",
        style: { background: "#FBF8F0", border: "1px solid #C9C0AC" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, h.date), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, h.style), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, h.servings, " pers.")),
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono text-sm font-bold" }, fmt(h.total), " \u20AC"), /* @__PURE__ */ React.createElement("button", { onClick: () => borrarSemana(h.id), style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "trash", size: 14 })))
    ))))), (repeatedIngredients.length > 0 || leftoverIngredients.length > 0) && /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg mb-3" }, "Aprovecha mejor la compra"), repeatedIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#3F6B4F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "repeat", size: 13 }), " Se repiten en varios platos"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, repeatedIngredients.map(([id, u]) => /* @__PURE__ */ React.createElement("div", { key: id, className: "flex items-center justify-between px-3 py-2 rounded-sm text-sm", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#6B6552" } }, "en ", u.count, " platos \xB7 compra un pack m\xE1s grande, lo aprovechas todo"))))), leftoverIngredients.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs uppercase mb-2 flex items-center gap-1.5", style: { color: "#C2452F" } }, /* @__PURE__ */ React.createElement(Icon, { name: "alertTriangle", size: 13 }), " Esto te puede sobrar"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5" }, leftoverIngredients.map((u) => /* @__PURE__ */ React.createElement("div", { key: u.id, className: "flex items-center justify-between px-3 py-2 rounded-sm text-sm", style: { background: "#FBF8F0", border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement("span", null, prices[u.id].label), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs text-right", style: { color: "#6B6552" } }, "usas ", fmtNum(u.totalQty), " de ", u.packagesNeeded, " ", prices[u.id].unit, " que compras")))), /* @__PURE__ */ React.createElement("p", { className: "text-xs mt-2", style: { color: "#8A8470" } }, "Aprovecha el resto en otra receta de la semana siguiente, o cong\xE9lalo si se puede."))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "font-display text-lg" }, "Picoteo y extras"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs", style: { color: "#8A8470" } }, "opcional")), /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-3", style: { color: "#4A4536" } }, "Para el d\xEDa corriente \u2014 patatas, encurtidos, bebidas... M\xE1rcalos si quieres que se sumen al ticket de la semana; si no, el men\xFA sigue siendo solo las 14 comidas."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, EXTRAS.map((ex) => {
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
    }))), /* @__PURE__ */ React.createElement("section", { className: "max-w-3xl mx-auto px-5 mb-16" }, /* @__PURE__ */ React.createElement(
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
    })))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mt-4" }, /* @__PURE__ */ React.createElement("button", { onClick: savePrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm", style: { background: "#3F6B4F", color: "#FBF8F0" } }, /* @__PURE__ */ React.createElement(Icon, { name: "save", size: 13 }), " Guardar"), /* @__PURE__ */ React.createElement("button", { onClick: resetPrices, className: "font-mono text-xs uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-sm", style: { border: "1px solid #C9C0AC" } }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 13 }), " Restablecer"), saveMsg && /* @__PURE__ */ React.createElement("span", { className: "text-xs", style: { color: "#3F6B4F" } }, saveMsg)))), /* @__PURE__ */ React.createElement("footer", { className: "max-w-3xl mx-auto px-5 pb-10 text-xs", style: { color: "#8A8470" } }, "La Compra Justa \xB7 precios de referencia, no oficiales de cada cadena."));
  }
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
