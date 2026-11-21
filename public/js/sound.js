// KVIZBOX BLUE-RED – Arcade Pub Quiz Sound Engine (Web Audio API)
class KvizSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('kvizbox_muted') === '1';
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('kvizbox_muted', this.muted ? '1' : '0');
    return this.muted;
  }

  playTone(freq, duration, type = 'sine', volume = 0.18, delay = 0, freqEnd = null) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Physical arcade button click
  buttonClick(color = 'red') {
    const base = color === 'red' ? 320 : 410;
    this.playTone(base, 0.08, 'triangle', 0.22, 0, base * 1.4);
    this.playTone(120, 0.05, 'square', 0.08, 0);
  }

  // "FELKÉSZÜLNI" 3-2-1 countdown beep
  readyBeep(num) {
    if (num <= 1) {
      this.playTone(880, 0.28, 'sawtooth', 0.16, 0);
      this.playTone(1174.66, 0.35, 'triangle', 0.18, 0.06);
    } else {
      this.playTone(587.33, 0.18, 'triangle', 0.18, 0);
    }
  }

  // Alarm clock tick during question / decision
  tick(urgent = false) {
    if (urgent) {
      this.playTone(980, 0.07, 'square', 0.11, 0);
      this.playTone(1320, 0.07, 'square', 0.11, 0.12);
    } else {
      this.playTone(760, 0.045, 'triangle', 0.09, 0);
    }
  }

  // Green checkmark – Correct answer chime
  correct() {
    this.playTone(523.25, 0.14, 'triangle', 0.22, 0);      // C5
    this.playTone(659.25, 0.14, 'triangle', 0.22, 0.09);   // E5
    this.playTone(783.99, 0.18, 'triangle', 0.24, 0.18);   // G5
    this.playTone(1046.5, 0.42, 'sine', 0.24, 0.27);       // C6
  }

  // Red X – Wrong / Timeout buzzer
  wrong() {
    this.playTone(210, 0.32, 'sawtooth', 0.2, 0, 140);
    this.playTone(155, 0.48, 'sawtooth', 0.22, 0.18, 95);
  }

  // Decision screen "VÁLASSZON!" intro
  decisionOpen() {
    this.playTone(440, 0.12, 'triangle', 0.16, 0);
    this.playTone(554.37, 0.12, 'triangle', 0.16, 0.1);
    this.playTone(659.25, 0.22, 'triangle', 0.18, 0.2);
  }

  // MEGÁLL (Stop / Lock in score) cash-out fanfare
  cashOut() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.22, 'triangle', 0.2, idx * 0.08);
    });
  }

  // Category picker appeared
  categoryPick() {
    this.playTone(493.88, 0.09, 'sine', 0.15, 0);
    this.playTone(659.25, 0.12, 'sine', 0.16, 0.08);
  }

  // Game Over / Victory podium
  victory() {
    const melody = [
      [523.25, 0.14, 0],
      [659.25, 0.14, 0.13],
      [783.99, 0.14, 0.26],
      [1046.5, 0.3, 0.39],
      [783.99, 0.12, 0.62],
      [1046.5, 0.55, 0.74]
    ];
    for (const [freq, dur, delay] of melody) {
      this.playTone(freq, dur, 'triangle', 0.22, delay);
    }
  }
}

window.kvizSound = new KvizSoundEngine();
