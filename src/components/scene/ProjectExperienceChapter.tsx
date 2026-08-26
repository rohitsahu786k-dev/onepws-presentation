import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Filter,
  Flag,
  Headphones,
  ImageIcon,
  Layers3,
  Map,
  MapPin,
  Maximize2,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import { getCustomerPathRecommendations } from "../../content/customerPaths";
import { projectFilters, projects, type ProjectRecord } from "../../content/projects";
import type { VoiceoverMeta } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { entrance, revealTransition } from "../../motion/motionSystem";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type BrowserFilters = {
  sector: string;
  country: string;
  controlRoomType: string;
  consoles: boolean;
  designBuild: boolean;
  indianProject: boolean;
  internationalProject: boolean;
};

const defaultFilters: BrowserFilters = {
  sector: "All",
  country: "All",
  controlRoomType: "All",
  consoles: false,
  designBuild: false,
  indianProject: false,
  internationalProject: false,
};

const fallbackDetail = "Detailed project scope can be reviewed with the OnePWS team.";

const credentialMetrics = [
  { value: "450+", label: "Design-Build Interior Solutions", icon: Building2 },
  { value: "75,000+", label: "Control Desk Solutions", icon: Layers3 },
  { value: "35+", label: "Countries Served", icon: Flag },
];

