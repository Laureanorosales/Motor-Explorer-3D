import { describe, it, expect } from 'vitest';
import { 
  getEngineById, 
  getPartById, 
  getPartsForEngine, 
  getEnginesForPart,
  getUniqueBrands,
  getUniqueConfigs
} from '../data/helpers';
import { ENGINES_DATA } from '../data/engines';

describe('MotorExplorer - Data Helpers Tests', () => {
  it('getEngineById returns correct engine', () => {
    const engine = getEngineById('torino-tornado-230-380w');
    expect(engine).toBeDefined();
    expect(engine?.name).toContain('Torino Tornado');
    expect(engine?.country).toBe('Argentina');
  });

  it('getPartById returns correct part', () => {
    const part = getPartById('cylinder_head');
    expect(part).toBeDefined();
    expect(part?.spanishName).toBe('Culata / Tapa de Cilindros');
  });

  it('getPartsForEngine returns associated parts', () => {
    const engine = ENGINES_DATA[0];
    const parts = getPartsForEngine(engine);
    expect(parts.length).toBe(engine.partIds.length);
  });

  it('getEnginesForPart returns list of engines featuring the part', () => {
    const engines = getEnginesForPart('cylinder_head');
    expect(engines.length).toBeGreaterThan(0);
    expect(engines.some((e) => e.id === 'torino-tornado-230-380w')).toBe(true);
  });

  it('getUniqueBrands extracts unique Argentine brand list', () => {
    const brands = getUniqueBrands();
    expect(brands.some((b) => b.includes('Ford'))).toBe(true);
    expect(brands.some((b) => b.includes('Chevrolet'))).toBe(true);
    expect(brands.some((b) => b.includes('IKA'))).toBe(true);
  });

  it('getUniqueConfigs extracts unique configs', () => {
    const configs = getUniqueConfigs();
    expect(configs).toContain('Inline-6');
    expect(configs).toContain('Inline-4');
    expect(configs).toContain('V8');
  });
});
