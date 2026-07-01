// DUMMY DATA - Replace with real data later
const componentsData = {
    cpu: [
        { id: 'c1', name: 'AMD RYZEN 3 3200G RADEON BULK 8 (4C/4T) SIN COOLER', socket: 'AM4', price: 96669.13 },
        { id: 'c2', name: 'AMD RYZEN 5 3400G BULK (4C/8T) SIN COOLER', socket: 'AM4', price: 118151.16 },
        { id: 'c3', name: 'AMD RYZEN 3 3200G RADEON VEGA 8 (4C/4T)', socket: 'AM4', price: 143492.80 },
        { id: 'c4', name: 'AMD RYZEN 5 4500 (6C/12T) SIN VIDEO', socket: 'AM4', price: 146261.11 },
        { id: 'c5', name: 'AMD RYZEN 5 5500 6C/12T SIN VIDEO', socket: 'AM4', price: 185420.00 },
        { id: 'c6', name: 'AMD RYZEN 5 5600GT RADEON (6C/12T)', socket: 'AM4', price: 281448.94 },
        { id: 'c7', name: 'AMD RYZEN 7 5700 SIN VIDEO (8C/16T)', socket: 'AM4', price: 285603.57 },
        { id: 'c8', name: 'AMD RYZEN 7 5700G RADEON (8C/16T)', socket: 'AM4', price: 340848.19 },
        { id: 'c9', name: 'AMD RYZEN 7 5700X 4.6GHZ AM4 SIN COOLER (8C/16T)', socket: 'AM4', price: 379515.84 },
        { id: 'c10', name: 'AMD RYZEN 5 5500X3D 6C/12T SIN VIDEO', socket: 'AM4', price: 390812.88 },
        { id: 'c11', name: 'AMD RYZEN 7 5800XT AM4 (8C/16T) SIN COOLER', socket: 'AM4', price: 502679.47 },
        { id: 'c12', name: 'AMD RYZEN 9 5900XT (12C/24T)', socket: 'AM4', price: 640164.46 },
        { id: 'c13', name: 'AMD Ryzen 5 7600', socket: 'AM5', price: 210000 },
        { id: 'c14', name: 'Intel Core i5-11400F', socket: 'LGA1200', price: 130000 },
        { id: 'c15', name: 'Intel Core i5-13400F', socket: 'LGA1700', price: 220000 },
        { id: 'c16', name: 'Intel Core Ultra 5', socket: 'LGA1851', price: 280000 }
    ],
    motherboard: [
        { id: 'm1', name: 'MOTHER A520M-A PRO MSI AM4', socket: 'AM4', price: 76128.58 },
        { id: 'm2', name: 'MOTHER A520M-K ASUS PRIME AM4', socket: 'AM4', price: 80025.23 },
        { id: 'm3', name: 'MOTHER A520M K V2 GIGABYTE AM4', socket: 'AM4', price: 80302.44 },
        { id: 'm4', name: 'MOTHER B550M-A PRO MSI DDR4 AM4', socket: 'AM4', price: 113127.17 },
        { id: 'm5', name: 'MOTHER A520M S2H GIGABYTE AM4', socket: 'AM4', price: 116016.96 },
        { id: 'm6', name: 'MOTHER B550M-K ARGB AM4 ASUS PRIME', socket: 'AM4', price: 132067.78 },
        { id: 'm7', name: 'MOTHER B550M K GIGABYTE AM4', socket: 'AM4', price: 134682.98 },
        { id: 'm8', name: 'MOTHER B550M-K AM4 ASUS PRIME', socket: 'AM4', price: 141874.79 },
        { id: 'm9', name: 'MOTHER B550M-PLUS WIFI II ASUS GAMING TUF AM4', socket: 'AM4', price: 264789.36 },
        { id: 'm10', name: 'Gigabyte B650 AORUS', socket: 'AM5', price: 200000 },
        { id: 'm11', name: 'ASRock H510M', socket: 'LGA1200', price: 70000 },
        { id: 'm12', name: 'ASUS B760-PLUS', socket: 'LGA1700', price: 160000 },
        { id: 'm13', name: 'MSI Z890 PRO', socket: 'LGA1851', price: 350000 }
    ],
    ram: [
        { id: 'r1', name: 'MEMORIA DDR4 8GB 3200MHZ MPK HYNIX OEM', price: 61731.74 },
        { id: 'r2', name: 'MEMORIA DDR4 8GB 3200MHZ HIKSEMI HIKER U-DIMM', price: 104751.56 },
        { id: 'r3', name: 'MEMORIA DDR4 8GB 3200MHZ HIKSEMI ARMOR WHITE U-DIMM', price: 105853.48 },
        { id: 'r4', name: 'MEMORIA DDR4 8GB 3200MHZ PATRIOT SIGNATURE CL22', price: 108311.17 },
        { id: 'r5', name: 'MEMORIA DDR4 8GB 3200MHZ HIKSEMI ARMOR U-DIMM', price: 114570.82 },
        { id: 'r6', name: 'MEMORIA DDR4 8GB 3200MHZ HIKSEMI HIKER U-DIMM SWORD RGB', price: 123784.30 },
        { id: 'r7', name: 'MEMORIA DDR4 16GB 3200MHZ MPK HYNIX OEM', price: 127666.84 },
        { id: 'r8', name: 'MEMORIA DDR4 16GB 3200MHZ HIKSEMI HIKER U-DIMM', price: 174344.90 },
        { id: 'r9', name: 'MEMORIA DDR4 16GB 3200MHZ HIKSEMI ARMOR U-DIMM', price: 174344.90 },
        { id: 'r10', name: 'MEMORIA DDR4 16GB 3200MHZ MEMOX OEM', price: 179328.24 },
        { id: 'r11', name: 'MEMORIA DDR4 16GB 3200MHZ KINGSTON CL22', price: 211706.98 },
        { id: 'r12', name: 'MEMORIA DDR4 16GB 3600MHZ KINGSTON FURY BEAST', price: 300427.28 },
        { id: 'r13', name: 'MEMORIA DDR4 16GB 3200MHZ KINGSTON FURY BEAST', price: 308843.08 },
        { id: 'r14', name: 'MEMORIA DDR4 16GB 3600MHZ KINGSTON FURY RENEGADE BLACK', price: 323797.10 },
        { id: 'r15', name: 'MEMORIA DDR4 32GB 3200MHZ PATRIOT VIPER ELITE II', price: 468263.96 },
        { id: 'r16', name: 'MEMORIA DDR4 32GB 3200MHZ HIKSEMI HIKER U-DIMM', price: 469869.43 },
        { id: 'r17', name: 'MEMORIA DDR4 32GB 3200MHZ KINGSTON', price: 535494.05 },
        { id: 'r18', name: 'MEMORIA DDR4 32GB 3200MHZ KINGSTON FURY BEAST', price: 572854.10 },
        { id: 'r19', name: '16GB DDR5 5200MHz Kingston Fury (Dummy DDR5)', price: 85000 },
        { id: 'r20', name: '32GB DDR5 6000MHz G.Skill Trident Z5 (Dummy DDR5)', price: 150000 }
    ],
    storageType: [
        { id: 'sata', name: 'SSD SATA' },
        { id: 'nvme', name: 'SSD M.2 NVMe' },
        { id: 'hdd', name: 'Disco Duro HDD' }
    ],
    storage: {
        sata: [
            { id: 's1', name: 'DISCO SSD 120GB FANXIANG S101 2.5 SATA', price: 33689.37 },
            { id: 's2', name: 'DISCO SSD 240GB FANXIANG S101 2.5 SATA', price: 61719.52 },
            { id: 's3', name: 'DISCO SSD 240GB HIKSEMI WAVE SATA 3.0', price: 74968.69 },
            { id: 's4', name: 'DISCO SSD 480GB FANXIANG S101 2.5 SATA', price: 105630.08 },
            { id: 's5', name: 'DISCO SSD 240G KINGSTON A400', price: 120299.36 },
            { id: 's6', name: 'DISCO SSD 256G KINGSTON KC600', price: 166320.64 },
            { id: 's7', name: 'DISCO SSD 480G KINGSTON A400', price: 184536.60 },
            { id: 's8', name: 'DISCO SSD 960GB HIKSEMI WAVE SATA 3.0', price: 199082.37 },
            { id: 's9', name: 'DISCO SSD 1TB FANXIANG S101 2.5 SATA', price: 201239.85 },
            { id: 's10', name: 'DISCO SSD 1TB VERBATIM VI550 S3 2.5 SATA', price: 206622.08 },
            { id: 's11', name: 'DISCO SSD 960GB PATRIOT BURST ELITE', price: 207908.68 },
            { id: 's12', name: 'DISCO SSD VALUETECH PRO SUPERSONIC 1TB SATA 3.0', price: 207908.68 },
            { id: 's13', name: 'DISCO SSD 1024GB HIKSEMI WAVE SATA 3.0', price: 218369.49 },
            { id: 's14', name: 'DISCO SSD 1TB PATRIOT P210 2.5 SATA3', price: 226999.67 },
            { id: 's15', name: 'DISCO SSD 960G KINGSTON A400', price: 253282.46 },
            { id: 's16', name: 'DISCO SSD 512G KINGSTON KC600', price: 282441.91 },
            { id: 's17', name: 'DISCO SSD 960G KINGSTON DC600M', price: 823726.10 }
        ],
        nvme: [
            { id: 'n1', name: 'DISCO SSD M.2 256GB HIKSEMI WAVE NVME PCIE 3.0', price: 87791.31 },
            { id: 'n2', name: 'DISCO SSD M.2 256GB ADATA LEGEND 710 G3 X4 2280 PCIe', price: 88393.88 },
            { id: 'n3', name: 'DISCO SSD M.2 512GB HIKSEMI WAVE NVME PCIE 3.0', price: 136620.88 },
            { id: 'n4', name: 'DISCO SSD M.2 500GB LEXAR NM610 PRO NVMe Gen3x4', price: 156912.21 },
            { id: 'n5', name: 'DISCO SSD M.2 500G KINGSTON NVMe 2280 PCIe 4.0 NV3', price: 241822.32 },
            { id: 'n6', name: 'DISCO SSD M.2 1024GB HIKSEMI FUTURE LITE NVME GEN 4X4', price: 306371.09 },
            { id: 'n7', name: 'DISCO SSD M.2 512GB KINGSTON KC3000S NVMe', price: 339955.46 },
            { id: 'n8', name: 'DISCO SSD M.2 1TB KINGSTON NVMe 2280 PCIe 4.0 NV3', price: 376583.00 },
            { id: 'n9', name: 'DISCO SSD M.2 1TB KINGSTON KC3000S NVMe', price: 551807.94 },
            { id: 'n10', name: 'DISCO SSD M.2 1TB KINGSTON FURY RENEGADE NVMe', price: 619803.23 },
            { id: 'n11', name: 'DISCO SSD M.2 480GB KINGSTON SEDC2000BM8 NVMe PCIe 4.0', price: 621110.83 },
            { id: 'n12', name: 'DISCO SSD M.2 1TB KINGSTON FURY RENEGADE G5 1024G NVMe', price: 647262.87 },
            { id: 'n13', name: 'DISCO SSD M.2 2TB KINGSTON FURY RENEGADE NVMe c/DISIPADOR', price: 928397.24 },
            { id: 'n14', name: 'DISCO SSD M.2 2TB KINGSTON FURY RENEGADE G5 2048G NVMe', price: 1133774.72 },
            { id: 'n15', name: 'DISCO SSD M.2 4TB KINGSTON NVMe PCIe 4.0 NV3', price: 1196434.60 },
            { id: 'n16', name: 'DISCO SSD M.2 4TB KINGSTON KC3000D NVMe', price: 1765262.36 }
        ],
        hdd: [
            { id: 'h1', name: '1TB Seagate Barracuda', price: 45000 },
            { id: 'h2', name: '2TB Western Digital Blue', price: 70000 }
        ]
    },
    case: [
        { id: 'ca1', name: 'GABINETE ESPARTA C/FUENTE 500W/TECLADO/MOUSE', price: 33474.60 },
        { id: 'ca2', name: 'GABINETE ESPARTA BLAZE III (MATX) LATERAL TEMPLADO 3xFAN RGB', price: 45635.31 },
        { id: 'ca3', name: 'GABINETE ESPARTA+FUENTE 600W X1 FAN RGB VIDRIO TEMPLADO', price: 46158.35 },
        { id: 'ca4', name: 'GABINETE ESPARTA GAB04 X4 FAN ARGB VIDRIO TEMPLADO', price: 46942.91 },
        { id: 'ca5', name: 'GABINETE ESPARTA QUANTUM WHITE X4 FAN ARGB VIDRIO TEMPLADO', price: 48162.89 },
        { id: 'ca6', name: 'GABINETE ESPARTA+FUENTE 600W X3 FAN RGB VIDRIO TEMPLADO', price: 52696.36 },
        { id: 'ca7', name: 'GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)', price: 30074.84 },
        { id: 'ca8', name: 'GABINETE PERFORMANCE MATE (c/MOUSE Y TECLADO, 500W, sin audio frontal)', price: 33580.52 },
        { id: 'ca9', name: 'GABINETE KELYX SLIM 500W C/KIT LC727-08A', price: 75294.84 },
        { id: 'ca10', name: 'GABINETE ADATA XPG STARKER AIR MID-TOWER WHITE', price: 94649.41 },
        { id: 'ca11', name: 'GABINETE SENTEY H10 Lateral/frente Transparente BLACK', price: 31382.44 },
        { id: 'ca12', name: 'GABINETE SENTEY H30 Lateral/frente Transparente BLACK', price: 31382.44 },
        { id: 'ca13', name: 'GABINETE SENTEY H10 Lateral/frente Transparente WHITE', price: 33997.65 },
        { id: 'ca14', name: 'GABINETE SENTEY F10 Lateral Transparente FS10 (Sin audio frontal)', price: 35057.98 },
        { id: 'ca15', name: 'GABINETE SENTEY M12 VIDRIO TEMPLADO 3 FAN ARGB WHITE', price: 45112.27 },
        { id: 'ca16', name: 'GABINETE SENTEY A30 GS-8100 VIDRIO TEMPLADO 4 FAN ARGB', price: 97370.57 },
        { id: 'ca17', name: 'GABINETE SENTEY A40 GS-8200 VIDRIO TEMPLADO 7 FAN ARGB', price: 114413.84 },
        { id: 'ca18', name: 'GABINETE CORSAIR 4000D RS PERFORMANCE MID-TOWER TG FAN X3 WHITE', price: 132067.78 },
        { id: 'ca19', name: 'GABINETE GAMINGCITY CRYSTAL ARC M-ATX LATERAL TEMPLADO 5XFAN RGB', price: 69451.96 }
    ],
    psu: [
        { id: 'p1', name: '500W Redragon 80+ Bronze', price: 55000 },
        { id: 'p2', name: '650W Corsair CX650 80+ Bronze', price: 85000 },
        { id: 'p3', name: '850W XPG Core Reactor 80+ Gold', price: 160000 }
    ],
    gpu: [
        { id: 'g1', name: 'AMD Radeon RX 6600 8GB', price: 280000 },
        { id: 'g2', name: 'NVIDIA GeForce RTX 4060 8GB', price: 380000 },
        { id: 'g3', name: 'NVIDIA GeForce RTX 4070 SUPER 12GB', price: 850000 },
        { id: 'g4', name: 'AMD Radeon RX 7900 XTX 24GB', price: 1200000 }
    ],
    cooling: [
        { id: 'co1', name: 'Cooler Stock (Incluido con CPU)', price: 0 },
        { id: 'co2', name: 'ID-Cooling SE-214-XT', price: 35000 },
        { id: 'co3', name: 'Watercooling Corsair H100i', price: 180000 }
    ]
};

