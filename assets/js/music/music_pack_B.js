// Pack B: brighter, more "route theme" energy
// Faster tempo, arpeggio-ish patterns

export const MusicPack = [
  {
    id: "pixel_route_one",
    label: "Pixel Route One",
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
        329.63, // E4
        392.0,  // G4
        493.88, // B4
        659.25  // E5
      ];
      let idx = 0;
      const stepMs = 320;
      const totalDuration = notes.length * stepMs * 2;

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
    id: "pixel_new_house",
    label: "Pixel New House Theme",
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
        329.63, // E4
        392.0,  // G4
        523.25, // C5
        392.0,  // G4
        329.63  // E4
      ];
      let idx = 0;
      const stepMs = 360;
      const totalDuration = notes.length * stepMs * 2;

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
    id: "pixel_steps",
    label: "Pixel Curious Steps",
    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const outputNode = masterGain || audioCtx.destination;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.32;
      gain.connect(outputNode);

      const osc = audioCtx.createOscillator();
      osc.type = "square";
      osc.connect(gain);

      // Simple walking bass style in C
      const notes = [
        196.0,  // G3
        220.0,  // A3
        246.94, // B3
        261.63, // C4
        246.94, // B3
        220.0   // A3
      ];
      let idx = 0;
      const stepMs = 280;
      const totalDuration = notes.length * stepMs * 2;

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
