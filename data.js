// Data for the CUU International MRO Center — demo PWA
// Map coordinates in a schematic 1300x1030 viewBox (not georeferenced)
// Layout: runway all the way on the left · taxiway to its right ·
// MRO CUU Platform strip next to the taxiway · hangars H1→H5 to the right of
// the platform (north to south) · administrative/technical/infrastructure grid
// in two columns (C1/C2) to the right of the hangars, uniform size

const PHASES = [
  { id: 'F1', label: 'Phase 1', color: '#3A5F7D', start: '2026 Q3', end: '2027 Q4',
    desc: 'Operational kickoff: NB Hangar, administration, bonded warehouse, substation, parking.' },
  { id: 'F2', label: 'Phase 2', color: '#4C8C6B', start: '2027 Q3', end: '2028 Q4',
    desc: 'NB expansion + avionics and components shops + training center.' },
  { id: 'F3', label: 'Phase 3', color: '#7C5CBF', start: '2028 Q3', end: '2029 Q4',
    desc: 'Entry into Wide Body: Hangar H3, runway extension, parallel taxiway and ICAO E/F platform.' },
  { id: 'F4', label: 'Phase 4', color: '#C77D3B', start: '2029 Q3', end: '2030 Q4',
    desc: 'Hangar H4, PTF conversion platform and hotel for technical staff.' },
  { id: 'F5', label: 'Phase 5', color: '#C0507A', start: '2030 Q3', end: '2031 Q4',
    desc: 'Hangar H5, paint shop and composites/NDT shop — center consolidation.' },
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
    id: 'buffer', mapLabel: 'Environmental Buffer / Reserve', name: 'Environmental Buffer / Reserve',
    category: 'buffer', phases: [], area: '210.9 ha perimeter',
    rect: { x: 15, y: 10, w: 1270, h: 995 },
    specs: [
      'Perimeter environmental buffer zone',
      'Preservation of native flora and fauna on site',
      'Operational safety strip relative to adjoining properties',
      'Total reserve surface: 210-89-67.10 ha',
    ],
  },

  // ---------- Administrative/technical/infrastructure grid — R1C2 and R3C2 ----------
  {
    id: 'admin', mapLabel: 'Admin Building', name: 'Admin / Operations',
    category: 'oficina', phases: ['F1'], area: '2,000 m²',
    rect: { x: 850, y: 30, w: 140, h: 70 },
    specs: [
      'Surface: 2,000 m²',
      'Administrative offices',
      'MRO operations control center',
    ],
  },
  {
    id: 'almacen', mapLabel: 'Bonded Warehouse', name: 'Warehouse & Logistics',
    category: 'almacen', phases: ['F1'], area: '3,000 m²',
    rect: { x: 650, y: 30, w: 140, h: 70 },
    specs: [
      'Surface: 3,000 m²',
      'Bonded warehouse',
      'Logistics management of aircraft parts and components',
    ],
  },
  {
    id: 'capacitacion', mapLabel: 'Training Center', name: 'Training Center',
    category: 'capacitacion', phases: ['F2'], area: '2,000 m²',
    rect: { x: 650, y: 153, w: 140, h: 70 },
    specs: [
      'Surface: 2,000 m²',
      'Classrooms and simulators',
      'Certification and refresher training for technical staff',
    ],
  },
  {
    id: 'hotel', mapLabel: 'Hotel', name: 'Technical Staff Hotel',
    category: 'hotel', phases: ['F4'], area: '100 rooms',
    rect: { x: 850, y: 276, w: 140, h: 70 },
    specs: [
      '100 rooms',
      'Maximum 3 floors',
      'Lodging for rotating technical staff',
    ],
  },

  // ---------- MRO CUU Platform — vertical strip between the taxiway and hangars H1→H5 ----------
  {
    id: 'plataforma', mapLabel: 'MRO CUU Platform', name: 'ICAO Code E/F Platform',
    category: 'plataforma', phases: ['F3'], area: 'N/A',
    rect: { x: 220, y: 30, w: 70, h: 935 },
    specs: [
      'Taxi and remote aircraft parking platform',
      'Designed for ICAO Code E/F category aircraft',
      'Rigid pavement sized for Wide Body loads',
    ],
  },

  // ---------- Hangars H1 → H5, north to south, right of the MRO CUU Platform ----------
  {
    id: 'h1', mapLabel: 'H1 · NB', name: 'H1 — NB/Helicopter Hangar (Phase 1)',
    category: 'hangar-nb', phases: ['F1'], area: '10,000 m²',
    rect: { x: 300, y: 30, w: 300, h: 125 },
    specs: [
      'A-36 steel structure',
      'Clear span: 60 × 22 m',
      'FC-250 concrete floor + epoxy coating',
      'Hangar doors: 60 × 20 m',
      'LED lighting, 500 lux',
      'AFFF fire suppression (NFPA-409)',
      '90 kVA × 4 GPU units',
      'Oil/fuel drainage system',
      'Capacity: 6 Narrow Body aircraft',
    ],
  },
  {
    id: 'h2', mapLabel: 'H2 · NB', name: 'H2 — NB/Helicopter Hangar (Phase 2)',
    category: 'hangar-nb', phases: ['F2'], area: '12,000 m²',
    rect: { x: 300, y: 200, w: 300, h: 135 },
    specs: [
      'A-36 steel structure',
      'Clear span: 60 × 22 m',
      'FC-250 concrete floor + epoxy coating',
      'Hangar doors: 60 × 20 m',
      'LED lighting, 500 lux',
      'AFFF fire suppression (NFPA-409)',
      '90 kVA × 4 GPU units',
      'Oil/fuel drainage system',
      'Capacity: 6 Narrow Body aircraft',
    ],
  },
  {
    id: 'h3', mapLabel: 'H3 · Wide Body', name: 'H3 — Wide Body Hangar (Phase 3)',
    category: 'hangar-wb', phases: ['F3'], area: '20,000 m² · ICAO E/F',
    rect: { x: 300, y: 380, w: 300, h: 165 },
    specs: [
      'ICAO E/F category',
      'Clear span: 80 × 28 m',
      'FC-350 concrete floor',
      'Motorized docking system',
      'Hangar doors: 80 × 26 m',
      'HVAC designed for fuel vapor environments',
      'Hydraulic jacks ≥ 500 t',
      '400 Hz GPU',
      'Capacity: 2 Wide Body aircraft (B787 / A330)',
    ],
  },
  {
    id: 'h4', mapLabel: 'H4 · Wide Body', name: 'H4 — Wide Body Hangar (Phase 4)',
    category: 'hangar-wb', phases: ['F4'], area: '18,000 m² · ICAO E/F',
    rect: { x: 300, y: 590, w: 300, h: 165 },
    specs: [
      'ICAO E/F category',
      'Clear span: 80 × 28 m',
      'FC-350 concrete floor',
      'Motorized docking system',
      'Hangar doors: 80 × 26 m',
      'HVAC designed for fuel vapor environments',
      'Hydraulic jacks ≥ 500 t',
      '400 Hz GPU',
      'Capacity: 2 Wide Body aircraft (B787 / A330)',
    ],
  },
  {
    id: 'h5', mapLabel: 'H5 · Wide Body', name: 'H5 — Wide Body Hangar (Phase 5)',
    category: 'hangar-wb', phases: ['F5'], area: '20,000 m² · ICAO E/F',
    rect: { x: 300, y: 800, w: 300, h: 165 },
    specs: [
      'ICAO E/F category',
      'Clear span: 80 × 28 m',
      'FC-350 concrete floor',
      'Motorized docking system',
      'Hangar doors: 80 × 26 m',
      'HVAC designed for fuel vapor environments',
      'Hydraulic jacks ≥ 500 t',
      '400 Hz GPU',
      'Capacity: 2 Wide Body aircraft (B787 / A330)',
    ],
  },

  // ---------- Administrative/technical/infrastructure grid (2 columns C1/C2) ----------
  {
    id: 'subestacion', mapLabel: 'CFE', name: 'CFE 10 MVA Substation',
    category: 'subestacion', phases: ['F1'], area: '10 MVA',
    rect: { x: 850, y: 399, w: 140, h: 70 },
    specs: [
      'Installed capacity: 10 MVA',
      'Dedicated electrical supply for the MRO center',
      'Interconnection with the CFE grid',
    ],
  },
  {
    id: 'estacionamiento', mapLabel: 'Parking Lot', name: 'Parking Lot',
    category: 'estacionamiento', phases: ['F1'], area: '200 spaces',
    rect: { x: 850, y: 153, w: 140, h: 70 },
    specs: [
      '200 parking spaces',
      'For staff, visitors and suppliers',
    ],
  },
  {
    id: 'avionica', mapLabel: 'Avionics', name: 'Avionics Shop',
    category: 'taller', phases: ['F2'], area: '2,500 m²',
    rect: { x: 650, y: 276, w: 140, h: 70 },
    specs: [
      'Surface: 2,500 m²',
      'ISO-8 clean room',
      'RVSM test bench',
      'Electromagnetic shielding (EMI/EMC)',
    ],
  },
  {
    id: 'componentes', mapLabel: 'Components', name: 'Components Shop',
    category: 'taller', phases: ['F2'], area: '3,000 m²',
    rect: { x: 650, y: 399, w: 140, h: 70 },
    specs: [
      'Surface: 3,000 m²',
      'Landing gear overhaul',
      'APU overhaul',
      'Hydraulic systems',
      'Wheels and brakes',
    ],
  },
  {
    id: 'agua', mapLabel: 'Water Treatment Plant', name: 'Water Treatment Plant',
    category: 'planta', phases: ['F3'], area: 'N/A',
    rect: { x: 850, y: 522, w: 140, h: 70 },
    specs: [
      'Industrial wastewater treatment',
      'Reuse of treated water in aircraft wash processes',
      'Environmental regulatory compliance (SEMARNAT)',
    ],
  },
  {
    id: 'celda', mapLabel: 'Engine Test Cell', name: 'Engine Test Cell',
    category: 'celda', phases: ['F3', 'F4', 'F5'], area: 'N/A',
    rect: { x: 650, y: 891, w: 140, h: 70 },
    specs: [
      'Located between hangars H4 and H5',
      'Static test cell for turbofan engines',
      'Perimeter acoustic attenuation',
      'OEM-certified test bench instrumentation',
    ],
  },
  {
    id: 'ptf', mapLabel: 'PTF / Conversion', name: 'PTF/Conversion Platform',
    category: 'ptf', phases: ['F4'], area: 'N/A',
    rect: { x: 650, y: 522, w: 140, h: 70 },
    specs: [
      'Located immediately south of Hangar H5',
      'Reinforced platform for passenger-to-freighter (P2F) conversion operations',
      'Supports EASA Part 21 Sub.A and Boeing/Airbus PTF STC certification',
    ],
  },
  {
    id: 'pintura', mapLabel: 'Paint Shop', name: 'Paint Shop',
    category: 'taller', phases: ['F5'], area: 'N/A',
    rect: { x: 650, y: 645, w: 140, h: 70 },
    specs: [
      'Aeronautical paint booth with extraction and filtering',
      'Pressure-controlled ventilation',
      'Preparation and masking area',
      'SEMARNAT/EPA environmental compliance',
    ],
  },
  {
    id: 'compuestos', mapLabel: 'Composites/NDT', name: 'Composites/NDT Shop',
    category: 'taller', phases: ['F5'], area: 'N/A',
    rect: { x: 650, y: 768, w: 140, h: 70 },
    specs: [
      'Autoclave for composite structure repair',
      'NDT inspection room: ultrasound, X-ray, eddy current',
      'Temperature and humidity control',
    ],
  },

  // ---------- Runway and taxiway, all the way on the left of the map ----------
  {
    id: 'pista', mapLabel: 'CUU Landing Runway', name: 'Runway 18L/36R',
    category: 'pista', phases: ['F3', 'F4'], area: 'Extension to 3,500 m',
    rect: { x: 40, y: 30, w: 100, h: 935 },
    specs: [
      'Extension of the existing runway to 3,500 m in length',
      '18L/36R orientation',
      'Shared use with Gral. Roberto Fierro International Airport',
      'Designed for Wide Body aircraft operations',
    ],
  },
  {
    id: 'rodaje', mapLabel: 'Parallel Taxiway', name: 'Parallel Taxiway',
    category: 'rodaje', phases: ['F3'], area: 'N/A',
    rect: { x: 160, y: 30, w: 50, h: 935 },
    specs: [
      'Connects the MRO platform with the main runway',
      'ICAO Code F geometric design',
      'Signage and lighting per AFAC/ICAO regulations',
    ],
  },
];

