import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Headphones,
  Map,
} from "lucide-react";
import { useState } from "react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type ChallengeChoice = {
  id: string;
  index: string;
  title: string;
  detail: string;
  response: string;
};

const fallbackChoice: ChallengeChoice = {
  id: "too-much-monitor",
  index: "01",
  title: "Information Overload",
  detail: "Too much information competes for attention.",
  response:
    "Critical information competes for attention, increasing cognitive load and slowing situational understanding.",
};

const choices: ChallengeChoice[] = [
  fallbackChoice,
  {
    id: "too-far-reach",
    index: "02",
    title: "Excessive Reach",
    detail: "Poor equipment placement creates unnecessary movement.",
    response: "Repeated movement increases physical effort and makes frequently used controls harder to access.",
  },
  {
    id: "static-posture",
    index: "03",
    title: "Prolonged Posture",
    detail: "Static working positions increase physical strain.",
    response: "Static working positions contribute to fatigue and discomfort during extended operations.",
  },
  {
    id: "too-many-distractions",
    index: "04",
    title: "Environmental Distractions",
    detail: "Lighting, noise and visual clutter reduce focus.",
    response: "Poor lighting, noise and visual clutter compete for attention and reduce concentration.",
  },
  {
    id: "difficult-coordinate",
    index: "05",
    title: "Coordination Gaps",
    detail: "People and information don't come together fast enough.",
    response: "Disconnected people, systems and information can delay understanding and coordinated response.",
  },
];

const riskChoices: ChallengeChoice[] = [
  {
    id: "missed-information",
    index: "01",
    title: "Missed information",
    detail: "Critical details can be overlooked or recognised too late.",
    response: "Poor visibility increases the chance that important information is missed, delayed or misunderstood.",
  },
  {
    id: "slower-response",
    index: "02",
    title: "Slower response",
    detail: "Poor access and fragmented systems delay action.",
    response: "Poor access and fragmented systems can slow the movement from awareness to action.",
  },
  {
    id: "operator-fatigue",
    index: "03",
    title: "Operator fatigue",
    detail: "Static posture, repeated reach and visual strain increase effort over time.",
    response: "Static posture, repeated reach and visual strain increase operator effort over time.",
  },
  {
    id: "coordination-gaps",
    index: "04",
    title: "Coordination gaps",
    detail: "People and information do not come together quickly enough.",
    response: "When escalation paths are unclear, teams may take longer to coordinate the right response.",
  },
  {
    id: "reduced-continuity",
    index: "05",
    title: "Reduced continuity",
    detail: "Difficult maintenance and inflexible infrastructure disrupt long-term operations.",
    response: "Difficult maintenance and inflexible infrastructure can interrupt continuity and limit future adaptation.",
  },
];

