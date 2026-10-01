import React, { useState } from 'react';
import styles from './AnimagraffsMasterclass.module.css';
import { 
  IconPlayerPlay, 
  IconExternalLink, 
  IconEngine, 
  IconSettings
} from '@tabler/icons-react';

interface Chapter {
  id: string;
  timeStr: string;
  seconds: number;
  phase: string;
  title: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'block_arch',
    timeStr: '0:00',
    seconds: 0,
    phase: 'Estructura',
    title: 'Bloque de Cilindros & Bancadas',
    description: 'Estructura fundida que aloja las camisas de los cilindros, galerías de refrigeración y bancadas del cigüeñal.'
  },
  {
    id: 'piston_assembly',
    timeStr: '0:24',
    seconds: 24,
    phase: 'Conjunto Móvil',
    title: 'Pistones, Aros y Bielas',
    description: 'Transformación de fuerza lineal a rotativa mediante pasador flotante, aros de compresión y bielas forjadas.'
  },
  {
    id: 'intake_stroke',
    timeStr: '0:52',
    seconds: 52,
    phase: 'Fase 1',
    title: 'Carrera de Admisión (Intake)',
    description: 'Apertura sincronizada de las válvulas de admisión. El pistón desciende creando vacío y aspirando la mezcla aire-combustible.'
  },
  {
    id: 'compression_stroke',
    timeStr: '1:07',
    seconds: 67,
    phase: 'Fase 2',
    title: 'Carrera de Compresión (Compression)',
    description: 'Válvulas cerradas herméticamente. El pistón asciende comprimiendo la mezcla hasta elevar drásticamente su temperatura.'
  },
  {
    id: 'power_stroke',
    timeStr: '1:18',
    seconds: 78,
    phase: 'Fase 3',
    title: 'Combustión / Fuerza (Power)',
    description: 'Salto de chispa de 25.000V en la bujía. Deflagración rápida con expansión térmica violenta que empuja el pistón al PMI.'
  },
  {
    id: 'exhaust_stroke',
    timeStr: '1:33',
    seconds: 93,
    phase: 'Fase 4',
    title: 'Carrera de Escape (Exhaust)',
    description: 'Apertura de válvulas de escape. El pistón asciende expulsando los gases calientes quemados hacia el múltiple y turbo.'
  },
  {
    id: 'valvetrain_dohc',
    timeStr: '2:05',
    seconds: 125,
    phase: 'Distribución',
    title: 'Árboles de Levas DOHC & Resortes',
    description: 'Doble árbol de levas a relación 1:2 respecto al cigüeñal con resortes helicoidales de retorno de alta velocidad.'
  },
  {
    id: 'spark_ignition',
    timeStr: '3:05',
    seconds: 185,
    phase: 'Encendido',
    title: 'Bujías de Alto Rendimiento',
    description: 'Aislador de porcelana cerámico con nervaduras anti-arco, electrodo de cobre y calibración de luz de chispa.'
  },
  {
    id: 'turbocharging',
    timeStr: '4:40',
    seconds: 280,
    phase: 'Sobrealimentación',
    title: 'Turbocompresor & Múltiple 4-1',
    description: 'La turbina aprovecha la energía cinética y calor de los gases de escape para sobrealimentar aire fresco comprimido.'
  }
];

interface AnimagraffsMasterclassProps {
  onSwitchTo3D?: () => void;
}