const CERTIFICATIONS = [
  { id: 'afac145', name: 'AFAC Part 145', authority: 'AFAC (Mexico)', phases: ['F1'],
    note: 'Aeronautical Maintenance Shop (TAM) — enables the center\'s base operation.' },
  { id: 'faa145', name: 'FAA Part 145', authority: 'FAA (USA)', phases: ['F1', 'F3', 'F5'],
    note: 'Repair Station Certificate — scope expands with each growth phase.' },
  { id: 'easa145', name: 'EASA Part 145', authority: 'EASA (EU)', phases: ['F2'],
    note: 'Maintenance Organisation Approval for the European market.' },
  { id: 'oemengine', name: 'OEM Engine License', authority: 'Engine Manufacturer (OEM)', phases: ['F3'],
    note: 'OEM license for engine overhaul in the test cell.' },
  { id: 'part21', name: 'EASA Part 21 Sub.A', authority: 'EASA (EU)', phases: ['F4'],
    note: 'Design and production approval for the PTF conversion program.' },
  { id: 'ptfstc', name: 'PTF STC Boeing/Airbus', authority: 'STC Holder (FAA/EASA)', phases: ['F4'],
    note: 'Supplemental Type Certificate — passenger-to-freighter (P2F) conversion.' },
];

if (typeof window !== 'undefined') {
  window.PHASES = PHASES;
  window.CATEGORY_META = CATEGORY_META;
  window.FACILITIES = FACILITIES;
  window.CERTIFICATIONS = CERTIFICATIONS;
}
