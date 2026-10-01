import { ENGINES_DATA } from './engines';
import { ENGINE_PARTS } from './parts';
import { Engine, EnginePart, EngineConfig, Aspiration } from '../types/engine';

export function getAllEngines(): Engine[] {
  return ENGINES_DATA;
}

export function getEngineById(id: string): Engine | undefined {
  return ENGINES_DATA.find((e) => e.id === id);
}

export function getAllParts(): EnginePart[] {
  return ENGINE_PARTS;
}

export function getPartById(id: string): EnginePart | undefined {
  return ENGINE_PARTS.find((p) => p.id === id);
}

export function getPartsForEngine(engine: Engine): EnginePart[] {
  return ENGINE_PARTS.filter((part) => engine.partIds.includes(part.id));
}

export function getEnginesForPart(partId: string): Engine[] {
  return ENGINES_DATA.filter((engine) => engine.partIds.includes(partId));
}

export function getUniqueBrands(): string[] {
  const brands = Array.from(new Set(ENGINES_DATA.map((e) => e.brand))).sort();
  return brands;
}

export function getUniqueConfigs(): EngineConfig[] {
  const configs = Array.from(new Set(ENGINES_DATA.map((e) => e.config))).sort();
  return configs as EngineConfig[];
}

export function getUniqueAspirations(): Aspiration[] {
  const aspirations = Array.from(new Set(ENGINES_DATA.map((e) => e.aspiration))).sort();
  return aspirations as Aspiration[];
}