// DOM Elements
const platformBtns = document.querySelectorAll('.platform-btn');
const cpuSelect = document.getElementById('cpu');
const mbSelect = document.getElementById('motherboard');
const ramSelect = document.getElementById('ram');
const ramQty = document.getElementById('ram-qty');
const storageList = document.getElementById('storage-list');
const addStorageBtn = document.getElementById('add-storage-btn');
const caseSelect = document.getElementById('case');
const psuSelect = document.getElementById('psu');
const gpuSelect = document.getElementById('gpu');
const coolingSelect = document.getElementById('cooling');
const totalPriceEl = document.getElementById('total-price');
const copyBtn = document.getElementById('copy-config-btn');
const toast = document.getElementById('toast');

// Theme Elements
const html = document.documentElement;
const btnLight = document.getElementById('btn-light-theme');
const btnDark = document.getElementById('btn-dark-theme');

// State
let selectedPlatform = null;
let storageCounter = 0;

// Initialize
function init() {
    initTheme();
    populateSelect(caseSelect, componentsData.case);
    populateSelect(psuSelect, componentsData.psu);
    populateSelect(gpuSelect, componentsData.gpu);
    populateSelect(coolingSelect, componentsData.cooling);
    addStorageRow(); // Initial storage row
    
    // Listeners
    platformBtns.forEach(btn => btn.addEventListener('click', handlePlatformClick));
    mbSelect.addEventListener('change', handleMotherboardChange);
    addStorageBtn.addEventListener('click', addStorageRow);
    copyBtn.addEventListener('click', copyConfig);
    
    // Price update listeners
    document.querySelector('.configurator-main').addEventListener('change', updatePrice);
}

