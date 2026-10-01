import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InteractiveDiagram } from '../components/InteractiveDiagram/InteractiveDiagram';
import { DIAGRAM_CONFIGS } from '../data/diagrams';

describe('MotorExplorer - InteractiveDiagram Component Tests', () => {
  const mockDiagram = DIAGRAM_CONFIGS.inline4;

  it('renders CAD blueprint canvas and header information', () => {
    render(<InteractiveDiagram diagram={mockDiagram} />);

    expect(screen.getByText(/CAD FULL HD 1080p/i)).toBeInTheDocument();
    expect(screen.getByText(mockDiagram.title)).toBeInTheDocument();
    expect(screen.getByTitle('Ver a Pantalla Completa')).toBeInTheDocument();
  });

  it('renders all hotspots configured for the diagram', () => {
    const { container } = render(<InteractiveDiagram diagram={mockDiagram} />);

    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });

  it('displays hotspot detail when clicked and handles onSelectPart', () => {
    const handleSelectPart = vi.fn();
    render(<InteractiveDiagram diagram={mockDiagram} onSelectPart={handleSelectPart} />);

    // Por defecto se selecciona el primer hotspot
    expect(screen.getByText(/Ubicación en el Motor/i)).toBeInTheDocument();
    expect(screen.getByText(/Función Mecánica/i)).toBeInTheDocument();
    expect(screen.getByText(/Síntomas y Fallas Comunes/i)).toBeInTheDocument();

    // Botón para ir al glosario completo
    const glossaryLinkBtn = screen.getByText(/Ver en Glosario Completo/i);
    expect(glossaryLinkBtn).toBeInTheDocument();
    fireEvent.click(glossaryLinkBtn);
    expect(handleSelectPart).toHaveBeenCalledTimes(1);
  });

  it('toggles fullscreen mode when clicking the fullscreen button', () => {
    render(<InteractiveDiagram diagram={mockDiagram} />);

    const fullscreenBtn = screen.getByTitle('Ver a Pantalla Completa');
    fireEvent.click(fullscreenBtn);

    expect(screen.getByTitle('Salir de Pantalla Completa')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Salir de Pantalla Completa'));
    expect(screen.getByTitle('Ver a Pantalla Completa')).toBeInTheDocument();
  });

  it('handles zoom controls (in, reset, out)', () => {
    render(<InteractiveDiagram diagram={mockDiagram} />);

    const zoomInBtn = screen.getByTitle('Acercar Plano');
    const zoomOutBtn = screen.getByTitle('Alejar Plano');
    const zoomResetBtn = screen.getByTitle('Restablecer Escala');

    expect(zoomInBtn).toBeInTheDocument();
    expect(zoomOutBtn).toBeInTheDocument();
    expect(zoomResetBtn).toBeInTheDocument();

    // Comprobar que no arroja errores al hacer clic en los controles
    fireEvent.click(zoomInBtn);
    fireEvent.click(zoomResetBtn);
    fireEvent.click(zoomOutBtn);
  });
});
