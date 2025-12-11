// Pack C: more ambient, airy, less "gamey"
// Triangle & sine mix, slower movements

export const MusicPack = [
  {
    id: "ambient_cosmic_air",
    label: "Ambient Cosmic Air",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const baseGain = audioCtx.createGain();
      baseGain.gain.value = 0.28;
      baseGain.connect(outputNode);

      const osc1 = audioCtx.createOscillator();
      osc1.type = "triangle";
      osc1.connect(baseGain);

      const osc2 = audioCtx.createOscillator();
      osc2.type = "sine";
      osc2.detune.value = 15; // slight shimmer
      osc2.connect(baseGain);

      const notes = [
        220.0,  // A3
        246.94, // B3
        261.63, // C4
        293.66, // D4
        261.63  // C4
      ];
      let idx = 0;
      const stepMs = 1200;
      const totalDuration = notes.length * stepMs * 2;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = notes[idx];
        osc1.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq / 2, t); // lower pad
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {}
          baseGain.disconnect();
        }, totalDuration + 400);
      }

      osc1.start();
      osc2.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc1.stop();
          osc2.stop();
        } catch (e) {}
        baseGain.disconnect();
      };
    }
  },
  {
    id: "ambient_home_space",
    label: "Ambient Home Space",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const baseGain = audioCtx.createGain();
      baseGain.gain.value = 0.26;
      baseGain.connect(outputNode);

      const osc1 = audioCtx.createOscillator();
      osc1.type = "sine";
      osc1.connect(baseGain);

      const osc2 = audioCtx.createOscillator();
      osc2.type = "triangle";
      osc2.detune.value = -10;
      osc2.connect(baseGain);

      const notes = [
        174.61, // F3
        196.0,  // G3
        220.0,  // A3
        196.0   // G3
      ];
      let idx = 0;
      const stepMs = 1400;
      const totalDuration = notes.length * stepMs * 2;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = notes[idx];
        osc1.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq * 1.5, t);
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {}
          baseGain.disconnect();
        }, totalDuration + 400);
      }

      osc1.start();
      osc2.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc1.stop();
          osc2.stop();
        } catch (e) {}
        baseGain.disconnect();
      };
    }
  },
  {
    id: "ambient_lightstream",
    label: "Ambient Lightstream",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const baseGain = audioCtx.createGain();
      baseGain.gain.value = 0.24;
      baseGain.connect(outputNode);

      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.connect(baseGain);

      const notes = [
        261.63, // C4
        277.18, // C#4
        293.66, // D4
        311.13, // D#4
        329.63, // E4
        311.13, // D#4
        293.66  // D4
      ];
      let idx = 0;
      const stepMs = 1100;
      const totalDuration = notes.length * stepMs * 2;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = notes[idx];
        osc.frequency.setValueAtTime(freq, t);
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc.stop();
          } catch (e) {}
          baseGain.disconnect();
        }, totalDuration + 400);
      }

      osc.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc.stop();
        } catch (e) {}
        baseGain.disconnect();
      };
    }
  }
];
