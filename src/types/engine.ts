export type EngineConfig =
  | 'Inline-3'
  | 'Inline-4'
  | 'Inline-5'
  | 'Inline-6'
  | 'V6'
  | 'V8'
  | 'V10'
  | 'V12'
  | 'Boxer-4'
  | 'Boxer-6'
  | 'Rotary'
  | 'W16';

export type Aspiration =
  | 'Atmosférico'
  | 'Turbo'
  | 'Biturbo'
  | 'Supercargado'
  | 'Quad-Turbo';

export type FuelType = 'Gasolina' | 'Diésel' | 'Híbrido-Gasolina';

export type Valvetrain = 'DOHC' | 'SOHC' | 'OHV (Pushrod)' | 'Rotativo (Lumbreras)';

export type EnginePartCategory =
  | 'bloque'
  | 'distribucion'
  | 'admision_escape'
  | 'alimentacion'
  | 'refrigeracion'
  | 'lubricacion'
  | 'electrica'
  | 'sobrealimentacion';

export interface EnginePart {
  id: string;
  name: string;
  spanishName: string;
  category: EnginePartCategory;
  description: string;
  function: string;
  locationInEngine: string;
  commonFailures: string[];
  iconName: string;
}

export interface Hotspot {
  id: string;
  partId: string;
  name: string;
  x: number;
  y: number;
  description: string;
  highlightCategory?: EnginePartCategory;
}

export interface Engine {
  id: string;
  name: string;
  brand: string;
  years: string;
  displacementCc: number;
  displacementL: string;
  powerHp: number;
  torqueNm: number;
  rpmMax: number;
  config: EngineConfig;
  aspiration: Aspiration;
  valvetrain: Valvetrain;
  fuelType: FuelType;
  country: string;
  description: string;
  notableCars: string[];
  partIds: string[];
  soundSignature?: string;
  isApproximateData?: boolean;
  featuredImgUrl?: string;
}

export interface DiagramConfig {
  configType: EngineConfig;
  title: string;
  svgType: string;
  bgBlueprintUrl?: string;
  hotspots: Hotspot[];
}
