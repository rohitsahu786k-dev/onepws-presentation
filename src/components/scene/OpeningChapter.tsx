import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FastForward, Route, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAsset } from "../../content/assetManifest";
import type { Chapter } from "../../data/contentTypes";
import { layerTransition, motionDuration, motionEase, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import { OnePwsLogo } from "../brand/OnePwsLogo";

type Props = {
  chapter: Chapter;
};

export function OpeningChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const [soundEnabled, setSoundEnabled] = useState(state.narrationEnabled);
  const ambientRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = getAsset(chapter.media?.backgroundVideoAssetId);
  const fallback = getAsset(chapter.media?.fallbackImageAssetId);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 42, damping: 34, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 42, damping: 34, mass: 0.8 });
  const parallaxX = useTransform(springX, [-1, 1], [-7, 7]);
  const parallaxY = useTransform(springY, [-1, 1], [-4, 4]);

  useEffect(() => {
    setSoundEnabled(state.narrationEnabled);
  }, [state.narrationEnabled]);

  useEffect(() => {
    if (!soundEnabled) {
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
      gainRef.current?.gain.setTargetAtTime(0, ambientRef.current?.currentTime ?? 0, 0.08);
      try {
        oscillatorRef.current?.stop();
      } catch {
        // The oscillator may already be stopped by the previous effect cleanup.
      }
      oscillatorRef.current = null;
      ambientRef.current?.close();
      ambientRef.current = null;
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 55;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    gain.gain.setTargetAtTime(0.018, context.currentTime + 0.1, 0.9);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play().catch(() => undefined);
    }

    ambientRef.current = context;
    oscillatorRef.current = oscillator;
    gainRef.current = gain;

    return () => {
      gain.gain.setTargetAtTime(0, context.currentTime, 0.08);
      window.setTimeout(() => {
        try {
          oscillator.stop();
        } catch {
          // Stopping an already-stopped oscillator is harmless for the presentation.
        }
        void context.close();
      }, 160);
    };
  }, [soundEnabled]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function enterControlRoom() {
    dispatch({ type: "SET_PLAYING", isPlaying: true });
    dispatch({ type: "NEXT_CHAPTER" });
  }

  function skipIntro() {
    setSoundEnabled(false);
    dispatch({ type: "NEXT_CHAPTER" });
  }

  function toggleSound() {
    dispatch({ type: "UNLOCK_AUDIO" });
    setSoundEnabled((current) => !current);
    if (!state.narrationEnabled) {
      dispatch({ type: "TOGGLE_NARRATION" });
    } else if (soundEnabled) {
      dispatch({ type: "TOGGLE_NARRATION" });
    }
    void ambientRef.current?.resume?.();
    if (videoRef.current) {
      videoRef.current.muted = soundEnabled;
      videoRef.current.volume = soundEnabled ? 0 : 1;
      videoRef.current.play().catch(() => undefined);
    }
  }

  return (
    <article
      className="relative h-full w-full overflow-hidden bg-white"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-x-0 top-0 z-20 h-3 bg-control-warm" />
      <motion.div className="absolute inset-0 scale-[1.035]" style={{ x: parallaxX, y: parallaxY }}>
        {video?.src ? (
          <video
            aria-hidden="true"
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted={!soundEnabled}
            playsInline
            poster={fallback?.src}
            ref={videoRef}
            src={video.src}
          />
        ) : (
          <img
            alt={fallback?.alt ?? ""}
            className="h-full w-full object-cover"
            draggable={false}
            src={fallback?.src}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_46%,rgba(255,255,255,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_65%,rgba(255,255,255,0.92)_100%)]" />
      <ProgressiveRoomActivation reducedMotion={state.reducedMotion} />

      <div className="absolute left-10 top-10 z-30 md:left-16">
        <OnePwsLogo />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-control-text">
          Formerly Pyrotech Workspace Solutions Pvt. Ltd.
        </p>
      </div>

      <button
        aria-label={soundEnabled ? "Turn opening sound off" : "Turn opening sound on"}
        className="quiet-action absolute right-8 top-10 z-30 px-4 py-3 text-sm md:right-12"
        onClick={toggleSound}
        type="button"
      >
        {soundEnabled ? <Volume2 aria-hidden="true" size={17} /> : <VolumeX aria-hidden="true" size={17} />}
        <span>{soundEnabled ? "Sound on" : "Sound off"}</span>
      </button>

      <section className="absolute bottom-[15%] left-8 max-w-[820px] md:left-14 lg:left-20">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-bold uppercase tracking-[0.18em] text-control-warm"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.55)}
        >
          Mission-critical control rooms
        </motion.p>
        <motion.h1
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="mt-6 text-balance text-[clamp(2.8rem,5cqw,6.2rem)] font-semibold uppercase leading-[1.04] tracking-normal text-control-text"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.9)}
        >
          Control Room Consoles, Design-Build Solutions & Ergonomic Engineering
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-7 max-w-2xl text-balance text-lg leading-8 text-control-soft md:text-xl md:leading-8"
          initial={false}
          transition={revealTransition(state.reducedMotion, 1.2)}
        >
          OnePWS Private Limited brings operator consoles, ergonomic engineering and integrated room
          delivery into one precise control-room capability.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={false}
          transition={revealTransition(state.reducedMotion, 1.5)}
        >
          <button
            className="premium-action px-6 py-3"
            onClick={enterControlRoom}
            type="button"
          >
            Enter the Control Room
          </button>
          <button
            className="quiet-action border-transparent bg-transparent px-4 py-3 text-sm"
            onClick={skipIntro}
            type="button"
          >
            <FastForward aria-hidden="true" size={16} />
            Skip Introduction
          </button>
          <button
            className="quiet-action border-transparent bg-transparent px-4 py-3 text-sm"
            onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "customerPath" } })}
            type="button"
          >
            <Route aria-hidden="true" size={16} />
            Select Customer Path
          </button>
        </motion.div>
      </section>
      <footer className="absolute bottom-8 right-10 z-30 text-right text-sm text-control-muted">
        <span>OnePWS Private Limited</span>
        <span className="mx-3 text-control-line">|</span>
        <span>2026</span>
      </footer>
    </article>
  );
}

