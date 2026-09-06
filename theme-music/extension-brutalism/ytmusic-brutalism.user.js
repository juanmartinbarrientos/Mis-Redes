// ==UserScript==
// @name         YouTube Music - Neo-Brutalism
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Aplica estilo Neo-Brutalista a YouTube Music
// @author       Antigravity
// @match        https://music.youtube.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    
    // Inyectar fuente JetBrains Mono
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap';
    document.head.appendChild(fontLink);

    // Inyectar CSS Brutalista
    const css = `
/* [Brutalism Theme] */
:root {
  --brutal-bg: #090909;
  --brutal-surface: #121212;
  --brutal-surface-light: #1c1c1c;
  --brutal-accent: #FFE600;
  --brutal-accent-alt: #00FF66;
  --brutal-accent-pink: #FF3366;
  --brutal-text: #FFFFFF;
  --brutal-border: #FFFFFF;
  --brutal-shadow: 4px 4px 0px #FFE600;
}

*, *::before, *::after {
  border-radius: 0px !important;
  font-family: 'JetBrains Mono', monospace !important;
}

body, ytmusic-app, #browse-page, ytmusic-player-page {
  background-color: var(--brutal-bg) !important;
  color: var(--brutal-text) !important;
}

ytmusic-nav-bar {
  background-color: var(--brutal-bg) !important;
  border-bottom: 3px solid var(--brutal-accent) !important;
}

ytmusic-search-box {
  background: var(--brutal-surface) !important;
  border: 2px solid var(--brutal-border) !important;
  box-shadow: var(--brutal-shadow) !important;
}

ytmusic-search-box:focus-within {
  border-color: var(--brutal-accent) !important;
  box-shadow: 6px 6px 0px var(--brutal-accent) !important;
}

ytmusic-guide-renderer, tp-yt-app-drawer {
  background-color: var(--brutal-surface) !important;
  border-right: 3px solid var(--brutal-border) !important;
}

ytmusic-guide-entry-renderer:hover {
  border: 2px solid var(--brutal-border) !important;
  transform: translate(-2px, -2px) !important;
  box-shadow: 3px 3px 0px var(--brutal-accent) !important;
}

ytmusic-chip-cloud-chip-renderer {
  border: 2px solid var(--brutal-border) !important;
  box-shadow: 3px 3px 0px var(--brutal-border) !important;
  font-weight: 700 !important;
}

ytmusic-chip-cloud-chip-renderer[is-selected] {
  background: var(--brutal-accent) !important;
  color: #000000 !important;
  box-shadow: 3px 3px 0px #000000 !important;
}

ytmusic-chip-cloud-chip-renderer[is-selected] yt-formatted-string {
  color: #000000 !important;
  font-weight: 900 !important;
}

ytmusic-responsive-list-item-renderer:hover {
  background-color: var(--brutal-surface) !important;
  border: 2px solid var(--brutal-border) !important;
  transform: translate(-3px, -3px) !important;
  box-shadow: 4px 4px 0px var(--brutal-accent) !important;
}

ytmusic-responsive-list-item-renderer img, #thumbnail img {
  border: 2px solid var(--brutal-border) !important;
}

ytmusic-player-bar {
  background-color: #050505 !important;
  border-top: 4px solid var(--brutal-accent) !important;
}

#progress-bar.ytmusic-player-bar {
  --paper-slider-active-color: var(--brutal-accent) !important;
  --paper-slider-knob-color: var(--brutal-accent) !important;
}

#play-pause-button {
  background: var(--brutal-accent) !important;
  border: 2px solid var(--brutal-border) !important;
  box-shadow: 3px 3px 0px #000000 !important;
}

#play-pause-button tp-yt-iron-icon {
  --iron-icon-fill-color: #000000 !important;
}
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.documentElement.appendChild(styleEl);
})();
