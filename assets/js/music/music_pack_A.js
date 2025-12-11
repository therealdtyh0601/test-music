// Terra-Domus Signature Sound
// Ambient Pad + Pixel Arp + Star-Trail shimmer
// 30-second cosmic exploration loop

export const MusicPack = [
  {
    id: "terra_startrail_theme",
    label: "Terra-Domus Startrail Explorer (30s Loop)",

    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const out = masterGain || audioCtx.destination;

      // Master bus
      const mix = audioCtx.createGain();
      mix.gain.value = 0.32;
      mix.connect(out);

      // --------------------------
      // 1) Ambient PAD (triangle + sine)
      // --------------------------
      const padGain = audioCtx.createGain();
      padGain.gain.value = 0.22;
      padGain.connect(mix);

      const pad1 = audioCtx.createOscillator();
      pad1.type = "triangle";
      pad1.frequency.value = 174.61;  // F3 base
      pad1.connect(padGain);

      const pad2 = audioCtx.createOscillator();
      pad2.type = "sine";
      pad2.frequency.value = 87.31;  // F2 supportive bass
      pad2.detune.value = 10;
      pad2.connect(padGain);

      // Slow star-trail drifting (like cosmic movement)
      const drift = audioCtx.createGain();
      drift.gain.value = 20; // detune depth
      drift.connect(pad1.detune);
      drift.connect(pad2.detune);

      const driftLFO = audioCtx.createOscillator();
      driftLFO.type = "sine";
      driftLFO.frequency.value = 0.05; // very slow ~20s wave
      driftLFO.connect(drift);

      // --------------------------
      // 2) Pixel arpeggio sparkles
      // --------------------------
      const arpGain = audioCtx.createGain();
      arpGain.gain.value = 0.12;
      arpGain.connect(mix);

      const arp = audioCtx.createOscillator();
      arp.type = "square";
      arp.connect(arpGain);

      // Cosmic ascending pattern
      const arpNotes = [
        392.00, // G4
        440.00, // A4
        523.25, // C5
        659.25, // E5
        523.25, // C5
        440.00, // A4
        392.00  // G4
      ];

      let arpIndex = 0;
      const arpMs = 260;                     // fast but soft
      const arpTotal = arpNotes.length * arpMs; // ~1.8s cycle

      const arpInterval = setInterval(() => {
        const t = audioCtx.currentTime;
        arp.frequency.setValueAtTime(arpNotes[arpIndex], t);
        arpIndex = (arpIndex + 1) % arpNotes.length;
      }, arpMs);

      // --------------------------
      // 3) Gentle shimmer (high chiptune)
      // --------------------------
      const shimmerGain = audioCtx.createGain();
      shimmerGain.gain.value = 0.05;
      shimmerGain.connect(mix);

      const shimmer = audioCtx.createOscillator();
      shimmer.type = "square";
      shimmer.frequency.value = 1760; // A6 sparkle
      shimmerGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      shimmer.connect(shimmerGain);

      // Slow pulsation of shimmer
      const shimmerLFOgain = audioCtx.createGain();
      shimmerLFOgain.gain.value = 0.015;
      shimmerLFOgain.connect(shimmerGain.gain);

      const shimmerLFO = audioCtx.createOscillator();
      shimmerLFO.type = "sine";
      shimmerLFO.frequency.value = 0.12; // ~8s pulsation
      shimmerLFO.connect(shimmerLFOgain);

      // --------------------------
      // START EVERYTHING
      // --------------------------
      pad1.start();
      pad2.start();
      driftLFO.start();
      arp.start();
      shimmer.start();
      shimmerLFO.start();

      // --------------------------
      // Loop Control
      // --------------------------
      const LOOP_DURATION = 30000; // 30 seconds

      let stopTimer = null;

      if (!loop) {
        stopTimer = setTimeout(() => {
          try {
            pad1.stop();
            pad2.stop();
            arp.stop();
            shimmer.stop();
            driftLFO.stop();
            shimmerLFO.stop();
          } catch (e) {}
          mix.disconnect();
          padGain.disconnect();
          arpGain.disconnect();
          shimmerGain.disconnect();
        }, LOOP_DURATION);
      }

      // --------------------------
      // STOP FUNCTION
      // --------------------------
      return () => {
        clearInterval(arpInterval);
        if (stopTimer) clearTimeout(stopTimer);

        try {
          pad1.stop();
          pad2.stop();
          arp.stop();
          shimmer.stop();
          driftLFO.stop();
          shimmerLFO.stop();
        } catch (e) {}

        mix.disconnect();
        padGain.disconnect();
        arpGain.disconnect();
        shimmerGain.disconnect();
      };
    }
  }
];
