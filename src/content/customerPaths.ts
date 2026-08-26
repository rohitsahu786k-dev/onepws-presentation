import { enabledChapters } from "./chapters";
import type { FeatureStoryId } from "./featureStories";
import type { ChapterId } from "../data/contentTypes";

export type CustomerIndustry =
  | "Oil and gas"
  | "Power and utilities"
  | "Defence and aerospace"
  | "Smart cities"
  | "Transportation"
  | "Manufacturing"
  | "Data centres"
  | "Emergency response"
  | "Government command centres"
  | "Mining and metals"
  | "Telecom and network operations"
  | "Airports and aviation"
  | "Healthcare command centres"
  | "Banking and financial services"
  | "Water and wastewater";

export type CustomerRole =
  | "Operations head"
  | "Plant head"
  | "Architect"
  | "Consultant"
  | "IT or technology head"
  | "Procurement"
  | "Senior management"
  | "MD/CEO"
  | "Control room operator"
  | "Safety head"
  | "Security head"
  | "Facilities head"
  | "Project manager"
  | "System integrator";

export type CustomerPathSelection = {
  industry?: CustomerIndustry;
  role?: CustomerRole;
};

export type CustomerPathMapping = {
  id: CustomerIndustry | CustomerRole;
  type: "industry" | "role";
  recommendedChapters: ChapterId[];
  recommendedProducts: FeatureStoryId[];
  surfacedProjects: string[];
  presenterTalkingPoints: Partial<Record<ChapterId, string>>;
  neutralRecommendation: string;
};

export const industries: CustomerIndustry[] = [
  "Oil and gas",
  "Power and utilities",
  "Defence and aerospace",
  "Smart cities",
  "Transportation",
  "Manufacturing",
  "Data centres",
  "Emergency response",
  "Government command centres",
  "Mining and metals",
  "Telecom and network operations",
  "Airports and aviation",
  "Healthcare command centres",
  "Banking and financial services",
  "Water and wastewater",
];

export const roles: CustomerRole[] = [
  "Operations head",
  "Plant head",
  "Architect",
  "Consultant",
  "IT or technology head",
  "Procurement",
  "Senior management",
  "MD/CEO",
  "Control room operator",
  "Safety head",
  "Security head",
  "Facilities head",
  "Project manager",
  "System integrator",
];

