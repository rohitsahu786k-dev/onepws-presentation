import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CloudCog,
  Eye,
  EyeOff,
  Expand,
  Globe2,
  Headphones,
  Info,
  Leaf,
  Map,
  Maximize2,
  MonitorCog,
  Network,
  Rocket,
  Route,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAsset } from "../../content/assetManifest";
import {
  connectedIntelligenceFeatures,
  connectedIntelligenceVisual,
  type ConnectedFeature,
} from "../../content/connectedIntelligenceFeatures";
import { getFeatureStory, type FeatureStoryId } from "../../content/featureStories";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { entrance, revealTransition, spatialTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { FeatureStory } from "../feature/FeatureStory";

type Props = {
  chapter: Chapter;
};

export function ConnectedIntelligenceChapter({ chapter }: Props) {
  return <ConnectedIntelligenceReferenceSlide chapter={chapter} />;
}

const advancedCapabilities = [
  {
    title: "Unified Visualization",
    body: "Critical information brought together in one operational view.",
    icon: MonitorCog,
    color: "text-red-600",
  },
  {
    title: "AI-Powered Insights",
    body: "AI surfaces patterns, anomalies and information that needs attention.",
    icon: Brain,
    color: "text-blue-600",
  },
  {
    title: "Faster Collaboration",
    body: "Teams share the same context for faster coordination.",
    icon: Network,
    color: "text-cyan-600",
  },
  {
    title: "Ergonomic Excellence",
    body: "Sightlines, reach, posture and comfort designed around the operator.",
    icon: CircleUserRound,
    color: "text-violet-600",
  },
  {
    title: "Built to Protect",
    body: "Safety, redundancy and compliance engineered into the environment.",
    icon: ShieldCheck,
    color: "text-orange-600",
  },
  {
    title: "Sustainable by Design",
    body: "Materials and systems selected for efficiency and lifecycle performance.",
    icon: Leaf,
    color: "text-green-600",
  },
  {
    title: "Continuous Intelligence",
    body: "Operational data helps improve layouts, workflows and performance.",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Predictive Maintenance",
    body: "Identify equipment and service needs before they disrupt operations.",
    icon: CloudCog,
    color: "text-cyan-600",
  },
  {
    title: "Digital Twin Ready",
    body: "Model and evaluate changes before implementing them in the live room.",
    icon: Maximize2,
    color: "text-violet-600",
  },
];

const impactItems = [
  {
    title: "Operator First",
    body: "Designed around the people making critical decisions.",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Mission Focused",
    body: "Engineered for reliability and operational performance.",
    icon: ShieldCheck,
    color: "text-green-600",
  },
  {
    title: "Future Ready",
    body: "Built to adapt as technology and requirements evolve.",
    icon: Rocket,
    color: "text-violet-600",
  },
  {
    title: "Performance Driven",
    body: "Designed to improve awareness, coordination and response.",
    icon: Globe2,
    color: "text-cyan-600",
  },
];

function ConnectedIntelligenceReferenceSlide({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const backgroundImage = getAsset("connected-intelligence-room-reference");
  const stageVisual = getAsset("ai-powered-operations-control-center");
  const motionDuration = state.reducedMotion ? 0.01 : 0.62;
  const subtleLoop = state.reducedMotion
    ? undefined
    : { duration: 5.8, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const };

  return (
    <article className="relative h-full w-full overflow-hidden bg-[#fbfcfd] text-slate-950">
      <div
        className="pointer-events-none absolute inset-0 scale-[1.06] bg-cover bg-center opacity-[0.32] blur-[7px] saturate-[1.05]"
        style={{
          backgroundImage: backgroundImage?.src ? `url('${backgroundImage.src}')` : 'none',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(239,68,68,0.10),transparent_34%),linear-gradient(135deg,rgba(248,250,252,0.78),rgba(255,255,255,0.66)_48%,rgba(241,245,249,0.74))]" />
      <div className="pointer-events-none absolute left-0 top-[9rem] h-[39rem] w-[36rem] opacity-[0.07] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />
      <motion.div
        animate={state.reducedMotion ? { opacity: 0.12 } : { opacity: [0.14, 0.32, 0.14], scale: [1, 1.08, 1] }}
        className="pointer-events-none absolute left-[29cqw] top-[32cqh] h-[22rem] w-[22rem] rounded-full bg-red-500/10 blur-[88px]"
        initial={false}
        transition={subtleLoop}
      />
      <motion.div
        animate={state.reducedMotion ? { opacity: 0.1 } : { opacity: [0.1, 0.24, 0.1], x: ["-2%", "2%", "-2%"] }}
        className="pointer-events-none absolute right-[13cqw] top-[19cqh] h-[24rem] w-[30rem] rounded-full bg-blue-500/10 blur-[96px]"
        initial={false}
        transition={state.reducedMotion ? undefined : { duration: 7.5, ease: "easeInOut", repeat: Infinity }}
      />

      <section className="absolute inset-x-[2.8rem] bottom-[6.35rem] top-[7.25rem] z-10 grid grid-rows-[minmax(0,1fr)_7.8rem] gap-4">
        <div className="grid min-h-0 grid-cols-[minmax(0,1.04fr)_minmax(36rem,0.96fr)] gap-5">
          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4">
            <motion.div animate={{ opacity: 1, y: 0 }} initial={false} transition={{ duration: motionDuration }}>
              <h1 className="max-w-[45rem] text-[clamp(2.35rem,3.02cqw,3.92rem)] font-bold leading-[1.02] tracking-normal text-slate-950 md:text-[2.5cqw]">
                One Environment.
                <span className="block">
                  Connected <span className="text-red-600">Intelligence.</span>
                </span>
              </h1>
              <div className="mt-3 h-[3px] w-16 rounded-full bg-red-600" />
              <p className="mt-3 max-w-[42rem] text-[clamp(1rem,0.98cqw,1.16rem)] font-medium leading-[1.5] text-slate-800">
                Consoles, interiors, technology and intelligence working together as one connected
                control-room environment.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative min-h-0 overflow-hidden rounded-[1.15rem] border border-white/80 bg-white/70 shadow-[0_1.2rem_3.8rem_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              initial={false}
              transition={{ duration: motionDuration, delay: 0.08 }}
            >
              {stageVisual?.src ? (
                <img
                  alt={stageVisual.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  draggable={false}
                  src={stageVisual.src}
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_46%,rgba(15,23,42,0.32))]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center px-4 pb-4" />
              <motion.div
                animate={state.reducedMotion ? { opacity: 0 } : { x: ["-110%", "112%"], opacity: [0, 0.72, 0] }}
                className="pointer-events-none absolute inset-y-0 left-0 w-[28%] skew-x-[-14deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] blur-sm"
                initial={false}
                transition={state.reducedMotion ? undefined : { duration: 3.8, delay: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 4.8 }}
              />
              <motion.div
                animate={state.reducedMotion ? { opacity: 0.18, scale: 1 } : { opacity: [0.16, 0.42, 0.16], scale: [0.92, 1.18, 0.92] }}
                className="pointer-events-none absolute left-[49%] top-[21%] h-[7.6rem] w-[7.6rem] -translate-x-1/2 rounded-full border border-blue-400/40 bg-blue-400/10 shadow-[0_0_42px_rgba(59,130,246,0.22)]"
                initial={false}
                transition={state.reducedMotion ? undefined : { duration: 4.4, ease: "easeInOut", repeat: Infinity }}
              />
              {[23, 50, 78].map((left, index) => (
                <motion.span
                  animate={state.reducedMotion ? { opacity: 0.28 } : { opacity: [0.18, 0.62, 0.18], scale: [0.8, 1.18, 0.8] }}
                  className="pointer-events-none absolute top-[45%] size-2 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.62)]"
                  initial={false}
                  key={left}
                  style={{ left: `${left}%` }}
                  transition={state.reducedMotion ? undefined : { duration: 2.8, delay: index * 0.55, ease: "easeInOut", repeat: Infinity }}
                />
              ))}
            </motion.div>
          </section>

          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]">
            <motion.div animate={{ opacity: 1, y: 0 }} initial={false} transition={{ duration: motionDuration, delay: 0.1 }}>
              <h2 className="text-[clamp(1.12rem,1.28cqw,1.48rem)] font-semibold leading-none text-slate-950">Intelligent Control Room Capabilities</h2>
              <div className="mt-2 h-[3px] w-14 rounded-full bg-red-600" />
            </motion.div>
            <div className="mt-2 grid min-h-0 grid-cols-3 grid-rows-3 gap-3">
              {advancedCapabilities.map((capability, index) => (
                <motion.div
                  animate={state.reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -3, 0] }}
                  className="flex min-h-0 flex-col pt-8 rounded-[0.95rem] border border-white/75 bg-white/76 px-3  text-center shadow-[0_1rem_2.8rem_rgba(15,23,42,0.08)] backdrop-blur-2xl"
                  initial={false}
                  key={capability.title}
                  transition={
                    state.reducedMotion
                      ? { duration: motionDuration, delay: 0.13 + index * 0.025 }
                      : { duration: 4.2, delay: 0.13 + index * 0.18, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.8 }
                  }
                  whileHover={state.reducedMotion ? undefined : { y: -5, scale: 1.015 }}
                >
                  <motion.span
                    animate={state.reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
                    className="grid place-items-center"
                    initial={false}
                    transition={state.reducedMotion ? undefined : { duration: 3.6, delay: index * 0.13, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.4 }}
                  >
                    <capability.icon aria-hidden="true" className={`mx-auto shrink-0 ${capability.color}`} size={38} strokeWidth={1.8} />
                  </motion.span>
                  <h3 className="mt-2 text-[clamp(1.08rem,0.98cqw,1.22rem)] font-semibold leading-tight text-slate-950">{capability.title}</h3>
                  <p className="mx-auto mt-1 max-w-[12.2rem] text-[clamp(0.82rem,0.78cqw,0.96rem)] font-medium leading-[1.28] text-slate-700">
                    {capability.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <motion.section
          animate={state.reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, boxShadow: ["0 1rem 3rem rgba(15,23,42,0.09)", "0 1.25rem 3.5rem rgba(15,23,42,0.12)", "0 1rem 3rem rgba(15,23,42,0.09)"] }}
          className="grid min-h-0 grid-cols-[minmax(23rem,1.15fr)_repeat(4,minmax(8.6rem,0.56fr))] items-stretch overflow-hidden rounded-[1rem] border border-white/75 bg-white/88 shadow-[0_1rem_3rem_rgba(15,23,42,0.09)] backdrop-blur-2xl"
          initial={false}
          transition={state.reducedMotion ? { duration: motionDuration, delay: 0.24 } : { duration: 5.6, delay: 0.24, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="flex min-w-0 items-center gap-4 px-5 py-3">
            <motion.div
              animate={state.reducedMotion ? { scale: 1 } : { scale: [1, 1.06, 1] }}
              className="grid size-[3.3rem] shrink-0 place-items-center rounded-full bg-red-600 text-white shadow-[0_1rem_2rem_rgba(220,38,38,0.22)]"
              initial={false}
              transition={state.reducedMotion ? undefined : { duration: 3.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }}
            >
              <Users aria-hidden="true" size={26} strokeWidth={1.9} />
            </motion.div>
            <p className="text-[clamp(0.98rem,1cqw,1.16rem)] font-medium leading-[1.36] text-slate-950">
              When the Comtrol room, workstations and technology work as one, operators can focus on what matters most - the
              <span className="text-red-600"> mission.</span>
            </p>
          </div>
          {impactItems.map((item) => (
            <div className="flex min-h-0 items-center gap-3 border-l border-slate-200/80 px-3.5 py-3" key={item.title}>
              <item.icon aria-hidden="true" className={`shrink-0 ${item.color}`} size={28} strokeWidth={1.85} />
              <div className="min-w-0">
                <h3 className="text-[clamp(0.95rem,0.86cqw,1.08rem)] font-semibold leading-tight text-slate-950">{item.title}</h3>
                <p className="mt-1 text-[clamp(0.76rem,0.7cqw,0.9rem)] font-medium leading-[1.28] text-slate-700">{item.body}</p>
              </div>
            </div>
          ))}
        </motion.section>
      </section>

      <div className="absolute bottom-[1.6rem] left-[2.8rem] z-40 flex items-center gap-3">
        <button
          aria-label="Previous"
          className="inline-flex h-14 items-center gap-3 rounded-xl border border-white/75 bg-white/78 px-5 text-sm font-semibold text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
          onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={20} />
          Previous
        </button>
        <button
          aria-label="Next"
          className="inline-flex size-14 items-center justify-center rounded-xl bg-red-600 text-white shadow-[0_16px_34px_rgba(220,38,38,0.26)] transition hover:-translate-y-0.5 hover:bg-red-700"
          onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={23} />
        </button>
        <button
          aria-label="Experience Map"
          className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/78 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
          onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
          title="Experience Map"
          type="button"
        >
          <Map aria-hidden="true" size={21} />
        </button>
        <button
          aria-label="Narration"
          className={`inline-flex size-14 items-center justify-center rounded-xl border shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 ${
            state.narrationEnabled
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-white/75 bg-white/78 text-slate-800 hover:bg-white"
          }`}
          onClick={() => dispatch({ type: "TOGGLE_NARRATION" })}
          title="Narration"
          type="button"
        >
          <Headphones aria-hidden="true" size={21} />
        </button>
        <button
          aria-label="Full Screen"
          className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/78 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
          onClick={() => void toggleFullscreen()}
          title="Full Screen"
          type="button"
        >
          <Expand aria-hidden="true" size={20} />
        </button>
      </div>
    </article>
  );
}

function LegacyConnectedIntelligenceChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [exploreId, setExploreId] = useState<FeatureStoryId | null>(null);
  const [hotspotsVisible, setHotspotsVisible] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const roomImage = getAsset(connectedIntelligenceVisual.assetId);
  const orderedFeatures = useMemo(
    () => [...connectedIntelligenceFeatures].sort((a, b) => a.tourOrder - b.tourOrder),
    [],
  );
  const activeFeature = useMemo(
    () => connectedIntelligenceFeatures.find((feature) => feature.id === activeId) ?? null,
    [activeId],
  );
  const activeTourIndex = activeFeature
    ? orderedFeatures.findIndex((feature) => feature.id === activeFeature.id)
    : -1;
  const exploredFeature = getFeatureStory(exploreId);

  useEffect(() => {
    if (tourActive && !activeFeature) {
      setActiveId(orderedFeatures[0]?.id ?? null);
    }
  }, [activeFeature, orderedFeatures, tourActive]);

  function listenToHotspot(feature: ConnectedFeature) {
    const hotspotVoiceover = getVoiceover("hotspot", feature.id);
    if (!hotspotVoiceover) {
      return;
    }

    dispatch({ type: "UNLOCK_AUDIO" });

    if (voiceover.active?.id === hotspotVoiceover.id && voiceover.status === "playing") {
      voiceover.pause();
      return;
    }

    if (voiceover.active?.id === hotspotVoiceover.id && voiceover.status === "paused") {
      voiceover.resume();
      return;
    }

    voiceover.play(hotspotVoiceover);
  }

  function startTour() {
    setHotspotsVisible(true);
    setTourActive(true);
    setActiveId(orderedFeatures[0]?.id ?? null);
  }

  function exploreFreely() {
    setHotspotsVisible(true);
    setTourActive(false);
  }

  function moveTour(direction: 1 | -1) {
    const fallbackIndex = direction === 1 ? 0 : orderedFeatures.length - 1;
    const currentIndex = activeTourIndex >= 0 ? activeTourIndex : fallbackIndex;
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), orderedFeatures.length - 1);
    setActiveId(orderedFeatures[nextIndex]?.id ?? null);
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <ConnectedRoomVisual
        activeFeature={activeFeature}
        imageAlt={roomImage?.alt}
        imageSrc={roomImage?.src}
        reducedMotion={state.reducedMotion}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.62)_38%,rgba(255,255,255,0.2)_67%,rgba(255,255,255,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,rgba(207,31,43,0.08),transparent_34%)]" />

      <section className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-20 max-w-[30rem]">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          initial={false}
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-3 text-balance text-[clamp(2.15rem,3.5cqw,4.25rem)] font-semibold leading-[0.98] text-control-text"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          One Environment. Connected Intelligence.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-lg text-sm leading-6 text-control-soft"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.2)}
        >
          Select verified and internally planned control-room capabilities without leaving the full-room view.
        </motion.p>
      </section>

      <div className="absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-30 flex max-w-[25rem] flex-wrap justify-end gap-2">
        <button
          className="quiet-action min-h-10 px-3 text-sm"
          onClick={() => {
            setHotspotsVisible((visible) => !visible);
            if (hotspotsVisible) {
              setTourActive(false);
              setActiveId(null);
            }
          }}
          type="button"
        >
          {hotspotsVisible ? <EyeOff aria-hidden="true" size={17} /> : <Eye aria-hidden="true" size={17} />}
          {hotspotsVisible ? "Hide hotspots" : "Show hotspots"}
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={startTour} type="button">
          <Route aria-hidden="true" size={17} />
          Guided hotspot tour
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={exploreFreely} type="button">
          Explore freely
        </button>
      </div>

      <AnimatePresence>
        {hotspotsVisible ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={revealTransition(state.reducedMotion)}
          >
            {orderedFeatures.map((feature) => (
              <FeatureHotspot
                feature={feature}
                isActive={activeId === feature.id}
                key={feature.id}
                onActivate={(id) => {
                  setActiveId(id);
                  if (!tourActive) {
                    setTourActive(false);
                  }
                }}
                reducedMotion={state.reducedMotion}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-[calc(var(--stage-safe-y)+5.2rem)] left-[var(--stage-safe-x)] z-20 flex max-w-[31rem] flex-wrap gap-2">
        {orderedFeatures.slice(0, 8).map((feature) => (
          <button
            className={`pointer-events-auto h-2.5 w-9 border transition ${
              feature.id === activeFeature?.id
                ? "border-control-warm bg-control-warm"
                : "border-control-line bg-control-line/45 hover:border-control-warm"
            }`}
            key={feature.id}
            onClick={() => {
              setHotspotsVisible(true);
              setActiveId(feature.id);
            }}
            type="button"
            aria-label={`Select ${feature.name}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeFeature ? (
          <FeatureFocusPanel
            activeTourIndex={activeTourIndex}
            feature={activeFeature}
            isTourActive={tourActive}
            key={activeFeature.id}
            onClose={() => {
              setActiveId(null);
              setTourActive(false);
            }}
            onExplore={() => setExploreId(activeFeature.featureStoryId)}
            onListen={() => listenToHotspot(activeFeature)}
            onTechnical={() =>
              dispatch({
                type: "SET_OVERLAY",
                overlay: {
                  type: "technical",
                  chapterId: chapter.id,
                  layer: activeFeature.name,
                },
              })
            }
            onTourMove={moveTour}
            totalFeatures={orderedFeatures.length}
          />
        ) : null}
      </AnimatePresence>

      {!activeFeature ? (
        <div className="absolute bottom-[calc(var(--stage-safe-y)+5.2rem)] right-[var(--stage-safe-x)] z-20 max-w-[23rem] border-l border-control-warm bg-white/88 p-4 shadow-control backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Room system</p>
          <p className="mt-3 text-lg font-medium text-control-text">Sixteen selectable capability points.</p>
          <p className="mt-2 text-sm leading-6 text-control-muted">
            Start the guided tour or tap any marker to inspect the connected control-room layer.
          </p>
        </div>
      ) : null}

      <AnimatePresence>
        {exploredFeature ? (
          <FeatureStory
            feature={exploredFeature}
            key={exploredFeature.id}
            onClose={() => setExploreId(null)}
            onNavigate={setExploreId}
          />
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function FeatureHotspot({
  feature,
  isActive,
  onActivate,
  reducedMotion,
}: {
  feature: ConnectedFeature;
  isActive: boolean;
  onActivate: (id: string) => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.button
      animate={{ opacity: 1, scale: 1 }}
      aria-label={`Inspect ${feature.name}`}
      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 touch-manipulation ${
        isActive ? "z-40" : ""
      }`}
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.72 }}
      onClick={() => onActivate(feature.id)}
      onFocus={() => onActivate(feature.id)}
      onMouseEnter={() => onActivate(feature.id)}
      style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.34,
        delay: reducedMotion ? 0 : feature.tourOrder * 0.035,
      }}
      type="button"
    >
      <span className={`hotspot-marker ${isActive ? "hotspot-marker-active" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className="sr-only">{feature.shortName}</span>
    </motion.button>
  );
}

function FeatureFocusPanel({
  activeTourIndex,
  feature,
  isTourActive,
  onClose,
  onExplore,
  onListen,
  onTechnical,
  onTourMove,
  totalFeatures,
}: {
  activeTourIndex: number;
  feature: ConnectedFeature;
  isTourActive: boolean;
  onClose: () => void;
  onExplore: () => void;
  onListen: () => void;
  onTechnical: () => void;
  onTourMove: (direction: 1 | -1) => void;
  totalFeatures: number;
}) {
  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+5.4rem)] right-[var(--stage-safe-x)] z-40 w-[min(33rem,36cqw)] p-5 shadow-control"
      exit={{ opacity: 0, x: 18 }}
      initial={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.24 }}
    >
      <button
        aria-label="Close hotspot detail"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-control-line text-control-muted transition hover:border-control-warm hover:text-control-text"
        onClick={onClose}
        type="button"
      >
        <X aria-hidden="true" size={17} />
      </button>
      <div className="pr-12">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">
          {String(feature.tourOrder).padStart(2, "0")} / {feature.group}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-control-text">{feature.name}</h2>
        <p className="mt-2 text-sm leading-6 text-control-soft">{feature.benefit}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={onListen} type="button">
          <Headphones aria-hidden="true" size={16} />
          Listen
        </button>
        <button className="premium-action min-h-10 px-3 text-sm" onClick={onExplore} type="button">
          <Maximize2 aria-hidden="true" size={16} />
          Explore
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={onTechnical} type="button">
          <Wrench aria-hidden="true" size={16} />
          Technical details
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-control-line/70 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-control-warm">Value</p>
          <p className="mt-2 text-xs leading-5 text-control-muted">{feature.operationalValue}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-control-warm">Integration</p>
          <p className="mt-2 text-xs leading-5 text-control-muted">{feature.architecturalIntegration}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-control-muted">
            <Info aria-hidden="true" size={14} />
            {feature.sourceStatus === "verified" ? "OnePWS capability" : "Concept layer"}
          </p>
          <p className="mt-2 text-sm leading-6 text-control-soft">
            {feature.relatedProject
              ? `${feature.relatedProject.name}: ${feature.relatedProject.note.replace(/confirmation required/gi, "reviewed with the OnePWS team")}`
              : "Related project references can be discussed with the OnePWS team."}
          </p>
        </div>
        {isTourActive ? (
          <div className="flex gap-2">
            <button
              className="control-button"
              disabled={activeTourIndex <= 0}
              onClick={() => onTourMove(-1)}
              type="button"
              aria-label="Previous hotspot"
            >
              <ChevronRight aria-hidden="true" className="rotate-180" size={17} />
            </button>
            <button
              className="control-button"
              disabled={activeTourIndex >= totalFeatures - 1}
              onClick={() => onTourMove(1)}
              type="button"
              aria-label="Next hotspot"
            >
              <ChevronRight aria-hidden="true" size={17} />
            </button>
          </div>
        ) : null}
      </div>
    </motion.aside>
  );
}

function ConnectedRoomVisual({
  activeFeature,
  imageAlt,
  imageSrc,
  reducedMotion,
}: {
  activeFeature: ConnectedFeature | null;
  imageAlt?: string;
  imageSrc?: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: activeFeature ? 1.012 : 1, x: activeFeature ? -5 : 0 }}
      className="absolute inset-0"
      transition={spatialTransition(reducedMotion)}
    >
      {imageSrc ? (
        <img
          alt={imageAlt ?? "OnePWS control-room environment"}
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          draggable={false}
          src={imageSrc}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_35%,#2a3038_0%,#12161b_34%,#08090b_72%)]" />
      )}
      <div className="absolute inset-0 bg-white/14" />
      <div className="absolute left-[17%] top-[14%] h-[38%] w-[66%] border border-control-line/45 bg-white/10">
        <div className="absolute inset-5 grid grid-cols-5 gap-3 opacity-70">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="border border-control-line/55 bg-white/30" key={index}>
              <div className="mx-4 mt-5 h-px bg-control-warm/35" />
              <div className="mx-4 mt-4 h-px bg-control-muted/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-[21%] top-[55%] h-[16%] w-[43%] border border-control-line/60 bg-white/24">
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/35" />
        <div className="absolute left-[14%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
        <div className="absolute left-[42%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
        <div className="absolute left-[70%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
      </div>
      <div className="absolute left-[67%] top-[58%] h-[17%] w-[14%] border border-control-line bg-control-panel/55" />
      <div className="absolute left-[81%] top-[55%] h-[21%] w-[11%] border border-control-line bg-white/24" />
      <div className="absolute left-[12%] top-[32%] h-[38%] w-[5%] border border-control-line bg-control-panel/30" />
      <div className="absolute left-[18%] top-[79%] h-[4%] w-[66%] border border-control-line bg-white/34">
        <motion.div
          animate={
            reducedMotion
              ? { opacity: 0.14 }
              : { opacity: activeFeature ? 0.28 : 0.14, scaleX: activeFeature ? 1 : 0.62 }
          }
          className="h-full w-[18%] origin-left bg-control-warm/18"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute left-[20%] top-[20%] h-px w-[62%] bg-control-warm/25" />
      <div className="absolute left-[23%] top-[26%] h-px w-[55%] bg-control-warm/20" />
    </motion.div>
  );
}
