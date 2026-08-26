import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Expand,
  Factory,
  Globe2,
  Headphones,
  History,
  Landmark,
  LineChart,
  Map,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import { getVoiceover } from "../../content/voiceovers";
import {
  awardsRecognition,
  certificationReferences,
  credentialProofPoints,
  credentialTimeline,
  customerLogoReferences,
  exhibitionReferences,
  groupTurnover,
  landmarkProjectNames,
  manufacturingReferences,
  qualitySystemReferences,
  traceabilityReferences,
  workspaceTurnover,
  type CredentialProofPoint,
  type SourceRef,
} from "../../content/credentials";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type LayerId =
  | "onepws"
  | "group"
  | "history"
  | "customers"
  | "presence"
  | "awards"
  | "exhibitions"
  | "manufacturing"
  | "certifications"
  | "traceability"
  | "quality"
  | "improvement";

type LayerConfig = {
  id: LayerId;
  title: string;
  summary: string;
  icon: ReactNode;
};

const layerConfigs: LayerConfig[] = [
  {
    id: "onepws",
    title: "OnePWS at a glance",
    summary: "Current OnePWS scale, reach and control-room capability.",
    icon: <ShieldCheck aria-hidden="true" size={18} />,
  },
  {
    id: "group",
    title: "Pyrotech Group strength",
    summary: "Group-level manufacturing, people and international reach.",
    icon: <Building2 aria-hidden="true" size={18} />,
  },
  {
    id: "history",
    title: "Growth history",
    summary: "A concise continuity timeline without legacy branding.",
    icon: <History aria-hidden="true" size={18} />,
  },
  {
    id: "customers",
    title: "Global customers",
    summary: "Searchable customer references shown in controlled batches.",
    icon: <Search aria-hidden="true" size={18} />,
  },
  {
    id: "presence",
    title: "International presence",
    summary: "Countries served, design-build reach and landmark references.",
    icon: <Globe2 aria-hidden="true" size={18} />,
  },
  {
    id: "awards",
    title: "Awards",
    summary: "Recognition items separated from the main pitch.",
    icon: <Award aria-hidden="true" size={18} />,
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    summary: "International exhibition activity from OnePWS source materials.",
    icon: <CalendarDays aria-hidden="true" size={18} />,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    summary: "In-house capability and selected equipment groups.",
    icon: <Factory aria-hidden="true" size={18} />,
  },
  {
    id: "certifications",
    title: "Certifications",
    summary: "Major management-system and international certification proof.",
    icon: <BadgeCheck aria-hidden="true" size={18} />,
  },
  {
    id: "traceability",
    title: "SAP-enabled traceability",
    summary: "Project database and lifecycle traceability claims.",
    icon: <LineChart aria-hidden="true" size={18} />,
  },
  {
    id: "quality",
    title: "Quality systems",
    summary: "Management systems and delivery controls.",
    icon: <Settings2 aria-hidden="true" size={18} />,
  },
  {
    id: "improvement",
    title: "Continuous improvement",
    summary: "5S, safety, kaizen and value-stream improvement references.",
    icon: <Sparkles aria-hidden="true" size={18} />,
  },
];

const metricIcons: Partial<Record<CredentialProofPoint["category"], ReactNode>> = {
  experience: <ShieldCheck aria-hidden="true" size={18} />,
  manufacturing: <Factory aria-hidden="true" size={18} />,
  products: <Sparkles aria-hidden="true" size={18} />,
  patents: <BadgeCheck aria-hidden="true" size={18} />,
  countries: <Globe2 aria-hidden="true" size={18} />,
  customers: <Building2 aria-hidden="true" size={18} />,
  certifications: <Award aria-hidden="true" size={18} />,
  projects: <Landmark aria-hidden="true" size={18} />,
};

const glanceEyebrowClass = "text-[clamp(0.72rem,0.82cqw,0.94rem)] font-bold uppercase tracking-[0.24em] text-control-warm";
const glanceHeadingClass =
  "text-[clamp(2.85rem,3.45cqw,4.25rem)] font-bold leading-[1.04] tracking-normal text-control-text";

