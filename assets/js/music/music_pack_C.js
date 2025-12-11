// HOYO Adventure — hopeful overworld vibe, gentle pulse
// 30s loop: warm pad + upbeat arp + subtle "step" bass

export const MusicPack = [
  {
    id: "hoyo_adventure_route",
    label: "HOYO · Adventure Route (30s)",

    play(audioCtx, opts = {}) {
      const { masterGain, loop = true } = opts;
      const out = masterGain || audioCtx.destination;

      const mainGain = audioCtx.createGain();
      mainGain.gain.value = 0.34;
      mainGain.connect(out);

      const LOOP_MS = 30000;

      // ------------------------
      // 1) Warm pad (C major / hopeful)
      // ------------------------
      const padGain = audioCtx.createGain();
      padGain.gain.value = 0.22;
      padGain.connect(mainGain);

      const pad1 = audioCtx.createOscillator();
      pad1.type = "triangle";
      const pad2 = audioCtx.createOscillator();
      pad2.type = "sine";
      pad1.connect(padGain);
      pad2.connect(padGain);

      const padRoots = [
        261.63, // C4
        293.66, // D4
        329.63, // E4
        261.63  // C4
      ];
      const padFifths = [
        392.0,  // G4
        440.0,  // A4
        493.88, // B4
        392.0   // G4
      ];
      let padIndex = 0;
      const PAD_STEP_MS = 7000;

      function setPadChord(i) {
        const t = audioCtx.currentTime;
        pad1.frequency.setValueAtTime(padRoots[i], t);
        pad2.frequency.setValueAtTime(padFifths[i], t);
      }
      setPadChord(padIndex);

      const padInterval = setInterval(() => {
        padIndex = (padIndex + 1) % padRoots.length;
        setPadChord(padIndex);
      }, PAD_STEP_MS);

      // gentle slow detune
      const padLFOGain = audioCtx.createGain();
      padLFOGain.gain.value = 10;
      padLFOGain.connect(pad1.detune);
      padLFOGain.connect(pad2.detune);

      const padLFO = audioCtx.createOscillator();
      padLFO.type = "sine";
      padLFO.frequency.value = 0.06;
      padLFO.connect(padLFOGain);

      // ------------------------
      // 2) Upbeat ARPEGGIO
      // ------------------------
      const arpGain = audioCtx.createGain();
      arpGain.gain.value = 0.15;
      arpGain.connect(mainGain);

      const arp = audioCtx.createOscillator();
      arp.type = "square";
      arp.connect(arpGain);

      const arpNotes = [
        523.25, // C5
        659.25, // E5
        783.99, // G5
        659.25, // E5
        587.33, // D5
        523.25  // C5
      ];
      let arpIndex = 0;
      const ARP_STEP_MS = 230;

      const arpInterval = setInterval(() => {
        const t = audioCtx.currentTime;
        const freq = arpNotes[arpIndex];
        arp.frequency.setValueAtTime(freq, t);

        // pluck
        arpGain.gain.cancelScheduledValues(t);
        arpGain.gain.setValueAtTime(0.0, t);
        arpGain.gain.linearRampToValueAtTime(0.16, t + 0.04);
        arpGain.gain.exponentialRampToValueAtTime(0.03, t + 0.25);

        arpIndex = (arpIndex + 1) % arpNotes.length;
      }, ARP_STEP_MS);

      // ------------------------
      // 3) Subtle "step" bass pulse
      // ------------------------
      const bassGain = audioCtx.createGain();
      bassGain.gain.value = 0.11;
      bassGain.connect(mainGain);

      const bass = audioCtx.createOscillator();
      bass.type = "square";
      bass.frequency.value = 130.81; // C3
      bass.connect(bassGain);

      const BASS_STEP_MS = 460; // aligns loosely w/ arp, gives walk feel

      const bassInterval = setInterval(() => {
        const t = audioCtx.currentTime;
        // short pulse envelope
        bassGain.gain.cancelScheduledValues(t);
        bassGain.gain.setValueAtTime(0.0, t);
        bassGain.gain.linearRampToValueAtTime(0.11, t + 0.03);
        bassGain.gain.exponentialRampToValueAtTime(0.02, t + 0.18);
      }, BASS_STEP_MS);

      // ------------------------
      // 4) Airy top shimmer (very light)
      // ------------------------
      const shimmerGain = audioCtx.createGain();
      shimmerGain.gain.value = 0.018;
      shimmerGain.connect(mainGain);

      const shimmer = audioCtx.createOscillator();
      shimmer.type = "triangle";
      shimmer.frequency.value = 1760.0; // A6
      shimmer.connect(shimmerGain);

      const shimmerLFOGain = audioCtx.createGain();
      shimmerLFOGain.gain.value = 0.012;
      shimmerLFOGain.connect(shimmerGain.gain);

      const shimmerLFO = audioCtx.createOscillator();
      shimmerLFO.type = "sine";
      shimmerLFO.frequency.value = 0.18;
      shimmerLFO.connect(shimmerLFOGain);

      // ------------------------
      // start all
      // ------------------------
      pad1.start();
      pad2.start();
      padLFO.start();
      arp.start();
      bass.start();
      shimmer.start();
      shimmerLFO.start();

      let stopTimer = null;
      if (!loop) {
        stopTimer = setTimeout(stopAll, LOOP_MS);
      }

      function stopAll() {
        clearInterval(padInterval);
        clearInterval(arpInterval);
        clearInterval(bassInterval);
        if (stopTimer) clearTimeout(stopTimer);

        try {
          pad1.stop();
          pad2.stop();
          padLFO.stop();
          arp.stop();
          bass.stop();
          shimmer.stop();
          shimmerLFO.stop();
        } catch (e) {}

        mainGain.disconnect();
        padGain.disconnect();
        arpGain.disconnect();
        bassGain.disconnect();
        shimmerGain.disconnect();
      }

      return stopAll;
    }
  }
];
