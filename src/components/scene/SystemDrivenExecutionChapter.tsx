import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Expand,
  FileClock,
  Headphones,
  Leaf,
  Map,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { ReactNode } from "react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type Capability = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
};

const executionFlow: Array<{ title: string; description: string; icon: ReactNode }> = [
  {
    title: "International Standards",
    description: "Globally recognised management practices.",
    icon: <ClipboardCheck aria-hidden="true" size={34} strokeWidth={1.8} />,
  },
  {
    title: "Digital Systems (SAP)",
    description: "Integrated planning, procurement and project data.",
    icon: <Network aria-hidden="true" size={34} strokeWidth={1.8} />,
  },
  {
    title: "Controlled Execution",
    description: "Defined processes, approvals and checkpoints.",
    icon: <Workflow aria-hidden="true" size={34} strokeWidth={1.8} />,
  },
  {
    title: "Traceable Delivery",
    description: "Complete records for long-term support.",
    icon: <FileClock aria-hidden="true" size={34} strokeWidth={1.8} />,
  },
];

const capabilities: Capability[] = [
  {
    id: "quality",
    index: "01",
    title: "ISO 9001",
    subtitle: "Quality Management",
    description: "Standardised processes and continual improvement.",
    icon: <ShieldCheck aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
  {
    id: "environment",
    index: "02",
    title: "ISO 14001",
    subtitle: "Environmental Management",
    description: "Responsible resource and waste control.",
    icon: <Leaf aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
  {
    id: "safety",
    index: "03",
    title: "ISO 45001",
    subtitle: "Health & Safety",
    description: "Structured workplace-risk management.",
    icon: <ClipboardCheck aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
  {
    id: "sap",
    index: "04",
    title: "SAP-Enabled",
    subtitle: "Integrated Operations",
    description: "Connected planning, production and inventory.",
    icon: <Network aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
  {
    id: "change-control",
    index: "05",
    title: "Change Control",
    subtitle: "Configuration Management",
    description: "Controlled revisions and approvals.",
    icon: <Workflow aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
  {
    id: "traceability",
    index: "06",
    title: "Project Traceability",
    subtitle: "Long-Term Records",
    description: "Project data retained for future support.",
    icon: <FileClock aria-hidden="true" size={34} strokeWidth={1.9} />,
  },
];

export function SystemDrivenExecutionChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const motionDuration = state.reducedMotion ? 0.01 : 0.78;
  const processEase = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <motion.div
        animate={{ scaleX: 1 }}
        className="absolute inset-x-0 top-0 h-1.5 origin-left bg-control-warm"
        initial={state.reducedMotion ? false : { scaleX: 0 }}
        transition={{ duration: state.reducedMotion ? 0.01 : 1.1, ease: processEase }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffffff_0%,#fbfcfd_58%,#f2f5f8_100%)]" />
      <motion.div
        animate={state.reducedMotion ? undefined : { opacity: [0.18, 0.28, 0.18], scale: [1, 1.035, 1] }}
        className="absolute right-[-8%] top-[-16%] h-[48%] w-[48%] rounded-full bg-control-warm/4 blur-3xl"
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={state.reducedMotion ? undefined : { opacity: [0.2, 0.32, 0.2], x: [0, 12, 0] }}
        className="absolute bottom-[-18%] left-[18%] h-[40%] w-[42%] rounded-full bg-slate-300/20 blur-3xl"
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={state.reducedMotion ? undefined : { opacity: [0, 0.5, 0], x: ["-35%", "135%"] }}
        className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(90deg,transparent_0%,rgb(207_31_43/0.035)_42%,rgb(255_255_255/0.16)_50%,transparent_100%)]"
        initial={state.reducedMotion ? false : { opacity: 0, x: "-35%" }}
        transition={{ duration: 2.6, delay: 0.35, ease: processEase }}
      />

      <section className="absolute scene-content-safe z-20 grid content-center gap-[clamp(2.8rem,1.15cqh,1.1rem)]">
        <div className="grid items-start gap-[min(2.5cqw,2.4rem)] lg:grid-cols-[minmax(0,0.52fr)_minmax(40rem,1fr)]">
          <div className="min-w-0">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(0.7rem,0.8cqw,0.86rem)] font-bold uppercase tracking-[0.14em] text-control-warm"
              initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
              transition={{ duration: motionDuration, ease: processEase }}
            >
              {chapter.eyebrow}
            </motion.p>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 max-w-[14ch] text-balance text-[clamp(2.25rem,3.15cqw,3.85rem)] font-bold leading-[0.96] tracking-normal text-control-text"
              initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
              transition={{ duration: motionDuration + 0.12, delay: 0.08, ease: processEase }}
            >
              {chapter.headline}
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 max-w-[40rem] whitespace-pre-line text-[clamp(1rem,1.05cqw,1.18rem)] leading-[1.42] text-control-soft"
              initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
              transition={{ duration: motionDuration, delay: 0.2, ease: processEase }}
            >
              {chapter.supportingMessage}
            </motion.p>
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-[clamp(3.1rem,4.25cqh,3.95rem)] flex min-h-[clamp(10.4rem,18cqh,12.8rem)] self-start overflow-hidden rounded-[0.65rem] border border-slate-200/90 bg-[linear-gradient(135deg,rgb(255_255_255/0.88)_0%,rgb(248_250_252/0.74)_58%,rgb(255_255_255/0.9)_100%)] px-5 py-5 shadow-[0_1rem_2.8rem_rgb(15_23_42/0.07),inset_0_1px_0_rgb(255_255_255/0.96)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 22 }}
            transition={{ duration: motionDuration + 0.08, delay: 0.18, ease: processEase }}
          >
            <motion.div
              animate={state.reducedMotion ? undefined : { opacity: [0, 0.9, 0], x: ["-120%", "580%"] }}
              className=""
              initial={state.reducedMotion ? false : { opacity: 0, x: "-120%" }}
              transition={{ duration: 2.15, delay: 0.52, ease: processEase }}
            />
            <motion.div
              animate={{ opacity: 1, scaleX: 1 }}
              className=""
              initial={state.reducedMotion ? false : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 1.35, delay: 0.58, ease: processEase }}
            />
            <motion.div
              animate={state.reducedMotion ? undefined : { left: ["12%", "88%"], opacity: [0, 1, 1, 0] }}
              className="pointer-events-none absolute top-[calc(4.2rem-3px)] h-1.5 w-1.5 rounded-full bg-control-warm shadow-[0_0_1rem_rgb(207_31_43/0.45)]"
              initial={state.reducedMotion ? false : { left: "12%", opacity: 0 }}
              transition={{ duration: 1.55, delay: 0.72, ease: processEase }}
            />
            <div className="grid w-full grid-cols-4 self-center">
              {executionFlow.map((item, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-3 py-1 text-center ${index > 0 ? "border-l border-slate-200" : ""}`}
                  initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
                  key={item.title}
                  transition={{
                    duration: motionDuration,
                    delay: 0.36 + index * 0.1,
                    ease: processEase,
                  }}
                  whileHover={state.reducedMotion ? undefined : { y: -3 }}
                >
                  <div className="relative mx-auto grid h-10 w-10 place-items-center bg-white text-control-warm [&_svg]:h-9 [&_svg]:w-9">
                    {item.icon}
                  </div>
                  <h2 className="mt-2 text-[0.78rem] font-semibold uppercase leading-tight text-control-text">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[0.7rem] leading-[1.32] text-control-soft">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-6 gap-3 [@container_stage_(max-width:1279px)]:grid-cols-3"
          initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ duration: motionDuration, delay: 0.44, ease: processEase }}
        >
          {capabilities.map((capability, index) => (
            <motion.article
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
              className="relative grid h-[clamp(11.2rem,21cqh,13rem)] grid-rows-[3.45rem_2.1rem_2rem_minmax(0,1fr)] items-start overflow-hidden rounded-[1rem] border border-slate-200/78  px-4 pb-4 pt-5 text-center shadow-[0_1.15rem_3rem_rgb(15_23_42/0.075),inset_0_1px_0_rgb(255_255_255/1)] backdrop-blur-2xl"
              initial={state.reducedMotion ? false : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: 10 }}
              key={capability.id}
              transition={{
                duration: 0.68,
                delay: 0.58 + 0.08 * index,
                ease: processEase,
              }}
              whileHover={
                state.reducedMotion
                  ? undefined
                  : {
                      y: -4,
                      boxShadow: "0 1.25rem 3.2rem rgb(15 23 42 / 0.09), inset 0 1px 0 rgb(255 255 255 / 0.9)",
                    }
              }
            >
              <motion.div
                animate={state.reducedMotion ? undefined : { opacity: [0, 0.95, 0], y: ["-35%", "135%"] }}
                className="pointer-events-none absolute inset-x-0 top-0 h-full  blur-[0.06rem]"
                initial={state.reducedMotion ? false : { opacity: 0, y: "-35%" }}
                transition={{ duration: 1.15, delay: 0.72 + 0.08 * index, ease: processEase }}
              />
              <motion.span
                animate={{ opacity: 1, scaleX: 1 }}
                className="absolute left-0 top-0 origin-left rounded-br-md rounded-tl-[0.55rem] bg-control-warm px-3 py-1 text-xs font-semibold text-white"
                initial={state.reducedMotion ? false : { opacity: 0, scaleX: 0.72 }}
                transition={{ duration: 0.5, delay: 0.78 + 0.08 * index, ease: processEase }}
              >
                {capability.index}
              </motion.span>
              <motion.span
                animate={
                  state.reducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          "inset 0 0 0 0.48rem rgb(207 31 43 / 0.035), 0 0 0 rgb(207 31 43 / 0)",
                          "inset 0 0 0 0.48rem rgb(207 31 43 / 0.035), 0 0 1.1rem rgb(207 31 43 / 0.18)",
                          "inset 0 0 0 0.48rem rgb(207 31 43 / 0.035), 0 0 0 rgb(207 31 43 / 0)",
                        ],
                      }
                }
                className="mx-auto grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full border border-control-warm/35 bg-white text-control-warm [&_svg]:h-7 [&_svg]:w-7"
                transition={{ duration: 0.9, delay: 0.88 + 0.08 * index, ease: "easeInOut" }}
              >
                {capability.icon}
              </motion.span>
              <h2 className="self-end text-[clamp(0.95rem,1cqw,1.12rem)] font-semibold leading-tight text-control-text">
                {capability.title}
              </h2>
              <p className="self-start text-[clamp(0.68rem,0.72cqw,0.82rem)] font-bold leading-snug text-control-warm">
                {capability.subtitle}
              </p>
              <p className="mx-auto max-w-[12.5rem] self-start text-[clamp(0.68rem,0.72cqw,0.82rem)] leading-[1.22] text-control-soft">
                {capability.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-3 [@container_stage_(max-width:1023px)]:grid-cols-1">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pws-scene-control-dock justify-start pb-0.5"
            initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
            transition={{ duration: motionDuration, delay: 0.78, ease: processEase }}
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

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="ml-auto flex min-h-[3.65rem] w-full max-w-[min(48rem,54cqw)] items-center gap-3 rounded-[0.65rem] border border-slate-200/86 bg-white/78 px-4 py-2 shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
            transition={{ duration: motionDuration, delay: 0.88, ease: processEase }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-control-warm shadow-[0_0.45rem_1.3rem_rgb(15_23_42/0.08)]">
              <ClipboardCheck aria-hidden="true" size={20} strokeWidth={1.8} />
            </span>
            <div className="border-l border-slate-200 pl-4">
              <p className="text-[clamp(0.9rem,1cqw,1.08rem)] font-semibold leading-[1.25] text-control-text">
                Every project follows a controlled, traceable process.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
