import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import "@google/model-viewer";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  DoorOpen,
  Expand,
  Headphones,
  Map as MapIcon,
  Minimize2,
  MonitorCog,
  Palette,
  Puzzle,
  Rotate3D,
  Ruler,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SceneCanvas, SafeArea, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordProductExperienceEvent } from "./productAnalytics";
import { getProductExperience, type ProductExperience, type ProductModule, type ProductSceneMode } from "./productExperienceConfig";
import { productNarration } from "./productNarration";

export function ProductExperienceScene({ chapter, fallback }: { chapter: Chapter; fallback: ReactNode }) {
  if (chapter.id === "console-portfolio") {
    return <ConsolePortfolioStage chapter={chapter} />;
  }

  const consoleDetail = consoleDetailByChapterId.get(chapter.id);
  if (consoleDetail) {
    return <ConsoleDetailStage chapter={chapter} detail={consoleDetail} />;
  }

  const experience = getProductExperience(chapter.id);
  if (!experience) {
    return <>{fallback}</>;
  }

  return <ProductExperienceStage chapter={chapter} experience={experience} />;
}

export function isConsoleExperienceChapter(chapterId: string) {
  return chapterId === "console-portfolio" || consoleDetailByChapterId.has(chapterId);
}

type PortfolioSpec = {
  label: string;
  value: string;
  Icon: typeof Crosshair;
};

type PortfolioCard = {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  soft: string;
  specs: PortfolioSpec[];
};

type PortfolioSupport = {
  title: string;
  detail: string;
  accent: string;
  soft: string;
  Icon: typeof ShieldCheck;
};

type ConsoleDetail = PortfolioCard & {
  chapterId: string;
  modelPath: string;
  promise: string;
  fit: string;
  descriptor: string;
  capabilities: string[];
  operatorValue: string[];
  colors: ConsoleColorOption[];
  views: ConsoleView[];
  hotspots: ConsoleHotspot[];
  ergonomicViews: ConsoleErgoView[];
  relatedFeatures: string[];
};

type ConsoleColorOption = {
  name: string;
  surface: string;
  edge: string;
};

type ConsoleView = {
  id: string;
  label: string;
  cameraOrbit: string;
  transform: string;
  caption: string;
};

type ConsoleHotspot = {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
  Icon: typeof Crosshair;
};

type ConsoleErgoView = {
  id: string;
  label: string;
  description: string;
  metric: string;
  Icon: typeof Crosshair;
};

const consolePortfolioCards: PortfolioCard[] = [
  {
    id: "edge",
    name: "XLAT XE",
    title: "Versatile Command Console",
    description: "Designed to adapt around the operator, integrating technology and controls into a highly ergonomic command environment.",
    image: "/assets/products/consoles/xlat-xe.png",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.12)",
    specs: [
      { label: "Key Features", value: "Dual-pole sit-stand mechanism\nIntegrated anti-collision\nFloating CPU cabinet\nFloating slat wall\nFlexible cable management", Icon: SlidersHorizontal },
      { label: "Key Highlight", value: "Adaptable ergonomics + integrated technology", Icon: Star },
    ],
  },
  {
    id: "linear",
    name: "XLAT SE",
    title: "Intelligent Operator Console",
    description: "An operator-focused console with an intelligent dashboard designed for comfort, accessibility and faster control during critical operations.",
    image: "/assets/products/consoles/xlat-se.png",
    accent: "#2367b7",
    soft: "rgb(35 103 183 / 0.12)",
    specs: [
      { label: "Key Features", value: "Intelligent dashboard\nSmart-touch controls\nCompact footprint\nOptimized cable management\nConfigurable equipment storage", Icon: SlidersHorizontal },
      { label: "Key Highlight", value: "Compact design + intelligent control", Icon: Star },
    ],
  },
  {
    id: "vista",
    name: "XLAT ZE",
    title: "High-Performance Operator Console",
    description: "Engineered for extended mission-critical operations with ergonomic detailing, modular intelligence and integrated equipment management.",
    image: "/assets/products/consoles/xlat-ze.png",
    accent: "#0f9678",
    soft: "rgb(15 150 120 / 0.12)",
    specs: [
      { label: "Key Features", value: "PU-edge ergonomic worksurface\nMono-pole construction\nModular architecture\nCPU / Server / KVM integration\nPatch-panel integration", Icon: SlidersHorizontal },
      { label: "Key Highlight", value: "Ergonomics + modular intelligence", Icon: Star },
    ],
  },
  {
    id: "elevate",
    name: "Dynamic XE",
    title: "Next-Generation Intelligent Console",
    description: "A highly flexible operator environment developed for critical operations, advanced control and enhanced operator performance.",
    image: "/assets/products/consoles/dynamic-xe.png",
    accent: "#7a3db7",
    soft: "rgb(122 61 183 / 0.12)",
    specs: [
      { label: "Key Features", value: "3D motion control\nEmergency indication\nProgrammable touchscreen\nSingle-touch control\nIntegrated visualization\nErgonomic adjustment", Icon: SlidersHorizontal },
      { label: "Key Highlight", value: "Intelligent control + operator adaptability", Icon: Star },
    ],
  },
  {
    id: "collab",
    name: "Center HUB",
    title: "Collaborative Control Hub",
    description: "A centralized ergonomic workstation created for teamwork, shared monitoring and collaborative operations.",
    image: "/assets/products/consoles/center-hub.png",
    accent: "#f06b18",
    soft: "rgb(240 107 24 / 0.12)",
    specs: [
      { label: "Best suited for", value: "CCTV - Emergency Response - Industrial Monitoring - Collaborative Control", Icon: Crosshair },
      { label: "Key Highlight", value: "Centralized teamwork + shared awareness", Icon: Star },
    ],
  },
];

const consoleSupportItems: PortfolioSupport[] = [
  {
    title: "Ergonomic by Design",
    detail: "Designed around operator comfort, reach and visibility.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: ShieldCheck,
  },
  {
    title: "Technology Integrated",
    detail: "Built to accommodate displays, equipment and control systems.",
    accent: "#2367b7",
    soft: "rgb(35 103 183 / 0.11)",
    Icon: Puzzle,
  },
  {
    title: "Modular Architecture",
    detail: "Flexible configurations that adapt to operational requirements.",
    accent: "#0f9678",
    soft: "rgb(15 150 120 / 0.11)",
    Icon: Settings,
  },
  {
    title: "Built for 24/7 Operations",
    detail: "Engineered for demanding mission-critical environments.",
    accent: "#7a3db7",
    soft: "rgb(122 61 183 / 0.11)",
    Icon: SlidersHorizontal,
  },
  {
    title: "Future Ready",
    detail: "Designed to accommodate evolving technology and operational needs.",
    accent: "#f06b18",
    soft: "rgb(240 107 24 / 0.11)",
    Icon: Headphones,
  },
];

const commonConsoleColors: ConsoleColorOption[] = [
  { name: "Polar White", surface: "#f8fafc", edge: "#d9dee6" },
  { name: "Graphite", surface: "#2f343b", edge: "#111827" },
  { name: "Warm Grey", surface: "#d9d4cc", edge: "#9ca3af" },
  { name: "Signal Accent", surface: "#f8fafc", edge: "#d51d2a" },
];

