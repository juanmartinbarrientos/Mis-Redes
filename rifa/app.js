/* ==========================================================================
   GRAN RIFA PC - JAVASCRIPT APP & ROULETTE ENGINE
   ========================================================================== */

// --- Global Application State ---
let raffleData = []; // Array of 100 objects: { number: 1..100, name: "", isSold: boolean }
let wheelMode = 'all'; // Default: 'all' (all 100 numbers on wheel so participants can spin to pick a number!)
let gridFilter = 'all'; // 'all', 'available', 'sold'
let soundEnabled = true;
let isSpinning = false;

// Wheel Animation Variables
let currentAngle = 0; // in radians
let wheelItems = []; // items currently drawn on wheel: [{ number, name, isSold }]
let audioCtx = null;
let lastTickIndex = -1;

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  initRaffleData();
  fetchExcelData();
  setupCanvasResize();
});

// Initialize empty 100 numbers
function initRaffleData() {
  raffleData = [];
  for (let i = 1; i <= 100; i++) {
    raffleData.push({
      number: i,
      name: i === 11 ? 'Juan' : '', // Default initial state matching numeros.xlsx sample
      isSold: i === 11
    });
  }
  updateUI();
}

// --- Fetch & Parse numeros.xlsx from GitHub Pages ---
async function fetchExcelData() {
  const statusEl = document.getElementById('excel-sync-status');
  if (statusEl) statusEl.innerHTML = 'Cargando numeros.xlsx...';

  try {
    // Add timestamp query parameter to bypass browser/CDN cache on GitHub Pages
    const response = await fetch('numeros.xlsx?v=' + Date.now());
    if (!response.ok) throw new Error('No se pudo descargar numeros.xlsx');
    
    const arrayBuffer = await response.arrayBuffer();
    parseExcelBuffer(arrayBuffer);
    
    if (statusEl) statusEl.innerHTML = '<span class="text-green"><i class="fa-solid fa-check-circle"></i> Sincronizado con numeros.xlsx</span>';
  } catch (error) {
    console.warn('Lectura remota de numeros.xlsx falló (posible protocolo file:// o archivo ausente). Usando datos locales predeterminados.', error);
    if (statusEl) statusEl.innerHTML = '<span class="text-gold"><i class="fa-solid fa-triangle-exclamation"></i> Usando datos de respaldo</span>';
    updateUI();
  }
}

// Parse Excel ArrayBuffer using SheetJS
function parseExcelBuffer(buffer) {
  try {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!rawRows || rawRows.length === 0) return;

    // Detect column indexes from header row or data
    let numColIdx = 0;
    let nameColIdx = 1;

    // Search header row
    const headerRow = rawRows[0] || [];
    headerRow.forEach((cell, idx) => {
      if (cell && typeof cell === 'string') {
        const lower = cell.toLowerCase();
        if (lower.includes('numero') || lower.includes('número') || lower.includes('n°') || lower.includes('nro') || lower.includes('#')) {
          numColIdx = idx;
        }
        if (lower.includes('nombre') || lower.includes('comprador') || lower.includes('cliente') || lower.includes('persona')) {
          nameColIdx = idx;
        }
      }
    });

    // Reset raffleData with 100 numbers
    const newRaffleData = [];
    for (let i = 1; i <= 100; i++) {
      newRaffleData.push({ number: i, name: '', isSold: false });
    }

    // Process rows starting after header (or row 0 if numeric)
    rawRows.forEach((row, rowIndex) => {
      if (!row || row.length === 0) return;

      const numVal = parseInt(row[numColIdx], 10);
      const nameVal = row[nameColIdx] ? String(row[nameColIdx]).trim() : '';

      if (!isNaN(numVal) && numVal >= 1 && numVal <= 100) {
        const item = newRaffleData.find(d => d.number === numVal);
        if (item) {
          item.name = nameVal;
          item.isSold = nameVal.length > 0;
        }
      }
    });

    raffleData = newRaffleData;
    updateUI();
  } catch (err) {
    console.error('Error al procesar el archivo Excel:', err);
  }
}

// Handle manual user file upload for local testing
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const buffer = e.target.result;
    parseExcelBuffer(buffer);
    const statusEl = document.getElementById('excel-sync-status');
    if (statusEl) statusEl.innerHTML = '<span class="text-green"><i class="fa-solid fa-circle-check"></i> Archivo local cargado con éxito</span>';
  };
  reader.readAsArrayBuffer(file);
}

// --- UI Update Coordinator ---
function updateUI() {
  updateStats();
  prepareWheelItems();
  drawWheel();
  renderNumbersGrid();
}

