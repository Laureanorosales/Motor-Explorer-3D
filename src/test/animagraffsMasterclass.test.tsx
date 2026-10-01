import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimagraffsMasterclass } from '../components/AnimagraffsMasterclass/AnimagraffsMasterclass';

describe('MotorExplorer - AnimagraffsMasterclass Component Tests', () => {
  it('renders masterclass header, badges, and default chapter info', () => {
    render(<AnimagraffsMasterclass />);

    expect(screen.getByText('ANIMAGRAFFS 3D MASTERCLASS')).toBeInTheDocument();
    expect(screen.getByText(/Análisis Cinemático & Funcionamiento Real del Motor/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bloque de Cilindros & Bancadas/i).length).toBeGreaterThan(0);
  });

  it('selects and updates active chapter when clicked from chapter list', () => {
    render(<AnimagraffsMasterclass />);

    // Click on "Carrera de Admisión (Intake)"
    const intakeChapter = screen.getByText('Carrera de Admisión (Intake)');
    fireEvent.click(intakeChapter);

    // Verify detail title and description update
    const activeTitles = screen.getAllByText('Carrera de Admisión (Intake)');
    expect(activeTitles.length).toBeGreaterThan(0);
    expect(screen.getByText(/Apertura sincronizada de las válvulas de admisión/i)).toBeInTheDocument();

    // Verify iframe receives updated time
    const iframe = screen.getByTitle('Animagraffs - How a Car Engine Works') as HTMLIFrameElement;
    expect(iframe.src).toContain('start=52');
  });

  it('invokes onSwitchTo3D when action button is clicked', () => {
    const handleSwitch = vi.fn();
    render(<AnimagraffsMasterclass onSwitchTo3D={handleSwitch} />);

    const switchBtn = screen.getByRole('button', { name: /Interactuar en Simulador 3D/i });
    fireEvent.click(switchBtn);

    expect(handleSwitch).toHaveBeenCalledTimes(1);
  });
});
