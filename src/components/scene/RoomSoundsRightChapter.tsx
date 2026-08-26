import { motion } from "framer-motion";
import {
  AudioWaveform,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Ear,
  Expand,
  Headphones,
  Layers3,
  Map,
  PanelTop,
  ShieldCheck,
  Users,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type SimpleItem = {
  title: string;
  detail: string;
  Icon: LucideIcon;
};

type SurfaceItem = SimpleItem & {
  bullets: string[];
  image: "ceiling" | "wall" | "floor";
};

type PerformanceItem = {
  value: string;
  label: string;
  detail: string;
  Icon: LucideIcon;
};

type RoomHotspot = {
  title: string;
  detail: string;
  Icon: LucideIcon;
  x: string;
  y: string;
  align?: "left" | "right";
};

const acousticPrinciples: SimpleItem[] = [
  { title: "Clear Speech", detail: "Improves communication.", Icon: AudioWaveform },
  { title: "Lower Noise", detail: "Reduces distraction.", Icon: VolumeX },
  { title: "Balanced Sound", detail: "Controls reflections.", Icon: Crosshair },
  { title: "Better Focus", detail: "Supports concentration.", Icon: Brain },
];

const performanceMetrics: PerformanceItem[] = [
  { value: "Controlled Reverberation", label: "Designed for clear speech.", detail: "", Icon: AudioWaveform },
  { value: "High Speech Intelligibility", label: "Supports accurate communication.", detail: "", Icon: BarChart3 },
  { value: "Low Background Noise", label: "Creates a quieter operating environment.", detail: "", Icon: Volume2 },
  { value: "Sound Isolation", label: "Limits transmission between spaces.", detail: "", Icon: ShieldCheck },
  { value: "High Sound Absorption", label: "Selected materials reduce reflected sound.", detail: "", Icon: CheckCircle2 },
];

const engineeredSurfaces: SurfaceItem[] = [
  {
    title: "Acoustic Ceiling",
    detail: "Reduces reflected sound and reverberation.",
    bullets: ["High-absorption ceiling systems", "Acoustic insulation", "Plenum treatment", "Sealed interfaces"],
    image: "ceiling",
    Icon: Layers3,
  },
  {
    title: "Acoustic Wall Panelling",
    detail: "Improves speech clarity and controls reflections.",
    bullets: ["Fabric / perforated finishes", "Acoustic core", "Absorption cavity", "Integrated backing"],
    image: "wall",
    Icon: PanelTop,
  },
  {
    title: "Acoustic Flooring",
    detail: "Reduces impact noise and vibration.",
    bullets: ["Impact-reducing finish", "Acoustic underlay", "Vibration damping", "Structural floor system"],
    image: "floor",
    Icon: AudioWaveform,
  },
];

const operatorBenefits: SimpleItem[] = [
  { title: "Hear Clearly", detail: "Critical information comes through without distortion.", Icon: Ear },
  { title: "Focus Longer", detail: "Less distraction. More comfort. Higher productivity.", Icon: Crosshair },
  { title: "Communicate Better", detail: "Clear communication creates stronger team performance.", Icon: Brain },
  { title: "Work Together", detail: "Teams share clearer acoustic conditions.", Icon: Users },
];

const roomHotspots: RoomHotspot[] = [
  { title: "Acoustic Ceiling", detail: "Controls overhead reflections.", Icon: AudioWaveform, x: "49%", y: "17%" },
  { title: "Wall Absorption", detail: "Reduces echo and reverberation.", Icon: PanelTop, x: "18%", y: "43%" },
  { title: "Speech Clarity Zone", detail: "Supports clear communication.", Icon: Ear, x: "70%", y: "56%", align: "right" },
  { title: "Acoustic Floor Build-Up", detail: "Reduces impact noise and vibration.", Icon: VolumeX, x: "37%", y: "77%" },
];

export function RoomSoundsRightChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="grid h-full w-full grid-rows-[minmax(0,1fr)_auto_auto] gap-[28px] overflow-hidden bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_62%,#fff1f3_100%)] px-[1.55cqw] pb-[1.2cqh] pt-[8.9cqh] text-control-text">
      <motion.div animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[minmax(16rem,0.28fr)_minmax(0,1fr)_minmax(18rem,0.31fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.72, ease }}>
        <aside className="flex min-h-0 flex-col justify-between">
          <div>
            <h1 className="mt-[4.8cqh] text-[clamp(1.85rem,2.62cqw,3.6rem)] font-bold leading-[1.2] tracking-normal text-slate-950 md:text-[3cqw]">
              <span className="block">The Room</span>
              <span className="block">Sounds</span>
              <span className="block text-red-600">Right.</span>
            </h1>
            <div className="mt-[1.1cqh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.15cqh] text-[clamp(0.84rem,1.02cqw,1.18rem)] font-medium leading-[1.4] text-slate-900 md:text-[0.92cqw]">
              Acoustic performance is engineered into every surface to improve clarity, reduce distraction and support better decisions.
            </p>
          </div>

          <section className="rounded-[0.5rem] border border-slate-200/86 bg-white p-[0.9cqw] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-600">
                <AudioWaveform aria-hidden="true" size={31} strokeWidth={1.55} />
              </span>
              <p className="text-[clamp(0.84rem,0.98cqw,1.12rem)] font-semibold leading-[1.38] text-slate-900">
                Great rooms are not just built.
                <span className="block font-semibold text-red-600">They are tuned.</span>
              </p>
            </div>
          </section>
        </aside>

        <main className="grid min-h-0 grid-rows-[auto_minmax(0,41cqh)] overflow-hidden rounded-[0.5rem] border border-slate-200/86 bg-white shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <section className="px-[1.15cqw] pb-[0.12cqh] pt-[3.62cqh]">
            <h2 className="text-[clamp(1rem,1.18cqw,1.36rem)] font-semibold uppercase leading-tight text-control-text">
              Acoustically Optimized. Purposefully Designed.
            </h2>
            <div className="mt-[1.38cqh] grid grid-cols-4 divide-x divide-slate-200/90">
              {acousticPrinciples.map((item) => (
                <div className="grid grid-cols-[3.75rem_minmax(0,1fr)] items-start gap-[0.72cqw] px-[0.78cqw] first:pl-0 last:pr-0" key={item.title}>
                  <span className="grid size-14 place-items-center rounded-full border border-red-100 bg-white text-red-600">
                    <item.Icon aria-hidden="true" size={31} strokeWidth={1.65} />
                  </span>
                  <span>
                    <strong className="block text-[clamp(0.76rem,0.84cqw,0.96rem)] font-semibold leading-tight text-slate-950">{item.title}</strong>
                    <span className="mt-[0.18cqh] block text-[clamp(0.64rem,0.72cqw,0.84rem)] font-medium leading-[1.24] text-slate-900">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex min-h-0 flex-col bg-white">
            <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
              <img alt="Acoustically treated control room with acoustic ceiling, wall panel, isolation and flooring callouts" className="h-full w-full object-cover object-center" draggable={false} src="/assets/generated/rooms/room-sounds-right-acoustic.png" />
              {roomHotspots.map((hotspot) => (
                <RoomHotspotMarker hotspot={hotspot} key={hotspot.title} />
              ))}
            </div>
          </section>
        </main>

        <aside className="grid min-h-0">
          <section className="overflow-hidden rounded-[0.5rem] border border-slate-200/86 bg-white px-[1.25cqw] py-[1.3cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <h2 className="text-[clamp(0.9rem,1.05cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">
              Acoustic Performance
            </h2>
            <div className="mb-[1.8cqh] mt-[1.8cqh] h-[2px] w-[2.5rem] bg-control-warm" />
            <div className="mt-[0.95cqh] grid gap-[1.55cqh]">
              {performanceMetrics.map((metric) => (
                <PerformanceMetric metric={metric} key={metric.value} />
              ))}
            </div>
          </section>
        </aside>
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.32fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
        <section className="overflow-hidden rounded-[0.5rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[1.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.96rem,1.1cqw,1.28rem)] font-semibold uppercase leading-tight text-control-text">
            Engineered Surfaces. Tuned Performance.
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[1.55cqh] grid grid-cols-3 gap-[0.78cqw]">
            {engineeredSurfaces.map((item) => (
              <SurfaceCard item={item} key={item.title} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[0.5rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[3.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.98rem,1.12cqw,1.3rem)] font-semibold uppercase leading-tight text-control-text">
            Operator Benefit
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[3.05cqh] grid grid-cols-2 gap-x-[2.6cqw] gap-y-[2.2cqh]">
            {operatorBenefits.map((item) => (
              <div className="flex min-w-0 items-center gap-[0.7cqw]" key={item.title}>
                <item.Icon aria-hidden="true" className="shrink-0 text-red-600" size={28} strokeWidth={1.55} />
                <p className="min-w-0 text-[clamp(0.66rem,0.76cqw,0.88rem)] font-semibold leading-tight text-control-text">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="flex justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
        <div className="flex gap-[0.7cqw]">
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : (
            <button aria-label="Toggle narration" className="pws-scene-control" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones aria-hidden="true" size={22} /></button>
          )}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </div>
      </motion.div>
    </article>
  );
}

function RoomHotspotMarker({ hotspot }: { hotspot: RoomHotspot }) {
  return (
    <div className="absolute z-10" style={{ left: hotspot.x, top: hotspot.y }}>
      <motion.span
        animate={{
          boxShadow: [
            "0 0 0 0.38rem rgb(220 38 38 / 0.16), 0 0 0 0 rgb(220 38 38 / 0.32)",
            "0 0 0 0.62rem rgb(220 38 38 / 0.08), 0 0 1.4rem 0.18rem rgb(220 38 38 / 0.44)",
            "0 0 0 0.38rem rgb(220 38 38 / 0.16), 0 0 0 0 rgb(220 38 38 / 0.32)",
          ],
          opacity: [0.86, 1, 0.86],
        }}
        className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-red-600"
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.article
        animate={{
          boxShadow: [
            "0 0.75rem 1.8rem rgb(15 23 42 / 0.18), 0 0 0 0 rgb(220 38 38 / 0)",
            "0 0.9rem 2.2rem rgb(15 23 42 / 0.18), 0 0 1.2rem 0.1rem rgb(220 38 38 / 0.28)",
            "0 0.75rem 1.8rem rgb(15 23 42 / 0.18), 0 0 0 0 rgb(220 38 38 / 0)",
          ],
          opacity: [0.94, 1, 0.94],
        }}
        className={[
          "absolute top-0 w-[min(14.2rem,21cqw)] rounded-[0.5rem] border border-white/70 bg-white/95 p-[0.56rem] text-slate-950 backdrop-blur-md",
          "left-[1.05rem] -translate-y-1/2",
        ].join(" ")}
        transition={{ duration: 2.15, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="flex items-start gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-600">
            <hotspot.Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <span className="min-w-0">
            <strong className="block text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold leading-tight">{hotspot.title}</strong>
            <span className="mt-[0.18rem] block text-[clamp(0.54rem,0.62cqw,0.72rem)] font-medium leading-[1.22] text-slate-700">{hotspot.detail}</span>
          </span>
        </div>
      </motion.article>
    </div>
  );
}

function PerformanceMetric({ metric }: { metric: PerformanceItem }) {
  return (
    <article className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-[0.68cqw] border-b border-slate-200/86 pb-[0.78cqh] last:border-b-0 last:pb-0">
      <span className="grid size-13 place-items-center rounded-full border border-red-100 bg-white text-red-600">
        <metric.Icon aria-hidden="true" size={29} strokeWidth={1.45} />
      </span>
      <span className="min-w-0">
        <strong className="block break-words text-[clamp(0.78rem,0.86cqw,1rem)] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-red-600">{metric.value}</strong>
        <span className="mt-[0.28cqh] block text-[clamp(0.6rem,0.68cqw,0.8rem)] font-semibold leading-[1.16] text-control-text">{metric.label}</span>
        {metric.detail ? <span className="mt-[0.2cqh] block text-[clamp(0.52rem,0.6cqw,0.7rem)] font-medium leading-[1.24] text-slate-800">({metric.detail})</span> : null}
      </span>
    </article>
  );
}

function SurfaceCard({ item }: { item: SurfaceItem }) {
  return (
    <article className="grid min-h-[17.4cqh] grid-cols-[minmax(9.5rem,0.48fr)_minmax(0,0.52fr)] gap-[0.95cqw] rounded-[0.5rem] bg-white p-[0.52cqw]">
      <SurfaceStack type={item.image} />
      <div className="min-w-0">
        <h3 className="text-[clamp(0.78rem,0.92cqw,1.06rem)] font-semibold uppercase leading-tight text-red-600">{item.title}</h3>
        <ul className="mt-[0.68cqh] grid gap-[0.27cqh]">
          {item.bullets.map((bullet) => (
            <li className="flex gap-2 text-[clamp(0.62rem,0.72cqw,0.84rem)] font-medium leading-[1.18] text-slate-900" key={bullet}>
              <span className="mt-[0.34rem] h-1 w-1 shrink-0 rounded-full bg-slate-900" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[0.68cqh] h-[2px] w-[2.35rem] bg-red-600" />
        <p className="mt-[0.5cqh] text-[clamp(0.62rem,0.72cqw,0.84rem)] font-medium leading-[1.22] text-slate-800">
          <span className="font-semibold text-control-text">Result: </span>
          {item.detail}
        </p>
      </div>
    </article>
  );
}

function SurfaceStack({ type }: { type: SurfaceItem["image"] }) {
  const systemImages: Record<SurfaceItem["image"], string> = {
    ceiling: "/assets/products/room-systems/acoustic-ceiling.png",
    wall: "/assets/products/room-systems/acoustic-wall-panelling.png",
    floor: "/assets/products/room-systems/acoustic-flooring.png",
  };

  return (
    <div className="grid h-full place-items-center overflow-hidden rounded-[0.5rem] bg-white p-[0.12rem]">
      <img alt={`${type} acoustic system detail`} className="h-full w-full object-contain" draggable={false} src={systemImages[type]} />
    </div>
  );
}