// Theme
function initTheme() {
    btnLight.addEventListener('click', () => {
        html.setAttribute('data-theme', 'light');
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
    });
    
    btnDark.addEventListener('click', () => {
        html.setAttribute('data-theme', 'dark');
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
    });
}

// Platform / Socket
function handlePlatformClick(e) {
    platformBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    selectedPlatform = e.target.getAttribute('data-socket');
    
    // Filter CPUs and MBs
    const filteredCPUs = componentsData.cpu.filter(c => c.socket === selectedPlatform);
    const filteredMBs = componentsData.motherboard.filter(m => m.socket === selectedPlatform);
    
    populateSelect(cpuSelect, filteredCPUs, '-- Seleccione Procesador --');
    cpuSelect.disabled = false;
    
    populateSelect(mbSelect, filteredMBs, '-- Seleccione Motherboard --');
    mbSelect.disabled = false;
    
    // Reset RAM
    ramSelect.innerHTML = '<option value="">-- Seleccione Mother primero --</option>';
    ramSelect.disabled = true;
    ramQty.disabled = true;
    
    updatePrice();
}

// Motherboard
function handleMotherboardChange() {
    if (mbSelect.value) {
        populateSelect(ramSelect, componentsData.ram, '-- Seleccione Memoria RAM --');
        ramSelect.disabled = false;
        ramQty.disabled = false;
    } else {
        ramSelect.innerHTML = '<option value="">-- Seleccione Mother primero --</option>';
        ramSelect.disabled = true;
        ramQty.disabled = true;
    }
}

