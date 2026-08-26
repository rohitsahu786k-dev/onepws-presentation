import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Headphones, Map } from "lucide-react";
import { getAsset } from "../../content/assetManifest";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { ClosingChapter } from "./ClosingChapter";
import { ConnectedIntelligenceChapter } from "./ConnectedIntelligenceChapter";
import { CredibilityChapter } from "./CredibilityChapter";
import { IncidentSimulationChapter } from "./IncidentSimulationChapter";
import { LogoFinaleChapter } from "./LogoFinaleChapter";
import { HumanCentredPhilosophyChapter } from "./HumanCentredPhilosophyChapter";
import { MissionControlDefinitionChapter } from "./MissionControlDefinitionChapter";
import { OperatorChallengesChapter } from "./OperatorChallengesChapter";
import { PresentationFlowSelectorChapter } from "./PresentationFlowSelectorChapter";
import { ProjectExperienceChapter } from "./ProjectExperienceChapter";
import { ProductsTransformingSpacesChapter } from "./ProductsTransformingSpacesChapter";
import { RoomBuiltToProtectChapter } from "./RoomBuiltToProtectChapter";
import { RoomEngineeredToLastChapter } from "./RoomEngineeredToLastChapter";
import { RoomSoundsRightChapter } from "./RoomSoundsRightChapter";
import { SystemDrivenExecutionChapter } from "./SystemDrivenExecutionChapter";
import { UnifiedControlRoomChapter } from "./UnifiedControlRoomChapter";
import { WhyOnePwsChapter } from "./WhyOnePwsChapter";
import { ArchitecturalSystemsReferenceScene, architecturalSystemChapterIds } from "../../scenes/room-experience/ArchitecturalSystemsReferenceScene";

const sceneImageByChapterId: Record<string, string> = {
  "mission-critical-environments": "ambient-control-room",
  "onepws-positioning": "showroom-control-room",
  "journey-roadmap": "ambient-control-room",
  "group-and-growth": "sap-source",
  "control-room-definition": "project-itms-noida-control-room",
  "operator-challenges": "project-chandigarh-control-room",
  "human-centred-philosophy": "showroom-control-room",
  "console-portfolio": "ambient-control-room",
  "ergonomic-engineering": "project-itms-noida-control-room",
  "design-build-capability": "showroom-control-room",
  "manufacturing-quality": "manufacturing-equipment-source",
  "international-compliance": "sap-source",
  "why-onepws": "project-dfcc-control-room",
  closing: "ambient-control-room",
};

const projectCredentialChapterIds = new Set([
  "project-portfolio",
  "project-credentials-chandigarh-iccc",
  "project-credentials-adani-khavda",
  "project-credentials-rtgc-andhra",
  "project-credentials-acpo-ahmedabad",
  "project-credentials-itms-noida",
  "project-credentials-shell-brunei",
  "project-credentials-metro-rail-occ",
  "project-credentials-utility-command-centre",
  "project-credentials-industrial-operations-centre",
  "project-credentials-data-centre-noc",
  "project-credentials-emergency-response-centre",
  "project-credentials-airport-operations-centre",
  "project-credentials-manufacturing-control-centre",
]);

type Props = {
  chapter: Chapter;
};

