// Pack A: soft, calm 8-bit exploration
// Gentle square wave melodies, slow tempo

export const MusicPack = [
  {
    id: "8bit_calm_meadow",
    label: "8-Bit Calm Meadow",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.4;
      gain.connect(outputNode);

      const osc = audioCtx.createOscillator();
      osc.type = "square";
      osc.connect(gain);

      const notes = [
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.0,  // G4
        329.63, // E4
        293.66  // D4
      ];
      let idx = 0;
      const stepMs = 650;
      const totalDuration = notes.length * stepMs;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        osc.frequency.setValueAtTime(notes[idx], t);
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc.stop();
          } catch (e) {}
          gain.disconnect();
        }, totalDuration + 200);
      }

      osc.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc.stop();
        } catch (e) {}
        gain.disconnect();
      };
    }
  },
  {
    id: "8bit_soft_river",
    label: "8-Bit Soft River",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.35;
      gain.connect(outputNode);

      const osc = audioCtx.createOscillator();
      osc.type = "square";
      osc.connect(gain);

      const notes = [
        220.0,  // A3
        246.94, // B3
        293.66, // D4
        329.63, // E4
        293.66, // D4
        246.94  // B3
      ];
      let idx = 0;
      const stepMs = 700;
      const totalDuration = notes.length * stepMs;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        osc.frequency.setValueAtTime(notes[idx], t);
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc.stop();
          } catch (e) {}
          gain.disconnect();
        }, totalDuration + 200);
      }

      osc.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc.stop();
        } catch (e) {}
        gain.disconnect();
      };
    }
  },
  {
    id: "8bit_warm_home",
    label: "8-Bit Warm Home",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.35;
      gain.connect(outputNode);

      const osc = audioCtx.createOscillator();
      osc.type = "square";
      osc.connect(gain);

      const notes = [
        261.63, // C4
        311.13, // D#4
        349.23, // F4
        415.3,  // G#4
        349.23, // F4
        311.13  // D#4
      ];
      let idx = 0;
      const stepMs = 750;
      const totalDuration = notes.length * stepMs;

      const intervalId = setInterval(() => {
        const t = audioCtx.currentTime;
        osc.frequency.setValueAtTime(notes[idx], t);
        idx = (idx + 1) % notes.length;
      }, stepMs);

      let stopTimeoutId = null;
      if (!loop) {
        stopTimeoutId = setTimeout(() => {
          clearInterval(intervalId);
          try {
            osc.stop();
          } catch (e) {}
          gain.disconnect();
        }, totalDuration + 200);
      }

      osc.start();

      return () => {
        clearInterval(intervalId);
        if (stopTimeoutId) clearTimeout(stopTimeoutId);
        try {
          osc.stop();
        } catch (e) {}
        gain.disconnect();
      };
    }
  }
];
