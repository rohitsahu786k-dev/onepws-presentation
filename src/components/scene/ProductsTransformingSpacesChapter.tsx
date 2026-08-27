import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Expand,
  Factory,
  Headphones,
  Layers3,
  Map,
  Network,
  PanelsTopLeft,
  Recycle,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  UsersRound,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type ProductCard = {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  accent: string;
  Icon: typeof Building2;
};

type Differentiator = {
  title: string;
  detail: string;
  accent: string;
  Icon: typeof Crosshair;
};

const productCards: ProductCard[] = [
  {
    title: "Control Rooms",
    description: "Mission-critical environments with integrated ergonomics, acoustics and technology.",
    metric: "450+",
    metricLabel: "Control Rooms Delivered",
    image: "/assets/products/control-room.png",
    accent: "#0b376d",
    Icon: PanelsTopLeft,
  },
  {
    title: "Control Desks",
    description: "Ergonomic, modular and customizable consoles for optimal operator performance.",
    metric: "75K+",
    metricLabel: "Control Desks Installed",
    image: "/assets/products/console.png",
    accent: "#1262b3",
    Icon: SlidersHorizontal,
  },
  {
    title: "Raised Access Floor",
    description: "High-performance flooring systems for cable management, flexibility and strength.",
    metric: "10 L+",
    metricLabel: "Sq. Ft. Raised Access Floor Installed",
    image: "/assets/products/floor.png",
    accent: "#0f8b8d",
    Icon: Layers3,
  },
  {
    title: "Modular Operation Theatres",
    description: "Hygienic, infection-controlled modular OT solutions built for safety and efficiency.",
    metric: "200+",
    metricLabel: "Modular OTs Delivered",
    image: "/assets/products/mot.png",
    accent: "#6d3fc2",
    Icon: ShieldCheck,
  },
  {
    title: "Auditoriums",
    description: "Acoustically optimized auditoriums that deliver exceptional sound, comfort and aesthetics.",
    metric: "150+",
    metricLabel: "Auditoriums Completed",
    image: "/assets/products/auditoriums.png",
    accent: "#ef5b0c",
    Icon: Sofa,
  },
  {
    title: "Corporate Offices",
    description: "Smart, collaborative and sustainable workspaces that enhance productivity.",
    metric: "300,000+ ft²",
    metricLabel: "Corporate Spaces Created",
    image: "/assets/products/corporate-offices.png",
    accent: "#5b8c2a",
    Icon: Building2,
  },
];

const differentiators: Differentiator[] = [
  {
    title: "End-to-End Capability",
    detail: "From concept to completion. One partner. One responsibility.",
    accent: "#e30613",
    Icon: Crosshair,
  },
  {
    title: "Engineered for Performance",
    detail: "Every product is built to meet international standards.",
    accent: "#0b376d",
    Icon: ShieldCheck,
  },
  {
    title: "Integrated Approach",
    detail: "Products that work in harmony for seamless environments.",
    accent: "#0f8b8d",
    Icon: Network,
  },
  {
    title: "Customizable Solutions",
    detail: "Designed around your needs. Flexible, scalable, future-ready.",
    accent: "#6d3fc2",
    Icon: SlidersHorizontal,
  },
  {
    title: "Sustainable by Design",
    detail: "Low VOC, recyclable materials and energy-efficient systems.",
    accent: "#5b8c2a",
    Icon: Recycle,
  },
  {
    title: "Proven Track Record",
    detail: "Hundreds of successful projects across industries.",
    accent: "#ef5b0c",
    Icon: UsersRound,
  },
];

export function ProductsTransformingSpacesChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const duration = state.reducedMotion ? 0.01 : 0.62;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="pws-products-scene relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffffff_0%,#fbfcfd_54%,#edf4f8_100%)]" />
      {/* Control-room photograph held far back so the glass panels above it have
          something to refract, without competing with the product cards. */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[68%_50%] opacity-[0.16]"
        draggable={false}
        src="/assets/source-pdf/p31_059_2078x1168.jpg"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.70)_0%,rgb(255_255_255/0.26)_32%,rgb(255_255_255/0.30)_64%,rgb(255_255_255/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.018)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.018)_1px,transparent_1px)] bg-[length:5.2rem_5.2rem] opacity-55" />
      <div className="absolute right-[-10cqw] top-[-18cqh] h-[38cqh] w-[44cqw] rounded-full bg-control-warm/5 blur-3xl" />
      <div className="absolute bottom-[-22cqh] left-[18cqw] h-[40cqh] w-[52cqw] rounded-full bg-slate-300/20 blur-3xl" />

      <section className="pws-products-safe absolute inset-x-[1.65cqw] bottom-[9cqh] top-[11.8cqh] z-20">
        <div className="pws-products-hero-grid grid grid-cols-[minmax(0,1fr)_25cqw] items-start gap-[2cqw]">
          <motion.div animate={{ opacity: 1, y: 0 }} initial={state.reducedMotion ? false : { opacity: 0, y: 16 }} transition={{ duration, ease }}>
            <h1 className="text-balance text-[clamp(2.15rem,3.05cqw,4rem)] font-extrabold leading-[0.98] tracking-normal text-control-text md:text-[3.5cqw]">
              Our Products. <span className="text-control-warm">Transforming Spaces.</span>
            </h1>
            <p className="mt-[1.2cqh] max-w-[72rem] text-[clamp(0.95rem,1.08cqw,1.3rem)] leading-[1.38] text-slate-700 md:text-[1cqw]">
              End-to-end interiors and infrastructure solutions designed for performance, safety and sustainability.
            </p>
          </motion.div>

          <motion.aside
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="rounded-[1rem] border border-white/90 bg-white/82 px-[1.35cqw] py-[1.35cqh] shadow-[0_1rem_2.4rem_rgb(15_23_42/0.1)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration, delay: 0.1, ease }}
          >
            <div className="flex items-center gap-[1cqw]">
              <span className="grid h-[4.2rem] w-[4.2rem] shrink-0 place-items-center rounded-full border border-control-warm/25 bg-control-warm/5 text-control-warm">
                <Factory aria-hidden="true" size={32} strokeWidth={1.65} />
              </span>
              <div>
                <p className="text-[clamp(1.45rem,1.9cqw,2.35rem)] font-semibold leading-none text-control-text">800+</p>
                <p className="mt-[0.35cqh] text-[clamp(0.72rem,0.82cqw,0.98rem)] font-semibold text-control-text">Projects Delivered</p>
                <p className="mt-[0.35cqh] text-[clamp(0.58rem,0.66cqw,0.8rem)] leading-[1.25] text-slate-600">Across industries. Across India. Across the world.</p>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-products-card-grid mt-[2.1cqh] grid h-[46.5cqh] grid-cols-6 gap-[0.62cqw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 22 }}
          transition={{ duration, delay: 0.18, ease }}
        >
          {productCards.map((product, index) => (
            <motion.article
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="pws-products-card relative flex min-h-0 flex-col overflow-hidden rounded-[0.9rem] border border-white/90 bg-white/82 shadow-[0_0.9rem_2.2rem_rgb(15_23_42/0.08)] ring-1 ring-slate-900/[0.035] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
              key={product.title}
              transition={{ duration, delay: 0.23 + index * 0.05, ease }}
              whileHover={state.reducedMotion ? undefined : { y: -4, transition: { duration: 0.22 } }}
            >
              <div className="pws-products-card-image relative h-[50%] overflow-hidden">
                <img alt={product.title} className="h-full w-full object-cover" src={product.image} />
                <div className="absolute inset-0 " />
              </div>
              <div className="pws-products-card-icon-wrap relative -mt-[2.3rem] flex justify-center">
                <span
                  className="pws-products-card-icon grid h-[4.1rem] w-[4.1rem] place-items-center rounded-full border-[0.18rem] border-white text-white shadow-[0_0.8rem_1.6rem_rgb(15_23_42/0.18)]"
                  style={{ backgroundColor: product.accent }}
                >
                  <product.Icon aria-hidden="true" size={28} strokeWidth={1.75} />
                </span>
              </div>
              <div className="pws-products-card-body flex min-h-0 flex-1 flex-col px-[0.8cqw] pb-[1cqh] pt-[0.7cqh] text-center">
                <h2 className="pws-products-card-title min-h-[2.15lh] text-[clamp(0.9rem,1.05cqw,1.22rem)] font-semibold leading-[1.08] md:text-[0.9cqw]" style={{ color: product.accent }}>
                  {product.title}
                </h2>
                <div className="mx-auto mt-[0.75cqh] h-[2px] w-[2.4rem]" style={{ backgroundColor: product.accent }} />
                <p className="pws-products-card-description mt-[1.1cqh] min-h-[4.4lh] text-[clamp(0.58rem,0.68cqw,0.8rem)] font-medium leading-[1.32] text-slate-700">
                  {product.description}
                </p>
                <div className="pws-products-metric mt-auto rounded-[0.65rem] border border-slate-200/80 bg-white/72 px-[0.65cqw] py-[0.75cqh] text-left shadow-[0_0.45rem_1.1rem_rgb(15_23_42/0.045)]">
                  <div className="grid grid-cols-[2.15rem_1fr] items-center gap-[0.55cqw]">
                    <span className="grid h-[2.15rem] w-[2.15rem] place-items-center rounded-full border" style={{ borderColor: product.accent, color: product.accent }}>
                      <CheckCircle2 aria-hidden="true" size={18} strokeWidth={1.85} />
                    </span>
                    <div>
                      <p className="text-[clamp(0.82rem,1cqw,1.14rem)] font-semibold leading-none" style={{ color: product.accent }}>{product.metric}</p>
                      <p className="mt-[0.24cqh] text-[clamp(0.52rem,0.6cqw,0.7rem)] font-semibold leading-[1.15] text-control-text">{product.metricLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="pws-products-differentiators mt-[1.55cqh] overflow-hidden rounded-[0.95rem] border border-white/90 bg-white/82 px-[1.15cqw] py-[1.15cqh] shadow-[0_1rem_2.5rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration, delay: 0.46, ease }}
        >
          <div className="grid grid-cols-[13cqw_1fr] items-center gap-[1cqw]">
            <div>
              <p className="text-[clamp(1.05rem,0.88cqw,1.2rem)] font-semibold uppercase tracking-[0em] text-control-text">OnePWS Key Differentiators</p>
              <div className="mt-[0.65cqh] h-[2px] w-[2.4rem] bg-control-warm" />
            </div>
            <div className="grid grid-cols-3 gap-5">
              {differentiators.map((item, index) => (
                <div className={`grid grid-cols-[2.6rem_1fr] items-center gap-[0.65cqw] px-[0.8cqw] ${index > 0 ? "border-l border-slate-200" : ""}`} key={item.title}>
                  <item.Icon aria-hidden="true" color={item.accent} size={32} strokeWidth={1.65} />
                  <div>
                    <p className="text-[clamp(0.8rem,0.78cqw,1.2rem)] font-semibold leading-[1.08] text-control-text">{item.title}</p>
                    <p className="mt-[0.28cqh] text-[clamp(0.66rem,0.68cqw,0.8rem)] font-medium leading-[1.2] text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </section>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
        initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
        transition={{ duration, delay: 0.58, ease }}
      >
        <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
          <ChevronRight aria-hidden="true" />
        </button>
        <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
          <Map aria-hidden="true" />
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
    </article>
  );
}

