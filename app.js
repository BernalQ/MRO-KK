(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const activePhases = new Set();
  const ICON_COLOR = '#FDFDFD';
  const SHADE = 'rgba(15,23,32,0.28)';

  // ---------- Vector icon library (reemplaza emojis por "imágenes estándar") ----------
  const ICON_PATHS = {
    'hangar-nb': `
      <path d="M2 20V11C2 7 6 4 12 4s10 3 10 7v9H2z" fill="${ICON_COLOR}"/>
      <rect x="9" y="14" width="6" height="6" fill="${SHADE}"/>`,
    'hangar-wb': `
      <path d="M1 20V12C1 8 5 5 12 5s11 3 11 7v8H1z" fill="${ICON_COLOR}"/>
      <rect x="5" y="14" width="5" height="6" fill="${SHADE}"/>
      <rect x="14" y="14" width="5" height="6" fill="${SHADE}"/>`,
    taller: `<path d="M15.5 3a4.5 4.5 0 0 0-6.3 5.6L2 15.8V20h4.2l7.2-7.2A4.5 4.5 0 0 0 19 7l-3 3-2-2 3-3z" fill="${ICON_COLOR}"/>`,
    pista: `
      <rect x="2" y="9" width="20" height="6" rx="1" fill="${ICON_COLOR}" opacity="0.9"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="${SHADE}" stroke-width="1.2" stroke-dasharray="2 2"/>`,
    rodaje: `<path d="M12 3l7 7h-4v11h-6V10H5z" fill="${ICON_COLOR}"/>`,
    plataforma: `
      <polygon points="12,4 20,20 4,20" fill="${ICON_COLOR}" opacity="0.85"/>
      <circle cx="12" cy="16" r="1.6" fill="${SHADE}"/>`,
    hotel: `
      <rect x="4" y="4" width="16" height="16" rx="1" fill="${ICON_COLOR}" opacity="0.9"/>
      <rect x="6" y="7" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="10.8" y="7" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="15.6" y="7" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="6" y="11.4" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="10.8" y="11.4" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="15.6" y="11.4" width="2.4" height="2.4" fill="${SHADE}"/>
      <rect x="10" y="16.4" width="4" height="3.6" fill="${SHADE}"/>`,
    oficina: `
      <polygon points="4,6 12,2 20,6" fill="${ICON_COLOR}" opacity="0.9"/>
      <rect x="4" y="6" width="16" height="14" fill="${ICON_COLOR}" opacity="0.9"/>
      <rect x="6" y="10" width="2" height="6" fill="${SHADE}"/>
      <rect x="16" y="10" width="2" height="6" fill="${SHADE}"/>
      <rect x="10" y="13" width="4" height="7" fill="${SHADE}"/>`,
    capacitacion: `
      <polygon points="12,4 22,9 12,14 2,9" fill="${ICON_COLOR}"/>
      <rect x="7" y="11" width="1.8" height="6" fill="${ICON_COLOR}"/>
      <circle cx="20" cy="12" r="1.3" fill="${ICON_COLOR}"/>`,
    almacen: `
      <path d="M2 10l10-6 10 6v10H2z" fill="${ICON_COLOR}" opacity="0.9"/>
      <rect x="9" y="13" width="6" height="7" fill="${SHADE}"/>
      <rect x="16.5" y="14.5" width="4" height="4" fill="${SHADE}"/>`,
    planta: `<path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13z" fill="${ICON_COLOR}"/>`,
    subestacion: `<polygon points="13,2 4,14 11,14 9,22 20,9 12,9" fill="${ICON_COLOR}"/>`,
    estacionamiento: `
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="${ICON_COLOR}" stroke-width="1.6"/>
      <text x="12" y="16.5" font-size="12" font-weight="700" text-anchor="middle" fill="${ICON_COLOR}">P</text>`,
    celda: `
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="${ICON_COLOR}" stroke-width="1.4"/>
      <circle cx="12" cy="12" r="2.6" fill="${ICON_COLOR}"/>
      <path d="M12 5v3.4M12 15.6V19M5 12h3.4M15.6 12H19M7.05 7.05l2.4 2.4M14.55 14.55l2.4 2.4M16.95 7.05l-2.4 2.4M9.45 14.55l-2.4 2.4" stroke="${ICON_COLOR}" stroke-width="1.4" stroke-linecap="round"/>`,
    ptf: `
      <path d="M4 12a8 8 0 0 1 13-6" fill="none" stroke="${ICON_COLOR}" stroke-width="2"/>
      <polygon points="17,3 17,9 11,6" fill="${ICON_COLOR}"/>
      <path d="M20 12a8 8 0 0 1-13 6" fill="none" stroke="${ICON_COLOR}" stroke-width="2"/>
      <polygon points="7,21 7,15 13,18" fill="${ICON_COLOR}"/>`,
    buffer: `
      <circle cx="12" cy="9" r="6" fill="#3E6B4D"/>
      <rect x="11" y="14" width="2" height="7" fill="#6E4A34"/>`,
  };

  const svg = document.getElementById('siteMap');
  const phaseButtonsEl = document.getElementById('phaseButtons');
  const resetBtn = document.getElementById('resetPhase');
  const phaseDescEl = document.getElementById('phaseDesc');
  const phaseLegendPanelEl = document.getElementById('phaseLegendPanel');
  const phaseRangesEl = document.getElementById('phaseRanges');
  const certTableBody = document.getElementById('certTableBody');

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalHero = document.getElementById('modalHero');
  const modalIcon = document.getElementById('modalIcon');
  const modalPhases = document.getElementById('modalPhases');
  const modalTitle = document.getElementById('modalTitle');
  const modalArea = document.getElementById('modalArea');
  const modalSpecs = document.getElementById('modalSpecs');

  const certBtn = document.getElementById('certBtn');
  const certModalOverlay = document.getElementById('certModalOverlay');
  const certModalClose = document.getElementById('certModalClose');

  const satPhotoBtn = document.getElementById('satPhotoBtn');
  const satModalOverlay = document.getElementById('satModalOverlay');
  const satModalClose = document.getElementById('satModalClose');
  const renderGalleryGrid = document.getElementById('renderGalleryGrid');

  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  const mapLoteBtn = document.getElementById('mapLoteBtn');
  const mapLoteModalOverlay = document.getElementById('mapLoteModalOverlay');
  const mapLoteModalClose = document.getElementById('mapLoteModalClose');

  function phaseColor(id) {
    const p = PHASES.find((x) => x.id === id);
    return p ? p.color : '#002B5C';
  }

  function buildIconDefs() {
    const defs = document.createElementNS(SVG_NS, 'defs');
    Object.keys(ICON_PATHS).forEach((cat) => {
      const symbol = document.createElementNS(SVG_NS, 'symbol');
      symbol.setAttribute('id', `icon-${cat}`);
      symbol.setAttribute('viewBox', '0 0 24 24');
      symbol.innerHTML = ICON_PATHS[cat];
      defs.appendChild(symbol);
    });
    svg.appendChild(defs);
  }

  // ---------- Phase filter buttons (selección múltiple simultánea) ----------
  function renderPhaseButtons() {
    PHASES.forEach((phase) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'phase-btn';
      btn.textContent = phase.id;
      btn.title = phase.label;
      btn.style.setProperty('--phase-color', phase.color);
      btn.addEventListener('click', () => {
        if (activePhases.has(phase.id)) activePhases.delete(phase.id);
        else activePhases.add(phase.id);
        updatePhaseUI();
      });
      phaseButtonsEl.appendChild(btn);
    });
  }

  function updatePhaseUI() {
    [...phaseButtonsEl.children].forEach((btn, i) => {
      btn.classList.toggle('active', activePhases.has(PHASES[i].id));
    });

    phaseDescEl.textContent = 'Selecciona una o varias fases para iluminar sus áreas en el mapa (se pueden combinar), o haz clic en cualquier instalación para ver su ficha técnica.';

    const activePhaseList = PHASES.filter((p) => activePhases.has(p.id));
    phaseLegendPanelEl.innerHTML = '';
    activePhaseList.forEach((p) => {
      const row = document.createElement('div');
      row.className = 'phase-legend-row';
      row.innerHTML = `<strong>${p.id} (${p.start} – ${p.end}):</strong> ${p.desc}`;
      phaseLegendPanelEl.appendChild(row);
    });
    phaseLegendPanelEl.classList.toggle('is-visible', activePhaseList.length > 0);

    document.querySelectorAll('.zone').forEach((zoneEl) => {
      const facilityPhases = (zoneEl.dataset.phases || '').split(',').filter(Boolean);
      if (activePhases.size === 0) {
        zoneEl.classList.remove('dimmed', 'highlighted');
        return;
      }
      const match = facilityPhases.some((p) => activePhases.has(p));
      zoneEl.classList.toggle('highlighted', match);
      zoneEl.classList.toggle('dimmed', !match);
    });
  }

  // ---------- Imágenes hero de hangar para popup (Hangar NB / Hangar Wide Body) ----------
  function doorBayMarkup(x, y, w, h) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="rgba(253,253,253,0.14)" stroke="rgba(253,253,253,0.5)" stroke-width="1.4"/>`;
    const panelCount = 6;
    const panelW = w / panelCount;
    for (let i = 1; i < panelCount; i++) {
      const lx = x + i * panelW;
      const isCenter = i === panelCount / 2;
      s += `<line x1="${lx}" y1="${y + 3}" x2="${lx}" y2="${y + h - 3}" stroke="${isCenter ? 'rgba(253,253,253,0.8)' : 'rgba(253,253,253,0.32)'}" stroke-width="${isCenter ? 2 : 1}"/>`;
    }
    return s;
  }

  function heroHangarSVG(bays) {
    const W = 320;
    const H = bays === 2 ? 190 : 170;
    const pad = 14;
    const left = pad;
    const right = W - pad;
    const top = pad;
    const bottom = H - pad - 22;
    const w = right - left;
    const h = bottom - top;
    const roofH = h * 0.32;
    const bg = bays === 2 ? '#2C4A62' : '#3A5F7D';

    let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMidYMid meet">`;
    s += `<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${bg}"/>`;
    s += `<path d="M${left},${top + roofH} Q${left},${top} ${left + 20},${top} L${right - 20},${top} Q${right},${top} ${right},${top + roofH} Z" fill="rgba(0,0,0,0.2)"/>`;

    const winCount = bays === 2 ? 10 : 7;
    const winW = 10;
    const winGap = (w - winCount * winW) / (winCount + 1);
    const winY = top + roofH * 0.5;
    for (let i = 0; i < winCount; i++) {
      const wx = left + winGap + i * (winW + winGap);
      s += `<rect x="${wx}" y="${winY}" width="${winW}" height="7" rx="1.5" fill="rgba(253,253,253,0.55)"/>`;
    }

    const doorTop = top + roofH;
    if (bays === 2) {
      const bayGap = 10;
      const bayW = (w - bayGap) / 2;
      s += doorBayMarkup(left, doorTop, bayW, bottom - doorTop);
      s += doorBayMarkup(left + bayW + bayGap, doorTop, bayW, bottom - doorTop);
      s += `<rect x="${left + bayW}" y="${doorTop}" width="${bayGap}" height="${bottom - doorTop}" fill="rgba(0,0,0,0.25)"/>`;
    } else {
      const doorPad = w * 0.05;
      s += doorBayMarkup(left + doorPad, doorTop, w - doorPad * 2, bottom - doorTop);
    }

    s += `<line x1="${left}" y1="${bottom + 2}" x2="${right}" y2="${bottom + 2}" stroke="rgba(253,253,253,0.3)" stroke-width="1.5"/>`;
    s += '</svg>';
    return s;
  }

  const HANGAR_HERO = {
    'hangar-nb': heroHangarSVG(1),
    'hangar-wb': heroHangarSVG(2),
  };

  // ---------- Renders fotográficos por módulo (src/data/renders.json) ----------
  const RENDER_KEY_BY_ID = {
    avionica: 'Avionica',
    componentes: 'Componentes',
    celda: 'CeldaPruebas',
    pintura: 'Pintura',
    ptf: 'PTF',
    compuestos: 'CompuestosNDT',
    admin: 'ZonaAdministrativa',
    capacitacion: 'CentroCapacitacion',
    hotel: 'HotelTecnico',
    estacionamiento: 'Estacionamiento',
    subestacion: 'CFE10MVA',
    almacen: 'AlmacenLogistica',
    agua: 'PlantaTratamiento',
    plataforma: 'PlataformaICAO',
    h1: 'HangarNB',
    h2: 'HangarNB',
    h3: 'HangarWB',
    h4: 'HangarWB',
    h5: 'HangarWB',
  };
  let renderImages = {};
  function loadRenderImages() {
    return fetch('./src/data/renders.json')
      .then((res) => (res.ok ? res.json() : {}))
      .then((json) => { renderImages = json || {}; })
      .catch(() => { renderImages = {}; });
  }

  // ---------- Galería "Render - Mapa Maestro" (src/data/renders-maestro.json) ----------
  let renderMaestroItems = [];
  function loadRenderMaestro() {
    return fetch('./src/data/renders-maestro.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((json) => { renderMaestroItems = Array.isArray(json) ? json : []; buildRenderGallery(); })
      .catch(() => { renderMaestroItems = []; });
  }

  function buildRenderGallery() {
    if (!renderGalleryGrid) return;
    renderGalleryGrid.innerHTML = '';
    renderMaestroItems.forEach((item) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'render-gallery-item';

      const img = document.createElement('img');
      img.className = 'render-gallery-photo';
      img.src = item.path;
      img.alt = item.title;
      img.addEventListener('error', () => {
        img.classList.add('is-missing');
        img.removeAttribute('src');
        img.alt = '';
        img.textContent = '';
        img.replaceWith(Object.assign(document.createElement('div'), {
          className: 'render-gallery-photo is-missing',
          textContent: 'Render pendiente de cargar',
        }));
      });
      card.appendChild(img);

      const caption = document.createElement('div');
      caption.className = 'render-gallery-caption';
      caption.innerHTML = `<strong>${item.title}</strong><span>${item.description}</span>`;
      card.appendChild(caption);

      card.addEventListener('click', () => openLightbox(item));
      renderGalleryGrid.appendChild(card);
    });
  }

  function openLightbox(item) {
    lightboxImg.src = item.path;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
    lightboxOverlay.hidden = false;
  }
  function closeLightbox() {
    lightboxOverlay.hidden = true;
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  // ---------- Map rendering ----------
  const Z_ORDER = { buffer: 0, pista: 1, rodaje: 1 };

  function renderMap() {
    buildIconDefs();

    const ordered = [...FACILITIES].sort((a, b) => (Z_ORDER[a.id] ?? 2) - (Z_ORDER[b.id] ?? 2));

    ordered.forEach((f) => {
      const meta = CATEGORY_META[f.category] || { color: '#6B7280' };
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'zone' + (f.category === 'buffer' ? ' zone-buffer' : ''));
      g.dataset.phases = f.phases.join(',');
      g.dataset.id = f.id;
      const strokeColor = f.category === 'buffer' ? '#6B9C74' : phaseColor(f.phases[0]);
      g.style.color = strokeColor;

      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('x', f.rect.x);
      rect.setAttribute('y', f.rect.y);
      rect.setAttribute('width', f.rect.w);
      rect.setAttribute('height', f.rect.h);
      rect.setAttribute('rx', f.category === 'buffer' ? 24 : 8);
      rect.setAttribute('fill', f.category === 'buffer' ? 'none' : meta.color);
      rect.setAttribute('fill-opacity', f.category === 'buffer' ? '1' : '0.92');
      rect.setAttribute('stroke', strokeColor);
      g.appendChild(rect);

      if (f.category !== 'buffer' && ICON_PATHS[f.category]) {
        const use = document.createElementNS(SVG_NS, 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#icon-${f.category}`);
        use.setAttribute('href', `#icon-${f.category}`);
        use.setAttribute('x', f.rect.x + 10);
        use.setAttribute('y', f.rect.y + 10);
        use.setAttribute('width', 22);
        use.setAttribute('height', 22);
        use.setAttribute('class', 'zone-icon');
        g.appendChild(use);
      }

      const label = document.createElementNS(SVG_NS, 'text');
      let labelX = f.rect.x + f.rect.w / 2;
      let labelY = f.rect.y + f.rect.h - 12;
      let rotate = null;
      let labelClass = 'zone-label';

      if (f.category === 'buffer') {
        labelY = f.rect.y + f.rect.h - 14;
      } else if (f.category === 'pista' || f.category === 'rodaje') {
        labelY = f.rect.y + f.rect.h / 2;
        rotate = `rotate(-90 ${labelX} ${labelY})`;
      }

      label.setAttribute('x', labelX);
      label.setAttribute('y', labelY);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', labelClass);
      if (rotate) label.setAttribute('transform', rotate);
      label.textContent = f.mapLabel;
      g.appendChild(label);

      g.addEventListener('click', () => openModal(f));
      svg.appendChild(g);
    });
  }

  // ---------- Modal de instalación ----------
  function showModalIconFallback(f) {
    modalHero.hidden = true;
    modalHero.innerHTML = '';
    modalIcon.hidden = false;
    modalIcon.innerHTML = ICON_PATHS[f.category]
      ? `<svg viewBox="0 0 24 24" width="48" height="48">${ICON_PATHS[f.category].replace(/#FDFDFD/g, '#CBA135').replace(/rgba\(15,\s*23,\s*32,\s*0\.28\)/g, 'rgba(203,161,53,0.35)')}</svg>`
      : '';
  }

  function openModal(f) {
    const renderKey = RENDER_KEY_BY_ID[f.id];
    const renderSrc = renderKey && renderImages[renderKey];

    if (renderSrc) {
      modalIcon.hidden = true;
      modalIcon.innerHTML = '';
      modalHero.hidden = false;
      modalHero.innerHTML = '';
      const img = document.createElement('img');
      img.className = 'modal-hero-photo';
      img.src = renderSrc;
      img.alt = f.name;
      img.addEventListener('error', () => {
        if (HANGAR_HERO[f.category]) {
          modalHero.hidden = false;
          modalHero.innerHTML = HANGAR_HERO[f.category];
        } else {
          showModalIconFallback(f);
        }
      });
      modalHero.appendChild(img);
    } else if (HANGAR_HERO[f.category]) {
      modalHero.hidden = false;
      modalHero.innerHTML = HANGAR_HERO[f.category];
      modalIcon.hidden = true;
      modalIcon.innerHTML = '';
    } else {
      showModalIconFallback(f);
    }
    modalPhases.innerHTML = '';
    if (f.phases.length) {
      f.phases.forEach((p) => {
        const chip = document.createElement('span');
        chip.className = 'phase-chip';
        chip.style.background = phaseColor(p);
        chip.textContent = p;
        modalPhases.appendChild(chip);
      });
    } else {
      const chip = document.createElement('span');
      chip.className = 'phase-chip';
      chip.style.background = '#4C8C6B';
      chip.textContent = 'Todas las fases';
      modalPhases.appendChild(chip);
    }
    modalTitle.textContent = f.name;
    modalArea.textContent = f.area;
    modalSpecs.innerHTML = '';
    f.specs.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = s;
      modalSpecs.appendChild(li);
    });
    modalOverlay.hidden = false;
  }

  function closeModal() {
    modalOverlay.hidden = true;
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCertModal();
      closeLightbox();
      closeSatModal();
      closeMapLoteModal();
    }
  });

  // ---------- Modal de certificaciones ----------
  function openCertModal() {
    certModalOverlay.hidden = false;
  }
  function closeCertModal() {
    certModalOverlay.hidden = true;
  }
  certBtn.addEventListener('click', openCertModal);
  certModalClose.addEventListener('click', closeCertModal);
  certModalOverlay.addEventListener('click', (e) => {
    if (e.target === certModalOverlay) closeCertModal();
  });

  // ---------- Modal de foto satelital ----------
  function openSatModal() {
    satModalOverlay.hidden = false;
  }
  function closeSatModal() {
    satModalOverlay.hidden = true;
  }
  satPhotoBtn.addEventListener('click', openSatModal);
  satModalClose.addEventListener('click', closeSatModal);
  satModalOverlay.addEventListener('click', (e) => {
    if (e.target === satModalOverlay) closeSatModal();
  });

  // ---------- Modal de mapa del lote ----------
  function openMapLoteModal() {
    mapLoteModalOverlay.hidden = false;
  }
  function closeMapLoteModal() {
    mapLoteModalOverlay.hidden = true;
  }
  mapLoteBtn.addEventListener('click', openMapLoteModal);
  mapLoteModalClose.addEventListener('click', closeMapLoteModal);
  mapLoteModalOverlay.addEventListener('click', (e) => {
    if (e.target === mapLoteModalOverlay) closeMapLoteModal();
  });

  // ---------- Certification tracker ----------
  const STATUS_CYCLE = ['Pendiente', 'En proceso', 'Obtenido'];
  const STORAGE_KEY = 'mro-cuu-cert-status';

  function loadStatuses() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStatuses(statuses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  }

  function computeWindow(phasesArr) {
    const ranges = phasesArr.map((id) => PHASES.find((p) => p.id === id)).filter(Boolean);
    if (!ranges.length) return 'N/D';
    const start = ranges[0].start;
    const end = ranges[ranges.length - 1].end;
    return `${start} – ${end}`;
  }

  function renderPhaseRanges() {
    PHASES.forEach((p) => {
      const chip = document.createElement('div');
      chip.className = 'phase-range-chip';
      chip.style.setProperty('--phase-color', p.color);
      chip.innerHTML = `<strong>${p.id} · ${p.label}</strong><span>${p.start} – ${p.end}</span>`;
      phaseRangesEl.appendChild(chip);
    });
  }

  function renderCertTable() {
    const statuses = loadStatuses();

    CERTIFICATIONS.forEach((cert) => {
      const tr = document.createElement('tr');

      const nameTd = document.createElement('td');
      nameTd.innerHTML = `<strong>${cert.name}</strong><span class="cert-note">${cert.note}</span>`;
      tr.appendChild(nameTd);

      const authTd = document.createElement('td');
      authTd.textContent = cert.authority;
      tr.appendChild(authTd);

      const phasesTd = document.createElement('td');
      cert.phases.forEach((p) => {
        const chip = document.createElement('span');
        chip.className = 'phase-chip';
        chip.style.background = phaseColor(p);
        chip.textContent = p;
        phasesTd.appendChild(chip);
      });
      tr.appendChild(phasesTd);

      const windowTd = document.createElement('td');
      windowTd.textContent = computeWindow(cert.phases);
      tr.appendChild(windowTd);

      const statusTd = document.createElement('td');
      const statusBtn = document.createElement('button');
      statusBtn.type = 'button';
      statusBtn.className = 'status-btn';
      const currentStatus = statuses[cert.id] || 'Pendiente';
      statusBtn.dataset.status = currentStatus;
      statusBtn.textContent = currentStatus;
      statusBtn.addEventListener('click', () => {
        const cur = statuses[cert.id] || 'Pendiente';
        const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur) + 1) % STATUS_CYCLE.length];
        statuses[cert.id] = next;
        saveStatuses(statuses);
        statusBtn.dataset.status = next;
        statusBtn.textContent = next;
      });
      statusTd.appendChild(statusBtn);
      tr.appendChild(statusTd);

      tr.dataset.phases = cert.phases.join(',');
      certTableBody.appendChild(tr);
    });
  }

  // ---------- PWA install prompt ----------
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // ---------- Reset de fases ----------
  resetBtn.addEventListener('click', () => {
    activePhases.clear();
    updatePhaseUI();
  });

  // ---------- Init ----------
  renderPhaseButtons();
  renderMap();
  renderPhaseRanges();
  renderCertTable();
  updatePhaseUI();
  loadRenderImages();
  loadRenderMaestro();
})();
