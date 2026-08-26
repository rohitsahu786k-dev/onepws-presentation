import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { SceneComponentProps } from "../scenes/SceneTypes";
import { OpeningExperienceScene } from "../../scenes/opening/OpeningExperienceScene";
import { ArchetypeCopyBlock, ArchetypeRuntime, ArchetypeSafe } from "./components/ArchetypeRuntime";
import {
  BeatRail,
  HotspotPanel,
  LayerList,
  ProductSilhouette,
  SceneMediaField,
  SignalPath,
  StepControls,
  StructuralBackdrop,
} from "./components/ArchetypeVisuals";

export { OpeningExperienceScene as CinematicOpeningArchetype };

const missionCriticalBeatPhases: Record<string, string> = {
  monitor: "AWARENESS",
  coordinate: "DECISION",
  respond: "RESPONSE",
};

export function ChapterTitleArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="geometry-title">
      {(runtime) => (
        <>
          <StructuralBackdrop />
          <ArchetypeSafe className="grid place-items-center">
            <div className="w-full">
              <div className="pws-section-marker" />
              <ArchetypeCopyBlock chapter={chapter} align="center" />
              <div className="mx-auto mt-8 max-w-xl">
                <BeatRail chapter={chapter} orientation="horizontal" runtime={runtime} />
              </div>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ImmersiveEnvironmentArchetype({ chapter }: SceneComponentProps) {
  const isMissionCriticalOpening = chapter.id === "mission-critical-environments";

  return (
    <ArchetypeRuntime chapter={chapter} showAssist={!isMissionCriticalOpening} variant="full-room">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="environment" />
          {isMissionCriticalOpening ? (
            <ArchetypeSafe className="pws-mission-critical-hero">
              <motion.section
                animate={{ opacity: 1, y: 0 }}
                className="pws-mission-critical-copy"
                initial={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="pws-technical-label">Mission-Critical Control Rooms</p>
                <h1>{chapter.headline}</h1>
                <p>{chapter.supportingMessage}</p>
                <div className="pws-mission-critical-beats">
                  {chapter.beats.map((beat, index) => (
                    <button
                      aria-label={`Focus on ${missionCriticalBeatPhases[beat.id] ?? beat.label}: ${beat.label}`}
                      className="pws-mission-critical-beat"
                      key={beat.id}
                      onClick={() => {
                        runtime.setActiveIndex(index);
                        runtime.markExplored(beat.id);
                      }}
                      type="button"
                    >
                      <span className="pws-mission-critical-beat-index">
                        {String(index + 1).padStart(2, "0")} - {missionCriticalBeatPhases[beat.id] ?? beat.label}
                      </span>
                      <strong>{beat.label}</strong>
                      {beat.supportingLabel ? <small>{beat.supportingLabel}</small> : null}
                    </button>
                  ))}
                </div>
              </motion.section>
            </ArchetypeSafe>
          ) : (
            <>
              <SignalPath activeIndex={runtime.activeIndex} count={3} />
              <ArchetypeSafe className="flex items-end">
                <div className="max-w-3xl">
                  <ArchetypeCopyBlock chapter={chapter} />
                  <div className="mt-6">
                    <LayerList chapter={chapter} maxVisible={3} runtime={runtime} />
                  </div>
                </div>
              </ArchetypeSafe>
            </>
          )}
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ProductHeroArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="light-studio">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="focus" />
          <ArchetypeSafe className="grid items-center gap-10 lg:grid-cols-[0.58fr_1.42fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <div className="mt-7">
                <LayerList chapter={chapter} maxVisible={4} runtime={runtime} />
              </div>
            </div>
            <ProductSilhouette activeIndex={runtime.activeIndex} chapter={chapter} />
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ProductExplodedViewArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="conceptual-layers">
      {(runtime) => (
        <>
          <StructuralBackdrop />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="pws-exploded-stage">
              {chapter.technicalLayers.slice(0, 5).map((layer, index) => (
                <button
                  className={`pws-exploded-layer ${runtime.activeIndex === index ? "is-active" : ""}`}
                  key={layer}
                  onClick={() => runtime.setActiveIndex(index)}
                  style={{ "--layer-i": index } as CSSProperties}
                  type="button"
                >
                  {layer}
                </button>
              ))}
            </div>
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <StepControls runtime={runtime} total={chapter.technicalLayers.length || 1} />
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function InteractiveHotspotArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="operator-impact">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="environment" />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[1fr_24rem]">
            <div className="pws-hotspot-field">
              {chapter.technicalLayers.slice(0, 5).map((layer, index) => (
                <button
                  aria-label={`Explore ${layer}`}
                  className={`pws-spatial-hotspot ${runtime.activeIndex === index ? "is-active" : ""}`}
                  key={layer}
                  onClick={() => {
                    runtime.setActiveIndex(index);
                    runtime.markExplored(layer);
                  }}
                  style={{ "--hotspot-i": index } as CSSProperties}
                  type="button"
                >
                  <span>{index + 1}</span>
                </button>
              ))}
            </div>
            <HotspotPanel chapter={chapter} runtime={runtime} />
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function OperatorPerspectiveArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="focus-narrowing">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="focus" />
          <div className="pws-operator-field" aria-hidden="true">
            <div className="pws-operator-focus" />
            <SignalPath activeIndex={runtime.activeIndex} count={4} />
          </div>
          <ArchetypeSafe className="grid items-center lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} />
              <div className="mt-8">
                <BeatRail chapter={chapter} runtime={runtime} />
              </div>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ProblemSolutionArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="constraint-collapse">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="data" />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <div className="mt-7">
                <StepControls runtime={runtime} total={chapter.beats.length || 1} />
              </div>
            </div>
            <div className="pws-transform-stage" data-active={runtime.activeIndex}>
              <span>Pressure</span>
              <span>Alignment</span>
              <span>Response</span>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function BeforeAfterArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="tap-toggle">
      {(runtime) => (
        <>
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[1fr_0.84fr]">
            <div className="pws-before-after-stage" data-after={runtime.activeIndex > 0}>
              <div className="pws-before-state">Before</div>
              <div className="pws-after-state">After</div>
              <button className="pws-comparison-divider" onClick={() => runtime.setActiveIndex(runtime.activeIndex > 0 ? 0 : 1)} type="button">
                Toggle
              </button>
            </div>
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <div className="mt-6">
                <LayerList chapter={chapter} maxVisible={3} runtime={runtime} />
              </div>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function SystemConnectionArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="room-ecosystem">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="data" />
          <SignalPath activeIndex={runtime.activeIndex} count={6} />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <BeatRail chapter={chapter} runtime={runtime} />
            </div>
            <div className="pws-system-node-field">
              {chapter.technicalLayers.map((layer, index) => (
                <button className="pws-system-node" key={layer} onClick={() => runtime.setActiveIndex(index)} type="button">
                  {layer}
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function DataStoryArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="progressive-chart">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="data" />
          <ArchetypeSafe className="grid items-center gap-9 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <p className="mt-6 text-xs text-[var(--pws-theme-muted)]">Source context retained from chapter content and presenter notes.</p>
            </div>
            <div className="pws-data-story-stage">
              {chapter.technicalLayers.map((layer, index) => (
                <button className="pws-data-insight" key={layer} onClick={() => runtime.setActiveIndex(index)} type="button">
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>{layer}</span>
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function FeatureOrbitArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="operator-features">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="focus" />
          <ArchetypeSafe className="grid place-items-center">
            <div className="pws-orbit-stage">
              <div className="pws-orbit-core">
                <p className="pws-technical-label">{chapter.eyebrow}</p>
                <h1>{chapter.title}</h1>
              </div>
              {chapter.technicalLayers.map((layer, index) => (
                <button
                  className={`pws-orbit-node ${runtime.activeIndex === index ? "is-active" : ""}`}
                  key={layer}
                  onClick={() => runtime.setActiveIndex(index)}
                  style={{ "--orbit-i": index, "--orbit-total": chapter.technicalLayers.length } as CSSProperties}
                  type="button"
                >
                  {layer}
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function SpatialJourneyArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="guided-path">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="light" />
          <ArchetypeSafe className="flex flex-col justify-between">
            <ArchetypeCopyBlock chapter={chapter} dense />
            <div className="pws-spatial-route">
              {chapter.beats.map((beat, index) => (
                <button className="pws-spatial-destination" key={beat.id} onClick={() => runtime.setActiveIndex(index)} type="button">
                  <span>{beat.label}</span>
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ProcessSequenceArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="delivery-path">
      {(runtime) => (
        <>
          <StructuralBackdrop />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <StepControls runtime={runtime} total={chapter.beats.length || 1} />
            </div>
            <div className="pws-process-stage">
              {chapter.beats.map((beat, index) => (
                <button className={`pws-process-step ${runtime.activeIndex === index ? "is-active" : ""}`} key={beat.id} onClick={() => runtime.setActiveIndex(index)} type="button">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{beat.label}</strong>
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function ComparisonArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="attribute-spotlight">
      {(runtime) => (
        <ArchetypeSafe className="grid items-center gap-8">
          <ArchetypeCopyBlock chapter={chapter} dense />
          <div className="pws-comparison-stage">
            {chapter.technicalLayers.slice(0, 3).map((layer, index) => (
              <button className={`pws-comparison-criterion ${runtime.activeIndex === index ? "is-active" : ""}`} key={layer} onClick={() => runtime.setActiveIndex(index)} type="button">
                {layer}
              </button>
            ))}
          </div>
        </ArchetypeSafe>
      )}
    </ArchetypeRuntime>
  );
}

export function EvidenceProofArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="verification-layer">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="data" />
          <ArchetypeSafe className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <ArchetypeCopyBlock chapter={chapter} dense />
              <p className="mt-5 text-sm text-[var(--pws-theme-muted)]">{chapter.presenterTalkingPoint}</p>
            </div>
            <div className="pws-proof-stage">
              <LayerList chapter={chapter} runtime={runtime} />
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function CustomerChoiceArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="spatial-destinations">
      {(runtime) => (
        <>
          <StructuralBackdrop variant="focus" />
          <ArchetypeSafe className="grid place-items-center">
            <div className="max-w-5xl text-center">
              <ArchetypeCopyBlock chapter={chapter} align="center" dense />
              <div className="pws-choice-destinations mt-10">
                {chapter.beats.map((beat, index) => (
                  <button className="pws-choice-destination" key={beat.id} onClick={() => runtime.setActiveIndex(index)} type="button">
                    <span>{beat.label}</span>
                    <small>{chapter.callToAction?.label ?? "Confirm route"}</small>
                  </button>
                ))}
              </div>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function VoiceGuidedArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="caption-led">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="data" />
          <ArchetypeSafe className="grid items-end">
            <motion.div className="max-w-4xl" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
              <ArchetypeCopyBlock chapter={chapter} />
              <div className="mt-8">
                <BeatRail chapter={chapter} orientation="horizontal" runtime={runtime} />
              </div>
            </motion.div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function PanoramicRoomArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="wide-room">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="environment" />
          <ArchetypeSafe className="flex flex-col justify-between">
            <ArchetypeCopyBlock chapter={chapter} dense />
            <div className="pws-panorama-strip">
              {chapter.technicalLayers.map((layer, index) => (
                <button className="pws-panorama-zone" key={layer} onClick={() => runtime.setActiveIndex(index)} type="button">
                  {layer}
                </button>
              ))}
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}

export function CinematicClosingArchetype({ chapter }: SceneComponentProps) {
  return (
    <ArchetypeRuntime chapter={chapter} variant="final-hold">
      {(runtime) => (
        <>
          <SceneMediaField chapter={chapter} treatment="environment" />
          <ArchetypeSafe className="grid place-items-center text-center">
            <div>
              <ArchetypeCopyBlock chapter={chapter} align="center" />
              <div className="mt-10 flex justify-center gap-3">
                <button className="premium-action px-5" onClick={runtime.restart} type="button">Replay closing</button>
                <button className="quiet-action px-5" onClick={runtime.completeInteraction} type="button">{chapter.callToAction?.label ?? "Continue"}</button>
              </div>
            </div>
          </ArchetypeSafe>
        </>
      )}
    </ArchetypeRuntime>
  );
}