// Update stats banner & progress bar
function updateStats() {
  const total = raffleData.length;
  const sold = raffleData.filter(d => d.isSold).length;
  const available = total - sold;
  const percent = Math.round((sold / total) * 100);

  document.getElementById('stat-total').innerText = total;
  document.getElementById('stat-sold').innerText = sold;
  document.getElementById('stat-available').innerText = available;

  document.getElementById('progress-percent').innerText = `${percent}%`;
  document.getElementById('progress-fill').style.width = `${percent}%`;

  const soldBadge = document.getElementById('sold-count-badge');
  if (soldBadge) soldBadge.innerText = sold;
}

// --- ROULETTE ENGINE ---
function setWheelMode(mode) {
  wheelMode = mode;
  document.getElementById('mode-sold').classList.toggle('active', mode === 'sold');
  document.getElementById('mode-all').classList.toggle('active', mode === 'all');

  const descEl = document.getElementById('wheel-mode-desc');
  if (descEl) {
    descEl.innerHTML = mode === 'sold'
      ? 'La ruleta está girando solo entre los <strong>boletos comprados</strong>.'
      : 'La ruleta tiene los <strong>100 números completos</strong>. ¡Girá para probar tu suerte y elegir un número al azar!';
  }

  prepareWheelItems();
  drawWheel();
}

function prepareWheelItems() {
  if (wheelMode === 'sold') {
    wheelItems = raffleData.filter(d => d.isSold);
    // Fallback if no sold numbers exist yet
    if (wheelItems.length === 0) {
      wheelItems = raffleData;
    }
  } else {
    wheelItems = raffleData;
  }
}

// Draw Canvas Roulette Wheel
function drawWheel() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2 - 12;

  ctx.clearRect(0, 0, width, height);

  const numSlices = wheelItems.length;
  if (numSlices === 0) return;

  const sliceAngle = (2 * Math.PI) / numSlices;

  // Vibrant color Palette
  const colors = [
    '#7928ca', '#00f2fe', '#4facfe', '#ff0080', '#10b981',
    '#ffb703', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4'
  ];

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(currentAngle);

  for (let i = 0; i < numSlices; i++) {
    const startAngle = i * sliceAngle;
    const endAngle = startAngle + sliceAngle;
    const item = wheelItems[i];

    // Sector path
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.closePath();

    // Fill slice color
    if (item.isSold) {
      ctx.fillStyle = '#7928ca'; // Highlight sold slices in distinct purple
    } else {
      ctx.fillStyle = colors[i % colors.length];
    }
    ctx.fill();

    // Slice border line
    ctx.strokeStyle = 'rgba(10, 15, 26, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text on Slice
    ctx.save();
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';

    // Scale font size based on number of items (fine-tuned for 100 slices)
    const fontSize = numSlices > 50 ? 10 : numSlices > 30 ? 12 : 14;
    ctx.font = `800 ${fontSize}px 'Outfit', sans-serif`;

    // Format text: #11 Juan
    let label = `#${item.number < 10 ? '0' + item.number : item.number}`;
    if (item.isSold && item.name && numSlices <= 100) {
      const shortName = item.name.split(' ')[0];
      label += ` (${shortName})`;
    }

    ctx.fillText(label, radius - 18, 5);
    ctx.restore();
  }

  ctx.restore();
}

// Spin Wheel Logic & Physics Animation
function spinWheel() {
  if (isSpinning) return;
  if (wheelItems.length === 0) {
    alert('No hay números disponibles para girar en esta modalidad.');
    return;
  }

  isSpinning = true;
  const btnSpin = document.getElementById('btn-spin');
  if (btnSpin) btnSpin.disabled = true;

  // Pick random winner from wheelItems
  const winningIndex = Math.floor(Math.random() * wheelItems.length);
  const numSlices = wheelItems.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // The pointer pin is at top (-90 degrees or -PI/2)
  // Calculate target angle so the winningIndex slice centers under pointer
  const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
  const targetPointerAngle = -Math.PI / 2;

  // Minimum full rotations for excitement (5 to 8 full spins)
  const fullRotations = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;

  // Calculate final angle delta
  let targetAngleDelta = targetPointerAngle - sliceCenterAngle - (currentAngle % (2 * Math.PI));
  if (targetAngleDelta < 0) {
    targetAngleDelta += 2 * Math.PI;
  }

  const finalAngle = currentAngle + fullRotations + targetAngleDelta;
  const startAngle = currentAngle;
  const duration = 5500; // 5.5 seconds spin duration
  const startTime = performance.now();

  lastTickIndex = -1;

  function animateSpin(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic curve for realistic friction slowing down
    const easeOut = 1 - Math.pow(1 - progress, 4);

    currentAngle = startAngle + (finalAngle - startAngle) * easeOut;
    drawWheel();

    // Calculate current slice under pointer pin to play tick audio
    const normalizedAngle = (-Math.PI / 2 - currentAngle) % (2 * Math.PI);
    const positiveAngle = normalizedAngle < 0 ? normalizedAngle + 2 * Math.PI : normalizedAngle;
    const currentSliceIdx = Math.floor(positiveAngle / sliceAngle) % numSlices;

    if (currentSliceIdx !== lastTickIndex) {
      lastTickIndex = currentSliceIdx;
      playTickSound();
    }

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      if (btnSpin) btnSpin.disabled = false;

      // Complete Winner Selection
      const winner = wheelItems[winningIndex];
      onWheelStop(winner);
    }
  }

  requestAnimationFrame(animateSpin);
}