export const customerPathMappings: CustomerPathMapping[] = [
  {
    id: "Oil and gas",
    type: "industry",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "adaptive-sit-stand-console",
      "scada-triggered-video-wall",
      "intelligent-acoustic-environment",
      "supervisor-oversight-system",
    ],
    surfacedProjects: ["dangote-refinery-nigeria", "reliance-dmd-nmd-gujarat"],
    presenterTalkingPoints: {
      "incident-response":
        "Frame the simulation as a conceptual exception-response journey; process-control integrations are scoped project by project.",
      "proven-environments":
        "Use the listed oil-and-gas references only as sourced project proof. Do not add operational outcomes unless confirmed.",
    },
    neutralRecommendation:
      "Oil-and-gas references exist in the source. Detailed scope can be reviewed with the OnePWS team.",
  },
  {
    id: "Power and utilities",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "situational-awareness-lighting",
      "supervisor-oversight-system",
      "environment-intelligence",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment":
        "Keep the discussion around awareness, supervision and room integration. Utility-specific references can be reviewed separately.",
    },
    neutralRecommendation:
      "Use the system architecture as the lead story and review relevant utility references separately.",
  },
  {
    id: "Defence and aerospace",
    type: "industry",
    recommendedChapters: ["intelligent-layers", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "adaptive-sit-stand-console",
      "scada-triggered-video-wall",
      "supervisor-oversight-system",
      "intelligent-acoustic-environment",
    ],
    surfacedProjects: ["isro-iet", "isro-icet", "drdo-balasore"],
    presenterTalkingPoints: {
      "intelligent-layers":
        "Lead with sourced DRDO and ISRO proof, while keeping sensitive mission detail out of the customer-facing story.",
      "proven-environments":
        "Surface ISRO and DRDO references from the project table; avoid stating undisclosed mission details.",
    },
    neutralRecommendation:
      "Defence and aerospace project names and values are sourced, but operational detail is limited.",
  },
  {
    id: "Smart cities",
    type: "industry",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "supervisor-oversight-system",
      "situational-awareness-lighting",
      "ai-incident-copilot",
    ],
    surfacedProjects: ["chandigarh-iccc-smart-city", "noida-itms"],
    presenterTalkingPoints: {
      "proven-environments":
        "Use Chandigarh ICCC Smart City and Noida ITMS as sourced visual references; measured civic outcomes are not provided in the PDF.",
    },
    neutralRecommendation:
      "Smart-city visual references are available. Detailed scope can be reviewed with the OnePWS team.",
  },
  {
    id: "Transportation",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "adaptive-sit-stand-console",
      "supervisor-oversight-system",
      "situational-awareness-lighting",
    ],
    surfacedProjects: ["wdfcc-ahmedabad", "noida-itms"],
    presenterTalkingPoints: {
      "proven-environments":
        "Prioritise WDFCC Ahmedabad and Noida ITMS. Discuss integration and operator-count detail during project scoping.",
    },
    neutralRecommendation:
      "Transportation references are available from the source, with deeper systems detail reviewed during project scoping.",
  },
  {
    id: "Manufacturing",
    type: "industry",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response", "intelligent-layers"],
    recommendedProducts: [
      "adaptive-sit-stand-console",
      "environment-intelligence",
      "personal-environment-bubble",
      "intelligent-acoustic-environment",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "operator-pressure":
        "Discuss conventional-room pressure and maintainability in general terms; manufacturing-specific references can be reviewed separately.",
    },
    neutralRecommendation:
      "Use general control-room challenges and review manufacturing-specific references separately.",
  },
  {
    id: "Data centres",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "intelligent-layers"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "environment-intelligence",
      "situational-awareness-lighting",
      "supervisor-oversight-system",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment":
        "Keep this as a neutral operations-centre pathway. Data-centre references can be reviewed separately.",
    },
    neutralRecommendation:
      "Present transferable control-room principles and review data-centre-specific references separately.",
  },
  {
    id: "Emergency response",
    type: "industry",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "ai-incident-copilot",
      "supervisor-oversight-system",
      "situational-awareness-lighting",
      "scada-triggered-video-wall",
    ],
    surfacedProjects: ["ahmedabad-police-apco", "rtgc-andhra-pradesh"],
    presenterTalkingPoints: {
      "incident-response":
        "Use the incident simulation as conceptual room behaviour. Do not imply deployed AI, SOP or emergency workflow integrations.",
    },
    neutralRecommendation:
      "Public-safety and governance references are available, with deeper outcomes discussed during project scoping.",
  },
  {
    id: "Government command centres",
    type: "industry",
    recommendedChapters: ["intelligent-layers", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "supervisor-oversight-system",
      "scada-triggered-video-wall",
      "situational-awareness-lighting",
      "intelligent-acoustic-environment",
    ],
    surfacedProjects: ["rtgc-andhra-pradesh", "chandigarh-iccc-smart-city", "ahmedabad-police-apco"],
    presenterTalkingPoints: {
      "intelligent-layers":
        "Open the credentials layer if the audience needs government, DRDO or ISRO proof before product exploration.",
    },
    neutralRecommendation:
      "Government references are visible in the source, with exact scope reviewed during project scoping.",
  },
  {
    id: "Mining and metals",
    type: "industry",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "adaptive-sit-stand-console",
      "environment-intelligence",
      "supervisor-oversight-system",
      "intelligent-acoustic-environment",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "operator-pressure":
        "Frame the room around shift resilience, environmental comfort and reliable escalation for asset-heavy operations.",
    },
    neutralRecommendation:
      "Use transferable heavy-industry control-room principles and review mining-specific references separately.",
  },
  {
    id: "Telecom and network operations",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "intelligent-layers"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "onehub-ai-desk-hub",
      "ai-incident-copilot",
      "supervisor-oversight-system",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment":
        "Lead with network visibility, shared dashboards and integration boundaries that can be confirmed during solution design.",
    },
    neutralRecommendation:
      "Present the room as a network operations environment with integrations confirmed during scoping.",
  },
  {
    id: "Airports and aviation",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "supervisor-oversight-system",
      "situational-awareness-lighting",
      "environment-intelligence",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "incident-response":
        "Discuss coordinated awareness, exception handling and multi-team visibility without implying airport-specific integrations.",
    },
    neutralRecommendation:
      "Use the transportation operations story and confirm aviation-specific workflow integrations separately.",
  },
  {
    id: "Healthcare command centres",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "intelligent-layers"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "environment-intelligence",
      "supervisor-oversight-system",
      "voice-enabled-interaction",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "continuous-awareness":
        "Keep the discussion around operational coordination and room behaviour; clinical system detail requires confirmation.",
    },
    neutralRecommendation:
      "Present a healthcare operations-centre pathway and confirm clinical or facility-system integrations during scoping.",
  },
  {
    id: "Banking and financial services",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "intelligent-layers"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "onehub-ai-desk-hub",
      "supervisor-oversight-system",
      "intelligent-acoustic-environment",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "intelligent-layers":
        "Emphasise secure decision support, operational visibility and confirmation-required integration detail.",
    },
    neutralRecommendation:
      "Use the executive operations story and review financial-services-specific compliance needs separately.",
  },
  {
    id: "Water and wastewater",
    type: "industry",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: [
      "scada-triggered-video-wall",
      "environment-intelligence",
      "situational-awareness-lighting",
      "supervisor-oversight-system",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment":
        "Frame the pathway around utility monitoring, escalation and room integration; site systems are confirmed project by project.",
    },
    neutralRecommendation:
      "Use the utility operations route and confirm water-system integration detail during project scoping.",
  },
  {
    id: "Operations head",
    type: "role",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response"],
    recommendedProducts: ["scada-triggered-video-wall", "supervisor-oversight-system", "ai-incident-copilot"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "operator-pressure": "Prioritise awareness, response time, escalation clarity and operator load.",
    },
    neutralRecommendation: "Focus on operational risk, visibility and coordination.",
  },
  {
    id: "Plant head",
    type: "role",
    recommendedChapters: ["operator-pressure", "connected-environment", "incident-response"],
    recommendedProducts: ["adaptive-sit-stand-console", "environment-intelligence", "supervisor-oversight-system"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment": "Frame the room as an operating environment that must support uptime, maintainability and people.",
    },
    neutralRecommendation: "Focus on reliability, maintainability and operator performance.",
  },
  {
    id: "Architect",
    type: "role",
    recommendedChapters: ["traditional-limits", "human-centred-room", "connected-environment", "intelligent-layers"],
    recommendedProducts: [
      "adaptive-sit-stand-console",
      "circadian-lighting",
      "intelligent-acoustic-environment",
      "personal-environment-bubble",
    ],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "human-centred-room": "Emphasise sightlines, circulation, lighting, acoustic planning and service zones.",
    },
    neutralRecommendation: "Focus on spatial planning, ergonomic geometry and architectural integration.",
  },
  {
    id: "Consultant",
    type: "role",
    recommendedChapters: ["traditional-limits", "connected-environment", "intelligent-layers", "proven-environments"],
    recommendedProducts: ["scada-triggered-video-wall", "adaptive-sit-stand-console", "environment-intelligence"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "proven-environments": "Use source-backed references and keep missing technical details clearly marked.",
    },
    neutralRecommendation: "Focus on methodology, integration boundaries and proof validation.",
  },
  {
    id: "IT or technology head",
    type: "role",
    recommendedChapters: ["connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: ["onehub-ai-desk-hub", "scada-triggered-video-wall", "ai-incident-copilot", "voice-enabled-interaction"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "incident-response": "State clearly that integration behaviour is conceptual until approved systems are confirmed.",
    },
    neutralRecommendation: "Focus on integration readiness, data governance and confirmation-required software layers.",
  },
  {
    id: "Procurement",
    type: "role",
    recommendedChapters: ["intelligent-layers", "proven-environments", "configure-direction"],
    recommendedProducts: ["adaptive-sit-stand-console", "intelligent-operator-chair", "intelligent-acoustic-environment"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "intelligent-layers": "Open credentials and sourced project proof before discussing specifications or commercial detail.",
    },
    neutralRecommendation: "Focus on sourced proof, scope clarity and confirmation-required specifications.",
  },
  {
    id: "Senior management",
    type: "role",
    recommendedChapters: ["world-never-stops", "intelligent-layers", "proven-environments", "command-advantage"],
    recommendedProducts: ["supervisor-oversight-system", "scada-triggered-video-wall", "environment-intelligence"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "command-advantage": "Keep the close focused on transformation, confidence and the next discovery step.",
    },
    neutralRecommendation: "Focus on strategic confidence, delivery credibility and next action.",
  },
  {
    id: "MD/CEO",
    type: "role",
    recommendedChapters: ["world-never-stops", "intelligent-layers", "proven-environments", "command-advantage"],
    recommendedProducts: ["supervisor-oversight-system", "scada-triggered-video-wall", "environment-intelligence"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "command-advantage": "Keep the close focused on board-level confidence, transformation value and the next decision step.",
    },
    neutralRecommendation: "Focus on executive confidence, strategic value and next action.",
  },
  {
    id: "Control room operator",
    type: "role",
    recommendedChapters: ["operator-pressure", "human-centred-room", "connected-environment", "incident-response"],
    recommendedProducts: ["adaptive-sit-stand-console", "intelligent-operator-chair", "personal-environment-bubble"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "operator-pressure": "Prioritise daily usability, comfort, alert clarity and reduced cognitive load.",
    },
    neutralRecommendation: "Focus on operator comfort, clarity and shift performance.",
  },
  {
    id: "Safety head",
    type: "role",
    recommendedChapters: ["operator-pressure", "incident-response", "connected-environment", "proven-environments"],
    recommendedProducts: ["ai-incident-copilot", "situational-awareness-lighting", "supervisor-oversight-system"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "incident-response": "Position the room as a clearer response environment; validate SOP and alert integrations during scoping.",
    },
    neutralRecommendation: "Focus on incident readiness, visibility and escalation clarity.",
  },
  {
    id: "Security head",
    type: "role",
    recommendedChapters: ["continuous-awareness", "connected-environment", "incident-response", "proven-environments"],
    recommendedProducts: ["scada-triggered-video-wall", "supervisor-oversight-system", "ai-incident-copilot"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "continuous-awareness": "Lead with shared visibility, supervisory awareness and controlled access to critical information.",
    },
    neutralRecommendation: "Focus on situational awareness, response coordination and operational control.",
  },
  {
    id: "Facilities head",
    type: "role",
    recommendedChapters: ["human-centred-room", "connected-environment", "intelligent-layers", "configure-direction"],
    recommendedProducts: ["environment-intelligence", "intelligent-acoustic-environment", "circadian-lighting"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "human-centred-room": "Emphasise lighting, acoustics, comfort, serviceability and maintainable room infrastructure.",
    },
    neutralRecommendation: "Focus on maintainability, comfort systems and long-life room infrastructure.",
  },
  {
    id: "Project manager",
    type: "role",
    recommendedChapters: ["traditional-limits", "connected-environment", "proven-environments", "configure-direction"],
    recommendedProducts: ["adaptive-sit-stand-console", "scada-triggered-video-wall", "environment-intelligence"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "configure-direction": "Use the close to align scope, dependencies, approvals and next design inputs.",
    },
    neutralRecommendation: "Focus on scope clarity, delivery coordination and decision checkpoints.",
  },
  {
    id: "System integrator",
    type: "role",
    recommendedChapters: ["connected-environment", "incident-response", "intelligent-layers", "configure-direction"],
    recommendedProducts: ["onehub-ai-desk-hub", "scada-triggered-video-wall", "voice-enabled-interaction"],
    surfacedProjects: [],
    presenterTalkingPoints: {
      "connected-environment": "Keep integrations explicit as interfaces to be confirmed, tested and documented during delivery.",
    },
    neutralRecommendation: "Focus on integration boundaries, interface readiness and technical validation.",
  },
];

