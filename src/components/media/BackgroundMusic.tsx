import { useSlideBackgroundMusic } from "../../hooks/useSlideBackgroundMusic";

const TRACK = "/assets/audio/en/background-music.mp3";

/**
 * Deck-wide music bed.
 *
 * Mounted once at the shell so the loop runs uninterrupted across slides: a
 * per-slide player would restart the track on every navigation. Volume stays
 * low enough that narration and the presenter sit in front of it.
 */
export function BackgroundMusic() {
  useSlideBackgroundMusic(TRACK, { volume: 0.32 });
  return null;
}