const projectCredentialSlides = [
  {
    chapterId: "project-portfolio",
    number: "01",
    name: "DFCC Ahmedabad",
    shortName: "DFCC",
    location: "Ahmedabad, Gujarat, India",
    imageSrc: getAsset("project-dfcc-control-room")?.src ?? "/assets/generated/project-credentials-01-dfcc.png",
    description:
      "A mission-critical transport operations environment delivered for high-visibility infrastructure coordination.",
  },
  {
    chapterId: "project-credentials-chandigarh-iccc",
    number: "02",
    name: "Chandigarh ICCC",
    shortName: "Chandigarh",
    location: "Chandigarh, India",
    imageSrc: getAsset("project-chandigarh-control-room")?.src ?? "/assets/generated/project-credentials-02-chandigarh.png",
    description:
      "An integrated command and control centre reference supporting citywide situational awareness and coordinated response.",
  },
  {
    chapterId: "project-credentials-adani-khavda",
    number: "03",
    name: "Adani Khavda-Kutch",
    shortName: "Adani",
    location: "Khavda, Kutch, Gujarat, India",
    imageSrc: getAsset("project-adani-khavda-02")?.src ?? "/assets/generated/project-credentials-03-adani.png",
    description:
      "A renewable-energy control room reference built around scale, uptime and operator visibility.",
  },
  {
    chapterId: "project-credentials-rtgc-andhra",
    number: "04",
    name: "RTGC Andhra Pradesh",
    shortName: "RTGC",
    location: "Andhra Pradesh, India",
    imageSrc: getAsset("project-rtgc-andhra-02")?.src ?? "/assets/generated/project-credentials-04-rtgc.png",
    description:
      "A real-time governance centre environment designed for live monitoring, informed decision-making and rapid coordination.",
  },
  {
    chapterId: "project-credentials-acpo-ahmedabad",
    number: "05",
    name: "ACPO Ahmedabad",
    shortName: "ACPO",
    location: "Ahmedabad, Gujarat, India",
    imageSrc: getAsset("project-apco-ahmedabad")?.src ?? "/assets/generated/project-credentials-05-acpo.png",
    description:
      "A public-safety command environment supporting surveillance, control-room operations and coordinated response.",
  },
  {
    chapterId: "project-credentials-itms-noida",
    number: "06",
    name: "ITMS Noida",
    shortName: "ITMS",
    location: "Noida, Uttar Pradesh, India",
    imageSrc: getAsset("project-itms-noida-control-room")?.src ?? "/assets/generated/project-credentials-06-itms.png",
    description:
      "A traffic management control room reference where operators monitor city movement, events and response workflows.",
  },
  {
    chapterId: "project-credentials-shell-brunei",
    number: "07",
    name: "Shell-Brunei",
    shortName: "Shell",
    location: "Brunei",
    imageSrc: "/assets/generated/project-credentials-07-shell.png",
    description:
      "An international industrial control-room reference delivered with careful operational continuity.",
    note: {
      before: "ReAItion of the complete control room",
      emphasis: "without taking shutdown.",
    },
  },

  {
    chapterId: "project-credentials-metro-rail-occ",
    number: "08",
    name: "Metro Rail OCC",
    shortName: "Metro Rail",
    location: "Metro operations reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder transit operations centre credential for a future metro or rail control-room project.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-utility-command-centre",
    number: "09",
    name: "Utility Command Centre",
    shortName: "Utility",
    location: "Power and utility reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder utility command-centre credential for future power, grid or infrastructure project proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-industrial-operations-centre",
    number: "10",
    name: "Industrial Operations Centre",
    shortName: "Industrial",
    location: "Industrial operations reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder industrial operations credential for future process, plant or manufacturing control-room proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-data-centre-noc",
    number: "11",
    name: "Data Centre NOC",
    shortName: "Data Centre",
    location: "Network operations reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder data-centre NOC credential for future uptime, monitoring and infrastructure operations proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-emergency-response-centre",
    number: "12",
    name: "Emergency Response Centre",
    shortName: "Emergency",
    location: "Emergency response reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder emergency response credential for future command, dispatch and public-safety project proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-airport-operations-centre",
    number: "13",
    name: "Airport Operations Centre",
    shortName: "Airport",
    location: "Airport operations reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder airport operations credential for future aviation, security and operations-centre proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
  {
    chapterId: "project-credentials-manufacturing-control-centre",
    number: "14",
    name: "Manufacturing Control Centre",
    shortName: "Manufacturing",
    location: "Manufacturing operations reference",
    imageSrc: "/assets/placeholders/ambient-control-room.svg",
    description: "A placeholder manufacturing control-centre credential for future plant, production and supervision proof.",
    note: {
      before: "Placeholder reference page",
      emphasis: "image and customer details to be updated.",
    },
  },
];

const verifiedProjectCredentialCount = 7;

export function ProjectExperienceChapter({ chapter }: Props) {
  if (projectCredentialSlides.some((project) => project.chapterId === chapter.id)) {
    return <ProjectCredentialSlide chapter={chapter} />;
  }

  return <ProjectBrowserChapter chapter={chapter} />;
}

function ProjectCredentialSlide({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const project =
    projectCredentialSlides.find((credentialProject) => credentialProject.chapterId === chapter.id) ??
    projectCredentialSlides[0];
  const motionDuration = state.reducedMotion ? 0.01 : 0.66;
  const projectIndex = projectCredentialSlides.findIndex((item) => item.chapterId === project.chapterId);
  const isPlaceholderCredential = projectIndex >= verifiedProjectCredentialCount;
  const visibleProjectCredentials = isPlaceholderCredential
    ? projectCredentialSlides
    : projectCredentialSlides.slice(0, verifiedProjectCredentialCount);
  const projectCountLabel = isPlaceholderCredential ? projectCredentialSlides.length : verifiedProjectCredentialCount;

  return (
    <article className="relative h-full w-full overflow-hidden bg-[#fbfcfd] text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(239,68,68,0.08),transparent_32%),linear-gradient(135deg,rgba(248,250,252,0.98),rgba(255,255,255,0.98)_45%,rgba(241,245,249,0.9))]" />
      <div className="pointer-events-none absolute left-0 top-[8.6rem] h-[42rem] w-[34rem] opacity-[0.08] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <div className="absolute inset-x-[2.4rem] bottom-[6.5rem] top-[7.2rem] z-10 flex gap-[1.2rem] pl-[0.4rem]">
      <section className="flex w-[22rem] shrink-0 flex-col justify-between">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4"
          initial={false}
          transition={{ duration: motionDuration }}
        >
          <span className="" />
          <div>
            <h1 className="text-[clamp(2.65rem,3.1cqw,3.45rem)] font-bold uppercase leading-[0.98] tracking-normal text-slate-950 md:text-[2.5cqw]">
              Project
              <span className="block text-red-600">Credentials</span>
            </h1>
            <div className="mt-5 h-[3px] w-16 rounded-full bg-red-600" />
            <p className="mt-6 max-w-[20rem] text-[1.05rem] leading-7 text-slate-700">
              Successfully delivered mission-critical control room solutions across key projects.
            </p>
            
          </div>
          <div className=" flex-col justify-center ">
           
            <div className="mt-6 flex items-start gap-5">
              <div>
                <h2 className="max-w-[12ch] text-[clamp(3.1rem,3.15cqw,5.05rem)] font-semibold leading-[0.98] tracking-normal text-slate-950">
                  {project.name}
                </h2>
                <div className="mt-5 h-[2px] w-40 rounded-full bg-red-600" />
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3 text-[1.02rem] font-semibold leading-7 text-slate-700">
              <MapPin aria-hidden="true" className="mt-1 shrink-0 text-red-600" size={24} strokeWidth={2.1} />
              <span>{project.location}</span>
            </div>
            <p className="mt-5 max-w-[32rem] text-[1.02rem] font-medium leading-[1.65] text-slate-700">{project.description}</p>
            {project.note ? (
              <div className="mt-7 flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50/80 p-4 text-[1.05rem] font-semibold leading-6 text-slate-900">
                <CheckCircle2 aria-hidden="true" className="shrink-0 text-red-600" size={32} />
                <span>
                  {project.note.before}
                  <span className="text-red-600"> {project.note.emphasis}</span>
                </span>
              </div>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.35rem] border border-slate-200/70 bg-white/70 p-5 shadow-[0_1px_4px_rgba(15,23,42,0.05),0_14px_34px_rgba(15,23,42,0.09)] backdrop-blur-2xl"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.14 }}
        >
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full border border-red-100 bg-red-50 text-red-600">
              <Sparkles aria-hidden="true" size={30} strokeWidth={1.8} />
            </div>
            <p className="text-[0.98rem] font-semibold leading-6 text-slate-900">
              Proven delivery.
              <span className="block text-red-600">Focused project proof.</span>
            </p>
          </div>
        </motion.div>
      </section>

      <section className="grid min-w-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] ">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 overflow-hidden rounded-[1.35rem] border border-slate-200/70 bg-white/70 shadow-[0_1px_4px_rgba(15,23,42,0.05),0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.06 }}
        >
         
          
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative min-h-0 overflow-hidden rounded-[1.55rem] border border-slate-200/70 bg-white/80 shadow-[0_2px_6px_rgba(15,23,42,0.06),0_18px_40px_rgba(15,23,42,0.10),0_44px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl mb-4"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.12 }}
        >
          
          <img
            alt={`${project.name} project control room`}
            className="absolute inset-y-0 left-0 h-full w-[100%] object-cover"
            src={project.imageSrc}
          />
          <span className="absolute left-[10px] top-[10px] z-20 grid min-w-[4.35rem] place-items-center rounded-[15px] bg-red-600 p-[15px] text-[1.12rem] font-semibold leading-none text-white shadow-[0_12px_26px_rgba(220,38,38,0.24)]">
            {project.number}
          </span>
          <div className="" />
          <div className="" />
          
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-[1.2rem] border border-slate-200/70 bg-white/70 px-5 py-4 shadow-[0_1px_4px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.18 }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-950">Project {project.number} of {projectCountLabel}</p>
            <div className="mt-2 h-[2px] w-12 rounded-full bg-red-600" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {visibleProjectCredentials.map((item) => {
              const active = item.chapterId === project.chapterId;
              return (
                <div
                  className={`relative min-w-[5.6rem] overflow-hidden rounded-xl border px-3 pb-2 pt-6 transition ${
                    active
                      ? "border-red-200 bg-red-50 text-red-700 shadow-[0_12px_30px_rgba(220,38,38,0.14)]"
                      : "border-slate-200/80 bg-white/60 text-slate-500"
                  }`}
                  key={item.chapterId}
                >
                  <span className={`absolute left-0 top-0 grid h-5 min-w-8 place-items-center rounded-br-[0.32rem] px-2 text-[0.62rem] font-semibold text-white ${active ? "bg-red-600" : "bg-slate-400"}`}>
                    {item.number}
                  </span>
                  <p className="truncate text-[0.72rem] font-semibold">{item.shortName}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
      </div>

      <div className="absolute bottom-[1.6rem] left-[2.8rem] z-40 flex items-center gap-3">
        <button
          aria-label="Previous"
          className="inline-flex h-14 items-center gap-3 rounded-xl border border-white/75 bg-white/80 px-5 text-sm font-semibold text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
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
          className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/80 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
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
              : "border-white/75 bg-white/80 text-slate-800 hover:bg-white"
          }`}
          onClick={() => dispatch({ type: "TOGGLE_NARRATION" })}
          title="Narration"
          type="button"
        >
          <Headphones aria-hidden="true" size={21} />
        </button>
        <button
          aria-label="Full Screen"
          className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/80 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white"
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

function ProjectBrowserChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const preferredId = projects.find((project) => project.id === "wdfcc-ahmedabad")?.id ?? projects[0].id;
  const [selectedId, setSelectedId] = useState(preferredId);
  const [filters, setFilters] = useState<BrowserFilters>(defaultFilters);
  const [galleryProjectId, setGalleryProjectId] = useState<string | null>(null);
  const pathProjectIds = getCustomerPathRecommendations(state.customerPath).surfacedProjects;

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => matchesFilters(project, filters))
        .sort((a, b) => {
          const aPriority = projectPriority(a, pathProjectIds);
          const bPriority = projectPriority(b, pathProjectIds);
          if (aPriority !== bPriority) return aPriority - bPriority;
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return a.name.localeCompare(b.name);
        }),
    [filters, pathProjectIds],
  );

  const selectedProject =
    projects.find((project) => project.id === selectedId) ?? filteredProjects[0] ?? projects[0];
  const galleryProject = projects.find((project) => project.id === galleryProjectId) ?? null;

  function playProjectVoiceover(project: ProjectRecord) {
    const projectVoiceover: VoiceoverMeta = {
      id: `project-${project.id}-en`,
      scope: "project",
      ownerId: project.id,
      title: project.name,
      language: "en",
      plannedFile: `/assets/audio/en/projects/${project.id}.mp3`,
      durationMs: 22_000,
      recommendedDuration: "15-30 seconds",
      subtitle: project.featuredNarrative?.message ?? project.onePwsScope,
      fallbackText: [
        project.name,
        formatLocation(project),
        project.onePwsScope || fallbackDetail,
        project.featuredNarrative?.message ?? fallbackDetail,
      ].join(". "),
    };

    dispatch({ type: "UNLOCK_AUDIO" });
    voiceover.play(projectVoiceover);
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <ProjectBrowserBackdrop project={selectedProject} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_35%,rgba(255,255,255,0.5)_100%)]" />

      <section className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-20 max-w-[31rem]">
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
          className="mt-3 text-balance text-[clamp(2.2rem,3.65cqw,4.2rem)] font-semibold leading-[0.98] text-control-text"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          Project Browser.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-lg text-sm leading-6 text-control-soft"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.2)}
        >
          Explore selected control-room references, project imagery and relevant capabilities in a focused
          case-study format.
        </motion.p>
      </section>

      <ProjectFilterRail
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        resultCount={filteredProjects.length}
      />

      <ProjectSelector
        filteredProjects={filteredProjects}
        onSelect={setSelectedId}
        selectedId={selectedProject.id}
      />

      <CaseStudyStage
        onGallery={() => setGalleryProjectId(selectedProject.id)}
        onListen={() => playProjectVoiceover(selectedProject)}
        project={selectedProject}
        publicSafeMode={state.publicSafeMode}
      />

      <AnimatePresence>
        {galleryProject ? (
          <ProjectGalleryOverlay
            key={galleryProject.id}
            onClose={() => setGalleryProjectId(null)}
            project={galleryProject}
          />
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function ProjectFilterRail({
  filters,
  onChange,
  onReset,
  resultCount,
}: {
  filters: BrowserFilters;
  onChange: (filters: BrowserFilters) => void;
  onReset: () => void;
  resultCount: number;
}) {
  return (
    <aside className="absolute left-[var(--stage-safe-x)] top-[17.8rem] z-30 w-[min(42rem,43cqw)]">
      <div className="architectural-panel p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-control-warm">
            <Filter aria-hidden="true" size={15} />
            Filters
          </p>
          <span className="text-xs uppercase tracking-[0.2em] text-control-muted">{resultCount} shown</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <FilterSelect
            label="Sector"
            onChange={(sector) => onChange({ ...filters, sector })}
            options={projectFilters.industries}
            value={filters.sector}
          />
          <FilterSelect
            label="Country"
            onChange={(country) => onChange({ ...filters, country })}
            options={projectFilters.countries}
            value={filters.country}
          />
          <FilterSelect
            label="Control-room type"
            onChange={(controlRoomType) => onChange({ ...filters, controlRoomType })}
            options={projectFilters.controlRoomTypes}
            value={filters.controlRoomType}
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          <FilterToggle
            active={filters.consoles}
            label="Consoles"
            onClick={() => onChange({ ...filters, consoles: !filters.consoles })}
          />
          <FilterToggle
            active={filters.designBuild}
            label="Design-build"
            onClick={() => onChange({ ...filters, designBuild: !filters.designBuild })}
          />
          <FilterToggle
            active={filters.indianProject}
            label="Indian project"
            onClick={() =>
              onChange({
                ...filters,
                indianProject: !filters.indianProject,
                internationalProject: false,
              })
            }
          />
          <FilterToggle
            active={filters.internationalProject}
            label="International"
            onClick={() =>
              onChange({
                ...filters,
                internationalProject: !filters.internationalProject,
                indianProject: false,
              })
            }
          />
        </div>

        <button className="quiet-action mt-3 min-h-10 w-full px-4 text-sm" onClick={onReset} type="button">
          <RotateCcw aria-hidden="true" size={15} />
          Reset filters
        </button>
      </div>
    </aside>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="block border border-control-line bg-white/70 px-3 py-2">
      <span className="block text-[10px] uppercase tracking-[0.24em] text-control-muted">{label}</span>
      <select
        aria-label={label}
        className="mt-1.5 w-full bg-transparent text-sm text-control-soft outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option>All</option>
        {options.map((option) => (
          <option key={option} value={option}>{customerOptionLabel(option)}</option>
        ))}
      </select>
    </label>
  );
}

function FilterToggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`min-h-10 border px-2 text-left text-[10px] uppercase tracking-[0.14em] transition ${
        active
          ? "border-control-warm bg-control-warm/12 text-control-text"
          : "border-control-line bg-white/65 text-control-muted hover:border-control-warm"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="inline-flex items-center gap-2">
        {active ? <Check aria-hidden="true" size={14} /> : null}
        {label}
      </span>
    </button>
  );
}

function ProjectSelector({
  filteredProjects,
  onSelect,
  selectedId,
}: {
  filteredProjects: ProjectRecord[];
  onSelect: (projectId: string) => void;
  selectedId: string;
}) {
  return (
    <section className="absolute bottom-[calc(var(--stage-safe-y)+4.9rem)] left-[var(--stage-safe-x)] z-30 w-[min(42rem,43cqw)]">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-control-muted">
        <span className="inline-flex items-center gap-2">
          <Search aria-hidden="true" size={14} />
          Project references
        </span>
        <span>Other verified projects included</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {filteredProjects.slice(0, 4).map((project) => (
          <button
            className={`min-h-[3.55rem] border bg-white/75 px-3 py-2.5 text-left shadow-sm backdrop-blur transition ${
              selectedId === project.id
                ? "border-control-warm text-control-text"
                : "border-control-line text-control-soft hover:border-control-warm/70"
            }`}
            key={project.id}
            onClick={() => onSelect(project.id)}
            type="button"
          >
            <span className="block truncate text-sm font-medium">{project.name}</span>
            <span className="mt-1.5 block text-xs text-control-muted">
              {customerOptionLabel(project.industry)} / {project.location.country}
            </span>
          </button>
        ))}
        {filteredProjects.length === 0 ? (
          <div className="col-span-2 border border-control-line bg-white/70 p-5 text-sm text-control-muted">
            No projects match the selected filters.
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CaseStudyStage({
  onGallery,
  onListen,
  project,
  publicSafeMode,
}: {
  onGallery: () => void;
  onListen: () => void;
  project: ProjectRecord;
  publicSafeMode: boolean;
}) {
  const scope = detailOrDiscussion(project.onePwsScope);
  const scaleLabel =
    project.scale.valueCrores && publicSafeMode && !project.scale.publicSafe
      ? "Available in the detailed project discussion"
      : project.scale.label;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        animate={{ opacity: 1, x: 0 }}
        className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+4.9rem)] right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+6rem)] z-30 w-[min(55rem,51cqw)] overflow-hidden p-5 shadow-control"
        exit={{ opacity: 0, x: 18 }}
        initial={{ opacity: 0, x: 20 }}
        key={project.id}
        transition={{ duration: 0.28 }}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Focused case study</p>
            <h2 className="mt-2 max-w-2xl text-[clamp(1.45rem,1.8cqw,2.05rem)] font-semibold leading-tight">
              {project.name}
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="control-button" onClick={onListen} type="button" aria-label={`Listen to ${project.name}`}>
              <Headphones aria-hidden="true" size={17} />
            </button>
            <button className="control-button" onClick={onGallery} type="button" aria-label={`Open gallery for ${project.name}`}>
              <Maximize2 aria-hidden="true" size={17} />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <CaseMetric icon={<MapPin aria-hidden="true" size={15} />} label="Location" value={formatLocation(project)} />
          <CaseMetric icon={<Building2 aria-hidden="true" size={15} />} label="Sector" value={project.industry} />
          <CaseMetric icon={<Layers3 aria-hidden="true" size={15} />} label="Scope" value={project.scope} />
        </div>

        <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-4">
          <div className="relative min-h-[10.5rem] overflow-hidden border border-control-line bg-white">
            <CaseHeroPhoto project={project} />
          </div>
          <div>
            <CaseBlock title="Available OnePWS scope" value={scope} />
            <CaseBlock title="Special project note" value={project.featuredNarrative?.message ?? fallbackDetail} />
            <CaseBlock title="Project scale" value={detailOrDiscussion(scaleLabel)} note={project.scale.sourceNote} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-control-line/70 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Related capabilities</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.relatedFeatures.length > 0 ? (
                project.relatedFeatures.slice(0, 4).map((feature) => (
                  <span className="border-l border-control-line bg-white/60 px-3 py-2 text-xs text-control-soft" key={feature}>
                    {feature.replace(/-/g, " ")}
                  </span>
                ))
              ) : (
                <span className="text-sm text-control-muted">{fallbackDetail}</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Available proof</p>
            <ul className="mt-3 space-y-2 text-sm leading-5 text-control-soft">
              {project.proofPoints.slice(0, 3).map((point) => (
                <li className="border-l border-control-warm/45 pl-3" key={point}>
                  {detailOrDiscussion(point)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

function CaseMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="border-l border-control-line bg-white/60 px-3 py-2">
      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-control-muted">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm leading-5 text-control-soft">{detailOrDiscussion(value)}</p>
    </div>
  );
}

function CaseBlock({ note, title, value }: { note?: string; title: string; value: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <p className="mt-2 text-sm leading-6 text-control-soft">{detailOrDiscussion(value)}</p>
      {note ? <p className="mt-1 text-xs leading-5 text-control-muted">{note}</p> : null}
    </div>
  );
}

function PhotoSlot({
  image,
}: {
  image: ProjectRecord["gallery"][number];
}) {
  const asset = getAsset(image.assetId);
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-control-line bg-control-black/45">
      {asset?.src ? (
        <img alt={asset.alt ?? image.label} className="h-full w-full object-cover" src={asset.src} />
      ) : (
        <div className="grid h-full place-items-center p-3 text-center">
          <ImageIcon aria-hidden="true" className="text-control-warm/80" size={22} />
          <p className="mt-3 text-xs font-medium text-control-soft">{image.label}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-control-muted">{image.sourcePage}</p>
        </div>
      )}
    </div>
  );
}

function CaseHeroPhoto({ project }: { project: ProjectRecord }) {
  const firstImage = project.gallery.find((image) => image.assetId) ?? project.gallery[0];
  const asset = getAsset(firstImage?.assetId);

  if (!asset?.src) {
    return (
      <div className="grid h-full min-h-[13rem] place-items-center p-5 text-center text-control-muted">
          <ImageIcon aria-hidden="true" className="text-control-warm" size={28} />
          <p className="mt-3 text-sm">{cleanImageLabel(firstImage?.label ?? "Project image")}</p>
      </div>
    );
  }

  return (
    <>
      <img alt={asset.alt ?? firstImage.label} className="h-full min-h-[13rem] w-full object-cover" src={asset.src} />
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-control-muted backdrop-blur">
        {firstImage.sourcePage}
      </div>
    </>
  );
}

function ProjectGalleryOverlay({
  onClose,
  project,
}: {
  onClose: () => void;
  project: ProjectRecord;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = project.gallery[activeIndex] ?? project.gallery[0];
  const activeAsset = getAsset(activeImage?.assetId);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-white/95 p-[var(--stage-safe-y)] text-control-text backdrop-blur-xl"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <button
        aria-label="Close project gallery"
        className="absolute right-[var(--stage-safe-x)] top-[var(--stage-safe-y)] z-10 grid h-12 w-12 place-items-center border border-control-line bg-white text-control-muted transition hover:border-control-warm hover:text-control-text"
        onClick={onClose}
        type="button"
      >
        <X aria-hidden="true" size={18} />
      </button>
      <div className="grid h-full grid-cols-[1fr_20rem] gap-6">
        <div className="relative border border-control-line bg-control-deep">
          {activeAsset?.src ? (
            <img alt={activeAsset.alt ?? cleanImageLabel(activeImage.label)} className="h-full w-full object-contain" src={activeAsset.src} />
          ) : (
            <div className="grid h-full place-items-center p-10 text-center">
              <div>
                <ImageIcon aria-hidden="true" className="mx-auto text-control-warm" size={42} />
                <p className="mt-6 text-3xl font-semibold">{cleanImageLabel(activeImage.label)}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.28em] text-control-muted">{activeImage.sourcePage}</p>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-control-muted">
                  Project imagery can be added to this gallery from the approved OnePWS asset set.
                </p>
              </div>
            </div>
          )}
        </div>
        <aside className="border-l border-control-warm/55 pl-5">
          <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Full-screen image gallery</p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight">{project.name}</h2>
          <p className="mt-3 text-sm leading-6 text-control-muted">{formatLocation(project)}</p>
          <div className="mt-7 grid gap-3">
            {project.gallery.map((image, index) => (
              <button
                className={`border px-3 py-3 text-left transition ${
                  index === activeIndex
                    ? "border-control-warm bg-control-warm/10"
                    : "border-control-line bg-white/70 hover:border-control-warm"
                }`}
                key={`${project.id}-gallery-${image.label}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span className="block text-sm font-medium text-control-text">{cleanImageLabel(image.label)}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-control-muted">{image.sourcePage}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function ProjectBrowserBackdrop({ project }: { project: ProjectRecord }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute right-[var(--stage-safe-x)] top-[15%] h-[44%] w-[43%] overflow-hidden border border-control-line bg-control-panel">
        {project.gallery
          .filter((image) => image.assetId)
          .slice(0, 1)
          .map((image) => {
            const asset = getAsset(image.assetId);
            return asset?.src ? (
              <img alt={asset.alt ?? cleanImageLabel(image.label)} className="h-full w-full object-cover opacity-70" key={image.label} src={asset.src} />
            ) : null;
          })}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(207,31,43,0.08),transparent_30%)]" />
    </div>
  );
}

function matchesFilters(project: ProjectRecord, filters: BrowserFilters) {
  if (filters.sector !== "All" && project.industry !== filters.sector) return false;
  if (filters.country !== "All" && project.location.country !== filters.country) return false;
  if (filters.controlRoomType !== "All" && project.controlRoomType !== filters.controlRoomType) return false;
  if (filters.consoles && !hasConsoleScope(project)) return false;
  if (filters.designBuild && !hasDesignBuildScope(project)) return false;
  if (filters.indianProject && project.location.country !== "India") return false;
  if (filters.internationalProject && project.location.country === "India") return false;
  return true;
}

function hasConsoleScope(project: ProjectRecord) {
  return (
    project.scope.includes("Control") ||
    project.relatedFeatures.some((feature) =>
      ["adaptive-sit-stand-console", "rotatable-operator-desk", "intelligent-operator-chair"].includes(feature),
    )
  );
}

function hasDesignBuildScope(project: ProjectRecord) {
  return (
    project.scope === "Control Room Interiors" ||
    project.scope === "Control room / meeting room interiors" ||
    project.scope === "Design-build reference" ||
    project.scope === "Tech Interiors" ||
    project.scope === "Experience centre"
  );
}

function projectPriority(project: ProjectRecord, pathProjectIds: string[]) {
  const pathIndex = pathProjectIds.indexOf(project.id);
  if (pathIndex >= 0) return pathIndex;
  const requiredOrder = [
    "wdfcc-ahmedabad",
    "chandigarh-iccc-smart-city",
    "adani-khavda-kutch",
    "rtgc-andhra-pradesh",
    "ahmedabad-police-apco",
    "noida-itms",
    "shell-brunei",
    "onepws-experience-centre",
  ];
  const requiredIndex = requiredOrder.indexOf(project.id);
  return requiredIndex >= 0 ? requiredIndex + 100 : 999;
}

function detailOrDiscussion(value?: string) {
  if (!value || value === "Information unavailable" || value === "confirmation required") {
    return fallbackDetail;
  }
  return value
    .replace(/confirmation required/gi, "reviewed with the OnePWS team")
    .replace(/requires confirmation/gi, "is reviewed with the OnePWS team")
    .replace(/require confirmation/gi, "are reviewed with the OnePWS team")
    .replace(/outcomes are unavailable/gi, "outcomes can be reviewed with the OnePWS team")
    .replace(/detail unavailable/gi, "detail can be reviewed with the OnePWS team")
    .replace(/specific detail unavailable/gi, "specific detail can be reviewed with the OnePWS team")
    .replace(/Information unavailable/gi, fallbackDetail)
    .replace(/placeholder/gi, "reference visual");
}

function customerOptionLabel(value: string) {
  return value === "Information unavailable" || value === "confirmation required"
    ? "Details by discussion"
    : value;
}

function cleanImageLabel(value: string) {
  return value
    .replace(/from source presentation/gi, "")
    .replace(/source presentation/gi, "OnePWS visual")
    .replace(/Project photograph/gi, "Project image")
    .replace(/\s+/g, " ")
    .trim();
}

function formatLocation(project: ProjectRecord) {
  return [project.location.city, project.location.stateOrRegion, project.location.country]
    .filter(Boolean)
    .join(", ");
}


