import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EngineCatalog } from '../components/EngineCatalog/EngineCatalog';
import { ENGINES_DATA } from '../data/engines';

describe('MotorExplorer - EngineCatalog Component Tests', () => {
  it('renders catalog search bar, filters, and engine cards', () => {
    const handleSelectEngine = vi.fn();
    render(<EngineCatalog engines={ENGINES_DATA} onSelectEngine={handleSelectEngine} />);

    expect(screen.getByPlaceholderText(/Buscar por motor/i)).toBeInTheDocument();
    expect(screen.getByText('Todas las Marcas')).toBeInTheDocument();
    expect(screen.getByText('Todas las Configuraciones')).toBeInTheDocument();
    expect(screen.getByText(/Torino Tornado/i)).toBeInTheDocument();
  });

  it('filters engines by architecture configuration (V8)', () => {
    const handleSelectEngine = vi.fn();
    render(<EngineCatalog engines={ENGINES_DATA} onSelectEngine={handleSelectEngine} />);

    const configSelect = screen.getByDisplayValue('Todas las Configuraciones');
    fireEvent.change(configSelect, { target: { value: 'V8' } });

    expect(screen.getByText(/Dodge GTX 318 V8/i)).toBeInTheDocument();
    expect(screen.queryByText(/Torino Tornado Interceptor/i)).not.toBeInTheDocument();
  });

  it('filters engines by search input', () => {
    const handleSelectEngine = vi.fn();
    render(<EngineCatalog engines={ENGINES_DATA} onSelectEngine={handleSelectEngine} />);

    const searchInput = screen.getByPlaceholderText(/Buscar por motor/i);
    fireEvent.change(searchInput, { target: { value: 'Nissan' } });

    expect(screen.getByText(/Nissan 2.3L Bi-Turbo Diesel/i)).toBeInTheDocument();
    expect(screen.queryByText(/Torino Tornado Interceptor/i)).not.toBeInTheDocument();
  });

  it('calls onSelectEngine when clicking on an engine card', () => {
    const handleSelectEngine = vi.fn();
    render(<EngineCatalog engines={ENGINES_DATA} onSelectEngine={handleSelectEngine} />);

    const engineCardTitle = screen.getByText(/Torino Tornado Interceptor/i);
    fireEvent.click(engineCardTitle);

    expect(handleSelectEngine).toHaveBeenCalledTimes(1);
    expect(handleSelectEngine).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'torino-tornado-230-380w' })
    );
  });
});
