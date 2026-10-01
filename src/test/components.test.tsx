import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Layout/Navbar';
import { EngineCatalog } from '../components/EngineCatalog/EngineCatalog';
import { PartsGlossary } from '../components/PartsGlossary/PartsGlossary';
import { ENGINES_DATA } from '../data/engines';

describe('MotorExplorer - React Components Tests', () => {
  it('Navbar renders brand logo and navigates tabs', () => {
    const handleTabChange = vi.fn();
    render(<Navbar activeTab="catalog" setActiveTab={handleTabChange} totalEngines={28} />);

    expect(screen.getByText('Catálogo Motores')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();

    const glossaryBtn = screen.getByText('Glosario Piezas');
    fireEvent.click(glossaryBtn);
    expect(handleTabChange).toHaveBeenCalledWith('glossary');
  });

  it('EngineCatalog filters engines based on search term', () => {
    const handleSelectEngine = vi.fn();
    render(<EngineCatalog engines={ENGINES_DATA} onSelectEngine={handleSelectEngine} />);

    const searchInput = screen.getByPlaceholderText(/Buscar por motor/i);
    fireEvent.change(searchInput, { target: { value: 'Torino' } });

    expect(screen.getByText(/Torino Tornado/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dodge GTX 318 V8/i)).not.toBeInTheDocument();
  });

  it('PartsGlossary filters parts based on category click', () => {
    const handleSelectEngine = vi.fn();
    render(<PartsGlossary onSelectEngine={handleSelectEngine} />);

    expect(screen.getByText('Glosario Técnico de Componentes Mecánicos')).toBeInTheDocument();

    const catBtn = screen.getByText(/Bloque & Estructura/i);
    fireEvent.click(catBtn);

    expect(screen.getByText('Bloque de Motor')).toBeInTheDocument();
  });
});
