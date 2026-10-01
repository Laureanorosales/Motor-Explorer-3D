/**
 * Sintetizador de audio en tiempo real para simulación de sonido de motor de combustión interna
 * Basado en Web Audio API pura (sin dependencias ni archivos de audio externos)
 */

class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isRunning: boolean = false;

  // Nodos de audio
  private masterGain: GainNode | null = null;
  private mainOsc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private rumbleOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private distortion: WaveShaperNode | null = null;

  // Estado
  private currentRpm: number = 800;
  private numCylinders: number = 4;

  public setCylinderCount(count: number) {
    this.numCylinders = Math.max(1, count);
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) : null;
      if (!AudioCtx) {
        return;
      }
      try {
        this.ctx = new AudioCtx();
      } catch {
        return;
      }

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Distorsión suave / saturación armónica de escape
      this.distortion = this.ctx.createWaveShaper();
      this.distortion.curve = this.makeDistortionCurve(18);
      this.distortion.oversample = '2x';

      // Filtro de resonancia de escape
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      this.filter.connect(this.distortion);
      this.distortion.connect(this.masterGain);

      // Oscilador 1: Armónico fundamental del motor (Pulsos de combustión)
      this.mainOsc = this.ctx.createOscillator();
      this.mainOsc.type = 'sawtooth';
      this.mainOsc.frequency.setValueAtTime(26.6, this.ctx.currentTime);

      // Oscilador 2: Sub-armónico de inercia y cigüeñal
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(13.3, this.ctx.currentTime);

      // Oscilador 3: Rugido de bajas frecuencias
      this.rumbleOsc = this.ctx.createOscillator();
      this.rumbleOsc.type = 'sine';
      this.rumbleOsc.frequency.setValueAtTime(39.9, this.ctx.currentTime);

      this.mainOsc.connect(this.filter);
      this.subOsc.connect(this.filter);
      this.rumbleOsc.connect(this.filter);

      this.mainOsc.start();
      this.subOsc.start();
      this.rumbleOsc.start();
      this.isRunning = true;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const k = typeof amount === 'number' ? amount : 20;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 0.05);
      }
    } else {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      }
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public updateRpm(rpm: number) {
    this.currentRpm = Math.max(0, Math.min(8500, rpm));
    if (this.isMuted || !this.ctx || !this.isRunning) return;

    if (rpm <= 50) {
      // Motor apagado
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      }
      return;
    }

    // Para un motor de 4 tiempos: (RPM / 60) * (numCylinders / 2) combustiones por segundo
    const baseFreq = (this.currentRpm / 60) * (this.numCylinders / 2);
    const now = this.ctx.currentTime;

    if (this.mainOsc && this.subOsc && this.rumbleOsc && this.filter && this.masterGain) {
      this.mainOsc.frequency.setTargetAtTime(baseFreq, now, 0.03);
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);
      this.rumbleOsc.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.03);

      // El filtro abre a más frecuencias altas a medida que aumentan las RPM
      const filterCutoff = 120 + (this.currentRpm / 8500) * 1200;
      this.filter.frequency.setTargetAtTime(filterCutoff, now, 0.04);

      // Volumen dinámico (más volumen y agresividad al acelerar)
      const targetGain = 0.12 + (this.currentRpm / 8500) * 0.15;
      this.masterGain.gain.setTargetAtTime(targetGain, now, 0.05);
    }
  }

  public revThrottle(onComplete?: () => void) {
    if (this.isMuted) {
      this.setMuted(false);
    }

    const startRpm = this.currentRpm;
    const targetRpm = Math.min(7800, startRpm + 4500);

    const startTime = performance.now();
    const duration = 1200; // ms

    const animateRev = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);

      let simulatedRpm: number;
      if (progress < 0.45) {
        // Aceleración violenta (WOT)
        const p = progress / 0.45;
        simulatedRpm = startRpm + (targetRpm - startRpm) * Math.sin((p * Math.PI) / 2);
      } else {
        // Desaceleración y retorno a ralentí o régimen previo
        const p = (progress - 0.45) / 0.55;
        simulatedRpm = targetRpm - (targetRpm - startRpm) * Math.sin((p * Math.PI) / 2);
      }

      this.updateRpm(simulatedRpm);

      if (progress < 1) {
        requestAnimationFrame(animateRev);
      } else {
        this.updateRpm(startRpm);
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animateRev);
  }

  public dispose() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
      this.isRunning = false;
    }
  }
}

export const engineSound = new EngineSoundSynthesizer();
