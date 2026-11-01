// ==========================================================================
// COMPUTADORA DEFINITIVA PARA IA : INTERACTIVE MATRIX ENGINE & LIVE VRAM SIM
// ==========================================================================

(() => {
  // 1. Matrix Digital Rain Canvas (respects prefers-reduced-motion)
  const canvas = document.getElementById('matrixCanvas');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    const glyphs = '01アイウエオカキクケコサシスセソタチツテトナニヌネノVRAM16GBGDDR7CUDAFP16TENSOR';
    const fontSize = 15;
    let columns = 0;
    let drops = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement || document.body;
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, (_, i) => ((i * 17) % 45));
    };

    const drawStep = () => {
      ctx.fillStyle = 'rgba(5, 9, 7, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF66';
      ctx.font = `700 ${fontSize}px "Chakra Petch", sans-serif`;

      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[(i * 7 + drops[i]) % glyphs.length];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    if (reducedMotion) {
      for (let k = 0; k < 18; k++) drawStep();
    } else {
      setInterval(drawStep, 65);
    }
  }

  // 2. Scroll Reveal Observer (once per element, with generous margin and fallback so deep mobile sections never stay hidden)
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px 1200px 0px', threshold: 0.01 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => el.classList.add('is-in'));
    }, 650);
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  }

  // 3. Interactive Hardware Spec Sheet (Sticky Photograph + Active List)
  const specRows = document.querySelectorAll('.spec-row');
  const stageImg = document.getElementById('specsStageImg');
  const stageSku = document.getElementById('specsStageSku');
  const stageTitle = document.getElementById('specsStageTitle');
  const stageTelemetry = document.getElementById('specsStageTelemetry');

  const activateSpecRow = (row) => {
    if (!row) return;
    specRows.forEach((r) => r.classList.toggle('is-active', r === row));
    const imgSrc = row.getAttribute('data-img');
    const imgAlt = row.getAttribute('data-alt');
    const sku = row.getAttribute('data-sku');
    const title = row.getAttribute('data-title');
    const telemetry = row.getAttribute('data-telemetry');

    if (stageImg && imgSrc && stageImg.getAttribute('src') !== imgSrc) {
      stageImg.setAttribute('src', imgSrc);
      if (imgAlt) stageImg.setAttribute('alt', imgAlt);
    }
    if (stageSku && sku) stageSku.textContent = sku;
    if (stageTitle && title) stageTitle.textContent = title;
    if (stageTelemetry && telemetry) stageTelemetry.textContent = telemetry;
  };

  specRows.forEach((row) => {
    row.addEventListener('mouseenter', () => activateSpecRow(row));
    row.addEventListener('focusin', () => activateSpecRow(row));
    row.addEventListener('click', (e) => {
      if (e.target.closest('.btn-copy-sku')) return;
      activateSpecRow(row);
    });
  });

  // Copy Component & SKU button handler
  document.querySelectorAll('.btn-copy-sku').forEach((btn) => {
    btn.addEventListener('click', () => {
      const copyString = btn.getAttribute('data-copy');
      if (!copyString) return;

      const finishCopy = () => {
        const originalText = btn.getAttribute('data-label') || 'Copiar SKU y Componente';
        btn.classList.add('is-copied');
        btn.textContent = 'Copiado al portapapeles';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.textContent = originalText;
        }, 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copyString).then(finishCopy).catch(() => {
          fallbackCopy(copyString, finishCopy);
        });
      } else {
        fallbackCopy(copyString, finishCopy);
      }
    });
  });

  function fallbackCopy(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(ta);
  }

  // 4. THE LIVE THING: Interactive 16 GB GDDR7 VRAM Workload Simulator
  const workloads = {
    llm: {
      name: 'Modelos de Lenguaje (LLMs hasta 14B)',
      vramUsed: '11.4 GB / 16.0 GB GDDR7',
      percent: 71,
      speed: '68.4 tokens/seg (Q4_K_M)',
      headroom: '4.6 GB libres para contexto 32K',
      status8gb: 'Colapsa en GPUs de 8 GB (Offload lento a RAM)',
      cmd: '$ ollama run deepseek-r1:14b --verbose // 100% en VRAM GDDR7 (0% CPU offload)'
    },
    diffusion: {
      name: 'Generación de Imágenes (Stable Diffusion XL / 3.0 & ComfyUI)',
      vramUsed: '14.2 GB / 16.0 GB GDDR7',
      percent: 89,
      speed: '3.6 seg por render 1024x1024',
      headroom: '1.8 GB libres para ControlNet + LoRA',
      status8gb: 'Error CUDA Out of Memory en placas de 8 GB',
      cmd: '$ python main.py --highvram --bf16-unet // Pipeline SD3.5 + ControlNet cargado en GDDR7'
    },
    ml: {
      name: 'Machine & Deep Learning (Fine-Tuning LoRA y Datasets)',
      vramUsed: '15.1 GB / 16.0 GB GDDR7',
      percent: 94,
      speed: 'Batch Size 4 nativo en BF16',
      headroom: '0.9 GB buffer reservado de tensores',
      status8gb: 'Imposible entrenar sin recortar tensores en 8 GB',
      cmd: '$ accelerate launch train_lora.py --mixed_precision bf16 --batch_size 4'
    },
    audio: {
      name: 'Audio y Transcripción (Whisper Large-v3 en Tiempo Real)',
      vramUsed: '5.2 GB / 16.0 GB GDDR7',
      percent: 33,
      speed: '44x más rápido que tiempo real',
      headroom: '10.8 GB libres para correr un LLM en simultáneo',
      status8gb: 'Permite encadenar Whisper + Llama 3 8B en la misma GPU',
      cmd: '$ whisper audio_master.wav --model large-v3 --device cuda --compute_type float16'
    }
  };

  const presetBtns = document.querySelectorAll('.vram-preset-btn');
  const usecaseTiles = document.querySelectorAll('.usecase-tile');
  const meterFill = document.getElementById('vramMeterFill');
  const metricVram = document.getElementById('metricVram');
  const metricSpeed = document.getElementById('metricSpeed');
  const metricHeadroom = document.getElementById('metricHeadroom');
  const simCmd = document.getElementById('vramSimCmd');
  const simCompare = document.getElementById('vramSimCompare');

  const selectWorkload = (key) => {
    const data = workloads[key];
    if (!data) return;

    presetBtns.forEach((btn) => {
      const match = btn.getAttribute('data-workload') === key;
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    usecaseTiles.forEach((tile) => {
      const match = tile.getAttribute('data-workload') === key;
      tile.classList.toggle('is-selected', match);
    });

    if (meterFill) meterFill.style.width = `${data.percent}%`;
    if (metricVram) metricVram.textContent = data.vramUsed;
    if (metricSpeed) metricSpeed.textContent = data.speed;
    if (metricHeadroom) metricHeadroom.textContent = data.headroom;
    if (simCmd) simCmd.textContent = data.cmd;
    if (simCompare) simCompare.textContent = data.status8gb;
  };

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => selectWorkload(btn.getAttribute('data-workload')));
  });

  usecaseTiles.forEach((tile) => {
    tile.addEventListener('click', () => selectWorkload(tile.getAttribute('data-workload')));
  });

  // 5. Direct Order Configurator (WhatsApp & Direct Order Builder)
  const deliverySelect = document.getElementById('orderDeliverySelect');
  const stackSelect = document.getElementById('orderStackSelect');
  const btnWhatsappOrder = document.getElementById('btnWhatsappOrder');
  const btnDirectBuy = document.getElementById('btnDirectBuy');

  const updateOrderLinks = () => {
    const delivery = deliverySelect ? deliverySelect.value : 'Envío Asegurado a Domicilio';
    const stack = stackSelect ? stackSelect.value : 'Ollama + ComfyUI + Drivers CUDA';
    const msg = `Hola! Quiero comprar la COMPUTADORA DEFINITIVA PARA IA (RTX 5060 Ti 16GB GDDR7 + Ryzen 7 5700 + 32GB Dual Channel + 1TB NVMe) al precio final de contado de $3.069.266 ARS. Modalidad de entrega: ${delivery}. Perfil de uso: ${stack}. ¿Me confirman disponibilidad para coordinar?`;
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/5491169578193?text=${encoded}`;
    if (btnWhatsappOrder) btnWhatsappOrder.setAttribute('href', waUrl);
    if (btnDirectBuy) btnDirectBuy.setAttribute('href', waUrl);
  };

  if (deliverySelect) deliverySelect.addEventListener('change', updateOrderLinks);
  if (stackSelect) stackSelect.addEventListener('change', updateOrderLinks);
  updateOrderLinks();
})();
