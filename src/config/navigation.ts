import type { ChapterId, NavigationVisibility, PresentationMode } from "../data/contentTypes";
import type { CustomerPathSelection } from "../content/customerPaths";

export type NavigationJourneyType =
  | "guided"
  | "exploratory"
  | "role-based"
  | "outcome-based"
  | "presenter-curated"
  | "autoplay";

export type NavigationTheme = "cinematic" | "human" | "product" | "technology" | "proof" | "closing";

export type MapGroupId =
  | "opening"
  | "human-performance"
  | "environment"
  | "workstations"
  | "technology"
  | "engineering"
  | "proof"
  | "future";

export type NavigationJourney = {
  id: string;
  name: string;
  type: NavigationJourneyType;
  audienceOrOutcome: string;
  selection?: CustomerPathSelection;
  durationLabel: string;
  estimatedDurationMs: number;
  sequence: ChapterId[];
  optionalBranches: string[];
  memoryMoments: ChapterId[];
  openingDestination: ChapterId;
  closingDestination: ChapterId;
  defaultNavigationVisibility: NavigationVisibility;
  narrationRecommended: boolean;
  autoplayEnabled: boolean;
  presenterEnabled: boolean;
  selfGuidedEnabled: boolean;
  returnBehaviour: "next-main-destination" | "current-destination" | "opening";
};

export type NavigationMapGroup = {
  id: MapGroupId;
  title: string;
  description: string;
  chapterIds: ChapterId[];
  position: { x: number; y: number };
  theme: NavigationTheme;
};

export type OptionalBranch = {
  id: string;
  title: string;
  value: string;
  parentChapterId: ChapterId;
  destinationChapterId: ChapterId;
  returnDestination: ChapterId;
  additionalDurationMs: number;
  autoplaySkippable: boolean;
};

export const navigationConfig = {
  visibilityRules: {
    pointerRevealMs: 4_800,
    escapeRevealMs: 6_000,
    hiddenScenes: ["opening-cover"] as ChapterId[],
  },
  gestureThresholds: {
    swipeMinX: 72,
    swipeDominance: 1.3,
    transitionLockMs: 520,
  },
  keyboard: {
    next: ["ArrowRight", " ", "PageDown"],
    previous: ["ArrowLeft", "PageUp"],
    map: "g",
    notes: "n",
    skipAnimation: "s",
    restartScene: "r",
    narration: "m",
    captions: "c",
    autoplay: "p",
    home: "h",
    closing: "End",
    hideControls: "Escape",
  },
  presenterFeatures: {
    searchEnabled: true,
    temporaryRoutesEnabled: true,
    localRoutePersistence: true,
  },
  inactivity: {
    promptAfterMs: 90_000,
    resetAfterMs: 150_000,
    exhibitionResetMs: 90_000,
  },
  defaultJourneyId: "complete-story",
  unattendedAutoplayJourneyId: "autoplay-unattended",
  exhibitionJourneyId: "exhibition-loop",
};

const verifiedProjectCredentialsSequence: ChapterId[] = [
  "project-portfolio",
  "project-credentials-chandigarh-iccc",
  "project-credentials-adani-khavda",
  "project-credentials-rtgc-andhra",
  "project-credentials-acpo-ahmedabad",
  "project-credentials-itms-noida",
  "project-credentials-shell-brunei",
];

const placeholderProjectCredentialsSequence: ChapterId[] = [
  "project-credentials-metro-rail-occ",
  "project-credentials-utility-command-centre",
  "project-credentials-industrial-operations-centre",
  "project-credentials-data-centre-noc",
  "project-credentials-emergency-response-centre",
  "project-credentials-airport-operations-centre",
  "project-credentials-manufacturing-control-centre",
];

const projectCredentialsSequence: ChapterId[] = [
  ...verifiedProjectCredentialsSequence,
  ...placeholderProjectCredentialsSequence,
];

const featuredProjectCredentialsSequence: ChapterId[] = [
  "project-portfolio",
  "project-credentials-chandigarh-iccc",
  "project-credentials-adani-khavda",
  "project-credentials-shell-brunei",
];

const consoleDetailSequence: ChapterId[] = [
  "console-detail-edge",
  "console-detail-linear",
  "console-detail-vista",
  "console-detail-elevate",
  "console-detail-collab",
];

