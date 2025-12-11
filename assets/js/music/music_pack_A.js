// HOYO Ethereal — Liyue / Penacony soft dream ambience
// 30s loop: gentle pad + bell arp + shimmer

export const MusicPack = [
  {
    id: "hoyo_ethereal_dream",
    label: "HOYO · Ethereal Dream (30s)",

    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const out = masterGain || audioCtx.destination;

      const mainGain = audioCtx.createGain();
      mainGain.gain.value = 0.32;
      mainGain.connect(out);

      const LOOP_MS = 30000;

      // ------------------------
      // 1) Soft emotional PAD
      // ------------------------
      const padGain = audioCtx.createGain();
      padGain.gain.value = 0.25;
      padGain.connect(mainGain);

      const pad1 = audioCtx.createOscillator();
      pad1.type = "triangle";
      const pad2 = audioCtx.createOscillator();
      pad2.type = "sine";
      pad1.connect(padGain);
      pad2.connect(padGain);

      // Chord roots (approx Fmaj7 → Gsus2 → Am(add9) → Fmaj7)
      const padRoots = [
        174.61, // F3
        196.0,  // G3
        220.0,  // A3
        174.61  // F3
      ];
      const padThirds = [
        220.0,  // A3
        246.94, // B3 (sus2 flavor)
        261.63, // C4
        220.0   // A3
      ];
      let padIndex = 0;
      const PAD_STEP_MS = 8000; // 4 chords in ~32s

      function setPadChord(i) {
        const root = padRoots[i];
        const third = padThirds[i];
        const t = audioCtx.currentTime;
        pad1.frequency.setValueAtTime(root, t);
        pad2.frequency.setValueAtTime(third, t);
      }
      setPadChord(padIndex);

      const padInterval = setInterval(() => {
        padIndex = (padIndex + 1) % padRoots.length;
        setPadChord(padIndex);
      }, PAD_STEP_MS);

      // Gentle detune drift like breathing
      const padLFOGain = audioCtx.createGain();
      padLFOGain.gain.value = 15; // detune depth
      padLFOGain.connect(pad1.detune);
      padLFOGain.connect(pad2.detune);

      const padLFO = audioCtx.createOscillator();
      padLFO.type = "sine";
      padLFO.frequency.value = 0.05; // ~20s cycle
      padLFO.connect(padLFOGain);

      // ------------------------
      // 2) Bell-like ARPEGGIO
      // ------------------------
      const bellGain = audioCtx.createGain();
      bellGain.gain.value = 0.12;
      bellGain.connect(mainGain);

      const bell = audioCtx.createOscillator();
      bell.type = "sine";
      bell.connect(bellGain);

      const bellNotes = [
        523.25, // C5
        587.33, // D5
        659.25, // E5
        783.99, // G5
        659.25, // E5
        587.33  // D5
      ];
      let bellIndex = 0;
      const BELL_STEP_MS = 380; // soft arpeggio

      const bellInterval = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = bellNotes[bellIndex];
        bell.frequency.setValueAtTime(freq, t);

        // little pluck envelope
        bellGain.gain.cancelScheduledValues(t);
        bellGain.gain.setValueAtTime(0.0, t);
        bellGain.gain.linearRampToValueAtTime(0.12, t + 0.05);
        bellGain.gain.exponentialRampToValueAtTime(0.02, t + 0.30);

        bellIndex = (bellIndex + 1) % bellNotes.length;
      }, BELL_STEP_MS);

      // ------------------------
      // 3) High shimmer / air
      // ------------------------
      const shimmerGain = audioCtx.createGain();
      shimmerGain.gain.value = 0.03;
      shimmerGain.connect(mainGain);

      const shimmer = audioCtx.createOscillator();
      shimmer.type = "triangle";
      shimmer.frequency.value = 1760.0; // A6 airy

      const shimmerLFOGain = audioCtx.createGain();
      shimmerLFOGain.gain.value = 0.018;
      shimmerLFOGain.connect(shimmerGain.gain);

      const shimmerLFO = audioCtx.createOscillator();
      shimmerLFO.type = "sine";
      shimmerLFO.frequency.value = 0.15; // gentle shimmer pulse
      shimmerLFO.connect(shimmerLFOGain);

      shimmer.connect(shimmerGain);

      // ------------------------
      // start all
      // ------------------------
      pad1.start();
      pad2.start();
      padLFO.start();
      bell.start();
      shimmer.start();
      shimmerLFO.start();

      let stopTimer = null;
      if (!loop) {
        stopTimer = setTimeout(stopAll, LOOP_MS);
      }

      function stopAll() {
        clearInterval(padInterval);
        clearInterval(bellInterval);
        if (stopTimer) clearTimeout(stopTimer);

        try {
          pad1.stop();
          pad2.stop();
          padLFO.stop();
          bell.stop();
          shimmer.stop();
          shimmerLFO.stop();
        } catch (e) {}

        mainGain.disconnect();
        padGain.disconnect();
        bellGain.disconnect();
        shimmerGain.disconnect();
      }

      return stopAll;
    }
  }
];
