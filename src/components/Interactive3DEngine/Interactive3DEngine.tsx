import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import styles from './Interactive3DEngine.module.css';
import { engineSound } from '../../utils/engineSound';
import { 
  createCastIronBumpTexture, 
  createBrushedAluTexture, 
  createTimingBeltTexture,
  createStudioFloorTexture,
  createMachinedPistonTexture,
  createAluminumRoughnessMap,
  createStudioEnvMap,
  createHelicalSpringGeometry
} from './engineTextures';
import { 
  IconPlayerPlay, 
  IconPlayerPause, 
  IconVolume, 
  IconVolumeOff, 
  IconMaximize, 
  IconMinimize, 
  IconRefresh, 
  IconFlame, 
  IconSettings, 
  IconTool,
  IconGauge,
  IconArrowRight,
  IconLayersSubtract,
  IconMovie,
  IconBinaryTree
} from '@tabler/icons-react';
import { EnginePart, EngineConfig } from '../../types/engine';
import { getPartById } from '../../data/helpers';

export type EngineArch3D = 'Inline-4' | 'Inline-6' | 'V8' | 'V6' | 'Inline-3';

export interface Interactive3DEngineProps {
  onSelectPart?: (part: EnginePart) => void;
  onOpenMasterclass?: () => void;
  engineName?: string;
  engineConfig?: EngineConfig | string;
  onArchChange?: (arch: EngineArch3D) => void;
}

interface ExplodableSubsystem {
  id: string;
  name: string;
  category: string;
  partId: string;
  group: THREE.Group;
  basePos: THREE.Vector3;
  explodeOffset: THREE.Vector3;
}

interface CylinderDef {
  index: number;
  bankIndex: number; // 0 for inline or left bank, 1 for right bank
  bankAngle: number; // in radians: 0, -PI/6, +PI/6, -PI/4, +PI/4
  z: number;
  phaseOffset: number;
}

interface ArchSpecs {
  cylinders: CylinderDef[];
  isV: boolean;
  bankAngle: number;
  lengthZ: number;
  shaftLength: number;
  archName: string;
  firingOrder: string;
  valvesCount: number;
}

function normalize3DConfig(cfg?: string): EngineArch3D {
  if (!cfg) return 'Inline-4';
  if (cfg === 'Inline-6' || (cfg.includes('6') && cfg.startsWith('Inline'))) return 'Inline-6';
  if (cfg === 'V8' || cfg.startsWith('V8')) return 'V8';
  if (cfg === 'V6' || cfg.startsWith('V6')) return 'V6';
  if (cfg === 'Inline-3' || cfg.startsWith('Inline-3')) return 'Inline-3';
  return 'Inline-4';
}

function getArchSpecs(arch: EngineArch3D): ArchSpecs {
  switch (arch) {
    case 'Inline-3': {
      return {
        cylinders: [
          { index: 0, bankIndex: 0, bankAngle: 0, z: -1.2, phaseOffset: 0 },
          { index: 1, bankIndex: 0, bankAngle: 0, z: 0, phaseOffset: (2 * Math.PI) / 3 },
          { index: 2, bankIndex: 0, bankAngle: 0, z: 1.2, phaseOffset: (4 * Math.PI) / 3 },
        ],
        isV: false,
        bankAngle: 0,
        lengthZ: 3.8,
        shaftLength: 4.4,
        archName: '3 Cilindros en Línea (I3)',
        firingOrder: '1 - 2 - 3 (120°)',
        valvesCount: 12,
      };
    }
    case 'Inline-6': {
      return {
        cylinders: [
          { index: 0, bankIndex: 0, bankAngle: 0, z: -2.5, phaseOffset: 0 },
          { index: 1, bankIndex: 0, bankAngle: 0, z: -1.5, phaseOffset: (4 * Math.PI) / 3 },
          { index: 2, bankIndex: 0, bankAngle: 0, z: -0.5, phaseOffset: (2 * Math.PI) / 3 },
          { index: 3, bankIndex: 0, bankAngle: 0, z: 0.5, phaseOffset: (2 * Math.PI) / 3 },
          { index: 4, bankIndex: 0, bankAngle: 0, z: 1.5, phaseOffset: (4 * Math.PI) / 3 },
          { index: 5, bankIndex: 0, bankAngle: 0, z: 2.5, phaseOffset: 0 },
        ],
        isV: false,
        bankAngle: 0,
        lengthZ: 6.4,
        shaftLength: 6.8,
        archName: '6 Cilindros en Línea (I6)',
        firingOrder: '1 - 5 - 3 - 6 - 2 - 4',
        valvesCount: 24,
      };
    }
    case 'V6': {
      const bankAngle = Math.PI / 6; // 30°
      return {
        cylinders: [
          // Bancada Izquierda (Cilindros 1, 2, 3)
          { index: 0, bankIndex: 0, bankAngle: -bankAngle, z: -1.2, phaseOffset: 0 },
          { index: 1, bankIndex: 0, bankAngle: -bankAngle, z: 0, phaseOffset: (4 * Math.PI) / 3 },
          { index: 2, bankIndex: 0, bankAngle: -bankAngle, z: 1.2, phaseOffset: (2 * Math.PI) / 3 },
          // Bancada Derecha (Cilindros 4, 5, 6)
          { index: 3, bankIndex: 1, bankAngle: bankAngle, z: -1.1, phaseOffset: (4 * Math.PI) / 3 + bankAngle },
          { index: 4, bankIndex: 1, bankAngle: bankAngle, z: 0.1, phaseOffset: (2 * Math.PI) / 3 + bankAngle },
          { index: 5, bankIndex: 1, bankAngle: bankAngle, z: 1.3, phaseOffset: 0 + bankAngle },
        ],
        isV: true,
        bankAngle,
        lengthZ: 3.8,
        shaftLength: 4.4,
        archName: 'V6 Biturbo a 60° (V6)',
        firingOrder: '1 - 4 - 2 - 5 - 3 - 6',
        valvesCount: 24,
      };
    }
    case 'V8': {
      const bankAngle = Math.PI / 4; // 45°
      return {
        cylinders: [
          // Bancada Izquierda (Cilindros 1, 3, 5, 7)
          { index: 0, bankIndex: 0, bankAngle: -bankAngle, z: -1.8, phaseOffset: 0 },
          { index: 1, bankIndex: 0, bankAngle: -bankAngle, z: -0.6, phaseOffset: Math.PI / 2 },
          { index: 2, bankIndex: 0, bankAngle: -bankAngle, z: 0.6, phaseOffset: (3 * Math.PI) / 2 },
          { index: 3, bankIndex: 0, bankAngle: -bankAngle, z: 1.8, phaseOffset: Math.PI },
          // Bancada Derecha (Cilindros 2, 4, 6, 8)
          { index: 4, bankIndex: 1, bankAngle: bankAngle, z: -1.7, phaseOffset: Math.PI / 2 + bankAngle },
          { index: 5, bankIndex: 1, bankAngle: bankAngle, z: -0.5, phaseOffset: Math.PI + bankAngle },
          { index: 6, bankIndex: 1, bankAngle: bankAngle, z: 0.7, phaseOffset: 0 + bankAngle },
          { index: 7, bankIndex: 1, bankAngle: bankAngle, z: 1.9, phaseOffset: (3 * Math.PI) / 2 + bankAngle },
        ],
        isV: true,
        bankAngle,
        lengthZ: 5.0,
        shaftLength: 5.6,
        archName: 'V8 American Muscle a 90° (V8)',
        firingOrder: '1 - 8 - 4 - 3 - 6 - 5 - 7 - 2',
        valvesCount: 32,
      };
    }
    case 'Inline-4':
    default: {
      return {
        cylinders: [
          { index: 0, bankIndex: 0, bankAngle: 0, z: -1.8, phaseOffset: 0 },
          { index: 1, bankIndex: 0, bankAngle: 0, z: -0.6, phaseOffset: Math.PI },
          { index: 2, bankIndex: 0, bankAngle: 0, z: 0.6, phaseOffset: Math.PI },
          { index: 3, bankIndex: 0, bankAngle: 0, z: 1.8, phaseOffset: 0 },
        ],
        isV: false,
        bankAngle: 0,
        lengthZ: 5.0,
        shaftLength: 5.4,
        archName: '4 Cilindros en Línea 16V DOHC (I4)',
        firingOrder: '1 - 3 - 4 - 2 (180°)',
        valvesCount: 16,
      };
    }
  }
}

