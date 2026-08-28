// Datos del Centro MRO Internacional CUU — PWA demostrativa
// Coordenadas del mapa en un viewBox esquemático de 1300x1030 (no georeferenciado)
// Disposición: pista totalmente a la izquierda · calle de rodaje a su derecha
// hangares H1→H5 a la derecha de la rodaje (norte a sur) · grid administrativo/técnico/
// infraestructura en dos columnas (C1/C2) a la derecha de los hangares, tamaño uniforme

const PHASES = [
  { id: 'F1', label: 'Fase 1', color: '#3A5F7D', start: '2026 Q3', end: '2027 Q4',
    desc: 'Arranque operativo: Hangar NB, administración, almacén bonded, subestación, estacionamiento.' },
  { id: 'F2', label: 'Fase 2', color: '#4C8C6B', start: '2027 Q3', end: '2028 Q4',
    desc: 'Expansión NB + talleres de aviónica y componentes + centro de capacitación.' },
  { id: 'F3', label: 'Fase 3', color: '#7C5CBF', start: '2028 Q3', end: '2029 Q4',
    desc: 'Entrada a Wide Body: Hangar H3, ampliación de pista, rodaje paralela y plataforma ICAO E/F.' },
  { id: 'F4', label: 'Fase 4', color: '#C77D3B', start: '2029 Q3', end: '2030 Q4',
    desc: 'Hangar H4, plataforma de conversión PTF y hotel para personal técnico.' },
  { id: 'F5', label: 'Fase 5', color: '#C0507A', start: '2030 Q3', end: '2031 Q4',
    desc: 'Hangar H5, taller de pintura y taller de compuestos/NDT — consolidación del centro.' },
];

const CATEGORY_META = {
  'hangar-nb':      { color: '#3A5F7D' },
  'hangar-wb':      { color: '#2C4A62' },
  'taller':         { color: '#6D5A9E' },
  'plataforma':     { color: '#9AA5AD' },
  'pista':          { color: '#4A4F57' },
  'rodaje':         { color: '#6B7280' },
  'hotel':          { color: '#C77D3B' },
  'oficina':        { color: '#3A5F7D' },
  'capacitacion':   { color: '#4C8C6B' },
  'almacen':        { color: '#B08B3C' },
  'planta':         { color: '#3E90A6' },
  'subestacion':    { color: '#D6A428' },
  'estacionamiento':{ color: '#6B7280' },
  'celda':          { color: '#B84A3E' },
  'ptf':            { color: '#B0568A' },
  'buffer':         { color: '#A8C3A0' },
};

