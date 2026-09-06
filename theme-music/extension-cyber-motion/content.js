(function() {
  'use strict';

  // 1. Inyectar fuentes modernas
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Space+Grotesk:wght@500;700&display=swap';
  document.head.appendChild(fontLink);

  // 2. Inyectar fondo animado Aurora de partículas/luces fluidas
  function injectAuroraBackground() {
    if (document.getElementById('cyber-aurora-bg')) return;
    const aurora = document.createElement('div');
    aurora.id = 'cyber-aurora-bg';
    aurora.innerHTML = `
      <div class="aurora-blob aurora-blob-1"></div>
      <div class="aurora-blob aurora-blob-2"></div>
      <div class="aurora-blob aurora-blob-3"></div>
      <div class="aurora-overlay"></div>
    `;
    document.body.prepend(aurora);
  }

  // 3. Inyectar ecualizador visual interactivo en la barra del reproductor
  function injectVisualizer() {
    if (document.getElementById('cyber-equalizer')) return;
    const titleContainer = document.querySelector('.middle-controls.ytmusic-player-bar, ytmusic-player-bar .content-info-wrapper, .left-controls.ytmusic-player-bar');
    if (!titleContainer) return;

    const eq = document.createElement('div');
    eq.id = 'cyber-equalizer';
    eq.title = 'Cyber Kinetic Visualizer';
    eq.innerHTML = `
      <span class="eq-bar bar-1"></span>
      <span class="eq-bar bar-2"></span>
      <span class="eq-bar bar-3"></span>
      <span class="eq-bar bar-4"></span>
      <span class="eq-bar bar-5"></span>
    `;

    // Insertar cerca de la información de la canción
    const infoWrapper = document.querySelector('ytmusic-player-bar .content-info-wrapper, ytmusic-player-bar .middle-controls');
    if (infoWrapper) {
      infoWrapper.appendChild(eq);
    }
  }

  // 4. Detectar estado de reproducción para activar/pausar animaciones
  function monitorPlaybackState() {
    const video = document.querySelector('video');
    const updateState = () => {
      const isPlaying = video && !video.paused && !video.ended;
      document.body.setAttribute('data-playback', isPlaying ? 'playing' : 'paused');
    };

    if (video) {
      video.addEventListener('play', updateState);
      video.addEventListener('pause', updateState);
      video.addEventListener('playing', updateState);
    }

    // Observer para cambios en el botón de play/pause
    const observer = new MutationObserver(() => {
      const playBtn = document.querySelector('#play-pause-button');
      if (playBtn) {
        const title = (playBtn.getAttribute('title') || playBtn.getAttribute('aria-label') || '').toLowerCase();
        const isPlaying = title.includes('pause') || title.includes('pausar');
        document.body.setAttribute('data-playback', isPlaying ? 'playing' : 'paused');
      }
      injectVisualizer();
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['title', 'aria-label'] });
  }

  // Inicializar al cargar
  window.addEventListener('DOMContentLoaded', () => {
    injectAuroraBackground();
    injectVisualizer();
    monitorPlaybackState();
  });

  // Reintento para componentes de renderizado diferido
  setTimeout(() => {
    injectAuroraBackground();
    injectVisualizer();
    monitorPlaybackState();
  }, 1500);

})();
