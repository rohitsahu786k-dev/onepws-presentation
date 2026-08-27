import { useEffect, useRef } from "react";

type Options = {
  /** 0..1. Kept low so narration and the presenter stay in front of it. */
  volume?: number;
  /** Set false to leave the slide silent, e.g. while a preference is off. */
  enabled?: boolean;
  /** Seconds of fade, so the loop does not snap in or cut out. */
  fadeSeconds?: number;
};

const INTERACTIONS = ["pointerdown", "pointerup", "click", "keydown", "touchstart", "pws-audio-unlock"] as const;

/**
 * Loops a bed of music for as long as the slide is on screen.
 *
 * Browsers refuse audio that starts without a user gesture, which is exactly
 * what happens when a slide is opened by its own URL. The loop therefore tries
 * to start immediately and, if that is refused, waits for the first click or
 * key press and starts then. It always stops when the slide is left, so the
 * music never carries into the next one.
 */
export function useSlideBackgroundMusic(src: string | null, { volume = 0.1, enabled = true, fadeSeconds = 1.2 }: Options = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src || !enabled) {
      return undefined;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    let cancelled = false;
    let fadeTimer: number | null = null;

    const fadeTo = (target: number, onDone?: () => void) => {
      if (fadeTimer) {
        window.clearInterval(fadeTimer);
      }
      const steps = Math.max(1, Math.round((fadeSeconds * 1000) / 40));
      const from = audio.volume;
      let step = 0;
      fadeTimer = window.setInterval(() => {
        step += 1;
        audio.volume = Math.min(1, Math.max(0, from + ((target - from) * step) / steps));
        if (step >= steps) {
          if (fadeTimer) {
            window.clearInterval(fadeTimer);
          }
          fadeTimer = null;
          onDone?.();
        }
      }, 40);
    };

    const startOnInteraction = () => {
      if (cancelled) {
        return;
      }
      void audio
        .play()
        .then(() => {
          INTERACTIONS.forEach((event) => window.removeEventListener(event, startOnInteraction));
          fadeTo(volume);
        })
        .catch(() => undefined);
    };

    void audio
      .play()
      .then(() => {
        if (!cancelled) {
          fadeTo(volume);
        }
      })
      .catch(() => {
        // Blocked until the visitor interacts; pick it up on their first input.
        INTERACTIONS.forEach((event) => window.addEventListener(event, startOnInteraction, { once: true }));
      });

    return () => {
      cancelled = true;
      INTERACTIONS.forEach((event) => window.removeEventListener(event, startOnInteraction));
      if (audio.paused) {
        if (fadeTimer) {
          window.clearInterval(fadeTimer);
        }
        audio.src = "";
        audioRef.current = null;
        return;
      }
      fadeTo(0, () => {
        audio.pause();
        audio.src = "";
      });
      audioRef.current = null;
    };
  }, [enabled, fadeSeconds, src, volume]);

  return audioRef;
}
