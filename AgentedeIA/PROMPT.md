# 🚀 Guía Completa para Novatos & Master Prompt: QuiénDaMenos Live Deals AI Agent

Esta guía está diseñada para que cualquier persona, **incluso sin experiencia previa en programación**, pueda instalar **Antigravity (Google DeepMind)**, iniciar sesión y usar el Prompt Maestro para construir esta aplicación desde cero en minutos.

---

## 🤖 ¿Qué es un Agente IA Autónomo en este Proyecto?

Este sistema no es simplemente una página web estática o un script común; **es un Agente Autónomo de Subastas (Auction AI Agent)**.

Un **Agente IA Autónomo** se diferencia de un programa tradicional porque opera en un **bucle continuo de 3 pasos**:

```
 ┌─────────────────────────────────────────────────────────────┐
 │ 1. PERCEPCIÓN (Sensing)                                     │
 │ Le de forma constante la API de QuiénDaMenos (auctions,     │
 │ leaderboard, my-bids, comodines desbloqueados, competencia) │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ 2. RAZONAMIENTO Y TOMA DE DECISIONES (AI Reasoning)        │
 │ Analiza cuáles rangos de oferta están libres de competidores│
 │ y calcula la probabilidad matemática de ser Oferta Única    │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ 3. ACCIÓN AUTÓNOMA (Execution)                             │
 │ Dispara pujas (/bids), activa bombas de quema (/bombs) y    │
 │ comodines (/helps) automáticamente en segundo plano.        │
 └─────────────────────────────────────────────────────────────┘
```

### 💡 ¿Cómo guardarlo como una Skill de Agente en Antigravity?
Antigravity permite empaquetar esta lógica como una **Skill o Agente personalizado** creando un archivo en `.agents/skills/subasta-agent/SKILL.md`. De este modo, puedes pedirle al agente:
> *"Monitorea la subasta #170 y si mi oferta es quemada, lanza una bomba pequeña y vuelve a ofertar en el mejor rango libre."*

---

## 📖 Guía Paso a Paso para Principiantes

