import * as THREE from 'three';

/**
 * High-fidelity procedural PBR textures for photorealistic engine rendering.
 * Generates HDR environment maps, machined metal bump maps, and industrial textures
 * entirely in Canvas — no external assets needed.
 */

// ==========================================
// HDR STUDIO ENVIRONMENT MAP (Cubemap)
// ==========================================

/**
 * Creates a procedural studio HDRI environment cubemap for realistic metallic reflections.
 * Simulates a 3-point studio lighting setup with soft gradients.
 */
export function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.CubeTexture {
  const size = 256;
  const faces: HTMLCanvasElement[] = [];

  // Studio environment: soft gradient with bright spots simulating area lights
  const faceColors: [number, number, number, number, number, number][] = [
    [0.06, 0.07, 0.10, 0.18, 0.20, 0.28], // +X (right) — fill light side
    [0.04, 0.05, 0.07, 0.12, 0.14, 0.20], // -X (left) — shadow side
    [0.25, 0.27, 0.32, 0.15, 0.16, 0.20], // +Y (top) — key light
    [0.02, 0.02, 0.03, 0.06, 0.06, 0.08], // -Y (bottom) — floor reflection
    [0.08, 0.09, 0.12, 0.20, 0.22, 0.30], // +Z (front) — camera side
    [0.05, 0.06, 0.08, 0.10, 0.11, 0.15], // -Z (back) — rim light
  ];

  for (let f = 0; f < 6; f++) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const [r1, g1, b1, r2, g2, b2] = faceColors[f];
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, `rgb(${Math.round(r2 * 255)},${Math.round(g2 * 255)},${Math.round(b2 * 255)})`);
      grad.addColorStop(1, `rgb(${Math.round(r1 * 255)},${Math.round(g1 * 255)},${Math.round(b1 * 255)})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Add subtle area light highlight on top and front faces
      if (f === 2 || f === 4) {
        const radGrad = ctx.createRadialGradient(size * 0.4, size * 0.3, 10, size * 0.4, size * 0.3, size * 0.5);
        radGrad.addColorStop(0, 'rgba(255, 250, 240, 0.35)');
        radGrad.addColorStop(0.4, 'rgba(200, 210, 230, 0.12)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, size, size);
      }

      // Rim light glow on back face
      if (f === 5) {
        const rimGrad = ctx.createRadialGradient(size * 0.6, size * 0.4, 5, size * 0.6, size * 0.4, size * 0.4);
        rimGrad.addColorStop(0, 'rgba(244, 63, 94, 0.25)');
        rimGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rimGrad;
        ctx.fillRect(0, 0, size, size);
      }
    }
    faces.push(canvas);
  }

  const cubeTexture = new THREE.CubeTexture(faces);
  cubeTexture.needsUpdate = true;
  return cubeTexture;
}

// ==========================================
// PROCEDURAL BUMP / ROUGHNESS MAPS
// ==========================================

export function createCastIronBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    // Micro-pores and grain of cast iron
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 50;
      const val = Math.min(255, Math.max(0, 128 + noise));
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Add larger-scale casting texture variation
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 2 + Math.random() * 6;
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export function createBrushedAluTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#b8c2cc';
    ctx.fillRect(0, 0, 512, 512);

    // Fine concentric machining marks (lathe-turned aluminum)
    for (let y = 0; y < 512; y++) {
      const bright = Math.random();
      if (bright > 0.3) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.08})`;
        ctx.fillRect(0, y, 512, 1);
      }
      if (bright < 0.4) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.02 + Math.random() * 0.06})`;
        ctx.fillRect(0, y, 512, 1);
      }
    }

    // Cross-hatch pattern for honed surfaces
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 60; i++) {
      const angle = (Math.random() - 0.5) * 0.15;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * 512);
      ctx.lineTo(512, Math.random() * 512 + angle * 512);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createTimingBeltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#18191c';
    ctx.fillRect(0, 0, 256, 64);

    // Timing belt teeth
    ctx.fillStyle = '#0f1012';
    for (let x = 0; x < 256; x += 8) {
      ctx.fillRect(x, 0, 4, 64);
    }

    // Kevlar reinforcement ribs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 15, 256, 2);
    ctx.fillRect(0, 32, 256, 2);
    ctx.fillRect(0, 48, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
  return texture;
}

export function createStudioFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark studio floor with subtle radial gradient
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    grad.addColorStop(0, '#151b24');
    grad.addColorStop(0.5, '#0d1117');
    grad.addColorStop(1, '#06080c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Calibration ring
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(256, 256, 180, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.beginPath();
    ctx.arc(256, 256, 120, 0, Math.PI * 2);
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    // Angular markers
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
      const x1 = 256 + Math.cos(angle) * 170;
      const y1 = 256 + Math.sin(angle) * 170;
      const x2 = 256 + Math.cos(angle) * 190;
      const y2 = 256 + Math.sin(angle) * 190;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createMachinedPistonTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#c0c8d4';
    ctx.fillRect(0, 0, 256, 256);

    // Concentric lathe marks on piston crown
    for (let r = 4; r < 128; r += 2) {
      ctx.strokeStyle = Math.random() > 0.5
        ? `rgba(255,255,255,${0.08 + Math.random() * 0.06})`
        : `rgba(0,0,0,${0.04 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Valve relief pockets
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(90, 80, 28, 0, Math.PI * 2);
    ctx.arc(166, 80, 28, 0, Math.PI * 2);
    ctx.arc(90, 176, 24, 0, Math.PI * 2);
    ctx.arc(166, 176, 24, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

/**
 * Creates a metallic roughness map for polished aluminum parts.
 * Darker = smoother (more reflective), lighter = rougher.
 */
export function createAluminumRoughnessMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Base roughness: fairly smooth
    ctx.fillStyle = '#404040'; // ~0.25 roughness
    ctx.fillRect(0, 0, 256, 256);

    // Add micro-scratches for realism
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 80; i++) {
      const x1 = Math.random() * 256;
      const y1 = Math.random() * 256;
      const len = 5 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
      ctx.stroke();
    }

    // Finger smudges (larger smooth patches)
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = 10 + Math.random() * 20;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(80, 80, 80, 0.4)');
      grad.addColorStop(1, 'rgba(64, 64, 64, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Helical spring geometry generator for realistic valve springs (Animagraffs style).
 */
export function createHelicalSpringGeometry(
  radius: number = 0.08,
  pitch: number = 0.045,
  coils: number = 5.5,
  wireRadius: number = 0.015,
  radialSegments: number = 6,
  tubularSegments: number = 48
): THREE.TubeGeometry {
  const helixCurve = new THREE.CurvePath<THREE.Vector3>();
  // Create a custom curve by overriding getPoint on a Curve instance
  const curve = Object.create(THREE.Curve.prototype) as THREE.Curve<THREE.Vector3>;
  curve.getPoint = (t: number, optionalTarget = new THREE.Vector3()) => {
    const angle = t * coils * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = t * coils * pitch;
    const z = radius * Math.sin(angle);
    return optionalTarget.set(x, y, z);
  };
  void helixCurve;
  return new THREE.TubeGeometry(curve, tubularSegments, wireRadius, radialSegments, false);
}
