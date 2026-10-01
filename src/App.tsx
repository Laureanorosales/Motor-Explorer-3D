import React, { useState } from 'react';
import styles from './App.module.css';
import { Navbar } from './components/Layout/Navbar';
import { EngineCatalog } from './components/EngineCatalog/EngineCatalog';
import { InteractiveDiagram } from './components/InteractiveDiagram/InteractiveDiagram';
import { Interactive3DEngine, EngineArch3D } from './components/Interactive3DEngine/Interactive3DEngine';
import { AnimagraffsMasterclass } from './components/AnimagraffsMasterclass/AnimagraffsMasterclass';
import { PartsGlossary } from './components/PartsGlossary/PartsGlossary';
import { EngineDetailModal } from './components/EngineDetail/EngineDetailModal';
import { ENGINES_DATA } from './data/engines';
import { DIAGRAM_CONFIGS } from './data/diagrams';
import { Engine, EnginePart } from './types/engine';

const mapInteractiveKeyToConfig = (key: string): EngineArch3D => {
  switch (key) {
    case 'inline6': return 'Inline-6';
    case 'v6': return 'V6';
    case 'v8': return 'V8';
    case 'inline3': return 'Inline-3';
    case 'inline4':
    default: return 'Inline-4';
  }
};

const mapConfigToInteractiveKey = (arch: EngineArch3D): string => {
  switch (arch) {
    case 'Inline-6': return 'inline6';
    case 'V6': return 'v6';
    case 'V8': return 'v8';
    case 'Inline-3': return 'inline3';
    case 'Inline-4':
    default: return 'inline4';
  }
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'interactive' | 'glossary'>('catalog');
  const [selectedEngine, setSelectedEngine] = useState<Engine | null>(null);
  const [selectedGlossaryPart, setSelectedGlossaryPart] = useState<EnginePart | null>(null);
  const [interactiveConfigKey, setInteractiveConfigKey] = useState<string>('inline4');
  const [interactiveMode, setInteractiveMode] = useState<'3d' | 'masterclass' | 'blueprints'>('3d');

  const handleSelectEngine = (engine: Engine) => {
    setSelectedEngine(engine);
  };

  const handleSelectPartForGlossary = (part: EnginePart) => {
    setSelectedEngine(null);
    setSelectedGlossaryPart(part);
    setActiveTab('glossary');
  };

  return (
    <div className={styles.appContainer}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        totalEngines={ENGINES_DATA.length}
      />

      <main className={styles.mainContent}>
        {activeTab === 'catalog' && (
          <EngineCatalog 
            engines={ENGINES_DATA}
            onSelectEngine={handleSelectEngine}
          />
        )}

        {activeTab === 'interactive' && (
          <div className={styles.standaloneInteractive}>
            {/* Mode Switcher: 3D Real Simulation vs Masterclass 4K vs CAD Blueprints */}
            <div className={styles.modeSwitcherBar}>
              <div className={styles.modeTabs}>
                <button
                  className={`${styles.modeTabBtn} ${interactiveMode === '3d' ? styles.activeModeTab : ''}`}
                  onClick={() => setInteractiveMode('3d')}
                >
                  <span>🎮 Simulador 3D en Movimiento & Despiece (Animagraffs Engine)</span>
                </button>
                <button
                  className={`${styles.modeTabBtn} ${interactiveMode === 'masterclass' ? styles.activeModeTab : ''}`}
                  onClick={() => setInteractiveMode('masterclass')}
                >
                  <span>🎬 Masterclass Animagraffs (Video 4K)</span>
                </button>
                <button
                  className={`${styles.modeTabBtn} ${interactiveMode === 'blueprints' ? styles.activeModeTab : ''}`}
                  onClick={() => setInteractiveMode('blueprints')}
                >
                  <span>📐 Láminas Técnicas CAD & Hotspots (Blueprints)</span>
                </button>
              </div>
            </div>

            {interactiveMode === '3d' && (
              <Interactive3DEngine 
                engineConfig={mapInteractiveKeyToConfig(interactiveConfigKey)}
                onArchChange={(arch) => setInteractiveConfigKey(mapConfigToInteractiveKey(arch))}
                onSelectPart={handleSelectPartForGlossary}
                onOpenMasterclass={() => setInteractiveMode('masterclass')}
              />
            )}

            {interactiveMode === 'masterclass' && (
              <AnimagraffsMasterclass 
                onSwitchTo3D={() => setInteractiveMode('3d')}
              />
            )}

            {interactiveMode === 'blueprints' && (
              <>
                <div className={styles.diagramSelectorBar}>
                  <span className={styles.selectorLabel}>Seleccionar Lámina de Plano CAD por Arquitectura:</span>
                  <div className={styles.architectureButtons}>
                    <button
                      className={`${styles.archBtn} ${interactiveConfigKey === 'inline4' ? styles.activeArch : ''}`}
                      onClick={() => setInteractiveConfigKey('inline4')}
                    >
                      4 en Línea (Cronos, Hilux, 208, Polo, Yaris)
                    </button>
                    <button
                      className={`${styles.archBtn} ${interactiveConfigKey === 'inline6' ? styles.activeArch : ''}`}
                      onClick={() => setInteractiveConfigKey('inline6')}
                    >
                      6 en Línea (Torino, Falcon, Chevy, Slant-Six)
                    </button>
                    <button
                      className={`${styles.archBtn} ${interactiveConfigKey === 'v6' ? styles.activeArch : ''}`}
                      onClick={() => setInteractiveConfigKey('v6')}
                    >
                      V6 Turbo Diésel (Amarok V6, Ranger V6)
                    </button>
                    <button
                      className={`${styles.archBtn} ${interactiveConfigKey === 'v8' ? styles.activeArch : ''}`}
                      onClick={() => setInteractiveConfigKey('v8')}
                    >
                      Motor V8 (Dodge GTX 318, Ford V8 292)
                    </button>
                    <button
                      className={`${styles.archBtn} ${interactiveConfigKey === 'inline3' ? styles.activeArch : ''}`}
                      onClick={() => setInteractiveConfigKey('inline3')}
                    >
                      3 Cilindros Turbo (Tracker, EcoSport)
                    </button>
                  </div>
                </div>

                <InteractiveDiagram 
                  diagram={DIAGRAM_CONFIGS[interactiveConfigKey] || DIAGRAM_CONFIGS.inline4}
                  onSelectPart={handleSelectPartForGlossary}
                />
              </>
            )}
          </div>
        )}

        {activeTab === 'glossary' && (
          <PartsGlossary 
            onSelectEngine={(engine) => {
              setSelectedEngine(engine);
            }}
            initialPart={selectedGlossaryPart}
          />
        )}
      </main>

      {/* Engine Detailed Modal */}
      {selectedEngine && (
        <EngineDetailModal 
          engine={selectedEngine}
          onClose={() => setSelectedEngine(null)}
          onSelectPart={handleSelectPartForGlossary}
        />
      )}

      {/* Footer con Copyright */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Laureano Rosales. Todos los derechos reservados.
          </div>
          <div className={styles.footerNote}>
            MotorExplorer &bull; Enciclopedia y Simulador Técnico Automotriz
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
