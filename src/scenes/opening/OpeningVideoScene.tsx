import { RotateCcw, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Asset } from "../../data/contentTypes";
import { OnePwsLogo } from "../../components/brand/OnePwsLogo";

type OpeningVideoSceneProps = {
  asset: Asset;
  onComplete: () => void;
  onFallback: () => void;
  onReplay?: () => void;
  onSkip: () => void;
};

export function OpeningVideoScene({ asset, onComplete, onFallback, onReplay, onSkip }: OpeningVideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = muted;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt
        .then(() => setHasStarted(true))
        .catch(() => {
          video.muted = true;
          setMuted(true);
          video.play().then(() => setHasStarted(true)).catch(onFallback);
        });
    }
  }, [muted, onFallback]);

  function replayVideo() {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().then(() => setHasStarted(true)).catch(onFallback);
    }
    onReplay?.();
  }

  function startWithSound() {
    const video = videoRef.current;
    setMuted(false);
    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = 1;
    video.play().then(() => setHasStarted(true)).catch(onFallback);
  }

  function toggleSound() {
    const video = videoRef.current;
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (!video) {
      return;
    }

    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 1;
    if (!nextMuted) {
      video.play().then(() => setHasStarted(true)).catch(onFallback);
    }
  }

  return (
    <section className="pws-opening-video-scene" aria-label="OnePWS opening video">
      <video
        aria-label={asset.alt ?? "OnePWS opening video"}
        className="pws-opening-video"
        onCanPlay={() => setHasStarted(true)}
        onEnded={onComplete}
        onError={onFallback}
        playsInline
        preload="auto"
        ref={videoRef}
        src={asset.src}
      />
      <div className="pws-opening-video-vignette" />
      <div className="pws-opening-video-logo">
        <OnePwsLogo compact lightOnDark />
      </div>
      {!hasStarted ? (
        <button className="pws-opening-video-start" onClick={startWithSound} type="button">
          Start with sound
        </button>
      ) : null}
      <div className="pws-opening-video-controls" aria-label="Opening video controls">
        <button
          aria-label="Continue to the presentation"
          className="pws-opening-video-button pws-opening-video-primary"
          onClick={onSkip}
          type="button"
        >
          <SkipForward aria-hidden="true" size={16} />
          Continue
        </button>
        <button aria-label="Replay opening video" className="pws-opening-video-button" onClick={replayVideo} title="Replay opening" type="button">
          <RotateCcw aria-hidden="true" size={16} />
        </button>
        <button
          aria-label={muted ? "Unmute opening video" : "Mute opening video"}
          className="pws-opening-video-button"
          onClick={toggleSound}
          title={muted ? "Unmute opening video" : "Mute opening video"}
          type="button"
        >
          {muted ? <VolumeX aria-hidden="true" size={16} /> : <Volume2 aria-hidden="true" size={16} />}
        </button>
      </div>
    </section>
  );
}
