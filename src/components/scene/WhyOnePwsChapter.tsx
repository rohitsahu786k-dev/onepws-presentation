import { motion } from "framer-motion";
import {
  BadgeCheck, Building2, CheckCircle2, ChevronLeft, ChevronRight, Expand, Factory,
  Globe2, Headphones, Map, MonitorCog, Network, ShieldCheck, Sparkles, Users,
  type LucideIcon,
} from "lucide-react";
import { credentialProofPoints, customerLogoReferences } from "../../content/credentials";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Metric = { value: string; label: string; Icon: LucideIcon };
type Pillar = { title: string; detail: string; proof: string; Icon: LucideIcon; color: string };

const proofValue = (id: string, fallback: string) =>
  credentialProofPoints.find((point) => point.id === id)?.value ?? fallback;

const metrics: Metric[] = [
  { value: proofValue("control-desk-solutions", "75,000+"), label: "Control desk solutions\ndelivered", Icon: MonitorCog },
  { value: proofValue("design-build-solutions", "450+"), label: "Design-build\ninteriors", Icon: Building2 },
  { value: proofValue("workspace-customers", "250+"), label: "Customers\nserved globally", Icon: Users },
  { value: proofValue("onepws-countries", "40+"), label: "Countries\nserved", Icon: Globe2 },
  { value: proofValue("workspace-certifications", "20+"), label: "International\ncertifications", Icon: BadgeCheck },
  { value: proofValue("workspace-factory-area", "170,000 sq. ft."), label: "Dedicated\nfactory area", Icon: Factory },
];

const pillars: Pillar[] = [
  { title: "One Accountable Partner", detail: "Design, engineering, manufacturing, integration and support come together under one responsibility.", proof: "Reduces handoff risk", Icon: Network, color: "text-red-600" },
  { title: "Built Around Operators", detail: "Ergonomics, sightlines, reach, comfort and intelligence features are treated as performance requirements.", proof: "Human-centered by design", Icon: Users, color: "text-blue-600" },
  { title: "Engineered for Reliability", detail: "Consoles, architecture, power, environment, access and AV systems are planned as one operational ecosystem.", proof: "Mission-critical room logic", Icon: ShieldCheck, color: "text-green-600" },
  { title: "Proven Across Sectors", detail: "References span rail, smart city, public safety, energy, oil and gas, utilities, industrial and technology.", proof: `${customerLogoReferences.length} sourced names`, Icon: BadgeCheck, color: "text-violet-600" },
  { title: "Future-Ready Platform", detail: "The room can evolve from furniture and displays into connected intelligence, software workflows and lifecycle insight.", proof: "Ready for the next operating model", Icon: Sparkles, color: "text-cyan-600" },
];

const outcomes = [
  "Fewer coordination gaps",
  "Clearer technical ownership",
  "More consistent operator experience",
  "Stronger project confidence",
  "Better lifecycle support",
];

