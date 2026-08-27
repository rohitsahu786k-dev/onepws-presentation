import { useLayoutEffect, useRef, useState } from "react";

/**
 * The presentation is authored against a fixed 1920x1080 design canvas.
 * Every scene is laid out in that coordinate space and the whole stage is
 * scaled as a single unit to fit the available box, so a slide looks identical
 * at any window size, browser zoom level or device pixel ratio.
 */
export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;
const MOBILE_VIRTUAL_LANDSCAPE_MAX_WIDTH = 920;

export function useStageScale<T extends HTMLElement>() {
  const frameRef = useRef<T | null>(null);
  const [layout, setLayout] = useState({ scale: 1, virtualLandscape: false });

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    function measure() {
      const node = frameRef.current;
      if (!node) {
        return;
      }

      const { height, width } = node.getBoundingClientRect();
      if (width <= 0 || height <= 0) {
        return;
      }

      const virtualLandscape = width < height && width <= MOBILE_VIRTUAL_LANDSCAPE_MAX_WIDTH;
      const nextScale = virtualLandscape
        ? Math.min(width / STAGE_HEIGHT, height / STAGE_WIDTH)
        : Math.min(width / STAGE_WIDTH, height / STAGE_HEIGHT);

      setLayout((current) =>
        Math.abs(current.scale - nextScale) < 0.0001 && current.virtualLandscape === virtualLandscape
          ? current
          : { scale: nextScale, virtualLandscape },
      );
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(frame);

    // Browser zoom and mobile pinch/URL-bar changes do not always resize the
    // observed box, so track the visual viewport as well.
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.visualViewport?.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, []);

  return { frameRef, scale: layout.scale, virtualLandscape: layout.virtualLandscape };
}
