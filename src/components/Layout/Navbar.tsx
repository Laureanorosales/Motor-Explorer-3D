import React from 'react';
import styles from './Navbar.module.css';
import { IconEngine, IconLayoutGrid, IconSteeringWheel, IconBook } from '@tabler/icons-react';

interface NavbarProps {
  activeTab: 'catalog' | 'interactive' | 'glossary';
  setActiveTab: (tab: 'catalog' | 'interactive' | 'glossary') => void;
  totalEngines: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, totalEngines }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand} onClick={() => setActiveTab('catalog')}>
          <div className={styles.logoBadge}>
            <IconEngine size={28} className={styles.logoIcon} />
          </div>
          <div>
            <div className={styles.titleGroup}>
              <h1 className={styles.logoText}>MOTOR<span className={styles.logoHighlight}>EXPLORER</span></h1>
              <span className={styles.versionBadge}>v1.0 TS</span>
            </div>
            <p className={styles.subtitle}>Interactive Automotive Engine Architecture & Parts Encyclopedia</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${activeTab === 'catalog' ? styles.active : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <IconLayoutGrid size={18} />
            <span>Catálogo Motores</span>
            <span className={styles.badgeCount}>{totalEngines}</span>
          </button>

          <button
            className={`${styles.navBtn} ${activeTab === 'interactive' ? styles.active : ''}`}
            onClick={() => setActiveTab('interactive')}
          >
            <IconSteeringWheel size={18} />
            <span>Explorador 3D / SVG</span>
          </button>

          <button
            className={`${styles.navBtn} ${activeTab === 'glossary' ? styles.active : ''}`}
            onClick={() => setActiveTab('glossary')}
          >
            <IconBook size={18} />
            <span>Glosario Piezas</span>
          </button>
        </nav>

        <div className={styles.statusPanel}>
          <div className={styles.statusIndicator}>
            <span className={styles.pulseDot}></span>
            <span className={styles.statusText}>MODE: VIBECODING</span>
          </div>
        </div>
      </div>
    </header>
  );
};