function mappingFor(id?: CustomerIndustry | CustomerRole) {
  return customerPathMappings.find((mapping) => mapping.id === id) ?? null;
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function getCustomerPathRecommendations(selection: CustomerPathSelection) {
  const selectedMappings = [mappingFor(selection.industry), mappingFor(selection.role)].filter(Boolean) as CustomerPathMapping[];

  return {
    recommendedChapters: unique(selectedMappings.flatMap((mapping) => mapping.recommendedChapters)),
    recommendedProducts: unique(selectedMappings.flatMap((mapping) => mapping.recommendedProducts)),
    surfacedProjects: unique(selectedMappings.flatMap((mapping) => mapping.surfacedProjects)),
    neutralRecommendations: selectedMappings.map((mapping) => mapping.neutralRecommendation),
    presenterTalkingPoints: selectedMappings.reduce<Partial<Record<ChapterId, string[]>>>((acc, mapping) => {
      Object.entries(mapping.presenterTalkingPoints).forEach(([chapterId, point]) => {
        if (!point) {
          return;
        }
        acc[chapterId as ChapterId] = [...(acc[chapterId as ChapterId] ?? []), point];
      });
      return acc;
    }, {}),
  };
}

export function getPrioritizedChapterSequence(selection: CustomerPathSelection) {
  const recommended = getCustomerPathRecommendations(selection).recommendedChapters;
  const enabledIds = enabledChapters.map((chapter) => chapter.id);
  return unique([...recommended.filter((chapterId) => enabledIds.includes(chapterId)), ...enabledIds]);
}

export function getPathPresenterPoint(selection: CustomerPathSelection, chapterId: ChapterId) {
  return getCustomerPathRecommendations(selection).presenterTalkingPoints[chapterId]?.join(" ") ?? null;
}
