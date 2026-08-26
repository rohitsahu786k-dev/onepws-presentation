import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Expand,
  Headphones,
  Info,
  Map,
  Sun,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSlideNarration } from "../../content/slideNarration";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useGuidedNarration } from "../../hooks/useGuidedNarration";
import { SlideNarrationBar } from "../narration/SlideNarrationBar";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type Adaptation = {
  id: string;
  index: string;
  title: string;
  detail: string;
  accent: string;
  soft: string;
  Icon: typeof UserRound;
};

const principles = [
  {
    id: "people",
    label: "People",
    detail: "Operators at the centre of every decision.",
    Icon: UserRound,
  },
  {
    id: "purpose",
    label: "Purpose",
    detail: "Every element designed around a clear operational need.",
    Icon: Crosshair,
  },
  {
    id: "performance",
    label: "Performance",
    detail: "Designed for focus, comfort and confident action.",
    Icon: TrendingUp,
  },
  {
    id: "partnership",
    label: "Partnership",
    detail: "People, technology and environment working as one.",
    Icon: UsersRound,
  },
];

const adaptations: Adaptation[] = [
  {
    id: "operator",
    index: "01",
    title: "The Operator",
    detail: "Accommodate different users, roles and working preferences.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: UserRound,
  },
  {
    id: "task",
    index: "02",
    title: "The Task",
    detail: "Shape the workspace around the work being performed.",
    accent: "#2f65b8",
    soft: "rgb(47 101 184 / 0.11)",
    Icon: BookOpen,
  },
  {
    id: "information",
    index: "03",
    title: "The Information",
    detail: "Place critical information where it can be understood quickly.",
    accent: "#118d8a",
    soft: "rgb(17 141 138 / 0.12)",
    Icon: Info,
  },
  {
    id: "team",
    index: "04",
    title: "The Team",
    detail: "Support individual focus and coordinated response.",
    accent: "#7b3fc9",
    soft: "rgb(123 63 201 / 0.11)",
    Icon: UsersRound,
  },
  {
    id: "environment",
    index: "05",
    title: "The Environment",
    detail: "Balance lighting, acoustics, comfort and infrastructure.",
    accent: "#d96a18",
    soft: "rgb(217 106 24 / 0.12)",
    Icon: Sun,
  },
];

export function HumanCentredPhilosophyChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const [selectedId, setSelectedId] = useState(adaptations[0].id);
  const selected = adaptations.find((item) => item.id === selectedId) ?? adaptations[0];

  const segments = getSlideNarration(chapter.id);
  const narration = useGuidedNarration(segments);
  // The chapter track and the walkthrough share the room, so only one speaks.
  const unlockNarrationAudio = useCallback(() => {
    dispatch({ type: "UNLOCK_AUDIO" });
    voiceover.stop();
  }, [dispatch, voiceover]);

  // The card selection follows the voice, so the section being explained is the
  // one highlighted on screen.
  useEffect(() => {
    if (narration.activeId && adaptations.some((item) => item.id === narration.activeId)) {
      setSelectedId(narration.activeId);
    }
  }, [narration.activeId]);

  // Narration belongs to this slide, so it must not carry into the next one.
  const voiceoverRef = useRef(voiceover);
  voiceoverRef.current = voiceover;
  const narrationRef = useRef(narration);
  narrationRef.current = narration;
  useEffect(() => {
    const voiceoverId = chapterVoiceover?.id;
    return () => {
      const current = voiceoverRef.current;
      if (voiceoverId && current.active?.id === voiceoverId) {
        current.stop();
      }
      narrationRef.current.stop();
    };
  }, [chapterVoiceover?.id]);

  const motionDuration = state.reducedMotion ? 0.01 : 0.72;
  const cinematicDuration = state.reducedMotion ? 0.01 : 1.18;
  const processEase = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_52%,#eef4f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.025)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.025)_1px,transparent_1px)] bg-[length:5.5rem_5.5rem] opacity-55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.2cqh] bg-white/88 backdrop-blur-[2px]" />
      {!state.reducedMotion ? (
        <>
          <motion.div
            animate={{ opacity: [0, 0.42, 0.16], scale: [0.98, 1.03, 1] }}
            className="pointer-events-none absolute left-[31cqw] top-[11cqh] h-[48cqh] w-[cqw] rounded-full bg-[radial-gradient(circle_at_55%_48%,rgb(213_29_42/0.14),rgb(47_101_184/0.08)_34%,transparent_68%)] blur-3xl"
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.2, ease: processEase }}
          />

        </>
      ) : null}

      <section className="absolute inset-0 z-20 px-[3.55cqw] py-[3.15cqh]">
        {!state.reducedMotion ? (
          <motion.svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <motion.path
              animate={{ opacity: [0, 0.42, 0.16], pathLength: 1 }}
              d="M4.4 58.8 H34.8 C39.2 58.8 39.6 52.8 44 52.8 H96"
              initial={{ opacity: 0, pathLength: 0 }}
              stroke="url(#human-centred-flow)"
              strokeWidth="0.08"
              transition={{ duration: 1.9, delay: 0.68, ease: processEase }}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              animate={{ opacity: [0, 0.35, 0.12], pathLength: 1 }}
              d="M34.2 12.4 H63.4 C68.2 12.4 68.2 20.4 73 20.4 H96"
              initial={{ opacity: 0, pathLength: 0 }}
              stroke="url(#human-centred-flow-soft)"
              strokeWidth="0.07"
              transition={{ duration: 1.75, delay: 0.26, ease: processEase }}
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="human-centred-flow" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#d51d2a" stopOpacity="0" />
                <stop offset="42%" stopColor="#d51d2a" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#2f65b8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="human-centred-flow-soft" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#2f65b8" stopOpacity="0" />
                <stop offset="52%" stopColor="#d51d2a" stopOpacity="0.44" />
                <stop offset="100%" stopColor="#2f65b8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </motion.svg>
        ) : null}

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] top-[13.2cqh] z-10 w-[min(27.4cqw,33rem)]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ duration: motionDuration, ease: processEase }}
        >
          <p className="text-[clamp(0.84rem,0.9cqw,1.02rem)] font-bold uppercase tracking-[0.2em] text-control-warm">
            Human-Centred Philosophy
          </p>
          <motion.div
            animate={{ scaleX: 1 }}
            className="mt-[1.8cqh] h-[2px] w-8 origin-left bg-control-warm"
            initial={state.reducedMotion ? false : { scaleX: 0 }}
            transition={{ duration: 0.62, delay: 0.18, ease: processEase }}
          />
          <h1
            className={`mt-[1.75cqh] max-w-[11.8ch] text-balance rounded-[0.3rem] text-[clamp(2.35rem,2.8cqw,3.65rem)] font-extrabold leading-[1.01] tracking-normal transition-colors duration-500 md:text-[3.45cqw] ${
              narration.isSpeaking("headline") ? "bg-control-warm/10 text-control-text" : "text-control-text"
            }`}
          >
            Design the <span className="text-control-warm">Control Room</span> around the people who operate it.
          </h1>
          <div className="mt-[0.9cqh] h-px w-8 bg-slate-300" />
          <p
            className={`mt-[0.9cqh] max-w-[29rem] rounded-[0.3rem] text-[clamp(0.92rem,0.98cqw,1.14rem)] leading-[1.4] transition-colors duration-500 ${
              narration.isSpeaking("subheading") ? "bg-control-warm/10 text-control-text" : "text-control-soft"
            }`}
          >
            {chapter.supportingMessage}
          </p>
        </motion.div>

        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, x: 0 }}
          className="absolute left-[34cqw] right-[3.55cqw] top-[12.6cqh] h-[53.2cqh] overflow-hidden rounded-[0.22rem] border border-slate-200 bg-slate-100 shadow-[0_1.3rem_3rem_rgb(15_23_42/0.12)]"
          initial={state.reducedMotion ? false : { clipPath: "inset(0% 0% 0% 10%)", opacity: 0, x: 20 }}
          transition={{ duration: cinematicDuration, delay: 0.08, ease: processEase }}
        >
          {!state.reducedMotion ? (
            <>
              <motion.div
                animate={{ scaleX: 1 }}
                className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-[linear-gradient(90deg,rgb(213_29_42/0.82),rgb(213_29_42/0.12),transparent)]"
                initial={{ scaleX: 0 }}
                transition={{ duration: 1.06, delay: 0.2, ease: processEase }}
              />
              <motion.div
                animate={{ scaleY: 1 }}
                className="pointer-events-none absolute right-0 top-0 z-20 h-full w-px origin-top bg-[linear-gradient(180deg,rgb(15_23_42/0.16),transparent)]"
                initial={{ scaleY: 0 }}
                transition={{ duration: 1.1, delay: 0.42, ease: processEase }}
              />
            </>
          ) : null}
          <motion.img
            animate={state.reducedMotion ? { scale: 1 } : { scale: [1.035, 1.012, 1.018] }}
            alt="Operator-centred control room environment"
            className="h-full w-full object-cover object-[60%_50%]"
            draggable={false}
            initial={state.reducedMotion ? false : { scale: 1.035 }}
            src="/assets/source-pdf/p31_059_2078x1168.jpg"
            transition={{ duration: 5.8, delay: 0.1, ease: processEase }}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgb(6_11_18/0.94)_0%,rgb(6_11_18/0.9)_10%,rgb(6_11_18/0.78)_22%,rgb(6_11_18/0.58)_34%,rgb(6_11_18/0.36)_46%,rgb(6_11_18/0.18)_58%,rgb(6_11_18/0.07)_70%,transparent_82%)]" />
          {!state.reducedMotion ? (
            <>
              <motion.div
                animate={{ x: ["-35%", "620%"], opacity: [0, 0.52, 0] }}
                className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.34),rgb(213_29_42/0.2),transparent)] mix-blend-screen"
                initial={{ x: "-35%", opacity: 0 }}
                transition={{ duration: 1.75, delay: 0.5, ease: processEase }}
              />
              <motion.div
                animate={{ scaleX: 1, opacity: [0, 0.72, 0.2] }}
                className="pointer-events-none absolute left-[15.4cqw] right-0 top-[51%] h-px origin-left bg-[linear-gradient(90deg,rgb(213_29_42/0.7),rgb(255_255_255/0.45),transparent)]"
                initial={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 1.15, delay: 0.62, ease: processEase }}
              />
              {[
                ["28%", "31%"],
                ["51%", "44%"],
                ["68%", "58%"],
              ].map(([left, top], index) => (
                <motion.div
                  animate={{
                    opacity: [0, 0.86, 0.28],
                    scale: [0.72, 1, 1.18],
                  }}
                  className="pointer-events-none absolute z-20 h-[1.05rem] w-[1.05rem] rounded-full border border-control-warm/80 bg-white/20 shadow-[0_0_1.2rem_rgb(213_29_42/0.32)]"
                  initial={{ opacity: 0, scale: 0.72 }}
                  key={`${left}-${top}`}
                  style={{ left, top }}
                  transition={{
                    duration: 1.6,
                    delay: 1.0 + index * 0.18,
                    ease: processEase,
                    repeat: 1,
                    repeatDelay: 1.4,
                  }}
                />
              ))}
            </>
          ) : null}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-0 top-0 z-20 h-full w-[min(17.5cqw,21rem)] bg-[linear-gradient(90deg,rgb(6_11_18/0.9)_0%,rgb(6_11_18/0.82)_38%,rgb(6_11_18/0.62)_66%,rgb(6_11_18/0.32)_86%,transparent_100%)] px-[clamp(0.86rem,1cqw,1.25rem)] py-[2.2cqh] text-white"
            initial={state.reducedMotion ? false : { opacity: 0, x: -18 }}
            transition={{ duration: motionDuration, delay: 0.22, ease: processEase }}
          >
            <div className="absolute left-[1.4rem] top-[2.1cqh] h-[calc(100%-4.2cqh)] w-px bg-white/42" />
            <div className="ml-[1rem] grid h-full grid-rows-4 gap-[0.82cqh]">
              {principles.map((principle, index) => (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className={`grid grid-cols-[2.2rem_1fr] items-center gap-[0.62rem] rounded-[0.42rem] px-[0.45rem] py-[0.3rem] transition-colors duration-500 ${narration.isSpeaking(principle.id) ? "bg-control-warm/25 shadow-[inset_0_0_0_1px_rgb(213_29_42/0.55)]" : ""}`}
                  initial={state.reducedMotion ? false : { opacity: 0, x: -10 }}
                  key={principle.label}
                  transition={{ duration: motionDuration, delay: 0.34 + index * 0.08, ease: processEase }}
                >
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={state.reducedMotion ? false : { opacity: 0, scale: 0.72 }}
                    transition={{ duration: 0.54, delay: 0.48 + index * 0.08, ease: processEase }}
                  >
                    <principle.Icon aria-hidden="true" className="text-control-warm" size={32} strokeWidth={1.75} />
                  </motion.div>
                  <div>
                    <p className="text-[clamp(0.96rem,1.08cqw,1.26rem)] font-semibold uppercase leading-tight text-white">
                      {principle.label}
                    </p>
                    <p className="mt-[0.32cqh] max-w-[12rem] text-[clamp(0.84rem,0.96cqw,1.1rem)] leading-[1.28] text-white/90">
                      {principle.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] right-[3.55cqw] top-[68cqh]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ duration: motionDuration, delay: 0.24, ease: processEase }}
        >
          <p className="mb-[1cqh] text-[clamp(0.74rem,0.82cqw,0.94rem)] font-semibold uppercase tracking-[0.16em] text-control-text">
            What should the room adapt to?
          </p>
          <div className="grid h-[12.7cqh] grid-cols-5 overflow-hidden rounded-[0.32rem] border border-slate-200 bg-white/74 shadow-[0_1.1rem_2.5rem_rgb(15_23_42/0.07)] backdrop-blur-xl">
            {!state.reducedMotion ? (
              <motion.div
                animate={{ opacity: [0, 0.6, 0.18], scaleX: 1 }}
                className="pointer-events-none absolute left-[3.8rem] right-[3.8rem] top-[calc(50%+0.1rem)] h-px origin-left bg-[linear-gradient(90deg,rgb(213_29_42/0.45),rgb(47_101_184/0.26),rgb(17_141_138/0.22),rgb(217_106_24/0.28))]"
                initial={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 1.4, delay: 0.9, ease: processEase }}
              />
            ) : null}
            {adaptations.map((item, index) => {
              const isSelected = item.id === selected.id;
              const isSpeaking = narration.isSpeaking(item.id);
              return (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  aria-current={isSpeaking ? "true" : undefined}
                  aria-pressed={isSelected}
                  className={`relative grid grid-cols-[3rem_1fr] items-center gap-[0.82rem] overflow-hidden border-r border-slate-200 px-[1.05cqw] text-left last:border-r-0 transition-colors ${
                    isSelected ? "bg-white" : "bg-white/46 hover:bg-white/74"
                  }`}
                  initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    if (narration.hasSegment(item.id)) {
                      dispatch({ type: "UNLOCK_AUDIO" });
                      voiceover.stop();
                      narration.playSegment(item.id);
                    }
                  }}
                  style={
                    isSpeaking
                      ? { boxShadow: `inset 4px 0 0 ${item.accent}, 0 0 0 2px ${item.accent}, 0 1rem 2.2rem rgb(15 23 42 / 0.12)` }
                      : isSelected
                        ? { boxShadow: `inset 4px 0 0 ${item.accent}` }
                        : undefined
                  }
                  transition={{ duration: motionDuration, delay: 0.34 + index * 0.05, ease: processEase }}
                  type="button"
                  whileHover={state.reducedMotion ? undefined : { y: -2 }}
                >
                  {isSelected ? (
                    <motion.span
                      animate={{ opacity: 1 }}
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0 }}
                      layoutId="human-centred-active-card-glow"
                      style={{
                        background: `linear-gradient(135deg, ${item.soft} 0%, rgb(255 255 255 / 0.18) 48%, transparent 78%)`,
                      }}
                      transition={{ duration: 0.45, ease: processEase }}
                    />
                  ) : null}
                  <motion.span
                    animate={isSelected && !state.reducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    className="pointer-events-none absolute bottom-0 left-0 h-[3px] origin-left"
                    style={{ background: item.accent, width: "100%" }}
                    transition={{ duration: 0.5, ease: processEase }}
                  />
                  <div className="relative z-10">
                    <motion.span
                      animate={{ opacity: 1, y: 0 }}
                      className="block text-[clamp(1.15rem,1.28cqw,1.46rem)] font-semibold tracking-[0.04em]"
                      initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
                      style={{ color: item.accent }}
                      transition={{ duration: 0.58, delay: 0.48 + index * 0.07, ease: processEase }}
                    >
                      {item.index}
                    </motion.span>
                    <motion.div
                      animate={
                        isSelected && !state.reducedMotion
                          ? { boxShadow: [`0 0 0 0 ${item.soft}`, `0 0 0 0.5rem ${item.soft}`, `0 0 0 0 ${item.soft}`] }
                          : undefined
                      }
                      className="mt-[0.82cqh] flex h-[2.35rem] w-[2.35rem] items-center justify-center rounded-full"
                      style={{ background: item.soft }}
                      transition={{ duration: 1.2, ease: processEase }}
                    >
                      <item.Icon aria-hidden="true" size={20} strokeWidth={1.9} style={{ color: item.accent }} />
                    </motion.div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[clamp(0.92rem,0.98cqw,1.12rem)] font-semibold leading-tight text-control-text">
                      {item.title}
                    </p>
                    <div className="mt-[0.5cqh] h-px w-6" style={{ background: item.accent }} />
                    <p className="mt-[0.48cqh] text-[clamp(0.72rem,0.76cqw,0.88rem)] font-medium leading-[1.24] text-control-soft">
                      {item.detail}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] right-[3.55cqw] top-[85.3cqh] grid h-[7.2cqh] items-center overflow-hidden border-y border-slate-200"
          initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: motionDuration, delay: 0.52, ease: processEase }}
        >
          {!state.reducedMotion ? (
            <motion.div
              animate={{ opacity: [0, 0.9, 0.1], x: ["-18%", "104%"] }}
              className="pointer-events-none absolute inset-y-0 left-0 w-[26%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.74),transparent)]"
              initial={{ opacity: 0, x: "-18%" }}
              transition={{ duration: 1.25, delay: 0.96, ease: processEase }}
            />
          ) : null}
          <div className={`grid h-full max-w-[54rem] grid-cols-[4.5rem_1fr] items-center rounded-[0.42rem] transition-colors duration-500 ${narration.isSpeaking("quote") ? "bg-control-warm/10" : ""}`}>
            <div className="flex h-full items-center justify-center text-control-warm">
              <span aria-hidden="true" className="font-serif text-[3.8rem] font-bold leading-none text-control-warm">
                &ldquo;
              </span>
            </div>
            <div className="border-l border-slate-200 pl-[1.2cqw]">
              <p className="text-[clamp(0.9rem,1cqw,1.16rem)] font-medium leading-[1.28] text-control-text">
                Don't make the operator adapt to the room.
              </p>
              <p className="mt-[0.35cqh] text-[clamp(0.9rem,1cqw,1.16rem)] font-semibold leading-[1.25] text-control-warm">
                Make the room adapt to the operator.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-narration-dock"
          initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: motionDuration, delay: 0.7, ease: processEase }}
        >
          <SlideNarrationBar narration={narration} onBeforePlay={unlockNarrationAudio} />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: motionDuration, delay: 0.66, ease: processEase }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" size={20} />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
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
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" size={20} />
          </button>
        </motion.div>

      </section>
    </article>
  );
}
