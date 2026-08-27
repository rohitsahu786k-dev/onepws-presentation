import type { CSSProperties, ReactNode } from "react";
import { STAGE_HEIGHT, STAGE_WIDTH, useStageScale } from "../hooks/useStageScale";

export function PresentationViewport({
  children,
  presenterPreview = false,
}: {
  children: ReactNode;
  presenterPreview?: boolean;
}) {
  const { frameRef, scale, virtualLandscape } = useStageScale<HTMLDivElement>();

  return (
    <section
      className={`relative z-10 overflow-hidden ${presenterPreview ? "h-full w-full" : "h-dvh w-dvw"}`}
      data-virtual-landscape={virtualLandscape ? "true" : undefined}
    >
      <div className="pws-stage-frame" ref={frameRef}>
        <div
          aria-label="OnePWS interactive presentation stage"
          className={`presentation-stage ${presenterPreview ? "presentation-stage--preview" : ""}`}
          style={
            {
              "--stage-scale": scale,
              height: `${STAGE_HEIGHT}px`,
              width: `${STAGE_WIDTH}px`,
            } as CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
