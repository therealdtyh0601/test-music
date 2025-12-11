// HOYO Cosmic — Star Rail–style cosmic drift
// 30s loop: deep pad + cosmic arp + star trail shimmer

export const MusicPack = [
  {
    id: "hoyo_cosmic_drift",
    label: "HOYO · Cosmic Drift (30s)",

    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const out = masterGain || audioCtx.destination;

      const mainGain = audioCtx.createGain();
      mainGain.gain.value = 0.34;
      mainGain.connect(out);

      const LOOP_MS = 30000;

      // ------------------------
      // 1) Deep cosmic PAD
      // ------------------------
      const padGain = audioCtx.createGain();
      padGain.gain.value = 0.23;
      padGain.connect(mainGain);

      const padLow = audioCtx.createOscillator();
      padLow.type = "sine";
      const padHigh = audioCtx.createOscillator();
      padHigh.type = "triangle";

      padLow.connect(padGain);
      padHigh.connect(padGain);

      // roots roughly around D# minor / F# minor
      const padRoots = [
        155.56, // D#3
        184.99, // F#3
        207.65, // G#3
        184.99  // F#3
      ];
      const padFifths = [
        233.08, // A#3
        277.18, // C#4
        311.13, // D#4
        277.18  // C#4
      ];
      let padIndex = 0;
      const PAD_STEP_MS = 7000; // 4 chords ~28s

      function setPadChord(i) {
        const t = audioCtx.currentTime;
        padLow.frequency.setValueAtTime(padRoots[i], t);
        padHigh.frequency.setValueAtTime(padFifths[i], t);
      }
      setPadChord(padIndex);

      const padInterval = setInterval(() => {
        padIndex = (padIndex + 1) % padRoots.length;
        setPadChord(padIndex);
      }, PAD_STEP_MS);

      // Slight drifting detune, star-rail vibe
      const driftGain = audioCtx.createGain();
      driftGain.gain.value = 18;
      driftGain.connect(padLow.detune);
      driftGain.connect(padHigh.detune);

      const driftLFO = audioCtx.createOscillator();
      driftLFO.type = "sine";
      driftLFO.frequency.value = 0.04; // ~25s swell
      driftLFO.connect(driftGain);

      // ------------------------
      // 2) Cosmic ARPEGGIO (pixel-sci-fi)
      // ------------------------
      const arpGain = audioCtx.createGain();
      arpGain.gain.value = 0.13;
      arpGain.connect(mainGain);

      const arp = audioCtx.createOscillator();
      arp.type = "square";
      arp.connect(arpGain);

      const arpNotes = [
        415.3,  // G#4
        466.16, // A#4
        554.37, // C#5
        622.25, // D#5
        554.37, // C#5
        466.16  // A#4
      ];
      let arpIndex = 0;
      const ARP_STEP_MS = 260;

      const arpInterval = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = arpNotes[arpIndex];

        arp.frequency.setValueAtTime(freq, t);
        // pluck envelope
        arpGain.gain.cancelScheduledValues(t);
        arpGain.gain.setValueAtTime(0.0, t);
        arpGain.gain.linearRampToValueAtTime(0.12, t + 0.05);
        arpGain.gain.exponentialRampToValueAtTime(0.025, t + 0.30);

        arpIndex = (arpIndex + 1) % arpNotes.length;
      }, ARP_STEP_MS);

      // ------------------------
      // 3) Star trail particle shimmer
      // ------------------------
      const shimmerGain = audioCtx.createGain();
      shimmerGain.gain.value = 0.028;
      shimmerGain.connect(mainGain);

      const shimmer = audioCtx.createOscillator();
      shimmer.type = "square";
      shimmer.frequency.value = 1975.53; // B6

      const shimmerLFOGain = audioCtx.createGain();
      shimmerLFOGain.gain.value = 0.02;
      shimmerLFOGain.connect(shimmerGain.gain);

      const shimmerLFO = audioCtx.createOscillator();
      shimmerLFO.type = "sine";
      shimmerLFO.frequency.value = 0.2;
      shimmerLFO.connect(shimmerLFOGain);

      shimmer.connect(shimmerGain);

      // ------------------------
      // start all
      // ------------------------
      padLow.start();
      padHigh.start();
      driftLFO.start();
      arp.start();
      shimmer.start();
      shimmerLFO.start();

      let stopTimer = null;
      if (!loop) {
        stopTimer = setTimeout(stopAll, LOOP_MS);
      }

      function stopAll() {
        clearInterval(padInterval);
        clearInterval(arpInterval);
        if (stopTimer) clearTimeout(stopTimer);

        try {
          padLow.stop();
          padHigh.stop();
          driftLFO.stop();
          arp.stop();
          shimmer.stop();
          shimmerLFO.stop();
        } catch (e) {}

        mainGain.disconnect();
        padGain.disconnect();
        arpGain.disconnect();
        shimmerGain.disconnect();
      }

      return stopAll;
    }
  }
];
