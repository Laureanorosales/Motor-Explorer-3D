import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Interactive3DEngine } from '../components/Interactive3DEngine/Interactive3DEngine';
import { engineSound } from '../utils/engineSound';

describe('MotorExplorer - Interactive3DEngine & Sound Simulation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 3D engine controls, badges and dashboard panels', () => {
    render(<Interactive3DEngine engineName="Motor Test 3D" />);

    expect(screen.getByText(/MOTOR 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Cinemática Real/i)).toBeInTheDocument();
    expect(screen.getByText('Motor Test 3D')).toBeInTheDocument();
    expect(screen.getByText(/Tacómetro & Régimen/i)).toBeInTheDocument();
    expect(screen.getByText(/Despiece \/ Armado Interactivo/i)).toBeInTheDocument();
  });

  it('toggles engine running state between pause and play', () => {
    render(<Interactive3DEngine />);

    const pauseBtn = screen.getByText('Pausar Motor');
    expect(pauseBtn).toBeInTheDocument();

    fireEvent.click(pauseBtn);
    expect(screen.getByText('Arrancar Motor')).toBeInTheDocument();

    const playBtn = screen.getByText('Arrancar Motor');
    fireEvent.click(playBtn);
    expect(screen.getByText('Pausar Motor')).toBeInTheDocument();
  });

  it('adjusts RPM slider and changes displayed RPM counter', () => {
    render(<Interactive3DEngine />);

    const rpmInputs = screen.getAllByRole('slider');
    const rpmSlider = rpmInputs[0]; // Primer slider = Tacómetro / RPM

    fireEvent.change(rpmSlider, { target: { value: '4500' } });
    expect(screen.getByText('4.500')).toBeInTheDocument();
  });

  it('toggles engine sound mute and unmute', () => {
    const soundSpy = vi.spyOn(engineSound, 'setMuted');
    render(<Interactive3DEngine />);

    const soundBtn = screen.getByTitle(/Activar Sonido del Motor/i);
    fireEvent.click(soundBtn);

    expect(soundSpy).toHaveBeenCalledWith(false);
    expect(screen.getByText('Sonido: ON')).toBeInTheDocument();

    fireEvent.click(soundBtn);
    expect(soundSpy).toHaveBeenCalledWith(true);
    expect(screen.getByText('Sonido: Mute')).toBeInTheDocument();
  });

  it('triggers WOT throttle rev acceleration and surges RPM to 6,800', () => {
    render(<Interactive3DEngine />);

    const throttleBtn = screen.getByText('¡Acelerar a Fondo!');
    fireEvent.click(throttleBtn);

    expect(screen.getByText('6.800')).toBeInTheDocument();
  });

  it('controls exploded view assembly slider and preset buttons', () => {
    render(<Interactive3DEngine />);

    const explodeBtn = screen.getByText('Vista Explosionada (100%)');
    fireEvent.click(explodeBtn);
    expect(screen.getByText('100%')).toBeInTheDocument();

    const assembleBtn = screen.getByText('Armar Todo (0%)');
    fireEvent.click(assembleBtn);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('switches camera view presets without errors', () => {
    render(<Interactive3DEngine />);

    const frontBtn = screen.getByText('Frente');
    const sideBtn = screen.getByText('Lateral');
    const topBtn = screen.getByText('Superior');
    const isoBtn = screen.getByText('Isométrica');

    fireEvent.click(frontBtn);
    fireEvent.click(sideBtn);
    fireEvent.click(topBtn);
    fireEvent.click(isoBtn);
  });

  it('calls onSelectPart when clicking glossary link in inspector', () => {
    const handleSelectPart = vi.fn();
    render(<Interactive3DEngine onSelectPart={handleSelectPart} />);

    const glossaryLink = screen.getByText('Ver diagnóstico en glosario');
    fireEvent.click(glossaryLink);

    expect(handleSelectPart).toHaveBeenCalledTimes(1);
    expect(handleSelectPart).toHaveBeenCalledWith(expect.objectContaining({ id: 'turbocharger' }));
  });

  it('switches engine architecture between I4, I6, V8, V6 and I3', () => {
    render(<Interactive3DEngine />);

    // Por defecto inicia en I4
    expect(screen.getAllByText(/4 Cilindros en Línea/i).length).toBeGreaterThan(0);

    // Cambiar a 6 en línea (Torino / Falcon / Chevy)
    const i6Btn = screen.getByText(/6 en Línea/i);
    fireEvent.click(i6Btn);
    expect(screen.getAllByText(/6 Cilindros en Línea/i).length).toBeGreaterThan(0);

    // Cambiar a V8 Muscle
    const v8Btn = screen.getByText(/V8 American Muscle/i);
    fireEvent.click(v8Btn);
    expect(screen.getAllByText(/V8 American Muscle/i).length).toBeGreaterThan(0);

    // Cambiar a V6 Biturbo
    const v6Btn = screen.getByText(/V6 Biturbo a 60°/i);
    fireEvent.click(v6Btn);
    expect(screen.getAllByText(/V6 Biturbo a 60°/i).length).toBeGreaterThan(0);

    // Cambiar a 3 Cilindros
    const i3Btn = screen.getByText(/3 Cilindros Turbo/i);
    fireEvent.click(i3Btn);
    expect(screen.getAllByText(/3 Cilindros en Línea/i).length).toBeGreaterThan(0);
  });

  it('initializes with specific architecture when engineConfig prop is provided', () => {
    render(<Interactive3DEngine engineConfig="Inline-6" engineName="Torino 380W" />);

    expect(screen.getByText(/6 Cilindros en Línea/i)).toBeInTheDocument();
    expect(screen.getByText('Torino 380W')).toBeInTheDocument();
  });
});

