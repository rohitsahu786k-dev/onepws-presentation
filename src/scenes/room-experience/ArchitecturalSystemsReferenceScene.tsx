import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Cable,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Expand,
  Eye,
  Flame,
  Gauge,
  Headphones,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  Lock,
  Map as MapIcon,
  Monitor,
  Network,
  PanelTop,
  PlugZap,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Target,
  Thermometer,
  UserRound,
  Volume2,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordRoomExperienceEvent } from "./roomAnalytics";

type FeatureCell = {
  title: string;
  description?: string;
  Icon: LucideIcon;
};

type ArchitecturalSystemPage = {
  id: string;
  index: number;
  title: string;
  breadcrumb: string;
  headline: string;
  subhead: string;
  body: string;
  image: string;
  accent: string;
  Icon: LucideIcon;
  keyHighlights: FeatureCell[];
  darkPanel: FeatureCell[];
  capabilitiesTitle: string;
  capabilities: FeatureCell[];
  lowerTitle: string;
  lowerItems: FeatureCell[];
};

export const architecturalSystemChapterIds = [
  "architectural-lighting-systems",
  "architectural-hvac-systems",
  "architectural-acoustic-systems",
  "architectural-power-systems",
  "architectural-structured-cabling",
  "architectural-security-systems",
  "architectural-fire-safety-systems",
] as const;

