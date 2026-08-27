import { Captions, ChevronLeft, ChevronRight, Expand, Map, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { buildNavigationModel } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";

export function MobileController() {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const model = buildNavigationModel(state);

  function unlockAudio() {
    dispatch({ type: "UNLOCK_AUDIO" });
  }

  return (
    <nav aria-label="Mobile presentation controls" className="pws-mobile-controller">
      <button
        aria-label={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous scene"}
        disabled={!model.previousDestination}
        onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
        type="button"
      >
        <ChevronLeft aria-hidden="true" size={22} />
      </button>
      <button
        aria-label="Open experience map"
        onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
        type="button"
      >
        <Map aria-hidden="true" size={21} />
      </button>
      <button
        aria-label={state.isPlaying ? "Pause route" : "Play route"}
        className={state.isPlaying ? "is-active" : ""}
        onClick={() => {
          unlockAudio();
          dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying });
        }}
        type="button"
      >
        {state.isPlaying ? <Pause aria-hidden="true" size={22} /> : <Play aria-hidden="true" size={22} />}
      </button>
      <button
        aria-label={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next scene"}
        disabled={!model.nextDestination}
        onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
        type="button"
      >
        <ChevronRight aria-hidden="true" size={22} />
      </button>
      <button
        aria-label={state.narrationEnabled ? "Narration enabled" : "Narration disabled"}
        className={state.narrationEnabled ? "is-active" : ""}
        onClick={() => {
          unlockAudio();
          dispatch({ type: "TOGGLE_NARRATION" });
        }}
        type="button"
      >
        {state.narrationEnabled ? <Volume2 aria-hidden="true" size={21} /> : <VolumeX aria-hidden="true" size={21} />}
      </button>
      <button
        aria-label={state.captionsEnabled ? "Captions enabled" : "Captions disabled"}
        className={state.captionsEnabled ? "is-active" : ""}
        onClick={() => dispatch({ type: "TOGGLE_CAPTIONS" })}
        type="button"
      >
        <Captions aria-hidden="true" size={21} />
      </button>
      <button
        aria-label="Toggle fullscreen"
        onClick={() => {
          unlockAudio();
          void toggleFullscreen();
        }}
        type="button"
      >
        <Expand aria-hidden="true" size={21} />
      </button>
    </nav>
  );
}
