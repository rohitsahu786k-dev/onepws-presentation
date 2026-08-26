import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Box,
  Cable,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crosshair,
  Expand,
  Headphones,
  LayoutPanelTop,
  Lightbulb,
  Map,
  Monitor,
  Puzzle,
  Quote,
  Recycle,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  ThumbsUp,
  TriangleAlert,
  UsersRound,
  UserRound,
  Weight,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordIntelligentOperationsEvent, type IntelligentOperationsEvent } from "./intelligentOperationsAnalytics";
import {
  getIntelligentOperationsScenario,
  type HumanLoopStage,
  type OperationsCapability,
  type OperationsPhase,
  type OperationsScenario,
} from "./intelligentOperationsConfig";
import { intelligentOperationsNarration } from "./intelligentOperationsNarration";

export function IntelligentOperationsScene({ chapter, fallback }: { chapter: Chapter; fallback: ReactNode }) {
  if (chapter.id === "intelligent-features") {
    return <IntelligentFeaturesReferenceStage chapter={chapter} />;
  }

  if (chapter.id === "mechanical-strength-console") {
    return <MechanicalStrengthConsoleStage chapter={chapter} />;
  }

  if (chapter.id === "incident-response") {
    return <IncidentResponseReferenceStage chapter={chapter} />;
  }

  const scenario = getIntelligentOperationsScenario(chapter.id);
  if (!scenario) {
    return <>{fallback}</>;
  }

  return <OperationsStage chapter={chapter} scenario={scenario} />;
}

type IntelligentFeatureCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  accent: string;
  soft: string;
  Icon: LucideIcon;
  visual: "automation" | "assistant" | "recognition" | "monitoring" | "touch" | "voice" | "lighting" | "wellness" | "power" | "handover";
  image?: string;
};

type MechanicalStrengthCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  visual: "joint" | "extrusion" | "bolted" | "chassis" | "cable" | "panel" | "leveler" | "mount" | "edge" | "parts";
  image?: string;
};

