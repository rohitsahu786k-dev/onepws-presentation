import { experienceRedesignFlags } from "../config/experience-redesign";
import type { Chapter } from "../data/contentTypes";
import { ChapterScene } from "../components/scene/ChapterScene";
import { getSceneComponent } from "./sceneRegistry";
import {
  ArchitecturalSystemsReferenceScene,
  architecturalSystemChapterIds,
} from "../scenes/room-experience/ArchitecturalSystemsReferenceScene";

type Props = {
  chapter: Chapter;
  presenterPreview?: boolean;
};

export function SceneRenderer({ chapter, presenterPreview = false }: Props) {
  if (
    chapter.id === "architectural-systems" ||
    architecturalSystemChapterIds.includes(chapter.id as (typeof architecturalSystemChapterIds)[number])
  ) {
    return <ArchitecturalSystemsReferenceScene chapter={chapter} />;
  }

  if (
    chapter.id === "presentation-flow-selector" ||
    chapter.id === "opening-cover" ||
    chapter.id === "complete-ecosystem" ||
    chapter.id === "products-transforming-spaces" ||
    chapter.id === "logo-finale" ||
    chapter.id === "company-at-a-glance" ||
    chapter.id === "system-driven-execution" ||
    chapter.id === "mission-control-definition" ||
    chapter.id === "operator-challenges" ||
    chapter.id === "poor-design-risk" ||
    chapter.id === "human-centred-philosophy" ||
    chapter.id === "room-sounds-right" ||
    chapter.id === "room-built-to-protect" ||
    chapter.id === "room-engineered-to-last" ||
    chapter.id === "unified-control-room" ||
    chapter.id === "why-onepws" ||
    chapter.id === "next-steps-closing"
  ) {
    return <ChapterScene chapter={chapter} />;
  }

  const shouldUseLegacy =
    !experienceRedesignFlags.enableNewSceneRenderer ||
    (experienceRedesignFlags.enableLegacyFallback && chapter.redesignStatus !== "redesigned");

  if (shouldUseLegacy) {
    return <ChapterScene chapter={chapter} />;
  }

  const SceneComponent = getSceneComponent(chapter.sceneType ?? "chapter-title");
  return <SceneComponent chapter={chapter} presenterPreview={presenterPreview} />;
}