const FACILITIES = [
  {
    id: 'buffer', mapLabel: 'Reserva / Buffer Ambiental', name: 'Reserva / Buffer Ambiental',
    category: 'buffer', phases: [], area: 'Perímetro de 210.9 ha',
    rect: { x: 15, y: 10, w: 1270, h: 995 },
    specs: [
      'Zona de amortiguamiento ambiental perimetral',
      'Preservación de flora y fauna nativa del predio',
      'Franja de seguridad operacional respecto a colindancias',
      'Superficie total de la reserva: 210-89-67.10 has',
    ],
  },

  // ---------- Grid administrativo/técnico/infraestructura — R1C2 y R3C2 ----------
  {
    id: 'admin', mapLabel: 'Admin / Ops', name: 'Admin / Operaciones',
    category: 'oficina', phases: ['F1'], area: '2,000 m²',
    rect: { x: 850, y: 30, w: 140, h: 70 },
    specs: [
      'Superficie: 2,000 m²',
      'Oficinas administrativas',
      'Centro de control de operaciones del MRO',
    ],
  },
  {
    id: 'almacen', mapLabel: 'Almacén y Logística', name: 'Almacén y Logística',
    category: 'almacen', phases: ['F1'], area: '3,000 m²',
    rect: { x: 650, y: 30, w: 140, h: 70 },
    specs: [
      'Superficie: 3,000 m²',
      'Almacén fiscalizado (bonded warehouse)',
      'Gestión logística de partes y componentes aeronáuticos',
    ],
  },
  {
    id: 'capacitacion', mapLabel: 'Capacitación', name: 'Centro de Capacitación',
    category: 'capacitacion', phases: ['F2'], area: '2,000 m²',
    rect: { x: 650, y: 153, w: 140, h: 70 },
    specs: [
      'Superficie: 2,000 m²',
      'Aulas teóricas y simuladores',
      'Certificación y actualización de personal técnico',
    ],
  },
  {
    id: 'hotel', mapLabel: 'Hotel Técnico', name: 'Hotel Personal Técnico',
    category: 'hotel', phases: ['F4'], area: '100 habitaciones',
    rect: { x: 850, y: 276, w: 140, h: 70 },
    specs: [
      '100 habitaciones',
      'Máximo 3 pisos',
      'Hospedaje para personal técnico en rotación',
    ],
  },

  // ---------- Plataforma ICAO — R6C2 ----------
  {
    id: 'plataforma', mapLabel: 'Plataforma ICAO E/F', name: 'Plataforma ICAO Cód. E/F',
    category: 'plataforma', phases: ['F3'], area: 'N/D',
    rect: { x: 850, y: 645, w: 140, h: 70 },
    specs: [
      'Plataforma de rodaje y estacionamiento remoto de aeronaves',
      'Diseño para aeronaves categoría ICAO Código E/F',
      'Pavimento rígido dimensionado para cargas Wide Body',
    ],
  },

  // ---------- Hangares H1 → H5, norte a sur, a la derecha de la calle de rodaje ----------
  {
    id: 'h1', mapLabel: 'H1 · NB', name: 'H1 — Hangar NB/Helicóptero (Fase 1)',
    category: 'hangar-nb', phases: ['F1'], area: '10,000 m²',
    rect: { x: 250, y: 30, w: 300, h: 125 },
    specs: [
      'Estructura de acero A-36',
      'Claro libre: 60 × 22 m',
      'Piso de concreto FC-250 + recubrimiento epóxico',
      'Puertas de hangar: 60 × 20 m',
      'Iluminación LED, 500 lux',
      'Supresión de incendios AFFF (NFPA-409)',
      'Unidades GPU 90 kVA × 4',
      'Sistema de drenaje de aceites/combustibles',
      'Capacidad: 6 aeronaves Narrow Body',
    ],
  },
  {
    id: 'h2', mapLabel: 'H2 · NB', name: 'H2 — Hangar NB/Helicóptero (Fase 2)',
    category: 'hangar-nb', phases: ['F2'], area: '12,000 m²',
    rect: { x: 250, y: 200, w: 300, h: 135 },
    specs: [
      'Estructura de acero A-36',
      'Claro libre: 60 × 22 m',
      'Piso de concreto FC-250 + recubrimiento epóxico',
      'Puertas de hangar: 60 × 20 m',
      'Iluminación LED, 500 lux',
      'Supresión de incendios AFFF (NFPA-409)',
      'Unidades GPU 90 kVA × 4',
      'Sistema de drenaje de aceites/combustibles',
      'Capacidad: 6 aeronaves Narrow Body',
    ],
  },
  {
    id: 'h3', mapLabel: 'H3 · Wide Body', name: 'H3 — Hangar Wide Body (Fase 3)',
    category: 'hangar-wb', phases: ['F3'], area: '20,000 m² · ICAO E/F',
    rect: { x: 250, y: 380, w: 300, h: 165 },
    specs: [
      'Categoría ICAO E/F',
      'Claro libre: 80 × 28 m',
      'Piso de concreto FC-350',
      'Sistema de docking motorizado',
      'Puertas de hangar: 80 × 26 m',
      'HVAC con diseño para vapores de combustible',
      'Gatos hidráulicos (jacks) ≥ 500 t',
      'GPU 400 Hz',
      'Capacidad: 2 aeronaves Wide Body (B787 / A330)',
    ],
  },
  {
    id: 'h4', mapLabel: 'H4 · Wide Body', name: 'H4 — Hangar Wide Body (Fase 4)',
    category: 'hangar-wb', phases: ['F4'], area: '18,000 m² · ICAO E/F',
    rect: { x: 250, y: 590, w: 300, h: 165 },
    specs: [
      'Categoría ICAO E/F',
      'Claro libre: 80 × 28 m',
      'Piso de concreto FC-350',
      'Sistema de docking motorizado',
      'Puertas de hangar: 80 × 26 m',
      'HVAC con diseño para vapores de combustible',
      'Gatos hidráulicos (jacks) ≥ 500 t',
      'GPU 400 Hz',
      'Capacidad: 2 aeronaves Wide Body (B787 / A330)',
    ],
  },
  {
    id: 'h5', mapLabel: 'H5 · Wide Body', name: 'H5 — Hangar Wide Body (Fase 5)',
    category: 'hangar-wb', phases: ['F5'], area: '20,000 m² · ICAO E/F',
    rect: { x: 250, y: 800, w: 300, h: 165 },
    specs: [
      'Categoría ICAO E/F',
      'Claro libre: 80 × 28 m',
      'Piso de concreto FC-350',
      'Sistema de docking motorizado',
      'Puertas de hangar: 80 × 26 m',
      'HVAC con diseño para vapores de combustible',
      'Gatos hidráulicos (jacks) ≥ 500 t',
      'GPU 400 Hz',
      'Capacidad: 2 aeronaves Wide Body (B787 / A330)',
    ],
  },

  // ---------- Grid administrativo/técnico/infraestructura (2 columnas C1/C2) ----------
  {
    id: 'subestacion', mapLabel: 'CFE 10 MVA', name: 'Subestación CFE 10 MVA',
    category: 'subestacion', phases: ['F1'], area: '10 MVA',
    rect: { x: 850, y: 399, w: 140, h: 70 },
    specs: [
      'Capacidad instalada: 10 MVA',
      'Suministro eléctrico dedicado al centro MRO',
      'Interconexión con red CFE',
    ],
  },
  {
    id: 'estacionamiento', mapLabel: 'Estacionamiento', name: 'Estacionamiento 200 cajones',
    category: 'estacionamiento', phases: ['F1'], area: '200 cajones',
    rect: { x: 850, y: 153, w: 140, h: 70 },
    specs: [
      '200 cajones de estacionamiento',
      'Para personal, visitantes y proveedores',
    ],
  },
  {
    id: 'avionica', mapLabel: 'Aviónica', name: 'Taller de Aviónica',
    category: 'taller', phases: ['F2'], area: '2,500 m²',
    rect: { x: 650, y: 276, w: 140, h: 70 },
    specs: [
      'Superficie: 2,500 m²',
      'Sala limpia ISO-8',
      'Banco de pruebas RVSM',
      'Blindaje electromagnético (EMI/EMC)',
    ],
  },
  {
    id: 'componentes', mapLabel: 'Componentes', name: 'Taller de Componentes',
    category: 'taller', phases: ['F2'], area: '3,000 m²',
    rect: { x: 650, y: 399, w: 140, h: 70 },
    specs: [
      'Superficie: 3,000 m²',
      'Overhaul de tren de aterrizaje',
      'Overhaul de APU',
      'Sistemas hidráulicos',
      'Ruedas y frenos',
    ],
  },
  {
    id: 'agua', mapLabel: 'Planta de Tratamiento de Agua', name: 'Planta de Tratamiento de Agua',
    category: 'planta', phases: ['F3'], area: 'N/D',
    rect: { x: 850, y: 522, w: 140, h: 70 },
    specs: [
      'Tratamiento de aguas residuales industriales',
      'Reúso de agua tratada en procesos de lavado de aeronaves',
      'Cumplimiento normativo ambiental (SEMARNAT)',
    ],
  },
  {
    id: 'celda', mapLabel: 'Celda de Prueba de Motores', name: 'Celda de Prueba de Motores',
    category: 'celda', phases: ['F3', 'F4', 'F5'], area: 'N/D',
    rect: { x: 650, y: 891, w: 140, h: 70 },
    specs: [
      'Ubicada entre los hangares H4 y H5',
      'Celda de prueba estática para motores turbofan',
      'Atenuación acústica perimetral',
      'Instrumentación de banco de pruebas certificada por OEM',
    ],
  },
  {
    id: 'ptf', mapLabel: 'PTF / Conversión', name: 'Plataforma PTF/Conversión',
    category: 'ptf', phases: ['F4'], area: 'N/D',
    rect: { x: 650, y: 522, w: 140, h: 70 },
    specs: [
      'Ubicada inmediatamente al sur del Hangar H5',
      'Plataforma reforzada para operaciones de conversión pasajero-carga (P2F)',
      'Soporta certificación EASA Part 21 Sub.A y PTF STC Boeing/Airbus',
    ],
  },
  {
    id: 'pintura', mapLabel: 'Pintura', name: 'Taller de Pintura',
    category: 'taller', phases: ['F5'], area: 'N/D',
    rect: { x: 650, y: 645, w: 140, h: 70 },
    specs: [
      'Cabina de pintura aeronáutica con extracción y filtrado',
      'Ventilación a presión controlada',
      'Zona de preparación y enmascarado (masking)',
      'Cumplimiento ambiental SEMARNAT/EPA',
    ],
  },
  {
    id: 'compuestos', mapLabel: 'Compuestos/NDT', name: 'Taller de Compuestos/NDT',
    category: 'taller', phases: ['F5'], area: 'N/D',
    rect: { x: 650, y: 768, w: 140, h: 70 },
    specs: [
      'Autoclave para reparación de estructuras compuestas',
      'Sala de inspección NDT: ultrasonido, rayos X, corrientes inducidas',
      'Control de temperatura y humedad',
    ],
  },

  // ---------- Pista y rodaje, totalmente a la izquierda del mapa ----------
  {
    id: 'pista', mapLabel: 'Pista 18L/36R', name: 'Pista 18L/36R',
    category: 'pista', phases: ['F3', 'F4'], area: 'Ampliación a 3,500 m',
    rect: { x: 40, y: 30, w: 100, h: 935 },
    specs: [
      'Ampliación de pista existente a 3,500 m de longitud',
      'Orientación 18L/36R',
      'Uso compartido con el Aeropuerto Internacional Gral. Roberto Fierro',
      'Diseño para operación de aeronaves Wide Body',
    ],
  },
  {
    id: 'rodaje', mapLabel: 'Calle de Rodaje Paralela', name: 'Calle de Rodaje Paralela',
    category: 'rodaje', phases: ['F3'], area: 'N/D',
    rect: { x: 160, y: 30, w: 50, h: 935 },
    specs: [
      'Conecta la plataforma MRO con la pista principal',
      'Diseño geométrico ICAO Código F',
      'Señalización y balizamiento conforme a normativa AFAC/OACI',
    ],
  },
];