function ProgressiveRoomActivation({ reducedMotion }: { reducedMotion: boolean }) {
  const transition = (delay: number) => ({
    duration: reducedMotion ? 0.01 : motionDuration.layer,
    delay: reducedMotion ? 0 : delay,
    ease: motionEase.mechanical,
  });

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <motion.div
        animate={{ opacity: 0.58, scaleY: 1 }}
        className="absolute left-[58%] top-[23%] h-[11%] w-[24%] border border-control-line bg-white/55"
        initial={{ opacity: 0.08, scaleY: 0.82 }}
        transition={transition(0.55)}
      />
      <motion.div
        animate={{ opacity: 0.64, scaleY: 1 }}
        className="absolute left-[58%] top-[36%] h-[10%] w-[24%] border border-control-line bg-white/50"
        initial={{ opacity: 0.06, scaleY: 0.82 }}
        transition={transition(0.95)}
      />
      <motion.div
        animate={{ opacity: 0.5, scaleX: 1 }}
        className="absolute left-[53%] top-[55%] h-px w-[35%] origin-left bg-control-warm/50"
        initial={{ opacity: 0, scaleX: 0.2 }}
        transition={layerTransition(reducedMotion, 1.18)}
      />
      <motion.div
        animate={{ opacity: 0.48 }}
        className="absolute bottom-[20%] right-[9%] h-[12%] w-[35%] border border-control-line bg-white/55"
        initial={{ opacity: 0.08 }}
        transition={transition(1.55)}
      />
      <motion.div
        animate={{ opacity: 0.62, scaleX: 1 }}
        className="absolute bottom-[31%] right-[11%] h-px w-[31%] origin-left bg-control-warm/50"
        initial={{ opacity: 0, scaleX: 0.05 }}
        transition={transition(1.85)}
      />
    </div>
  );
}
