// Decsatech Microsite Application Script

// Config data database
const CONFIGURATIONS = [
    {
        id: 1,
        code: "CONFIGURACIÓN #1",
        title: "CELERON / DDR4",
        basePrice: 397012.8,
        image: "assets/config_1.png",
        specs: [
            "PROCESADOR INTEL CELERON G5925 s1200 10ma (2C/2T)",
            "MOTHER H410M PRO C2 CSM ASUS S1200",
            "MEMORIA DDR4 8GB 3200MHZ HIKSEMI HIKER U-DIMM SWORD RGB",
            "DISCO SSD 240G KINGSTON A400",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    },
    {
        id: 2,
        code: "CONFIGURACIÓN #2",
        title: "CELERON / DDR4",
        basePrice: 439478.73,
        image: "assets/config_2.png",
        specs: [
            "PROCESADOR INTEL CELERON G5925 s1200 10ma (2C/2T)",
            "MOTHER H410M PRO C2 CSM ASUS S1200",
            "MEMORIA DDR4 16GB 3200MHZ MFR HYNIX OEM",
            "DISCO SSD 240G KINGSTON A400",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    },
    {
        id: 3,
        code: "CONFIGURACIÓN #3",
        title: "CORE I5 10500T / DDR4",
        basePrice: 533183.95,
        image: "assets/config_3.png",
        specs: [
            "PROCESADOR INTEL CORE I5-10500T BULK 6C/12T Intel HD 630 SIN COOLER",
            "COOLER CPU OASIS 1155/1150/1151/1200/1700 OA-COOLER SOLO PC ARMADA",
            "MOTHER H410M PRO C2 CSM ASUS S1200",
            "MEMORIA DDR4 8GB 3200MHZ HIKSEMI HIKER U-DIMM SWORD RGB",
            "DISCO SSD 240G KINGSTON A400",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    },
    {
        id: 4,
        code: "CONFIGURACIÓN #4",
        title: "CORE I5 10500T / DDR4",
        basePrice: 580257.63,
        image: "assets/config_4.png",
        specs: [
            "PROCESADOR INTEL CORE I5-10500T BULK 6C/12T Intel HD 630 SIN COOLER",
            "COOLER CPU OASIS 1155/1150/1151/1200/1700 OA-COOLER SOLO PC ARMADA",
            "MOTHER H410M PRO C2 CSM ASUS S1200",
            "MEMORIA DDR4 16GB 3200MHZ MFR HYNIX OEM",
            "DISCO SSD 480GB HIKSEMI WAVE SATA 3.0",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    },
    {
        id: 6,
        code: "CONFIGURACIÓN #6",
        title: "PROCESADOR ALDERLAKE I3-12100 OEM 4C/8T S1700 / DDR5",
        basePrice: 625450.79,
        image: "assets/config_6.png",
        specs: [
            "PROCESADOR INTEL ALDERLAKE CORE I3-12100 OEM 4C/8T S1700",
            "COOLER CPU OASIS 1155/1150/1151/1200/1700 OA-COOLER SOLO PC ARMADA",
            "MOTHER H610M K V2 DDR5 GIGABYTE UD S1700",
            "MEMORIA DDR5 8GB 5600MHZ WICGTYP CL46 SILVER C/DISIPADOR",
            "DISCO SSD M.2 256GB HIKSEMI WAVE NVME PCIE 3.0",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    },
    {
        id: 13,
        code: "CONFIGURACIÓN #13",
        title: "PROCESADOR ALDERLAKE I9-12900 16C/24T 8P/8E S1700 / DDR4",
        basePrice: 1210229.02,
        image: "assets/config_13.png",
        specs: [
            "PROCESADOR INTEL ALDERLAKE CORE i9-12900 16C/24T 8P/8E S1700",
            "MOTHER H610M K DDR4 GIGABYTE UD G10 S1700",
            "MEMORIA DDR4 16GB 3200MHZ MFR HYNIX OEM",
            "DISCO SSD 960GB HIKSEMI WAVE SATA 3.0",
            "GABINETE KELYX 500W LC728-20 (CON TECLADO Y MOUSE)"
        ]
    }
];

// WhatsApp details
const WHATSAPP_NUMBERS = {
    sales1: "5491178275551",
    sales2: "5491169578193"
};

// Pricing Constants
const CASH_MULTIPLIER = 1.05; // 5% surcharge
const LIST_MULTIPLIER = 1.15; // 15% surcharge

// State management
let cart = JSON.parse(localStorage.getItem('decsatech_cart')) || [];

// Helper functions for prices
function getCashPrice(base) {
    return base * CASH_MULTIPLIER;
}

function getListPrice(base) {
    return base * LIST_MULTIPLIER;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Render configuration cards
function renderConfigCards() {
    const grid = document.getElementById('configsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    CONFIGURATIONS.forEach(cfg => {
        const cashPrice = getCashPrice(cfg.basePrice);
        const listPrice = getListPrice(cfg.basePrice);
        
        const card = document.createElement('article');
        card.className = 'config-card';
        card.innerHTML = `
            <div class="config-img-container">
                <img src="${cfg.image}" alt="${cfg.code} - ${cfg.title}" class="config-img" loading="lazy">
                <span class="ai-badge">Imagen IA Ilustrativa</span>
            </div>
            <div class="config-content">
                <span class="config-number">${cfg.code}</span>
                <h3 class="config-title">${cfg.title}</h3>
                
                <ul class="specs-list">
                    ${cfg.specs.map(spec => `
                        <li class="specs-item">
                            <span class="spec-icon">✓</span>
                            <span class="spec-text">${spec}</span>
                        </li>
                    `).join('')}
                </ul>
                
                <div class="price-display">
                    <div class="price-row">
                        <span class="price-label">Efectivo / Transferencia:</span>
                        <span class="price-val cash-highlight">${formatCurrency(cashPrice)}</span>
                    </div>
                    <div class="price-row">
                        <span class="price-label">Precio de Lista (Tarjetas):</span>
                        <span class="price-val list-highlight">${formatCurrency(listPrice)}</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn-card-action btn-copy-config" onclick="copyConfigToClipboard(${cfg.id})" aria-label="Copiar ficha técnica de ${cfg.title}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copiar Ficha
                    </button>
                    <button class="btn-card-action btn-add-cart" onclick="addToCart(${cfg.id})" aria-label="Agregar ${cfg.title} al carrito">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        Agregar
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Copy configuration specs and prices to clipboard
function copyConfigToClipboard(id) {
    const cfg = CONFIGURATIONS.find(c => c.id === id);
    if (!cfg) return;
    
    const cashPrice = getCashPrice(cfg.basePrice);
    const listPrice = getListPrice(cfg.basePrice);
    
    let text = `${cfg.code} — ${cfg.title}\n`;
    text += `=============================\n`;
    cfg.specs.forEach(spec => {
        text += `${spec}\n`;
    });
    text += `=============================\n`;
    text += `Efectivo / Transferencia: ${formatCurrency(cashPrice)}\n`;
    text += `Precio de Lista (Tarjetas): ${formatCurrency(listPrice)}\n\n`;
    text += `Decsatech - Tienda de Tecnología\n`;
    text += `Sitio Web: https://decsatech.com/`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast("Ficha técnica copiada con éxito!");
    }).catch(err => {
        console.error("Error al copiar al portapapeles: ", err);
        showToast("Error al copiar la ficha técnica.");
    });
}

// Toast notification trigger
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Cart Mechanics
function addToCart(id) {
    const cfg = CONFIGURATIONS.find(c => c.id === id);
    if (!cfg) return;
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cfg.id,
            code: cfg.code,
            title: cfg.title,
            basePrice: cfg.basePrice,
            image: cfg.image,
            quantity: 1
        });
    }
    
    saveCart();
    renderCart();
    updateCartBadges();
    showToast(`¡"${cfg.title}" agregado al carrito!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartBadges();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        renderCart();
        updateCartBadges();
    }
}

function saveCart() {
    localStorage.setItem('decsatech_cart', JSON.stringify(cart));
}

function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById('cartBadge');
    const floatBadge = document.getElementById('floatingCartBadge');
    const floatBtn = document.getElementById('floatingCartBtn');
    
    if (badge) badge.textContent = totalCount;
    if (floatBadge) floatBadge.textContent = totalCount;
    
    // Show/hide floating cart button based on cart count and scroll state (or always visible if items exist)
    if (floatBtn) {
        if (totalCount > 0) {
            floatBtn.classList.add('visible');
        } else {
            floatBtn.classList.remove('visible');
        }
    }
}

function renderCart() {
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    
    if (!body || !footer) return;
    
    if (cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty-msg">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>El carrito está vacío. Agrega una configuración para comenzar.</p>
            </div>
        `;
        footer.style.display = 'none';
        return;
    }
    
    footer.style.display = 'block';
    body.innerHTML = '';
    
    let totalBase = 0;
    
    cart.forEach(item => {
        const itemCashPrice = getCashPrice(item.basePrice);
        totalBase += item.basePrice * item.quantity;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.code} — ${item.title}</div>
                <div class="cart-item-price-info">
                    <span class="cart-item-price-val">${formatCurrency(itemCashPrice)}</span> c/u (Efectivo)
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})" aria-label="Quitar del carrito">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </div>
        `;
        body.appendChild(itemDiv);
    });
    
    const finalCashTotal = getCashPrice(totalBase);
    const finalListTotal = getListPrice(totalBase);
    
    document.getElementById('cartTotalCash').textContent = formatCurrency(finalCashTotal);
    document.getElementById('cartTotalList').textContent = formatCurrency(finalListTotal);
}

// WhatsApp messages generator
function getWhatsAppLink(phone) {
    if (cart.length === 0) return '#';
    
    let totalBase = 0;
    let message = `Hola Decsatech! Me interesa consultar por el stock de las siguientes computadoras:\n\n`;
    
    cart.forEach(item => {
        const itemCashPrice = getCashPrice(item.basePrice);
        const itemListPrice = getListPrice(item.basePrice);
        totalBase += item.basePrice * item.quantity;
        
        message += `*• ${item.code} — ${item.title}*\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Efectivo/Transf.: ${formatCurrency(itemCashPrice)} c/u\n`;
        message += `  Precio de Lista (Tarjeta): ${formatCurrency(itemListPrice)} c/u\n\n`;
    });
    
    const finalCashTotal = getCashPrice(totalBase);
    const finalListTotal = getListPrice(totalBase);
    
    message += `*TOTAL DE LA CONSULTA:*\n`;
    message += `💰 *Total Efectivo/Transferencia:* ${formatCurrency(finalCashTotal)}\n`;
    message += `💳 *Total Precio de Lista (Tarjeta):* ${formatCurrency(finalListTotal)}\n\n`;
    message += `Quedo a la espera de su confirmación para coordinar. ¡Gracias!`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Initialize Drawer Events
function setupDrawerEvents() {
    const overlay = document.getElementById('cartOverlay');
    const toggleBtn = document.getElementById('cartToggleBtn');
    const floatBtn = document.getElementById('floatingCartBtn');
    const closeBtn = document.getElementById('closeCartBtn');
    
    const openDrawer = () => {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent bg scroll
    };
    
    const closeDrawer = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (floatBtn) floatBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    
    // Close on click outside drawer content
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeDrawer();
            }
        });
    }
    
    // Setup WhatsApp action events
    const btnWa1 = document.getElementById('btnWhatsapp1');
    const btnWa2 = document.getElementById('btnWhatsapp2');
    
    if (btnWa1) {
        btnWa1.addEventListener('click', () => {
            window.open(getWhatsAppLink(WHATSAPP_NUMBERS.sales1), '_blank');
        });
    }
    
    if (btnWa2) {
        btnWa2.addEventListener('click', () => {
            window.open(getWhatsAppLink(WHATSAPP_NUMBERS.sales2), '_blank');
        });
    }
}

// Show floating cart button based on scroll
window.addEventListener('scroll', () => {
    const floatBtn = document.getElementById('floatingCartBtn');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (floatBtn && totalCount > 0) {
        if (window.scrollY > 300) {
            floatBtn.classList.add('visible');
        } else {
            // Keep visible if scroll is low but items exist, or we can choose to hide/show.
            // Let's make it always visible if items exist, which is a better UX.
            floatBtn.classList.add('visible');
        }
    }
});

// App Entry Point
document.addEventListener('DOMContentLoaded', () => {
    renderConfigCards();
    renderCart();
    updateCartBadges();
    setupDrawerEvents();
});