const commonConsoleViews: ConsoleView[] = [
  { id: "front", label: "Front", cameraOrbit: "0deg 79deg 118%", transform: "translate3d(0,0,0) scale(1.02)", caption: "Operator-facing desk profile with monitors and primary controls." },
  { id: "left", label: "Left 90", cameraOrbit: "-90deg 79deg 118%", transform: "translate3d(-3.5%,0,0) scale(1.08) rotateY(4deg)", caption: "Side depth, cable access and return geometry." },
  { id: "rear", label: "Rear", cameraOrbit: "180deg 79deg 118%", transform: "translate3d(0,-1%,0) scale(1.12)", caption: "Service side view for access panels and integration channels." },
  { id: "right", label: "Right 90", cameraOrbit: "90deg 79deg 118%", transform: "translate3d(3.5%,0,0) scale(1.08) rotateY(-4deg)", caption: "Equipment bay, operator clearance and end-profile view." },
];

function enlargedCameraOrbit(cameraOrbit: string) {
  return cameraOrbit.replace(/[\d.]+%$/, "88%");
}

const commonHotspots: ConsoleHotspot[] = [
  { id: "door", label: "Service Door", description: "Click to reveal the front access door and maintenance bay for quick equipment service.", x: "38%", y: "64%", Icon: DoorOpen },
  { id: "cable", label: "Cable Channel", description: "Dedicated routing keeps AV, IT and power paths organized, accessible and separated.", x: "62%", y: "70%", Icon: Puzzle },
  { id: "monitor", label: "Monitor Rail", description: "Display supports align monitors to sightline requirements and task priorities.", x: "54%", y: "34%", Icon: MonitorCog },
  { id: "edge", label: "Edge Detail", description: "Durable work-surface edges resist daily impact while preserving a premium finish.", x: "24%", y: "55%", Icon: ShieldCheck },
];

const commonErgoViews: ConsoleErgoView[] = [
  { id: "sightline", label: "Sightline", description: "Screens are positioned for clear viewing with less neck movement across long shifts.", metric: "15° comfort viewing", Icon: Crosshair },
  { id: "reach", label: "Reach Zone", description: "Primary controls stay inside the comfortable reach envelope for frequent actions.", metric: "350-600 mm primary zone", Icon: Ruler },
  { id: "posture", label: "Posture", description: "Desk height, leg clearance and seating geometry support neutral operating posture.", metric: "Neutral seated posture", Icon: UserRound },
];

const ergonomicConsoleViews = [
  {
    title: "Seated View",
    description: "Optimal height and monitor angle for focused operations.",
    image: "/assets/products/ergonomic-views/seated-view.png",
  },
  {
    title: "Standing View",
    description: "Adjustable height for comfort and flexibility throughout the day.",
    image: "/assets/products/ergonomic-views/standing-view.png",
  },
  {
    title: "Reach Zone",
    description: "Everything within comfortable reach for maximum ease.",
    image: "/assets/products/ergonomic-views/reach-zone.png",
  },
  {
    title: "Sightline View",
    description: "Clear line of sight to critical information at all times.",
    image: "/assets/products/ergonomic-views/sightline-view.png",
  },
];

const consoleFeatureStripItems = [
  { label: "Layout variants", icon: "/assets/products/console-feature-icons/layout-variants.png" },
  { label: "Accessories", icon: "/assets/products/console-feature-icons/accessories.png" },
  { label: "Cable management", icon: "/assets/products/console-feature-icons/cable-management.png" },
  { label: "Materials", icon: "/assets/products/console-feature-icons/materials.png" },
  { label: "Lighting", icon: "/assets/products/console-feature-icons/lighting.png" },
  { label: "Storage", icon: "/assets/products/console-feature-icons/storage.png" },
  { label: "Control modules", icon: "/assets/products/console-feature-icons/control-modules.png" },
  { label: "Export specification", icon: "/assets/products/console-feature-icons/export-specification.png" },
];