export const AnimagraffsMasterclass: React.FC<AnimagraffsMasterclassProps> = ({ onSwitchTo3D }) => {
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  const handleSelectChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setCurrentSeconds(chapter.seconds);
  };

  return (
    <div className={styles.masterclassContainer}>
      {/* Hero Header */}
      <div className={styles.heroHeader}>
        <div className={styles.badgeRow}>
          <span className={styles.badgeAnimagraffs}>ANIMAGRAFFS 3D MASTERCLASS</span>
          <span className={styles.badgeResolution}>REFERENCIA VISUAL EN 4K 60FPS</span>
          <span className={styles.badgeSource}>Jacob O'Neal — How a Car Engine Works</span>
        </div>
        <h2 className={styles.heroTitle}>
          <IconEngine size={30} color="#38bdf8" />
          Análisis Cinemático & Funcionamiento Real del Motor
        </h2>
        <p className={styles.heroSubtitle}>
          El estándar de oro en visualización técnica automotriz. Explora cada fase del ciclo de 4 tiempos (Admisión, Compresión, Combustión y Escape) 
          con cortes transversales hiperrealistas, tren valvular DOHC sincronizado y dinámica de fluidos térmica.
        </p>
      </div>

      {/* Main Video & Chapters Stage */}
      <div className={styles.videoStageGrid}>
        {/* Video Card */}
        <div className={styles.videoCard}>
          <div className={styles.videoWrapper}>
            <iframe
              className={styles.videoIframe}
              src={`https://www.youtube-nocookie.com/embed/sRMBq--LVjk?start=${currentSeconds}&autoplay=1&rel=0&modestbranding=1`}
              title="Animagraffs - How a Car Engine Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.videoControlBar}>
            <div className={styles.nowPlayingInfo}>
              <span className={styles.nowPlayingLabel}>Capítulo Activo ({activeChapter.timeStr}):</span>
              <span className={styles.nowPlayingTitle}>{activeChapter.title}</span>
            </div>

            <div className={styles.actionBtnRow}>
              {onSwitchTo3D && (
                <button 
                  className={styles.directSimBtn}
                  onClick={onSwitchTo3D}
                  title="Interactuar con el modelo 3D en tiempo real"
                >
                  <IconPlayerPlay size={18} />
                  <span>Interactuar en Simulador 3D</span>
                </button>
              )}

              <a 
                href={`https://www.youtube.com/watch?v=sRMBq--LVjk&t=${currentSeconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLinkBtn}
                title="Abrir en YouTube en pestaña externa"
              >
                <span>YouTube 4K</span>
                <IconExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Chapters Interactive List */}
        <div className={styles.chaptersPanel}>
          <div className={styles.chaptersHeader}>
            <span className={styles.chaptersTitle}>
              <IconSettings size={18} color="#38bdf8" />
              Capítulos & Fases
            </span>
            <span className={styles.chapterCount}>{CHAPTERS.length} lecciones</span>
          </div>

          <div className={styles.chapterList}>
            {CHAPTERS.map((ch) => {
              const isActive = activeChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  className={`${styles.chapterItem} ${isActive ? styles.chapterItemActive : ''}`}
                  onClick={() => handleSelectChapter(ch)}
                >
                  <div className={styles.chapterMetaRow}>
                    <span className={styles.chapterTime}>{ch.timeStr}</span>
                    <span className={styles.chapterPhase}>{ch.phase}</span>
                  </div>
                  <span className={styles.chapterItemTitle}>{ch.title}</span>
                  <span className={styles.chapterItemDesc}>{ch.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4-Stroke Thermodynamic Breakdown */}
      <div className={styles.telemetryGrid}>
        <div className={styles.strokeCard}>
          <div className={styles.strokeHeader}>
            <span className={`${styles.strokeStep} ${styles.intakeStep}`}>TIEMPO 1</span>
            <span className={styles.strokeDegrees}>0° — 180°</span>
          </div>
          <h3 className={styles.strokeName}>Admisión</h3>
          <p className={styles.strokeDetail}>
            Las válvulas de admisión bajan comprimiendo sus resortes helicoidales. El pistón desciende hacia el PMI succionando la mezcla atomizada de aire y gasolina (vapor azul).
          </p>
          <div className={styles.specRow}>
            <span>Presión en cilindro:</span>
            <span className={styles.specVal}>-0.3 bar (Vacío)</span>
          </div>
          <div className={styles.specRow}>
            <span>Estado valvular:</span>
            <span className={styles.specVal}>Admisión Abierta</span>
          </div>
        </div>

        <div className={styles.strokeCard}>
          <div className={styles.strokeHeader}>
            <span className={`${styles.strokeStep} ${styles.compressionStep}`}>TIEMPO 2</span>
            <span className={styles.strokeDegrees}>180° — 360°</span>
          </div>
          <h3 className={styles.strokeName}>Compresión</h3>
          <p className={styles.strokeDetail}>
            Ambas válvulas permanecen selladas. El pistón es empujado hacia arriba por el contrapeso del cigüeñal, comprimiendo la mezcla a una relación típica de 10:1 a 14:1.
          </p>
          <div className={styles.specRow}>
            <span>Presión en cilindro:</span>
            <span className={styles.specVal}>14 — 18 bar</span>
          </div>
          <div className={styles.specRow}>
            <span>Temperatura:</span>
            <span className={styles.specVal}>~450 °C</span>
          </div>
        </div>

        <div className={styles.strokeCard}>
          <div className={styles.strokeHeader}>
            <span className={`${styles.strokeStep} ${styles.powerStep}`}>TIEMPO 3</span>
            <span className={styles.strokeDegrees}>360° — 540°</span>
          </div>
          <h3 className={styles.strokeName}>Combustión / Fuerza</h3>
          <p className={styles.strokeDetail}>
            La bujía dispara un arco eléctrico de 25.000V. La mezcla se enciende en una bola de fuego explosiva, generando pico de presión que empuja el pistón con máxima fuerza útil.
          </p>
          <div className={styles.specRow}>
            <span>Presión pico:</span>
            <span className={styles.specVal}>60 — 90 bar</span>
          </div>
          <div className={styles.specRow}>
            <span>Temperatura pico:</span>
            <span className={styles.specVal}>~2.000 °C</span>
          </div>
        </div>

        <div className={styles.strokeCard}>
          <div className={styles.strokeHeader}>
            <span className={`${styles.strokeStep} ${styles.exhaustStep}`}>TIEMPO 4</span>
            <span className={styles.strokeDegrees}>540° — 720°</span>
          </div>
          <h3 className={styles.strokeName}>Escape</h3>
          <p className={styles.strokeDetail}>
            Se abren las válvulas de escape. El pistón asciende nuevamente barriendo los gases residuales quemados hacia los tubos del colector 4 a 1 y moviendo la turbina.
          </p>
          <div className={styles.specRow}>
            <span>Presión en colector:</span>
            <span className={styles.specVal}>1.2 — 2.5 bar</span>
          </div>
          <div className={styles.specRow}>
            <span>Temperatura gas:</span>
            <span className={styles.specVal}>~800 — 950 °C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimagraffsMasterclass;