const architecturalPages: ArchitecturalSystemPage[] = [
  {
    id: "architectural-lighting-systems",
    index: 1,
    title: "Lighting Systems",
    breadcrumb: "Lighting Systems",
    headline: "Lighting Systems",
    subhead: "Lighting engineered for visibility, comfort and 24/7 operations.",
    body: "A layered lighting approach balances screen visibility, task illumination, operator comfort and changing needs across every shift.",
    image: "/assets/products/architectural-systems/control-room-lighting-systems.png",
    accent: "#d51d2a",
    Icon: Lightbulb,
    keyHighlights: [
      { title: "Glare Control", description: "Reduces screen reflections.", Icon: Eye },
      { title: "Adaptive Lighting", description: "Adjusts to tasks and shifts.", Icon: SlidersHorizontal },
      { title: "Circadian Support", description: "Supports day-night rhythms.", Icon: Sun },
      { title: "Individual Task Lighting", description: "Light where it's needed.", Icon: Lightbulb },
      { title: "Daylight Control", description: "Manages natural light and glare.", Icon: Target },
      { title: "Emergency & Standby Lighting", description: "Essential light when needed.", Icon: Zap },
    ],
    darkPanel: [
      { title: "Visual Comfort", description: "Reduced glare and balanced brightness.", Icon: Eye },
      { title: "Operator Alertness", description: "Lighting adapted to changing shift conditions.", Icon: UserRound },
      { title: "Screen Visibility", description: "Controlled illumination around displays and video walls.", Icon: Monitor },
      { title: "Energy Efficiency", description: "Light delivered where and when it is needed.", Icon: Leaf },
    ],
    capabilitiesTitle: "Our Lighting Capabilities",
    capabilities: [
      { title: "Circadian Lighting", Icon: Sun },
      { title: "Tunable White Lighting", Icon: Lightbulb },
      { title: "Situational Awareness Lighting", Icon: Target },
      { title: "Task Lighting", Icon: Lightbulb },
      { title: "Wall Wash & Accent", Icon: Sun },
      { title: "Dimmable Controls", Icon: SlidersHorizontal },
      { title: "Daylight Management", Icon: Sun },
      { title: "Emergency Lighting", Icon: Zap },
    ],
    lowerTitle: "Designed for Control-Rooms",
    lowerItems: [
      { title: "Focus", description: "Clear visibility for critical tasks.", Icon: Target },
      { title: "Comfort", description: "Visual conditions that support long shifts.", Icon: UserRound },
      { title: "Efficiency", description: "Smart controls reduce energy use.", Icon: Leaf },
      { title: "Safety", description: "Emergency lighting supports response.", Icon: ShieldCheck },
    ],
  },
  {
    id: "architectural-hvac-systems",
    index: 2,
    title: "HVAC Systems",
    breadcrumb: "HVAC Systems",
    headline: "HVAC Systems",
    subhead: "Climate control engineered for comfort, equipment reliability and continuous operation.",
    body: "Stable temperature, humidity and air quality support both operator performance and sensitive control-room equipment.",
    image: "/assets/products/architectural-systems/control-room-hvac-systems.png",
    accent: "#1f9d5a",
    Icon: Wind,
    keyHighlights: [
      { title: "Temperature Control", description: "Maintains stable room conditions.", Icon: Thermometer },
      { title: "Humidity Management", description: "Protects comfort and equipment.", Icon: Cloud },
      { title: "Air Quality Monitoring", description: "Tracks indoor air conditions.", Icon: Wind },
      { title: "Energy Efficient", description: "Optimizes HVAC energy use.", Icon: Leaf },
      { title: "Redundancy", description: "Maintains cooling during faults.", Icon: ShieldCheck },
      { title: "Low Noise", description: "Supports a quieter workspace.", Icon: Volume2 },
    ],
    darkPanel: [
      { title: "Operator Comfort", description: "Stable conditions reduce fatigue.", Icon: UserRound },
      { title: "Equipment Reliability", description: "Controlled climate protects electronics.", Icon: ShieldCheck },
      { title: "Continuous Operation", description: "Redundant systems support uptime.", Icon: Gauge },
      { title: "Energy Efficiency", description: "Optimized operation reduces consumption.", Icon: Leaf },
    ],
    capabilitiesTitle: "Our HVAC Capabilities",
    capabilities: [
      { title: "Variable Air Volume", Icon: Wind },
      { title: "Fresh Air Management", Icon: Wind },
      { title: "Underfloor Air Distribution", Icon: PanelTop },
      { title: "Precision Cooling", Icon: Gauge },
      { title: "Air Filtration", Icon: Cloud },
      { title: "Environmental Monitoring", Icon: Thermometer },
      { title: "BMS Integration", Icon: Network },
      { title: "Leak Detection", Icon: ShieldCheck },
    ],
    lowerTitle: "System Components",
    lowerItems: [
      { title: "AHU / DOAS", description: "Fresh-air treatment and filtration.", Icon: Wind },
      { title: "Precision Cooling", description: "Stable cooling for critical spaces.", Icon: Thermometer },
      { title: "Air Distribution", description: "Diffusers, grilles and underfloor supply.", Icon: PanelTop },
      { title: "Sensors & Controls", description: "Temperature, humidity and pressure monitoring.", Icon: SlidersHorizontal },
      { title: "BMS Integration", description: "Centralized monitoring and automation.", Icon: Network },
    ],
  },
  {
    id: "architectural-acoustic-systems",
    index: 3,
    title: "Acoustic Systems",
    breadcrumb: "Acoustic Systems",
    headline: "Acoustic Systems",
    subhead: "Engineered acoustics for focus, clarity and communication.",
    body: "Integrated acoustic solutions control noise and reverberation to create a calmer, clearer environment for critical operations.",
    image: "/assets/products/architectural-systems/control-room-acoustic-systems.png",
    accent: "#7c3aed",
    Icon: Volume2,
    keyHighlights: [
      { title: "Noise Control", description: "Reduces unwanted noise.", Icon: Volume2 },
      { title: "Reverberation Control", description: "Controls reflected sound.", Icon: Target },
      { title: "Speech Clarity", description: "Supports clear communication.", Icon: Bell },
      { title: "Sound Absorption", description: "Absorbs unwanted sound energy.", Icon: PanelTop },
      { title: "Acoustic Privacy", description: "Limits sound transmission.", Icon: ShieldCheck },
      { title: "Operator Comfort", description: "Creates a calmer workspace.", Icon: Heart },
    ],
    darkPanel: [
      { title: "Enhanced Focus", description: "Reduces distracting background noise.", Icon: UserRound },
      { title: "Clear Communication", description: "Improves speech clarity across the room.", Icon: Bell },
      { title: "Operator Comfort", description: "Creates a calmer acoustic environment.", Icon: Volume2 },
      { title: "Standards-Aligned Design", description: "Designed around control-room acoustic requirements.", Icon: ShieldCheck },
    ],
    capabilitiesTitle: "Integrated Acoustic Solutions",
    capabilities: [
      { title: "Wall Panels", Icon: PanelTop },
      { title: "Acoustic Ceilings", Icon: PanelTop },
      { title: "Baffle Systems", Icon: Cloud },
      { title: "Perforated Panels", Icon: PanelTop },
      { title: "Fabric Panels", Icon: PanelTop },
      { title: "Acoustic Partitions", Icon: Volume2 },
      { title: "Vibration Isolation", Icon: Gauge },
      { title: "Acoustic Doors", Icon: ShieldCheck },
    ],
    lowerTitle: "Acoustic Performance",
    lowerItems: [
      { title: "High Sound Absorption", description: "Material-specific acoustic performance.", Icon: Target },
      { title: "Controlled Reverberation", description: "Designed around room size and operational needs.", Icon: Gauge },
      { title: "Broad Frequency Control", description: "Solutions selected for speech and equipment noise.", Icon: Volume2 },
      { title: "Performance Verified", description: "Testing available for specified acoustic products.", Icon: ClipboardCheck },
    ],
  },
  {
    id: "architectural-power-systems",
    index: 4,
    title: "Power Systems",
    breadcrumb: "Power Systems",
    headline: "Power Systems",
    subhead: "Resilient power for continuous mission-critical operations.",
    body: "Integrated power infrastructure delivers stable distribution, backup, protection and monitoring for critical control-room systems.",
    image: "/assets/products/architectural-systems/control-room-power-systems.png",
    accent: "#6d28d9",
    Icon: Zap,
    keyHighlights: [
      { title: "Redundant Power", description: "Supports operational continuity.", Icon: Network },
      { title: "Power Protection", description: "Protects against electrical disturbances.", Icon: ShieldCheck },
      { title: "Efficient Distribution", description: "Optimizes power delivery.", Icon: Gauge },
      { title: "UPS Backup", description: "Bridges critical power interruptions.", Icon: PlugZap },
      { title: "Power Monitoring", description: "Tracks system status continuously.", Icon: Monitor },
      { title: "Serviceability", description: "Simplifies access and maintenance.", Icon: SlidersHorizontal },
    ],
    darkPanel: [
      { title: "Power Continuity", description: "Redundant architecture supports continuous operation.", Icon: ShieldCheck },
      { title: "Scalable Infrastructure", description: "Designed to adapt to changing power demands.", Icon: PanelTop },
      { title: "Equipment Protection", description: "Stable, protected power for critical systems.", Icon: Leaf },
      { title: "24/7 Visibility", description: "Continuous monitoring of power infrastructure.", Icon: Gauge },
    ],
    capabilitiesTitle: "Our Power Capabilities",
    capabilities: [
      { title: "Power Distribution", Icon: PlugZap },
      { title: "UPS Systems", Icon: ShieldCheck },
      { title: "Battery Backup", Icon: PlugZap },
      { title: "Critical Power Segregation", Icon: Network },
      { title: "Surge Protection", Icon: Zap },
      { title: "Generator Integration", Icon: Gauge },
      { title: "Power Monitoring", Icon: Monitor },
      { title: "Automatic Transfer Switching", Icon: SlidersHorizontal },
    ],
    lowerTitle: "Power Infrastructure Benefits",
    lowerItems: [
      { title: "Power Resilience", description: "Redundancy reduces single points of failure.", Icon: Gauge },
      { title: "Equipment Protection", description: "Protects sensitive electronic systems.", Icon: ShieldCheck },
      { title: "Operational Continuity", description: "Backup systems support critical operations.", Icon: Network },
      { title: "Energy Efficiency", description: "Efficient distribution reduces unnecessary losses.", Icon: Leaf },
      { title: "Monitored Performance", description: "System status and events remain visible.", Icon: ClipboardCheck },
      { title: "Future Ready", description: "Infrastructure designed for expansion.", Icon: ArrowRight },
    ],
  },
  {
    id: "architectural-structured-cabling",
    index: 5,
    title: "Structured Cabling",
    breadcrumb: "Structured Cabling",
    headline: "Structured Cabling",
    subhead: "Organized connectivity for reliable, scalable control-room infrastructure.",
    body: "A structured network backbone connects data, AV and control systems while simplifying expansion, maintenance and troubleshooting.",
    image: "/assets/products/architectural-systems/control-room-cable-management-system.png",
    accent: "#0f5dcc",
    Icon: Cable,
    keyHighlights: [
      { title: "Performance", description: "Reliable high-speed connectivity.", Icon: Gauge },
      { title: "Reliability", description: "Stable network infrastructure.", Icon: ShieldCheck },
      { title: "Scalability", description: "Designed for future expansion.", Icon: ArrowRight },
      { title: "Organization", description: "Structured, traceable cable routing.", Icon: Cable },
      { title: "Serviceability", description: "Faster identification and maintenance.", Icon: SlidersHorizontal },
      { title: "Future Ready", description: "Supports evolving technologies.", Icon: Leaf },
    ],
    darkPanel: [
      { title: "Seamless Connectivity", description: "Connects data, AV and control systems.", Icon: Network },
      { title: "Operational Reliability", description: "Organized infrastructure reduces connectivity risks.", Icon: ShieldCheck },
      { title: "Standards-Aligned", description: "Designed around recognized cabling practices.", Icon: Cable },
      { title: "Serviceable Infrastructure", description: "Easy identification, access and maintenance.", Icon: CheckCircle2 },
    ],
    capabilitiesTitle: "Our Structured Cabling Capabilities",
    capabilities: [
      { title: "Copper Cabling", Icon: Cable },
      { title: "Fiber Optic", Icon: Cable },
      { title: "AV Connectivity", Icon: Monitor },
      { title: "Control & KVM", Icon: Monitor },
      { title: "Network Infrastructure", Icon: Network },
      { title: "Cable Management", Icon: SlidersHorizontal },
      { title: "Patch Panels", Icon: PanelTop },
      { title: "Equipment Racks", Icon: Network },
      { title: "Testing", Icon: ClipboardCheck },
      { title: "Labelling", Icon: CheckCircle2 },
    ],
    lowerTitle: "Structured Cabling Benefits",
    lowerItems: [
      { title: "Reliability", description: "Consistent system connectivity.", Icon: Gauge },
      { title: "Serviceability", description: "Faster tracing and troubleshooting.", Icon: ShieldCheck },
      { title: "Scalability", description: "Simplifies additions and upgrades.", Icon: PlugZap },
      { title: "System Integration", description: "One infrastructure for connected systems.", Icon: Network },
      { title: "Organization", description: "Clear routing, identification and documentation.", Icon: ArrowRight },
    ],
  },
  {
    id: "architectural-security-systems",
    index: 6,
    title: "Security Systems",
    breadcrumb: "Security Systems",
    headline: "Security Systems",
    subhead: "Integrated security for protected, controlled and continuously monitored operations.",
    body: "Connected surveillance, access control, detection and alarm systems help protect people, assets and critical operational areas.",
    image: "/assets/products/architectural-systems/control-room-security-systems.png",
    accent: "#0f4db8",
    Icon: ShieldCheck,
    keyHighlights: [
      { title: "24/7 Monitoring", description: "Continuous security visibility.", Icon: Monitor },
      { title: "Controlled Access", description: "Restricts unauthorized entry.", Icon: Lock },
      { title: "Real-Time Alerts", description: "Highlights critical events quickly.", Icon: Bell },
      { title: "Integrated Protection", description: "Connects multiple security systems.", Icon: ShieldCheck },
      { title: "Event Intelligence", description: "Supports faster incident assessment.", Icon: Gauge },
      { title: "Scalable Architecture", description: "Adapts as requirements grow.", Icon: Cloud },
    ],
    darkPanel: [
      { title: "Surveillance", description: "Continuous visibility across critical areas.", Icon: Monitor },
      { title: "Access Control", description: "Controls entry to restricted spaces.", Icon: Lock },
      { title: "Intrusion Detection", description: "Detects unauthorized access and activity.", Icon: Bell },
      { title: "Alarm & Response", description: "Brings critical security events to attention.", Icon: ShieldCheck },
      { title: "Centralized Management", description: "Unified monitoring across security systems.", Icon: Network },
    ],
    capabilitiesTitle: "Our Security Capabilities",
    capabilities: [
      { title: "Video Surveillance", Icon: Monitor },
      { title: "Access Control", Icon: Lock },
      { title: "Intrusion Detection", Icon: Bell },
      { title: "Security Zoning", Icon: ShieldCheck },
      { title: "Alarm Management", Icon: Bell },
      { title: "Visitor Management", Icon: UserRound },
      { title: "Video Analytics", Icon: Gauge },
      { title: "Emergency Integration", Icon: ArrowRight },
    ],
    lowerTitle: "Security System Benefits",
    lowerItems: [
      { title: "Protection", description: "Protects people, assets and critical areas.", Icon: ShieldCheck },
      { title: "Control", description: "Manages access to restricted spaces.", Icon: Monitor },
      { title: "Awareness", description: "Maintains visibility of security events.", Icon: Gauge },
      { title: "Response", description: "Supports faster incident coordination.", Icon: Zap },
      { title: "Traceability", description: "Maintains event records for review.", Icon: ClipboardCheck },
      { title: "Integration", description: "Connects security systems into one environment.", Icon: UserRound },
    ],
  },
  {
    id: "architectural-fire-safety-systems",
    index: 7,
    title: "Fire & Safety Systems",
    breadcrumb: "Fire & Safety Systems",
    headline: "Fire & Safety Systems",
    subhead: "Integrated protection for people, assets and critical operations.",
    body: "Integrated detection, alarm, suppression and evacuation systems support early response and safer control-room operations.",
    image: "/assets/products/architectural-systems/control-room-fire-safety-systems.png",
    accent: "#dc1f2a",
    Icon: Flame,
    keyHighlights: [
      { title: "Early Detection", description: "Identifies potential hazards.", Icon: Flame },
      { title: "Instant Alerts", description: "Notifies teams quickly.", Icon: Bell },
      { title: "Integrated Response", description: "Coordinates safety systems.", Icon: Target },
      { title: "Safe Evacuation", description: "Supports clear exit guidance.", Icon: ArrowRight },
      { title: "System Monitoring", description: "Tracks system status.", Icon: ShieldCheck },
      { title: "Emergency Readiness", description: "Supports coordinated response.", Icon: ClipboardCheck },
    ],
    darkPanel: [
      { title: "Early Detection", description: "Identifies fire and safety events quickly.", Icon: Target },
      { title: "Integrated Response", description: "Connects detection, alarms and suppression.", Icon: ShieldCheck },
      { title: "Continuous Monitoring", description: "Maintains visibility of system status and events.", Icon: Eye },
      { title: "Emergency Coordination", description: "Supports notification, evacuation and response.", Icon: SlidersHorizontal },
    ],
    capabilitiesTitle: "Our Fire & Safety Capabilities",
    capabilities: [
      { title: "Active Protection", description: "Detection · Alarm · Suppression · Gas Detection · Monitoring", Icon: Flame },
      { title: "Passive Protection", description: "Fire-Rated Doors · Fire-Rated Partitions · Fire Stopping · Compartmentation", Icon: ShieldCheck },
    ],
    lowerTitle: "Fire Safety Benefits",
    lowerItems: [
      { title: "Early Awareness", description: "Faster identification of safety events.", Icon: ShieldCheck },
      { title: "Coordinated Response", description: "Integrated alarms and safety systems.", Icon: Network },
      { title: "Safe Evacuation", description: "Supports clear emergency guidance.", Icon: Gauge },
      { title: "Operational Resilience", description: "Supports recovery after an incident.", Icon: Heart },
      { title: "System Visibility", description: "Centralized monitoring of safety systems.", Icon: Leaf },
    ],
  },
];

