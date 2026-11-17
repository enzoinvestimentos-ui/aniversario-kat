/**
 * Sintetizador suave via Web Audio API para tocar uma melodia acústica
 * estilo caixinha de música / piano com feltro de "Parabéns", sem depender
 * de arquivos externos.
 */

interface NoteStep {
  melodyFreq: number;
  chordFreqs?: number[];
  beats: number;
}

// Notas em Fá Maior (registro suave e acolhedor)
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const Bb4 = 466.16;
const C5 = 523.25;
const D5 = 587.33;
const F5 = 698.46;

// Acordes de acompanhamento suaves (oitava grave)
const F3 = 174.61;
const A3 = 220.0;
const Bb3 = 233.08;
const C3 = 130.81;
const E3 = 164.81;
const G3 = 196.0;

const MELODY_SEQUENCE: NoteStep[] = [
  // "Parabéns pra você"
  { melodyFreq: C4, beats: 0.75 },
  { melodyFreq: C4, beats: 0.25 },
  { melodyFreq: D4, chordFreqs: [F3, A3, C4], beats: 1 },
  { melodyFreq: C4, beats: 1 },
  { melodyFreq: F4, beats: 1 },
  { melodyFreq: E4, chordFreqs: [C3, G3, Bb3], beats: 2 },

  // "Nesta data querida"
  { melodyFreq: C4, beats: 0.75 },
  { melodyFreq: C4, beats: 0.25 },
  { melodyFreq: D4, chordFreqs: [C3, E3, G3], beats: 1 },
  { melodyFreq: C4, beats: 1 },
  { melodyFreq: G4, beats: 1 },
  { melodyFreq: F4, chordFreqs: [F3, A3, C4], beats: 2 },

  // "Muitas felicidades"
  { melodyFreq: C4, beats: 0.75 },
  { melodyFreq: C4, beats: 0.25 },
  { melodyFreq: C5, chordFreqs: [F3, A3, C4], beats: 1 },
  { melodyFreq: A4, beats: 1 },
  { melodyFreq: F4, chordFreqs: [Bb3, D4], beats: 1 },
  { melodyFreq: E4, beats: 1 },
  { melodyFreq: D4, beats: 1.5 },

  // Pausa respirada
  { melodyFreq: 0, beats: 0.5 },

  // "Muitos anos de vida"
  { melodyFreq: Bb4, beats: 0.75 },
  { melodyFreq: Bb4, beats: 0.25 },
  { melodyFreq: A4, chordFreqs: [F3, C4], beats: 1 },
  { melodyFreq: F4, beats: 1 },
  { melodyFreq: G4, chordFreqs: [C3, G3, Bb3], beats: 1 },
  { melodyFreq: F4, chordFreqs: [F3, A3, C4], beats: 2.5 },

  // Compasso de respiro antes de repetir suavemente
  { melodyFreq: 0, beats: 1.5 },
];

export class BirthdayMusicSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private lowpass: BiquadFilterNode | null = null;
  private timerId: number | null = null;
  private stepIndex = 0;
  private isPlaying = false;
  private volume = 0.35;
  private isMuted = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
      this.lowpass = this.ctx.createBiquadFilter();
      this.lowpass.type = 'lowpass';
      this.lowpass.frequency.value = 1750;
      this.lowpass.Q.value = 0.6;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;

      this.lowpass.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    return this.ctx;
  }

  private playTone(freq: number, durationSec: number, peakGain: number, isChord = false) {
    if (!this.ctx || !this.lowpass || freq <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Timbre quente estilo piano com feltro / caixinha de música
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(isChord ? 0.04 : 0.09, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec * 1.18);

    osc.connect(noteGain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(noteGain);
    noteGain.connect(this.lowpass);

    osc.start(now);
    overtone.start(now);

    const stopAt = now + durationSec * 1.25;
    osc.stop(stopAt);
    overtone.stop(stopAt);
  }

  private scheduleNextStep = () => {
    if (!this.isPlaying) return;

    const step = MELODY_SEQUENCE[this.stepIndex];
    const beatDurationSec = 0.64; // ~94 BPM, cadência calma de valsa
    const stepDurationSec = step.beats * beatDurationSec;

    if (step.melodyFreq > 0) {
      this.playTone(step.melodyFreq, Math.max(stepDurationSec, 0.55), 0.26, false);
    }

    if (step.chordFreqs && step.chordFreqs.length > 0) {
      step.chordFreqs.forEach((chordFreq) => {
        this.playTone(chordFreq, stepDurationSec * 1.65, 0.065, true);
      });
    }

    this.stepIndex = (this.stepIndex + 1) % MELODY_SEQUENCE.length;
    this.timerId = window.setTimeout(this.scheduleNextStep, stepDurationSec * 1000);
  };

  public async start(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;
    this.scheduleNextStep();
    return true;
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.04);
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.04);
    }
  }

  public dispose(): void {
    this.pause();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
    this.masterGain = null;
    this.lowpass = null;
  }
}