export function CredibilityChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const primaryProof = [
    "workspace-formed",
    "workspace-certifications",
    "workspace-customers",
    "onepws-countries",
    "onepws-sales",
    "onepws-patents-applied",
    "design-build-solutions",
    "control-desk-solutions",
  ]
    .map((id) => credentialProofPoints.find((point) => point.id === id))
    .filter((point): point is CredentialProofPoint => Boolean(point));
  const motionDuration = state.reducedMotion ? 0.01 : 0.62;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(118deg,#ffffff_0%,#fbfbfb_56%,#eef3f7_100%)]" />
      <div className="absolute right-0 top-0 h-[45%] w-[46%] bg-[radial-gradient(circle_at_80%_18%,rgb(207_31_43/0.055),transparent_48%)]" />
      <div className="absolute bottom-0 left-[24%] h-[50%] w-[58%] bg-[radial-gradient(circle_at_48%_100%,rgb(209_218_229/0.36),transparent_60%)]" />

      <section className="absolute scene-content-safe z-20 flex flex-col justify-start gap-[clamp(0.8rem,1.25cqh,1.2rem)] pt-[clamp(0.9rem,3.2cqh,2.5rem)]">
        <div className="grid min-h-[43cqh] items-start gap-[min(3.2cqw,3.2rem)] lg:grid-cols-[minmax(0,0.78fr)_minmax(31rem,1.12fr)]">
          <div className="min-w-0 pt-[1.9cqh]">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={glanceEyebrowClass}
            initial={false}
            transition={{ duration: motionDuration }}
          >
            {chapter.eyebrow}
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className={`mt-[2cqh] max-w-[14ch] text-balance ${glanceHeadingClass}`}
            initial={false}
            transition={{ duration: motionDuration, delay: 0.08 }}
          >
            {chapter.headline}
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-[1.9cqh] max-w-[41rem] text-[clamp(0.98rem,1.02cqw,1.18rem)] font-normal leading-[1.52] text-slate-800"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.16 }}
          >
            {chapter.supportingMessage}
          </motion.p>
        </div>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.18 }}
        >
          <TurnoverChart reducedMotion={state.reducedMotion} />
        </motion.aside>
        </div>

        <CredibilityMetricGrid points={primaryProof} />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock"
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
      </section>
    </article>
  );
}

function LayerSelector({
  activeLayer,
  onSelect,
}: {
  activeLayer: LayerId;
  onSelect: (layer: LayerId) => void;
}) {
  return (
    <nav aria-label="Credibility layers" className="grid content-start gap-2">
      {layerConfigs.map((layer) => {
        const isActive = layer.id === activeLayer;
        return (
          <button
            className={`grid min-h-11 grid-cols-[1.7rem_1fr] items-center gap-3 border px-3 text-left text-xs transition ${
              isActive
                ? "border-control-warm bg-control-warm/12 text-control-text"
                : "border-control-line bg-white/68 text-control-soft hover:border-control-warm/70 hover:text-control-text"
            }`}
            key={layer.id}
            onClick={() => onSelect(layer.id)}
            type="button"
          >
            <span className={isActive ? "text-control-warm" : "text-control-muted"}>{layer.icon}</span>
            <span className="truncate font-medium">{layer.title}</span>
          </button>
        );
      })}
    </nav>
  );
}

