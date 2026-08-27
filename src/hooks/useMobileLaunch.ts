import { useEffect, useRef } from "react";
import { usePresentation } from "../state/PresentationProvider";

type OrientationLock = ScreenOrientation & {
  lock?: (orientation: "landscape" | "portrait" | "any" | "natural") => Promise<void>;
};

function isMobileViewport() {
  return window.matchMedia("(pointer: coarse), (max-width: 920px)").matches;
}

async function requestImmersiveLandscape() {
  if (!isMobileViewport()) {
    return;
  }

  const root = document.documentElement;
  try {
    if (!document.fullscreenElement && root.requestFullscreen) {
      await root.requestFullscreen({ navigationUI: "hide" });
    }
  } catch {
    // Some mobile browsers, notably iOS Safari, do not expose fullscreen for pages.
  }

  try {
    await (screen.orientation as OrientationLock | undefined)?.lock?.("landscape");
  } catch {
    // Orientation lock is intentionally best-effort; CSS virtual landscape is the fallback.
  }
}

export function useMobileLaunch() {
  const { dispatch } = usePresentation();
  const launchedRef = useRef(false);

  useEffect(() => {
    function launch() {
      dispatch({ type: "UNLOCK_AUDIO" });

      if (launchedRef.current) {
        return;
      }

      launchedRef.current = true;
      void requestImmersiveLandscape();
    }

    window.addEventListener("pointerdown", launch, { capture: true });
    window.addEventListener("touchstart", launch, { capture: true });
    window.addEventListener("keydown", launch, { capture: true });

    return () => {
      window.removeEventListener("pointerdown", launch, { capture: true });
      window.removeEventListener("touchstart", launch, { capture: true });
      window.removeEventListener("keydown", launch, { capture: true });
    };
  }, [dispatch]);
}
