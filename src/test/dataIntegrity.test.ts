import { describe, it, expect } from 'vitest';
import { ENGINES_DATA } from '../data/engines';
import { ENGINE_PARTS } from '../data/parts';
import { DIAGRAM_CONFIGS } from '../data/diagrams';

describe('MotorExplorer - Argentine Engines Data Integrity Tests', () => {
  it('should contain 28 engines (13 classic + 15 top best-sellers) in the catalog', () => {
    expect(ENGINES_DATA.length).toBe(28);
  });

  it('should have country "Argentina" for all engines', () => {
    ENGINES_DATA.forEach((engine) => {
      expect(engine.country).toBe('Argentina');
    });
  });

  it('should include top best-selling vehicle engines (Cronos 1.3, Hilux 2.8, Amarok V6, Ranger V6, 208 VTi)', () => {
    const names = ENGINES_DATA.map((e) => e.name);
    expect(names.some((n) => n.includes('Fiat FireFly 1.3L'))).toBe(true);
    expect(names.some((n) => n.includes('Toyota 2.8L 1GD-FTV'))).toBe(true);
    expect(names.some((n) => n.includes('Volkswagen 3.0L V6 TDI'))).toBe(true);
    expect(names.some((n) => n.includes('Ford 3.0L V6 EcoBlue'))).toBe(true);
    expect(names.some((n) => n.includes('Peugeot / Citroën 1.6L 16V VTi'))).toBe(true);
  });

  it('should have valid and unique IDs for all engines', () => {
    const ids = ENGINES_DATA.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should contain at least 20 engine parts in the glossary', () => {
    expect(ENGINE_PARTS.length).toBeGreaterThanOrEqual(20);
  });

  it('should have valid blueprint URLs for all diagram configurations', () => {
    Object.values(DIAGRAM_CONFIGS).forEach((diagram) => {
      expect(diagram.bgBlueprintUrl).toBeTruthy();
      expect(diagram.hotspots.length).toBeGreaterThan(0);
    });
  });
});
