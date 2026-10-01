import React, { useState, useMemo } from 'react';
import styles from './EngineCatalog.module.css';
import { Engine } from '../../types/engine';
import { getUniqueBrands, getUniqueConfigs, getUniqueAspirations } from '../../data/helpers';
import { 
  IconSearch, 
  IconCar, 
  IconAdjustmentsHorizontal,
  IconArrowRight
} from '@tabler/icons-react';

interface EngineCatalogProps {
  engines: Engine[];
  onSelectEngine: (engine: Engine) => void;
}

export const EngineCatalog: React.FC<EngineCatalogProps> = ({ engines, onSelectEngine }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedConfig, setSelectedConfig] = useState<string>('all');
  const [selectedAspiration, setSelectedAspiration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'power' | 'displacement' | 'name'>('power');

  const uniqueBrands = useMemo(() => getUniqueBrands(), []);
  const uniqueConfigs = useMemo(() => getUniqueConfigs(), []);
  const uniqueAspirations = useMemo(() => getUniqueAspirations(), []);

  // Filter & Sort Logic
  const filteredEngines = useMemo(() => {
    return engines
      .filter((engine) => {
        const matchesSearch =
          engine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          engine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          engine.config.toLowerCase().includes(searchTerm.toLowerCase()) ||
          engine.notableCars.some((car) => car.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesBrand = selectedBrand === 'all' || engine.brand === selectedBrand;
        const matchesConfig = selectedConfig === 'all' || engine.config === selectedConfig;
        const matchesAspiration = selectedAspiration === 'all' || engine.aspiration === selectedAspiration;

        return matchesSearch && matchesBrand && matchesConfig && matchesAspiration;
      })
      .sort((a, b) => {
        if (sortBy === 'power') return b.powerHp - a.powerHp;
        if (sortBy === 'displacement') return b.displacementCc - a.displacementCc;
        return a.name.localeCompare(b.name);
      });
  }, [engines, searchTerm, selectedBrand, selectedConfig, selectedAspiration, sortBy]);

  return (
    <div className={styles.container}>
      {/* Control Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <IconSearch size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por motor (2JZ, RB26, K20A), marca o modelo (Supra, M3, GT-R)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button className={styles.clearBtn} onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        <div className={styles.filterGroup}>
          {/* Brand Filter */}
          <div className={styles.selectWrapper}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">Todas las Marcas</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Config Filter */}
          <div className={styles.selectWrapper}>
            <select
              value={selectedConfig}
              onChange={(e) => setSelectedConfig(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">Todas las Configuraciones</option>
              {uniqueConfigs.map((cfg) => (
                <option key={cfg} value={cfg}>{cfg}</option>
              ))}
            </select>
          </div>

          {/* Aspiration Filter */}
          <div className={styles.selectWrapper}>
            <select
              value={selectedAspiration}
              onChange={(e) => setSelectedAspiration(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">Toda Aspiración</option>
              {uniqueAspirations.map((asp) => (
                <option key={asp} value={asp}>{asp}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className={styles.selectWrapper}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={styles.selectInput}
            >
              <option value="power">Ordenar: Mayor Potencia (HP)</option>
              <option value="displacement">Ordenar: Mayor Cilindrada (cc)</option>
              <option value="name">Ordenar: Nombre Alfabético</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Info */}
      <div className={styles.resultsInfo}>
        <span>Mostrando <strong>{filteredEngines.length}</strong> de {engines.length} motores disponibles</span>
        {(selectedBrand !== 'all' || selectedConfig !== 'all' || selectedAspiration !== 'all' || searchTerm) && (
          <button 
            className={styles.resetFiltersBtn}
            onClick={() => {
              setSelectedBrand('all');
              setSelectedConfig('all');
              setSelectedAspiration('all');
              setSearchTerm('');
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Engine Cards Grid */}
      <div className={styles.grid}>
        {filteredEngines.map((engine) => {
          const powerPercentage = Math.min(100, (engine.powerHp / 1600) * 100);

          return (
            <div 
              key={engine.id} 
              className={styles.card}
              onClick={() => onSelectEngine(engine)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.brandRow}>
                  <span className={styles.brandName}>{engine.brand}</span>
                  <span className={styles.countryBadge}>{engine.country}</span>
                </div>
                <h3 className={styles.engineName}>{engine.name}</h3>
                <span className={styles.engineYears}>{engine.years}</span>
              </div>

              {/* Specs Pills */}
              <div className={styles.pillsRow}>
                <span className={styles.configPill}>{engine.config}</span>
                <span className={`${styles.aspPill} ${engine.aspiration.includes('Turbo') ? styles.turboAsp : ''}`}>
                  {engine.aspiration}
                </span>
                <span className={styles.ccPill}>{engine.displacementL} ({engine.displacementCc} cc)</span>
              </div>

              {/* Power Meter Gauge */}
              <div className={styles.powerSection}>
                <div className={styles.powerHeader}>
                  <span className={styles.powerLabel}>Potencia Máxima:</span>
                  <span className={styles.powerValue}>{engine.powerHp} <small>HP</small></span>
                </div>
                <div className={styles.powerTrack}>
                  <div 
                    className={styles.powerFill}
                    style={{ width: `${Math.max(12, powerPercentage)}%` }}
                  />
                </div>
                <div className={styles.torqueRow}>
                  <span>Torque: <strong>{engine.torqueNm} Nm</strong></span>
                  <span>Max: <strong>{engine.rpmMax} RPM</strong></span>
                </div>
              </div>

              {/* Description Snippet */}
              <p className={styles.descriptionSnippet}>{engine.description}</p>

              {/* Notable Car Models */}
              <div className={styles.carsFooter}>
                <div className={styles.carsHeader}>
                  <IconCar size={14} className={styles.carIcon} />
                  <span>Modelos destacables:</span>
                </div>
                <div className={styles.carTags}>
                  {engine.notableCars.map((car, idx) => (
                    <span key={idx} className={styles.carTag}>{car}</span>
                  ))}
                </div>
              </div>

              <div className={styles.actionFooter}>
                <span className={styles.exploreText}>Explorar Esquema y Piezas</span>
                <IconArrowRight size={16} className={styles.arrowIcon} />
              </div>
            </div>
          );
        })}
      </div>

      {filteredEngines.length === 0 && (
        <div className={styles.noResults}>
          <IconAdjustmentsHorizontal size={48} className={styles.noResultsIcon} />
          <h3>No se encontraron motores con estos criterios</h3>
          <p>Prueba ajustando la búsqueda o limpiando los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};
