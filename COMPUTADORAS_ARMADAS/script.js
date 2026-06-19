// ==========================================================================
// Gestión de Cookies para el Contador Regresivo (3 Días Persistentes)
// ==========================================================================

// Función para establecer una cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Aseguramos que la cookie tenga Path=/ y SameSite=Lax para compatibilidad
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

// Función para obtener una cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Inicializar la fecha de finalización de la oferta
let promoEndTime = getCookie("promo_end_time");

if (!promoEndTime) {
    // Si la cookie no existe, creamos una fecha límite de 3 días a partir de ahora
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const targetTime = new Date().getTime() + threeDaysInMs;
    
    // Guardamos la cookie por 30 días para que no expire la cookie en sí, sino el contador interno
    setCookie("promo_end_time", targetTime.toString(), 30);
    promoEndTime = targetTime;
} else {
    // Convertir el string recuperado a número entero
    promoEndTime = parseInt(promoEndTime, 10);
}

// Lógica del contador regresivo en tiempo real
function startCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateTimer() {
        const now = new Date().getTime();
        const distance = promoEndTime - now;

        if (distance <= 0) {
            // Si el tiempo terminó, podemos mantener el contador en cero o reiniciar
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            clearInterval(timerInterval);
            
            // Opcional: mostrar un mensaje de que la oferta terminó
            const promoBarText = document.querySelector(".promo-bar-container p");
            if (promoBarText) {
                promoBarText.textContent = "⚠️ ¡LA OFERTA HA FINALIZADO! CONSULTÁ DISPONIBILIDAD:";
            }
            return;
        }

        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Renderizado con ceros a la izquierda
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer(); // Ejecución inmediata
    const timerInterval = setInterval(updateTimer, 1000);
}

// ==========================================================================
// Copiar Componentes al Portapapeles
// ==========================================================================

function copyToClipboard(elementId, buttonEl) {
    const textElement = document.getElementById(elementId);
    if (!textElement) return;

    // Obtener texto y limpiar espacios o números de orden para copiar el componente limpio
    // El texto original es p.ej. "1 - Procesador Intel Intel Raptorlake..."
    // Copiaremos el string completo tal como está escrito para cumplir exactamente: 
    // "que sea posible copiar el componente como están escritos aca"
    let rawText = textElement.textContent.trim();
    
    // Si queremos copiar solo el texto sin el número de orden, pero el usuario nos pide que se copie "como están escritos aca", 
    // copiamos la línea entera: "1 - Procesador Intel Intel Raptorlake Core I7-13700 (16C/24T) 13Th Gen Lga1700"
    navigator.clipboard.writeText(rawText).then(() => {
        // Feedback visual en el botón
        buttonEl.classList.add("copied");
        
        setTimeout(() => {
            buttonEl.classList.remove("copied");
        }, 2000);
    }).catch(err => {
        console.error("Error al copiar texto: ", err);
    });
}

// ==========================================================================
// Interactividad de Upgrade Gaming (Toggle Mode)
// ==========================================================================

const upgradeData = {
    base: {
        gpuTitle: "Gráficos Integrados Intel UHD 770",
        gpuDesc: "Integrados en el procesador i7-13700. Excelente consumo y rendimiento óptimo en tareas de oficina, diseño 2D y juegos competitivos livianos en resolución 1080p (League of Legends, Valorant, CS2 en bajo).",
        psuTitle: "Fuente Thermaltake BX3 650W 80+ Bronze",
        psuDesc: "Incluida en el presupuesto original. Diseñada para dar estabilidad energética y protección con alta eficiencia a toda la configuración estándar.",
        prodWidth: "95%",
        prodText: "95% (Fluidez Total)",
        compWidth: "50%",
        compText: "70+ FPS (Medio/Bajo)",
        aaaWidth: "15%",
        aaaText: "25 FPS (Ajustes Mínimos)",
        isGlow: false
    },
    gaming: {
        gpuTitle: "⚡ NVIDIA GeForce RTX 4060 8GB GDDR6",
        gpuDesc: "Upgrade de Placa de Video dedicada. Habilita trazado de rayos (Ray Tracing), DLSS 3.0 y potencia gráfica de última generación para correr cualquier juego del mercado en Ultra a 1080p/1440p.",
        psuTitle: "⚡ Fuente MSI MAG A750GL 750W 80+ Gold Modular",
        psuDesc: "Upgrade de Fuente recomendado. Reemplaza la fuente original para brindar los Watts extras, mayor estabilidad y certificación Gold modular para soportar la placa de video RTX 4060 de forma óptima.",
        prodWidth: "98%",
        prodText: "98% (Aceleración GPU)",
        compWidth: "95%",
        compText: "240+ FPS (Calidad Ultra)",
        aaaWidth: "85%",
        aaaText: "95+ FPS (Ultra con DLSS)",
        isGlow: true
    }
};

function switchUpgradeMode(mode) {
    // Actualizar botones activos
    const btnBase = document.getElementById("toggleBase");
    const btnGaming = document.getElementById("toggleGaming");
    
    if (mode === "base") {
        btnBase.classList.add("active");
        btnGaming.classList.remove("active");
    } else {
        btnBase.classList.remove("active");
        btnGaming.classList.add("active");
    }

    // Obtener los datos del modo seleccionado
    const data = upgradeData[mode];

    // Actualizar textos e información del hardware
    const gpuTitleEl = document.getElementById("gpuTitle");
    const gpuDescEl = document.getElementById("gpuDesc");
    const psuTitleEl = document.getElementById("psuTitle");
    const psuDescEl = document.getElementById("psuDesc");
    
    gpuTitleEl.textContent = data.gpuTitle;
    gpuDescEl.textContent = data.gpuDesc;
    psuTitleEl.textContent = data.psuTitle;
    psuDescEl.textContent = data.psuDesc;

    // Aplicar o remover clase de brillo en los nodos
    const nodeGpu = document.getElementById("nodeGpu");
    const nodePsu = document.getElementById("nodePsu");

    if (data.isGlow) {
        nodeGpu.classList.add("glow-node");
        nodePsu.classList.add("glow-node");
    } else {
        nodeGpu.classList.remove("glow-node");
        nodePsu.classList.remove("glow-node");
    }

    // Actualizar barras de rendimiento con animación
    const fillProd = document.getElementById("fillProd");
    const fillComp = document.getElementById("fillComp");
    const fillAaa = document.getElementById("fillAaa");

    fillProd.style.width = data.prodWidth;
    fillProd.textContent = data.prodText;

    fillComp.style.width = data.compWidth;
    fillComp.textContent = data.compText;

    fillAaa.style.width = data.aaaWidth;
    fillAaa.textContent = data.aaaText;
}

// Inicialización general al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();
    // Forzar el estado base por defecto
    switchUpgradeMode('base');
});
