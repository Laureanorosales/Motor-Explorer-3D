import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PartsGlossary } from '../components/PartsGlossary/PartsGlossary';
import { ENGINE_PARTS } from '../data/parts';

describe('MotorExplorer - PartsGlossary Component Tests', () => {
  it('renders glossary header, category pills, and part list', () => {
    const handleSelectEngine = vi.fn();
    render(<PartsGlossary onSelectEngine={handleSelectEngine} />);

    expect(screen.getByText('Glosario Técnico de Componentes Mecánicos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar pieza por nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Todas las Categorías/i)).toBeInTheDocument();
    expect(screen.getByText(/Bloque & Estructura/i)).toBeInTheDocument();
  });

  it('filters parts when searching by name', () => {
    const handleSelectEngine = vi.fn();
    render(<PartsGlossary onSelectEngine={handleSelectEngine} />);

    const searchInput = screen.getByPlaceholderText(/Buscar pieza por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'Bujía' } });

    expect(screen.getByText('Bujía de Encendido')).toBeInTheDocument();
    expect(screen.queryByText('Bloque de Motor')).not.toBeInTheDocument();
  });

  it('filters parts by clicking category pills', () => {
    const handleSelectEngine = vi.fn();
    render(<PartsGlossary onSelectEngine={handleSelectEngine} />);

    const turboCatBtn = screen.getByText(/Sobrealimentación/i);
    fireEvent.click(turboCatBtn);

    expect(screen.getByText('Turbocompresor')).toBeInTheDocument();
    expect(screen.queryByText('Cigüeñal')).not.toBeInTheDocument();
  });

  it('selects a part and displays full diagnostic information', () => {
    const handleSelectEngine = vi.fn();
    render(<PartsGlossary onSelectEngine={handleSelectEngine} />);

    // Click on "Pistones y Bielas"
    const pistonItem = screen.getByText('Pistones y Bielas');
    fireEvent.click(pistonItem);

    // Verify diagnostic sections
    expect(screen.getByText(/Función Principal/i)).toBeInTheDocument();
    expect(screen.getByText(/Ubicación en el Ensamblaje/i)).toBeInTheDocument();
    expect(screen.getByText(/Diagnóstico y Fallas Habituales/i)).toBeInTheDocument();
  });

  it('supports initialPart prop to open directly on a component', () => {
    const handleSelectEngine = vi.fn();
    const turboPart = ENGINE_PARTS.find((p) => p.id === 'turbocharger');
    render(<PartsGlossary onSelectEngine={handleSelectEngine} initialPart={turboPart} />);

    expect(screen.getAllByText('Turbocompresor').length).toBeGreaterThan(0);
    expect(screen.getByText(/Función Principal/i)).toBeInTheDocument();
  });
});