const architecturalSystemsSequence: ChapterId[] = [
  "architectural-lighting-systems",
  "architectural-hvac-systems",
  "architectural-acoustic-systems",
  "architectural-power-systems",
  "architectural-structured-cabling",
  "architectural-security-systems",
  "architectural-fire-safety-systems",
];

export const navigationJourneys: NavigationJourney[] = [
  {
    id: "complete-story",
    name: "Your OnePWS control room experience",
    type: "guided",
    audienceOrOutcome: "Presenter-led complete journey",
    durationLabel: "24 min",
    estimatedDurationMs: 24 * 60_000,
    sequence: [
      "presentation-flow-selector",
      "products-transforming-spaces",
      "opening-cover",
      "mission-critical-environments",
      "operator-challenges",
      "onepws-positioning",
      "complete-ecosystem",
      "human-centred-philosophy",
      "console-portfolio",
      "intelligent-features",
      "mechanical-strength-console",
      ...architecturalSystemsSequence,
      "room-sounds-right",
      "room-built-to-protect",
      "room-engineered-to-last",
      "incident-response",
      "software-defined-control-room",
      "design-build-approach",
      "company-at-a-glance",
      "system-driven-execution",
      "certification-overview",
      ...verifiedProjectCredentialsSequence,
      "customer-presence",
      "why-onepws",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: ["control-room-definition-layer", "risk-layer", "operator-ergonomics-method", "ergonomic-evidence", "room-modularity-layer", "technology-layer", "software-ai-layer", "software-digital-twin-layer", "delivery-methodology-layer", "proof-layer"],
    memoryMoments: ["presentation-flow-selector", "opening-cover", "complete-ecosystem", "incident-response", "project-portfolio", "next-steps-closing", "logo-finale"],
    openingDestination: "presentation-flow-selector",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "minimal",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "operations-leader",
    name: "Operations leader route",
    type: "role-based",
    audienceOrOutcome: "Operations leader",
    selection: { role: "Operations head" },
    durationLabel: "10 min",
    estimatedDurationMs: 10 * 60_000,
    sequence: [
      "mission-critical-environments",
      "operator-challenges",
      "complete-ecosystem",
      "incident-response",
      "why-onepws",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: ["technology-layer", "proof-layer"],
    memoryMoments: ["incident-response", "next-steps-closing", "logo-finale"],
    openingDestination: "mission-critical-environments",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "minimal",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "architect-consultant",
    name: "Architect and consultant route",
    type: "role-based",
    audienceOrOutcome: "Architect or consultant",
    selection: { role: "Architect" },
    durationLabel: "10 min",
    estimatedDurationMs: 10 * 60_000,
    sequence: [
      "human-centred-philosophy",
      "sightline-comfort",
      ...architecturalSystemsSequence,
      "design-build-approach",
      ...verifiedProjectCredentialsSequence,
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: ["ergonomic-evidence", "proof-layer"],
    memoryMoments: ["project-portfolio", "next-steps-closing", "logo-finale"],
    openingDestination: "human-centred-philosophy",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "technology-leader",
    name: "Technology leader route",
    type: "role-based",
    audienceOrOutcome: "Technology leader",
    selection: { role: "IT or technology head" },
    durationLabel: "9 min",
    estimatedDurationMs: 9 * 60_000,
    sequence: [
      "complete-ecosystem",
      "intelligent-features",
      "incident-response",
      ...architecturalSystemsSequence,
      "why-onepws",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: ["technology-layer", "operator-scenario"],
    memoryMoments: ["complete-ecosystem", "incident-response"],
    openingDestination: "complete-ecosystem",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "minimal",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "operator-performance",
    name: "Improve operator performance",
    type: "outcome-based",
    audienceOrOutcome: "Improve operator performance and reduce fatigue",
    durationLabel: "8 min",
    estimatedDurationMs: 8 * 60_000,
    sequence: [
      "operator-challenges",
      "human-centred-philosophy",
      "sightline-comfort",
      "intelligent-features",
      "why-onepws",
    ],
    optionalBranches: ["ergonomic-evidence", "operator-scenario"],
    memoryMoments: ["operator-challenges"],
    openingDestination: "operator-challenges",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "human-performance-executive",
    name: "Executive human-performance route",
    type: "outcome-based",
    audienceOrOutcome: "Human-centred control-room design in a short meeting",
    durationLabel: "2-4 min",
    estimatedDurationMs: 4 * 60_000,
    sequence: [
      "operator-challenges",
      "sightline-comfort",
      "human-centred-philosophy",
      "why-onepws",
    ],
    optionalBranches: ["ergonomic-evidence"],
    memoryMoments: ["human-centred-philosophy"],
    openingDestination: "operator-challenges",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "product-executive",
    name: "Executive product route",
    type: "outcome-based",
    audienceOrOutcome: "Control desks, consoles and workstation systems",
    durationLabel: "5-7 min",
    estimatedDurationMs: 7 * 60_000,
    sequence: [
      "console-portfolio",
      ...consoleDetailSequence,
      "room-sounds-right",
      "room-built-to-protect",
      "room-engineered-to-last",
      "unified-control-room",
      "sightline-comfort",
      "complete-ecosystem",
      "why-onepws",
    ],
    optionalBranches: ["product-operator-relationship", "product-room-context"],
    memoryMoments: ["console-portfolio", "complete-ecosystem"],
    openingDestination: "console-portfolio",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "architecture-executive",
    name: "Executive architectural environment route",
    type: "outcome-based",
    audienceOrOutcome: "Architectural interiors, room infrastructure and complete environment",
    durationLabel: "4-6 min",
    estimatedDurationMs: 6 * 60_000,
    sequence: [
      ...architecturalSystemsSequence,
      "complete-ecosystem",
      "console-portfolio",
      ...consoleDetailSequence,
      "room-sounds-right",
      "room-built-to-protect",
      "room-engineered-to-last",
      "unified-control-room",
      "why-onepws",
    ],
    optionalBranches: ["architecture-room-envelope", "architecture-product-context"],
    memoryMoments: ["complete-ecosystem"],
    openingDestination: "architectural-lighting-systems",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "intelligent-operations-executive",
    name: "Executive intelligent operations route",
    type: "outcome-based",
    audienceOrOutcome: "AI, OAMS, connected systems and human-in-the-loop response",
    durationLabel: "5-7 min",
    estimatedDurationMs: 7 * 60_000,
    sequence: [
      "intelligent-features",
      "incident-response",
      "complete-ecosystem",
      "why-onepws",
    ],
    optionalBranches: ["intelligent-incident-scenario", "intelligent-room-context"],
    memoryMoments: ["incident-response"],
    openingDestination: "intelligent-features",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "credibility-executive",
    name: "Executive credibility route",
    type: "outcome-based",
    audienceOrOutcome: "Capability, manufacturing, certifications, projects and support proof",
    durationLabel: "4-6 min",
    estimatedDurationMs: 6 * 60_000,
    sequence: [
      "company-at-a-glance",
      "design-build-approach",
      "manufacturing-quality",
      "certification-overview",
      ...verifiedProjectCredentialsSequence,
      "delivery-methodology",
      "why-onepws",
    ],
    optionalBranches: ["evidence-manufacturing", "evidence-certifications", "evidence-projects", "evidence-customer-presence"],
    memoryMoments: ["project-portfolio"],
    openingDestination: "company-at-a-glance",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "ceo-5",
    name: "CEO mode",
    type: "presenter-curated",
    audienceOrOutcome: "Five-minute executive vision, proof and action",
    durationLabel: "5 min",
    estimatedDurationMs: 5 * 60_000,
    sequence: [
      "opening-cover",
      "mission-critical-environments",
      "complete-ecosystem",
      ...featuredProjectCredentialsSequence,
      "why-onepws",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: [],
    memoryMoments: ["opening-cover", "complete-ecosystem", "project-portfolio", "next-steps-closing", "logo-finale"],
    openingDestination: "opening-cover",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "minimal",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "technical-deep",
    name: "Technical deep-dive mode",
    type: "presenter-curated",
    audienceOrOutcome: "Engineering, integration, evidence and technical detail",
    durationLabel: "Deep technical",
    estimatedDurationMs: 35 * 60_000,
    sequence: [
      "mission-control-definition",
      "ergonomic-methodology",
      "sightline-comfort",
      "console-portfolio",
      ...consoleDetailSequence,
      "room-sounds-right",
      "room-built-to-protect",
      "room-engineered-to-last",
      "unified-control-room",
      ...architecturalSystemsSequence,
      "intelligent-features",
      "delivery-methodology",
      "manufacturing-quality",
      "certification-overview",
      ...verifiedProjectCredentialsSequence,
      "why-onepws",
    ],
    optionalBranches: ["ergonomic-evidence", "product-room-context", "technology-layer", "evidence-certifications", "evidence-projects"],
    memoryMoments: ["complete-ecosystem", "incident-response", "project-portfolio"],
    openingDestination: "mission-control-definition",
    closingDestination: "why-onepws",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: false,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "consultant-workshop",
    name: "Consultant workshop mode",
    type: "presenter-curated",
    audienceOrOutcome: "Question-led workshop with adaptive branches",
    durationLabel: "Workshop",
    estimatedDurationMs: 25 * 60_000,
    sequence: [
      "journey-roadmap",
      "operator-challenges",
      "sightline-comfort",
      "console-portfolio",
      ...consoleDetailSequence,
      "room-sounds-right",
      "room-built-to-protect",
      "room-engineered-to-last",
      "unified-control-room",
      ...architecturalSystemsSequence,
      "intelligent-features",
      ...verifiedProjectCredentialsSequence,
      "why-onepws",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: ["ergonomic-evidence", "product-operator-relationship", "architecture-room-envelope", "intelligent-incident-scenario", "evidence-projects"],
    memoryMoments: ["operator-challenges", "console-portfolio", "project-portfolio", "next-steps-closing", "logo-finale"],
    openingDestination: "journey-roadmap",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "visible",
    narrationRecommended: false,
    autoplayEnabled: false,
    presenterEnabled: true,
    selfGuidedEnabled: true,
    returnBehaviour: "next-main-destination",
  },
  {
    id: "autoplay-unattended",
    name: "Unattended autoplay route",
    type: "autoplay",
    audienceOrOutcome: "Exhibition or showroom loop",
    durationLabel: "5 min loop",
    estimatedDurationMs: 5 * 60_000,
    sequence: [
      "opening-cover",
      "mission-critical-environments",
      "complete-ecosystem",
      "incident-response",
      "project-portfolio",
      "next-steps-closing",
      "logo-finale",
    ],
    optionalBranches: [],
    memoryMoments: ["opening-cover", "complete-ecosystem", "incident-response", "logo-finale"],
    openingDestination: "opening-cover",
    closingDestination: "logo-finale",
    defaultNavigationVisibility: "hidden-cinematic",
    narrationRecommended: true,
    autoplayEnabled: true,
    presenterEnabled: false,
    selfGuidedEnabled: false,
    returnBehaviour: "opening",
  },
];

export const timeBasedRoutes = [
  { id: "overview-5", label: "5-minute overview", durationMs: 5 * 60_000, journeyId: "autoplay-unattended" },
  { id: "human-performance-4", label: "4-minute human-performance route", durationMs: 4 * 60_000, journeyId: "human-performance-executive" },
  { id: "architecture-6", label: "6-minute architectural route", durationMs: 6 * 60_000, journeyId: "architecture-executive" },
  { id: "intelligent-7", label: "7-minute intelligent operations route", durationMs: 7 * 60_000, journeyId: "intelligent-operations-executive" },
  { id: "credibility-6", label: "6-minute credibility route", durationMs: 6 * 60_000, journeyId: "credibility-executive" },
  { id: "ceo-5", label: "5-minute CEO mode", durationMs: 5 * 60_000, journeyId: "ceo-5" },
  { id: "product-7", label: "7-minute product route", durationMs: 7 * 60_000, journeyId: "product-executive" },
  { id: "executive-10", label: "10-minute executive journey", durationMs: 10 * 60_000, journeyId: "operations-leader" },
  { id: "focused-20", label: "20-minute focused journey", durationMs: 20 * 60_000, journeyId: "operator-performance" },
  { id: "complete-24", label: "24-minute customer story", durationMs: 24 * 60_000, journeyId: "complete-story" },
];

export const navigationMapGroups: NavigationMapGroup[] = [
  { id: "opening", title: "Opening", description: "Product ecosystem, system awakening and journey entry.", chapterIds: ["presentation-flow-selector", "products-transforming-spaces", "opening-cover", "journey-roadmap"], position: { x: 10, y: 48 }, theme: "cinematic" },
  { id: "human-performance", title: "Human performance", description: "Operator pressure, fatigue, ergonomics and decision support.", chapterIds: ["mission-critical-environments", "operator-challenges", "poor-design-risk", "human-centred-philosophy", "sightline-comfort"], position: { x: 28, y: 24 }, theme: "human" },
  { id: "environment", title: "Control room environment", description: "The connected room ecosystem, architecture and spatial systems.", chapterIds: ["complete-ecosystem", ...architecturalSystemsSequence], position: { x: 50, y: 28 }, theme: "technology" },
  { id: "workstations", title: "Workstations and consoles", description: "Console portfolio, acoustics, fire safety, durability, modular room systems and intelligent feature layers.", chapterIds: ["console-portfolio", "console-detail-edge", "console-detail-linear", "console-detail-vista", "console-detail-elevate", "console-detail-collab", "room-sounds-right", "room-built-to-protect", "room-engineered-to-last", "unified-control-room", "intelligent-features", "mechanical-strength-console"], position: { x: 76, y: 28 }, theme: "product" },
  { id: "technology", title: "Intelligence expansion", description: "Personalization, proactive information, whole-room response, digital twin and AI layers.", chapterIds: ["room-recognizes-you", "console-understands-task", "information-comes-operator", "operational-state-room-responds", "room-protects-human-performance", "personal-workspace", "intelligence-beyond-desk", "digital-twin-control-room", "ai-silent-assistant", "software-defined-control-room"], position: { x: 82, y: 52 }, theme: "technology" },
  { id: "engineering", title: "Design and engineering", description: "Ergonomic study, delivery methodology and design-build execution.", chapterIds: ["ergonomic-methodology", "design-build-approach", "delivery-methodology"], position: { x: 34, y: 68 }, theme: "human" },
  { id: "proof", title: "Evidence and capability", description: "Manufacturing, certifications, projects, customers and proof.", chapterIds: ["company-at-a-glance", "system-driven-execution", "manufacturing-quality", "certification-overview", ...projectCredentialsSequence, "customer-presence"], position: { x: 62, y: 70 }, theme: "proof" },
  { id: "future", title: "Future vision", description: "Why OnePWS, the next-step path and final brand close.", chapterIds: ["why-onepws", "next-steps-closing", "logo-finale"], position: { x: 86, y: 56 }, theme: "closing" },
];

export const optionalBranches: OptionalBranch[] = [
  { id: "control-room-definition-layer", title: "Define the mission-critical room", value: "Opens the detailed criteria for visibility, reach, focus, response and continuity.", parentChapterId: "mission-critical-environments", destinationChapterId: "mission-control-definition", returnDestination: "operator-challenges", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "risk-layer", title: "Show operational risk detail", value: "Adds the poor-design risk layer when the customer wants the problem quantified before the solution.", parentChapterId: "operator-challenges", destinationChapterId: "poor-design-risk", returnDestination: "onepws-positioning", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "operator-ergonomics-method", title: "Open ISO 11064 method", value: "Shows the ergonomic study and validation method behind the human-centred design philosophy.", parentChapterId: "human-centred-philosophy", destinationChapterId: "ergonomic-methodology", returnDestination: "console-portfolio", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "room-modularity-layer", title: "Explore modular room systems", value: "Shows the unified modular room principle as a deeper architectural product layer.", parentChapterId: "room-engineered-to-last", destinationChapterId: "unified-control-room", returnDestination: "incident-response", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "software-ai-layer", title: "Open AI assistant layer", value: "Shows how AI supports context, alerts, recommendations and workflow automation.", parentChapterId: "software-defined-control-room", destinationChapterId: "ai-silent-assistant", returnDestination: "design-build-approach", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "software-digital-twin-layer", title: "Open digital twin layer", value: "Shows the live digital replica for visibility, simulation and optimization.", parentChapterId: "software-defined-control-room", destinationChapterId: "digital-twin-control-room", returnDestination: "design-build-approach", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "delivery-methodology-layer", title: "Show delivery methodology", value: "Adds the detailed handover methodology behind the integrated design-build approach.", parentChapterId: "design-build-approach", destinationChapterId: "delivery-methodology", returnDestination: "manufacturing-quality", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "placeholder-project-gallery", title: "Open placeholder project gallery", value: "Shows future sector placeholders for internal preparation only until images and customer details are confirmed.", parentChapterId: "project-credentials-shell-brunei", destinationChapterId: "project-credentials-metro-rail-occ", returnDestination: "customer-presence", additionalDurationMs: 5 * 60_000, autoplaySkippable: true },
  { id: "ergonomic-evidence", title: "View the operator impact", value: "Adds ergonomic evidence and sightline detail.", parentChapterId: "human-centred-philosophy", destinationChapterId: "sightline-comfort", returnDestination: "complete-ecosystem", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "product-operator-relationship", title: "View operator relationship", value: "Shows reach, sightline and posture relationship around the workstation.", parentChapterId: "console-portfolio", destinationChapterId: "sightline-comfort", returnDestination: "console-portfolio", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "product-room-context", title: "See product in the room", value: "Pulls back from the console to the complete control-room environment.", parentChapterId: "console-portfolio", destinationChapterId: "complete-ecosystem", returnDestination: "intelligent-features", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "architecture-room-envelope", title: "Explore the room envelope", value: "Shows wall, ceiling, floor, lighting, acoustic and material layers before returning to the architectural route.", parentChapterId: "architectural-lighting-systems", destinationChapterId: "complete-ecosystem", returnDestination: "complete-ecosystem", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "architecture-product-context", title: "Connect architecture to consoles", value: "Relates the completed room environment to workstation and console placement.", parentChapterId: "complete-ecosystem", destinationChapterId: "console-portfolio", returnDestination: "why-onepws", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "intelligent-incident-scenario", title: "Run the response scenario", value: "Moves from intelligent feature layers into the conceptual incident-response sequence.", parentChapterId: "intelligent-features", destinationChapterId: "incident-response", returnDestination: "complete-ecosystem", additionalDurationMs: 4 * 60_000, autoplaySkippable: true },
  { id: "intelligent-room-context", title: "See the connected room", value: "Pulls back from intelligent operations to the physical room systems that support response.", parentChapterId: "incident-response", destinationChapterId: "complete-ecosystem", returnDestination: "why-onepws", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "evidence-manufacturing", title: "Explore manufacturing proof", value: "Shows sourced manufacturing and quality references before returning to the proof route.", parentChapterId: "company-at-a-glance", destinationChapterId: "manufacturing-quality", returnDestination: "certification-overview", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "evidence-certifications", title: "Open certification proof", value: "Focuses certification names, scope boundaries and source status.", parentChapterId: "manufacturing-quality", destinationChapterId: "certification-overview", returnDestination: "project-portfolio", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "evidence-projects", title: "Explore project proof", value: "Opens sourced project references and case-study-safe details.", parentChapterId: "certification-overview", destinationChapterId: "project-portfolio", returnDestination: "delivery-methodology", additionalDurationMs: 4 * 60_000, autoplaySkippable: true },
  { id: "evidence-customer-presence", title: "Review customer presence", value: "Shows sector and presence proof without treating logos as endorsement.", parentChapterId: "project-portfolio", destinationChapterId: "customer-presence", returnDestination: "delivery-methodology", additionalDurationMs: 2 * 60_000, autoplaySkippable: true },
  { id: "technology-layer", title: "See how it works", value: "Shows intelligent feature and connected system layers.", parentChapterId: "complete-ecosystem", destinationChapterId: "intelligent-features", returnDestination: "incident-response", additionalDurationMs: 3 * 60_000, autoplaySkippable: true },
  { id: "operator-scenario", title: "Enter an operator scenario", value: "Opens the conceptual incident response sequence.", parentChapterId: "intelligent-features", destinationChapterId: "incident-response", returnDestination: "ergonomic-methodology", additionalDurationMs: 4 * 60_000, autoplaySkippable: false },
  { id: "proof-layer", title: "Review capability proof", value: "Shows project credentials and delivery credibility.", parentChapterId: "why-onepws", destinationChapterId: "project-portfolio", returnDestination: "why-onepws", additionalDurationMs: 4 * 60_000, autoplaySkippable: true },
];

export const sectionBoundaries: ChapterId[] = [
  "journey-roadmap",
  "human-centred-philosophy",
  "incident-response",
  "project-portfolio",
  "why-onepws",
  "next-steps-closing",
  "logo-finale",
];

export function navigationModeForPresentationMode(mode: PresentationMode) {
  if (mode === "presenter") {
    return "presenter-active";
  }
  if (mode === "autoPlay") {
    return "autoplay-active";
  }
  return "exploring";
}
