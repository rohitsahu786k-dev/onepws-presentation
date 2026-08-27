import {
  Captions,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Compass,
  CornerUpLeft,
  Expand,
  Map,
  Pause,
  Play,
  Radio,
  Route,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { buildNavigationModel } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";
import { ModeToggle } from "./ModeToggle";

export function MainNavigation() {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [mobileControlsVisible, setMobileControlsVisible] = useState(false);
  const model = useMemo(() => buildNavigationModel(state), [state]);
  const baseVisibility = model.currentDestination ? model.currentDestination.chapterId : state.chapterId;
  const navigationState =
    navigatorOpen || mobileControlsVisible || state.navigationControlsRevealed || state.mode === "presenter" || state.activeOverlay
      ? "visible"
      : model.currentDestination.chapterId === "opening-cover"
        ? "hidden-cinematic"
        : model.currentDestination.memoryMoment
          ? "minimal"
          : "visible";
  const controlsVisible = navigatorOpen || mobileControlsVisible || state.navigationControlsRevealed || state.mode === "presenter" || Boolean(state.activeOverlay);
  const panelVisible = navigatorOpen || mobileControlsVisible;
  const triggerVisible = !mobileControlsVisible && (model.currentDestination.chapterId !== "opening-cover" || state.navigationControlsRevealed);
  const branchOverlaySuppressedDestinations = new Set(["complete-ecosystem", "console-portfolio", "console-detail-edge", "console-detail-linear", "console-detail-vista", "console-detail-elevate", "console-detail-collab", "room-sounds-right", "room-built-to-protect", "room-engineered-to-last", "unified-control-room", "intelligent-features", "mechanical-strength-console", "incident-response", "ergonomic-methodology", "sightline-comfort", "design-build-approach", "architectural-systems", "manufacturing-quality", "certification-overview", "project-portfolio", "project-credentials-chandigarh-iccc", "project-credentials-adani-khavda", "project-credentials-rtgc-andhra", "project-credentials-acpo-ahmedabad", "project-credentials-itms-noida", "project-credentials-shell-brunei", "project-credentials-metro-rail-occ", "project-credentials-utility-command-centre", "project-credentials-industrial-operations-centre", "project-credentials-data-centre-noc", "project-credentials-emergency-response-centre", "project-credentials-airport-operations-centre", "project-credentials-manufacturing-control-centre", "customer-presence", "why-onepws", "next-steps-closing", "logo-finale", "room-recognizes-you", "console-understands-task", "information-comes-operator", "operational-state-room-responds", "room-protects-human-performance", "personal-workspace", "intelligence-beyond-desk", "digital-twin-control-room", "ai-silent-assistant", "software-defined-control-room"]);
  const showOptionalBranches = controlsVisible && !branchOverlaySuppressedDestinations.has(model.currentDestination.chapterId);

  useEffect(() => {
    if (state.activeOverlay) {
      setNavigatorOpen(false);
    }
  }, [state.activeOverlay]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse), (max-width: 920px)");
    const syncMobileControls = () => setMobileControlsVisible(query.matches);

    syncMobileControls();
    query.addEventListener("change", syncMobileControls);
    return () => query.removeEventListener("change", syncMobileControls);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && navigatorOpen) {
        setNavigatorOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigatorOpen]);

  function openChapterMap() {
    setNavigatorOpen(false);
    dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } });
  }

  function togglePlayback() {
    dispatch({ type: "UNLOCK_AUDIO" });
    dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying });
  }

  function toggleNarration() {
    dispatch({ type: "UNLOCK_AUDIO" });
    dispatch({ type: "TOGGLE_NARRATION" });
  }

  return (
    <nav
      aria-label="Spatial presentation navigation"
      className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 pws-nav-${navigationState}`}
      data-current-destination={baseVisibility}
    >
      {controlsVisible ? (
        <>
          <button
            aria-label={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous destination"}
            className="pointer-events-auto pws-edge-nav pws-edge-nav-left"
            disabled={!model.previousDestination}
            onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
            type="button"
          >
            <ChevronsLeft aria-hidden="true" size={18} />
            <span>{model.previousDestination?.shortTitle ?? "Start"}</span>
          </button>

          <button
            aria-label={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next destination"}
            className="pointer-events-auto pws-edge-nav pws-edge-nav-right"
            disabled={!model.nextDestination}
            onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
            type="button"
          >
            <span>{model.nextDestination?.shortTitle ?? "Complete"}</span>
            <ChevronsRight aria-hidden="true" size={18} />
          </button>
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
        <AnimatePresence>
          {panelVisible ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-auto mb-3 w-full px-[var(--stage-safe-x)]"
              exit={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
              initial={{ opacity: 0, y: state.reducedMotion ? 0 : 24 }}
              transition={{
                duration: state.reducedMotion ? 0.01 : 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="pws-navigator-panel mx-auto grid w-full max-w-[min(72rem,calc(100cqw-(var(--stage-safe-x)*2)))] grid-cols-[minmax(16rem,0.95fr)_auto_minmax(16rem,0.9fr)] items-center gap-4 px-4 py-3 [@container_stage_(max-width:1023px)]:grid-cols-1">
                <div className="min-w-0">
                  <JourneyTrace
                    model={model}
                    onSelect={(chapterId) => {
                      setNavigatorOpen(false);
                      dispatch({ type: "GO_TO_CHAPTER", chapterId });
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {state.branchStack.length > 0 ? (
                    <button className="quiet-action min-h-10 px-3 py-2 text-xs" onClick={() => dispatch({ type: "RETURN_TO_JOURNEY" })} type="button">
                      <CornerUpLeft aria-hidden="true" size={15} />
                      Return
                    </button>
                  ) : null}
                  <button
                    aria-label="Open experience map"
                    className="control-button"
                    onClick={openChapterMap}
                    title="Experience map"
                    type="button"
                  >
                    <Map aria-hidden="true" size={17} />
                  </button>
                  <button
                    aria-label={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous scene"}
                    className="control-button"
                    disabled={!model.previousDestination}
                    onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
                    title={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous scene"}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </button>
                  <button
                    aria-label={state.isPlaying ? "Pause route" : "Play route"}
                    className={`control-button ${state.mode === "autoPlay" && state.isPlaying ? "border-control-warm text-control-warm" : ""}`}
                    onClick={togglePlayback}
                    title={state.isPlaying ? "Pause route" : "Play route"}
                    type="button"
                  >
                    {state.isPlaying ? <Pause aria-hidden="true" size={17} /> : <Play aria-hidden="true" size={17} />}
                  </button>
                  <button
                    aria-label={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next scene"}
                    className="control-button"
                    disabled={!model.nextDestination}
                    onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
                    title={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next scene"}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                  <button
                    aria-label={state.narrationEnabled ? "Narration enabled" : "Narration disabled"}
                    className="control-button"
                    onClick={toggleNarration}
                    title={state.narrationEnabled ? "Disable narration" : "Enable narration"}
                    type="button"
                  >
                    {state.narrationEnabled ? <Volume2 aria-hidden="true" size={17} /> : <VolumeX aria-hidden="true" size={17} />}
                  </button>
                  <button
                    aria-label={state.captionsEnabled ? "Captions enabled" : "Captions disabled"}
                    className={`control-button ${state.captionsEnabled ? "border-control-warm text-control-warm" : ""}`}
                    onClick={() => dispatch({ type: "TOGGLE_CAPTIONS" })}
                    title={state.captionsEnabled ? "Hide captions" : "Show captions"}
                    type="button"
                  >
                    <Captions aria-hidden="true" size={17} />
                  </button>
                  <button
                    aria-label="Toggle fullscreen"
                    className="control-button"
                    onClick={() => {
                      dispatch({ type: "UNLOCK_AUDIO" });
                      void toggleFullscreen();
                    }}
                    title="Fullscreen"
                    type="button"
                  >
                    <Expand aria-hidden="true" size={17} />
                  </button>
                  <ModeToggle />
                </div>

                <div className="min-w-0 justify-self-stretch [@container_stage_(max-width:1023px)]:hidden">
                  {model.nextDestination ? (
                    <div className="pws-next-scene-card">
                      <div className="min-w-0">
                        <p className="uppercase tracking-[0.18em] text-control-warm">Next Scene</p>
                        <p className="mt-1 truncate text-sm font-semibold text-control-text">{model.nextDestination.shortTitle}</p>
                        <p className="mt-1 text-[11px] text-control-muted">{Math.round(model.nextDestination.duration / 60_000)} min · {model.nextDestination.navigationType}</p>
                      </div>
                      <ChevronRight aria-hidden="true" className="shrink-0 text-control-warm" size={18} />
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs text-control-muted">
                      <Radio aria-hidden="true" size={14} />
                      Route complete
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {triggerVisible ? (
          <button
            aria-expanded={navigatorOpen}
            aria-label={navigatorOpen ? "Hide navigator" : "Show navigator"}
            className={`pointer-events-auto pws-navigator-trigger ${navigatorOpen ? "pws-navigator-trigger-open" : ""}`}
            onClick={() => setNavigatorOpen((open) => !open)}
            type="button"
          >
            {navigatorOpen ? <ChevronDown aria-hidden="true" size={18} /> : <ChevronUp aria-hidden="true" size={18} />}
            <span className="sr-only">{navigatorOpen ? "Hide navigator" : "Show navigator"}</span>
          </button>
        ) : null}
      </div>

      {showOptionalBranches && model.optionalBranches.length > 0 && navigationState !== "hidden-cinematic" ? (
        <div className="pointer-events-auto absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+5.4rem)] z-30 hidden max-w-xs gap-2 lg:grid">
          {model.optionalBranches.slice(0, 2).map((branch) => (
            <button
              className="pws-branch-chip"
              key={branch.id}
              onClick={() => dispatch({ type: "OPEN_OPTIONAL_BRANCH", branchId: branch.id })}
              type="button"
            >
              <Compass aria-hidden="true" size={15} />
              <span>
                <span className="block font-semibold">{branch.title}</span>
                <span className="block text-[11px] opacity-70">Adds {Math.round(branch.additionalDurationMs / 60_000)} min</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </nav>
  );
}

function JourneyTrace({
  model,
  onSelect,
}: {
  model: ReturnType<typeof buildNavigationModel>;
  onSelect: (chapterId: string) => void;
}) {
  const currentIndex = model.destinations.findIndex((destination) => destination.chapterId === model.currentDestination.chapterId);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : model.routePosition;
  const windowStart = Math.max(0, Math.min(model.destinations.length - 7, safeCurrentIndex - 3));
  const visibleDestinations = model.destinations.slice(windowStart, windowStart + 7);

  return (
    <div aria-label={`Journey progress ${Math.round(model.progressPercent)} percent`} className="pws-journey-trace">
      <div className="pws-journey-meta">
        <Route aria-hidden="true" size={14} />
        <span className="truncate">{model.journey.name}</span>
      </div>
      <div className="pws-journey-jump">
        <select
          aria-label="Jump to slide"
          onChange={(event) => onSelect(event.target.value)}
          value={model.currentDestination.chapterId}
        >
          {model.destinations.map((destination, index) => (
            <option key={destination.id} value={destination.chapterId}>
              {String(index + 1).padStart(2, "0")} - {destination.title}
            </option>
          ))}
        </select>
        <strong>{model.routePosition + 1}/{model.route.length}</strong>
      </div>
      <div className="pws-journey-meter">
        <span className="pws-journey-meter-fill" style={{ width: `${model.progressPercent}%` }} />
      </div>
      <div className="pws-journey-dots" aria-label="Nearby scenes">
        {windowStart > 0 ? <span className="pws-journey-ellipsis" aria-hidden="true" /> : null}
        {visibleDestinations.map((destination, index) => {
          const absoluteIndex = windowStart + index;
          const isCurrent = destination.chapterId === model.currentDestination.chapterId;
          return (
            <button
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Go to ${absoluteIndex + 1}. ${destination.shortTitle}. ${destination.completionState}`}
              className={`pws-journey-dot ${
                isCurrent
                  ? "pws-journey-current"
                  : destination.completed
                    ? "pws-journey-complete"
                    : destination.memoryMoment
                      ? "pws-journey-memory"
                      : ""
              }`}
              key={destination.id}
              onClick={() => onSelect(destination.chapterId)}
              title={`${absoluteIndex + 1}. ${destination.title}`}
              type="button"
            />
          );
        })}
        {windowStart + visibleDestinations.length < model.destinations.length ? <span className="pws-journey-ellipsis" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