function MetricRail({ points }: { points: CredentialProofPoint[] }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 grid max-w-3xl grid-cols-3 gap-2"
      initial={false}
      transition={{ duration: 0.5, delay: 0.24 }}
    >
      {points.map((point, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[6.8rem] border-l border-control-line/80 bg-white/62 py-3 pl-3 pr-2"
          initial={false}
          key={point.id}
          transition={{ duration: 0.36, delay: 0.03 * index }}
        >
          <div className="flex items-center justify-between text-control-warm">
            {metricIcons[point.category] ?? <BadgeCheck aria-hidden="true" size={18} />}
            <span className="text-[10px] uppercase tracking-[0.22em] text-control-muted">p{point.source.page}</span>
          </div>
          <p className="mt-2 text-[clamp(1.35rem,2cqw,2.3rem)] font-semibold leading-none">{point.value}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-control-soft">{point.label}</p>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-control-muted">{point.context}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}

function CredibilityMetricGrid({ points }: { points: CredentialProofPoint[] }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-4 gap-[clamp(0.55rem,0.95cqw,1rem)] [@container_stage_(max-width:1279px)]:grid-cols-2"
      initial={false}
      transition={{ duration: 0.5, delay: 0.24 }}
    >
      {points.map((point) => {
        const display = primaryProofDisplay[point.id];

        return (
          <div
            className="min-h-[8.9rem] border border-slate-200/82 bg-white/78 px-5 py-10 shadow-[0_0.8rem_2rem_rgb(15_23_42/0.045)]"
            key={point.id}
          >
            <p className="text-[clamp(1.5rem,1.82cqw,2.2rem)] font-bold leading-none text-control-text">
              {display?.value ?? point.value}
            </p>
            <p className="mt-[0.62cqh] text-[clamp(0.74rem,0.78cqw,0.92rem)] font-semibold leading-snug text-control-text">
              {display?.label ?? point.label}
            </p>
          </div>
        );
      })}
    </motion.section>
  );
}

const onePwsTurnover = [
  { year: 2008, valueCrores: 14 },
  { year: 2012, valueCrores: 33 },
  { year: 2016, valueCrores: 53 },
  { year: 2020, valueCrores: 93 },
  { year: 2021, valueCrores: 100 },
  { year: 2022, valueCrores: 127 },
  { year: 2023, valueCrores: 205 },
  { year: 2024, valueCrores: 214 },
  { year: 2025, valueCrores: 226 },
  { year: 2026, valueCrores: 236 },
];

const primaryProofDisplay: Partial<Record<string, { label: string; value?: string }>> = {
  "workspace-formed": { label: "Established" },
  "workspace-certifications": { label: "Major certifications" },
  "workspace-customers": { label: "Customers served" },
  "onepws-countries": { label: "Countries reached" },
  "onepws-sales": { label: "Annual turnover", value: "\u20B9236 Cr." },
  "onepws-patents-applied": { label: "Patent applications" },
  "design-build-solutions": { label: "Design-build interiors delivered" },
  "control-desk-solutions": { label: "Control-desk solutions delivered" },
};

function TurnoverChart({ reducedMotion }: { reducedMotion: boolean }) {
  const max = Math.max(...onePwsTurnover.map((point) => point.valueCrores));
  const chartWidth = 920;
  const chartHeight = 300;
  const plot = { left: 46, right: 24, top: 28, bottom: 58 };
  const plotWidth = chartWidth - plot.left - plot.right;
  const plotHeight = chartHeight - plot.top - plot.bottom;
  const step = plotWidth / onePwsTurnover.length;
  const barWidth = Math.min(54, step * 0.58);
  const baseline = plot.top + plotHeight;
  const chartPoints = onePwsTurnover.map((point, index) => {
    const barHeight = Math.max(8, (point.valueCrores / max) * plotHeight);
    const x = plot.left + index * step + (step - barWidth) / 2;
    const y = baseline - barHeight;

    return {
      ...point,
      barHeight,
      centerX: x + barWidth / 2,
      x,
      y,
    };
  });
  const trendPath = `M ${chartPoints.map((point) => `${point.centerX},${point.y}`).join(" L ")}`;
  const areaPath = `${trendPath} L ${chartPoints[chartPoints.length - 1].centerX},${baseline} L ${chartPoints[0].centerX},${baseline} Z`;

  return (
    <section className="relative min-h-[39cqh] overflow-hidden border border-slate-200/80 bg-white/82 p-[clamp(1rem,1.25cqw,1.45rem)] shadow-[0_1.25rem_3.2rem_rgb(15_23_42/0.075)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgb(207_31_43/0.045),transparent_32%),linear-gradient(135deg,rgb(255_255_255/0.94),rgb(244_247_250/0.54))]" />
      <div className="relative">
        <div className="flex items-baseline justify-between gap-6">
          <p className={glanceEyebrowClass}>Turnover</p>
          <p className="max-w-[14rem] text-right text-[clamp(0.62rem,0.66cqw,0.78rem)] font-normal leading-5 text-slate-600">
            Turnover shown in INR crores
          </p>
        </div>
        <h2 className="mt-[1.05cqh] text-balance text-[clamp(1.34rem,1.66cqw,2rem)] font-bold leading-[1.16] tracking-normal text-slate-950">
          A track record of sustained growth
        </h2>
      </div>

      <svg
        aria-label="OnePWS turnover growth chart in INR crores"
        className="relative mt-[1.1cqh] h-[35cqh] w-full overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <defs>
          <linearGradient id="turnover-bar-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f42f3d" />
            <stop offset="54%" stopColor="#cf1f2b" />
            <stop offset="100%" stopColor="#941420" />
          </linearGradient>
          <linearGradient id="turnover-area-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(207 31 43 / 0.16)" />
            <stop offset="100%" stopColor="rgb(207 31 43 / 0)" />
          </linearGradient>
          <filter id="turnover-bar-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" floodColor="rgb(207 31 43)" floodOpacity="0.16" stdDeviation="5" />
          </filter>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = baseline - plotHeight * ratio;
          return (
            <line
              key={ratio}
              stroke="rgb(148 163 184 / 0.26)"
              strokeWidth="1"
              x1={plot.left}
              x2={chartWidth - plot.right}
              y1={y}
              y2={y}
            />
          );
        })}
        <line stroke="rgb(100 116 139 / 0.28)" strokeWidth="1.4" x1={plot.left} x2={plot.left} y1={plot.top} y2={baseline} />
        <line stroke="rgb(100 116 139 / 0.34)" strokeWidth="1.4" x1={plot.left} x2={chartWidth - plot.right} y1={baseline} y2={baseline} />

        <motion.path
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
          d={areaPath}
          fill="url(#turnover-area-gradient)"
          initial={reducedMotion ? false : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.45, delay: 0.58 }}
        />

        {chartPoints.map((point, index) => (
          <g key={point.year}>
            <motion.rect
              animate={{ opacity: 1 }}
              fill="url(#turnover-bar-gradient)"
              filter="url(#turnover-bar-shadow)"
              height={point.barHeight}
              initial={reducedMotion ? false : { opacity: 0 }}
              rx="7"
              transition={{ duration: reducedMotion ? 0.01 : 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.12 + 0.07 * index }}
              width={barWidth}
              x={point.x}
              y={point.y}
            />
          </g>
        ))}

        {chartPoints.map((point) => (
          <g key={`label-${point.year}`}>
            <text
              fill="#11151b"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
              x={point.centerX}
              y={point.y - 12}
            >
              {point.valueCrores}
            </text>
            <text
              fill="#4b5563"
              fontSize="12"
              fontWeight="700"
              letterSpacing="1.2"
              textAnchor="middle"
              x={point.centerX}
              y={baseline + 34}
            >
              {point.year}
            </text>
          </g>
        ))}

        <path
          d={trendPath}
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="9"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          animate={{ opacity: 1 }}
          d={trendPath}
          fill="none"
          initial={reducedMotion ? false : { opacity: 0 }}
          stroke="rgb(207 31 43 / 0.72)"
          strokeLinecap="round"
          strokeWidth="4"
          transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: 0.55 }}
          vectorEffect="non-scaling-stroke"
        />

        {chartPoints.map((point, index) => (
          <motion.circle
            animate={{ opacity: 1, scale: 1 }}
            cx={point.centerX}
            cy={point.y}
            fill="#ffffff"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.72 }}
            key={`dot-${point.year}`}
            r="4.5"
            stroke="rgb(207 31 43)"
            strokeWidth="2.4"
            transition={{ duration: reducedMotion ? 0.01 : 0.28, delay: 0.72 + 0.08 * index }}
          />
        ))}

        <text
          fill="#6b7280"
          fontSize="11"
          fontWeight="700"
          letterSpacing="5"
          textAnchor="middle"
          x={(chartWidth + plot.left - plot.right) / 2}
          y={chartHeight - 6}
        >
          YEAR
        </text>
      </svg>
    </section>
  );
}