// When Wheel Stops
function onWheelStop(winner) {
  const numPadded = winner.number < 10 ? '0' + winner.number : winner.number;
  const winnerNumStr = `#${numPadded}`;
  const isAvailable = !winner.isSold;
  const winnerNameStr = winner.name || (isAvailable ? '¡DISPONIBLE!' : 'Comprado');

  // Update in-page live display
  const liveBox = document.getElementById('live-winner-display');
  if (liveBox) liveBox.classList.remove('hidden');
  document.getElementById('winner-num').innerText = winnerNumStr;
  document.getElementById('winner-name').innerText = isAvailable ? '¡DISPONIBLE! Podés reservarlo' : `Comprado por ${winner.name}`;

  // Update popup modal title & content
  const modalTitle = document.getElementById('popup-winner-title');
  const modalNum = document.getElementById('popup-winner-num');
  const modalName = document.getElementById('popup-winner-name');
  const modalSubtext = document.getElementById('popup-winner-subtext');
  const modalActions = document.getElementById('popup-winner-actions');

  modalNum.innerText = winnerNumStr;

  if (isAvailable) {
    if (modalTitle) modalTitle.innerText = '🎲 ¡TE TOCÓ EL NÚMERO DE LA SUERTE!';
    if (modalName) modalName.innerText = `¡Número #${numPadded} Libre!`;
    if (modalSubtext) modalSubtext.innerHTML = `La ruleta eligió el número <strong>#${numPadded}</strong>. ¡Está disponible para comprar por <strong>$10.000</strong>!`;
    
    const message = encodeURIComponent(`¡Hola! La ruleta eligió el número #${numPadded} y quiero comprarlo por $10.000. Mi nombre es: `);
    const waUrl = `https://wa.me/5491169578193?text=${message}`;

    if (modalActions) {
      modalActions.innerHTML = `
        <a href="${waUrl}" target="_blank" class="btn-wa" onclick="closeWinnerModal()">
          <i class="fa-brands fa-whatsapp"></i> ¡Comprar Número #${numPadded} por WhatsApp!
        </a>
        <button class="btn-secondary" onclick="closeWinnerModal(); spinWheel();">
          <i class="fa-solid fa-rotate-right"></i> Volver a Girar
        </button>
        <button class="btn-secondary" onclick="closeWinnerModal()">
          Cerrar
        </button>
      `;
    }
  } else {
    if (modalTitle) modalTitle.innerText = '🔒 NÚMERO OCUPADO';
    if (modalName) modalName.innerText = `Comprado por ${winner.name}`;
    if (modalSubtext) modalSubtext.innerHTML = `El número <strong>#${numPadded}</strong> ya fue reservado por <strong>${winner.name}</strong>. ¡Probar suerte de nuevo!`;

    if (modalActions) {
      modalActions.innerHTML = `
        <button class="btn-spin-glow" onclick="closeWinnerModal(); spinWheel();">
          <i class="fa-solid fa-dharmachakra"></i> ¡Girar de nuevo para probar suerte!
        </button>
        <button class="btn-secondary" onclick="closeWinnerModal()">
          Cerrar
        </button>
      `;
    }
  }

  // Play Fanfare & Show Winner Modal
  playVictorySound();
  launchConfetti();
  openWinnerModal();
}

// --- WEB AUDIO API SYNTHESIZER ---
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTickSound() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {}
}

function playVictorySound() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = audioCtx.currentTime + index * 0.12;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (e) {}
}

function toggleAudio() {
  soundEnabled = !soundEnabled;
  const icon = document.getElementById('sound-icon');
  if (icon) {
    icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  }
}

