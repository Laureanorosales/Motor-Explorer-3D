# 🏎️⚙️ MotorExplorer — Automotive Engine Encyclopedia & 3D Interactive CAD Simulator

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/3D%20Graphics-Three.js%20WebGL-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Oxlint](https://img.shields.io/badge/Linted%20by-Oxlint-orange?style=flat-square)](https://oxc.rs/)
[![Built with AI](https://img.shields.io/badge/Crafted%20with-AI%20%2B%20Vibe%20Coding-8B2846?style=flat-square&logo=openai&logoColor=white)](#-desarrollo-con-inteligencia-artificial)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **MotorExplorer** es una aplicación web interactiva y enciclopedia técnica automotriz orientada a ingenieros, mecánicos, estudiantes y entusiastas del motor. Cuenta con un **Simulador 3D en tiempo real con cinemática real de biela-manivela a 60 FPS**, modo de **armado y desarmado interactivo (Exploded View)**, síntesis de audio de motor con Web Audio API, despiece mecánico y planos CAD técnicos —con especial homenaje al patrimonio automotriz argentino y los impulsores modernos de mayor venta en la región.

---

## 🤖 Desarrollo con Inteligencia Artificial

> 💡 **Nota de autoría y transparencia:**  
> Este proyecto fue concebido, diseñado y construido utilizando metodologías de **Vibe Coding y Pair Programming con Inteligencia Artificial (IA)**. 
> 
> La IA fue empleada de forma estratégica a lo largo de todo el ciclo de desarrollo:
> - **Gráficos 3D & Cinemática Mecánica:** Modelado procedural con Three.js, cálculo físico de ecuaciones cinemáticas de biela-manivela y sincronización de las 4 fases de combustión interna (Ciclo Otto).
> - **Síntesis de Audio Web Audio API:** Generación procedural de frecuencias armónicas dinámicas y curvas de distorsión para simular el sonido real de aceleración de un motor.
> - **Ingeniería de Prompts y Diseño de Arquitectura:** Modelado de tipos estrictos en TypeScript y diseño modular de componentes.
> - **Curaduría y Verificación de Datos Técnicos:** Compilación de especificaciones de motores clásicos argentinos (Torino Tornado 230, Ford 221 SP Sprint, Chevrolet 250, Dodge Slant-Six) y modernos (Fiat FireFly, Toyota 1GD-FTV, VW V6 TDI), cruzando fichas técnicas de fábrica.
> - **Optimización y Testing Automatizado:** Asistencia en la generación de suites de tests con Vitest, reducción de deuda técnica y configuración de linters de última generación (Oxlint).

---

## ✨ Características Principales

### 1. 🎮 Simulador 3D en Movimiento en Tiempo Real (Three.js WebGL)
- **Cinemática Real de Biela-Manivela a 60 FPS**: cálculo matemático exacto del movimiento alternativo de los 4 pistones, bielas oscilantes y rotación del cigüeñal con orden de encendido `1-3-4-2`.
- **Efecto de Combustión Realista**: fogonazos lumínicos dentro de cada cámara de combustión en el Punto Muerto Superior (PMS) durante el ciclo de explosión.
- **Árboles de levas y válvulas sincronizadas**: rotación 1:2 en 4 tiempos con apertura y cierre de válvulas en tiempo real.
- **Tacómetro & Acelerador WOT (Wide Open Throttle)**: control deslizante de RPM (0 a 8.000 RPM) y botón para revolucionar el motor al corte.
- **Sintetizador de Audio Nativo (Web Audio API)**: rugido de motor en tiempo real que reacciona a las revoluciones por minuto sin archivos pesados ni dependencias externas.
- **Modo Rayos X (Transparencia)**: permite transparentar el bloque de fundición para ver las piezas internas moviéndose a alta velocidad.
- **Cámara Orbital 360°**: rotación libre, zoom y presets de cámara (Isométrica, Frente, Lateral, Superior).

### 2. 🔧 Despiece / Armado y Desarmado Interactivo (Exploded View)
- **Control deslizante de despiece continuo (0% a 100%)**: desarma progresivamente todos los componentes en el espacio 3D (tapa de válvulas, árboles de levas, culata, múltiples de admisión y escape, turbo, bloque, pistones, cigüeñal, cárter, poleas y volante de inercia).
- Botones de acción rápida: **"Armar Todo (0%)"** y **"Vista Explosionada (100%)"**.
- Inspector de pieza en tiempo real: al hacer clic en cualquier componente del motor 3D se despliega su nombre técnico, función y enlace directo a su diagnóstico de fallas en el glosario.

### 3. 📋 Catálogo Técnico Exhaustivo de Motores
- **28 motores detallados** (13 clásicos históricos argentinos de competición y calle + 15 modelos de vehículos líderes de ventas).
- **Filtros dinámicos en tiempo real**: por marca (IKA, Ford, Chevrolet, Dodge, Fiat, Toyota, Renault, Peugeot, Volkswagen, etc.), arquitectura de cilindros (I3, I4, I6, V6, V8) y tipo de aspiración (Atmosférico, Turbo, Biturbo).
- **Búsqueda predictiva instantánea** por denominación técnica de motor o por modelo de auto.
- **Medidores visuales de desempeño**: potencia máxima (HP), par motor (Nm), límite de revoluciones (RPM) y cilindrada.

### 4. 📐 Explorador CAD & Blueprints Técnicos
- Visualización de láminas técnicas originales de manuales de taller sin recortes.
- **Hotspots interactivos**: puntos de anclaje para inspeccionar cada pieza en su ubicación exacta.
- Selector dinámico de láminas según la configuración (I4, I6, V6 Turbo Diésel, V8, I3).

### 5. 📖 Glosario Técnico de Piezas & Diagnóstico Mecánico
- Enciclopedia de más de 20 componentes clasificados por subsistema.
- Explicación de principios de funcionamiento, ubicación en el ensamblaje y **síntomas habituales de falla o avería** para orientación en diagnóstico.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Frontend** | [React 19](https://react.dev/) | Librería core de interfaz con Hooks y componentes funcionales. |
| **Gráficos 3D** | [Three.js](https://threejs.org/) (WebGL) | Renderizado 3D en tiempo real con materiales PBR metálicos, luces dinámicas y shaders. |
| **Audio** | Web Audio API | Síntesis procedural de sonido de motor reactivo a las RPM sin archivos externos. |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Tipado estático estricto para modelos de datos mecánicos y diagramas. |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) | Empaquetado ultra rápido con HMR instantáneo y build optimizado. |
| **Estilos** | CSS Modules (Vanilla) | Arquitectura modular de estilos con variables CSS personalizadas sin dependencias pesadas. |
| **Iconografía** | [@tabler/icons-react](https://tabler.io/icons) | Set coherente y ligero de iconos vectoriales. |
| **Testing** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | 35 pruebas automatizadas de simulación 3D, audio, componentes y flujos de usuario. |
| **Linter** | [Oxlint](https://oxc.rs/) | Linter basado en Rust de máximo rendimiento. |

---

## 📁 Estructura del Proyecto

```text
motor-explorer/
├── public/
│   ├── blueprints/           # Láminas de planos CAD y esquemas de taller
│   ├── favicon.svg           # Ícono vectorial de la aplicación
│   └── icons.svg
├── src/
│   ├── assets/               # Recursos estáticos
│   ├── components/
│   │   ├── EngineCatalog/    # Grilla, filtros y tarjetas de motores
│   │   ├── EngineDetail/     # Modal de inspección técnica en profundidad
│   │   ├── InteractiveDiagram/ # Visor SVG con hotspots interactivos y zoom
│   │   ├── Layout/           # Barra de navegación y header
│   │   └── PartsGlossary/    # Glosario mecánico con buscador por categoría
│   ├── data/
│   │   ├── diagrams.ts       # Mapeo de hotspots y planos CAD
│   │   ├── engines.ts        # Base de datos de motores (specs, historia, autos)
│   │   ├── helpers.ts        # Funciones de consulta y filtrado
│   │   └── parts.ts          # Diccionario de componentes mecánicos y fallas
│   ├── styles/
│   │   ├── global.css        # Resets, tipografías y reglas base
│   │   └── variables.css     # Paleta de color, tokens y sombras
│   ├── test/                 # Suite de pruebas con Vitest
│   ├── types/
│   │   └── engine.ts         # Contratos e interfaces TypeScript
│   ├── App.tsx               # Orquestador principal y gestión de pestañas
│   └── main.tsx              # Punto de entrada de React 19
├── DEPLOYMENT.md             # Guía paso a paso de despliegue en producción
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) (incluido con Node.js)

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Laureanorosales/Motor-Explorer-3D.git
   cd Motor-Explorer-3D
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Ejecutar las pruebas automatizadas:**
   ```bash
   npm run test
   ```

5. **Ejecutar el linter:**
   ```bash
   npm run lint
   ```

6. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Los archivos listos para servir se generarán en la carpeta `dist/`. Puedes previsualizarlos con `npm run preview`.

---

## 🌐 Despliegue en Producción

El proyecto está preparado para desplegarse con 1 solo clic en servicios estáticos como **Vercel**, **Netlify**, **Render** o **GitHub Pages**:

- Los archivos [`vercel.json`](./vercel.json) y [`netlify.toml`](./netlify.toml) ya están incluidos en la raíz para garantizar el enrutamiento correcto de la SPA.
- Consulta los pasos detallados en [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