### 🔹 Paso 1: Instalar Antigravity
1. Abre tu terminal de comandos (en Windows: busca **`cmd`** o **`PowerShell`** en el menú Inicio).
2. Asegúrate de tener instalado [Node.js](https://nodejs.org) (Descarga e instala la versión recomendada LTS).
3. En la terminal, ejecuta el siguiente comando para instalar **Antigravity**:
   ```bash
   npm install -g @google/antigravity-cli
   ```

### 🔹 Paso 2: Iniciar Sesión (Login)
1. En la misma terminal, ejecuta el comando de inicio de sesión:
   ```bash
   antigravity login
   ```
2. Se abrirá automáticamente una ventana en tu navegador web.
3. Inicia sesión con tu cuenta de Google o cuenta autorizada y acepta los permisos.
4. ¡Listo! Al volver a la terminal verás un mensaje de inicio de sesión exitoso.

### 🔹 Paso 3: Crear tu carpeta de proyecto e Iniciar Antigravity
1. Crea una carpeta nueva en tu computadora para el proyecto (ejemplo: `quien-da-menos`).
2. Entra a esa carpeta desde la terminal:
   ```bash
   cd ruta/a/tu/carpeta/quien-da-menos
   ```
3. Ejecuta **Antigravity**:
   ```bash
   antigravity
   ```

### 🔹 Paso 4: Copiar y Pegar el Prompt Maestro
Copia todo el bloque que está a continuación y pégaselo a **Antigravity**. ¡Él se encargará de crear los archivos, instalar dependencias y construir la aplicación completa!

---

## 📜 Master Prompt (Copiar a partir de aquí)

```markdown
Desarrolla un Dashboard Inteligente e Interactivo para Subastas y Ofertas en Vivo conectado a la API oficial de QuiénDaMenos (api.quiendamenos.com).

## 🛠️ Stack Tecnológico
1. **Framework:** Next.js 14 (App Router) con TypeScript.
2. **Estilos:** Tailwind CSS con estética moderna tipo Glassmorphism, Modo Oscuro/Claro dinámico y paleta de colores curada (HSL/Slate/Brand Indigo).
3. **Iconos & Componentes:** `lucide-react`, `recharts` (para gráficos de tendencias y mapas de calor de ofertas únicas).
4. **Arquitectura:** Proxy serverless en `app/api/...` para proteger la API Key y evitar problemas de CORS.

---

## 📡 Integración de Endpoints de la API (`https://api.quiendamenos.com`)
Implementa los siguientes endpoints oficiales:

1. **Subastas Activas y Finalizadas:**
   - `GET /auctions` (Listado general de subastas con filtros `status=active` y `status=finalized`).
   - *Enriquecimiento en Tiempo Real:* Consultar en paralelo `GET /auctions/:id/leaderboard` para enriquecer las subastas activas con totales reales de ofertas únicas (`totalUniqueLive`) y participantes únicos (`totalParticipants`).

2. **Tabla de Posiciones y Líderes:**
   - `GET /auctions/:id/leaderboard` (Devuelve el ranking en vivo de ofertas únicas y participantes).

3. **Sistema de Ofertas:**
   - `POST /auctions/:id/bids` (Envío de oferta individual de $1 ARS en adelante).

4. **Bombas de Quema y Comodines:**
   - `POST /auctions/:id/bombs` (Disparo de Bomba Pequeña y Bomba Grande).
   - `POST /auctions/:id/helps` (Activación de comodines: `burn_100`, `available_100`, `burn_10`, `available_10`).
   - *Semáforo de Estado:* Validar `helpsUnlocked` (true/false), `helpThresholdBids` y `helpsCutoffMinutes`.

5. **Historial de Ofertas de Usuario:**
   - `GET /auctions/:id/my-bids` (Ofertas del usuario en la subasta activa).
   - `GET /me/bids` (Historial global de todas las ofertas realizadas por el usuario).
   - *Cálculo de Posición:* Cruzar datos con las tablas líderes para calcular el puesto exacto (ej. `#1 🏆`, `#2 🥈`, `#3 🥉`, `#4 🏅`, `#5 🏅`).

6. **Perfil de Usuario y Créditos:**
   - `GET /me` (Perfil de usuario autenticado).
   - `GET /credits/balance` (Saldo de créditos en tiempo real).
   - `GET /credit-packs` (Paquetes de créditos con precio en ARS y soporte Crypto).
   - *Enlace Oficial de Compra:* Redirigir siempre a `https://quiendamenos.com/comprar-creditos?src=header-plus`.

7. **Red Social de Amigos y Colaboradores:**
   - `GET /friends` (Devuelve `friends` aceptados, `incoming` recibidas y `outgoing` enviadas).
   - `POST /friends/:id/accept` (Aceptar solicitudes de amistad/colaborador).

8. **Historial de Premios:**
   - `GET /prizes/:id/history` (Historial de ganadores anteriores por producto).

---

## 🎨 Componentes y Características de la Interfaz

### 1. Barra de Navegación (`Header.tsx`):
- Logo brillante y título oficial.
- Badge de usuario (`@username`) y foto de perfil.
- Botón **`👥 Amigos`** con insignia de solicitudes pendientes (`incoming.length`).
- Botón **`📜 Mis Ofertas`** para abrir el historial global de pujas.
- Contador de Créditos con botón de recarga directa.
- Selector de Tema (Modo Claro / Modo Oscuro) y botón de configuración de API Key.

### 2. Filtros y Tarjetas KPI (`SearchAndFilters.tsx` & `KPICards.tsx`):
- Buscador por texto en vivo.
- Filtros dinámicos por Categoría, Vendedor/Marca, Rango de Precios, Porcentaje de Descuento y Estado (`En Vivo` / `Finalizadas`).
- Tarjetas resumen con Total de Ofertas, Mayor Descuento, Ahorro Total y Vendedor Top.

### 3. Vistas de Productos (`OffersGrid.tsx` & `OffersTable.tsx`):
- Cambiador entre Vista en Cuadrícula (Grid) y Vista en Tabla (Table).
- Insignia **`🔴 STREAM`** en productos con transmisión en directo (`streamUrl`).
- Insignia **`🎙️ Host: @anfitrion`** en subastas patrocinadas.
- Insignia **`⭐ Testimonio`** en subastas finalizadas con reseña verificada (`hasTestimonial`).
- Chip de color del producto (`🎨 Color`).
- Bloque de métricas de intensidad: `Ofertas Totales` • `Ofertas Únicas` • `👥 Participantes`.

### 4. Modal de Subasta e Inteligencia de Pujas (`BiddingModal.tsx`):
- **Banner de Streaming:** Enlace directo para ver el sorteo en vivo si existe `streamUrl`.
- **Navegación por Pestañas:**
  1. **🎯 Recomendador IA & Ráfaga:** Análisis de rangos libres y disparo de ráfagas inteligentes.
  2. **🤖 Bot por Rangos:** Automatización de pujas continuas cada X segundos.
  3. **🏆 Posiciones en Vivo:** Tabla de líderes y panel de **Premios en Créditos por Podio** (🥈 +50, 🥉 +30, 🏅 +20, 🎖️ +10 créditos).
  4. **🏷️ Mis Ofertas:** Lista de pujas enviadas en esta subasta con barra de progreso de límite (`Mis Ofertas: X / maxBidsPerUser`).
  5. **💣 Bombas & Ayudas:** Lanzamiento de bombas y comodines de 100/10 posiciones con semáforo `helpsUnlocked`.

### 5. Modales Secundarios:
- **`FriendsModal.tsx`:** Gestión de solicitudes recibidas (con botón "Aceptar"), solicitudes enviadas (`outgoing`) y amigos conectados.
- **`MyBidsHistoryModal.tsx`:** Auditoría global de ofertas con filtros, indicadores de ofertas Únicas 🟢 vs Quemadas 🔥 y puesto exacto en líderes.
- **`CreditPurchaseModal.tsx`:** Catálogo oficial de paquetes de créditos con precios en ARS y distintivo Crypto.

---

## 🖥️ Scripts de Inicio para Windows (`.bat`)
Crea dos scripts ejecutables en la raíz del proyecto:

1. **`iniciar-servidor.bat`**:
   Verifica Node.js, abre el navegador en `http://localhost:3000` y ejecuta `npm run dev`.

2. **`iniciar-produccion.bat`**:
   Ejecuta `npm run build`, abre el navegador en `http://localhost:3000` e inicia `npm start`.
```