export const Interactive3DEngine: React.FC<Interactive3DEngineProps> = ({ 
  onSelectPart,
  onOpenMasterclass,
  engineName,
  engineConfig,
  onArchChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Arquitectura seleccionada
  const [selectedArch, setSelectedArch] = useState<EngineArch3D>(() => normalize3DConfig(engineConfig));
  const [prevEngineConfig, setPrevEngineConfig] = useState(engineConfig);

  if (engineConfig !== prevEngineConfig) {
    setPrevEngineConfig(engineConfig);
    setSelectedArch(normalize3DConfig(engineConfig));
  }

  const handleSelectArch = (arch: EngineArch3D) => {
    setSelectedArch(arch);
    onArchChange?.(arch);
  };

  // Estados de control
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [rpm, setRpm] = useState<number>(1800);
  const [explodeProgress, setExplodeProgress] = useState<number>(0);
  const [isCutaway, setIsCutaway] = useState<boolean>(true);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>('turbocharger');
  const [currentStroke, setCurrentStroke] = useState<string>('Combustión');
  const [crankAngleDeg, setCrankAngleDeg] = useState<number>(0);

  // Refs de estado para el bucle de animación a 60 FPS
  const isRunningRef = useRef<boolean>(isRunning);
  const rpmRef = useRef<number>(rpm);
  const explodeProgressRef = useRef<number>(explodeProgress);

  useEffect(() => {
    isRunningRef.current = isRunning;
    rpmRef.current = rpm;
    explodeProgressRef.current = explodeProgress;
  }, [isRunning, rpm, explodeProgress]);

  // Referencias Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const subsystemsRef = useRef<ExplodableSubsystem[]>([]);

  // Referencias cinemáticas
  const crankAngleRef = useRef<number>(0);
  const movingPartsRef = useRef<{
    crankshaft: THREE.Group;
    pistons: THREE.Group[];
    rods: THREE.Group[];
    camshafts: THREE.Group[];
    intakeValves: THREE.Mesh[];
    exhaustValves: THREE.Mesh[];
    intakeSprings: THREE.Mesh[];
    exhaustSprings: THREE.Mesh[];
    combustionFlames: THREE.Mesh[];
    intakeMists: THREE.Mesh[];
    exhaustGlows: THREE.Mesh[];
    sparkLights: THREE.PointLight[];
    sparkArcs: THREE.Mesh[];
    timingPulley: THREE.Group;
    flywheel: THREE.Group;
    cutawayMeshes: THREE.Mesh[];
  } | null>(null);

  // Control de cámara orbital
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraSphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 9.5,
    theta: Math.PI / 4,
    phi: Math.PI / 2.8
  });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.1, 0));

  // Sonido reactivo adaptado al régimen y número de cilindros
  useEffect(() => {
    const specs = getArchSpecs(selectedArch);
    engineSound.setCylinderCount(specs.cylinders.length);
    if (!isSoundMuted && isRunning) {
      engineSound.updateRpm(rpm);
    } else {
      engineSound.updateRpm(0);
    }
  }, [rpm, isRunning, isSoundMuted, selectedArch]);

  const toggleSound = () => {
    const nextMuted = !isSoundMuted;
    setIsSoundMuted(nextMuted);
    engineSound.setMuted(nextMuted);
    if (!nextMuted && isRunning) {
      engineSound.updateRpm(rpm);
    }
  };

  const handleRevThrottle = () => {
    if (isSoundMuted) {
      toggleSound();
    }
    const previousRpm = rpm;
    setRpm(6800);
    engineSound.revThrottle(() => {
      setRpm(previousRpm);
    });
  };

  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = cameraSphericalRef.current;
    const target = cameraTargetRef.current;

    cameraRef.current.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = target.y + radius * Math.cos(phi);
    cameraRef.current.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(target);
  }, []);

  const toggleCutaway = () => {
    setIsCutaway((prev) => !prev);
  };

  const setCameraPreset = (view: 'iso' | 'front' | 'side' | 'top') => {
    if (view === 'iso') {
      cameraSphericalRef.current = { radius: 9.5, theta: Math.PI / 4, phi: Math.PI / 2.8 };
    } else if (view === 'front') {
      cameraSphericalRef.current = { radius: 8.8, theta: 0, phi: Math.PI / 2 };
    } else if (view === 'side') {
      cameraSphericalRef.current = { radius: 9.0, theta: Math.PI / 2, phi: Math.PI / 2 };
    } else if (view === 'top') {
      cameraSphericalRef.current = { radius: 9.8, theta: 0, phi: 0.05 };
    }
    updateCameraPosition();
  };

  // ==========================================
  // INICIALIZACIÓN THREE.JS & MOTOR MULTICILINDRICO DINÁMICO
  // ==========================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Limpiar contenedor previo
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const archSpecs = getArchSpecs(selectedArch);
    const { cylinders, isV, bankAngle, lengthZ, shaftLength } = archSpecs;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0c10);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      // Entorno sin soporte de WebGL nativo (ej. jsdom en tests automatizados)
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // ==========================================
    // STUDIO HDR ENVIRONMENT MAP
    // ==========================================
    let envMap: THREE.CubeTexture | null = null;
    try {
      envMap = createStudioEnvMap(renderer);
      scene.environment = envMap;
    } catch {
      // Fallback: no envmap in test environments
    }

    // ==========================================
    // 5-POINT STUDIO LIGHTING (Key / Fill / Rim / Top / Ground Bounce)
    // ==========================================
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.0);
    keyLight.position.set(5, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8ec8f8, 1.4);
    fillLight.position.set(-8, 4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.8);
    rimLight.position.set(2, 3, -9);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xe8eef8, 1.6);
    topLight.position.set(0, 12, 0);
    scene.add(topLight);

    const groundBounce = new THREE.HemisphereLight(0x1a202c, 0x060810, 0.8);
    scene.add(groundBounce);

    // Suelo de estudio circular
    const studioFloorTex = createStudioFloorTexture();
    const floorGeo = new THREE.CylinderGeometry(8.5, 8.5, 0.15, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      map: studioFloorTex,
      metalness: 0.85,
      roughness: 0.28
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -3.70;
    floor.receiveShadow = true;
    scene.add(floor);

    const ringGeo = new THREE.TorusGeometry(8.5, 0.05, 12, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -3.64;
    scene.add(ring);

    // ==========================================
    // PROCEDURAL TEXTURES
    // ==========================================
    const castIronBump = createCastIronBumpTexture();
    const brushedAluMap = createBrushedAluTexture();
    const timingBeltMap = createTimingBeltTexture();
    const aluRoughnessMap = createAluminumRoughnessMap();

    // ==========================================
    // PHOTOREALISTIC PBR MATERIALS (MeshPhysicalMaterial for key parts)
    // ==========================================

    // Engine block: high-grade cast aluminum / compacted graphite iron with metallic sheen
    const blockCastingMat = new THREE.MeshStandardMaterial({
      color: 0x383e4a,
      metalness: 0.76,
      roughness: 0.32,
      bumpMap: castIronBump,
      bumpScale: 0.02,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.7
    });

    // Cylinder liner: polished aluminum bore
    const linerMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0d8e4,
      metalness: 0.96,
      roughness: 0.12,
      bumpMap: brushedAluMap,
      bumpScale: 0.018,
      clearcoat: 0.15,
      clearcoatRoughness: 0.3,
      envMap: envMap ?? undefined,
      envMapIntensity: 1.2,
      side: THREE.DoubleSide
    });

    // Cutaway glass: transparent viewport
    const cutawayGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x9bc2e8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.82,
      opacity: 0.45,
      transparent: true,
      depthWrite: false
    });

    // Connecting rod: forged steel I-beam
    const rodSteelMat = new THREE.MeshPhysicalMaterial({
      color: 0x505860,
      metalness: 0.92,
      roughness: 0.22,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.9
    });

    // Crankshaft: forged hardened steel
    const crankshaftMat = new THREE.MeshPhysicalMaterial({
      color: 0x3a3e48,
      metalness: 0.95,
      roughness: 0.18,
      envMap: envMap ?? undefined,
      envMapIntensity: 1.0
    });

    // Mirror chrome: wrist pins, retainers, polished fasteners
    const mirrorChromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f4f8,
      metalness: 0.99,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMap: envMap ?? undefined,
      envMapIntensity: 1.8
    });

    // Intake valve: titanium-tinted steel
    const intakeValveMat = new THREE.MeshPhysicalMaterial({
      color: 0xa8bcd8,
      metalness: 0.93,
      roughness: 0.15,
      envMap: envMap ?? undefined,
      envMapIntensity: 1.0
    });

    // Exhaust valve: heat-treated Inconel alloy
    const exhaustValveMat = new THREE.MeshPhysicalMaterial({
      color: 0xb87a55,
      metalness: 0.88,
      roughness: 0.20,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.8
    });

    // Camshaft: hardened steel with dark finish
    const camshaftMat = new THREE.MeshStandardMaterial({
      color: 0x2d3138,
      metalness: 0.92,
      roughness: 0.18,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.7
    });

    // Valve cover: anodized aluminum (red for inline, dark for V)
    const valveCoverMat = new THREE.MeshPhysicalMaterial({
      color: isV ? (selectedArch === 'V8' ? 0x1E4D78 : 0x22262e) : 0x8B2846,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.8
    });

    // Intake manifold: cast aluminum with machined finish
    const intakeManifoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xbcc4ce,
      metalness: 0.88,
      roughness: 0.25,
      bumpMap: brushedAluMap,
      bumpScale: 0.02,
      roughnessMap: aluRoughnessMap,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.9
    });

    // Exhaust manifold: heat-oxidized steel
    const exhaustManifoldMat = new THREE.MeshStandardMaterial({
      color: 0x8c5b38,
      metalness: 0.85,
      roughness: 0.30,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.5
    });

    // Oil pan: stamped steel
    const oilPanMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a2e36,
      metalness: 0.80,
      roughness: 0.30,
      bumpMap: castIronBump,
      bumpScale: 0.015,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.5
    });

    // Timing belt: rubber compound
    const timingBeltMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      roughness: 0.85,
      metalness: 0.05,
      map: timingBeltMap
    });

    // Ceramic (spark plug insulator)
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xfcfcfd,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1
    });

    // Valve spring: shot-peened steel
    const springMat = new THREE.MeshStandardMaterial({
      color: 0x252830,
      metalness: 0.94,
      roughness: 0.16,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.6
    });
    const springGeo = createHelicalSpringGeometry(0.078, 0.042, 5.5, 0.013, 6, 48);

    const subsystems: ExplodableSubsystem[] = [];
    const cutawayMeshes: THREE.Mesh[] = [];

    // ==========================================
    // 1. TAPA DE VÁLVULAS (VALVE COVER)
    // ==========================================
    const valveCoverGroup = new THREE.Group();

    if (!isV) {
      // Tapa de válvulas en línea (I3, I4, I6)
      const coverShape = new THREE.Shape();
      coverShape.moveTo(-1.1, -0.3);
      coverShape.lineTo(1.1, -0.3);
      coverShape.quadraticCurveTo(1.15, 0.25, 0.95, 0.5);
      coverShape.lineTo(-0.95, 0.5);
      coverShape.quadraticCurveTo(-1.15, 0.25, -1.1, -0.3);

      const coverGeo = new THREE.ExtrudeGeometry(coverShape, { 
        depth: lengthZ + 0.4, 
        bevelEnabled: true, 
        bevelSegments: 3, 
        steps: 1, 
        bevelSize: 0.1, 
        bevelThickness: 0.1 
      });
      coverGeo.center();
      const coverMesh = new THREE.Mesh(coverGeo, valveCoverMat);
      coverMesh.position.y = 2.05;
      coverMesh.castShadow = true;
      valveCoverGroup.add(coverMesh);

      // Tapón de aceite
      const oilCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.15, 8), mirrorChromeMat);
      oilCap.position.set(0.55, 2.35, lengthZ * 0.35);
      valveCoverGroup.add(oilCap);

      // Bobinas independientes Coil-on-Plug
      cylinders.forEach((c) => {
        const coil = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.28), new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.3 }));
        coil.position.set(0, 2.22, c.z);
        valveCoverGroup.add(coil);
      });
    } else {
      // Motor en V: Dos tapas de válvulas inclinadas (Left & Right Banks)
      [-1, 1].forEach((dir) => {
        const bankAng = dir * bankAngle;
        const bankCoverGroup = new THREE.Group();
        const dist = 2.45;
        bankCoverGroup.position.set(dist * Math.sin(bankAng), -1.1 + dist * Math.cos(bankAng), 0);
        bankCoverGroup.rotation.z = -bankAng;

        const coverShape = new THREE.Shape();
        coverShape.moveTo(-0.7, -0.2);
        coverShape.lineTo(0.7, -0.2);
        coverShape.quadraticCurveTo(0.75, 0.2, 0.6, 0.38);
        coverShape.lineTo(-0.6, 0.38);
        coverShape.quadraticCurveTo(-0.75, 0.2, -0.7, -0.2);

        const coverGeo = new THREE.ExtrudeGeometry(coverShape, {
          depth: lengthZ + 0.3,
          bevelEnabled: true,
          bevelSegments: 3,
          steps: 1,
          bevelSize: 0.08,
          bevelThickness: 0.08
        });
        coverGeo.center();
        const coverMesh = new THREE.Mesh(coverGeo, valveCoverMat);
        coverMesh.castShadow = true;
        bankCoverGroup.add(coverMesh);

        // Bobinas de la bancada
        const bankCyls = cylinders.filter((c) => (dir === -1 ? c.bankIndex === 0 : c.bankIndex === 1));
        bankCyls.forEach((c) => {
          const coil = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.26), new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.3 }));
          coil.position.set(0, 0.28, c.z);
          bankCoverGroup.add(coil);
        });

        valveCoverGroup.add(bankCoverGroup);
      });
    }

    subsystems.push({
      id: 'valve_cover',
      name: isV ? 'Tapas de Válvulas Doble Bancada en V' : 'Tapa de Válvulas Deportiva DOHC',
      category: 'distribucion',
      partId: 'camshaft',
      group: valveCoverGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(0, 3.8, 0)
    });
    scene.add(valveCoverGroup);

    // ==========================================
    // 2. TREN DE DISTRIBUCIÓN & VÁLVULAS CON RESORTES
    // ==========================================
    const valvetrainGroup = new THREE.Group();
    const camshafts: THREE.Group[] = [];
    const intakeValves: THREE.Mesh[] = [];
    const exhaustValves: THREE.Mesh[] = [];
    const intakeSprings: THREE.Mesh[] = [];
    const exhaustSprings: THREE.Mesh[] = [];

    if (!isV) {
      // 2 Árboles de levas en línea
      [-0.5, 0.5].forEach((camX, camIdx) => {
        const camGroup = new THREE.Group();
        camGroup.position.set(camX, 1.75, 0);

        const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, shaftLength, 16);
        shaftGeo.rotateX(Math.PI / 2);
        const shaft = new THREE.Mesh(shaftGeo, mirrorChromeMat);
        camGroup.add(shaft);

        cylinders.forEach((c) => {
          [-0.15, 0.15].forEach((offsetZ) => {
            const lobeBaseGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 16);
            lobeBaseGeo.rotateX(Math.PI / 2);
            const lobeBase = new THREE.Mesh(lobeBaseGeo, camshaftMat);
            lobeBase.position.z = c.z + offsetZ;
            camGroup.add(lobeBase);

            const noseGeo = new THREE.ConeGeometry(0.12, 0.22, 12);
            noseGeo.rotateZ(Math.PI / 2);
            noseGeo.rotateY(camIdx === 0 ? 0 : Math.PI / 3);
            const nose = new THREE.Mesh(noseGeo, camshaftMat);
            nose.position.set(0.1, 0, c.z + offsetZ);
            camGroup.add(nose);
          });
        });

        valvetrainGroup.add(camGroup);
        camshafts.push(camGroup);
      });
    } else {
      // 4 Árboles de levas (2 por bancada)
      [-1, 1].forEach((dir) => {
        const ang = dir * bankAngle;
        const dist = 2.10;
        [-0.35, 0.35].forEach((lateralOffset) => {
          const camGroup = new THREE.Group();
          const camX = dist * Math.sin(ang) + lateralOffset * Math.cos(ang);
          const camY = -1.1 + dist * Math.cos(ang) - lateralOffset * Math.sin(ang);
          camGroup.position.set(camX, camY, 0);
          camGroup.rotation.z = -ang;

          const shaftGeo = new THREE.CylinderGeometry(0.075, 0.075, shaftLength, 16);
          shaftGeo.rotateX(Math.PI / 2);
          const shaft = new THREE.Mesh(shaftGeo, mirrorChromeMat);
          camGroup.add(shaft);

          const bankCyls = cylinders.filter((c) => (dir === -1 ? c.bankIndex === 0 : c.bankIndex === 1));
          bankCyls.forEach((c) => {
            [-0.14, 0.14].forEach((offsetZ) => {
              const lobeBaseGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.11, 16);
              lobeBaseGeo.rotateX(Math.PI / 2);
              const lobeBase = new THREE.Mesh(lobeBaseGeo, camshaftMat);
              lobeBase.position.z = c.z + offsetZ;
              camGroup.add(lobeBase);
            });
          });

          valvetrainGroup.add(camGroup);
          camshafts.push(camGroup);
        });
      });
    }

    // Válvulas y resortes para cada cilindro
    cylinders.forEach((c) => {
      const alpha = c.bankAngle;
      const baseDist = 1.9;
      const baseX = baseDist * Math.sin(alpha);
      const baseY = -1.1 + baseDist * Math.cos(alpha);

      // Admisión (lado interior / -X relativo a bancada)
      [-0.15, 0.15].forEach((vz) => {
        const vStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.72, 12), intakeValveMat);
        const vHead = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.08, 16), intakeValveMat);
        vHead.rotateX(Math.PI);
        vHead.position.y = -0.36;
        vStem.add(vHead);

        const spring = new THREE.Mesh(springGeo, springMat);
        spring.position.y = -0.16;
        vStem.add(spring);
        intakeSprings.push(spring);

        const retainer = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.065, 0.035, 16), mirrorChromeMat);
        retainer.position.y = 0.12;
        vStem.add(retainer);

        const lateral = -0.42;
        vStem.position.set(baseX + lateral * Math.cos(alpha), baseY - lateral * Math.sin(alpha), c.z + vz);
        vStem.rotation.z = -alpha + Math.PI / 14;

        valvetrainGroup.add(vStem);
        intakeValves.push(vStem);
      });

      // Escape (lado exterior / +X relativo a bancada)
      [-0.15, 0.15].forEach((vz) => {
        const vStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.72, 12), exhaustValveMat);
        const vHead = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.08, 16), exhaustValveMat);
        vHead.rotateX(Math.PI);
        vHead.position.y = -0.36;
        vStem.add(vHead);

        const spring = new THREE.Mesh(springGeo, springMat);
        spring.position.y = -0.16;
        vStem.add(spring);
        exhaustSprings.push(spring);

        const retainer = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.065, 0.035, 16), mirrorChromeMat);
        retainer.position.y = 0.12;
        vStem.add(retainer);

        const lateral = 0.42;
        vStem.position.set(baseX + lateral * Math.cos(alpha), baseY - lateral * Math.sin(alpha), c.z + vz);
        vStem.rotation.z = -alpha - Math.PI / 14;

        valvetrainGroup.add(vStem);
        exhaustValves.push(vStem);
      });
    });

    subsystems.push({
      id: 'valvetrain',
      name: `${camshafts.length} Árboles de Levas & ${archSpecs.valvesCount} Válvulas con Resortes`,
      category: 'distribucion',
      partId: 'camshaft',
      group: valvetrainGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(0, 2.5, 0)
    });
    scene.add(valvetrainGroup);

    // ==========================================
    // 3. CULATA DE CILINDROS & BUJÍAS CON CHISPA
    // ==========================================
    const headGroup = new THREE.Group();
    const sparkLights: THREE.PointLight[] = [];
    const combustionFlames: THREE.Mesh[] = [];
    const intakeMists: THREE.Mesh[] = [];
    const exhaustGlows: THREE.Mesh[] = [];
    const sparkArcs: THREE.Mesh[] = [];

    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    if (!isV) {
      // Bloque de culata único en línea
      const headBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.65, lengthZ + 0.1), intakeManifoldMat);
      headBase.position.set(0, 1.15, 0);
      headGroup.add(headBase);
    } else {
      // Culatas independientes en V situadas encima de la carrera del pistón
      [-1, 1].forEach((dir) => {
        const ang = dir * bankAngle;
        const dist = 2.05;
        const headBox = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, lengthZ + 0.1), intakeManifoldMat);
        headBox.position.set(dist * Math.sin(ang), -1.1 + dist * Math.cos(ang), 0);
        headBox.rotation.z = -ang;
        headGroup.add(headBox);
      });
    }

    // Cámaras hemisféricas, bujías cerámicas y chispas
    cylinders.forEach((c) => {
      const alpha = c.bankAngle;
      const headDist = isV ? 2.1 : 1.95;
      const chX = headDist * Math.sin(alpha);
      const chY = -1.1 + headDist * Math.cos(alpha);

      // Cámara hemisférica
      const chamberGeo = new THREE.SphereGeometry(0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      chamberGeo.rotateX(Math.PI);
      const chamber = new THREE.Mesh(chamberGeo, linerMat);
      chamber.position.set(chX, chY - 0.25 * Math.cos(alpha), c.z);
      chamber.rotation.z = -alpha;
      headGroup.add(chamber);

      // Bujía completa Animagraffs Style
      const sparkPlugGroup = new THREE.Group();
      sparkPlugGroup.position.set(chX, chY, c.z);
      sparkPlugGroup.rotation.z = -alpha;

      const threadMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.14, 16), new THREE.MeshStandardMaterial({ color: 0x363a42, metalness: 0.85, roughness: 0.3 }));
      threadMesh.position.y = -0.15;
      sparkPlugGroup.add(threadMesh);

      const hexMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.088, 0.1, 6), mirrorChromeMat);
      hexMesh.position.y = -0.04;
      sparkPlugGroup.add(hexMesh);

      const insulatorMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.26, 16), ceramicMat);
      insulatorMesh.position.y = 0.14;
      sparkPlugGroup.add(insulatorMesh);

      [-0.04, 0.01, 0.06].forEach((ny) => {
        const ribGeo = new THREE.TorusGeometry(0.072, 0.012, 8, 16);
        ribGeo.rotateX(Math.PI / 2);
        const ribMesh = new THREE.Mesh(ribGeo, ceramicMat);
        ribMesh.position.y = 0.14 + ny;
        sparkPlugGroup.add(ribMesh);
      });

      const terminalMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.2 }));
      terminalMesh.position.y = 0.3;
      sparkPlugGroup.add(terminalMesh);

      const electrodeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.07, 0.03), mirrorChromeMat);
      electrodeMesh.position.set(0.035, -0.25, 0);
      sparkPlugGroup.add(electrodeMesh);

      const sparkArc = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: 0x67e8f9 }));
      sparkArc.position.set(0.015, -0.25, 0);
      sparkArc.visible = false;
      sparkPlugGroup.add(sparkArc);
      sparkArcs.push(sparkArc);

      headGroup.add(sparkPlugGroup);

      // Vapor frío de mezcla aire-combustible (Admisión)
      const mistGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.8, 16, 1, true);
      const mistMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const mist = new THREE.Mesh(mistGeo, mistMat);
      mist.position.set(chX, chY - 0.45 * Math.cos(alpha), c.z);
      mist.rotation.z = -alpha;
      headGroup.add(mist);
      intakeMists.push(mist);

      // Resplandor térmico de escape
      const exGlow = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      }));
      exGlow.position.set(chX + 0.2 * Math.cos(alpha), chY - 0.35 * Math.cos(alpha), c.z);
      headGroup.add(exGlow);
      exhaustGlows.push(exGlow);

      // Luz de explosión
      const light = new THREE.PointLight(0xff7700, 0, 3.2, 2.5);
      light.position.set(chX, chY - 0.28 * Math.cos(alpha), c.z);
      headGroup.add(light);
      sparkLights.push(light);

      // Llama volumétrica
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), flameMat.clone());
      flame.position.set(chX, chY - 0.32 * Math.cos(alpha), c.z);
      headGroup.add(flame);
      combustionFlames.push(flame);
    });

    subsystems.push({
      id: 'cylinder_head',
      name: isV ? 'Culatas Mecanizadas Doble Bancada & Bujías' : 'Culata con Cámaras Hemisféricas & Bujías',
      category: 'bloque',
      partId: 'cylinder_head',
      group: headGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(0, 1.4, 0)
    });
    scene.add(headGroup);

    // ==========================================
    // 4. MÚLTIPLE DE ADMISIÓN & INYECTORES
    // ==========================================
    const intakeGroup = new THREE.Group();

    if (!isV) {
      // Admisión lateral en línea
      const plenumGeo = new THREE.CylinderGeometry(0.38, 0.38, lengthZ, 24);
      plenumGeo.rotateX(Math.PI / 2);
      const plenum = new THREE.Mesh(plenumGeo, intakeManifoldMat);
      plenum.position.set(-1.85, 1.1, 0);
      intakeGroup.add(plenum);

      const tbGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 20);
      tbGeo.rotateZ(Math.PI / 2);
      const tb = new THREE.Mesh(tbGeo, mirrorChromeMat);
      tb.position.set(-1.85, 1.1, lengthZ / 2 + 0.25);
      intakeGroup.add(tb);

      cylinders.forEach((c) => {
        const runnerCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1.05, 1.1, c.z),
          new THREE.Vector3(-1.45, 1.25, c.z * 0.95),
          new THREE.Vector3(-1.85, 1.1, c.z * 0.9)
        ]);
        const runner = new THREE.Mesh(new THREE.TubeGeometry(runnerCurve, 16, 0.13, 16, false), intakeManifoldMat);
        intakeGroup.add(runner);

        const inj = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.28, 12), new THREE.MeshStandardMaterial({ color: 0x1E4D78, metalness: 0.8, roughness: 0.2 }));
        inj.rotateZ(-Math.PI / 4);
        inj.position.set(-1.25, 1.22, c.z);
        intakeGroup.add(inj);
      });

      subsystems.push({
        id: 'intake_manifold',
        name: 'Múltiple de Admisión & Inyectores',
        category: 'alimentacion',
        partId: 'fuel_injectors',
        group: intakeGroup,
        basePos: new THREE.Vector3(0, 0, 0),
        explodeOffset: new THREE.Vector3(-2.6, 0.1, 0)
      });
    } else {
      // Admisión central en la V (Valley Intake)
      const plenumGeo = new THREE.BoxGeometry(0.9, 0.45, lengthZ);
      const plenum = new THREE.Mesh(plenumGeo, intakeManifoldMat);
      plenum.position.set(0, 1.35, 0);
      intakeGroup.add(plenum);

      const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.45, 20), mirrorChromeMat);
      tb.position.set(0, 1.6, lengthZ / 2 + 0.2);
      intakeGroup.add(tb);

      cylinders.forEach((c) => {
        const dir = c.bankIndex === 0 ? -1 : 1;
        const runnerCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.35, c.z),
          new THREE.Vector3(dir * 0.4, 1.25, c.z),
          new THREE.Vector3(dir * 0.8, 1.05, c.z)
        ]);
        const runner = new THREE.Mesh(new THREE.TubeGeometry(runnerCurve, 14, 0.12, 14, false), intakeManifoldMat);
        intakeGroup.add(runner);
      });

      subsystems.push({
        id: 'intake_manifold',
        name: 'Admisión Central en la V & Inyección Directa',
        category: 'alimentacion',
        partId: 'fuel_injectors',
        group: intakeGroup,
        basePos: new THREE.Vector3(0, 0, 0),
        explodeOffset: new THREE.Vector3(0, 2.6, 0)
      });
    }
    scene.add(intakeGroup);

    // ==========================================
    // 5. MÚLTIPLE DE ESCAPE & TURBOCOMPRESOR
    // ==========================================
    const exhaustGroup = new THREE.Group();

    if (!isV) {
      const turboCenter = new THREE.Vector3(1.85, 0.65, 0);

      cylinders.forEach((c) => {
        const exCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(1.05, 1.05, c.z),
          new THREE.Vector3(1.45, 0.9, c.z * 0.7),
          new THREE.Vector3(1.75, 0.72, c.z * 0.25),
          turboCenter
        ]);
        const exPipe = new THREE.Mesh(new THREE.TubeGeometry(exCurve, 20, 0.12, 16, false), exhaustManifoldMat);
        exhaustGroup.add(exPipe);
      });

      const turboHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.45, 24), new THREE.MeshStandardMaterial({ color: 0x36393e, metalness: 0.8, roughness: 0.35 }));
      turboHousing.rotateZ(Math.PI / 2);
      turboHousing.position.copy(turboCenter);
      exhaustGroup.add(turboHousing);

      const compHousing = new THREE.Mesh(new THREE.ConeGeometry(0.44, 0.45, 24), intakeManifoldMat);
      compHousing.rotateZ(-Math.PI / 2);
      compHousing.position.set(2.2, 0.65, 0);
      exhaustGroup.add(compHousing);

      const downpipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.85, 0.55, 0.2),
        new THREE.Vector3(2.0, 0.0, 0.6),
        new THREE.Vector3(1.8, -0.8, 1.0),
        new THREE.Vector3(1.6, -1.8, 1.2)
      ]);
      const downpipe = new THREE.Mesh(new THREE.TubeGeometry(downpipeCurve, 20, 0.18, 16, false), exhaustManifoldMat);
      exhaustGroup.add(downpipe);

      subsystems.push({
        id: 'exhaust_and_turbo',
        name: 'Colector de Escape Tubular & Turbocompresor',
        category: 'sobrealimentacion',
        partId: 'turbocharger',
        group: exhaustGroup,
        basePos: new THREE.Vector3(0, 0, 0),
        explodeOffset: new THREE.Vector3(2.6, 0.1, 0)
      });
      scene.add(exhaustGroup);
    } else {
      // Motor en V: Dos colectores de escape simétricos en los flancos exteriores
      const exhaustLeftGroup = new THREE.Group();
      const exhaustRightGroup = new THREE.Group();

      [-1, 1].forEach((dir) => {
        const sideGroup = dir === -1 ? exhaustLeftGroup : exhaustRightGroup;
        const sideX = dir * 2.1;
        const bankCyls = cylinders.filter((c) => (dir === -1 ? c.bankIndex === 0 : c.bankIndex === 1));
        const collectorCenter = new THREE.Vector3(sideX, 0.2, 0);

        bankCyls.forEach((c) => {
          const startX = dir * 1.25;
          const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(startX, 0.75, c.z),
            new THREE.Vector3(dir * 1.65, 0.5, c.z * 0.7),
            collectorCenter
          ]);
          const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.11, 14, false), exhaustManifoldMat);
          pipe.castShadow = true;
          sideGroup.add(pipe);
        });

        // Turbocompresor por flanco
        const sideTurbo = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.4, 20), new THREE.MeshStandardMaterial({ color: 0x36393e, metalness: 0.8, roughness: 0.35 }));
        sideTurbo.rotateZ(Math.PI / 2);
        sideTurbo.position.copy(collectorCenter);
        sideTurbo.castShadow = true;
        sideGroup.add(sideTurbo);

        // Tubo de escape descendente
        const dpCurve = new THREE.CatmullRomCurve3([
          collectorCenter,
          new THREE.Vector3(sideX, -0.4, -0.6),
          new THREE.Vector3(dir * 1.5, -1.2, -1.4)
        ]);
        const dpMesh = new THREE.Mesh(new THREE.TubeGeometry(dpCurve, 16, 0.14, 14, false), exhaustManifoldMat);
        sideGroup.add(dpMesh);
      });

      subsystems.push({
        id: 'exhaust_left',
        name: 'Colector de Escape & Turbo Bancada Izquierda',
        category: 'sobrealimentacion',
        partId: 'turbocharger',
        group: exhaustLeftGroup,
        basePos: new THREE.Vector3(0, 0, 0),
        explodeOffset: new THREE.Vector3(-2.6, 0.1, 0)
      });

      subsystems.push({
        id: 'exhaust_right',
        name: 'Colector de Escape & Turbo Bancada Derecha',
        category: 'sobrealimentacion',
        partId: 'turbocharger',
        group: exhaustRightGroup,
        basePos: new THREE.Vector3(0, 0, 0),
        explodeOffset: new THREE.Vector3(2.6, 0.1, 0)
      });

      scene.add(exhaustLeftGroup);
      scene.add(exhaustRightGroup);
    }

    // ==========================================
    // 6. BLOQUE DE MOTOR & CAMISAS CON CORTE VISIBLE
    // ==========================================
    const blockGroup = new THREE.Group();

    cylinders.forEach((c) => {
      const alpha = c.bankAngle;
      const linerDist = 0.9;
      const lx = linerDist * Math.sin(alpha);
      const ly = -1.1 + linerDist * Math.cos(alpha);

      // En motores en V, la bancada derecha mira hacia +X en coords locales, la izquierda hacia -X.
      // Orientamos las ventanas de corte para que ambas queden mirando hacia afuera y los pistones sean 100% visibles:
      const cutawayThetaStart = (isV && c.bankIndex === 1) ? Math.PI : 0;
      const linerThetaStart = (isV && c.bankIndex === 1) ? 0 : Math.PI;

      const halfLiner = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 1.85, 48, 1, false, linerThetaStart, Math.PI),
        linerMat
      );
      halfLiner.position.set(lx, ly, c.z);
      halfLiner.rotation.z = -alpha;
      halfLiner.castShadow = true;
      blockGroup.add(halfLiner);

      const frontCutaway = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 1.85, 48, 1, true, cutawayThetaStart, Math.PI),
        cutawayGlassMat
      );
      frontCutaway.position.set(lx, ly, c.z);
      frontCutaway.rotation.z = -alpha;
      blockGroup.add(frontCutaway);
      cutawayMeshes.push(frontCutaway);

      const outerHalf = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 1.85, 48, 1, false, linerThetaStart, Math.PI),
        blockCastingMat
      );
      outerHalf.position.set(lx, ly, c.z);
      outerHalf.rotation.z = -alpha;
      outerHalf.castShadow = true;
      blockGroup.add(outerHalf);
    });

    if (!isV) {
      const rearBlockWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.85, lengthZ), blockCastingMat);
      rearBlockWall.position.set(-0.6, -0.2, 0);
      blockGroup.add(rearBlockWall);

      const frontBlockWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.85, lengthZ), blockCastingMat);
      frontBlockWall.position.set(0.6, -0.2, 0);
      frontBlockWall.visible = false;
      blockGroup.add(frontBlockWall);
      cutawayMeshes.push(frontBlockWall);
    } else {
      // Bloque inferior para motor en V: Faldones laterales y bancada hueca (Crankcase skirt)
      // Permite ver el cigüeñal y bielas en rotación sin obstruir la V central
      [-1, 1].forEach((dir) => {
        const sideSkirt = new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.85, lengthZ + 0.1),
          blockCastingMat
        );
        sideSkirt.position.set(dir * 1.2, -1.1, 0);
        sideSkirt.castShadow = true;
        blockGroup.add(sideSkirt);
      });

      // Tapas frontal y trasera de bancada
      [-1, 1].forEach((dir) => {
        const endWall = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.85, 0.18),
          blockCastingMat
        );
        endWall.position.set(0, -1.1, (dir * (lengthZ + 0.1)) / 2);
        endWall.castShadow = true;
        blockGroup.add(endWall);
      });
    }

    const filter = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.6, 20), new THREE.MeshStandardMaterial({ color: 0x1E4D78, metalness: 0.6, roughness: 0.2 }));
    filter.rotateZ(Math.PI / 2);
    filter.position.set(-0.95, -0.4, lengthZ * 0.15);
    blockGroup.add(filter);

    subsystems.push({
      id: 'engine_block',
      name: isV ? 'Bloque Motor en V (Crankcase Reforzado)' : 'Bloque de Cilindros (Crankcase en Corte)',
      category: 'bloque',
      partId: 'block',
      group: blockGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(0, 0, 0)
    });
    scene.add(blockGroup);

    // ==========================================
    // 7. PISTONES FORJADOS & BIELAS H-BEAM
    // ==========================================
    const pistonsGroup = new THREE.Group();
    const pistons: THREE.Group[] = [];
    const rods: THREE.Group[] = [];

    const crankRadius = 0.42;
    const rodLength = 1.35;

    const pistonMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e0ea,
      metalness: 0.96,
      roughness: 0.10,
      map: createMachinedPistonTexture(),
      clearcoat: 0.25,
      clearcoatRoughness: 0.2,
      envMap: envMap ?? undefined,
      envMapIntensity: 1.4
    });

    // Shared ring materials (reuse across all cylinders for performance)
    const compressionRing1Mat = new THREE.MeshPhysicalMaterial({ color: 0x1e2024, metalness: 0.94, roughness: 0.12, envMap: envMap ?? undefined, envMapIntensity: 1.2 });
    const compressionRing2Mat = new THREE.MeshPhysicalMaterial({ color: 0x4a5060, metalness: 0.90, roughness: 0.18, envMap: envMap ?? undefined, envMapIntensity: 1.0 });
    const oilRingMat = new THREE.MeshPhysicalMaterial({ color: 0x8a6d48, metalness: 0.85, roughness: 0.22, envMap: envMap ?? undefined, envMapIntensity: 0.8 });
    const bushingMat = new THREE.MeshPhysicalMaterial({ color: 0xcd7f32, metalness: 0.88, roughness: 0.15, clearcoat: 0.3, clearcoatRoughness: 0.1, envMap: envMap ?? undefined, envMapIntensity: 1.0 });

    cylinders.forEach((c) => {
      const singlePistonGroup = new THREE.Group();
      singlePistonGroup.position.z = c.z;

      // Piston crown (flat-top forged with beveled edge)
      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.455, 0.45, 48), pistonMat);
      piston.castShadow = true;
      singlePistonGroup.add(piston);

      // Inner barrel (visible below piston crown)
      const pistonInner = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.30, 48, 1, true),
        new THREE.MeshStandardMaterial({ color: 0xa8b0bc, metalness: 0.90, roughness: 0.20, side: THREE.BackSide })
      );
      pistonInner.position.y = -0.22;
      singlePistonGroup.add(pistonInner);

      // 3 Compression/Oil rings with higher poly count
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.464, 0.016, 12, 48).rotateX(Math.PI / 2), compressionRing1Mat);
      ring1.position.y = 0.18;
      ring1.castShadow = true;
      singlePistonGroup.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.463, 0.014, 12, 48).rotateX(Math.PI / 2), compressionRing2Mat);
      ring2.position.y = 0.12;
      ring2.castShadow = true;
      singlePistonGroup.add(ring2);

      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.463, 0.013, 12, 48).rotateX(Math.PI / 2), oilRingMat);
      ring3.position.y = 0.06;
      ring3.castShadow = true;
      singlePistonGroup.add(ring3);

      // Wrist pin (gudgeon pin) with higher detail
      const pinMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.65, 24).rotateX(Math.PI / 2), mirrorChromeMat);
      pinMesh.position.y = -0.12;
      pinMesh.castShadow = true;
      singlePistonGroup.add(pinMesh);

      // Pin bore (dark hole)
      const pinHole = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.66, 24).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x030406 }));
      pinHole.position.y = -0.12;
      singlePistonGroup.add(pinHole);

      // Pin retainer clips (C-clips visible on ends)
      [-0.31, 0.31].forEach((clipZ) => {
        const clip = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.008, 6, 24).rotateX(Math.PI / 2), mirrorChromeMat);
        clip.position.set(0, -0.12, clipZ);
        clip.rotation.x = Math.PI / 2;
        singlePistonGroup.add(clip);
      });

      // Biela forjada H-Beam (connecting rod)
      const rodGroup = new THREE.Group();
      rodGroup.position.z = c.z;

      // I-beam profile rod stem
      const rodStem = new THREE.Mesh(new THREE.BoxGeometry(0.13, rodLength, 0.08), rodSteelMat);
      rodStem.position.y = -rodLength / 2;
      rodStem.castShadow = true;
      rodGroup.add(rodStem);

      // H-beam flanges
      const flangeFront = new THREE.Mesh(new THREE.BoxGeometry(0.17, rodLength * 0.82, 0.02), rodSteelMat);
      flangeFront.position.set(0, -rodLength / 2, 0.04);
      flangeFront.castShadow = true;
      rodGroup.add(flangeFront);

      const flangeBack = new THREE.Mesh(new THREE.BoxGeometry(0.17, rodLength * 0.82, 0.02), rodSteelMat);
      flangeBack.position.set(0, -rodLength / 2, -0.04);
      flangeBack.castShadow = true;
      rodGroup.add(flangeBack);

      // Small end (piston pin bore)
      const topEye = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.14, 24).rotateX(Math.PI / 2), rodSteelMat);
      topEye.castShadow = true;
      rodGroup.add(topEye);

      // Bronze bushing (small end)
      const topBushing = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.142, 24).rotateX(Math.PI / 2), bushingMat);
      rodGroup.add(topBushing);

      // Big end (crankshaft journal)
      const botEye = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.18, 32).rotateX(Math.PI / 2), rodSteelMat);
      botEye.position.y = -rodLength;
      botEye.castShadow = true;
      rodGroup.add(botEye);

      // Rod cap bolts (ARP-style hex head)
      [-0.14, 0.14].forEach((boltX) => {
        const rodBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.28, 8), mirrorChromeMat);
        rodBolt.position.set(boltX, -rodLength - 0.1, 0);
        rodBolt.castShadow = true;
        rodGroup.add(rodBolt);

        // Bolt head (hex)
        const boltHead = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 6), mirrorChromeMat);
        boltHead.position.set(boltX, -rodLength - 0.24, 0);
        rodGroup.add(boltHead);
      });

      pistonsGroup.add(singlePistonGroup);
      pistonsGroup.add(rodGroup);

      pistons.push(singlePistonGroup);
      rods.push(rodGroup);
    });

    subsystems.push({
      id: 'pistons_rods',
      name: `${cylinders.length} Pistones Forjados & Bielas H-Beam`,
      category: 'bloque',
      partId: 'pistons',
      group: pistonsGroup,
      basePos: new THREE.Vector3(0, 0, 0),
      explodeOffset: new THREE.Vector3(0, 0.7, 0)
    });
    scene.add(pistonsGroup);

    // ==========================================
    // 8. CIGÜEÑAL FORJADO & CÁRTER
    // ==========================================
    const crankGroup = new THREE.Group();
    crankGroup.position.y = -1.1;

    const mainShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, shaftLength + 0.4, 36).rotateX(Math.PI / 2), mirrorChromeMat);
    mainShaft.castShadow = true;
    crankGroup.add(mainShaft);

    // Main bearing journals (between each throw)
    const numJournals = cylinders.length + 1;
    const journalSpacing = shaftLength / numJournals;
    for (let j = 0; j < numJournals; j++) {
      const journalZ = -shaftLength / 2 + journalSpacing * (j + 0.5);
      const journal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, journalSpacing * 0.35, 28).rotateX(Math.PI / 2),
        crankshaftMat
      );
      journal.position.z = journalZ;
      journal.castShadow = true;
      crankGroup.add(journal);
    }

    // Contrapesos en cuña para cada muñón (higher detail)
    cylinders.forEach((c) => {
      const angle = c.phaseOffset + Math.PI;
      const weightShape = new THREE.Shape();
      weightShape.absarc(0, 0, 0.68, angle - Math.PI / 3, angle + Math.PI / 3, false);
      weightShape.lineTo(0, 0);
      weightShape.closePath();

      const weightGeo = new THREE.ExtrudeGeometry(weightShape, { depth: 0.22, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3 });
      weightGeo.center();
      const weightMesh = new THREE.Mesh(weightGeo, crankshaftMat);
      weightMesh.position.z = c.z;
      weightMesh.castShadow = true;
      crankGroup.add(weightMesh);

      // Crank pin (rod journal) at each throw
      const crankPinY = crankRadius * Math.cos(c.phaseOffset);
      const crankPinX = crankRadius * Math.sin(c.phaseOffset);
      const crankPin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.20, 20).rotateX(Math.PI / 2),
        mirrorChromeMat
      );
      crankPin.position.set(crankPinX, crankPinY, c.z);
      crankGroup.add(crankPin);
    });

    // Volante de inercia bimasa (Dual-Mass Flywheel) mecanizado de competición
    const flywheelGroup = new THREE.Group();
    flywheelGroup.position.z = -(shaftLength / 2 + 0.15);

    // Disco principal del volante de acero forjado
    const flywheelBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.28, 1.28, 0.18, 64).rotateX(Math.PI / 2),
      crankshaftMat
    );
    flywheelBody.castShadow = true;
    flywheelGroup.add(flywheelBody);

    // Pista de fricción rectificada plana (sin torus abultados)
    const frictionFace = new THREE.Mesh(
      new THREE.CylinderGeometry(1.16, 1.16, 0.015, 64).rotateX(Math.PI / 2),
      new THREE.MeshPhysicalMaterial({
        color: 0xc8d0dc,
        metalness: 0.94,
        roughness: 0.14,
        bumpMap: brushedAluMap,
        bumpScale: 0.012,
        clearcoat: 0.25,
        clearcoatRoughness: 0.1,
        envMap: envMap ?? undefined,
        envMapIntensity: 1.2
      })
    );
    frictionFace.position.z = -0.095;
    flywheelGroup.add(frictionFace);

    // Rebaje central mecanizado
    const centerRecess = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.52, 0.02, 36).rotateX(Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.85, roughness: 0.4 })
    );
    centerRecess.position.z = -0.098;
    flywheelGroup.add(centerRecess);

    // Orificio guía del cigüeñal (pilot bearing bore)
    const pilotHole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x050608 })
    );
    pilotHole.position.z = -0.10;
    flywheelGroup.add(pilotHole);

    // Corona dentada de arranque (Starter Ring Gear cilíndrico en el perímetro exterior)
    const ringGear = new THREE.Mesh(
      new THREE.CylinderGeometry(1.31, 1.31, 0.12, 72).rotateX(Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x22262c, metalness: 0.92, roughness: 0.25 })
    );
    flywheelGroup.add(ringGear);

    // Tornillos de fijación al cigüeñal (6 pernos ARP cromados)
    for (let b = 0; b < 6; b++) {
      const bAng = (b * Math.PI) / 3;
      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.03, 6).rotateX(Math.PI / 2),
        mirrorChromeMat
      );
      bolt.position.set(0.32 * Math.cos(bAng), 0.32 * Math.sin(bAng), -0.105);
      flywheelGroup.add(bolt);
    }

    crankGroup.add(flywheelGroup);

    // Polea dentada frontal (detailed timing pulley with spokes)
    const timingPulley = new THREE.Group();
    timingPulley.position.z = shaftLength / 2 + 0.15;

    const pulleyOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.18, 36).rotateX(Math.PI / 2), crankshaftMat);
    pulleyOuter.castShadow = true;
    timingPulley.add(pulleyOuter);

    // Pulley V-grooves (serpentine belt)
    [0.04, -0.04].forEach((offset) => {
      const groove = new THREE.Mesh(
        new THREE.TorusGeometry(0.50, 0.015, 8, 36).rotateX(Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0x18191c, metalness: 0.5, roughness: 0.6 })
      );
      groove.position.z = offset;
      timingPulley.add(groove);
    });

    // Hub
    const pulleyHub = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.22, 20).rotateX(Math.PI / 2), mirrorChromeMat);
    timingPulley.add(pulleyHub);

    crankGroup.add(timingPulley);

    // Cárter de aceite (estático, atornillado al bloque — NO rota con el cigüeñal)
    const oilPanGroup = new THREE.Group();
    oilPanGroup.position.set(0, -2.25, 0);

    const oilPan = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.55, lengthZ), oilPanMat);
    oilPan.position.set(0, 0, 0);
    oilPan.castShadow = true;
    oilPanGroup.add(oilPan);

    // Tapón de drenaje de aceite
    const drainPlug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.08, 6),
      mirrorChromeMat
    );
    drainPlug.position.set(0.3, -0.27, lengthZ * 0.2);
    oilPanGroup.add(drainPlug);

    // Pernos perimetrales del cárter
    const boltPositions: [number, number][] = [];
    for (let bz = -lengthZ / 2 + 0.15; bz < lengthZ / 2; bz += 0.35) {
      boltPositions.push([0.74, bz]);
      boltPositions.push([-0.74, bz]);
    }
    boltPositions.forEach(([bx, bz]) => {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 6), mirrorChromeMat);
      bolt.position.set(bx, 0.27, bz);
      oilPanGroup.add(bolt);
    });

    subsystems.push({
      id: 'oil_pan',
      name: 'Cárter de Aceite (Stamped Steel)',
      category: 'bloque',
      partId: 'oilpan',
      group: oilPanGroup,
      basePos: new THREE.Vector3(0, -2.25, 0),
      explodeOffset: new THREE.Vector3(0, 0, 0)
    });
    scene.add(oilPanGroup);

    subsystems.push({
      id: 'crankshaft',
      name: `Cigüeñal Forjado con Contrapesos & Volante Bimasa`,
      category: 'bloque',
      partId: 'crankshaft',
      group: crankGroup,
      basePos: new THREE.Vector3(0, -1.1, 0),
      explodeOffset: new THREE.Vector3(0, 0, 0)
    });
    scene.add(crankGroup);

    subsystemsRef.current = subsystems;

    movingPartsRef.current = {
      crankshaft: crankGroup,
      pistons,
      rods,
      camshafts,
      intakeValves,
      exhaustValves,
      intakeSprings,
      exhaustSprings,
      combustionFlames,
      intakeMists,
      exhaustGlows,
      sparkLights,
      sparkArcs,
      timingPulley,
      flywheel: flywheelGroup,
      cutawayMeshes
    };

    // ==========================================
    // EVENTOS DE MOUSE & ÓRBITA 3D
    // ==========================================
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const spherical = cameraSphericalRef.current;
      spherical.theta -= deltaX * 0.008;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 0.008));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      updateCameraPosition();
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const spherical = cameraSphericalRef.current;
      spherical.radius = Math.max(3.8, Math.min(16.0, spherical.radius + e.deltaY * 0.006));
      updateCameraPosition();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Raycaster para selección de piezas
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj !== scene) {
          const matched = subsystems.find((s) => s.group === obj);
          if (matched) {
            setSelectedPartId(matched.partId);
            return;
          }
          obj = obj.parent;
        }
      }
    };
    domElement.addEventListener('click', onClick);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // BUCLE DE CINEMÁTICA Y SIMULACIÓN 4 TIEMPOS UNIVERSAL
    // ==========================================
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isRunningRef.current && movingPartsRef.current) {
        const angularSpeed = (rpmRef.current * 2 * Math.PI) / 60;
        crankAngleRef.current += angularSpeed * delta;
        const theta = crankAngleRef.current;

        // Rotación del cigüeñal y volante
        movingPartsRef.current.crankshaft.rotation.z = theta;
        movingPartsRef.current.flywheel.rotation.z = theta;

        // Giro de árboles de levas (1:2 4 tiempos)
        movingPartsRef.current.camshafts.forEach((cam) => {
          cam.rotation.z = theta * 0.5;
        });

        // Giro de poleas
        movingPartsRef.current.timingPulley.rotation.z = theta * 0.5;

        // Cinemática de cada cilindro con ecuación universal biela-manivela
        cylinders.forEach((c, i) => {
          const phi = theta + c.phaseOffset;
          const alpha = c.bankAngle;
          const beta = phi - alpha;

          // Ecuación cinemática exacta: s = R*cos(beta) + sqrt(L^2 - R^2*sin^2(beta))
          const s = crankRadius * Math.cos(beta) + Math.sqrt(Math.max(0.01, rodLength * rodLength - crankRadius * crankRadius * Math.sin(beta) * Math.sin(beta)));

          const wristX = s * Math.sin(alpha);
          const wristY = -1.1 + s * Math.cos(alpha);
          const wristZ = c.z;

          const pinX = crankRadius * Math.sin(phi);
          const pinY = -1.1 + crankRadius * Math.cos(phi);

          const piston = movingPartsRef.current!.pistons[i];
          if (piston) {
            piston.position.set(wristX, wristY, wristZ);
            piston.rotation.z = -alpha;
          }

          const rod = movingPartsRef.current!.rods[i];
          if (rod) {
            const rodAngle = Math.atan2(wristX - pinX, wristY - pinY);
            rod.position.set(wristX, wristY, wristZ);
            rod.rotation.z = -rodAngle;
          }

          // Ciclo de 4 tiempos (0 a 4*PI = 720°)
          const cycleAngle = (phi % (4 * Math.PI) + 4 * Math.PI) % (4 * Math.PI);
          const isIntakeOpen = cycleAngle >= 2 * Math.PI && cycleAngle < 2.9 * Math.PI;
          const isExhaustOpen = cycleAngle >= Math.PI && cycleAngle < 1.9 * Math.PI;
          const isCombustion = cycleAngle >= 0 && cycleAngle < 0.45;

          const vIntakeOffset = isIntakeOpen ? 0.12 * Math.sin(((cycleAngle - 2 * Math.PI) / 0.9) * Math.PI) : 0;
          const vExhaustOffset = isExhaustOpen ? 0.12 * Math.sin(((cycleAngle - Math.PI) / 0.9) * Math.PI) : 0;

          // Válvulas y resortes de admisión
          for (let v = 0; v < 2; v++) {
            const ivIdx = i * 2 + v;
            const iv = movingPartsRef.current!.intakeValves[ivIdx];
            const ispr = movingPartsRef.current!.intakeSprings[ivIdx];
            if (iv) {
              const baseDist = 1.9;
              const lateral = -0.42;
              const baseDisp = baseDist - vIntakeOffset;
              iv.position.x = baseDisp * Math.sin(alpha) + lateral * Math.cos(alpha);
              iv.position.y = -1.1 + baseDisp * Math.cos(alpha) - lateral * Math.sin(alpha);
            }
            if (ispr) {
              ispr.scale.y = Math.max(0.68, 1.0 - (vIntakeOffset / 0.38));
            }

            const evIdx = i * 2 + v;
            const ev = movingPartsRef.current!.exhaustValves[evIdx];
            const espr = movingPartsRef.current!.exhaustSprings[evIdx];
            if (ev) {
              const baseDist = 1.9;
              const lateral = 0.42;
              const baseDisp = baseDist - vExhaustOffset;
              ev.position.x = baseDisp * Math.sin(alpha) + lateral * Math.cos(alpha);
              ev.position.y = -1.1 + baseDisp * Math.cos(alpha) - lateral * Math.sin(alpha);
            }
            if (espr) {
              espr.scale.y = Math.max(0.68, 1.0 - (vExhaustOffset / 0.38));
            }
          }

          // Dinámica de vapor frío de mezcla (halo azul)
          const mist = movingPartsRef.current!.intakeMists[i];
          if (mist) {
            (mist.material as THREE.MeshBasicMaterial).opacity = isIntakeOpen ? 0.52 * Math.sin(((cycleAngle - 2 * Math.PI) / 0.9) * Math.PI) : 0;
          }

          // Resplandor térmico de escape (halo rojo)
          const exGlow = movingPartsRef.current!.exhaustGlows[i];
          if (exGlow) {
            (exGlow.material as THREE.MeshBasicMaterial).opacity = isExhaustOpen ? 0.48 * Math.sin(((cycleAngle - Math.PI) / 0.9) * Math.PI) : 0;
          }

          // Arco eléctrico y combustión
          const sparkArc = movingPartsRef.current!.sparkArcs[i];
          const light = movingPartsRef.current!.sparkLights[i];
          const flame = movingPartsRef.current!.combustionFlames[i];

          if (sparkArc) sparkArc.visible = isCombustion;

          if (isCombustion) {
            if (light) light.intensity = 4.8;
            if (flame) {
              (flame.material as THREE.MeshBasicMaterial).opacity = 0.88;
              flame.scale.setScalar(1.0 + Math.sin(cycleAngle * 10) * 0.18);
            }
            if (i === 0) setCurrentStroke('Combustión / Potencia');
          } else {
            if (light) light.intensity = Math.max(0, light.intensity - delta * 15);
            if (flame) {
              const currentOp = (flame.material as THREE.MeshBasicMaterial).opacity;
              (flame.material as THREE.MeshBasicMaterial).opacity = Math.max(0, currentOp - delta * 6);
            }
            if (i === 0) {
              if (cycleAngle >= 0.45 && cycleAngle < Math.PI) setCurrentStroke('Expansión de Gases');
              else if (cycleAngle >= Math.PI && cycleAngle < 2 * Math.PI) setCurrentStroke('Escape');
              else if (cycleAngle >= 2 * Math.PI && cycleAngle < 3 * Math.PI) setCurrentStroke('Admisión');
              else setCurrentStroke('Compresión');
            }
          }

          if (i === 0) {
            const deg = Math.floor(((theta * 180) / Math.PI) % 720);
            setCrankAngleDeg((deg + 720) % 720);
          }
        });
      }

      // Interpolación suave y continua de despiece a 60 FPS
      const tExplode = explodeProgressRef.current;
      subsystemsRef.current.forEach((sub) => {
        const targetPos = new THREE.Vector3().copy(sub.basePos).addScaledVector(sub.explodeOffset, tExplode);
        sub.group.position.lerp(targetPos, 0.12);
      });

      renderer.render(scene, camera);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [selectedArch, updateCameraPosition]);

  // Sincronización del modo de corte (Cutaway View)
  useEffect(() => {
    if (movingPartsRef.current) {
      movingPartsRef.current.cutawayMeshes.forEach((mesh) => {
        mesh.visible = !isCutaway;
      });
    }
  }, [isCutaway]);

  const activePart = selectedPartId ? getPartById(selectedPartId) : null;
  const currentArchSpecs = getArchSpecs(selectedArch);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className={`${styles.viewportCard} ${isFullscreen ? styles.fullscreen : ''}`}>
      {/* Top Header Bar */}
      <div className={styles.headerBar}>
        <div className={styles.titleArea}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeWebGL}>MOTOR 3D FOTORREALISTA PBR</span>
            <span className={styles.badgeTech}>{currentArchSpecs.archName} — Cinemática Real 60 FPS</span>
            <span className={`${styles.strokeBadge} ${currentStroke.includes('Combustión') ? styles.fireStroke : ''}`}>
              Fase Cilindro #1: {currentStroke} — <span className={styles.telemetryDeg}>{crankAngleDeg}°</span>
            </span>
          </div>
          <h3 className={styles.engineTitle}>
            {engineName && selectedArch === normalize3DConfig(engineConfig) ? engineName : `${currentArchSpecs.archName} — Encendido: ${currentArchSpecs.firingOrder}`}
          </h3>
          <p className={styles.instructions}>
            Gira en 360°, haz zoom con la rueda y usa los controles para despiezar o acelerar el motor.
          </p>
        </div>

        <div className={styles.headerControls}>
          {onOpenMasterclass && (
            <button 
              className={styles.masterclassShortcutBtn}
              onClick={onOpenMasterclass}
              title="Abrir Masterclass y Video 4K de Animagraffs"
            >
              <IconMovie size={18} />
              <span>🎬 Video Masterclass 4K</span>
            </button>
          )}

          <button 
            className={`${styles.iconBtn} ${!isSoundMuted ? styles.soundActive : ''}`}
            onClick={toggleSound}
            title={isSoundMuted ? 'Activar Sonido del Motor' : 'Silenciar Audio'}
          >
            {isSoundMuted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
            <span>{isSoundMuted ? 'Sonido: Mute' : 'Sonido: ON'}</span>
          </button>

          <button 
            className={`${styles.iconBtn} ${isCutaway ? styles.activeControl : ''}`}
            onClick={toggleCutaway}
            title="Activar o desactivar corte de motor para ver el interior"
          >
            <IconLayersSubtract size={18} />
            <span>{isCutaway ? 'Corte: ACTIVO' : 'Corte: CERRADO'}</span>
          </button>

          <button 
            className={styles.iconBtn}
            onClick={toggleFullscreen}
            title="Pantalla Completa"
          >
            {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
          </button>
        </div>
      </div>

      {/* Architecture Quick-Selector Bar */}
      <div className={styles.archSelectorBar}>
        <span className={styles.archSelectorLabel}>
          <IconBinaryTree size={16} />
          <span>Configuración Mecánica 3D:</span>
        </span>
        <div className={styles.archButtonsList}>
          <button 
            className={`${styles.archPillBtn} ${selectedArch === 'Inline-4' ? styles.activeArchPillBtn : ''}`}
            onClick={() => handleSelectArch('Inline-4')}
          >
            4 en Línea (I4 16V)
          </button>
          <button 
            className={`${styles.archPillBtn} ${selectedArch === 'Inline-6' ? styles.activeArchPillBtn : ''}`}
            onClick={() => handleSelectArch('Inline-6')}
          >
            6 en Línea (I6 Torino / Falcon / Chevy)
          </button>
          <button 
            className={`${styles.archPillBtn} ${selectedArch === 'V8' ? styles.activeArchPillBtn : ''}`}
            onClick={() => handleSelectArch('V8')}
          >
            V8 American Muscle (Dodge GTX / Mustang)
          </button>
          <button 
            className={`${styles.archPillBtn} ${selectedArch === 'V6' ? styles.activeArchPillBtn : ''}`}
            onClick={() => handleSelectArch('V6')}
          >
            V6 Biturbo a 60° (Amarok TDI)
          </button>
          <button 
            className={`${styles.archPillBtn} ${selectedArch === 'Inline-3' ? styles.activeArchPillBtn : ''}`}
            onClick={() => handleSelectArch('Inline-3')}
          >
            3 Cilindros Turbo (Tracker 1.2T)
          </button>
        </div>
      </div>

      {/* Main Cockpit Layout: Left Fixed Dashboard Sidebar + Central 3D Canvas */}
      <div className={styles.cockpitLayout}>
        {/* Left Fixed Dashboard Sidebar */}
        <aside className={styles.dashboardSidebar}>
          {/* Panel 1: Simulation & RPM Controller */}
          <div className={styles.controlPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <IconGauge size={18} />
                <span>Tacómetro & Régimen (RPM)</span>
              </div>
              <span className={styles.rpmCounter}>
                <strong>{isRunning ? rpm.toLocaleString() : 0}</strong> RPM
              </span>
            </div>

            <div className={styles.sliderRow}>
              <input 
                type="range"
                min="0"
                max="8000"
                step="50"
                value={isRunning ? rpm : 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRpm(val);
                  if (val > 0 && !isRunning) setIsRunning(true);
                }}
                className={styles.rangeInput}
              />
            </div>

            <div className={styles.actionButtonGroup}>
              <button 
                className={`${styles.actionBtn} ${isRunning ? styles.pauseBtn : styles.playBtn}`}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                <span>{isRunning ? 'Pausar Motor' : 'Arrancar Motor'}</span>
              </button>

              <button 
                className={`${styles.actionBtn} ${styles.throttleBtn}`}
                onClick={handleRevThrottle}
              >
                <IconFlame size={16} />
                <span>¡Acelerar a Fondo!</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Exploded View / Armado y Desarmado */}
          <div className={styles.controlPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <IconTool size={18} />
                <span>Despiece / Armado Interactivo</span>
              </div>
              <span className={styles.explodeCounter}>
                <strong>{Math.round(explodeProgress * 100)}%</strong> Desarmado
              </span>
            </div>

            <div className={styles.sliderRow}>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodeProgress}
                onChange={(e) => setExplodeProgress(Number(e.target.value))}
                className={`${styles.rangeInput} ${styles.explodeRange}`}
              />
            </div>

            <div className={styles.actionButtonGroup}>
              <button 
                className={styles.actionBtn}
                onClick={() => setExplodeProgress(0)}
              >
                <IconRefresh size={16} />
                <span>Armar Todo (0%)</span>
              </button>

              <button 
                className={styles.actionBtn}
                onClick={() => setExplodeProgress(1)}
              >
                <IconSettings size={16} />
                <span>Vista Explosionada (100%)</span>
              </button>
            </div>
          </div>

          {/* Panel 3: Selected Component Detail Inspector */}
          <div className={`${styles.controlPanel} ${styles.inspectorPanel}`}>
            {activePart ? (
              <div className={styles.partCard}>
                <div className={styles.partHeader}>
                  <span className={styles.partCategory}>{activePart.category.toUpperCase()}</span>
                  <h4 className={styles.partTitle}>{activePart.spanishName}</h4>
                </div>
                <p className={styles.partFunction}>{activePart.function}</p>

                {onSelectPart && (
                  <button 
                    className={styles.glossaryLink}
                    onClick={() => onSelectPart(activePart)}
                  >
                    <span>Ver diagnóstico en glosario</span>
                    <IconArrowRight size={14} />
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.emptyPrompt}>
                <p>Haz clic en cualquier pieza 3D para inspeccionarla.</p>
              </div>
            )}
          </div>
        </aside>

        {/* Central / Right: 3D Stage Area */}
        <div className={styles.canvasStageArea}>
          {/* Main 3D Canvas Container */}
          <div className={styles.canvasWrapper} ref={mountRef} />

          {/* Camera View Presets Floating Over Canvas */}
          <div className={styles.viewPresetsOverlay}>
            <span className={styles.presetLabel}>Cámaras:</span>
            <button className={styles.presetBtn} onClick={() => setCameraPreset('iso')}>Isométrica</button>
            <button className={styles.presetBtn} onClick={() => setCameraPreset('front')}>Frente</button>
            <button className={styles.presetBtn} onClick={() => setCameraPreset('side')}>Lateral</button>
            <button className={styles.presetBtn} onClick={() => setCameraPreset('top')}>Superior</button>
          </div>
        </div>
      </div>
    </div>
  );
};