export function OperatorChallengesChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const isRiskScene = chapter.id === "poor-design-risk";
  const sceneChoices = isRiskScene ? riskChoices : choices;
  const [selectedId, setSelectedId] = useState(fallbackChoice.id);
  const selected = sceneChoices.find((choice) => choice.id === selectedId) ?? sceneChoices[0];
  const motionDuration = state.reducedMotion ? 0.01 : 0.72;
  const processEase = [0.16, 1, 0.3, 1] as const;
  const orchestrationDelay = state.reducedMotion ? 0 : 0.08;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_48%,#edf3f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.026)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.026)_1px,transparent_1px)] bg-[length:5.5rem_5.5rem] opacity-55" />

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 z-0 overflow-hidden"
        initial={state.reducedMotion ? false : { opacity: 0, scale: 1.015 }}
        transition={{ duration: motionDuration + 0.2, delay: 0.06, ease: processEase }}
      >
        <img
          alt="Operator workstation in a mission-critical control room"
          className="h-full w-full object-cover object-[72%_50%]"
          draggable={false}
          src="/assets/source-pdf/p31_059_2078x1168.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.98)_0%,rgb(255_255_255/0.93)_27%,rgb(255_255_255/0.66)_44%,rgb(255_255_255/0.22)_64%,rgb(255_255_255/0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.78)_0%,rgb(255_255_255/0.16)_26%,rgb(255_255_255/0.08)_60%,rgb(255_255_255/0.84)_100%)]" />
        {!state.reducedMotion ? (
          <>
            <motion.div
              animate={{ opacity: [0, 0.4, 0], x: ["-18%", "55%", "112%"] }}
              className="absolute top-[19cqh] h-px w-[42cqw] bg-[linear-gradient(90deg,transparent,rgb(207_31_43/0.5),transparent)]"
              initial={{ opacity: 0, x: "-18%" }}
              transition={{ duration: 3.6, delay: 0.72, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ opacity: [0, 0.16, 0.08], scaleX: [0.82, 1.06, 1] }}
              className="absolute left-[29cqw] top-[48cqh] h-[20cqh] w-[38cqw] origin-left rounded-full bg-[radial-gradient(circle,rgb(207_31_43/0.18)_0%,transparent_64%)] blur-3xl"
              initial={{ opacity: 0, scaleX: 0.82 }}
              transition={{ duration: 2.8, delay: 0.92, ease: processEase }}
            />
          </>
        ) : null}
      </motion.div>

      <section className="absolute inset-0 z-20 px-[3.55cqw] py-[3.15cqh]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.2cqh] bg-white/82 backdrop-blur-[2px]" />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] top-[16.5cqh] w-[min(51cqw,58rem)]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: motionDuration, ease: processEase }}
        >
          <p className="text-[clamp(0.72rem,0.78cqw,0.9rem)] font-bold uppercase tracking-[0.22em] text-control-warm">
            {chapter.eyebrow}
          </p>
          <h1 className="mt-[2cqh] max-w-[17ch] text-balance text-[clamp(2.48rem,3.48cqw,4.55rem)] font-extrabold leading-[0.95] tracking-normal text-control-text md:text-[3.5cqw]!">
            {chapter.headline}
          </h1>
          <p className="mt-[1.65cqh] max-w-[41rem] text-[clamp(0.88rem,0.96cqw,1.08rem)] leading-[1.32] text-control-soft md:text-[0.8cqw]">
            {chapter.supportingMessage}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] top-[57.2cqh] w-[min(74cqw,90rem)]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: motionDuration, delay: 0.2, ease: processEase }}
        >
          <div className="mb-[1.25cqh] flex items-center gap-5">
            <p className="shrink-0 text-[clamp(0.78rem,0.88cqw,1rem)] font-bold uppercase tracking-[0.28em] text-control-warm">
              {isRiskScene ? "Select a risk to see how it affects operations." : "What challenges your operators most?"}
            </p>
            <div className="relative h-px flex-1 overflow-hidden bg-slate-300">
              <motion.div
                animate={{ scaleX: 1 }}
                className="absolute inset-y-0 left-0 w-full origin-left bg-control-warm"
                initial={state.reducedMotion ? false : { scaleX: 0 }}
                transition={{ duration: 1.15, delay: orchestrationDelay + 0.48, ease: processEase }}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-[1.1cqw]">
            {sceneChoices.map((choice, index) => {
              const isSelected = choice.id === selected.id;

              return (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  aria-pressed={isSelected}
                  className={`group relative flex h-[clamp(9.4rem,16.5cqh,11.2rem)] flex-col overflow-hidden rounded-[0.72rem] border px-[clamp(1rem,1.05cqw,1.25rem)] py-[clamp(0.9rem,1.05cqh,1.15rem)] text-left shadow-[0_0.9rem_2rem_rgb(15_23_42/0.06)] backdrop-blur-xl transition-colors ${
                    isSelected
                      ? "border-control-warm bg-white/88 shadow-[0_1rem_2.4rem_rgb(207_31_43/0.20)]"
                      : "border-slate-300/90 bg-white/72 hover:border-control-warm/50"
                  }`}
                  initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
                  key={choice.id}
                  onClick={() => setSelectedId(choice.id)}
                  transition={{ duration: motionDuration, delay: 0.26 + index * 0.055, ease: processEase }}
                  type="button"
                  whileHover={state.reducedMotion ? undefined : { y: -4, transition: { duration: 0.28, ease: processEase } }}
                >
                  {!state.reducedMotion ? (
                    <motion.span
                      aria-hidden="true"
                      animate={{ scaleX: isSelected ? 1 : 0 }}
                      className="absolute left-0 top-0 h-px w-full origin-left bg-control-warm/80"
                      initial={false}
                      transition={{ duration: 0.46, ease: processEase }}
                    />
                  ) : null}
                  <span className="block text-[clamp(1.12rem,1.25cqw,1.45rem)] font-semibold tracking-[0.05em] text-control-warm">
                    {choice.index}
                  </span>
                  <span className="mt-[0.62cqh] block text-[clamp(0.9rem,0.98cqw,1.12rem)] font-semibold leading-tight text-control-text">
                    {choice.title}
                  </span>
                  <span className="mt-[0.58cqh] block h-px w-10 bg-control-warm/70" />
                  <span className="mt-[0.62cqh] block overflow-hidden text-[clamp(0.7rem,0.72cqw,0.84rem)] font-medium leading-[1.24] text-control-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {choice.detail}
                  </span>
                  {isSelected ? <span className="absolute inset-x-0 bottom-0 h-1 bg-control-warm" /> : null}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[calc(12.3cqh-23px)] left-[3.55cqw] grid h-[clamp(4.7rem,7.5cqh,5.7rem)] w-[min(74cqw,90rem)] overflow-hidden rounded-[0.45rem] border border-slate-300/90 bg-white/84 shadow-[0_1rem_2.2rem_rgb(15_23_42/0.08)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: motionDuration, delay: 0.54, ease: processEase }}
        >
          {!state.reducedMotion ? (
            <motion.div
              aria-hidden="true"
              animate={{ x: ["-32%", "132%"], opacity: [0, 0.4, 0] }}
              className="pointer-events-none absolute inset-y-0 w-[28%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.9),transparent)]"
              initial={{ x: "-32%", opacity: 0 }}
              transition={{ duration: 1.25, delay: 0.84, ease: "easeInOut" }}
            />
          ) : null}
          <div className="grid grid-cols-[minmax(12rem,0.34fr)_1fr]">
            <div className="flex items-center border-r border-slate-300 px-[1.25cqw]">
              <div className="border-l-2 border-control-warm pl-[0.9cqw]">
                <p className="text-[clamp(0.78rem,0.9cqw,1.02rem)] font-semibold leading-tight text-control-text">
                  {isRiskScene ? "Operational impact" : "The Impact"}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-[1.35cqw]">
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="text-[clamp(0.88rem,1.02cqw,1.18rem)] font-bold leading-[1.24] text-control-text"
                initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
                key={selected.id}
                transition={{ duration: 0.42, ease: processEase }}
              >
                {selected.response}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: motionDuration, delay: 0.72, ease: processEase }}
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
