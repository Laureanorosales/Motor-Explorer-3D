import React, { useState } from 'react';
import styles from './EngineDetailModal.module.css';
import { Engine, EnginePart } from '../../types/engine';
import { getDiagramForEngineConfig } from '../../data/diagrams';
import { getPartsForEngine } from '../../data/helpers';
import { InteractiveDiagram } from '../InteractiveDiagram/InteractiveDiagram';
import { Interactive3DEngine } from '../Interactive3DEngine/Interactive3DEngine';
import { 
  IconX, 
  IconCar, 
  IconCheck, 
  IconBinaryTree,
  IconEngine
} from '@tabler/icons-react';

interface EngineDetailModalProps {
  engine: Engine;
  onClose: () => void;
  onSelectPart: (part: EnginePart) => void;
}

export const EngineDetailModal: React.FC<EngineDetailModalProps> = ({ engine, onClose, onSelectPart }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'sim3d' | 'parts' | 'overview'>('diagram');
  const diagramConfig = getDiagramForEngineConfig(engine.config);
  const engineParts = getPartsForEngine(engine);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.brandBadgeRow}>
              <span className={styles.brandBadge}>{engine.brand}</span>
              <span className={styles.countryBadge}>{engine.country}</span>
              <span className={styles.yearsBadge}>{engine.years}</span>
            </div>
            <h2 className={styles.title}>{engine.name}</h2>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            <IconX size={22} />
          </button>
        </div>

        {/* Top Specs Bar */}
        <div className={styles.specsBanner}>
          <div className={styles.specBox}>
            <span className={styles.specLabel}>Cilindrada</span>
            <span className={styles.specVal}>{engine.displacementL}</span>
            <span className={styles.specSub}>{engine.displacementCc} cc</span>
          </div>

          <div className={`${styles.specBox} ${styles.highlightBox}`}>
            <span className={styles.specLabel}>Potencia (HP)</span>
            <span className={styles.specVal}>{engine.powerHp} <small>HP</small></span>
            <span className={styles.specSub}>@ max rpm</span>
          </div>

          <div className={styles.specBox}>
            <span className={styles.specLabel}>Torque Máximo</span>
            <span className={styles.specVal}>{engine.torqueNm} <small>Nm</small></span>
            <span className={styles.specSub}>Par motor</span>
          </div>

          <div className={styles.specBox}>
            <span className={styles.specLabel}>Configuración</span>
            <span className={styles.specVal}>{engine.config}</span>
            <span className={styles.specSub}>{engine.valvetrain}</span>
          </div>

          <div className={styles.specBox}>
            <span className={styles.specLabel}>Aspiración</span>
            <span className={styles.specVal}>{engine.aspiration}</span>
            <span className={styles.specSub}>{engine.fuelType}</span>
          </div>
        </div>

        {/* Tab Navigation inside Modal */}
        <div className={styles.tabsNav}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'sim3d' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('sim3d')}
          >
            <IconEngine size={18} />
            <span>Simulador 3D en Movimiento</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'diagram' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('diagram')}
          >
            <IconBinaryTree size={18} />
            <span>Diagrama Interactivo (SVG)</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'parts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('parts')}
          >
            <IconCheck size={18} />
            <span>Componentes Incluidos ({engineParts.length})</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <IconCar size={18} />
            <span>Resumen e Historia</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className={styles.body}>
          {activeTab === 'sim3d' && (
            <Interactive3DEngine 
              onSelectPart={onSelectPart}
              engineName={`${engine.name} — Simulación 3D Cinemática`}
              engineConfig={engine.config}
            />
          )}

          {activeTab === 'diagram' && (
            <InteractiveDiagram 
              diagram={diagramConfig}
              onSelectPart={onSelectPart}
            />
          )}

          {activeTab === 'parts' && (
            <div className={styles.partsGrid}>
              {engineParts.map((part) => (
                <div 
                  key={part.id} 
                  className={styles.partCardItem}
                  onClick={() => onSelectPart(part)}
                >
                  <div className={styles.partItemHeader}>
                    <span className={styles.partCategory}>{part.category}</span>
                    <h4 className={styles.partName}>{part.spanishName}</h4>
                    <span className={styles.partEngName}>{part.name}</span>
                  </div>
                  <p className={styles.partDesc}>{part.function}</p>
                  <div className={styles.partAction}>
                    <span>Ver en glosario →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'overview' && (
            <div className={styles.overviewContainer}>
              <div className={styles.descCard}>
                <h3>Descripción del Motor</h3>
                <p>{engine.description}</p>
              </div>

              <div className={styles.carsCard}>
                <h3>Automóviles Emblemáticos con este Motor</h3>
                <div className={styles.carList}>
                  {engine.notableCars.map((car, i) => (
                    <div key={i} className={styles.carItem}>
                      <IconCar size={18} className={styles.carIcon} />
                      <span>{car}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