const CERTIFICATIONS = [
  { id: 'afac145', name: 'AFAC Part 145', authority: 'AFAC (México)', phases: ['F1'],
    note: 'Taller Aeronáutico de Mantenimiento (TAM) — habilita operación base del centro.' },
  { id: 'faa145', name: 'FAA Part 145', authority: 'FAA (EUA)', phases: ['F1', 'F3', 'F5'],
    note: 'Repair Station Certificate — se amplía el alcance en cada fase de crecimiento.' },
  { id: 'easa145', name: 'EASA Part 145', authority: 'EASA (UE)', phases: ['F2'],
    note: 'Maintenance Organisation Approval para mercado europeo.' },
  { id: 'oemengine', name: 'OEM Engine License', authority: 'Fabricante de motor (OEM)', phases: ['F3'],
    note: 'Licencia OEM para overhaul de motores en la celda de pruebas.' },
  { id: 'part21', name: 'EASA Part 21 Sub.A', authority: 'EASA (UE)', phases: ['F4'],
    note: 'Aprobación de diseño y producción para programa de conversión PTF.' },
  { id: 'ptfstc', name: 'PTF STC Boeing/Airbus', authority: 'Titular de STC (FAA/EASA)', phases: ['F4'],
    note: 'Supplemental Type Certificate — conversión pasajero a carga (P2F).' },
];

if (typeof window !== 'undefined') {
  window.PHASES = PHASES;
  window.CATEGORY_META = CATEGORY_META;
  window.FACILITIES = FACILITIES;
  window.CERTIFICATIONS = CERTIFICATIONS;
}