export function ChapterScene({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const motionDuration = state.reducedMotion ? 0.01 : 0.72;
  const isOnePwsPositioning = chapter.id === "onepws-positioning";

  if (chapter.id === "complete-ecosystem") {
    return <ConnectedIntelligenceChapter chapter={chapter} />;
  }

  if (chapter.id === "presentation-flow-selector") {
    return <PresentationFlowSelectorChapter chapter={chapter} />;
  }

  if (chapter.id === "products-transforming-spaces") {
    return <ProductsTransformingSpacesChapter chapter={chapter} />;
  }

  if (chapter.id === "logo-finale") {
    return <LogoFinaleChapter />;
  }

  if (chapter.id === "company-at-a-glance") {
    return <CredibilityChapter chapter={chapter} />;
  }

  if (chapter.id === "system-driven-execution") {
    return <SystemDrivenExecutionChapter chapter={chapter} />;
  }

  if (chapter.id === "mission-control-definition") {
    return <MissionControlDefinitionChapter chapter={chapter} />;
  }

  if (chapter.id === "operator-challenges" || chapter.id === "poor-design-risk") {
    return <OperatorChallengesChapter chapter={chapter} />;
  }

  if (chapter.id === "human-centred-philosophy") {
    return <HumanCentredPhilosophyChapter chapter={chapter} />;
  }

  if (chapter.id === "incident-response") {
    return <IncidentSimulationChapter chapter={chapter} />;
  }

  if (projectCredentialChapterIds.has(chapter.id)) {
    return <ProjectExperienceChapter chapter={chapter} />;
  }

  if (chapter.id === "why-onepws") {
    return <WhyOnePwsChapter chapter={chapter} />;
  }

  if (chapter.id === "room-sounds-right") {
    return <RoomSoundsRightChapter chapter={chapter} />;
  }

  if (chapter.id === "room-built-to-protect") {
    return <RoomBuiltToProtectChapter chapter={chapter} />;
  }

  if (chapter.id === "room-engineered-to-last") {
    return <RoomEngineeredToLastChapter chapter={chapter} />;
  }

  if (chapter.id === "unified-control-room") {
    return <UnifiedControlRoomChapter chapter={chapter} />;
  }

  if (chapter.id === "architectural-systems" || architecturalSystemChapterIds.includes(chapter.id as (typeof architecturalSystemChapterIds)[number])) {
    return <ArchitecturalSystemsReferenceScene chapter={chapter} />;
  }

  if (chapter.id === "next-steps-closing") {
    return <ClosingChapter chapter={chapter} />;
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-white">
      <SceneArchitecture chapter={chapter} />

      <section className="absolute scene-content-safe grid grid-cols-[minmax(0,0.30fr)_minmax(0,0.70fr)] items-start mt-8 gap-[2em] [@container_stage_(max-width:1279px)]:grid-cols-1">
        <div className="scene-copy [@container_stage_(max-width:1279px)]:max-w-[44rem]">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-control-warm"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.04 }}
          >
            {chapter.eyebrow}
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="scene-title mt-6 max-w-[13ch] text-balance font-semibold tracking-normal text-control-text"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.12 }}
          >
            {chapter.headline}
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={`scene-support mt-7 max-w-3xl text-control-soft ${isOnePwsPositioning ? "!text-[clamp(1.12rem,1.2cqw,1.42rem)] !leading-[1.48]" : ""}`}
            initial={false}
            transition={{ duration: motionDuration, delay: 0.2 }}
          >
            {chapter.supportingMessage}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pws-scene-control-dock mt-7"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.28 }}
          >
            <button
              aria-label="Previous scene"
              className="pws-scene-control"
              onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
              title="Previous"
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button
              aria-label="Continue to next scene"
              className="pws-scene-control pws-scene-control-primary"
              onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
              title="Continue"
              type="button"
            >
              <ChevronRight aria-hidden="true" size={20} />
            </button>
            <button
              aria-label="Open experience map"
              className="pws-scene-control"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
              title="Experience Map"
              type="button"
            >
              <Map aria-hidden="true" size={20} />
            </button>
            {chapterVoiceover ? (
              <button
                aria-label={chapterVoiceover.src ? "Play narration" : "Show narration status"}
                className="pws-scene-control"
                onClick={() => {
                  dispatch({ type: "UNLOCK_AUDIO" });
                  voiceover.play(chapterVoiceover);
                }}
                title="Narration"
                type="button"
              >
                <Headphones aria-hidden="true" size={20} />
              </button>
            ) : null}
            <button
              aria-label="Toggle fullscreen"
              className="pws-scene-control"
              onClick={() => void toggleFullscreen()}
              title="Fullscreen"
              type="button"
            >
              <Expand aria-hidden="true" size={20} />
            </button>
          </motion.div>
        </div>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 hidden 2xl:block"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.18 }}
        >
          <div className="overflow-hidden border border-control-line bg-white shadow-control">
            <SceneImage chapter={chapter} compactVertical={isOnePwsPositioning} />
          </div>
          <div className={`${isOnePwsPositioning ? "mt-4" : "mt-5"} grid grid-cols-3 gap-2`}>
            {chapter.beats.map((beat, index) => (
              <div
                className={`border-l-2 border-control-warm/70 bg-white/70 ${
                  isOnePwsPositioning ? "min-h-[7.2rem] py-5 pl-5 pr-4" : "py-3 pl-3 pr-2"
                }`}
                key={beat.id}
              >
                <span className={`${isOnePwsPositioning ? "text-sm" : "text-xs"} font-semibold text-control-muted`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className={`mt-1 font-semibold leading-snug text-control-text ${isOnePwsPositioning ? "text-xl" : "text-sm"}`}>
                  {beat.label}
                </p>
                {beat.supportingLabel ? (
                  <p className={`mt-1 italic leading-snug text-control-muted ${isOnePwsPositioning ? "text-base" : "text-xs"}`}>
                    {beat.supportingLabel}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

        </motion.aside>
      </section>
    </article>
  );
}

function SceneImage({ chapter, compactVertical = false }: { chapter: Chapter; compactVertical?: boolean }) {
  const asset = getAsset(chapter.media?.fallbackImageAssetId ?? sceneImageByChapterId[chapter.id] ?? "ambient-control-room");

  return (
    <figure className={`relative bg-control-panel ${compactVertical ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
      {asset?.src ? (
        <img
          alt={asset.alt ?? chapter.visualNote}
          className="h-full w-full object-cover"
          draggable={false}
          src={asset.src}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm text-control-muted">
          OnePWS visual
        </div>
      )}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-control-warm" />
    </figure>
  );
}

function SceneArchitecture({ chapter }: { chapter: Chapter }) {
  const asset = getAsset(chapter.media?.fallbackImageAssetId ?? sceneImageByChapterId[chapter.id] ?? "ambient-control-room");

  return (
    <div className="absolute inset-0 overflow-hidden">
      {asset?.src ? (
        <img
          alt={asset.alt ?? chapter.visualNote}
          className="absolute inset-y-0 right-0 h-full w-[58%] object-cover opacity-35"
          draggable={false}
          src={asset.src}
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.92)_46%,rgba(255,255,255,0.72)_100%)]" />
      <div className="absolute right-[7%] top-[18%] h-[48%] w-[47%] border border-control-line/45 bg-white/30">
        <div className="absolute inset-7 grid grid-cols-4 grid-rows-3 gap-3 opacity-45">
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="border border-control-line/55 bg-white/34" key={`${chapter.id}-panel-${index}`}>
              <div className="mx-5 mt-5 h-px bg-control-warm/30" />
              <div className="mx-5 mt-3 h-px w-2/3 bg-control-line/80" />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-1/2 h-px w-full bg-control-warm/25" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-control-line/45" />
      </div>
      <div className="absolute bottom-[20%] right-[12%] h-[11%] w-[34%] border border-control-line/55 bg-white/58">
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/35" />
        <div className="absolute inset-y-4 left-[18%] w-px bg-control-line/80" />
        <div className="absolute inset-y-4 right-[18%] w-px bg-control-line/80" />
      </div>
    </div>
  );
}
