import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('MotorExplorer - App Integration & User Flows', () => {
  it('renders application with default Catalog tab and switches to Interactive Diagram tab', () => {
    render(<App />);

    // Verifica que el header y catálogo inicial estén presentes
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/MOTOREXPLORER/i);
    expect(screen.getByText('Catálogo Motores')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar por motor/i)).toBeInTheDocument();

    // Cambiar a la pestaña de Diagrama Interactivo
    const interactiveTabBtn = screen.getByText('Explorador 3D / SVG');
    fireEvent.click(interactiveTabBtn);

    // Modo inicial: Simulador 3D en Movimiento & Despiece
    expect(screen.getByText(/Simulador 3D en Movimiento & Despiece/i)).toBeInTheDocument();
    expect(screen.getByText(/Tacómetro & Régimen/i)).toBeInTheDocument();
    expect(screen.getByText(/Despiece \/ Armado Interactivo/i)).toBeInTheDocument();

    // Cambiar al modo de Láminas Técnicas CAD
    const blueprintsTabBtn = screen.getByText(/Láminas Técnicas CAD & Hotspots/i);
    fireEvent.click(blueprintsTabBtn);

    expect(screen.getByText(/Seleccionar Lámina de Plano CAD/i)).toBeInTheDocument();
    expect(screen.getByText(/CAD FULL HD 1080p/i)).toBeInTheDocument();

    // Cambiar arquitectura dentro de las láminas CAD
    const v6Btn = screen.getByText(/V6 Turbo Diésel \(Amarok V6, Ranger V6\)/i);
    fireEvent.click(v6Btn);
    expect(screen.getByRole('heading', { level: 3, name: /Motor V6 Turbo Diésel/i })).toBeInTheDocument();
  });

  it('switches to Glossary tab and displays detailed part information', () => {
    render(<App />);

    const glossaryTabBtn = screen.getByText('Glosario Piezas');
    fireEvent.click(glossaryTabBtn);

    expect(screen.getByText('Glosario Técnico de Componentes Mecánicos')).toBeInTheDocument();

    // Seleccionar una pieza de la lista
    const cigueñalItem = screen.getByText('Cigüeñal');
    fireEvent.click(cigueñalItem);

    // Debe mostrar la sección de principio de funcionamiento y diagnóstico
    expect(screen.getByText('Descripción y Principio de Funcionamiento')).toBeInTheDocument();
    expect(screen.getByText('Diagnóstico y Fallas Habituales')).toBeInTheDocument();
  });

  it('opens and closes EngineDetailModal when selecting an engine from the catalog', () => {
    render(<App />);

    // Clic en la primera tarjeta de motor del catálogo
    const exploreButtons = screen.getAllByText('Explorar Esquema y Piezas');
    expect(exploreButtons.length).toBeGreaterThan(0);
    fireEvent.click(exploreButtons[0]);

    // Modal abierto: verificar presencia de tabs dentro del modal
    expect(screen.getByText('Diagrama Interactivo (SVG)')).toBeInTheDocument();

    // Cerrar modal
    const closeBtn = screen.getByRole('button', { name: '' });
    fireEvent.click(closeBtn);

    // El catálogo sigue disponible
    expect(screen.getByPlaceholderText(/Buscar por motor/i)).toBeInTheDocument();
  });
});