function CredibilityImage() {
  const asset = getAsset("showroom-control-room-wide");

  return (
    <figure className="relative aspect-[16/10] bg-control-panel">
      {asset?.src ? (
        <img
          alt={asset.alt ?? "OnePWS control-room environment"}
          className="h-full w-full object-cover"
          draggable={false}
          src={asset.src}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm text-control-muted">OnePWS visual</div>
      )}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-control-warm" />
    </figure>
  );
}

function LayerContent({ layer }: { layer: LayerId }) {
  switch (layer) {
    case "onepws":
      return (
        <MetricGrid
          points={credentialProofPoints.filter((point) => point.primary).slice(0, 8)}
          title="Concise current OnePWS proof"
        />
      );
    case "group":
      return (
        <>
          <MetricGrid points={credentialProofPoints.filter((point) => !point.primary).slice(0, 5)} title="Group context" />
          <div className="mt-5 grid grid-cols-2 gap-4">
            <TurnoverMini label="Group turnover" points={groupTurnover} />
            <TurnoverMini label="Workspace turnover" points={workspaceTurnover} />
          </div>
        </>
      );
    case "history":
      return (
        <div className="grid gap-3">
          {credentialTimeline.map((item) => (
            <div className="grid grid-cols-[4.5rem_1fr] gap-4 border border-control-line bg-control-black/24 p-4" key={item.title}>
              <p className="text-2xl font-semibold text-control-warm">{item.year}</p>
              <div>
                <p className="font-medium text-control-text">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-control-soft">{item.detail}</p>
                <SourceLine source={item.source} />
              </div>
            </div>
          ))}
        </div>
      );
    case "customers":
      return <CustomerPreview />;
    case "presence":
      return (
        <div className="grid gap-4">
          <MetricGrid
            points={credentialProofPoints.filter((point) => ["countries", "customers", "projects"].includes(point.category)).slice(0, 5)}
            title="Reach and references"
          />
          <CompactList
            items={landmarkProjectNames.slice(0, 6).map((project) => ({
              title: project.name,
              detail: "Landmark project reference from source materials.",
              source: project.source,
            }))}
            title="Selected landmark references"
          />
        </div>
      );
    case "awards":
      return (
        <CompactList
          items={awardsRecognition.map((award) => ({
            title: award.title,
            detail: award.detail.replace(/confirmation required/gi, "available on request"),
            source: award.source,
          }))}
          title="Awards and recognition"
        />
      );
    case "exhibitions":
      return (
        <div className="grid grid-cols-3 gap-3">
          {exhibitionReferences.map((event) => (
            <div className="border border-control-line bg-control-black/26 p-4" key={`${event.name}-${event.year}`}>
              <p className="text-2xl font-semibold text-control-text">{event.year}</p>
              <p className="mt-3 font-medium text-control-text">{event.name}</p>
              <p className="mt-1 text-sm text-control-soft">{event.location}</p>
              {event.confirmationRequired ? <ConfirmLine /> : null}
              <SourceLine source={event.source} />
            </div>
          ))}
        </div>
      );
    case "manufacturing":
      return <CompactList items={manufacturingReferences} title="Manufacturing capability" />;
    case "certifications":
      return <CompactList items={certificationReferences} title="Certifications" />;
    case "traceability":
      return <ProcessLayer items={traceabilityReferences} title="SAP-enabled traceability" />;
    case "quality":
      return <ProcessLayer items={qualitySystemReferences.slice(0, 2)} title="Quality systems" />;
    case "improvement":
      return <ProcessLayer items={qualitySystemReferences.slice(2)} title="Continuous improvement" />;
    default:
      return null;
  }
}