export function WhyOnePwsChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);

  return (
    <article className="relative h-full w-full overflow-hidden bg-[#fbfcfd] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-[8.55cqh] h-px bg-slate-200/90" />
      <div className="pointer-events-none absolute left-[2.1cqw] top-[36cqh] h-[30cqh] w-[42cqw] opacity-[0.045] [background-image:linear-gradient(90deg,#64748b_1px,transparent_1px),linear-gradient(#64748b_1px,transparent_1px)] [background-size:30px_30px]" />

      <main className="relative z-10 grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-rows-[38.5cqh_24cqh_9.6cqh] gap-x-[1.55cqw] gap-y-[2cqh] px-[2.1cqw] pb-[4.9cqh] pt-[10.35cqh]">
        <motion.header animate={{ opacity: 1, y: 0 }} className="min-w-0 pt-[0.4cqh]" initial={false} transition={{ duration: 0.55 }}>
          <h1 className="text-[3.15cqw] font-bold uppercase leading-[0.96] tracking-normal text-black">
            <span className="block">Why</span>
            <span className="block text-control-warm">OnePWS.</span>
          </h1>
          <div className="mt-[2.4cqh] h-[3px] w-[3.4rem] bg-control-warm" />
          <p className="mt-[2.45cqh] max-w-[39rem] text-[0.8cqw] font-medium leading-[1.45] text-slate-900">
            One accountable capability for the complete control room: design, ergonomics, manufacturing,
            integration, compliance, project proof and lifecycle support.
          </p>
        </motion.header>

       

        <motion.section animate={{ opacity: 1 }} className="relative min-h-0 overflow-hidden rounded-[0.55rem] border border-slate-200 bg-white shadow-[0_0.9rem_2.5rem_rgb(15_23_42/0.08)]" initial={false} transition={{ duration: 0.6, delay: 0.08 }}>
          <img alt="OnePWS control room" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src="/assets/generated/final/futuristic-blue-command-center.png" />
          <div className="absolute left-[1.25cqw] top-[1.8cqh] w-[20.5cqw] rounded-[0.45rem] border border-white/30 bg-slate-950/70 px-[1.05cqw] py-[1.7cqh] text-white shadow-xl backdrop-blur-md">
            <p className="text-[0.9cqw] font-semibold uppercase leading-[1.35]">The buying decision is not<br />furniture versus technology.</p>
            <div className="mt-[1.1cqh] h-[2px] w-[2.5rem] bg-control-warm" />
            <p className="mt-[1.1cqh] text-[0.72cqw] font-medium leading-[1.45] text-white/90">It is whether the whole room can perform as one environment.</p>
          </div>
        </motion.section>

        <motion.section animate={{ opacity: 1 }} className="col-span-2 flex min-h-0 flex-col rounded-[0.55rem] border border-slate-200 bg-white px-[1.4cqw] py-[1.05cqh] shadow-[0_0.8rem_2.2rem_rgb(15_23_42/0.055)]" initial={false} transition={{ duration: 0.6, delay: 0.1 }}>
          <h2 className="text-[1.12cqw] font-semibold uppercase">What Makes the Decision Safer</h2>
          <div className="mt-[0.55cqh] h-[3px] w-[2.7rem] bg-control-warm" />
          <div className="mt-[0.95cqh] grid min-h-0 flex-1 grid-cols-5 divide-x divide-slate-200">
            {pillars.map((pillar) => <PillarCard key={pillar.title} pillar={pillar} />)}
          </div>
        </motion.section>

        <motion.section animate={{ opacity: 1, y: 0 }} className="col-span-2 grid min-h-0 grid-cols-[25.6cqw_repeat(5,minmax(0,1fr))] items-center overflow-hidden rounded-[0.55rem] border border-slate-200 bg-white shadow-[0_0.8rem_2rem_rgb(15_23_42/0.05)]" initial={false} transition={{ duration: 0.55, delay: 0.15 }}>
          <div className="flex h-full items-center gap-[1.1cqw] border-r border-slate-200 px-[1.6cqw]">
            <span className="grid size-[3.15rem] shrink-0 place-items-center rounded-full bg-control-warm text-white"><ChevronRight size={30} strokeWidth={2.4} /></span>
            <p className="text-[1.08cqw] font-semibold leading-[1.25]">Better rooms start with<br /><span className="text-control-warm">one accountable system.</span></p>
          </div>
          {outcomes.map((outcome) => (
            <div className="flex h-[58%] items-center justify-center gap-[0.65cqw] border-r border-slate-200 px-[0.75cqw] last:border-r-0" key={outcome}>
              <CheckCircle2 className="shrink-0 text-control-warm" size={20} strokeWidth={1.8} />
              <span className="text-[0.72cqw] font-semibold leading-[1.3] text-slate-800">{outcome}</span>
            </div>
          ))}
        </motion.section>
      </main>

      <div className="pws-scene-control-dock absolute bottom-[1.7cqh] left-[2.1cqw] z-40 justify-start">
        <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft size={22} /></button>
        <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight size={23} /></button>
        <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map size={22} /></button>
        <button aria-label="Play narration" className="pws-scene-control" onClick={() => chapterVoiceover ? voiceover.play(chapterVoiceover) : dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones size={22} /></button>
        <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand size={22} /></button>
      </div>
    </article>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="grid min-h-0 place-content-center rounded-[0.5rem] border border-white bg-white px-[0.7cqw] text-center shadow-[0_0.75rem_2rem_rgb(15_23_42/0.06)]">
      <metric.Icon className="mx-auto text-control-warm" size={30} strokeWidth={1.65} />
      <strong className="mt-[1.15cqh] block text-[1.75cqw] font-semibold leading-none text-control-warm">{metric.value}</strong>
      <span className="mt-[0.75cqh] whitespace-pre-line text-[0.92cqw] font-semibold leading-[1.2]">{metric.label}</span>
    </article>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="flex min-w-0 flex-col items-center px-[1cqw] text-center">
      <pillar.Icon className={pillar.color} size={28} strokeWidth={1.65} />
      <h3 className="mt-[0.85cqh] min-h-[2.45em] text-[0.72cqw] font-bold uppercase leading-[1.22]">{pillar.title}</h3>
      <p className="mt-[0.45cqh] text-[0.58cqw] font-medium leading-[1.28] text-slate-800">{pillar.detail}</p>
      <p className="mt-auto pt-[0.25cqh] text-[0.52cqw] font-semibold uppercase leading-[1.15] text-control-warm">{pillar.proof}</p>
    </article>
  );
}