// Utility to populate select
function populateSelect(selectEl, dataList, defaultText = '-- Seleccione --') {
    selectEl.innerHTML = `<option value="">${defaultText}</option>`;
    dataList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} - $${item.price.toLocaleString('es-AR')}`;
        option.dataset.price = item.price;
        option.dataset.name = item.name;
        selectEl.appendChild(option);
    });
}

// Storage Dynamic Rows
function addStorageRow() {
    storageCounter++;
    const rowId = `storage-row-${storageCounter}`;
    
    const row = document.createElement('div');
    row.className = 'storage-row row-group';
    row.id = rowId;
    
    // Type Select
    const typeWrapper = document.createElement('div');
    typeWrapper.className = 'storage-type';
    typeWrapper.innerHTML = `
        <div class="select-wrapper">
            <select class="custom-select storage-type-select">
                ${componentsData.storageType.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
            <i class="ph-bold ph-caret-down select-icon"></i>
        </div>
    `;
    
    // Item Select
    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'storage-item';
    const itemSelectHTML = `
        <div class="select-wrapper">
            <select class="custom-select storage-item-select">
                <option value="">-- Seleccione --</option>
                ${componentsData.storage['sata'].map(item => `<option value="${item.id}" data-price="${item.price}" data-name="${item.name}">${item.name} - $${item.price.toLocaleString('es-AR')}</option>`).join('')}
            </select>
            <i class="ph-bold ph-caret-down select-icon"></i>
        </div>
    `;
    itemWrapper.innerHTML = itemSelectHTML;
    
    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.innerHTML = '<i class="ph-bold ph-x"></i>';
    if (storageCounter === 1) {
        removeBtn.style.visibility = 'hidden'; // Don't remove the first one easily, or allow it
    }
    removeBtn.addEventListener('click', () => {
        row.remove();
        updatePrice();
    });
    
    // Listen to type change
    const typeSelect = typeWrapper.querySelector('.storage-type-select');
    const itemSelect = itemWrapper.querySelector('.storage-item-select');
    
    typeSelect.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        const items = componentsData.storage[selectedType];
        
        itemSelect.innerHTML = '<option value="">-- Seleccione --</option>';
        items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.dataset.price = item.price;
            opt.dataset.name = item.name;
            opt.textContent = `${item.name} - $${item.price.toLocaleString('es-AR')}`;
            itemSelect.appendChild(opt);
        });
        updatePrice();
    });
    
    row.appendChild(typeWrapper);
    row.appendChild(itemWrapper);
    row.appendChild(removeBtn);
    
    storageList.appendChild(row);
}

// Calculate Price and Update Summary
function updatePrice() {
    let total = 0;
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = ''; // clear current
    
    let hasItems = false;
    
    // Helper to get price and name from select
    const addItemToSummary = (selectEl, label, multiplier = 1) => {
        if (selectEl && selectEl.value) {
            hasItems = true;
            const opt = selectEl.options[selectEl.selectedIndex];
            const name = opt.dataset.name;
            const price = parseFloat(opt.dataset.price) || 0;
            const lineTotal = price * multiplier;
            
            total += lineTotal;
            
            const qtyStr = multiplier > 1 ? ` (x${multiplier})` : '';
            const itemDiv = document.createElement('div');
            itemDiv.className = 'summary-item';
            itemDiv.innerHTML = `
                <span class="summary-item-name">${label}: ${name}${qtyStr}</span>
                <span class="summary-item-price">$${lineTotal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            `;
            summaryContent.appendChild(itemDiv);
        }
    };
    
    addItemToSummary(cpuSelect, 'CPU');
    addItemToSummary(mbSelect, 'Motherboard');
    
    if (ramSelect.value) {
        const qty = parseInt(ramQty.value) || 1;
        addItemToSummary(ramSelect, 'RAM', qty);
    }
    
    // Storage
    document.querySelectorAll('.storage-item-select').forEach((sel, index) => {
        if (sel.value) {
            addItemToSummary(sel, `Almacenamiento ${index + 1}`);
        }
    });
    
    addItemToSummary(caseSelect, 'Gabinete');
    addItemToSummary(psuSelect, 'Fuente');
    addItemToSummary(gpuSelect, 'Video');
    addItemToSummary(coolingSelect, 'Refrigeración');
    
    if (!hasItems) {
        summaryContent.innerHTML = '<p class="empty-summary">Aún no has seleccionado componentes.</p>';
    }
    
    totalPriceEl.textContent = `$ ${total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Copy Configuration
function copyConfig() {
    let configText = "--- MI CONFIGURACIÓN DE PC ---\n\n";
    let total = 0;
    
    const appendItem = (label, selectEl, multiplier = 1) => {
        if (selectEl && selectEl.value) {
            const opt = selectEl.options[selectEl.selectedIndex];
            const name = opt.dataset.name;
            const price = parseFloat(opt.dataset.price);
            const lineTotal = price * multiplier;
            
            let qtyStr = multiplier > 1 ? ` (x${multiplier})` : '';
            configText += `${label}: ${name}${qtyStr} - $${lineTotal.toLocaleString('es-AR')}\n`;
            total += lineTotal;
        }
    };
    
    if (selectedPlatform) {
        configText += `Plataforma: ${selectedPlatform}\n`;
    }
    
    appendItem('Procesador', cpuSelect);
    appendItem('Motherboard', mbSelect);
    
    if (ramSelect.value) {
        appendItem('Memoria RAM', ramSelect, parseInt(ramQty.value));
    }
    
    // Storage
    const storageSelects = document.querySelectorAll('.storage-item-select');
    storageSelects.forEach((sel, index) => {
        if (sel.value) {
            appendItem(`Almacenamiento ${index + 1}`, sel);
        }
    });
    
    appendItem('Gabinete', caseSelect);
    appendItem('Fuente', psuSelect);
    appendItem('Placa de Video', gpuSelect);
    appendItem('Refrigeración', coolingSelect);
    
    configText += `\nTOTAL IVA INCLUIDO: $${total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
    
    navigator.clipboard.writeText(configText).then(() => {
        showToast();
    }).catch(err => {
        console.error("Error al copiar", err);
        alert("No se pudo copiar al portapapeles.");
    });
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Start
document.addEventListener('DOMContentLoaded', init);