// --- CANVAS CONFETTI EFFECT ---
function launchConfetti() {
  const canvas = document.getElementById('confetti-overlay');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00f2fe', '#7928ca', '#ff0080', '#ffb703', '#10b981', '#ffffff'];

  for (let i = 0; i < 110; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      life: 1
    });
  }

  const startTime = performance.now();
  function animateConfetti(time) {
    const elapsed = (time - startTime) / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeCount = 0;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.life -= 0.012;

      if (p.life > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeCount > 0 && elapsed < 3.5) {
      requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animateConfetti);
}

// --- NUMBERS GRID CARD RENDERING (1 to 50) ---
function setGridFilter(filter) {
  gridFilter = filter;
  document.getElementById('tab-all').classList.toggle('active', filter === 'all');
  document.getElementById('tab-available').classList.toggle('active', filter === 'available');
  document.getElementById('tab-sold').classList.toggle('active', filter === 'sold');
  renderNumbersGrid();
}

function renderNumbersGrid() {
  const container = document.getElementById('numbers-grid');
  if (!container) return;

  const searchInput = document.getElementById('search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = raffleData.filter(item => {
    // Status filter
    if (gridFilter === 'available' && item.isSold) return false;
    if (gridFilter === 'sold' && !item.isSold) return false;

    // Search query filter
    if (query) {
      const matchNum = item.number.toString().includes(query);
      const matchName = item.name.toLowerCase().includes(query);
      return matchNum || matchName;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-circle-question" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
        <p>No se encontraron números con los criterios seleccionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const numPadded = item.number < 10 ? '0' + item.number : item.number;
    const isSold = item.isSold;
    const cardClass = isSold ? 'sold' : 'available';

    return `
      <div class="number-card ${cardClass}" onclick="handleCardClick(${item.number})">
        <div class="card-num-circle">#${numPadded}</div>
        
        ${isSold ? `
          <span class="card-status-badge badge-sold"><i class="fa-solid fa-lock"></i> Comprado</span>
          <div class="card-buyer-name" title="${item.name}">${item.name}</div>
        ` : `
          <span class="card-status-badge badge-available"><i class="fa-solid fa-unlock"></i> Disponible</span>
          <div class="card-action-text"><i class="fa-brands fa-whatsapp"></i> Reservar</div>
        `}
      </div>
    `;
  }).join('');
}

// --- CARD CLICK & WHATSAPP INTEGRATION ---
function handleCardClick(num) {
  const item = raffleData.find(d => d.number === num);
  if (!item) return;

  if (item.isSold) {
    alert(`El número #${num} ya está vendido a ${item.name}.`);
  } else {
    openWhatsAppModal(num);
  }
}

function openWhatsAppModal(num) {
  const numPadded = num < 10 ? '0' + num : num;
  document.getElementById('modal-num-tag').innerText = `#${numPadded}`;
  document.getElementById('modal-num-val').innerText = `#${numPadded}`;

  // WhatsApp Pre-filled message directed to phone 1169578193 (+54 9 11 6957-8193)
  const message = encodeURIComponent(`¡Hola! Transferí $10.000 al alias juanmartinbarrientos. Adjunto mi comprobante para comprar el número #${numPadded}. Mi nombre es: `);
  const waUrl = `https://wa.me/5491169578193?text=${message}`;
  
  document.getElementById('wa-link-btn').href = waUrl;
  document.getElementById('whatsapp-modal').classList.remove('hidden');
}

// Copy Mercado Pago Alias Helper
function copyAlias(source = 'hero') {
  const aliasText = 'juanmartinbarrientos';
  navigator.clipboard.writeText(aliasText).then(() => {
    const textElId = source === 'modal' ? 'modal-copy-text' : 'copy-text';
    const iconElId = source === 'modal' ? 'modal-copy-icon' : 'copy-icon';

    const textEl = document.getElementById(textElId);
    const iconEl = document.getElementById(iconElId);

    if (textEl) textEl.innerText = '¡Copiado!';
    if (iconEl) iconEl.className = 'fa-solid fa-check text-green';

    setTimeout(() => {
      if (textEl) textEl.innerText = 'Copiar';
      if (iconEl) iconEl.className = 'fa-solid fa-copy';
    }, 2500);
  }).catch(err => {
    console.error('Error al copiar alias:', err);
  });
}

function closeModal(e) {
  if (!e || e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close') || e.target.classList.contains('btn-secondary')) {
    document.getElementById('whatsapp-modal').classList.add('hidden');
  }
}

function openWinnerModal() {
  document.getElementById('winner-modal').classList.remove('hidden');
}

function closeWinnerModal(e) {
  if (!e || e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close') || e.target.classList.contains('btn-secondary')) {
    document.getElementById('winner-modal').classList.add('hidden');
  }
}

// Resize canvas handling
function setupCanvasResize() {
  window.addEventListener('resize', () => {
    drawWheel();
  });
}
