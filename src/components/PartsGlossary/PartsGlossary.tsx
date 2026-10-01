import React, { useState, useMemo } from 'react';
import styles from './PartsGlossary.module.css';
import { EnginePart, EnginePartCategory, Engine } from '../../types/engine';
import { getAllParts, getEnginesForPart } from '../../data/helpers';
import { 
  IconSearch, 
  IconEngine, 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconCar,
  IconBookmark
} from '@tabler/icons-react';

interface PartsGlossaryProps {
  onSelectEngine: (engine: Engine) => void;
  initialPart?: EnginePart | null;
}

const CATEGORY_NAMES: Record<EnginePartCategory, string> = {
  bloque: 'Bloque & Estructura',
  distribucion: 'Tren de Distribución',
  admision_escape: 'Admisión & Escape',
  alimentacion: 'Inyección & Alimentación',
  refrigeracion: 'Sistema de Enfriamiento',
  lubricacion: 'Sistema de Lubricación',
  electrica: 'Encendido & Eléctrico',
  sobrealimentacion: 'Sobrealimentación (Turbo/Supercharged)'
};

export const PartsGlossary: React.FC<PartsGlossaryProps> = ({ onSelectEngine, initialPart }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<EnginePart | null>(initialPart || null);

  const parts = useMemo(() => getAllParts(), []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(parts.map((p) => p.category)));
    return cats as EnginePartCategory[];
  }, [parts]);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.spanishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.function.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'all' || part.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [parts, searchTerm, selectedCategory]);

  const activePartEngines = useMemo(() => {
    if (!selectedPart) return [];
    return getEnginesForPart(selectedPart.id);
  }, [selectedPart]);

  return (
    <div className={styles.container}>
      {/* Header & Category Filters */}
      <div className={styles.headerBox}>
        <div>
          <h2 className={styles.title}>Glosario Técnico de Componentes Mecánicos</h2>
          <p className={styles.subtitle}>
            Aprende cómo funciona cada componente interno y externo de un motor de combustión interna, dónde se ubica y sus síntomas habituales de falla.
          </p>
        </div>

        <div className={styles.searchBar}>
          <IconSearch size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar pieza por nombre (Cigüeñal, Turbo, Árbol de levas, Inyectores)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          <button
            className={`${styles.catPill} ${selectedCategory === 'all' ? styles.activePill : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todas las Categorías ({parts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catPill} ${selectedCategory === cat ? styles.activePill : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {CATEGORY_NAMES[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className={styles.workspace}>
        {/* Left List of Parts */}
        <div className={styles.partsList}>
          {filteredParts.map((part) => {
            const isSelected = selectedPart?.id === part.id;

            return (
              <div
                key={part.id}
                className={`${styles.partRowCard} ${isSelected ? styles.selectedRow : ''}`}
                onClick={() => setSelectedPart(part)}
              >
                <div className={styles.rowCategoryBadge}>
                  {part.category.toUpperCase()}
                </div>
                <h4 className={styles.rowTitle}>{part.spanishName}</h4>
                <span className={styles.rowSubTitle}>{part.name}</span>
                <p className={styles.rowDesc}>{part.function}</p>
              </div>
            );
          })}

          {filteredParts.length === 0 && (
            <div className={styles.noParts}>No se encontraron piezas con ese término.</div>
          )}
        </div>

        {/* Right Detail Inspection Card */}
        <div className={styles.detailContainer}>
          {selectedPart ? (
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <span className={styles.catLabel}>{CATEGORY_NAMES[selectedPart.category]}</span>
                <h3 className={styles.detailTitle}>{selectedPart.spanishName}</h3>
                <span className={styles.detailSub}>{selectedPart.name}</span>
              </div>

              <div className={styles.detailSection}>
                <h4>
                  <IconInfoCircle size={18} className={styles.secIcon} />
                  <span>Descripción y Principio de Funcionamiento</span>
                </h4>
                <p className={styles.detailText}>{selectedPart.description}</p>
              </div>

              <div className={styles.detailSection}>
                <h4>
                  <IconBookmark size={18} className={styles.secIcon} />
                  <span>Función Principal</span>
                </h4>
                <p className={styles.detailText}>{selectedPart.function}</p>
              </div>

              <div className={styles.detailSection}>
                <h4>
                  <IconEngine size={18} className={styles.secIcon} />
                  <span>Ubicación en el Ensamblaje</span>
                </h4>
                <p className={styles.detailText}>{selectedPart.locationInEngine}</p>
              </div>

              <div className={`${styles.detailSection} ${styles.warningSec}`}>
                <h4>
                  <IconAlertTriangle size={18} className={styles.warnIcon} />
                  <span>Diagnóstico y Fallas Habituales</span>
                </h4>
                <ul className={styles.failureList}>
                  {selectedPart.commonFailures.map((failure, idx) => (
                    <li key={idx}>{failure}</li>
                  ))}
                </ul>
              </div>

              {/* Motores de la BD que usan esta pieza */}
              <div className={styles.detailSection}>
                <h4>
                  <IconCar size={18} className={styles.secIcon} />
                  <span>Motores destacados del catálogo con esta pieza ({activePartEngines.length})</span>
                </h4>
                <div className={styles.engineChips}>
                  {activePartEngines.slice(0, 10).map((eng) => (
                    <button
                      key={eng.id}
                      className={styles.engineChip}
                      onClick={() => onSelectEngine(eng)}
                    >
                      <IconEngine size={14} />
                      <span>{eng.name}</span>
                    </button>
                  ))}
                  {activePartEngines.length > 10 && (
                    <span className={styles.moreCount}>+ {activePartEngines.length - 10} motores más</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.selectPrompt}>
              <IconInfoCircle size={40} className={styles.promptIcon} />
              <h3>Selecciona una pieza del glosario</h3>
              <p>Haz clic en cualquier componente de la lista izquierda para desplegar sus especificaciones mecánicas detalladas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
