import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EngineDetailModal } from '../components/EngineDetail/EngineDetailModal';
import { ENGINES_DATA } from '../data/engines';

describe('MotorExplorer - EngineDetailModal Component Tests', () => {
  const mockEngine = ENGINES_DATA.find((e) => e.id === 'torino-tornado-230-380w') || ENGINES_DATA[0];

  it('renders engine specifications header and banner specs correctly', () => {
    const handleClose = vi.fn();
    const handleSelectPart = vi.fn();

    render(
      <EngineDetailModal 
        engine={mockEngine} 
        onClose={handleClose} 
        onSelectPart={handleSelectPart} 
      />
    );

    expect(screen.getByText(mockEngine.name)).toBeInTheDocument();
    expect(screen.getByText(mockEngine.brand)).toBeInTheDocument();
    expect(screen.getByText(mockEngine.years)).toBeInTheDocument();
    expect(screen.getByText(`${mockEngine.powerHp}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockEngine.torqueNm}`)).toBeInTheDocument();
    expect(screen.getByText(mockEngine.displacementL)).toBeInTheDocument();
  });

  it('calls onClose when clicking close button or background overlay', () => {
    const handleClose = vi.fn();
    const handleSelectPart = vi.fn();

    const { container } = render(
      <EngineDetailModal 
        engine={mockEngine} 
        onClose={handleClose} 
        onSelectPart={handleSelectPart} 
      />
    );

    // Click close button
    const closeBtn = screen.getByRole('button', { name: '' });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Click overlay backdrop
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('navigates between modal tabs: diagram, parts, overview', () => {
    const handleClose = vi.fn();
    const handleSelectPart = vi.fn();

    render(
      <EngineDetailModal 
        engine={mockEngine} 
        onClose={handleClose} 
        onSelectPart={handleSelectPart} 
      />
    );

    // Pestaña inicial: Diagrama
    expect(screen.getByText(/Diagrama Interactivo/i)).toBeInTheDocument();

    // Cambiar a la pestaña de Componentes Incluidos
    const partsTabBtn = screen.getByText(/Componentes Incluidos/i);
    fireEvent.click(partsTabBtn);
    expect(screen.getAllByText(/Ver en glosario/i).length).toBeGreaterThan(0);

    // Cambiar a la pestaña de Resumen e Historia
    const overviewTabBtn = screen.getByText(/Resumen e Historia/i);
    fireEvent.click(overviewTabBtn);
    expect(screen.getByText(/Descripción del Motor/i)).toBeInTheDocument();
    expect(screen.getByText(/Automóviles Emblemáticos/i)).toBeInTheDocument();
    expect(screen.getByText(mockEngine.description)).toBeInTheDocument();
  });

  it('triggers onSelectPart when clicking a part card in the parts tab', () => {
    const handleClose = vi.fn();
    const handleSelectPart = vi.fn();

    render(
      <EngineDetailModal 
        engine={mockEngine} 
        onClose={handleClose} 
        onSelectPart={handleSelectPart} 
      />
    );

    // Ir a pestaña de partes
    const partsTabBtn = screen.getByText(/Componentes Incluidos/i);
    fireEvent.click(partsTabBtn);

    const firstPartLink = screen.getAllByText(/Ver en glosario/i)[0];
    fireEvent.click(firstPartLink);
    expect(handleSelectPart).toHaveBeenCalledTimes(1);
  });
});