function MetricGrid({ points, title }: { points: CredentialProofPoint[]; title: string }) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {points.map((point) => (
          <div className="border border-control-line bg-control-black/24 p-4" key={point.id}>
            <div className="flex items-center justify-between text-control-muted">
              <span className="text-[10px] uppercase tracking-[0.2em]">{point.label}</span>
              <span className="text-[10px] uppercase tracking-[0.2em]">p{point.source.page}</span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-control-text">{point.value}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-control-soft">{point.context}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomerPreview() {
  const [query, setQuery] = useState("");
  const filteredCustomers = useMemo(
    () =>
      customerLogoReferences.filter((customer) =>
        `${customer.name} ${customer.sector}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const visibleCustomers = filteredCustomers.slice(0, 10);

  return (
    <section>
      <SourceImageBanner assetId="customer-logo-wall-source" />
      <label className="mt-4 flex max-w-xl items-center gap-3 border border-control-line bg-white/76 px-4 py-3">
        <Search aria-hidden="true" className="text-control-warm" size={18} />
        <input
          className="w-full bg-transparent text-sm text-control-soft outline-none"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search customer references"
          type="search"
          value={query}
        />
      </label>
      <p className="mt-3 text-sm leading-6 text-control-muted">
        Showing {visibleCustomers.length} of {filteredCustomers.length} sourced references. Final brand artwork can be
        applied when approved logo files are supplied.
      </p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {visibleCustomers.map((customer) => (
          <div className="grid min-h-[4.8rem] place-items-center border border-control-line bg-white/76 px-3 text-center" key={customer.name}>
            <div>
              <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-control-text">
                {customer.name}
              </p>
              <p className="mt-2 text-[7px] uppercase tracking-[0.12em] text-control-muted">Customer reference</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceImageBanner({ assetId }: { assetId: string }) {
  const asset = getAsset(assetId);

  if (!asset?.src) {
    return null;
  }

  return (
    <figure className="overflow-hidden border border-control-line bg-white">
      <img alt={asset.alt ?? "OnePWS visual record"} className="h-32 w-full object-cover object-left" src={asset.src} />
      <figcaption className="border-t border-control-line bg-white/88 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-control-muted">
        OnePWS visual record
      </figcaption>
    </figure>
  );
}

function CompactList({
  items,
  title,
}: {
  items: { title: string; detail: string; source: SourceRef; confirmationRequired?: boolean }[];
  title: string;
}) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {items.slice(0, 6).map((item) => (
          <div className="border border-control-line bg-control-black/24 p-4" key={item.title}>
            <p className="font-medium text-control-text">{item.title}</p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-control-soft">{item.detail}</p>
            {item.confirmationRequired ? <ConfirmLine /> : null}
            <SourceLine source={item.source} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessLayer({
  items,
  title,
}: {
  items: { title: string; detail: string; source: SourceRef; confirmationRequired?: boolean }[];
  title: string;
}) {
  return (
    <section>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div className="grid grid-cols-[3rem_1fr] gap-4 border border-control-line bg-control-black/24 p-4" key={item.title}>
            <span className="grid h-10 w-10 place-items-center border border-control-warm/55 bg-control-warm/10 text-sm text-control-warm">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-control-text">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-control-soft">{item.detail}</p>
              {item.confirmationRequired ? <ConfirmLine /> : null}
              <SourceLine source={item.source} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TurnoverMini({ label, points }: { label: string; points: { year: number; valueCrores: number }[] }) {
  const max = Math.max(...points.map((point) => point.valueCrores));

  return (
    <div className="border border-control-line bg-control-black/22 p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-control-soft">{label}</span>
        <span className="text-control-muted">{points.at(-1)?.valueCrores} Cr.</span>
      </div>
      <div className="flex h-20 items-end gap-1 border-b border-control-line">
        {points.map((point) => (
          <div
            className="flex-1 bg-control-warm/65"
            key={`${label}-${point.year}`}
            style={{ height: `${Math.max(8, (point.valueCrores / max) * 100)}%` }}
            title={`${point.year}: ${point.valueCrores} Cr.`}
          />
        ))}
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-control-muted">Historical growth record</p>
    </div>
  );
}

function ConfirmLine() {
  return <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-control-warm">Detail available on request</p>;
}

function SourceLine({ source }: { source: SourceRef }) {
  return (
    <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-control-muted">
      Source p{source.page}
    </p>
  );
}

function CredibilityBackdrop() {
  const asset = getAsset("showroom-control-room-wide");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "OnePWS control-room visual"} className="absolute right-0 top-0 h-full w-[58%] object-cover opacity-24" src={asset.src} />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(207,31,43,0.08),transparent_30%)]" />
    </div>
  );
}