const consoleDetailSlides: ConsoleDetail[] = consolePortfolioCards.map((card) => {
  const detailById: Record<string, Omit<ConsoleDetail, keyof PortfolioCard>> = {
    edge: {
      chapterId: "console-detail-edge",
      modelPath: "/assets/models/consoles/xlat-xe.glb",
      descriptor: "Versatile command console",
      promise: "XLAT XE adapts around the operator, integrating technology and controls into a highly ergonomic command environment.",
      fit: "Best suited for command and control centers where one operator must maintain panoramic awareness across multiple systems.",
      capabilities: ["Dual-pole sit-stand mechanism", "Integrated anti-collision", "Floating CPU cabinet", "Floating slat wall", "Flexible cable management"],
      operatorValue: ["Adaptable ergonomics", "Integrated technology", "Controls organized around operator reach"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Sit-stand command position", "Floating CPU storage", "Floating slat wall", "Flexible cable routing"],
    },
    linear: {
      chapterId: "console-detail-linear",
      modelPath: "/assets/models/consoles/xlat-se.glb",
      descriptor: "Intelligent operator console",
      promise: "XLAT SE combines an operator-focused console with an intelligent dashboard for comfort, accessibility and faster control during critical operations.",
      fit: "Best suited for critical operations where compact planning, accessible controls and intelligent operator support are required.",
      capabilities: ["Intelligent dashboard", "Smart-touch controls", "Compact footprint", "Optimized cable management", "Configurable equipment storage"],
      operatorValue: ["Compact design", "Intelligent control", "Comfortable access to critical functions"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Intelligent dashboard", "Smart-touch controls", "Compact equipment storage", "Optimized cable routing"],
    },
    vista: {
      chapterId: "console-detail-vista",
      modelPath: "/assets/models/consoles/xlat-ze.glb",
      descriptor: "High-performance operator console",
      promise: "XLAT ZE supports extended mission-critical operations with ergonomic detailing, modular intelligence and integrated equipment management.",
      fit: "Best suited for extended operations that need ergonomic worksurfaces, modular equipment planning and integrated technical infrastructure.",
      capabilities: ["PU-edge ergonomic worksurface", "Mono-pole construction", "Modular architecture", "CPU / Server / KVM integration", "Patch-panel integration"],
      operatorValue: ["Ergonomic support for long shifts", "Modular intelligence", "Integrated equipment management"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["PU-edge worksurface", "Mono-pole console structure", "Integrated KVM and server planning", "Patch-panel access"],
    },
    elevate: {
      chapterId: "console-detail-elevate",
      modelPath: "/assets/models/consoles/dynamic-xe.glb",
      descriptor: "Next-generation intelligent console",
      promise: "Dynamic XE creates a highly flexible operator environment for critical operations, advanced control and enhanced operator performance.",
      fit: "Best suited for critical operations that require intelligent control, adaptable ergonomics and fast operator response.",
      capabilities: ["3D motion control", "Emergency indication", "Programmable touchscreen", "Single-touch control", "Integrated visualization", "Ergonomic adjustment"],
      operatorValue: ["Intelligent control", "Operator adaptability", "Enhanced performance during critical operations"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["3D motion control", "Programmable touchscreen", "Single-touch controls", "Integrated visualization"],
    },
    collab: {
      chapterId: "console-detail-collab",
      modelPath: "/assets/models/consoles/center-hub.glb",
      descriptor: "Collaborative control hub",
      promise: "Center HUB creates a centralized ergonomic workstation for teamwork, shared monitoring and collaborative operations.",
      fit: "Best suited for CCTV, emergency response, industrial monitoring and collaborative control environments.",
      capabilities: ["Centralized ergonomic workstation", "Shared monitoring support", "Collaborative control layout", "Team-focused operational surface"],
      operatorValue: ["Centralized teamwork", "Shared awareness", "Faster collaborative response"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["CCTV monitoring", "Emergency response coordination", "Industrial monitoring", "Collaborative control"],
    },
  };

  return { ...card, ...detailById[card.id] };
});

const consoleDetailByChapterId = new Map(consoleDetailSlides.map((detail) => [detail.chapterId, detail]));

function ConsolePortfolioStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const processEase = [0.16, 1, 0.3, 1] as const;
  const precisionEase = [0.18, 0.86, 0.24, 1] as const;
  const popEase = [0.2, 1.08, 0.22, 1] as const;
  const duration = state.reducedMotion ? 0.01 : 0.74;
  const revealDuration = state.reducedMotion ? 0.01 : 0.92;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.022)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.022)_1px,transparent_1px)] bg-[length:5.4rem_5.4rem] opacity-65" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.6cqh] bg-white/90 backdrop-blur-[2px]" />

      {!state.reducedMotion ? (
        <>
          <motion.div
            animate={{ opacity: [0, 0.34, 0.14], scale: [0.98, 1.04, 1] }}
            className="pointer-events-none absolute left-[30cqw] top-[14cqh] h-[44cqh] w-[66cqw] rounded-full bg-[radial-gradient(circle_at_52%_45%,rgb(213_29_42/0.11),rgb(47_101_184/0.07)_36%,transparent_69%)] blur-3xl"
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.15, ease: processEase }}
          />
          <motion.div
            animate={{ opacity: [0, 0.56, 0.18], scaleX: 1 }}
            className="pointer-events-none absolute left-[25.35cqw] top-[69.4cqh] h-px w-[70cqw] origin-left bg-[linear-gradient(90deg,rgb(213_29_42/0.55),rgb(15_150_120/0.22),transparent)]"
            initial={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 1.55, delay: 0.34, ease: processEase }}
          />
        </>
      ) : null}

      <section className="absolute inset-0 z-20 px-[2.75cqw] py-[3cqh]">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[2.75cqw] top-[13cqh] z-20 h-[64cqh] w-[20.7cqw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ duration, ease: processEase }}
        >
          <p className="text-[clamp(0.64rem,0.74cqw,0.9rem)] font-semibold uppercase tracking-[0.11em] text-control-warm">
            Our Console Range
          </p>
          <div className="mt-[1.9cqh] h-[2px] w-8 bg-control-warm" />
          <h1 className="mt-[1.8cqh] text-balance text-[clamp(1.98rem,2.58cqw,3.42rem)] font-extrabold leading-[1.03] tracking-normal text-control-text md:text-[3.6cqw]">
            Control-Room Console <span className="text-control-warm">Portfolio.</span>
          </h1>
          <div className="mt-[2.2cqh] h-px w-8 bg-slate-300" />
          <p className="mt-[1.7cqh] max-w-[17.8rem] text-[clamp(1rem,1.04cqw,1.22rem)] leading-[1.48] text-control-text">
            Engineered for performance.
            <br />
            Designed for people.
            <br />
            Built for 24/7 mission-critical operations.
          </p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 flex items-start gap-[0.9cqw] rounded-[0.8rem] border border-white/85 bg-white/76 p-[0.95cqw] shadow-[0_1.1rem_2.65rem_rgb(15_23_42/0.095)] "
            initial={state.reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.72, delay: 0.42, ease: popEase }}
            whileHover={state.reducedMotion ? undefined : { y: -3, scale: 1.01, transition: { duration: 0.36, ease: precisionEase } }}
          >
            <span className="grid h-[3.08rem] w-[3.08rem] shrink-0 place-items-center rounded-full bg-[rgb(213_29_42/0.1)] text-control-warm">
              <UserRound size={29} strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-[clamp(0.7rem,0.76cqw,0.92rem)] font-semibold text-control-text">Human-Centred by Design</h2>
              <p className="mt-[0.58cqh] text-[clamp(0.61rem,0.68cqw,0.82rem)] leading-[1.45] text-slate-700">
                Every console is built around operator comfort, optimal reach and seamless system integration.
              </p>
            </div>
          </motion.div>
        </motion.aside>

        <motion.div
          animate="show"
          className="absolute left-[25.3cqw] right-[2.75cqw] top-[13.8cqh] grid h-[63.2cqh] grid-cols-5 gap-[0.82cqw] [perspective:1600px]"
          initial="hidden"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: state.reducedMotion ? 0 : 0.105, delayChildren: state.reducedMotion ? 0 : 0.12 } },
          }}
        >
          {consolePortfolioCards.map((item, cardIndex) => {
            const highlightSpec = item.specs.find((spec) => spec.label === "Key Highlight");
            const primarySpecs = item.specs.filter((spec) => spec.label !== "Key Highlight");

            return (
              <motion.button
              aria-label={`Open ${item.name} ${item.title} details`}
              className="group relative flex min-h-0 flex-col overflow-hidden rounded-[0.82rem] border border-white/90 bg-white/90 text-left "
              key={item.id}
              onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: `console-detail-${item.id}` })}
              style={{ borderBottom: `3px solid ${item.accent}` }}
              type="button"
              variants={{
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: revealDuration, ease: popEase },
                },
              }}
              whileHover={
                state.reducedMotion
                  ? undefined
                  : {
                      y: -7,

                      boxShadow: "0 1.45rem 3rem rgb(15 23 42 / 0.14)",
                      transition: { duration: 0.42, ease: precisionEase },
                    }
              }
            >
              <motion.div
                className="pointer-events-none absolute inset-x-[0.75cqw] top-[16.2cqh] z-10 h-px origin-left"
                initial={state.reducedMotion ? false : { scaleX: 0, opacity: 0 }}
                style={{ backgroundColor: item.accent }}
                animate={{ scaleX: 1, opacity: 0.42 }}
                transition={{ duration: 0.8, delay: 0.44 + cardIndex * 0.08, ease: precisionEase }}
              />
              <div className="relative h-[16.2cqh] overflow-hidden bg-[linear-gradient(135deg,#f5f7f9,#dce2e8)]">
                <img
                  alt={`${item.title} product render`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  src={item.image}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(255_255_255/0.28))]" />
                {!state.reducedMotion ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[-38%] w-[30%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.48),transparent)]"
                    animate={{ x: ["0%", "520%"] }}
                    transition={{ duration: 1.5, delay: 0.6 + cardIndex * 0.08, ease: precisionEase }}
                  />
                ) : null}
              </div>
              <div className="flex min-h-0 flex-1 flex-col px-[0.92cqw] py-[1.08cqh]">
                <div className="flex h-[5.1rem] items-start justify-between gap-[0.5cqw]">
                  <div>
                    <p className="text-[clamp(0.92rem,1.02cqw,1.18rem)] font-semibold uppercase leading-none" style={{ color: item.accent }}>
                      {item.name}
                    </p>
                    <h2 className="mt-[0.55cqh] text-[clamp(0.92rem,1cqw,1.16rem)] font-semibold leading-[1.08] text-control-text">
                      {item.title}
                    </h2>
                  </div>
                  <span className="mt-[-0.08rem] h-[0.54rem] w-[0.54rem] shrink-0 rounded-full shadow-[0_0_0_0.28rem_rgb(255_255_255/0.9)]" style={{ backgroundColor: item.accent }} />
                </div>
                <p className="mt-[0.55cqh] h-[7.3rem] text-[clamp(0.72rem,0.76cqw,0.9rem)] font-medium leading-[1.32] text-slate-700">
                  {item.description}
                </p>
                <div className="my-[0.82cqh] h-px bg-slate-200/90" />
                <dl className="grid gap-[0.58cqh] self-stretch">
                  {primarySpecs.map((spec, specIndex) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-[1.22rem_1fr] gap-x-[0.48cqw] rounded-[0.58rem] bg-slate-50/78 px-[0.58cqw] py-[0.62cqh]"
                      initial={state.reducedMotion ? false : { opacity: 0, x: -8 }}
                      key={spec.label}
                      transition={{ duration: 0.46, delay: 0.38 + cardIndex * 0.08 + specIndex * 0.035, ease: precisionEase }}
                    >
                      <spec.Icon aria-hidden="true" className="mt-[0.02rem]" color={item.accent} size={17} strokeWidth={1.9} />
                      <div>
                        <dt className="text-[clamp(0.58rem,0.62cqw,0.74rem)] font-semibold uppercase leading-none text-control-text">{spec.label}</dt>
                        {spec.label === "Key Features" ? (
                          <dd>
                            <ul className="mt-[0.32rem] list-disc space-y-[0.12rem] pl-[1rem] text-[clamp(0.56rem,0.6cqw,0.72rem)] font-medium leading-[1.18] text-slate-700">
                              {spec.value.split("\n").map((feature) => (
                                <li key={feature}>{feature}</li>
                              ))}
                            </ul>
                          </dd>
                        ) : (
                          <dd className="mt-[0.28rem] whitespace-pre-line text-[clamp(0.56rem,0.6cqw,0.72rem)] font-medium leading-[1.22] text-slate-700">{spec.value}</dd>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </dl>
                {highlightSpec ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto grid min-h-[4.25rem] grid-cols-[1.32rem_1fr] items-center gap-x-[0.52cqw] rounded-[0.62rem] px-[0.72cqw] py-[0.7cqh]"
                    initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
                    style={{ backgroundColor: item.soft }}
                    transition={{ duration: 0.46, delay: 0.56 + cardIndex * 0.08, ease: precisionEase }}
                  >
                    <highlightSpec.Icon aria-hidden="true" color={item.accent} size={18} strokeWidth={1.9} />
                    <p className="text-[clamp(0.58rem,0.62cqw,0.74rem)] font-semibold leading-[1.2] text-slate-800">
                      <span className="font-semibold text-control-text">{highlightSpec.label}: </span>
                      {highlightSpec.value}
                    </p>
                  </motion.div>
                ) : null}
              </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[9.45cqh] left-[1.75cqw] right-[1.75cqw] grid h-[12.2cqh] grid-cols-5 overflow-hidden rounded-[0.82rem] border border-white/85 bg-white/78 shadow-[0_1rem_2.65rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
          transition={{ duration: 0.82, delay: 0.68, ease: popEase }}
        >
          {consoleSupportItems.map((item, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-[0.82cqw] px-[1.15cqw] ${index > 0 ? "border-l border-slate-200" : ""}`}
              initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
              key={item.title}
              transition={{ duration: 0.58, delay: 0.82 + index * 0.065, ease: precisionEase }}
              whileHover={state.reducedMotion ? undefined : { backgroundColor: item.soft, transition: { duration: 0.24 } }}
            >
              <span className="grid h-[3.45rem] w-[3.45rem] shrink-0 place-items-center rounded-[0.75rem]" style={{ backgroundColor: item.soft, color: item.accent }}>
                <item.Icon size={28} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-[clamp(0.86rem,0.88cqw,1.05rem)] font-semibold leading-[1.12] text-control-text">{item.title}</h3>
                <p className="mt-[0.42cqh] text-[clamp(0.68rem,0.72cqw,0.86rem)] font-medium leading-[1.32] text-slate-700">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.56, delay: 0.74, ease: processEase }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <MapIcon aria-hidden="true" />
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
              <Headphones aria-hidden="true" />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" />
          </button>
        </motion.div>
      </section>
    </article>
  );
}

function ConsoleDetailStage({ chapter, detail }: { chapter: Chapter; detail: ConsoleDetail }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const processEase = [0.16, 1, 0.3, 1] as const;
  const precisionEase = [0.18, 0.86, 0.24, 1] as const;
  const popEase = [0.2, 1.08, 0.22, 1] as const;
  const primarySpecs = detail.specs.filter((spec) => spec.label !== "Key Highlight");
  const highlightSpec = detail.specs.find((spec) => spec.label === "Key Highlight");
  const [selectedColor, setSelectedColor] = useState(detail.colors[0]);
  const [selectedView, setSelectedView] = useState(detail.views[0]);
  const [activeHotspot, setActiveHotspot] = useState(detail.hotspots[0]);
  const [modelAvailable, setModelAvailable] = useState(true);
  const [viewerMaximized, setViewerMaximized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Render the viewer straight away so the console never flashes a still
    // photo or an empty frame; only fall back if the model is really missing.
    setModelAvailable(true);

    fetch(detail.modelPath, { method: "HEAD" })
      .then((response) => {
        if (!cancelled && !response.ok) {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        /* keep the viewer mounted - model-viewer reports its own load failure */
      });

    return () => {
      cancelled = true;
    };
  }, [detail.modelPath]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] saturate-[0.92]"
        src="/assets/products/control-room.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(116deg,rgb(255_255_255/0.84)_0%,rgb(251_252_253/0.74)_54%,rgb(237_244_248/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgb(255_255_255/0.1),transparent_42%),linear-gradient(90deg,rgb(255_255_255/0.72),rgb(255_255_255/0.22)_46%,rgb(255_255_255/0.5))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.022)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.022)_1px,transparent_1px)] bg-[length:5.4rem_5.4rem] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.6cqh] bg-white/90 backdrop-blur-[2px]" />
      {!state.reducedMotion ? (
        <motion.div
          animate={{ opacity: [0, 0.42, 0.18], scale: [0.98, 1.04, 1] }}
          className="pointer-events-none absolute left-[24cqw] top-[18cqh] h-[56cqh] w-[70cqw] rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.98 }}
          style={{
            background: `radial-gradient(circle at 46% 44%, ${detail.soft}, rgb(35 103 183 / 0.07) 36%, transparent 70%)`,
          }}
          transition={{ duration: 2.15, ease: processEase }}
        />
      ) : null}

      <section className="absolute inset-0 z-20 px-[2.75cqw] py-[3cqh]">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[2.75cqw] top-[13cqh] w-[22cqw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.72, ease: processEase }}
        >
          <button
            className="inline-flex items-center gap-3 rounded-full border border-white/85 bg-white/78 px-4 py-3 text-[clamp(0.72rem,0.78cqw,0.95rem)] font-semibold uppercase tracking-[0.08em] text-control-text shadow-[0_0.75rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "console-portfolio" })}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Back to Portfolio
          </button>
          <p className="mt-[3.2cqh] text-[clamp(0.68rem,0.78cqw,0.95rem)] font-semibold uppercase tracking-[0.11em]" style={{ color: detail.accent }}>
            {detail.descriptor}
          </p>
          <div className="mt-[1.6cqh] h-[2px] w-10" style={{ backgroundColor: detail.accent }} />
          <h1 className="mt-[1.8cqh] text-balance text-[clamp(2.35rem,3.28cqw,4.25rem)] font-bold leading-[0.98] tracking-normal text-control-text md:text-[2.5cqw]">
            {detail.name}
            <span className="block text-[0.48em] leading-[1.2]" style={{ color: detail.accent }}>
              {detail.title}
            </span>
          </h1>
          <p className="mt-[2cqh] max-w-[20rem] text-[clamp(0.82rem,0.95cqw,1.12rem)] leading-[1.48] text-slate-700 md:text-[0.8cqw]">
            {detail.promise}
          </p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-[2.7cqh] rounded-[0.9rem] border border-white/85 bg-white/78 p-[1cqw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.085)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.72, delay: 0.22, ease: popEase }}
          >
            <p className="text-[clamp(0.62rem,0.7cqw,0.85rem)] font-semibold uppercase tracking-[0.08em] text-control-text">Designed for</p>
            <p className="mt-[0.8cqh] text-[clamp(0.7rem,0.78cqw,0.94rem)] leading-[1.45] text-slate-700">{detail.fit}</p>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-[1.4cqh] grid grid-cols-2 gap-[0.55cqw]"
            initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.58, delay: 0.34, ease: precisionEase }}
          >
            {primarySpecs.slice(1, 3).map((spec) => (
              <div className="rounded-[0.7rem] border border-white/80 bg-white/68 p-[0.72cqw] shadow-[0_0.7rem_1.6rem_rgb(15_23_42/0.055)]" key={spec.label}>
                <spec.Icon aria-hidden="true" color={detail.accent} size={22} strokeWidth={1.85} />
                <p className="mt-[0.55cqh] text-[clamp(0.5rem,0.56cqw,0.68rem)] font-semibold uppercase tracking-[0.05em] text-control-text">{spec.label}</p>
                <p className="mt-[0.24cqh] text-[clamp(0.58rem,0.66cqw,0.78rem)] font-semibold leading-[1.22] text-slate-700">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.aside>

        <motion.section
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute left-[26.4cqw] right-[3cqw] top-[12.3cqh] grid h-[61.6cqh] grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.58fr)] gap-[1.1cqw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
          transition={{ duration: 0.84, delay: 0.12, ease: popEase }}
        >
          <div className="relative overflow-hidden rounded-[1rem] border border-white/90 bg-white/80 shadow-[0_1.25rem_3rem_rgb(15_23_42/0.1)] ring-1 ring-slate-900/[0.04] backdrop-blur-xl">
            {modelAvailable ? (
              <>
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255/1)_0%,rgb(244_247_250/0.96)_44%,rgb(225_231_238/0.96)_100%)]" />
                <div className="pointer-events-none absolute inset-x-[10%] bottom-[15%] z-[1] h-[16%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.18)_0%,rgb(15_23_42/0.08)_34%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute left-[13%] right-[13%] top-[16%] z-[1] h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.85),transparent)]" />
                <div className="pointer-events-none absolute inset-x-[18%] bottom-[24%] z-[1] h-px bg-[linear-gradient(90deg,transparent,rgb(15_23_42/0.1),transparent)]" />
              </>
            ) : null}
            <div className="pointer-events-none absolute left-[1.25cqw] top-[1.5cqh] z-20 flex items-center gap-[0.55cqw] rounded-full border border-white/85 bg-white/78 px-[0.8cqw] py-[0.62cqh] shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
              <Rotate3D aria-hidden="true" color={detail.accent} size={20} strokeWidth={1.8} />
              <span className="text-[clamp(0.56rem,0.64cqw,0.78rem)] font-semibold uppercase tracking-[0.08em] text-control-text">360 Desk View</span>
            </div>
            <button
              aria-label="Maximize 360 desk view"
              className="absolute right-[1.25cqw] top-[1.5cqh] z-30 inline-flex items-center gap-[0.52cqw] rounded-full border border-white/85 bg-white/82 px-[0.82cqw] py-[0.62cqh] text-[clamp(0.56rem,0.64cqw,0.78rem)] font-semibold uppercase tracking-[0.08em] text-control-text shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
              onClick={() => setViewerMaximized(true)}
              type="button"
            >
              <Expand aria-hidden="true" size={18} strokeWidth={1.85} />
              Full View
            </button>
            {modelAvailable ? (
              <model-viewer
                alt={`${detail.name} ${detail.title} 3D model`}
                camera-controls
                camera-orbit={selectedView.cameraOrbit}
                camera-target="0m 0.32m 0m"
                className="absolute inset-0 z-10 h-full w-full cursor-grab active:cursor-grabbing"
                disable-tap
                environment-image="neutral"
                exposure="1.16"
                field-of-view="27deg"
                interaction-prompt="none"
                max-camera-orbit="auto 86deg 180%"
                min-camera-orbit="auto 42deg 70%"
                loading="eager"
                reveal="auto"
                shadow-intensity="0.9"
                shadow-softness="0.88"
                src={detail.modelPath}
                style={{ background: "transparent" }}
              />
            ) : (
              <>
                <motion.img
                  alt={`${detail.name} ${detail.title}`}
                  animate={{ transform: selectedView.transform }}
                  className="h-full w-full object-cover"
                  src={detail.image}
                  transition={{ duration: state.reducedMotion ? 0.01 : 0.62, ease: precisionEase }}
                />
                <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.16]" style={{ background: `linear-gradient(135deg, ${selectedColor.surface}, transparent 48%, ${selectedColor.edge})` }} />
                <div className="pointer-events-none absolute right-[1.25cqw] top-[1.5cqh] z-20 rounded-[0.72rem] border border-white/85 bg-white/78 px-[0.85cqw] py-[0.7cqh] shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                  <p className="text-[clamp(0.5rem,0.58cqw,0.7rem)] font-semibold uppercase tracking-[0.08em] text-control-text">GLB slot ready</p>
                  <p className="mt-[0.22cqh] text-[clamp(0.5rem,0.58cqw,0.7rem)] leading-[1.2] text-slate-600">{detail.modelPath}</p>
                </div>
              </>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%]" style={{ background: `linear-gradient(180deg, transparent, ${selectedColor.edge}${modelAvailable ? "14" : "30"})` }} />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,transparent_58%,rgb(255_255_255/0.72))]" style={{ opacity: modelAvailable ? 0.32 : 1 }} />
            {!state.reducedMotion ? (
              <motion.span
                aria-hidden="true"
                animate={{ x: ["-20%", "130%"], opacity: [0, 0.55, 0] }}
                className="pointer-events-none absolute inset-y-0 left-[-28%] w-[22%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.5),transparent)]"
                transition={{ duration: 1.8, delay: 0.58, ease: precisionEase }}
              />
            ) : null}

            {!modelAvailable
              ? detail.hotspots.map((hotspot, index) => {
                  const active = hotspot.id === activeHotspot.id;
                  return (
                    <button
                      aria-label={`Open hotspot: ${hotspot.label}`}
                      className="absolute z-30 grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full border border-white/90 bg-white/86 text-control-text shadow-[0_0.75rem_1.7rem_rgb(15_23_42/0.14)] backdrop-blur-xl transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot)}
                      style={{ left: hotspot.x, top: hotspot.y, color: active ? "#ffffff" : detail.accent, backgroundColor: active ? detail.accent : "rgb(255 255 255 / 0.86)" }}
                      type="button"
                    >
                      <hotspot.Icon aria-hidden="true" size={18} strokeWidth={2} />
                      {!state.reducedMotion ? (
                        <motion.span
                          aria-hidden="true"
                          animate={{ opacity: [0.36, 0], scale: [1, 1.75] }}
                          className="absolute inset-0 rounded-full border"
                          style={{ borderColor: detail.accent }}
                          transition={{ duration: 1.55, delay: index * 0.18, repeat: Infinity, ease: "easeOut" }}
                        />
                      ) : null}
                    </button>
                  );
                })
              : null}

            {!modelAvailable && activeHotspot.id === "door" ? (
              <motion.div
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                className="pointer-events-none absolute bottom-[19%] left-[37%] z-20 h-[22%] w-[14%] rounded-[0.45rem] border border-white/70 shadow-[0_1rem_2rem_rgb(15_23_42/0.22)]"
                initial={state.reducedMotion ? false : { opacity: 0, x: -22, rotateY: -28 }}
                style={{ background: `linear-gradient(135deg, ${selectedColor.edge}, #ffffff88)` }}
                transition={{ duration: 0.54, ease: popEase }}
              />
            ) : null}

            <div className="absolute bottom-[2.3cqh] left-[1.35cqw] right-[1.35cqw] z-30 grid grid-cols-[1fr_auto] items-end gap-[1cqw]">
              <div className="rounded-[0.82rem] border border-white/90 bg-white/84 px-[1cqw] py-[1.05cqh] shadow-[0_0.85rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                <p className="text-[clamp(0.62rem,0.7cqw,0.84rem)] font-semibold text-control-text">{selectedView.label} view</p>
                <p className="mt-[0.25cqh] text-[clamp(0.58rem,0.66cqw,0.78rem)] leading-[1.28] text-slate-700">{selectedView.caption}</p>
              </div>
              <div className="flex rounded-full border border-white/90 bg-white/84 p-[0.28rem] shadow-[0_0.85rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                {detail.views.map((view) => {
                  const active = view.id === selectedView.id;
                  return (
                    <button
                      aria-pressed={active}
                      className="rounded-full px-[0.82cqw] py-[0.62cqh] text-[clamp(0.52rem,0.58cqw,0.7rem)] font-semibold uppercase tracking-[0.04em] transition"
                      key={view.id}
                      onClick={() => setSelectedView(view)}
                      style={{ backgroundColor: active ? detail.accent : "transparent", color: active ? "#ffffff" : "#111827" }}
                      type="button"
                    >
                      {view.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[0.78fr_0.9fr_0.82fr] gap-[1cqh]">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[1rem] border border-white/85 bg-white/78 p-[1.05cqw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.085)] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, x: 18 }}
              transition={{ duration: 0.7, delay: 0.28, ease: processEase }}
            >
              <div className="flex items-center gap-[0.65cqw]">
                <Palette aria-hidden="true" color={detail.accent} size={24} strokeWidth={1.85} />
                <h2 className="text-[clamp(0.8rem,0.94cqw,1.12rem)] font-semibold uppercase tracking-[0.02em] text-control-text">Color options</h2>
              </div>
              <div className="mt-[1.1cqh] grid grid-cols-4 gap-[0.5cqw]">
                {detail.colors.map((color) => (
                  <button
                    aria-pressed={color.name === selectedColor.name}
                    className="group rounded-[0.7rem] border border-slate-200 bg-white/76 p-[0.42cqw] text-left shadow-[0_0.55rem_1.2rem_rgb(15_23_42/0.045)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                  >
                    <span className="block h-[2.2cqh] rounded-[0.42rem] border border-slate-200" style={{ background: `linear-gradient(90deg, ${color.surface} 0 62%, ${color.edge} 62% 100%)` }} />
                    <span className="mt-[0.45cqh] block text-[clamp(0.46rem,0.52cqw,0.62rem)] font-semibold leading-[1.08] text-control-text">{color.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="row-span-2 min-h-0 overflow-hidden rounded-[1rem] border border-white/85 bg-white/84 p-[1.05cqw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, x: 18 }}
              transition={{ duration: 0.7, delay: 0.38, ease: processEase }}
            >
              <div className="flex items-center gap-[0.65cqw]">
                <UserRound aria-hidden="true" color={detail.accent} size={24} strokeWidth={1.85} />
                <h2 className="text-[clamp(0.84rem,0.98cqw,1.16rem)] font-semibold tracking-[0.01em] text-control-text">Ergonomic Console Views</h2>
              </div>
              <div className="mt-[1.05cqh] grid h-[calc(100%-2.1rem)] min-h-0 grid-rows-4 overflow-hidden rounded-[0.9rem] border border-slate-200/70 bg-white/62">
                {ergonomicConsoleViews.map((view) => (
                  <div className="grid min-h-0 grid-cols-[43%_1fr] border-b border-slate-200/70 last:border-b-0" key={view.title}>
                    <div className="m-[0.45cqw] overflow-hidden rounded-[0.62rem] border border-slate-200/70 bg-slate-50">
                      <img alt={view.title} className="h-full w-full object-contain" src={view.image} />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center py-[0.62cqh] pl-[0.25cqw] pr-[0.8cqw]">
                      <p className="text-[clamp(0.72rem,0.86cqw,1.02rem)] font-semibold leading-[1.05] text-control-text">{view.title}</p>
                      <p className="mt-[0.42cqh] text-[0.72rem] leading-[1.25] text-slate-700 md:text-[0.6cqw]">{view.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[9.65cqh] left-[2.75cqw] right-[2.75cqw] overflow-hidden rounded-[0.9rem] border border-white/85 bg-white/82 shadow-[0_1rem_2.6rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.72, delay: 0.54, ease: popEase }}
        >
          <div className="grid grid-cols-8 divide-x divide-slate-200/80 [@container_stage_(max-width:1023px)]:grid-cols-4 [@container_stage_(max-width:1023px)]:divide-x-0 [@container_stage_(max-width:1023px)]:divide-y [@container_stage_(max-width:639px)]:grid-cols-2">
            {consoleFeatureStripItems.map((item) => (
              <div className="grid min-h-[10.6cqh] place-items-center px-[0.68cqw] py-[0.9cqh] text-center" key={item.label}>
                <img alt="" className="h-[clamp(1.65rem,2.45cqw,2.65rem)] w-[clamp(1.65rem,2.45cqw,2.65rem)] object-contain" src={item.icon} />
                <p className="mt-[0.45cqh] max-w-[8.5rem] text-[clamp(0.54rem,0.64cqw,0.78rem)] font-semibold leading-[1.08] text-control-text">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.56, delay: 0.66, ease: processEase }}
        >
          <button aria-label="Back to console portfolio" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "console-portfolio" })} title="Back to Portfolio" type="button">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <MapIcon aria-hidden="true" />
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
              <Headphones aria-hidden="true" />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" />
          </button>
        </motion.div>

        {viewerMaximized ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-[1.7cqw] z-50 rounded-[1.25rem] border border-white/90 bg-white/90 shadow-[0_2.4rem_6rem_rgb(15_23_42/0.24)] backdrop-blur-2xl"
            exit={{ opacity: 0 }}
            initial={state.reducedMotion ? false : { opacity: 0 }}
            transition={{ duration: 0.28, ease: precisionEase }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_50%_13%,rgb(255_255_255/1)_0%,rgb(244_247_250/0.98)_46%,rgb(223_230_238/0.98)_100%)]" />
            <div className="pointer-events-none absolute inset-x-[13%] bottom-[13%] h-[14%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.2)_0%,rgb(15_23_42/0.08)_36%,transparent_72%)] blur-2xl" />
            <div className="absolute left-[2cqw] top-[6.2cqh] z-30 flex items-center gap-[0.75cqw] rounded-full border border-white/85 bg-white/80 px-[1cqw] py-[0.82cqh] shadow-[0_0.8rem_2rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
              <Rotate3D aria-hidden="true" color={detail.accent} size={22} strokeWidth={1.8} />
              <span className="text-[clamp(0.66rem,0.78cqw,0.92rem)] font-semibold uppercase tracking-[0.08em] text-control-text">{detail.name} 360 Desk View</span>
            </div>
            <button
              aria-label="Restore 360 desk view"
              className="absolute right-[2cqw] top-[6.2cqh] z-30 inline-flex items-center gap-[0.6cqw] rounded-full border border-white/85 bg-white/84 px-[1cqw] py-[0.82cqh] text-[clamp(0.66rem,0.78cqw,0.92rem)] font-semibold uppercase tracking-[0.08em] text-control-text shadow-[0_0.8rem_2rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
              onClick={() => setViewerMaximized(false)}
              type="button"
            >
              <Minimize2 aria-hidden="true" size={19} strokeWidth={1.85} />
              Restore
            </button>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24%]"
              style={{ background: `linear-gradient(180deg, transparent, ${selectedColor.edge}18)` }}
            />
            {modelAvailable ? (
              <model-viewer
                alt={`${detail.name} ${detail.title} enlarged 3D model`}
                camera-controls
                camera-orbit={enlargedCameraOrbit(selectedView.cameraOrbit)}
                camera-target="0m 0.32m 0m"
                className="absolute bottom-[8.4cqh] left-[2.2cqw] right-[2.2cqw] top-[8.7cqh] z-10 h-auto w-auto cursor-grab active:cursor-grabbing"
                disable-tap
                environment-image="neutral"
                exposure="1.18"
                field-of-view="22deg"
                interaction-prompt="none"
                key={`maximized-${detail.id}`}
                max-camera-orbit="auto 86deg 132%"
                min-camera-orbit="auto 42deg 38%"
                loading="eager"
                reveal="auto"
                shadow-intensity="1"
                shadow-softness="0.92"
                src={detail.modelPath}
                style={{ background: "transparent", display: "block", height: "calc(100% - 17.1cqh)", width: "calc(100% - 4.4cqw)" }}
              />
            ) : (
              <motion.img
                alt={`${detail.name} ${detail.title} enlarged`}
                animate={{ transform: selectedView.transform }}
                className="absolute bottom-[10cqh] left-[3cqw] right-[3cqw] top-[4.8cqh] z-10 h-auto w-auto object-contain"
                src={detail.image}
                transition={{ duration: state.reducedMotion ? 0.01 : 0.62, ease: precisionEase }}
              />
            )}
            <div className="absolute bottom-[2.3cqh] right-[2cqw] z-30 rounded-[1rem] border border-white/90 bg-white/86 px-[0.9cqw] py-[0.78cqh] shadow-[0_0.85rem_2rem_rgb(15_23_42/0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-[0.55cqw]">
                <Palette aria-hidden="true" color={detail.accent} size={18} strokeWidth={1.85} />
                <span className="text-[clamp(0.58rem,0.66cqw,0.78rem)] font-semibold uppercase tracking-[0.07em] text-control-text">Color Options</span>
              </div>
              <div className="mt-[0.72cqh] flex items-center gap-[0.42cqw]">
                {detail.colors.map((color) => {
                  const active = color.name === selectedColor.name;
                  return (
                    <button
                      aria-label={`Select ${color.name}`}
                      aria-pressed={active}
                      className="grid h-[2rem] w-[2rem] place-items-center rounded-full border border-white bg-white shadow-[0_0.45rem_1rem_rgb(15_23_42/0.08)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      type="button"
                    >
                      <span
                        className="h-[1.45rem] w-[1.45rem] rounded-full border border-slate-200"
                        style={{
                          background: `linear-gradient(135deg, ${color.surface} 0 58%, ${color.edge} 58% 100%)`,
                          boxShadow: active ? `0 0 0 0.18rem ${detail.accent}33` : "none",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-[2.3cqh] left-1/2 z-30 flex -translate-x-1/2 rounded-full border border-white/90 bg-white/86 p-[0.35rem] shadow-[0_0.85rem_2rem_rgb(15_23_42/0.1)] backdrop-blur-xl">
              {detail.views.map((view) => {
                const active = view.id === selectedView.id;
                return (
                  <button
                    aria-pressed={active}
                    className="rounded-full px-[1.15cqw] py-[0.78cqh] text-[clamp(0.66rem,0.76cqw,0.9rem)] font-semibold uppercase tracking-[0.05em] transition"
                    key={view.id}
                    onClick={() => setSelectedView(view)}
                    style={{ backgroundColor: active ? detail.accent : "transparent", color: active ? "#ffffff" : "#111827" }}
                    type="button"
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </section>
    </article>
  );
}

function ProductExperienceStage({ chapter, experience }: { chapter: Chapter; experience: ProductExperience }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const [activeModuleId, setActiveModuleId] = useState(experience.modules[0]?.id ?? "");
  const [activeTaskId, setActiveTaskId] = useState(experience.taskStates[0]?.id ?? "");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const activeModule = useMemo(
    () => experience.modules.find((module) => module.id === activeModuleId) ?? experience.modules[0],
    [activeModuleId, experience.modules],
  );
  const activeCue = productNarration[chapter.id]?.[revealed ? 2 : 0];

  useEffect(() => {
    recordProductExperienceEvent("product_journey_started", { chapterId: chapter.id, detail: experience.flagshipProduct });
  }, [chapter.id, experience.flagshipProduct]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = [
      window.setTimeout(() => setRevealed(true), 3_500),
      ...experience.modules.slice(0, 4).map((module, index) =>
        window.setTimeout(() => {
          setActiveModuleId(module.id);
          recordProductExperienceEvent(eventForMode(module.mode), { chapterId: chapter.id, detail: module.productName });
        }, 8_000 + index * 7_500),
      ),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [chapter.id, experience.modules, state.mode]);

  function selectModule(module: ProductModule) {
    setActiveModuleId(module.id);
    setRevealed(true);
    recordProductExperienceEvent(eventForMode(module.mode), { chapterId: chapter.id, detail: module.productName });
  }

  function selectTask(taskId: string) {
    setActiveTaskId(taskId);
    setRevealed(true);
    recordProductExperienceEvent("product_state_changed", { chapterId: chapter.id, detail: taskId });
  }

  function revealProduct() {
    setRevealed(true);
    recordProductExperienceEvent("product_revealed", { chapterId: chapter.id, detail: experience.flagshipProduct });
  }

  return (
    <SceneCanvas className={`pws-product-experience pws-product-mode-${activeModule.mode}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "product-light"}>
      <StructuralLayer variant={activeModule.mode === "technology-integration" ? "data" : "focus"} />
      <AmbientLayer atmosphere={activeModule.mode === "materials" ? "bloom" : activeModule.mode === "technology-integration" ? "data-trace" : "linework"} intensity="low" />
      <SafeArea className="pws-product-safe">
        <section className="pws-product-story">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PrecisionButton onClick={revealProduct} variant="primary">Reveal product</PrecisionButton>
            <PrecisionButton onClick={() => setTechnicalOpen((open) => !open)}>
              {technicalOpen ? "Hide technical" : "Technical detail"}
            </PrecisionButton>
          </div>
        </section>

        <section className="pws-product-stage-wrap" aria-label={`${experience.flagshipProduct}: ${activeModule.productName}`}>
          <ProductStageVisual
            activeModule={activeModule}
            activeTaskId={activeTaskId}
            experience={experience}
            reducedMotion={reducedMotion}
            revealed={revealed}
          />
          <FeatureCalloutLayer activeModule={activeModule} modules={experience.modules} onSelect={selectModule} revealed={revealed} />
          {technicalOpen ? <ProductTechnicalLayer chapter={chapter} experience={experience} module={activeModule} /> : null}
        </section>

        <section className="pws-product-controls">
          <div>
            <p className="pws-technical-label">Product modules</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.modules.map((module) => (
                <button
                  aria-pressed={activeModule.id === module.id}
                  className={`pws-product-module ${activeModule.id === module.id ? "is-active" : ""}`}
                  key={module.id}
                  onClick={() => selectModule(module)}
                  type="button"
                >
                  {module.category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="pws-technical-label">Task states</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.taskStates.map((task) => (
                <button
                  aria-pressed={activeTaskId === task.id}
                  className={`pws-product-state ${activeTaskId === task.id ? "is-active" : ""}`}
                  key={task.id}
                  onClick={() => selectTask(task.id)}
                  type="button"
                >
                  {task.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="pws-product-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{activeCue?.text ?? activeModule.approvedClaim}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function ProductStageVisual({
  activeModule,
  activeTaskId,
  experience,
  reducedMotion,
  revealed,
}: {
  activeModule: ProductModule;
  activeTaskId: string;
  experience: ProductExperience;
  reducedMotion: boolean;
  revealed: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: revealed || reducedMotion ? 1 : 0.985 }}
      className="pws-product-system-stage"
      data-mode={activeModule.mode}
      data-revealed={revealed}
      data-task={activeTaskId}
      transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pws-product-edge-light" />
      <div className="pws-product-back-wall" />
      <div className="pws-product-monitor-cluster" />
      <div className="pws-product-console-body" />
      <div className="pws-product-console-leg left" />
      <div className="pws-product-console-leg right" />
      <div className="pws-product-chair-form" />
      <div className="pws-product-cable-path" />
      <div className="pws-product-material-lens" />
      {activeModule.mode === "modular-construction" || activeModule.mode === "cable-management" ? (
        <div className="pws-product-exploded-layers">
          {["Work surface", "Technology bay", "Cable route", "Service access"].map((layer, index) => (
            <span key={layer} style={{ "--product-layer-i": index } as CSSProperties}>{layer}</span>
          ))}
        </div>
      ) : null}
      {activeModule.mode === "configuration" ? (
        <div className="pws-product-config-preview">
          {experience.configurationChoices.map((choice) => (
            <span aria-disabled={!choice.supported} key={choice.id}>{choice.label}</span>
          ))}
        </div>
      ) : null}
      <div className="pws-product-mode-label">
        <strong>{activeModule.productName}</strong>
        <span>{activeModule.reveal}</span>
      </div>
    </motion.div>
  );
}

function FeatureCalloutLayer({
  activeModule,
  modules,
  onSelect,
  revealed,
}: {
  activeModule: ProductModule;
  modules: ProductModule[];
  onSelect: (module: ProductModule) => void;
  revealed: boolean;
}) {
  return (
    <div className="pws-product-callout-layer" data-revealed={revealed}>
      {modules.slice(0, 7).map((module, index) => (
        <button
          aria-label={`Open ${module.productName}`}
          className={`pws-product-callout ${activeModule.id === module.id ? "is-active" : ""}`}
          key={module.id}
          onClick={() => onSelect(module)}
          style={{ "--callout-i": index } as CSSProperties}
          type="button"
        >
          <span>{module.featureName}</span>
        </button>
      ))}
    </div>
  );
}

function ProductTechnicalLayer({
  chapter,
  experience,
  module,
}: {
  chapter: Chapter;
  experience: ProductExperience;
  module: ProductModule;
}) {
  return (
    <div className="pws-product-technical-layer">
      <p className="pws-technical-label">Technical Layer</p>
      <h2>{module.productName}</h2>
      <p>{module.technicalDetail}</p>
      <ul>
        {chapter.technicalLayers.map((layer) => <li key={layer}>{layer}</li>)}
      </ul>
      <p>{chapter.presenterNotes ?? chapter.presenterTalkingPoint}</p>
      <p>{experience.claimBoundary}</p>
      <p>{module.restrictedClaim}</p>
    </div>
  );
}

function eventForMode(mode: ProductSceneMode) {
  switch (mode) {
    case "sit-stand":
      return "sit_stand_state_selected";
    case "monitor-system":
      return "monitor_mode_selected";
    case "cable-management":
      return "cable_path_explored";
    case "technology-integration":
      return "technology_layer_opened";
    case "materials":
      return "material_selected";
    case "configuration":
      return "configuration_changed";
    case "comparison":
      return "product_compared";
    case "room-context":
      return "product_room_viewed";
    case "modular-construction":
      return "product_exploded";
    default:
      return "product_feature_opened";
  }
}
