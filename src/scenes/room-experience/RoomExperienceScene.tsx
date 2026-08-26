import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SceneCanvas, SafeArea, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { usePresentation } from "../../state/PresentationProvider";
import { ArchitecturalSystemsReferenceScene, architecturalSystemChapterIds } from "./ArchitecturalSystemsReferenceScene";
import { recordRoomExperienceEvent } from "./roomAnalytics";
import { getRoomExperience, type RoomExperience, type RoomLayer, type RoomLayerMode } from "./roomExperienceConfig";
import { roomNarration } from "./roomNarration";

export function RoomExperienceScene({ chapter, fallback }: { chapter: Chapter; fallback: ReactNode }) {
  if (chapter.id === "architectural-systems" || architecturalSystemChapterIds.includes(chapter.id as (typeof architecturalSystemChapterIds)[number])) {
    return <ArchitecturalSystemsReferenceScene chapter={chapter} />;
  }

  const experience = getRoomExperience(chapter.id);
  if (!experience) {
    return <>{fallback}</>;
  }

  return <RoomExperienceStage chapter={chapter} experience={experience} />;
}

function RoomExperienceStage({ chapter, experience }: { chapter: Chapter; experience: RoomExperience }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const [activeLayerId, setActiveLayerId] = useState(experience.layers[0]?.id ?? "");
  const [activeStateId, setActiveStateId] = useState(experience.roomStates[0]?.id ?? "");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const activeLayer = useMemo(
    () => experience.layers.find((layer) => layer.id === activeLayerId) ?? experience.layers[0],
    [activeLayerId, experience.layers],
  );
  const activeState = experience.roomStates.find((roomState) => roomState.id === activeStateId) ?? experience.roomStates[0];
  const cue = roomNarration[chapter.id]?.[assembled ? 2 : 0];

  useEffect(() => {
    recordRoomExperienceEvent("architectural_journey_started", { chapterId: chapter.id, detail: experience.title });
  }, [chapter.id, experience.title]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = [
      window.setTimeout(() => setActiveStateId(experience.roomStates[1]?.id ?? activeStateId), 3_500),
      ...experience.layers.slice(0, 5).map((layer, index) =>
        window.setTimeout(() => {
          setActiveLayerId(layer.id);
          recordRoomExperienceEvent(eventForLayer(layer.mode), { chapterId: chapter.id, detail: layer.system });
        }, 7_000 + index * 6_000),
      ),
      window.setTimeout(() => setAssembled(true), Math.min(experience.autoplayMs - 8_000, 46_000)),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeStateId, chapter.id, experience.autoplayMs, experience.layers, experience.roomStates, state.mode]);

  function selectLayer(layer: RoomLayer) {
    setActiveLayerId(layer.id);
    recordRoomExperienceEvent(eventForLayer(layer.mode), { chapterId: chapter.id, detail: layer.system });
  }

  function selectState(stateId: string) {
    setActiveStateId(stateId);
    setAssembled(stateId.includes("complete"));
    recordRoomExperienceEvent(stateId.includes("complete") ? "complete_room_activated" : "room_shell_viewed", { chapterId: chapter.id, detail: stateId });
  }

  function buildRoom() {
    setAssembled(true);
    setActiveStateId(experience.roomStates.at(-1)?.id ?? activeStateId);
    recordRoomExperienceEvent("complete_room_activated", { chapterId: chapter.id, detail: experience.statement });
  }

  return (
    <SceneCanvas className={`pws-room-experience pws-room-mode-${activeLayer.mode}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "cinematic-dark"}>
      <StructuralLayer variant={activeLayer.mode.includes("floor") ? "data" : "architectural"} />
      <AmbientLayer atmosphere={assembled ? "bloom" : activeLayer.mode === "lighting-journey" ? "bloom" : "linework"} intensity="low" />
      <SafeArea className="pws-room-safe">
        <section className="pws-room-story">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PrecisionButton onClick={buildRoom} variant="primary">
              {experience.memoryMoment ? "Build the environment" : "Activate layer"}
            </PrecisionButton>
            <PrecisionButton onClick={() => setTechnicalOpen((open) => !open)}>
              {technicalOpen ? "Hide technical" : "Technical detail"}
            </PrecisionButton>
          </div>
        </section>

        <section className="pws-room-stage-wrap" aria-label={`${experience.title}: ${activeLayer.system}`}>
          <RoomStageVisual
            activeLayer={activeLayer}
            activeStateId={activeStateId}
            assembled={assembled}
            experience={experience}
            reducedMotion={reducedMotion}
          />
          <RoomLayerControls activeLayer={activeLayer} layers={experience.layers} onSelect={selectLayer} />
          {technicalOpen ? <RoomTechnicalLayer chapter={chapter} experience={experience} layer={activeLayer} /> : null}
        </section>

        <section className="pws-room-controls">
          <div>
            <p className="pws-technical-label">Architectural layers</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.layers.map((layer) => (
                <button
                  aria-pressed={activeLayer.id === layer.id}
                  className={`pws-room-layer-button ${activeLayer.id === layer.id ? "is-active" : ""}`}
                  key={layer.id}
                  onClick={() => selectLayer(layer)}
                  type="button"
                >
                  {layer.category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="pws-technical-label">Room states</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.roomStates.map((roomState) => (
                <button
                  aria-pressed={activeState.id === roomState.id}
                  className={`pws-room-state-button ${activeState.id === roomState.id ? "is-active" : ""}`}
                  key={roomState.id}
                  onClick={() => selectState(roomState.id)}
                  type="button"
                >
                  {roomState.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="pws-room-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{cue?.text ?? activeLayer.approvedClaim}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function RoomStageVisual({
  activeLayer,
  activeStateId,
  assembled,
  experience,
  reducedMotion,
}: {
  activeLayer: RoomLayer;
  activeStateId: string;
  assembled: boolean;
  experience: RoomExperience;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: assembled || reducedMotion ? 1 : 0.992 }}
      className="pws-room-stage"
      data-assembled={assembled}
      data-layer={activeLayer.mode}
      data-state={activeStateId}
      transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pws-room-floor-plane" />
      <div className="pws-room-left-wall" />
      <div className="pws-room-back-wall" />
      <div className="pws-room-ceiling-plane" />
      <div className="pws-room-video-wall" />
      <div className="pws-room-operator-zone" />
      <div className="pws-room-collab-zone" />
      <div className="pws-room-circulation-path" />
      <div className="pws-room-service-path" />
      <div className="pws-room-acoustic-field" />
      <div className="pws-room-light-field" />
      <div className="pws-room-material-field" />
      {activeLayer.mode === "exploded-room" || activeLayer.mode === "flooring-system" || activeLayer.mode === "underfloor-services" ? (
        <div className="pws-room-exploded-stack">
          {experience.layers.slice(0, 6).map((layer, index) => (
            <span key={layer.id} style={{ "--room-layer-i": index } as CSSProperties}>{layer.category}</span>
          ))}
        </div>
      ) : null}
      <div className="pws-room-layer-label">
        <strong>{activeLayer.system}</strong>
        <span>{activeLayer.spatialRole}</span>
      </div>
    </motion.div>
  );
}

function RoomLayerControls({
  activeLayer,
  layers,
  onSelect,
}: {
  activeLayer: RoomLayer;
  layers: RoomLayer[];
  onSelect: (layer: RoomLayer) => void;
}) {
  return (
    <div className="pws-room-hotspot-layer">
      {layers.slice(0, 7).map((layer, index) => (
        <button
          aria-label={`Activate ${layer.system}`}
          className={`pws-room-hotspot ${activeLayer.id === layer.id ? "is-active" : ""}`}
          key={layer.id}
          onClick={() => onSelect(layer)}
          style={{ "--room-hotspot-i": index } as CSSProperties}
          type="button"
        >
          {layer.system}
        </button>
      ))}
    </div>
  );
}

function RoomTechnicalLayer({
  chapter,
  experience,
  layer,
}: {
  chapter: Chapter;
  experience: RoomExperience;
  layer: RoomLayer;
}) {
  return (
    <div className="pws-room-technical-layer">
      <p className="pws-technical-label">Technical Layer</p>
      <h2>{layer.system}</h2>
      <p>{layer.technicalDetail}</p>
      <ul>
        {chapter.technicalLayers.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p>{chapter.presenterNotes ?? chapter.presenterTalkingPoint}</p>
      <p>{experience.claimBoundary}</p>
      <p>{layer.restrictedClaim}</p>
    </div>
  );
}

function eventForLayer(mode: RoomLayerMode) {
  switch (mode) {
    case "wall-system":
    case "perforated-panel":
      return "wall_layer_activated";
    case "video-wall-integration":
      return "video_wall_integration_viewed";
    case "ceiling-system":
      return "ceiling_layer_activated";
    case "lighting-journey":
      return "lighting_state_selected";
    case "flooring-system":
      return "floor_opened";
    case "underfloor-services":
      return "service_path_followed";
    case "acoustic-environment":
      return "acoustic_state_compared";
    case "material-coordination":
      return "material_palette_selected";
    case "spatial-zoning":
      return "room_zone_selected";
    case "collaboration-zone":
      return "collaboration_mode_activated";
    case "exploded-room":
      return "room_exploded";
    case "complete-room":
      return "complete_room_activated";
    default:
      return "room_shell_viewed";
  }
}
