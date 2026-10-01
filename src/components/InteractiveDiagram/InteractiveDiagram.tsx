import React, { useState, useRef } from 'react';
import styles from './InteractiveDiagram.module.css';
import { DiagramConfig, Hotspot, EnginePart } from '../../types/engine';
import { getPartById } from '../../data/helpers';
import { 
  IconInfoCircle, 
  IconAlertTriangle, 
  IconTarget, 
  IconArrowRight,
  IconZoomIn,
  IconZoomOut,
  IconRefresh,
  IconMaximize,
  IconMinimize
} from '@tabler/icons-react';

interface InteractiveDiagramProps {
  diagram: DiagramConfig;
  onSelectPart?: (part: EnginePart) => void;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ diagram, onSelectPart }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(diagram.hotspots[0] || null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeHotspot = hoveredHotspot || selectedHotspot;
  const activePart = activeHotspot ? getPartById(activeHotspot.partId) : null;
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${isFullscreen ? styles.fullscreenContainer : ''}`}
    >
      <div className={styles.diagramHeader}>
        <div>
          <div className={styles.hdBadgeRow}>
            <span className={styles.hdBadge}>CAD FULL HD 1080p</span>
            <span className={styles.subBadge}>Manual de Taller Original</span>
          </div>
          <h3 className={styles.diagramTitle}>{diagram.title}</h3>
          <p className={styles.diagramSub}>Lámina técnica completa sin recortes. Usa los controles para hacer zoom o pantalla completa.</p>
        </div>

        <div className={styles.headerControls}>
          <button 
            className={`${styles.fullscreenBtn} ${isFullscreen ? styles.activeFullscreen : ''}`}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de Pantalla Completa' : 'Ver a Pantalla Completa'}
          >
            {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
            <span>{isFullscreen ? 'Cerrar Pantalla Completa' : 'Pantalla Completa'}</span>
          </button>

          <div className={styles.zoomControls}>
            <button 
              className={styles.controlBtn} 
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
              title="Acercar Plano"
            >
              <IconZoomIn size={16} />
            </button>
            <button 
              className={styles.controlBtn} 
              onClick={() => setZoomLevel(1)}
              title="Restablecer Escala"
            >
              <IconRefresh size={16} />
            </button>
            <button 
              className={styles.controlBtn} 
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
              title="Alejar Plano"
            >
              <IconZoomOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.workspace}>
        {/* High Definition Blueprint Canvas */}
        <div className={styles.svgContainer}>
          <div 
            className={styles.svgWrapper}
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <svg 
              viewBox="0 0 800 500" 
              className={styles.svgElement}
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <rect width="800" height="500" fill="#060608" />
              <rect width="800" height="500" fill="url(#grid)" />

              {/* Render HD Technical Blueprint Background - preserveAspectRatio="xMidYMid meet" to prevent cropping */}
              {diagram.bgBlueprintUrl && (
                <image 
                  href={diagram.bgBlueprintUrl} 
                  x="0" 
                  y="0" 
                  width="800" 
                  height="500" 
                  preserveAspectRatio="xMidYMid meet" 
                  opacity="0.72"
                />
              )}

              {/* Render Hotspot Interactive Targets */}
              {diagram.hotspots.map((hs) => {
                const isSelected = selectedHotspot?.id === hs.id;
                const isHovered = hoveredHotspot?.id === hs.id;

                const cx = (hs.x / 100) * 800;
                const cy = (hs.y / 100) * 500;

                return (
                  <g 
                    key={hs.id}
                    className={styles.hotspotGroup}
                    onClick={() => setSelectedHotspot(hs)}
                    onMouseEnter={() => setHoveredHotspot(hs)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    {/* Outer circle — bordo si activo, azul si no */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected || isHovered ? 22 : 15}
                      fill={isSelected ? 'rgba(139, 40, 70, 0.28)' : 'rgba(30, 77, 120, 0.22)'}
                      stroke={isSelected ? '#8B2846' : '#1E4D78'}
                      strokeWidth={isSelected || isHovered ? 2.5 : 1.5}
                      className={isSelected || isHovered ? styles.activePulse : ''}
                    />

                    {/* Center dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="5"
                      fill={isSelected ? '#8B2846' : '#1E4D78'}
                    />

                    {/* Label */}
                    <rect
                      x={cx - 52}
                      y={cy - 36}
                      width="104"
                      height="20"
                      rx="3"
                      fill="rgba(6, 6, 8, 0.92)"
                      stroke={isSelected ? 'rgba(139, 40, 70, 0.55)' : 'rgba(30, 77, 120, 0.45)'}
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy - 22}
                      fill={isSelected ? '#D6D3CE' : '#7A7872'}
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="JetBrains Mono"
                    >
                      {hs.name.length > 15 ? hs.name.substring(0, 13) + '..' : hs.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Component Inspection Panel */}
        <div className={styles.detailPanel}>
          {activePart ? (
            <div className={styles.partCard}>
              <div className={styles.partHeader}>
                <div className={styles.partBadge}>
                  <IconTarget size={18} className={styles.targetIcon} />
                  <span>{activePart.category.toUpperCase()}</span>
                </div>
                <h4 className={styles.partTitle}>{activePart.spanishName}</h4>
                <p className={styles.partSubName}>{activePart.name}</p>
              </div>

              <div className={styles.infoSection}>
                <div className={styles.infoRow}>
                  <IconInfoCircle size={16} className={styles.rowIcon} />
                  <div>
                    <span className={styles.rowLabel}>Ubicación en el Motor:</span>
                    <p className={styles.rowText}>{activePart.locationInEngine}</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <IconTarget size={16} className={styles.rowIcon} />
                  <div>
                    <span className={styles.rowLabel}>Función Mecánica:</span>
                    <p className={styles.rowText}>{activePart.function}</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <IconAlertTriangle size={16} className={styles.warningIcon} />
                  <div>
                    <span className={styles.rowLabel}>Síntomas y Fallas Comunes:</span>
                    <ul className={styles.failureList}>
                      {activePart.commonFailures.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {onSelectPart && (
                <button 
                  className={styles.glossaryBtn}
                  onClick={() => onSelectPart(activePart)}
                >
                  <span>Ver en Glosario Completo</span>
                  <IconArrowRight size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <IconInfoCircle size={36} className={styles.emptyIcon} />
              <p>Haz clic en cualquier punto del plano CAD para inspeccionar sus especificaciones técnicas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