const mechanicalStrengthCards: MechanicalStrengthCard[] = [
  {
    id: "die-cast-structure",
    number: "01",
    title: "Die-Cast Structural Joints",
    description: "Precision components reinforce critical structural connections.",
    Icon: Box,
    visual: "joint",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "extruded-frame",
    number: "02",
    title: "Heavy-Duty Aluminium Frame",
    description: "Rigid extruded profiles create a strong structural foundation.",
    Icon: Box,
    visual: "extrusion",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "bolted-construction",
    number: "03",
    title: "Modular Bolted Construction",
    description: "Enables easier installation, expansion and future reconfiguration.",
    Icon: Wrench,
    visual: "bolted",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "load-bearing-chassis",
    number: "04",
    title: "Reinforced Equipment Support",
    description: "Engineered to securely support displays and integrated equipment.",
    Icon: Weight,
    visual: "chassis",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "cable-management",
    number: "05",
    title: "Integrated Cable Architecture",
    description: "Dedicated routing keeps power, data and AV organized and accessible.",
    Icon: Cable,
    visual: "cable",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "access-panels",
    number: "06",
    title: "Tool-Less Service Access",
    description: "Quick access to internal equipment simplifies maintenance.",
    Icon: Wrench,
    visual: "panel",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "levelling-system",
    number: "07",
    title: "Precision Levelling System",
    description: "Adjustable levellers maintain stability on uneven floors.",
    Icon: Settings,
    visual: "leveler",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "monitor-mounting",
    number: "08",
    title: "Modular Monitor Mounting",
    description: "Flexible mounting supports changing display configurations.",
    Icon: Monitor,
    visual: "mount",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "edge-protection",
    number: "09",
    title: "Passive Equipment Ventilation",
    description: "Designed airflow helps dissipate heat from integrated electronics.",
    Icon: ShieldCheck,
    visual: "edge",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
  {
    id: "replaceable-parts",
    number: "10",
    title: "Replaceable Modular Components",
    description: "Individual components can be serviced or replaced without rebuilding the console.",
    Icon: Puzzle,
    visual: "parts",
    image: "/assets/products/mechanical-strength/placeholder-image.png",
  },
];

const intelligentFeatureCards: IntelligentFeatureCard[] = [
  {
    id: "adaptive-sit-stand",
    number: "01",
    title: "Adaptive Sit-Stand",
    description: "Automatically adjusts for healthier working positions.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: SlidersHorizontal,
    visual: "automation",
    image: "/assets/products/intelligent-features/1.png",
  },
  {
    id: "ai-desk-assistant",
    number: "02",
    title: "AI Operator Assistant",
    description: "Quick access to information, controls and routine assistance.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Monitor,
    visual: "assistant",
    image: "/assets/products/intelligent-features/2.png",
  },
  {
    id: "operator-recognition",
    number: "03",
    title: "Operator Personalization",
    description: "Restores individual workspace preferences when an operator signs in.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: UserRound,
    visual: "recognition",
    image: "/assets/products/intelligent-features/3.png",
  },
  {
    id: "motorized-monitor-positioning",
    number: "04",
    title: "Adaptive Display Positioning",
    description: "Adjusts display position for better viewing and ergonomics.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Monitor,
    visual: "monitoring",
    image: "/assets/products/intelligent-features/4.png",
  },
  {
    id: "intelligent-touch-panel",
    number: "05",
    title: "Unified Touch Control",
    description: "One interface for frequently used workstation functions.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: SlidersHorizontal,
    visual: "touch",
    image: "/assets/products/intelligent-features/5.png",
  },
  {
    id: "voice-controlled-console",
    number: "06",
    title: "Voice-Assisted Control",
    description: "Hands-free access to supported console functions.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Headphones,
    visual: "voice",
    image: "/assets/products/intelligent-features/6.png",
  },
  {
    id: "situational-awareness-lighting",
    number: "07",
    title: "Situational Awareness Lighting",
    description: "Visual cues help communicate operational states and events.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Lightbulb,
    visual: "lighting",
    image: "/assets/products/intelligent-features/7.png",
  },
  {
    id: "operator-wellness",
    number: "08",
    title: "Operator Wellness Monitoring",
    description: "Supports awareness of posture and prolonged working patterns.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Settings,
    visual: "wellness",
    image: "/assets/products/intelligent-features/8.png",
  },
  {
    id: "power-device-management",
    number: "09",
    title: "Intelligent Device Management",
    description: "Centralized visibility and control of connected workstation devices.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: Activity,
    visual: "power",
    image: "/assets/products/intelligent-features/9.png",
  },
  {
    id: "shift-handover",
    number: "10",
    title: "Digital Shift Handover",
    description: "Helps transfer operational context between incoming and outgoing teams.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: UsersRound,
    visual: "handover",
    image: "/assets/products/intelligent-features/10.png",
  },
];

function IntelligentFeaturesReferenceStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const reducedMotion = state.reducedMotion;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_58%,#eef4f7_100%)]" />
      <div className="" />
      <motion.div
        animate={reducedMotion ? undefined : { opacity: [0.94, 1, 0.96], y: [0, -3, 0] }}
        className="pointer-events-none absolute left-[37.2cqw] top-[11.15cqh] h-[20.3cqh] w-[39cqw] overflow-hidden"
        initial={false}
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      >
        <img alt="" className="h-full w-full object-contain object-center" src="/assets/source-pdf/render.png" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_86%,rgb(15_23_42/0.12),transparent_40%)]" />
      </motion.div>

      <section className="absolute inset-x-[1.65cqw] top-[9.65cqh] bottom-[7.6cqh] z-10">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[0.35cqw] top-[0.25cqh] w-[37.5cqw]"
          initial={false}
          transition={{ duration: 0.78, ease }}
        >
          <p className="text-[clamp(0.62rem,0.74cqw,0.9rem)] font-semibold uppercase tracking-[0.5em] text-slate-700">Intelligent Console Ecosystem</p>
          <h1 className="mt-[0.9cqh] max-w-[38.5cqw] text-[clamp(2.18rem,3.28cqw,4.6rem)] font-bold uppercase leading-[0.93] tracking-normal md:text-[2.58cqw]">
            <span className="block text-control-text">Intelligent by Design.</span>
            <span className="block text-[#d51d2a]">Built Around the Operator.</span>
          </h1>
          <div className="mt-[1.05cqh] h-[3px] w-[3.3rem] bg-control-warm" />
          <p className="mt-[0.92cqh] max-w-[36rem] text-[clamp(0.86rem,0.98cqw,1.12rem)] font-medium leading-[1.32] text-slate-800 md:text-[0.9cqw]">
            An intelligent console ecosystem that adapts to the operator, simplifies interaction and supports performance throughout every shift.
          </p>
        </motion.aside>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-[0.35cqw] top-[0.05cqh] grid h-[25.2cqh] w-[17.2cqw] content-center gap-[1.38cqh] rounded-[0.95rem] border border-white/80 bg-white/58 p-[1.08cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_1rem_2.9rem_rgb(15_23_42/0.09)] backdrop-blur-[28px]"
          initial={false}
          transition={{ duration: 0.72, delay: 0.08, ease }}
        >
          {[
            { title: "Adapts", detail: "Personalized around the operator.", Icon: UserRound },
            { title: "Assists", detail: "Simplifies everyday interaction.", Icon: Headphones },
            { title: "Responds", detail: "Brings controls and information closer when needed.", Icon: Activity },
          ].map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.div
                animate={reducedMotion ? undefined : { opacity: [0.86, 1, 0.9] }}
                className="grid grid-cols-[2.15rem_minmax(0,1fr)] gap-[0.74cqw]"
                key={item.title}
                transition={{ duration: 3.2, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="grid h-[2.15rem] w-[2.15rem] place-items-center rounded-full border border-red-700/16 bg-white/62 text-[#d51d2a] shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_0.55rem_1.2rem_rgb(15_23_42/0.06)]">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-[clamp(0.66rem,0.76cqw,0.9rem)] font-semibold uppercase tracking-[0.1em] text-[#d51d2a]">{item.title}</h2>
                  <p className="mt-0.5 text-[clamp(0.56rem,0.64cqw,0.74rem)] font-medium leading-[1.24] text-slate-700">{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.aside>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-[0.1cqw] top-[27.4cqh] bottom-[10.45cqh] grid grid-cols-5 grid-rows-2 gap-x-[0.78cqw] gap-y-[1.18cqh]"
          initial={false}
          transition={{ duration: 0.82, delay: 0.12, ease }}
        >
          {intelligentFeatureCards.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={feature.id} reducedMotion={reducedMotion} />
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[0.35cqh] left-[19.6cqw] right-[0.1cqw] grid h-[7.3cqh] grid-cols-3 overflow-hidden rounded-[0.78rem] border border-white/82 bg-white/62 text-control-text shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_1rem_2.5rem_rgb(15_23_42/0.1)] backdrop-blur-[26px]"
          initial={false}
          transition={{ duration: 0.72, delay: 0.38, ease }}
        >
          {[
            { title: "Built for 24/7 Operations", detail: "Reliability for continuous environments.", Icon: ShieldCheck },
            { title: "Built Around the Operator", detail: "Comfort. Control. Adaptability.", Icon: UserRound },
            { title: "Intelligence Where It Matters", detail: "Less complexity. Better interaction.", Icon: Activity },
          ].map((item, index) => {
            const Icon = item.Icon;
            return (
              <div className={`grid grid-cols-[2.35rem_minmax(0,1fr)] items-center gap-[0.9cqw] px-[1.5cqw] ${index ? "border-l border-slate-200/80" : ""}`} key={item.title}>
                <span className="grid h-[2.25rem] w-[2.25rem] place-items-center rounded-full bg-red-50 text-[#d51d2a]">
                  <Icon aria-hidden="true" size={26} strokeWidth={1.65} />
                </span>
                <div>
                  <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-control-text md:text-[0.7cqw]">{item.title}</h2>
                  <p className="mt-0.5 text-[0.58rem] font-medium leading-[1.22] text-slate-700 md:text-[0.55cqw]">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={false}
          transition={{ duration: 0.62, delay: 0.82, ease }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" size={23} />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <Map aria-hidden="true" size={22} />
          </button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" size={22} />
          </button>
        </motion.div>
      </section>

      <motion.div
        animate={reducedMotion ? undefined : { x: ["-20%", "120%"], opacity: [0, 0.18, 0] }}
        className="pointer-events-none absolute top-[30cqh] h-px w-[48cqw] bg-[linear-gradient(90deg,transparent,rgb(213_29_42/0.65),transparent)]"
        initial={false}
        transition={{ duration: 2.8, delay: 0.6, ease, repeat: 1, repeatDelay: 1.5 }}
      />
    </article>
  );
}

function MechanicalStrengthConsoleStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const reducedMotion = state.reducedMotion;
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "mechanical-strength-console" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />
      <motion.div
        animate={reducedMotion ? undefined : { opacity: [0.92, 1, 0.94], y: [0, -4, 0] }}
        className="pointer-events-none absolute left-[37.2cqw] top-[11.15cqh] h-[20.3cqh] w-[39cqw] overflow-hidden"
        initial={false}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img alt="" className="h-full w-full object-contain object-center" src="/assets/source-pdf/render.png" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_84%,rgb(15_23_42/0.12),transparent_42%)]" />
      </motion.div>

      <section className="absolute inset-x-[1.65cqw] top-[9.75cqh] bottom-[7.6cqh] z-10">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[0.35cqw] top-[0.2cqh] w-[38.2cqw]"
          initial={false}
          transition={{ duration: 0.72, ease }}
        >
          <p className="text-[clamp(0.62rem,0.74cqw,0.9rem)] font-semibold uppercase tracking-[0.5em] text-slate-700">Precision in Every Detail</p>
          <h1 className="mt-[0.9cqh] max-w-[38.5cqw] text-[clamp(2.18rem,3.28cqw,4.6rem)] font-bold uppercase leading-[0.93] tracking-normal md:text-[2.58cqw]">
            <span className="block text-control-text">Engineered for 24/7.</span>
            <span className="block text-[#d51d2a]">Built to Endure.</span>
          </h1>
          <div className="mt-[1.35cqh] h-[3px] w-[3.3rem] bg-control-warm" />
          <p className="mt-[0.9cqh] max-w-[36rem] text-[clamp(0.86rem,0.98cqw,1.12rem)] font-medium leading-[1.32] text-slate-800 md:text-[0.9cqw]">
            From the structural frame to service access, every component is engineered for strength, stability and long-term maintainability.
          </p>
        </motion.aside>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-[0.35cqw] top-[0.05cqh] grid h-[25.6cqh] w-[19.2cqw] content-center gap-[1.08cqh] rounded-[0.95rem] border border-white/80 bg-white/58 p-[1.12cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_1rem_2.9rem_rgb(15_23_42/0.09)] backdrop-blur-[28px]"
          initial={false}
          transition={{ duration: 0.72, delay: 0.08, ease }}
        >
          {[
            { title: "Rugged", detail: "Engineered for continuous mission-critical operation.", Icon: ShieldCheck },
            { title: "Serviceable", detail: "Fast access to equipment, cabling and internal components.", Icon: Wrench },
            { title: "Modular", detail: "Expand, reconfigure and upgrade as requirements change.", Icon: Box },
            { title: "Precise", detail: "Engineered components for consistent fit, alignment and stability.", Icon: Settings },
          ].map((item) => {
            const Icon = item.Icon;
            return (
              <div className="grid grid-cols-[2.28rem_minmax(0,1fr)] gap-[0.78cqw]" key={item.title}>
                <span className="grid h-[2.28rem] w-[2.28rem] place-items-center rounded-full border border-red-700/16 bg-white/62 text-[#d51d2a] shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_0.55rem_1.2rem_rgb(15_23_42/0.06)]">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-[clamp(0.72rem,0.82cqw,0.96rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</h2>
                  <p className="mt-0.5 text-[clamp(0.62rem,0.7cqw,0.8rem)] font-medium leading-[1.24] text-slate-700">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </motion.aside>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-[0.1cqw] top-[27.4cqh] bottom-[11.75cqh] grid grid-cols-5 grid-rows-2 gap-x-[0.78cqw] gap-y-[1.18cqh]"
          initial={false}
          transition={{ duration: 0.82, delay: 0.16, ease }}
        >
          {mechanicalStrengthCards.map((item, index) => (
            <MechanicalStrengthCard item={item} index={index} key={item.id} reducedMotion={reducedMotion} />
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[0.35cqh] left-[19.6cqw] right-[0.1cqw] grid h-[8.45cqh] grid-cols-5 overflow-hidden rounded-[0.78rem] border border-white/82 bg-white/62 text-control-text shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_1rem_2.5rem_rgb(15_23_42/0.1)] backdrop-blur-[26px]"
          initial={false}
          transition={{ duration: 0.72, delay: 0.38, ease }}
        >
          {[
            { title: "24/7 Ready", detail: "Built for continuous operations.", Icon: ShieldCheck },
            { title: "High Stability", detail: "Rigid structural architecture.", Icon: ThumbsUp },
            { title: "Faster Service", detail: "Easy equipment and cable access.", Icon: Wrench },
            { title: "Future Adaptable", detail: "Designed for upgrades and reconfiguration.", Icon: Settings },
            { title: "Longer Lifecycle", detail: "Serviceable and replaceable components.", Icon: Recycle },
          ].map((item, index) => {
            const Icon = item.Icon;
            return (
              <div className={`grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-[0.9cqw] px-[1.2cqw] py-[1.05cqh] ${index ? "border-l border-slate-200/80" : ""}`} key={item.title}>
                <span className="grid h-[2.42rem] w-[2.42rem] place-items-center rounded-full bg-red-50 text-[#d51d2a]">
                  <Icon aria-hidden="true" size={27} strokeWidth={1.65} />
                </span>
                <div>
                  <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-control-text md:text-[0.64cqw]">{item.title}</h2>
                  <p className="mt-0.5 text-[0.62rem] font-medium leading-[1.2] text-slate-700 md:text-[0.56cqw]">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={false}
          transition={{ duration: 0.62, delay: 0.82, ease }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" size={23} />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <Map aria-hidden="true" size={22} />
          </button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" size={22} />
          </button>
        </motion.div>
      </section>
    </article>
  );
}

function MechanicalStrengthCard({ item, index, reducedMotion }: { item: MechanicalStrengthCard; index: number; reducedMotion: boolean }) {
  const Icon = item.Icon;
  const imageVisual = item.image ? <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} /> : null;

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex min-h-0 flex-col overflow-hidden rounded-[0.78rem] border border-white/82 bg-white/48 p-[0.54cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),inset_0_-1px_0_rgb(148_163_184/0.14),0_0.95rem_2.2rem_rgb(15_23_42/0.09)] backdrop-blur-[30px]"
      initial={false}
      transition={{ duration: 0.62, delay: 0.02 * index, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.84),rgb(255_255_255/0.38)_48%,rgb(232_238_245/0.5))]" />
      <span className="pointer-events-none absolute -right-[18%] -top-[30%] h-[6rem] w-[6rem] rounded-full bg-white/48 blur-2xl" />
      <div className="relative z-10 grid min-h-[7.35cqh] grid-cols-[minmax(0,1fr)_2.05rem] items-start gap-[0.5cqw] pl-[2.9rem]">
        <span className="absolute left-[-0.54cqw] top-[-0.54cqw] grid h-[1.72rem] min-w-[2.38rem] place-items-center rounded-br-md rounded-tl-[0.78rem] bg-control-warm px-2 text-[clamp(0.74rem,0.82cqw,0.94rem)] font-semibold leading-none text-white">{item.number}</span>
        <div className="min-w-0">
          <h2 className="max-w-[15rem] text-[clamp(0.66rem,0.73cqw,0.86rem)] font-semibold uppercase leading-[1.06] text-control-text">{item.title}</h2>
          <p className="mt-[0.52cqh] max-w-[15.8rem] text-[clamp(0.55rem,0.62cqw,0.72rem)] font-medium leading-[1.18] text-slate-700">{item.description}</p>
        </div>
        <span className="grid h-[2.05rem] w-[2.05rem] shrink-0 place-items-center rounded-full border border-slate-300/62 bg-white/62 text-slate-900/76 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.4rem_0.9rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
          <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
        </span>
      </div>
      <div className="relative z-10 mx-[-0.54cqw] mb-[-0.54cqw] mt-auto h-[12.45cqh] shrink-0 overflow-hidden rounded-b-[0.78rem] border-t border-slate-200/72 bg-[linear-gradient(135deg,#eef2f6,#ffffff)] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_0.72rem_1.45rem_rgb(15_23_42/0.11)]">
        {imageVisual}
        {!item.image ? <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.08),rgb(15_23_42/0.16))]" /> : null}
        {!item.image ? <MechanicalStrengthVisual visual={item.visual} reducedMotion={reducedMotion} /> : null}
      </div>
    </motion.article>
  );
}

function MechanicalStrengthVisual({ visual, reducedMotion }: { visual: MechanicalStrengthCard["visual"]; reducedMotion: boolean }) {
  if (visual === "bolted") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[58%] w-[72%]">
          <span className="absolute left-0 top-[44%] h-[18%] w-[45%] rounded bg-slate-950" />
          <span className="absolute right-0 top-[44%] h-[18%] w-[45%] rounded bg-slate-800" />
          {[16, 34, 58, 76].map((left) => (
            <motion.span
              animate={reducedMotion ? undefined : { boxShadow: ["0 0 0 rgb(213 29 42 / 0)", "0 0 18px rgb(213 29 42 / 0.45)", "0 0 0 rgb(213 29 42 / 0)"] }}
              className="absolute top-[39%] h-5 w-5 rounded-full border border-white/70 bg-[#d51d2a]"
              key={left}
              style={{ left: `${left}%` }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (visual === "cable") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#111827]">
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            animate={reducedMotion ? undefined : { x: ["-8%", "4%", "-8%"] }}
            className="absolute left-[12%] h-[5px] w-[74%] rounded-full bg-control-warm"
            key={index}
            style={{ top: `${34 + index * 9}%` }}
            transition={{ duration: 2.4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <span className="absolute inset-x-[14%] top-[24%] h-[1px] bg-white/20" />
        <span className="absolute inset-x-[14%] bottom-[24%] h-[1px] bg-white/20" />
      </div>
    );
  }

  if (visual === "leveler") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          animate={reducedMotion ? undefined : { y: [-3, 3, -3] }}
          className="grid place-items-center"
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="h-16 w-5 rounded bg-slate-900" />
          <span className="-mt-1 h-8 w-20 rounded-full border border-slate-500 bg-slate-200 shadow-xl" />
        </motion.div>
      </div>
    );
  }

  if (visual === "panel" || visual === "parts") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid w-[72%] grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <motion.span
              animate={reducedMotion ? undefined : { y: [0, index % 2 ? 10 : -10, 0] }}
              className="h-24 rounded border border-slate-300 bg-[linear-gradient(180deg,#ffffff,#dbe2ea)] shadow-lg"
              key={index}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (visual === "chassis") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[54%] w-[78%]">
          <span className="absolute inset-x-0 top-[16%] h-3 rounded bg-slate-950" />
          <span className="absolute inset-x-0 bottom-[18%] h-3 rounded bg-slate-950" />
          <span className="absolute left-[12%] top-[16%] h-[66%] w-3 rotate-[-18deg] rounded bg-slate-800" />
          <span className="absolute right-[12%] top-[16%] h-[66%] w-3 rotate-[18deg] rounded bg-slate-800" />
          <span className="absolute bottom-[7%] left-[2%] h-4 w-16 rounded bg-slate-900" />
          <span className="absolute bottom-[7%] right-[2%] h-4 w-16 rounded bg-slate-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={reducedMotion ? undefined : { scale: [1, 1.035, 1] }}
        className="h-[54%] w-[72%] rounded-[1rem] border border-slate-300 bg-[linear-gradient(135deg,#ffffff,#cfd8e3)] shadow-2xl"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

type ResponseFlowItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type CriticalMomentItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const responseFlow: ResponseFlowItem[] = [
  {
    title: "Event Detected",
    description: "Systems identify an event in real-time.",
    Icon: Bell,
  },
  {
    title: "Information Prioritized",
    description: "Critical data surfaces automatically.",
    Icon: Monitor,
  },
  {
    title: "Environment Adapts",
    description: "Lighting, displays and systems adjust.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Operator Acts",
    description: "Faster decisions. Better outcomes.",
    Icon: CheckCircle2,
  },
];

const criticalMomentItems: CriticalMomentItem[] = [
  {
    title: "Auto-Layout",
    description: "Displays reorganize to highlight critical information instantly.",
    Icon: LayoutPanelTop,
  },
  {
    title: "Smart Lighting",
    description: "Adjusts brightness and contrast to reduce eye strain and improve situational awareness.",
    Icon: Lightbulb,
  },
  {
    title: "Acoustic Focus",
    description: "Noise levels adapt to the situation to support clear communication.",
    Icon: Activity,
  },
  {
    title: "Ergonomic Adaptation",
    description: "Consoles and seating adjust to support performance under pressure.",
    Icon: Settings,
  },
  {
    title: "Mission Mode",
    description: "One touch activates predefined operational states across the entire room.",
    Icon: Crosshair,
  },
  {
    title: "Fail-Safe Design",
    description: "Redundant systems ensure uninterrupted operations when it matters most.",
    Icon: ShieldCheck,
  },
];

const responseOutcomes = [
  {
    title: "Instant Response",
    description: "Systems react in real-time to changing situations.",
    Icon: Crosshair,
  },
  {
    title: "Minimize Distraction",
    description: "Critical information delivered, noise reduced.",
    Icon: ShieldCheck,
  },
  {
    title: "Continuous Reliability",
    description: "Designed for 24/7 uptime in mission-critical environments.",
    Icon: Clock3,
  },
  {
    title: "Team Synchronization",
    description: "Everyone aligned, informed and ready to act together.",
    Icon: UsersRound,
  },
];

function IncidentResponseReferenceStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const reducedMotion = state.reducedMotion;
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "incident-response-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7cqw] top-[9.9cqh] bottom-[7.05cqh] z-10 grid grid-cols-[minmax(0,1.05fr)_minmax(34rem,0.95fr)] gap-[0.95cqw]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-0"
          initial={false}
          transition={{ duration: 0.72, ease }}
        >
          <div className="absolute inset-x-0 bottom-[15.2cqh] top-0 overflow-hidden rounded-[0.65rem] border border-slate-200/86 bg-white shadow-[0_1.1rem_2.9rem_rgb(15_23_42/0.09)]">
            <img
              alt="Operators monitoring a live control room during a critical incident."
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
              src="/assets/products/incident-response-operations-center.png"
            />
            <div className="pointer-events-none absolute inset-0 bg-white/10" />
            {/* The headline sits on a white wash that only covers the top-left quadrant, so the
                room stays visible along the top edge and under the copy, as in the reference. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#ffffff 0%,#ffffff 44%,rgb(255 255 255 / 0.74) 56%,rgb(255 255 255 / 0.24) 66%,rgb(255 255 255 / 0) 74%)",
                WebkitMaskImage: "linear-gradient(180deg,#000 0%,#000 40%,rgba(0,0,0,0.42) 52%,rgba(0,0,0,0) 62%)",
                maskImage: "linear-gradient(180deg,#000 0%,#000 40%,rgba(0,0,0,0.42) 52%,rgba(0,0,0,0) 62%)",
              }}
            />

            <div className="relative z-20 w-[min(47cqw,48rem)] px-[1.7cqw] pt-[2.5cqh]">
              <h1 className="text-[clamp(2.9rem,4.25cqw,5.65rem)] font-bold leading-[0.94] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">When Every</span>
                <span className="block">Second <span className="text-control-warm">Matters.</span></span>
              </h1>
              <div className="mt-[1.25cqh] h-[3px] w-[2.65rem] bg-control-warm" />
              <p className="mt-[1.45cqh] max-w-[33rem] text-[clamp(0.82rem,0.92cqw,1.04rem)] font-medium leading-[1.5] text-slate-800 md:text-[0.8cqw]">
                In critical moments, operators don't have time to search, adjust or wait. Our intelligent control room responds instantly so operators can focus on what truly matters: the mission.
              </p>
            </div>

            <div className="absolute left-[58%] top-[45%] z-20 -translate-x-1/2 -translate-y-1/2 text-center text-control-warm">
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.92)_0%,rgb(255_255_255/0.72)_44%,rgb(255_255_255/0)_72%)]" />
              <AlertTriangleVisual reducedMotion={reducedMotion} />
              <p className="mt-2 text-[clamp(0.74rem,0.9cqw,1rem)] font-semibold uppercase tracking-normal">Critical Alert</p>
              <p className="mt-1 text-[clamp(1.35rem,2.05cqw,2.5rem)] font-semibold leading-none tracking-normal tabular-nums">00:00:07</p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-[6.35cqh] grid h-[8.2cqh] grid-cols-4 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white shadow-[0_0.9rem_2rem_rgb(15_23_42/0.07)]">
            {responseOutcomes.map((outcome, index) => {
              const Icon = outcome.Icon;
              return (
                <div className={`relative flex min-w-0 gap-[0.72cqw] px-[0.9cqw] py-[1.1cqh] ${index ? "border-l border-slate-200/90" : ""}`} key={outcome.title}>
                  <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-control-warm" size={25} strokeWidth={1.65} />
                  <div className="min-w-0">
                    <h2 className="text-[clamp(0.56rem,0.64cqw,0.76rem)] font-semibold leading-tight text-control-text">{outcome.title}</h2>
                    <p className="mt-1 text-[clamp(0.52rem,0.59cqw,0.68rem)] font-medium leading-[1.28] text-slate-700">{outcome.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative grid min-h-0 grid-rows-[minmax(0,0.68fr)_minmax(0,0.98fr)_8.2cqh] gap-[1.25cqh] pb-[6.35cqh]"
          initial={false}
          transition={{ duration: 0.74, delay: 0.08, ease }}
        >
          <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.25cqw] py-[2cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
            <h2 className="text-[clamp(1.05rem,1.32cqw,1.58rem)] font-semibold leading-none text-control-text">From Event to Action - Instantly.</h2>
            <div className="mt-[1cqh] h-[2px] w-[2.2rem] bg-control-warm" />
            <div className="mt-[2.3cqh] grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-[0.8cqw]">
              {responseFlow.map((item, index) => (
                <ResponseFlowNode item={item} key={item.title} showArrow={index < responseFlow.length - 1} />
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.25cqw] py-[2cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
            <h2 className="text-[clamp(0.98rem,1.15cqw,1.34rem)] font-semibold leading-none text-control-text">Built for Critical Moments</h2>
            <div className="mt-[1cqh] h-[2px] w-[1.9rem] bg-control-warm" />
            <div className="mt-[2cqh] grid h-[calc(100%-3.4rem)] grid-cols-3 grid-rows-2 items-center">
              {criticalMomentItems.map((item, index) => (
                <CriticalMomentCell item={item} index={index} key={item.title} />
              ))}
            </div>
          </section>

          <section className="relative flex min-h-0 items-center overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.25cqw] py-[0.85cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
            <div className="relative z-10 flex max-w-[34rem] items-start gap-[0.85cqw]">
              <Quote aria-hidden="true" className="mt-[0.1rem] shrink-0 fill-control-warm text-control-warm" size={31} strokeWidth={1.2} />
              <div>
                <p className="text-[clamp(0.68rem,0.8cqw,0.92rem)] font-medium leading-[1.3] text-slate-800">Technology should never slow you down.</p>
                <p className="mt-1 text-[clamp(0.68rem,0.8cqw,0.92rem)] font-semibold leading-tight text-control-warm">Our environment makes you faster, sharper and stronger.</p>
              </div>
            </div>
            <img
              alt="Speedometer illustration representing response speed under pressure."
              className="pointer-events-none absolute bottom-[-0.4rem] right-[0.8cqw] h-[6.2rem] w-auto max-w-[11rem] object-contain opacity-85"
              draggable={false}
              src="/assets/products/incident-response-speed.png"
            />
          </section>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={false}
          transition={{ duration: 0.62, delay: 0.82, ease }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" size={23} />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <Map aria-hidden="true" size={22} />
          </button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" size={22} />
          </button>
        </motion.div>
      </section>
    </article>
  );
}

function ResponseFlowNode({ item, showArrow }: { item: ResponseFlowItem; showArrow: boolean }) {
  const Icon = item.Icon;
  return (
    <>
      <div className="min-w-0 text-center">
        <div className="mx-auto grid h-[clamp(3.1rem,5.4cqh,4.1rem)] w-[clamp(3.1rem,5.4cqh,4.1rem)] place-items-center rounded-full bg-control-warm/[0.13] text-control-warm">
          <Icon aria-hidden="true" size={28} strokeWidth={1.65} />
        </div>
        <h3 className="mt-[1.05cqh] text-[clamp(0.6rem,0.68cqw,0.78rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
        <p className="mx-auto mt-1 max-w-[8.2rem] text-[clamp(0.55rem,0.62cqw,0.72rem)] font-medium leading-[1.34] text-slate-700">{item.description}</p>
      </div>
      {showArrow ? <div className="pt-[clamp(1.55rem,2.9cqh,2.25rem)] text-[clamp(1.1rem,1.35cqw,1.55rem)] font-light text-control-text">›</div> : null}
    </>
  );
}

function CriticalMomentCell({ item, index }: { item: CriticalMomentItem; index: number }) {
  const Icon = item.Icon;
  const hasLeftBorder = index % 3 !== 0;
  const hasTopBorder = index >= 3;

  return (
    <div className={`grid grid-cols-[2.3rem_minmax(0,1fr)] gap-[0.8cqw] px-[0.85cqw] py-[1.35cqh] ${hasLeftBorder ? "border-l border-slate-200/90" : ""} ${hasTopBorder ? "border-t border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="mt-0.5 text-control-warm" size={26} strokeWidth={1.65} />
      <div>
        <h3 className="text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
        <p className="mt-2 text-[clamp(0.54rem,0.62cqw,0.72rem)] font-medium leading-[1.38] text-slate-700">{item.description}</p>
      </div>
    </div>
  );
}

function AlertTriangleVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.86, 1, 0.86] }}
      className="mx-auto grid h-[4.4rem] w-[4.4rem] place-items-center"
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <TriangleAlert aria-hidden="true" className="text-control-warm" size={58} strokeWidth={1.7} />
    </motion.div>
  );
}

function FeatureCard({ feature, index, reducedMotion }: { feature: IntelligentFeatureCard; index: number; reducedMotion: boolean }) {
  const Icon = feature.Icon;
  const delay = 0.16 + index * 0.035;
  const titleParts = feature.title.split(" ");

  return (
    <motion.article
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      className="group relative flex min-h-0 flex-col overflow-hidden rounded-[0.78rem] border border-white/82 bg-white/48 p-[0.54cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),inset_0_-1px_0_rgb(148_163_184/0.14),0_0.95rem_2.2rem_rgb(15_23_42/0.09)] backdrop-blur-[30px]"
      initial={false}
      style={{ "--feature-accent": feature.accent, "--feature-soft": feature.soft } as CSSProperties}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -5,
              scale: 1.012,
              boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.96), 0 1.45rem 3.8rem rgb(15 23 42 / 0.16)",
              transition: { duration: 0.34, ease: [0.2, 1, 0.22, 1] },
        }
      }
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.82)_0%,rgb(255_255_255/0.48)_48%,rgb(230_236_244/0.44)_100%)]" />
      <span className="pointer-events-none absolute inset-x-[0.55rem] top-0 h-px bg-white/90" />
      <span className="pointer-events-none absolute -right-[18%] -top-[32%] h-[6rem] w-[6rem] rounded-full bg-white/42 blur-2xl" />

      <header className="relative z-10 grid min-h-[6.55cqh] grid-cols-[minmax(0,1fr)_1.82rem] items-start gap-[0.46cqw] pl-[2.8rem]">
        <span className="absolute left-[-0.54cqw] top-[-0.54cqw] grid h-[1.65rem] min-w-[2.28rem] place-items-center rounded-br-md rounded-tl-[0.78rem] bg-control-warm px-2 text-[clamp(0.7rem,0.78cqw,0.9rem)] font-semibold leading-none tracking-normal text-white">
          {feature.number}
        </span>
        <div className="min-w-0 pt-[0.02rem]">
          <h2 className="max-w-[14.4rem] text-[clamp(0.62rem,0.69cqw,0.82rem)] font-semibold uppercase leading-[1.07] tracking-normal text-control-text">
            {titleParts.length > 3 ? (
              <>
                <span className="block">{titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(" ")}</span>
                <span className="block">{titleParts.slice(Math.ceil(titleParts.length / 2)).join(" ")}</span>
              </>
            ) : (
              feature.title
            )}
          </h2>
          <p className="mt-[0.52cqh] max-w-[15.5rem] text-[clamp(0.54rem,0.61cqw,0.72rem)] font-medium leading-[1.2] text-slate-700">
            {feature.description}
          </p>
        </div>
        <span className="grid h-[1.92rem] w-[1.92rem] shrink-0 place-items-center rounded-full border border-slate-300/62 bg-white/62 text-slate-900/76 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.4rem_0.9rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
          <Icon aria-hidden="true" size={19} strokeWidth={1.75} />
        </span>
      </header>

      <FeatureVisual feature={feature} reducedMotion={reducedMotion} />

      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-x-[-20%] top-[38%] h-px rotate-[-4deg] bg-[linear-gradient(90deg,transparent,var(--feature-accent),transparent)] opacity-50" />
      </span>
    </motion.article>
  );
}

function FeatureVisual({ feature, reducedMotion }: { feature: IntelligentFeatureCard; reducedMotion: boolean }) {
  if (feature.image) {
    return (
      <div className="relative z-10 mx-[-0.54cqw] mb-[-0.54cqw] mt-auto h-[13.4cqh] shrink-0 overflow-hidden rounded-b-[0.78rem] border-t border-slate-200/72 bg-[linear-gradient(135deg,#f8fafc,#e8eef5)] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_0.72rem_1.45rem_rgb(15_23_42/0.11)]">
        <img alt="" className="h-full w-full rounded-b-[0.72rem] object-cover shadow-[0_0.45rem_1rem_rgb(15_23_42/0.14)]" src={feature.image} />
        <div className="pointer-events-none absolute inset-0 rounded-b-[0.72rem] bg-[linear-gradient(180deg,rgb(255_255_255/0.04),rgb(15_23_42/0.08))]" />
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-auto h-[9.95cqh] shrink-0 overflow-hidden rounded-[0.58rem] border border-white/54 bg-[linear-gradient(135deg,#101820,#27313b)] shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_0.62rem_1.35rem_rgb(15_23_42/0.09)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.05),rgb(0_0_0/0.38))]" />
      {feature.visual === "automation" ? <AutomationVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "assistant" ? <AssistantVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "recognition" ? <RecognitionVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "monitoring" ? <MonitorPositionVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "touch" ? <ControllerVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "voice" ? <VoiceVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "lighting" ? <LightingVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "wellness" ? <WellnessVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "power" ? <PowerVisual reducedMotion={reducedMotion} /> : null}
      {feature.visual === "handover" ? <HandoverVisual reducedMotion={reducedMotion} /> : null}
    </div>
  );
}

function AutomationVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={reducedMotion ? undefined : { y: [3, -4, 3] }}
        className="relative h-[66%] w-[78%]"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-[8%] right-[8%] top-[28%] h-[12%] rounded bg-white/92 shadow-lg" />
        <span className="absolute left-[17%] top-[40%] h-[42%] w-[11%] rounded bg-slate-950" />
        <span className="absolute right-[17%] top-[40%] h-[42%] w-[11%] rounded bg-slate-950" />
        <span className="absolute bottom-[6%] left-[12%] h-[4px] w-[20%] rounded bg-sky-400" />
        <span className="absolute bottom-[6%] right-[12%] h-[4px] w-[20%] rounded bg-sky-400" />
      </motion.div>
      <span className="absolute right-[10%] top-[22%] h-[46%] w-[2px] rounded bg-blue-400/80" />
      <span className="absolute right-[8.7%] top-[17%] border-x-[5px] border-b-[8px] border-x-transparent border-b-blue-300" />
      <span className="absolute right-[8.7%] bottom-[23%] border-x-[5px] border-t-[8px] border-x-transparent border-t-blue-300" />
    </div>
  );
}

function AssistantVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-3 text-white">
      <motion.div
        animate={reducedMotion ? undefined : { boxShadow: ["0 0 0 rgb(59 130 246 / 0)", "0 0 26px rgb(59 130 246 / 0.32)", "0 0 0 rgb(59 130 246 / 0)"] }}
        className="h-full w-[82%] rounded-lg border border-sky-300/28 bg-[#071827]/88 p-2"
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-1 flex items-center justify-between text-[0.42rem] font-semibold uppercase tracking-[0.12em] text-sky-200">
          <span>AI Assistant</span>
          <span className="grid h-4 w-4 place-items-center rounded-full border border-sky-300/40">AI</span>
        </div>
        <p className="text-[0.48rem] font-semibold leading-[1.22] text-white/90">High temperature alert on AHU-3. SOP ready.</p>
        <div className="mt-2 flex gap-1 text-[0.38rem] font-semibold uppercase">
          <span className="rounded bg-sky-500/80 px-2 py-1">View SOP</span>
          <span className="rounded bg-white/12 px-2 py-1">Dismiss</span>
        </div>
      </motion.div>
    </div>
  );
}

function RecognitionVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={reducedMotion ? undefined : { scale: [0.98, 1.02, 0.98] }}
        className="grid h-[72%] w-[70%] place-items-center rounded-lg border border-blue-300/30 bg-[#061623]/86 text-center text-white"
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-500/25 text-blue-200">
          <UserRound aria-hidden="true" size={18} />
        </span>
        <div>
          <p className="text-[0.55rem] font-semibold">Welcome, Arjun</p>
          <p className="mt-1 rounded bg-blue-500/24 px-2 py-1 text-[0.38rem] font-bold uppercase tracking-[0.1em] text-blue-100">Profile Loaded</p>
        </div>
      </motion.div>
    </div>
  );
}

function MonitorPositionVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <motion.span
        animate={reducedMotion ? undefined : { y: [-6, 6, -6] }}
        className="absolute right-[12%] top-[22%] h-[45%] w-[2px] bg-blue-300"
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute right-[10.7%] top-[16%] border-x-[5px] border-b-[8px] border-x-transparent border-b-blue-200" />
      <span className="absolute right-[10.7%] bottom-[23%] border-x-[5px] border-t-[8px] border-x-transparent border-t-blue-200" />
    </>
  );
}

function LightingVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.1),rgb(0_0_0/0.22))]" />
      {["#16a34a", "#f59e0b", "#ef4444", "#2563eb"].map((color, index) => (
        <motion.span
          animate={reducedMotion ? undefined : { opacity: [0.45, 1, 0.55] }}
          className="absolute bottom-[14%] h-[5px] w-[19%] rounded-full"
          key={color}
          style={{ backgroundColor: color, left: `${9 + index * 22}%` }}
          transition={{ duration: 2 + index * 0.22, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function WellnessVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.85fr_1fr] gap-2 p-3 text-white">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: [0, 4, 0] }}
        className="grid place-items-center rounded-lg border border-emerald-300/20 bg-black/26"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#22c55e_306deg,rgb(255_255_255/0.16)_0)]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#07130f] text-lg font-semibold text-emerald-200">85</span>
        </div>
      </motion.div>
      <div className="flex flex-col justify-center text-[0.48rem] font-semibold leading-[1.3] text-emerald-50">
        <span>Sit duration</span>
        <strong className="text-[0.8rem] text-white">01:45 hr</strong>
        <span className="mt-1 text-white/70">Suggestion: stretch break</span>
      </div>
    </div>
  );
}

function PowerVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.9fr_1fr] gap-2 p-3 text-white">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: [0, 18, 0] }}
        className="grid place-items-center rounded-lg border border-blue-300/20 bg-black/26"
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#2563eb_238deg,#22c55e_0_330deg,rgb(255_255_255/0.16)_0)]">
          <span className="text-center text-[0.58rem] font-semibold leading-none">2.4 kW</span>
        </div>
      </motion.div>
      <div className="flex flex-col justify-center gap-1 text-[0.48rem] font-semibold">
        <span className="text-emerald-200">12 Online</span>
        <span className="text-sky-200">2 Idle</span>
        <span className="text-red-200">0 Fault</span>
      </div>
    </div>
  );
}

function HandoverVisual({ reducedMotion }: { reducedMotion: boolean }) {
  const rows = [
    ["Active Alarms", "3", "#ef4444"],
    ["Pending Actions", "5", "#f59e0b"],
    ["Events Logged", "12", "#2563eb"],
    ["Operator Notes", "2", "#22c55e"],
  ];

  return (
    <div className="absolute inset-0 grid place-items-center p-3">
      <motion.div
        animate={reducedMotion ? undefined : { y: [2, -2, 2] }}
        className="w-[84%] rounded-lg border border-white/12 bg-[#071827]/88 p-2"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="mb-1 text-[0.42rem] font-semibold uppercase tracking-[0.12em] text-white/76">Shift Handover Summary</p>
        {rows.map(([label, value, color]) => (
          <div className="flex items-center justify-between border-t border-white/10 py-1 text-[0.42rem] font-semibold text-white" key={label}>
            <span>{label}</span>
            <span className="rounded-full px-2 py-0.5 text-[0.36rem] font-semibold" style={{ backgroundColor: color }}>{value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AlertnessVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 p-[0.55rem] text-white">
      <div className="grid h-full grid-cols-[0.95fr_1fr] gap-2">
        <div className="rounded border border-emerald-300/24 bg-black/30 p-2">
          <p className="text-[0.36rem] font-bold uppercase tracking-[0.14em] text-emerald-200">Alertness Score</p>
          <motion.div
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            className="mx-auto mt-1 grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#22c55e_96deg,rgb(34_197_94/0.18)_0)]"
            initial={reducedMotion ? false : { opacity: 0.72, scale: 0.82 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#07130f] text-xl font-semibold text-emerald-300">92</div>
          </motion.div>
        </div>
        <div className="grid gap-1 text-[0.48rem]">
          {["Posture active", "Break reminder 20 min", "Fatigue level low"].map((item) => (
            <span className="rounded border border-emerald-300/16 bg-black/25 px-2 py-1 text-emerald-100" key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <div className="absolute right-3 top-2 space-y-1.5 text-[0.46rem] font-semibold text-white">
        <span className="block rounded-full bg-blue-500/80 px-2 py-1">"Raise the monitor."</span>
        <span className="block rounded-full bg-slate-700/85 px-2 py-1">"Dim the lights."</span>
      </div>
      <motion.div
        animate={reducedMotion ? undefined : { scaleX: [0.4, 1, 0.6, 1] }}
        className="absolute bottom-3 left-3 h-[2px] w-[44%] origin-left bg-[linear-gradient(90deg,transparent,#38bdf8,transparent)]"
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function ControllerVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={reducedMotion ? undefined : { y: [2, -2, 2] }}
        className="grid h-[82%] w-[62%] rotate-[-5deg] grid-cols-3 gap-1 rounded-lg border border-sky-300/25 bg-[#122131] p-2 shadow-2xl"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {["Light", "Blinds", "Temp", "Displays", "Audio", "Screens"].map((item) => (
          <span className="grid place-items-center rounded bg-slate-800/95 text-[0.38rem] font-bold uppercase text-sky-100" key={item}>{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

function CollisionVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <motion.div
        animate={reducedMotion ? undefined : { opacity: [0.2, 0.8, 0.2], scaleX: [0.75, 1, 0.75] }}
        className="absolute bottom-[22%] left-[24%] h-[18%] w-[58%] rounded-full border border-red-400/80 bg-red-500/24 blur-[1px]"
        transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute bottom-[30%] left-[49%] text-xl font-semibold text-white">!</span>
    </>
  );
}

function AwarenessVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <motion.div
        animate={reducedMotion ? undefined : { x: ["-12%", "12%", "-12%"] }}
        className="absolute inset-y-0 left-[8%] w-[24%] bg-[linear-gradient(90deg,transparent,rgb(56_189_248/0.28),transparent)]"
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-4 bottom-3 grid grid-cols-5 gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <span className="h-1 rounded-full bg-sky-300/55" key={index} />
        ))}
      </div>
    </>
  );
}

function RfidVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: [-4, 0, -4], x: [-6, 2, -6] }}
        className="grid h-[42%] w-[45%] place-items-center rounded border border-white/40 bg-white text-[0.58rem] font-semibold text-control-text shadow-xl"
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ONE<span className="text-control-warm">PWS</span>
      </motion.div>
      <span className="absolute bottom-[15%] h-10 w-10 rounded-full border border-sky-300/55" />
      <span className="absolute bottom-[21%] h-5 w-5 rounded-full bg-sky-400/24" />
    </div>
  );
}

function MoldedVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      animate={reducedMotion ? undefined : { opacity: [0.15, 0.45, 0.15] }}
      className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(0deg,rgb(14_165_233/0.28),transparent)]"
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ArmVisual({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <motion.span
        animate={reducedMotion ? undefined : { y: [-8, 8, -8] }}
        className="absolute right-8 top-4 h-12 w-[2px] bg-white/75"
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute right-[1.55rem] top-3 border-x-[5px] border-b-[8px] border-x-transparent border-b-white/75" />
      <span className="absolute right-[1.55rem] bottom-3 border-x-[5px] border-t-[8px] border-x-transparent border-t-white/75" />
    </>
  );
}

function OperationsStage({ chapter, scenario }: { chapter: Chapter; scenario: OperationsScenario }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const [activeCapabilityId, setActiveCapabilityId] = useState(scenario.capabilities[0]?.id ?? "");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [operatorConfirmed, setOperatorConfirmed] = useState(false);
  const activeCapability = useMemo(
    () => scenario.capabilities.find((capability) => capability.id === activeCapabilityId) ?? scenario.capabilities[0],
    [activeCapabilityId, scenario.capabilities],
  );
  const activeStep = scenario.timeline[Math.min(activeStepIndex, scenario.timeline.length - 1)];
  const activePhase = scenario.mode === "incident-sequence" ? phaseForIncidentStatus(activeStep.status) : activeCapability.phase;
  const activeHumanLoopStage = operatorConfirmed ? "operator-confirmation" : activeCapability.humanLoopStage;
  const cue = [...(intelligentOperationsNarration[chapter.id] ?? [])]
    .reverse()
    .find((item) => item.atMs <= activeStepIndex * 8_000);

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: scenario.mode });
  }, [chapter.id, scenario.mode]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = scenario.timeline.slice(1, 8).map((_, index) =>
      window.setTimeout(() => {
        setActiveStepIndex((current) => Math.min(current + 1, scenario.timeline.length - 1));
        if (index === 3) {
          setOperatorConfirmed(true);
        }
      }, 4_000 + index * 5_600),
    );

    const capabilityTimers = scenario.capabilities.slice(0, 6).map((capability, index) =>
      window.setTimeout(() => {
        setActiveCapabilityId(capability.id);
        recordIntelligentOperationsEvent(eventForCapability(capability), { chapterId: chapter.id, detail: capability.name });
      }, 5_000 + index * 6_000),
    );

    return () => [...timers, ...capabilityTimers].forEach((timer) => window.clearTimeout(timer));
  }, [chapter.id, scenario.capabilities, scenario.timeline, state.mode]);

  function selectCapability(capability: OperationsCapability) {
    setActiveCapabilityId(capability.id);
    setOperatorConfirmed(false);
    recordIntelligentOperationsEvent(eventForCapability(capability), { chapterId: chapter.id, detail: capability.name });
  }

  function selectStep(index: number) {
    setActiveStepIndex(index);
    setOperatorConfirmed(index >= 8);
    recordIntelligentOperationsEvent(index >= 9 ? "incident_resolved" : "incident_step_selected", {
      chapterId: chapter.id,
      detail: scenario.timeline[index]?.title,
    });
  }

  function confirmAction() {
    setOperatorConfirmed(true);
    recordIntelligentOperationsEvent("operator_confirmation_selected", { chapterId: chapter.id, detail: activeCapability.name });
  }

  function reset() {
    setActiveStepIndex(0);
    setActiveCapabilityId(scenario.capabilities[0]?.id ?? "");
    setOperatorConfirmed(false);
    setTechnicalOpen(false);
    recordIntelligentOperationsEvent("normal_state_viewed", { chapterId: chapter.id, detail: scenario.statement });
  }

  return (
    <SceneCanvas className={`pws-ops-scene pws-ops-${scenario.mode}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "operational-dark"}>
      <StructuralLayer variant="data" />
      <AmbientLayer atmosphere={activePhase === "normal" ? "linework" : activePhase === "response" ? "bloom" : "data-trace"} intensity={activePhase === "normal" ? "low" : "medium"} />
      <SafeArea className="pws-ops-safe">
        <section className="pws-ops-narrative">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <p className="pws-ops-principle mt-6">{scenario.principle}</p>
        </section>

        <section className="pws-ops-stage-wrap" aria-label={`${scenario.title}: ${activePhase}`}>
          <OperationsRoomVisual
            activeCapability={activeCapability}
            activeHumanLoopStage={activeHumanLoopStage}
            activePhase={activePhase}
            activeStepIndex={activeStepIndex}
            operatorConfirmed={operatorConfirmed}
            reducedMotion={reducedMotion}
            scenario={scenario}
          />
          {technicalOpen ? <OperationsTechnicalLayer capability={activeCapability} chapter={chapter} scenario={scenario} /> : null}
        </section>

        <section className="pws-ops-controls" aria-label="Intelligent operations controls">
          <div>
            <p className="pws-technical-label">{scenario.mode === "incident-sequence" ? "Operational sequence" : "Connected capabilities"}</p>
            {scenario.mode === "incident-sequence" ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {scenario.timeline.map((step, index) => (
                  <button
                    aria-pressed={activeStepIndex === index}
                    className={`pws-ops-step-button ${activeStepIndex === index ? "is-active" : ""}`}
                    key={step.id}
                    onClick={() => selectStep(index)}
                    type="button"
                  >
                    {step.shortLabel}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {scenario.capabilities.map((capability) => (
                  <button
                    aria-pressed={activeCapability.id === capability.id}
                    className={`pws-ops-capability-button ${activeCapability.id === capability.id ? "is-active" : ""}`}
                    key={capability.id}
                    onClick={() => selectCapability(capability)}
                    type="button"
                  >
                    {capability.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <PrecisionButton onClick={() => setTechnicalOpen((open) => !open)}>
              {technicalOpen ? "Hide technical" : "Integration boundary"}
            </PrecisionButton>
            <PrecisionButton onClick={confirmAction} variant="primary">Confirm next action</PrecisionButton>
            <PrecisionButton onClick={reset}>Reset to normal</PrecisionButton>
          </div>
        </section>

        <aside className="pws-ops-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{cue?.text ?? activeStep.operatorMessage ?? activeCapability.operatorRole}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function OperationsRoomVisual({
  activeCapability,
  activeHumanLoopStage,
  activePhase,
  activeStepIndex,
  operatorConfirmed,
  reducedMotion,
  scenario,
}: {
  activeCapability: OperationsCapability;
  activeHumanLoopStage: HumanLoopStage;
  activePhase: OperationsPhase;
  activeStepIndex: number;
  operatorConfirmed: boolean;
  reducedMotion: boolean;
  scenario: OperationsScenario;
}) {
  const activeStep = scenario.timeline[Math.min(activeStepIndex, scenario.timeline.length - 1)];

  return (
    <motion.div
      animate={{ opacity: 1, scale: reducedMotion || activePhase === "normal" ? 1 : 1.006 }}
      className="pws-ops-stage"
      data-confirmed={operatorConfirmed}
      data-loop={activeHumanLoopStage}
      data-phase={activePhase}
      transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pws-ops-video-wall" />
      <div className="pws-ops-supervisor" />
      <div className="pws-ops-operator-zone" />
      <div className="pws-ops-workstation" />
      <div className="pws-ops-collaboration-zone" />
      <div className="pws-ops-environment-ring" />
      <div className="pws-ops-event-source" />
      <div className="pws-ops-signal-path" />
      <div className="pws-ops-recommendation">
        <strong>{labelForHumanLoopStage(activeHumanLoopStage)}</strong>
        <span>{activeCapability.visualRole}</span>
      </div>
      <div className="pws-ops-step-card">
        <span>{activeStep.timestamp}</span>
        <strong>{activeStep.title}</strong>
        <em>{activeStep.systemMessage}</em>
      </div>
      <div className="pws-ops-decision-rail">
        {scenario.decisionPoints.map((point, index) => (
          <span
            className={activeHumanLoopStage === point.stage || index <= activeStepIndex / 2 ? "is-active" : ""}
            key={point.id}
            style={{ "--ops-decision-i": index } as CSSProperties}
          >
            {point.label}
          </span>
        ))}
      </div>
      <div className="pws-ops-capability-label">
        <strong>{activeCapability.name}</strong>
        <span>{activeCapability.operatorRole}</span>
      </div>
    </motion.div>
  );
}

function OperationsTechnicalLayer({
  capability,
  chapter,
  scenario,
}: {
  capability: OperationsCapability;
  chapter: Chapter;
  scenario: OperationsScenario;
}) {
  return (
    <div className="pws-ops-technical-layer">
      <p className="pws-technical-label">Integration Boundary</p>
      <h2>{capability.name}</h2>
      <p>{capability.approvedCapability}</p>
      <ul>
        {chapter.technicalLayers.map((layer) => <li key={layer}>{layer}</li>)}
        {capability.featureStory?.technicalDetails.slice(0, 4).map((detail) => <li key={detail}>{detail}</li>)}
      </ul>
      <p>{capability.integrationBoundary}</p>
      <p>{scenario.claimBoundary}</p>
      <p>{chapter.presenterNotes ?? chapter.presenterTalkingPoint}</p>
    </div>
  );
}

function phaseForIncidentStatus(status: string): OperationsPhase {
  switch (status) {
    case "detecting":
      return "event";
    case "prioritising":
      return "prioritised";
    case "coordinating":
      return "collaboration";
    case "resolving":
      return "resolved";
    case "summarising":
      return "summary";
    default:
      return "normal";
  }
}

function labelForHumanLoopStage(stage: HumanLoopStage) {
  switch (stage) {
    case "system-observation":
      return "System observes";
    case "system-recommendation":
      return "System recommends";
    case "operator-confirmation":
      return "Operator confirms";
    case "operator-action":
      return "Operator acts";
    case "system-response":
      return "System responds";
    case "recorded-outcome":
      return "Outcome recorded";
    default:
      return "Human in the loop";
  }
}

function eventForCapability(capability: OperationsCapability): IntelligentOperationsEvent {
  switch (capability.category) {
    case "ai-assistance":
      return "ai_assistant_previewed";
    case "voice-control":
      return "voice_command_previewed";
    case "oams":
      return "oams_layer_viewed";
    case "display-orchestration":
      return "display_orchestration_viewed";
    case "environmental-response":
      return "environmental_response_previewed";
    case "collaboration":
      return "collaboration_workflow_activated";
    default:
      return "normal_state_viewed";
  }
}