const architecturalPageById = new Map(architecturalPages.map((page) => [page.id, page]));

export function ArchitecturalSystemsReferenceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const page = architecturalPageById.get(chapter.id) ?? architecturalPages[0];
  const isLightingPage = page.id === "architectural-lighting-systems";
  const isStructuredCablingPage = page.id === "architectural-structured-cabling";
  const isFireSafetyPage = page.id === "architectural-fire-safety-systems";
  const headlineLines = isFireSafetyPage ? ["Fire & Safety", "Systems"] : page.headline.split(" ");
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordRoomExperienceEvent("architectural_journey_started", { chapterId: chapter.id, detail: page.title });
  }, [chapter.id, page.title]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.28]" src="/assets/backgrounds/architectural-systems-bg-cover.jpeg" />
      <div className="absolute inset-0 bg-[linear-gradient(116deg,rgb(255_255_255/0.88)_0%,rgb(251_252_253/0.8)_56%,rgb(238_244_247/0.84)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="relative z-10 flex h-full flex-col px-[1.7cqw] pb-[8.1cqh] pt-[9.8cqh]">
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(18rem,0.36fr)_minmax(0,1fr)] gap-[1.55cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="flex min-h-0 flex-col pt-[1.2cqh]" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="flex items-center gap-[0.55cqw] text-[clamp(0.62rem,0.7cqw,0.82rem)] font-semibold text-slate-600">
              <span className="grid h-[2.05rem] w-[2.05rem] place-items-center rounded-full bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_0.55rem_1.2rem_rgb(15_23_42/0.08)]"><Home aria-hidden="true" size={18} strokeWidth={1.8} /></span>
              <span>All Systems</span>
              <ChevronRight aria-hidden="true" size={16} />
              <span style={{ color: page.accent }}>{page.breadcrumb}</span>
            </div>

            <div className="mt-[4.1cqh] flex items-start">
              <div>
                <h1 className="text-[clamp(2.55rem,3.36cqw,4.9rem)] font-bold leading-[0.97] tracking-normal text-control-text">
                  {headlineLines.map((line, index) => <span className="block" key={`${line}-${index}`}>{line}</span>)}
                </h1>
                <div className="mt-[1.25cqh] h-[2px] w-[2rem]" style={{ backgroundColor: page.accent }} />
              </div>
            </div>

            <p className="mt-[1.55cqh] max-w-[22rem] text-[clamp(1.08rem,1.28cqw,1.48rem)] font-medium leading-[1.34] text-slate-700">{page.subhead}</p>
            <p className="mt-[1.85cqh] max-w-[22rem] text-[clamp(0.8rem,0.8cqw,1.14rem)] font-medium leading-[1.45] text-slate-700">{page.body}</p>

            <section className={`${isFireSafetyPage ? "mb-[6.1cqh] min-h-[29.5cqh]" : "mb-[6.1cqh] min-h-[29.5cqh]"} mt-auto overflow-hidden rounded-[0.78rem] border border-white/80 bg-white/60 p-[1.2cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_1rem_2.4rem_rgb(15_23_42/0.09)] backdrop-blur-[24px]`}>
              <h2 className="text-[clamp(0.82rem,0.94cqw,1.08rem)] font-semibold uppercase tracking-[0.08em] text-control-text">Key Highlights</h2>
              <div className="mt-[1.4cqh] grid grid-cols-3 gap-y-[1.5cqh]">
                {page.keyHighlights.map((item, index) => <MiniFeatureCell accent={page.accent} index={index} item={item} key={item.title} />)}
              </div>
            </section>
          </motion.aside>

          <motion.main
            animate={{ opacity: 1, y: 0 }}
            className={`grid min-h-0 ${
              isLightingPage
                ? "grid-rows-[62cqh_12.7cqh]"
                : isStructuredCablingPage
                  ? "grid-rows-[45.2cqh_16.2cqh_11cqh]"
                  : "grid-rows-[45.2cqh_13.6cqh_13.6cqh]"
            } gap-[1.35cqh]`}
            initial={false}
            transition={{ duration: 0.76, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <section className="relative overflow-hidden rounded-[0.85rem] border border-white/80 bg-slate-950 shadow-[0_1.1rem_2.9rem_rgb(15_23_42/0.16)]">
              {isLightingPage ? (
                <>
                  <img alt="" className="absolute inset-x-0 top-0 h-[78%] w-full object-cover object-center" src={page.image} />
                  <div className="absolute inset-x-0 top-0 h-[78%] bg-[linear-gradient(180deg,rgb(255_255_255/0.03)_0%,transparent_60%,rgb(2_6_23/0.16)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(135deg,rgb(8_13_20/0.96),rgb(18_24_31/0.94))] px-[2.15cqw] py-[1.65cqh] text-white">
                    <h2 className="text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase tracking-[0.08em]">Designed Around the Operator</h2>
                    <div className="mt-[1.35cqh] grid grid-cols-4 items-center">
                      {page.darkPanel.map((item, index) => (
                        <LightingBenefitCell accent={page.accent} index={index} item={item} key={item.title} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src={page.image} />
                  <div className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(90deg,rgb(2_6_23/0.96),rgb(2_6_23/0.78),transparent)]" />
                  <div className="absolute left-0 top-0 h-full w-[28%] px-[1.35cqw] py-[3cqh] text-white backdrop-blur-[2px]">
                    <h2 className="text-[clamp(0.74rem,0.86cqw,1rem)] font-semibold uppercase">Designed for Control-Rooms</h2>
                    <div className="mt-[2.1cqh] grid h-[calc(100%-6cqh)] grid-rows-4 items-center">
                      {page.darkPanel.map((item) => <DarkPanelRow accent={page.accent} item={item} key={item.title} />)}
                    </div>
                  </div>
                </>
              )}
            </section>

            <SystemBand accent={page.accent} items={page.capabilities} title={page.capabilitiesTitle} />

            {!isLightingPage ? (
              <section className="translate-y-[0.55cqh] overflow-hidden rounded-[0.78rem] border border-white/80 bg-white/62 p-[1.05cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_1rem_2.3rem_rgb(15_23_42/0.09)] backdrop-blur-[24px]">
                <h2 className="text-[clamp(0.76rem,0.88cqw,1.02rem)] font-semibold uppercase tracking-[0.08em] text-control-text">{page.lowerTitle}</h2>
                <div className="mt-[0.8cqh] h-px bg-slate-200/90" />
                <div className={`mt-[1.35cqh] grid h-[calc(100%-3.1cqh)] items-center ${page.lowerItems.length > 5 ? "grid-cols-6" : page.lowerItems.length > 4 ? "grid-cols-5" : "grid-cols-4"}`}>
                  {page.lowerItems.map((item, index) => <BenefitCell accent={page.accent} index={index} item={item} key={item.title} />)}
                </div>
              </section>
            ) : null}
          </motion.main>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><MapIcon aria-hidden="true" size={22} /></button>
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
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : (
            <button aria-label="Toggle narration" className="pws-scene-control" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones aria-hidden="true" size={22} /></button>
          )}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function MiniFeatureCell({ item, index, accent }: { item: FeatureCell; index: number; accent: string }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.8cqw] text-center ${index % 3 ? "border-l border-slate-200/90" : ""} ${index > 2 ? "border-t border-slate-200/90 pt-[1.3cqh]" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto" color={accent} size={37} strokeWidth={1.65} />
      <h3 className="mt-[0.75cqh] text-[clamp(0.74rem,0.7cqw,0.98rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      
    </div>
  );
}

function DarkPanelRow({ item, accent }: { item: FeatureCell; accent: string }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.6rem_minmax(0,1fr)] gap-[0.95cqw]">
      <Icon aria-hidden="true" color={accent} size={38} strokeWidth={1.55} />
      <div>
        <h3 className="text-[clamp(0.82rem,0.94cqw,1.08rem)] font-semibold leading-tight text-white">{item.title}</h3>
        {item.description ? <p className="mt-0.5 text-[clamp(0.7rem,0.8cqw,0.92rem)] font-medium leading-[1.2] text-white/88">{item.description}</p> : null}
      </div>
    </div>
  );
}

function LightingBenefitCell({ item, index, accent }: { item: FeatureCell; index: number; accent: string }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.6rem_minmax(0,1fr)] items-center gap-[0.75cqw] px-[1cqw] ${index ? "border-l border-white/22" : ""}`}>
      <Icon aria-hidden="true" color={index === 0 ? accent : "white"} size={39} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.74rem,0.84cqw,0.98rem)] font-semibold leading-tight text-white">{item.title}</strong>
        {item.description ? <span className="mt-0.5 block text-[clamp(0.62rem,0.72cqw,0.84rem)] font-medium leading-[1.18] text-white/84">{item.description}</span> : null}
      </span>
    </div>
  );
}

function SystemBand({ title, items, accent }: { title: string; items: FeatureCell[]; accent: string }) {
  const isDense = items.length > 8;
  const isGrouped = items.length <= 2 && items.some((item) => item.description);

  return (
    <section className={`overflow-hidden rounded-[0.78rem] border border-white/80 bg-white/62 ${isDense ? "px-[0.95cqw] py-[0.82cqw]" : "p-[0.95cqw]"} shadow-[inset_0_1px_0_rgb(255_255_255/0.96),0_1rem_2.3rem_rgb(15_23_42/0.09)] backdrop-blur-[24px]`}>
      <h2 className="text-[clamp(0.82rem,0.94cqw,1.08rem)] font-semibold uppercase tracking-[0.08em] text-control-text">{title}</h2>
      <div className="mt-[0.72cqh] h-px bg-slate-200/90" />
      <div className={`mt-[0.85cqh] grid items-center ${isGrouped ? "h-[calc(100%-4.4cqh)] grid-cols-2 gap-[1cqw]" : isDense ? "h-[calc(100%-4.4cqh)] grid-cols-5 grid-rows-2 gap-y-0" : "h-[5.2cqh] grid-cols-8"}`}>
        {items.map((item, index) => {
          const Icon = item.Icon;
          const showLeftBorder = isDense ? index % 5 !== 0 : index !== 0;
          const showTopBorder = isDense && index > 4;
          if (isGrouped) {
            return (
              <div className={`grid h-full min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-[0.75cqw] rounded-[0.5rem] bg-white/45 px-[1cqw] ${index ? "border-l border-slate-200/90" : ""}`} key={item.title}>
                <Icon aria-hidden="true" color={accent} size={36} strokeWidth={1.55} />
                <span className="min-w-0">
                  <strong className="block text-[clamp(0.76rem,0.86cqw,1rem)] font-semibold uppercase leading-tight tracking-[0.04em] text-control-text">{item.title}</strong>
                  <span className="mt-1 block text-[clamp(0.62rem,0.7cqw,0.82rem)] font-medium leading-[1.22] text-slate-700">{item.description}</span>
                </span>
              </div>
            );
          }
          return (
            <div
              className={`grid h-full min-w-0 grid-cols-[2.1rem_minmax(0,1fr)] items-center gap-[0.34cqw] px-[0.6cqw] ${showLeftBorder ? "border-l border-slate-200/90" : ""} ${showTopBorder ? "border-t border-slate-200/90" : ""}`}
              key={item.title}
            >
              <Icon aria-hidden="true" color={accent} size={32} strokeWidth={1.55} />
              <span className="break-normal text-[clamp(0.62rem,0.7cqw,0.8rem)] font-semibold leading-tight text-control-text">{item.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BenefitCell({ item, index, accent }: { item: FeatureCell; index: number; accent: string }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-[0.55cqw] px-[0.82cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" color={accent} size={34} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.66rem,0.76cqw,0.88rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        {item.description ? <span className="mt-0.5 block text-[clamp(0.54rem,0.62cqw,0.72rem)] font-medium leading-[1.14] text-slate-700">{item.description}</span> : null}
      </span>
    </div>
  );
}
