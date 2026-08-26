import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Armchair,
  AlertTriangle,
  Activity,
  BadgeCheck,
  Bell,
  Box,
  BrainCircuit,
  Building2,
  ChartNoAxesColumnIncreasing,
  ChevronLeft,
  CircleCheck,
  Cloud,
  CloudCog,
  CloudUpload,
  ChevronRight,
  ClipboardList,
  Clock3,
  Cpu,
  Database,
  Droplets,
  Eye,
  Expand,
  FastForward,
  Filter,
  Footprints,
  Gauge,
  Globe,
  Grid2X2,
  Headphones,
  Layers,
  LayoutDashboard,
  Leaf,
  Moon,
  LockKeyhole,
  Map,
  MessageSquare,
  Monitor,
  MonitorCog,
  Network,
  Quote,
  Radio,
  RadioTower,
  RefreshCw,
  Server,
  Settings,
  Siren,
  ScanFace,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareCheckBig,
  Sun,
  Target,
  Thermometer,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordIntelligentOperationsEvent } from "./intelligentOperationsAnalytics";

type SimpleItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  color?: string;
};

const readinessItems: SimpleItem[] = [
  { title: "Lighting Adjusted", description: "Set to your preferred brightness and tone.", Icon: Sun, color: "text-amber-500" },
  { title: "Console Height Set", description: "Sit-stand console moves to your saved height.", Icon: SlidersHorizontal, color: "text-control-warm" },
  { title: "Monitors Positioned", description: "Displays return to your preferred layout.", Icon: Monitor, color: "text-emerald-500" },
  { title: "Chair & Comfort Ready", description: "Lumbar, tilt and arm settings restored.", Icon: Armchair, color: "text-blue-600" },
  { title: "Dashboard Loaded", description: "Your favorite apps and dashboards are ready.", Icon: Grid2X2, color: "text-violet-600" },
];

const securityItems: SimpleItem[] = [
  { title: "Seamless Identification", description: "", Icon: ScanFace },
  { title: "Secure & Contactless", description: "", Icon: ShieldCheck },
  { title: "Instant Readiness", description: "", Icon: BadgeCheck },
];

const experienceSteps: SimpleItem[] = [
  { title: "You Approach", description: "Room detects your presence.", Icon: Footprints },
  { title: "You Are Recognized", description: "Identity confirmed securely.", Icon: ScanFace },
  { title: "Your Preferences Load", description: "Workspace settings are applied.", Icon: SlidersHorizontal },
  { title: "Environment Adjusts", description: "Lighting, temperature & comfort optimized.", Icon: SquareCheckBig },
  { title: "Systems Ready", description: "Applications, displays & alerts prepared.", Icon: Monitor },
  { title: "You Take Control", description: "Shift begins the moment you enter.", Icon: UserCheck },
];

const outcomeItems: SimpleItem[] = [
  { title: "Faster Start", description: "No login delays. No distractions.", Icon: ShieldCheck },
  { title: "Better Focus", description: "Your environment is ready to perform.", Icon: Target },
  { title: "Consistent Every Shift", description: "Every setting returns exactly where it belongs.", Icon: UserCheck },
  { title: "Secure by Design", description: "Biometric recognition keeps access safe.", Icon: LockKeyhole },
  { title: "Higher Performance", description: "Comfort, ergonomics and information - already in sync.", Icon: BadgeCheck },
];

const consoleModeItems: (SimpleItem & { color: string })[] = [
  { title: "Monitor", description: "Day-to-day monitoring with real-time situational awareness.", Icon: Monitor, color: "text-blue-600" },
  { title: "Incident", description: "Automatic prioritization of critical systems and alarms.", Icon: Siren, color: "text-control-warm" },
  { title: "Collaborate", description: "Share, discuss and decide with your team in real time.", Icon: Users, color: "text-emerald-500" },
  { title: "Handover", description: "Summarize, document and transfer with full context.", Icon: ClipboardList, color: "text-amber-500" },
];

const consoleUnderstandsItems: SimpleItem[] = [
  { title: "What you do most often", description: "", Icon: Target },
  { title: "What time of day it is", description: "", Icon: Clock3 },
  { title: "System alerts & states", description: "", Icon: Bell },
  { title: "Your role & responsibilities", description: "", Icon: UserCheck },
  { title: "Your preferences & history", description: "", Icon: SlidersHorizontal },
  { title: "Team workload & collaboration", description: "", Icon: Users },
];

const consoleAdaptSteps: SimpleItem[] = [
  { title: "Detects Context", description: "Monitors activity, alerts and environment.", Icon: Gauge },
  { title: "Understands Priority", description: "Determines what's important right now.", Icon: ClipboardList },
  { title: "Reconfigures Workspace", description: "Moves displays, opens apps and adjusts settings.", Icon: SlidersHorizontal },
  { title: "Presents the Task View", description: "The active mode decides what belongs on screen.", Icon: UserCheck },
  { title: "Keeps Control Human", description: "Automation prepares the workspace; the operator acts.", Icon: SquareCheckBig },
];

const transitionItems = [
  { title: "Normal Monitoring", description: "All systems visible." },
  { title: "Incident Detected", description: "Critical alarm triggers." },
  { title: "Information Filters", description: "Non-critical info minimizes." },
  { title: "Focus On What Matters", description: "Critical systems move to primary displays." },
  { title: "Action Support", description: "Tools, SOPs and team comms ready." },
];

const consoleBenefits: SimpleItem[] = [
  { title: "Mode Clarity", description: "Monitoring, incident and handover screens stay distinct.", Icon: Target },
  { title: "Priority Fronting", description: "Critical data is placed where attention already is.", Icon: Clock3 },
  { title: "Lower Cognitive Load", description: "The console hides non-essential work surfaces.", Icon: SlidersHorizontal },
  { title: "Operator Authority", description: "The system prepares options without taking command.", Icon: ShieldCheck },
  { title: "Repeatable Handover", description: "Shift context moves with the workflow, not memory.", Icon: Gauge },
];

const informationDeliveryItems: SimpleItem[] = [
  { title: "Prioritizes critical events", description: "Highlights what matters most.", Icon: AlertTriangle },
  { title: "Filters the noise", description: "Removes unnecessary distractions.", Icon: Filter },
  { title: "Context aware", description: "Understands the situation and adapts automatically.", Icon: BrainCircuit },
  { title: "Right display. Right format", description: "Information appears where it's needed.", Icon: Monitor },
  { title: "Always one step ahead", description: "Anticipates the next information you need.", Icon: FastForward },
];

const informationHowItWorks: (SimpleItem & { color: string })[] = [
  { title: "Detect", description: "System monitors events, data and operator activity.", Icon: Target, color: "text-control-warm" },
  { title: "Analyze", description: "AI understands context, priority and urgency.", Icon: Filter, color: "text-amber-500" },
  { title: "Prioritize", description: "Critical information is ranked and organized.", Icon: Gauge, color: "text-green-500" },
  { title: "Deliver", description: "The active display receives the next useful view.", Icon: Monitor, color: "text-blue-600" },
  { title: "Act", description: "The operator acts from one organized context.", Icon: UserCheck, color: "text-control-text" },
];

const manualSearchItems: SimpleItem[] = [
  { title: "Multiple screens need to be checked", description: "", Icon: Monitor },
  { title: "Information scattered across systems", description: "", Icon: SlidersHorizontal },
  { title: "Important alerts can be missed", description: "", Icon: AlertTriangle },
  { title: "Slower decisions, higher risk", description: "", Icon: Clock3 },
];

const proactiveDeliveryItems: SimpleItem[] = [
  { title: "Critical information delivered instantly", description: "", Icon: Gauge, color: "text-green-500" },
  { title: "Focused, relevant and actionable", description: "", Icon: ShieldCheck, color: "text-green-500" },
  { title: "Search paths removed during incidents", description: "", Icon: Target, color: "text-green-500" },
  { title: "Shared context for the next handoff", description: "", Icon: Users, color: "text-green-500" },
];

const intelligentExamples = [
  { title: "Power Outage Detected", description: "System identifies fault, impacted area and severity.", image: "/assets/source-pdf/p18_046_529x352.jpg" },
  { title: "Traffic Incident", description: "Relevant camera feed, location and response plan displayed.", image: "/assets/source-pdf/p23_053_1418x798.jpg" },
  { title: "Equipment Anomaly", description: "Live telemetry, trend and maintenance history shown.", image: "/assets/source-pdf/p36_065_360x282.jpg" },
  { title: "Severe Weather Alert", description: "Trajectory, impact zone and recommended actions appear.", image: "/assets/source-pdf/p41_080_659x281.png" },
  { title: "Security Event", description: "Live camera, access logs and incident protocol displayed.", image: "/assets/source-pdf/p24_054_1418x798.jpg" },
  { title: "Operator Guidance", description: "SOP, checklist and previous similar events shown.", image: "/assets/source-pdf/p41_081_468x459.png" },
];

const stateResponseOutcomes: SimpleItem[] = [
  { title: "Critical information delivered instantly", description: "", Icon: Gauge, color: "text-green-500" },
  { title: "Focused, relevant and actionable", description: "", Icon: ShieldCheck, color: "text-green-500" },
  { title: "Faster response, better outcomes", description: "", Icon: Target, color: "text-green-500" },
  { title: "Lower stress, higher situational awareness", description: "", Icon: Users, color: "text-green-500" },
];

const operationalStates: (SimpleItem & { color: string; active?: boolean })[] = [
  { title: "Normal", description: "Daily operations and monitoring", Icon: ShieldCheck, color: "text-blue-600" },
  { title: "Focused", description: "High attention required", Icon: Target, color: "text-blue-600" },
  { title: "Incident", description: "Critical event in progress", Icon: AlertTriangle, color: "text-control-warm", active: true },
  { title: "Recovery", description: "Stabilize and restore", Icon: SlidersHorizontal, color: "text-amber-500" },
  { title: "Standby", description: "Low activity optimized", Icon: Moon, color: "text-slate-500" },
];

const roomResponseSystems: SimpleItem[] = [
  { title: "Lighting", description: "Adjusts brightness, color temperature and focus.", Icon: Sun, color: "text-blue-500" },
  { title: "Displays & Video Wall", description: "Reorganize layouts. Show what matters most.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "Consoles", description: "Adjust height, position and posture settings automatically.", Icon: SlidersHorizontal, color: "text-blue-500" },
  { title: "Acoustics", description: "Reduce distraction. Enhance speech clarity.", Icon: Radio, color: "text-violet-600" },
  { title: "HVAC & Air Quality", description: "Increase fresh air circulation and optimize comfort.", Icon: Wind, color: "text-green-500" },
  { title: "Collaboration", description: "Enable rooms, audio, video and shared workspaces.", Icon: Users, color: "text-green-500" },
  { title: "Recording & Logging", description: "Start event recording and activity logs automatically.", Icon: Video, color: "text-amber-500" },
  { title: "Power & Infrastructure", description: "Ensure system redundancy and power stability.", Icon: ShieldCheck, color: "text-amber-500" },
  { title: "Access & Security", description: "Adjust access level and security protocols.", Icon: LockKeyhole, color: "text-violet-600" },
];

const operationalHowSteps: SimpleItem[] = [
  { title: "1. Detect", description: "Event, alert or operator input is detected.", Icon: Monitor },
  { title: "2. Determine", description: "System determines the required operational state.", Icon: BrainCircuit },
  { title: "3. Orchestrate", description: "All connected systems receive the new state.", Icon: SlidersHorizontal },
  { title: "4. Execute", description: "Systems adjust in real time and in sync.", Icon: SquareCheckBig },
  { title: "5. Confirm", description: "Operator sees a ready environment and acts.", Icon: UserCheck },
];

const incidentModeExamples = [
  { title: "Instant Lighting Change", description: "Reduces glare, improves contrast and operator focus.", image: "/assets/generated/operational-state/incident-lighting-change.webp" },
  { title: "Displays Reconfigure", description: "Critical systems move to primary screens.", image: "/assets/generated/operational-state/incident-displays-reconfigure.webp" },
  { title: "Consoles Adjust", description: "Height, tilt and favorites load automatically.", image: "/assets/generated/operational-state/incident-consoles-adjust.webp" },
  { title: "Rooms Activated", description: "Bridge to expert teams and command centers.", image: "/assets/generated/operational-state/incident-rooms-activated.webp" },
  { title: "Recording Starts", description: "Audio, video and system logs capture automatically.", image: "/assets/generated/operational-state/incident-recording-starts.webp" },
  { title: "HVAC Boosts", description: "Fresh air increases, temperature optimized.", image: "/assets/generated/operational-state/incident-hvac-boosts.webp" },
];

const performanceEnvironmentCallouts: (SimpleItem & { color: string; className: string })[] = [
  { title: "Temperature", description: "Maintains thermal comfort for sustained focus.", Icon: Thermometer, color: "text-control-warm", className: "left-[4%] top-[31%]" },
  { title: "Humidity", description: "Keeps humidity in the ideal range for comfort and health.", Icon: Droplets, color: "text-blue-600", className: "left-[3%] bottom-[15%]" },
  { title: "Lighting", description: "Maintains ideal brightness and reduces eye strain.", Icon: Sun, color: "text-green-500", className: "left-[39%] top-[4%]" },
  { title: "Air Quality", description: "Keeps air fresh and oxygen levels optimal.", Icon: FastForward, color: "text-green-500", className: "right-[9%] top-[15%]" },
  { title: "Noise Control", description: "Holds background sound inside the target range.", Icon: Radio, color: "text-violet-600", className: "right-[4%] top-[44%]" },
  { title: "Ergonomics", description: "Supports posture, reach and comfort through intelligent adjustments.", Icon: Armchair, color: "text-orange-500", className: "right-[2%] bottom-[12%]" },
];

const performanceMetrics = [
  { title: "CO2 Level", unit: "ppm", value: "612", status: "Good", target: "Target: < 800 ppm", color: "text-green-600" },
  { title: "Temperature", unit: "°C", value: "23.4", status: "Optimal", target: "Target: 22 - 24 °C", color: "text-blue-600" },
  { title: "Humidity", unit: "%", value: "45", status: "Optimal", target: "Target: 40 - 60 %", color: "text-blue-600" },
  { title: "Noise Level", unit: "dBA", value: "46", status: "Good", target: "Target: < 55 dBA", color: "text-violet-600" },
  { title: "Light Level", unit: "lux", value: "520", status: "Optimal", target: "Target: 300 - 750 lux", color: "text-orange-500" },
  { title: "Air Quality (AQI)", unit: "", value: "38", status: "Good", target: "Target: < 50 AQI", color: "text-green-600" },
];

const proactiveAdjustments: SimpleItem[] = [
  { title: "Increase Fresh Air", description: "Airflow increased to reduce CO2 levels.", Icon: FastForward, color: "text-green-500" },
  { title: "Slight Cooling", description: "Temperature adjusted by -0.5 °C for comfort.", Icon: Thermometer, color: "text-control-warm" },
  { title: "Humidity Balanced", description: "Humidity balanced to maintain optimal range.", Icon: Droplets, color: "text-blue-600" },
  { title: "Noise Dampened", description: "Background noise reduced through acoustic tuning.", Icon: Radio, color: "text-violet-600" },
  { title: "Lighting Tuned", description: "Brightness and color temperature adjusted to reduce strain.", Icon: Sun, color: "text-green-500" },
  { title: "Posture Support", description: "Console and chair settings optimized for ergonomics.", Icon: Armchair, color: "text-orange-500" },
];

const operatorImpactItems: SimpleItem[] = [
  { title: "Better Focus", description: "Fewer distractions. Higher concentration.", Icon: Target, color: "text-green-600" },
  { title: "Less Fatigue", description: "Comfort that reduces physical and mental load.", Icon: Users, color: "text-green-600" },
  { title: "Improved Alertness", description: "Environment tuned to maintain vigilance.", Icon: Eye, color: "text-green-600" },
  { title: "Health & Well-being", description: "Cleaner air, better posture and a safer environment.", Icon: ShieldCheck, color: "text-green-600" },
  { title: "Higher Performance", description: "Optimal conditions lead to better decisions.", Icon: TrendingUp, color: "text-green-600" },
];

const personalizedProfiles = [
  {
    name: "Arjun - Supervisor",
    focus: "Situational Awareness",
    image: "/assets/source-pdf/p24_054_1418x798.jpg",
    color: "from-blue-700 to-blue-500",
    accent: "text-blue-600",
    settings: [
      { title: "Console Height", value: "1100 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "3 + Video Wall", Icon: Monitor },
      { title: "Lighting", value: "Cool White 5000K", Icon: Sun },
      { title: "Dashboard", value: "Operations Overview", Icon: Grid2X2 },
      { title: "Chair", value: "Lumbar High Support", Icon: Armchair },
    ],
  },
  {
    name: "Meera - Process Operator",
    focus: "Detail & Accuracy",
    image: "/assets/source-pdf/p20_050_1781x1016.jpg",
    color: "from-green-700 to-green-500",
    accent: "text-green-600",
    settings: [
      { title: "Console Height", value: "950 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "4 (Detail)", Icon: Monitor },
      { title: "Lighting", value: "Neutral White 4000K", Icon: Sun },
      { title: "Dashboard", value: "Process Control", Icon: Grid2X2 },
      { title: "Chair", value: "Balanced Support", Icon: Armchair },
    ],
  },
  {
    name: "Karan - Maintenance Engineer",
    focus: "Diagnostics & Maintenance",
    image: "/assets/source-pdf/p23_053_1418x798.jpg",
    color: "from-violet-700 to-violet-500",
    accent: "text-violet-600",
    settings: [
      { title: "Console Height", value: "1040 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "2 + Tools", Icon: Monitor },
      { title: "Lighting", value: "Warm White 3500K", Icon: Sun },
      { title: "Dashboard", value: "Maintenance Status", Icon: Grid2X2 },
      { title: "Chair", value: "Forward Tilt Support", Icon: Armchair },
    ],
  },
];

const personalizationFactors: SimpleItem[] = [
  { title: "Console Position", description: "Height, tilt and reach adjusted for comfort and posture.", Icon: UserCheck, color: "text-blue-600" },
  { title: "Monitor Layout", description: "Screens return to the operator's preferred arrangement.", Icon: Monitor, color: "text-blue-600" },
  { title: "Applications & Tools", description: "Frequently used apps, shortcuts and tools load automatically.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "Lighting Preference", description: "Brightness and color temperature set to individual preference.", Icon: Sun, color: "text-blue-600" },
  { title: "Audio & Acoustics", description: "Volume zones and acoustic settings personalized.", Icon: Radio, color: "text-blue-600" },
  { title: "Seat & Ergonomics", description: "Chair position, lumbar support and posture settings restored.", Icon: Armchair, color: "text-blue-600" },
  { title: "Dashboard View", description: "Information hierarchy and widgets tailored to current tasks.", Icon: Monitor, color: "text-blue-600" },
  { title: "Environment", description: "Temperature and air settings optimized for individual comfort.", Icon: Sun, color: "text-blue-600" },
];

const switchUserSteps: (SimpleItem & { color: string })[] = [
  { title: "Identify", description: "User recognized automatically.", Icon: ScanFace, color: "text-blue-600" },
  { title: "Restore", description: "Settings restored in seconds.", Icon: SlidersHorizontal, color: "text-blue-600" },
  { title: "Ready", description: "Workspace ready before you sit.", Icon: SquareCheckBig, color: "text-blue-600" },
];

const consistencyItems = [
  "Reduces setup time",
  "Restores preferred views",
  "Minimizes errors",
  "Normalizes comfort settings",
  "Supports role-specific dashboards",
  "Supports long-shift performance",
];

const beyondDeskCategories: (SimpleItem & { color: string })[] = [
  { title: "People", description: "", Icon: UserCheck, color: "text-blue-600" },
  { title: "Systems", description: "", Icon: Server, color: "text-cyan-600" },
  { title: "Equipment", description: "", Icon: Gauge, color: "text-green-600" },
  { title: "Environment", description: "", Icon: Leaf, color: "text-green-600" },
  { title: "Infrastructure", description: "", Icon: Building2, color: "text-orange-500" },
  { title: "Energy", description: "", Icon: Zap, color: "text-violet-600" },
  { title: "Security", description: "", Icon: ShieldCheck, color: "text-violet-600" },
  { title: "Operations", description: "", Icon: TrendingUp, color: "text-blue-600" },
];

const intelligencePipeline: (SimpleItem & { color: string })[] = [
  { title: "Data", description: "Continuous collection from across the room", Icon: Database, color: "text-blue-600" },
  { title: "Insight", description: "AI analyzes patterns and detects changes", Icon: Sun, color: "text-green-600" },
  { title: "Action", description: "Automated or guided actions are triggered", Icon: Target, color: "text-orange-500" },
  { title: "Value", description: "Signals become operational evidence", Icon: TrendingUp, color: "text-violet-600" },
];

const roomUnderstandsItems: (SimpleItem & { color: string; bullets: string[] })[] = [
  { title: "People & Presence", description: "", Icon: UserCheck, color: "text-blue-600", bullets: ["Who is in the room", "Shift patterns", "Workload distribution", "Comfort preferences"] },
  { title: "Systems & Applications", description: "", Icon: Monitor, color: "text-cyan-600", bullets: ["Application usage", "Alarm & event frequency", "System performance", "Integration health"] },
  { title: "Equipment & Assets", description: "", Icon: Gauge, color: "text-green-600", bullets: ["Asset status & uptime", "Component load", "Lifecycle & age", "Utilization trends"] },
  { title: "Environment & Wellness", description: "", Icon: Leaf, color: "text-green-600", bullets: ["CO2, temperature, humidity", "Noise, lighting, air quality", "Comfort & ergonomics", "Wellness impact"] },
  { title: "Infrastructure", description: "", Icon: Building2, color: "text-orange-500", bullets: ["Power, UPS, HVAC status", "Network & bandwidth", "Room capacity", "Physical infrastructure"] },
  { title: "Energy & Sustainability", description: "", Icon: Zap, color: "text-violet-600", bullets: ["Energy consumption", "Efficiency trends", "Carbon footprint", "Cost insights"] },
  { title: "Operations & Performance", description: "", Icon: TrendingUp, color: "text-blue-600", bullets: ["SLA & response times", "Incident trends", "Decision timelines", "Operational KPIs"] },
];

const intelligenceGlanceItems = [
  { title: "Occupancy", value: "18", suffix: "/ 24", caption: "People in room", side: "Live Trend", Icon: Users, color: "text-green-600" },
  { title: "Energy Usage", value: "68.4", suffix: " kWh", caption: "Today", side: "12% vs yesterday", Icon: Zap, color: "text-blue-600" },
  { title: "Equipment Health", value: "96", suffix: "%", caption: "Healthy", side: "3 Warnings", Icon: Activity, color: "text-green-600" },
  { title: "Console Utilization", value: "82", suffix: "%", caption: "Average", side: "6 Underused", Icon: Armchair, color: "text-orange-500" },
  { title: "Environment Index", value: "91", suffix: "/ 100", caption: "Optimal", side: "All good Conditions", Icon: Thermometer, color: "text-violet-600" },
  { title: "Security Status", value: "Secure", suffix: "", caption: "All systems normal", side: "0 Alerts", Icon: ShieldCheck, color: "text-blue-600" },
];

const digitalTwinIntroItems: (SimpleItem & { color: string })[] = [
  { title: "One live model. Everything connected.", description: "Accurate. Dynamic. Unified.", Icon: Box, color: "text-blue-600" },
  { title: "See the whole room. Understand every detail.", description: "From infrastructure to human.", Icon: RefreshCw, color: "text-green-600" },
  { title: "Simulate. Test. Optimize.", description: "Decisions powered by real-time insights.", Icon: ChartNoAxesColumnIncreasing, color: "text-orange-500" },
  { title: "Plan for today. Prepare for tomorrow.", description: "Lower risk. Higher resilience.", Icon: ShieldCheck, color: "text-violet-600" },
];

const digitalTwinCallouts = [
  { title: "Video Walls", lines: ["Status: Online", "Health: 98%"], Icon: Monitor, color: "text-blue-600", className: "left-[8%] top-[11%]" },
  { title: "HVAC System", lines: ["Temp: 22.4°C", "Status: Normal"], Icon: Wind, color: "text-blue-600", className: "right-[26%] top-[7%]" },
  { title: "Power System", lines: ["Load: 68%", "Status: Normal"], Icon: Zap, color: "text-blue-600", className: "right-[1%] top-[31%]" },
  { title: "Operator Console 12", lines: ["User: Meera", "Status: Active"], Icon: Armchair, color: "text-blue-600", className: "left-[2%] top-[60%]" },
  { title: "Access Control", lines: ["Doors: Locked", "Status: Secure"], Icon: LockKeyhole, color: "text-blue-600", className: "right-[4%] top-[76%]" },
];

const digitalTwinMetrics: (SimpleItem & { value: string; color: string })[] = [
  { title: "Total Assets", value: "1,248", description: "All systems connected", Icon: Box, color: "text-blue-600" },
  { title: "System Health", value: "97%", description: "Operational excellence", Icon: Activity, color: "text-green-600" },
  { title: "Alerts", value: "3", description: "Requires attention", Icon: Bell, color: "text-orange-500" },
  { title: "Active Users", value: "24", description: "Across all shifts", Icon: UserCheck, color: "text-violet-600" },
  { title: "Energy Usage", value: "68.4 kWh", description: "Optimized performance", Icon: Zap, color: "text-blue-600" },
];

const digitalTwinRepresents: (SimpleItem & { color: string })[] = [
  { title: "People", description: "Operators, roles, shifts, workloads", Icon: UserCheck, color: "text-blue-600" },
  { title: "Assets", description: "Consoles, displays, servers, devices", Icon: Box, color: "text-green-600" },
  { title: "Systems", description: "Power, HVAC, lighting, network, AV", Icon: Settings, color: "text-orange-500" },
  { title: "Environment", description: "Temperature, humidity, air quality, noise", Icon: Thermometer, color: "text-violet-600" },
  { title: "Processes", description: "Workflows, procedures, alerts, actions", Icon: Workflow, color: "text-cyan-600" },
  { title: "Data", description: "Live data, history, insights & trends", Icon: Database, color: "text-control-warm" },
];

const digitalTwinEnables: (SimpleItem & { color: string })[] = [
  { title: "Real-time Visibility", description: "Live status of every asset, system and space.", Icon: Eye, color: "text-blue-600" },
  { title: "Predict & Prevent", description: "AI detects issues before they impact operations.", Icon: BrainCircuit, color: "text-green-600" },
  { title: "Scenario Simulation", description: "Test layouts, workflows and events virtually.", Icon: Box, color: "text-orange-500" },
  { title: "Change Impact Analysis", description: "Understand the outcome before implementation.", Icon: ChartNoAxesColumnIncreasing, color: "text-violet-600" },
  { title: "Continuous Optimization", description: "AI learns and improves room performance.", Icon: RefreshCw, color: "text-cyan-600" },
];

const digitalTwinDecisionBullets = [
  "Data-driven planning",
  "Faster response",
  "Lower downtime",
  "Higher efficiency",
  "Increased safety",
  "Future-ready operations",
];

const AICapabilityCallouts: (SimpleItem & { color: string; className: string })[] = [
  { title: "Anticipates", description: "Detects rising temperature trend and prepares cooling recommendation.", Icon: BrainCircuit, color: "text-blue-600", className: "left-[3%] bottom-[6%]" },
  { title: "Summarizes", description: "Condenses critical alerts and system health into actionable insights.", Icon: Sun, color: "text-violet-600", className: "left-[35%] bottom-[6%]" },
  { title: "Recommends", description: "Suggests optimal response based on historical and real-time data.", Icon: Sparkles, color: "text-orange-500", className: "right-[3%] bottom-[6%]" },
  { title: "Automates", description: "Executes routine tasks and workflows without manual input.", Icon: Gauge, color: "text-green-600", className: "left-[6%] bottom-[6%]" },
  { title: "Learns", description: "Adapts to your team's preferences and room operating style.", Icon: SlidersHorizontal, color: "text-cyan-600", className: "right-[6%] bottom-[6%]" },
];

const AIBehindScenesItems: (SimpleItem & { color: string })[] = [
  { title: "Continuously observes systems, people and environment", description: "", Icon: Eye, color: "text-blue-600" },
  { title: "Understands patterns, context and intent", description: "", Icon: BrainCircuit, color: "text-violet-600" },
  { title: "Anticipates needs and suggests the best next actions", description: "", Icon: Sun, color: "text-orange-500" },
  { title: "Delivers insights and automation seamlessly", description: "", Icon: MessageSquare, color: "text-green-600" },
  { title: "Learns and adapts to your room, your team, your way", description: "", Icon: RefreshCw, color: "text-cyan-600" },
];

const AIOperatorSupportItems: (SimpleItem & { color: string })[] = [
  { title: "Smart Context", description: "Understands who you are, what you're doing and what matters most.", Icon: UserCheck, color: "text-blue-600" },
  { title: "Proactive Alerts", description: "Not just alarms - early warnings with the likely impact and options.", Icon: Bell, color: "text-orange-500" },
  { title: "Instant Answers", description: "Find anything - documents, data, procedures - instantly.", Icon: Target, color: "text-green-600" },
  { title: "Decision Support", description: "Weighs scenarios and recommends the best course of action.", Icon: Users, color: "text-violet-600" },
  { title: "Workload Balance", description: "Monitors operator load and helps balance attention.", Icon: Activity, color: "text-cyan-600" },
  { title: "Privacy First", description: "Works within your permissions. Your data stays secure.", Icon: LockKeyhole, color: "text-orange-500" },
];

const AICanDoItems: (SimpleItem & { color: string })[] = [
  { title: "Natural language Q&A", description: "Ask anything. Get instant answers.", Icon: MessageSquare, color: "text-violet-600" },
  { title: "Cross-system intelligence", description: "Connects data across all systems.", Icon: Network, color: "text-blue-600" },
  { title: "Anomaly detection", description: "Spots issues humans might miss.", Icon: Target, color: "text-control-warm" },
  { title: "Predictive insights", description: "Sees what's coming - so you're always ready.", Icon: ChartNoAxesColumnIncreasing, color: "text-green-600" },
  { title: "Workflow automation", description: "Handles routine tasks so you can focus.", Icon: Settings, color: "text-orange-500" },
];

const AIOutcomeItems = [
  "Faster awareness",
  "Better decisions",
  "Lower workload",
  "Fewer surprises",
  "Higher reliability",
  "Happier teams",
];

type TintedItem = SimpleItem & { color: string; tint: string };

/** Shared panel treatment for the software-defined scene. */
const CARD =
  "overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]";

const softwareDefineSteps: TintedItem[] = [
  { title: "Configure", description: "Design layouts, workflows & views", Icon: Settings, color: "text-blue-600", tint: "bg-blue-50" },
  { title: "Deploy", description: "Push to any system. Anywhere.", Icon: CloudUpload, color: "text-green-600", tint: "bg-green-50" },
  { title: "Adapt", description: "AI adapts in real time to changes", Icon: Gauge, color: "text-orange-500", tint: "bg-orange-50" },
  { title: "Evolve", description: "Update, expand, improve-seamlessly", Icon: TrendingUp, color: "text-violet-600", tint: "bg-violet-50" },
];

const softwareDefinedByItems: TintedItem[] = [
  { title: "Dynamic Layouts", description: "Create, save and switch layouts in seconds.", Icon: LayoutDashboard, color: "text-blue-600", tint: "bg-blue-50" },
  { title: "Unified Platform", description: "People, systems, data and devices-all connected.", Icon: Network, color: "text-green-600", tint: "bg-green-50" },
  { title: "Open & Integrable", description: "Works with your existing systems. Open APIs, open future.", Icon: CloudCog, color: "text-violet-600", tint: "bg-violet-50" },
  { title: "Secure by Design", description: "Role-based access, encryption and audit-ready.", Icon: LockKeyhole, color: "text-orange-500", tint: "bg-orange-50" },
  { title: "Future-Ready", description: "Continuous updates. New features. Zero disruption.", Icon: RefreshCw, color: "text-cyan-600", tint: "bg-cyan-50" },
];

const softwarePlatformFlow: (SimpleItem & { color: string })[] = [
  { title: "People", description: "Roles, Teams, Permissions", Icon: Users, color: "text-blue-600" },
  { title: "Data", description: "All sources. One model.", Icon: Database, color: "text-green-600" },
  { title: "Applications", description: "Dashboards, Apps, Workflows", Icon: MonitorCog, color: "text-violet-600" },
  { title: "OnePWS Platform", description: "", Icon: Cloud, color: "text-blue-600" },
  { title: "Devices", description: "AV, IT, IoT, Control Systems", Icon: Network, color: "text-orange-500" },
  { title: "Intelligence", description: "AI/ML, Analytics, Predictions", Icon: TrendingUp, color: "text-violet-600" },
  { title: "Actions", description: "Alerts, Automation, Response", Icon: ShieldCheck, color: "text-green-600" },
];

const deployAnywhereItems: (SimpleItem & { color: string })[] = [
  { title: "On-Premise", description: "", Icon: Building2, color: "text-blue-600" },
  { title: "Private Cloud", description: "", Icon: Cloud, color: "text-green-600" },
  { title: "Hybrid Cloud", description: "", Icon: CloudUpload, color: "text-violet-600" },
  { title: "Multi-Site", description: "", Icon: Globe, color: "text-orange-500" },
  { title: "Edge Locations", description: "", Icon: RadioTower, color: "text-cyan-600" },
];

const softwareBenefits = [
  { value: "70%", label: "Faster deployment of new layouts", Icon: Clock3, color: "text-blue-600" },
  { value: "40%", label: "Lower total cost of ownership", Icon: TrendingDown, color: "text-green-600" },
  { value: "99.9%", label: "System availability & reliability", Icon: ShieldCheck, color: "text-violet-600" },
  { value: "2X", label: "Operator productivity & situational clarity", Icon: ChartNoAxesColumnIncreasing, color: "text-orange-500" },
];

const builtForChangeItems = [
  "Add new screens or systems in minutes",
  "Scale from one operator to thousands",
  "Support hybrid & multi-site operations",
  "Reduce engineering time & cost",
  "Always aligned with your mission",
];

export function IntelligentRoomReferenceScene({ chapter }: { chapter: Chapter }) {
  if (chapter.id === "room-recognizes-you") {
    return <RoomRecognizesYouScene chapter={chapter} />;
  }

  if (chapter.id === "console-understands-task") {
    return <ConsoleUnderstandsTaskScene chapter={chapter} />;
  }

  if (chapter.id === "information-comes-operator") {
    return <InformationComesOperatorScene chapter={chapter} />;
  }

  if (chapter.id === "operational-state-room-responds") {
    return <OperationalStateRoomRespondsScene chapter={chapter} />;
  }

  if (chapter.id === "room-protects-human-performance") {
    return <RoomProtectsHumanPerformanceScene chapter={chapter} />;
  }

  if (chapter.id === "personal-workspace") {
    return <PersonalWorkspaceScene chapter={chapter} />;
  }

  if (chapter.id === "intelligence-beyond-desk") {
    return <IntelligenceBeyondDeskScene chapter={chapter} />;
  }

  if (chapter.id === "digital-twin-control-room") {
    return <DigitalTwinControlRoomScene chapter={chapter} />;
  }

  if (chapter.id === "ai-silent-assistant") {
    return <AiSilentAssistantScene chapter={chapter} />;
  }

  if (chapter.id === "software-defined-control-room") {
    return <SoftwareDefinedControlRoomScene chapter={chapter} />;
  }

  return null;
}

function RoomRecognizesYouScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "room-recognizes-you-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7cqw] top-[9.85cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[15.15cqh] grid grid-cols-[minmax(17.5rem,0.43fr)_minmax(42rem,1.13fr)_minmax(18rem,0.44fr)] grid-rows-[minmax(0,1fr)_16.2cqh] gap-x-[1.05cqw] gap-y-[1.25cqh]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2cqw] top-[2.4cqh]">
              <h1 className="text-[clamp(2.5rem,3.35cqw,4.7rem)] font-bold leading-[1.02] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">The Room</span>
                <span className="block text-control-warm">Recognizes</span>
                <span className="block">You.</span>
              </h1>
              <div className="mt-[1.2cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.5cqh] max-w-[18rem] text-[clamp(0.78rem,0.9cqw,1.02rem)] font-medium leading-[1.48] text-slate-800 md:text-[0.8cqw]">
                The moment you enter, the control room identifies you and prepares your workspace exactly the way you like it.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[35cqh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15cqw] py-[1.55cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase tracking-normal text-control-warm">No Cards. No Passwords. No Delays.</h2>
              <div className="mt-[2.1cqh] grid grid-cols-3">
                {securityItems.map((item, index) => (
                  <SecurityCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="relative min-h-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/generated/room-recognizes-you-operator-welcome.png" />
            <RecognitionOverlay />
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 gap-[0.55cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            {readinessItems.map((item) => (
              <ReadinessCard item={item} key={item.title} />
            ))}
          </motion.aside>

          <motion.section animate={{ opacity: 1, y: 0 }} className="relative col-span-2 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.4cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.74, delay: 0.2, ease }}>
            <h2 className="text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase tracking-normal text-control-text">Your Experience. Ready Before You Sit.</h2>
            <div className="mt-[1.6cqh] grid grid-cols-[repeat(6,minmax(0,1fr))] items-start">
              {experienceSteps.map((item, index) => (
                <ExperienceStep index={index} item={item} key={item.title} />
              ))}
            </div>
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.45cqw] py-[2.2cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.74, delay: 0.24, ease }}>
            <Quote aria-hidden="true" className="text-control-warm" size={38} strokeWidth={1.55} />
            <p className="relative z-10 mt-[0.25cqh] max-w-[13rem] text-[clamp(0.82rem,0.95cqw,1.08rem)] font-medium leading-[1.34] text-slate-800">
              The shift doesn't begin after login.
            </p>
            <p className="relative z-10 mt-[1cqh] max-w-[13rem] text-[clamp(0.9rem,1.05cqw,1.2rem)] font-semibold leading-[1.25] text-control-warm">
              It begins the moment you enter.
            </p>
            <img alt="" className="pointer-events-none absolute bottom-[-0.3rem] right-[-0.4rem] w-[64%] object-contain opacity-80" src="/assets/brand/dotted-wave-pattern.webp" />
          </motion.section>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2cqh] h-[7.7cqh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[8rem_repeat(5,minmax(0,1fr))] items-center">
            <div className="pr-[1cqw]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold uppercase leading-tight text-control-text">What This Means for You</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.8rem] bg-control-warm" />
            </div>
            {outcomeItems.map((item, index) => (
              <OutcomeCell index={index} item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function ConsoleUnderstandsTaskScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "console-understands-task-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[18.2cqh] grid grid-cols-[minmax(17rem,0.43fr)_minmax(43rem,1.1fr)_minmax(18rem,0.44fr)] gap-[1.05cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2cqw] top-[1cqh]">
              <h1 className="text-[clamp(2.25rem,3.1cqw,4.4rem)] font-bold leading-[1.05] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">The Console</span>
                <span className="block text-control-warm">Understands</span>
                <span className="block">the Task.</span>
              </h1>
              <div className="mt-[1.35cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.5cqh] max-w-[19rem] text-[clamp(0.78rem,0.9cqw,1.02rem)] font-medium leading-[1.48] text-slate-800 md:text-[0.8cqw]">
                Task modes bring the right controls, displays and guidance forward without making the operator rebuild the workspace.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[31.2cqh] grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-[0.85cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.45cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[3.7rem] w-[3.7rem] place-items-center rounded-full border border-control-warm/22 bg-white/58 text-control-warm">
                <BrainCircuit aria-hidden="true" size={36} strokeWidth={1.45} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[clamp(0.68rem,0.78cqw,0.9rem)] font-semibold leading-tight text-control-text">Smart Context Awareness</strong>
                <span className="mt-1 block text-[clamp(0.56rem,0.66cqw,0.77rem)] font-medium leading-[1.3] text-slate-800">
                  Reads activity, priority and system state so each mode starts with the right operating context.
                </span>
              </span>
            </section>

            <section className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.35cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold uppercase leading-tight text-control-warm">It Understands:</h2>
              <div className="mt-[1.25cqh] grid grid-cols-3 gap-y-[1.05cqh]">
                {consoleUnderstandsItems.map((item, index) => (
                  <MiniUnderstandingCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[20.6cqh_minmax(0,1fr)_16.5cqh] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1cqw] py-[1.35cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase tracking-normal text-control-text">One Console. Multiple Modes.</h2>
              <div className="mt-[1cqh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="mt-[1.35cqh] grid grid-cols-4">
                {consoleModeItems.map((item, index) => (
                  <ConsoleModeCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_1rem_2.5rem_rgb(15_23_42/0.08)]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p24_054_1418x798.jpg" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,rgb(239_68_68/0.18),transparent_24%),linear-gradient(180deg,rgb(15_23_42/0.04),rgb(15_23_42/0.18))]" />
              <div className="absolute bottom-[8%] left-[51%] h-[8.3rem] w-[12rem] rounded-[0.4rem] border border-cyan-300/28 bg-slate-950/62 p-[0.7rem] shadow-[0_0_2.2rem_rgb(37_99_235/0.28)] backdrop-blur-md">
                <div className="grid grid-cols-3 gap-1">
                  {["Context", "Priority", "Display", "Comms", "SOP", "Alerts"].map((label, index) => (
                    <span className={`rounded border px-1 py-1 text-center text-[0.48rem] font-semibold uppercase ${index === 1 ? "border-control-warm/70 bg-control-warm/22 text-red-100" : "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"}`} key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.68rem,0.8cqw,0.94rem)] font-semibold uppercase tracking-normal text-control-text">The Console Adapts Automatically</h2>
              <div className="mt-[1.15cqh] grid grid-cols-5 items-start">
                {consoleAdaptSteps.map((item, index) => (
                  <ConsoleAdaptStep index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[0.42fr_0.58fr] gap-[0.8cqw]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 px-[1cqw] py-[1.65cqh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.12)]">
              <p className="text-[clamp(0.58rem,0.66cqw,0.76rem)] font-medium uppercase tracking-normal text-slate-200">Good Evening,</p>
              <p className="mt-2 text-[clamp(0.95rem,1.15cqw,1.35rem)] font-semibold">ARJUN</p>
              <div className="mt-[3cqh] flex items-center justify-between text-[0.62rem] text-slate-300">
                <span>Today's Summary</span>
                <span>x</span>
              </div>
              <div className="mt-[1.6cqh] space-y-[1.8cqh]">
                {[
                  ["All Systems Normal", "✓", "bg-emerald-500"],
                  ["Open Alerts", "2", "bg-control-warm"],
                  ["Pending Actions", "5", "bg-blue-500"],
                  ["Team Messages", "3", "bg-blue-600"],
                ].map(([label, value, color]) => (
                  <div className="flex items-center justify-between gap-2 text-[clamp(0.52rem,0.62cqw,0.72rem)] font-medium" key={label}>
                    <span className="min-w-0 truncate text-slate-200">{label}</span>
                    <span className={`grid h-[1.25rem] w-[1.25rem] place-items-center rounded-full ${color} text-[0.55rem] font-semibold text-white`}>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.45cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold uppercase leading-tight text-control-warm">Benefits</h2>
              <div className="mt-[1cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.25cqh] divide-y divide-slate-200/90">
                {consoleBenefits.map((item) => (
                  <BenefitCell item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2cqh] h-[10.7cqh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[14rem_repeat(5,minmax(0,1fr))] items-center gap-[0.75cqw]">
            <div>
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold uppercase leading-[1.35] text-control-text">Example Transition:<br />From Monitor to Incident Mode</h2>
            </div>
            {transitionItems.map((item, index) => (
              <TransitionFrame index={index} item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function InformationComesOperatorScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "information-comes-operator-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[17.95cqh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(43rem,0.96fr)_minmax(23rem,0.55fr)] gap-[1.05cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2cqw] top-[0.7cqh]">
              <h1 className="text-[clamp(2.15rem,2.85cqw,4.1rem)] font-bold leading-[1.04] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">Information</span>
                <span className="block text-control-warm">Comes</span>
                <span className="block">to the</span>
                <span className="block">Operator<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35cqh] max-w-[17.4rem] text-[clamp(0.68rem,0.79cqw,0.92rem)] font-medium leading-[1.42] text-slate-800 md:text-[0.8cqw]">
                Critical context moves to the active display automatically, reducing screen-hunting during time-sensitive work.
              </p>
            </div>

            <section className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold uppercase leading-tight text-control-text">Intelligent Information Delivery</h2>
              <div className="mt-[0.75cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.1cqh] space-y-[1cqh]">
                {informationDeliveryItems.map((item) => (
                  <InfoDeliveryCell item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_19.1cqh] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="absolute inset-x-[1cqw] top-[1.35cqh] z-10">
                <h2 className="text-[clamp(0.68rem,0.8cqw,0.94rem)] font-semibold uppercase tracking-normal text-control-text">Critical Information. Delivered Proactively.</h2>
                <div className="mt-[0.8cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              </div>
              <img alt="" className="absolute inset-x-0 bottom-0 h-[88%] w-full object-cover" src="/assets/source-pdf/p23_053_1418x798.jpg" />
              <div className="absolute inset-x-0 bottom-0 h-[88%] bg-[linear-gradient(90deg,rgb(15_23_42/0.34),rgb(15_23_42/0.02)_42%,rgb(15_23_42/0.32))]" />
              <InfoHeroCallout className="left-[2.7%] top-[15.5%]" color="text-control-warm" Icon={AlertTriangle} title="Incident Alert" text="Power subsystem alarm in Zone 3. Recommended action displayed." />
              <InfoHeroCallout className="left-[2.7%] top-[47%]" color="text-blue-400" Icon={TrendingUp} title="Situation Summary" text="Live overview of impact, assets and response status." />
              <InfoHeroCallout className="right-[1.6%] top-[16%]" color="text-green-400" Icon={TrendingUp} title="Predictive Insight" text="AI suggests potential network congestion in 15 minutes." />
              <InfoHeroCallout className="right-[1.6%] top-[48.5%]" color="text-amber-400" Icon={ClipboardList} title="Action Guidance" text="Relevant SOP and checklist automatically displayed." />
              <span className="absolute left-[23%] top-[30%] h-px w-[16%] border-t border-dashed border-white/85" />
              <span className="absolute left-[28%] top-[61%] h-[18%] w-[11%] border-l border-b border-dashed border-white/85" />
              <span className="absolute right-[21%] top-[30%] h-px w-[18%] border-t border-dashed border-white/85" />
              <span className="absolute right-[24%] top-[61%] h-[18%] w-[13%] border-r border-b border-dashed border-white/85" />
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.66rem,0.78cqw,0.9rem)] font-semibold uppercase tracking-normal text-control-text">How It Works</h2>
              <div className="mt-[0.75cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.05cqh] grid grid-cols-5">
                {informationHowItWorks.map((item, index) => (
                  <InfoHowStep index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[0.52fr_0.48fr] gap-[0.8cqw]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <div className="grid min-h-0 grid-rows-[1fr_1fr] gap-[1.05cqh]">
              <ComparisonPanel accent="text-control-warm" items={manualSearchItems} title="Before: Manual Search" />
              <ComparisonPanel accent="text-green-500" items={proactiveDeliveryItems} title="After: Proactive Delivery" />
            </div>
            <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_24.6cqh] gap-[1.05cqh]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 px-[1cqw] py-[1.35cqh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.12)]">
                <h2 className="text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold uppercase leading-tight text-white">Benefits</h2>
                <div className="mt-[0.8cqh] h-[2px] w-[1.7rem] bg-control-warm" />
                <div className="mt-[1cqh] divide-y divide-slate-700/90">
                  {consoleBenefits.map((item) => (
                    <BenefitCell dark item={item} key={item.title} />
                  ))}
                </div>
              </section>
              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.3cqw] py-[1.7cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <Quote aria-hidden="true" className="text-control-warm" size={32} strokeWidth={1.55} />
                <p className="mt-[0.3cqh] max-w-[13rem] text-[clamp(0.72rem,0.83cqw,0.96rem)] font-medium leading-[1.34] text-control-text">
                  Information doesn't wait for you to find it. It finds you.
                </p>
                <p className="mt-[1cqh] text-[clamp(0.72rem,0.86cqw,1rem)] font-semibold leading-[1.25] text-control-warm">Context arrives before the search begins.</p>
                <span className="pointer-events-none absolute bottom-0 right-0 h-[5.7rem] w-[5.7rem] opacity-10 [background-image:radial-gradient(circle,rgb(37_99_235/0.65)_1px,transparent_1px)] [background-size:7px_7px]" />
              </section>
            </div>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2cqh] h-[10.45cqh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[12.5rem_repeat(6,minmax(0,1fr))] items-start gap-[0.75cqw]">
            <div>
              <h2 className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-[1.35] text-control-text">Examples of Intelligent Information Delivery</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
            </div>
            {intelligentExamples.map((item) => (
              <InfoExampleCard item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function OperationalStateRoomRespondsScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "operational-state-room-responds-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6cqh] grid min-h-0 grid-cols-[minmax(12.5rem,0.27fr)_minmax(0,1fr)_minmax(13rem,0.29fr)] gap-[0.95cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-[1cqh] overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="min-w-0 pt-[0.45cqh]">
              <h1 className="text-[clamp(1.45rem,2.05cqw,2.75rem)] font-bold leading-[1.01] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">One Operational</span>
                <span className="block">State.</span>
                <span className="block text-control-warm">The Entire</span>
                <span className="block text-control-warm">Room Responds.</span>
              </h1>
              <div className="mt-[0.9cqh] h-[2px] w-[1.8rem] bg-control-warm" />
              <p className="mt-[1cqh] max-w-[15.4rem] text-[clamp(0.56rem,0.68cqw,0.78rem)] font-medium leading-[1.28] text-slate-800 md:text-[0.72cqw]">
                One command or one event changes the operational state - and the entire environment adapts instantly.
              </p>
            </div>

            <section className="grid min-w-0 grid-cols-[3.35rem_minmax(0,1fr)] items-center gap-[0.72cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.82cqw] py-[0.9cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[3rem] w-[3rem] place-items-center rounded-full border border-control-warm/22 bg-white/58 text-control-warm">
                <Network aria-hidden="true" size={26} strokeWidth={1.45} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[clamp(0.54rem,0.64cqw,0.74rem)] font-semibold leading-tight text-control-text">Everything works as one.</strong>
                <span className="mt-0.5 block text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold leading-tight text-control-warm">Seamlessly. Instantly. Reliably.</span>
              </span>
            </section>

            <section className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-800/70 bg-slate-950 px-[0.85cqw] py-[1.2cqh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.14)]">
              <h2 className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight text-white">Intelligent Information Delivery</h2>
              <div className="mt-[0.65cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[2.7cqh] flex min-h-0 flex-col justify-between divide-y divide-slate-700/80">
                {informationDeliveryItems.map((item) => (
                  <InfoDeliveryCell dark item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[8.2cqh_minmax(0,1fr)_16.2cqh_20.2cqh] gap-[0.85cqh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="grid grid-cols-5 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              {operationalStates.map((item, index) => (
                <OperationalStateChip index={index} item={item} key={item.title} />
              ))}
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[0_1rem_2.5rem_rgb(15_23_42/0.08)]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/generated/operational-state/room-responds-hero.webp" />
            </section>

            <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[0.8cqw] py-[0.78cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-center text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight text-control-text">The Entire Room Responds</h2>
              <div className="mt-[0.55cqh] grid min-h-0 grid-cols-9 items-center">
                {roomResponseSystems.map((item, index) => (
                  <RoomResponseSystem index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <div className="grid min-h-0 grid-cols-[0.45fr_0.55fr] gap-[0.7cqw]">
              <section className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.72cqw] py-[0.78cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.6cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">How It Works</h2>
                <div className="mt-[0.45cqh] h-[2px] w-[1.4rem] bg-control-warm" />
                <div className="mt-[0.45cqh] grid min-h-0 grid-cols-5 items-center">
                  {operationalHowSteps.map((item, index) => (
                    <OperationalHowStep index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.72cqw] py-[0.78cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.6cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">Example: Incident Mode Activated</h2>
                <div className="mt-[0.58cqh] grid grid-cols-6 gap-[0.45cqw]">
                  {incidentModeExamples.map((item, index) => (
                    <IncidentExampleFrame index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_17cqh] gap-[0.85cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <ComparisonPanel accent="text-control-warm" items={manualSearchItems} title="Before: Manual Search" />
            <ComparisonPanel accent="text-green-500" items={stateResponseOutcomes} title="After: Proactive Delivery" />
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Quote aria-hidden="true" className="text-control-warm" size={26} strokeWidth={1.55} />
              <p className="relative z-10 mt-[0.35cqh] max-w-[12.5rem] text-[clamp(0.58rem,0.68cqw,0.8rem)] font-medium leading-[1.42] text-control-text">
                One state change.
                <span className="block">Every system. Every second.</span>
                <span className="block">One purpose: <span className="font-semibold text-control-warm">Operational Excellence.</span></span>
              </p>
              <img alt="" className="pointer-events-none absolute bottom-[-0.3rem] right-[-0.4rem] w-[66%] object-contain opacity-55" src="/assets/brand/dotted-wave-pattern-warm.webp" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function RoomProtectsHumanPerformanceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "room-protects-human-performance-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.75cqw] top-[9.25cqh] bottom-[6.85cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[2.8cqh] grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-[1.1cqh]">
          <div className="grid min-h-0 grid-cols-[minmax(14rem,0.22fr)_minmax(0,0.6fr)_minmax(15.6rem,0.22fr)] gap-[1.05cqw]">
            <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_auto] content-start gap-[1.25cqh] overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
              <div className="min-w-0 pt-[0.45cqh]">
                <h1 className="text-[clamp(1.85rem,2.35cqw,3.25rem)] font-bold leading-[1.02] tracking-normal text-control-text md:text-[3.0cqw]">
                  <span className="block">The Room</span>
                  <span className="block text-control-warm">Protects</span>
                  <span className="block">Human</span>
                  <span className="block">Performance<span className="text-control-warm">.</span></span>
                </h1>
                <div className="mt-[0.95cqh] h-[2px] w-[2rem] bg-control-warm" />
                <p className="mt-[1cqh] max-w-[18.6rem] text-[clamp(0.7rem,0.8cqw,0.94rem)] font-medium leading-[1.38] text-slate-800 md:text-[0.8cqw]">
                  A high-performance operator needs the right environment to stay alert, focused and comfortable - every second, every shift.
                </p>
              </div>

              <section className="grid min-w-0 grid-cols-[4.1rem_minmax(0,1fr)] items-center gap-[0.78cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <span className="grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-control-warm/20 bg-white/58 text-control-warm">
                  <ShieldCheck aria-hidden="true" size={39} strokeWidth={1.35} />
                </span>
                <p className="min-w-0 text-[clamp(0.56rem,0.64cqw,0.76rem)] font-medium leading-[1.28] text-slate-800">
                  The room continuously monitors and intelligently adjusts.<br />
                  <span className="font-semibold text-control-warm">Proactively protects.</span>
                </p>
              </section>
            </motion.aside>

            <motion.main animate={{ opacity: 1, y: 0 }} className="min-h-0" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
              <section className="relative h-full overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[0_1rem_2.5rem_rgb(15_23_42/0.08)]">
                <img alt="Operators working in an environmentally optimized global operations control room" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/generated/human-performance/human-performance-control-room.png" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.32),rgb(15_23_42/0.01)_48%,rgb(15_23_42/0.16))]" />
                <div className="absolute left-[5%] top-[8%] text-[clamp(0.8rem,0.95cqw,1.1rem)] font-semibold leading-[1.45] text-white drop-shadow-[0_0.5rem_1.2rem_rgb(15_23_42/0.5)]">
                  <p>Always Watching.</p>
                  <p>Always Adjusting.</p>
                  <p>Always Optimizing.</p>
                </div>
                <span className="absolute left-[17%] top-[8%] h-[55%] w-[42%] rounded-full border border-dashed border-white/70" />
                {performanceEnvironmentCallouts.map((item) => (
                  <PerformanceCallout item={item} key={item.title} />
                ))}
              </section>
            </motion.main>

            <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
              <section className="relative grid grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <RightCardPattern />
                <h2 className="relative text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase leading-tight text-control-text">Operator Impact</h2>
                <div className="mt-[0.8cqh] h-[2px] w-[1.7rem] bg-control-warm" />
                <div className="relative mt-[2cqh] grid content-between gap-[1.35cqh] pb-[0.6cqh]">
                  {operatorImpactItems.map((item) => (
                    <ImpactCell item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </motion.aside>
          </div>

          <motion.section animate={{ opacity: 1, y: 0 }} className="grid w-full grid-cols-[minmax(14rem,0.22fr)_minmax(0,0.6fr)_minmax(15.6rem,0.22fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.74, delay: 0.2, ease }}>
            <div className="col-span-2 grid min-w-0 grid-rows-[20.6cqh_13.7cqh] gap-[1cqh]">
              <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.68rem,0.76cqw,0.92rem)] font-semibold uppercase leading-tight text-control-text">Continuous Monitoring. Real-Time Insights.</h2>
                <div className="mt-[0.75cqh] grid min-h-0 grid-cols-[repeat(6,minmax(0,1fr))_8.25rem] gap-[0.55cqw]">
                  {performanceMetrics.map((item, index) => (
                    <MetricCard index={index} item={item} key={item.title} />
                  ))}
                  <ComfortIndexCard />
                </div>
              </section>

              <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.68rem,0.76cqw,0.92rem)] font-semibold uppercase leading-tight text-control-text">Proactive Adjustments. Before You Notice.</h2>
                <div className="mt-[0.75cqh] grid min-h-0 grid-cols-6 items-center">
                  {proactiveAdjustments.map((item, index) => (
                    <AdjustmentCell index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>

            <div className="grid min-w-0 grid-rows-2 gap-[1cqh]">
              <QuotePanel emphasis="people protect operations." text="When the environment supports people," />
              <QuotePanel Icon={Activity} emphasis="stronger." text="A smarter environment makes every operator" />
            </div>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function PersonalWorkspaceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "personal-workspace-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6cqh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(52rem,1fr)_minmax(17rem,0.34fr)] gap-[1.05cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2cqw] top-[0.7cqh]">
              <h1 className="text-[clamp(1.85rem,2.35cqw,3.3rem)] font-bold leading-[1.07] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">Every Operator</span>
                <span className="block">Gets a</span>
                <span className="block text-control-warm">Personal</span>
                <span className="block text-control-warm">Workspace.</span>
              </h1>
              <div className="mt-[1.2cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35cqh] max-w-[17rem] text-[clamp(0.66rem,0.76cqw,0.88rem)] font-medium leading-[1.42] text-slate-800 md:text-[0.8cqw]">
                Every operator can start from a known profile: preferred height, screens, apps, audio, lighting and dashboard context.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[34.2cqh] grid grid-cols-[4.8rem_minmax(0,1fr)] items-center gap-[0.8cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.45cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <UserCheck aria-hidden="true" className="text-control-warm" size={52} strokeWidth={1.35} />
              <p className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-medium leading-[1.36] text-slate-800">
                Personalization reduces setup variation and keeps repeated shifts consistent.
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[40.7cqh_17.2cqh_15.3cqh_5.7cqh] gap-[1cqh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[1cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68cqw,0.8rem)] font-semibold uppercase leading-tight text-control-text">Same Room. Different People. Personalized for Excellence.</h2>
              <div className="mt-[0.75cqh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="mt-[0.95cqh] grid h-[34.3cqh] grid-cols-3 gap-[0.8cqw]">
                {personalizedProfiles.map((profile) => (
                  <OperatorProfileCard key={profile.name} profile={profile} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight text-control-text">Continuous Monitoring. Real-Time Insights.</h2>
              <div className="mt-[0.78cqh] grid grid-cols-[repeat(6,minmax(0,1fr))_8rem] gap-[0.65cqw]">
                {performanceMetrics.map((item, index) => (
                  <MetricCard index={index} item={item} key={item.title} />
                ))}
                <ComfortIndexCard />
              </div>
            </section>

            <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_24rem] gap-[0.8cqw]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.78cqw] py-[0.85cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.61cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">What Personalizes for Each Operator</h2>
                <div className="mt-[0.55cqh] h-[2px] w-[1.6rem] bg-control-warm" />
                <div className="mt-[0.7cqh] grid grid-cols-8">
                  {personalizationFactors.map((item, index) => (
                    <PersonalizationFactor index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.85cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.61cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">Switch User. Instantly Adapted.</h2>
                <div className="mt-[0.55cqh] h-[2px] w-[1.6rem] bg-control-warm" />
                <div className="mt-[0.8cqh] grid grid-cols-3">
                  {switchUserSteps.map((item, index) => (
                    <SwitchUserStep index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>

            <section className="grid grid-cols-[18rem_repeat(6,minmax(0,1fr))] items-center overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.65cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.52rem,0.62cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">Consistent Experience. Every Shift. Every Time.</h2>
              {consistencyItems.map((item) => (
                <ConsistencyChip key={item} label={item} />
              ))}
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_20cqh] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold uppercase leading-tight text-control-text">Operator Impact</h2>
              <div className="mt-[0.8cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.15cqh] space-y-[2.05cqh]">
                {operatorImpactItems.map((item) => (
                  <ImpactCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <QuotePanel emphasis="before work begins." text="The workspace is ready" />
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function IntelligenceBeyondDeskScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "intelligence-beyond-desk-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[2.4cqh] grid grid-cols-[minmax(15rem,0.33fr)_minmax(52rem,1fr)_minmax(18rem,0.36fr)] grid-rows-[minmax(0,1fr)_23.2cqh] gap-x-[1.05cqw] gap-y-[1cqh]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2cqw] top-[0.8cqh]">
              <h1 className="text-[clamp(2rem,2.55cqw,3.58rem)] font-bold leading-[1.07] tracking-normal text-control-text md:text-[3.5cqw]">
                <span className="block">Intelligence</span>
                <span className="block text-control-warm">Beyond</span>
                <span className="block">the Desk<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35cqh] max-w-[16.8rem] text-[clamp(0.68rem,0.79cqw,0.92rem)] font-medium leading-[1.42] text-slate-800 md:text-[0.8cqw]">
                Room data extends into occupancy, energy, assets, environment and infrastructure, giving operators a measurable operating picture.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[40.8cqh] grid grid-cols-[4.8rem_minmax(0,1fr)] items-center gap-[0.8cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.45cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Cpu aria-hidden="true" className="text-control-warm" size={52} strokeWidth={1.35} />
              <p className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-medium leading-[1.36] text-slate-800">
                <span className="font-semibold text-control-text">One Connected Intelligence Layer</span><br />
                Unifies people, systems, assets and the environment.
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="min-h-0" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="h-full overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold uppercase leading-tight text-control-text">Everything Connected. Everything Measured.</h2>
              <div className="mt-[0.75cqh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="relative mt-[0.7cqh] h-[37.7cqh] overflow-hidden">
                <div className="absolute inset-x-[1cqw] top-0 grid grid-cols-8">
                  {beyondDeskCategories.map((item) => (
                    <BeyondDeskCategory item={item} key={item.title} />
                  ))}
                </div>
                <div className="absolute inset-x-[1.2cqw] bottom-0 top-[7.4cqh] overflow-hidden rounded-[0.5rem]">
                  <img alt="" className="absolute inset-0 h-full w-full object-contain object-center" src="/assets/source-pdf/Futuristic High-Tech Operations Center.png" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.08),rgb(255_255_255/0.26)_74%,rgb(255_255_255/0.58))]" />
                  <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white/82 to-transparent" />
                </div>
              </div>

              <div className="mx-[1cqw] grid h-[7.5cqh] grid-cols-4 overflow-hidden rounded-[0.52rem] border border-slate-200/86 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
                {intelligencePipeline.map((item, index) => (
                  <PipelineCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="row-span-2 grid min-h-0 grid-rows-[minmax(0,1fr)_18.3cqh] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.15cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68cqw,0.8rem)] font-semibold uppercase leading-tight text-control-text">Key Intelligence at a Glance</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.8cqh] grid gap-[0.72cqh]">
                {intelligenceGlanceItems.map((item) => (
                  <IntelligenceGlanceCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15cqw] py-[1.45cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Quote aria-hidden="true" className="text-control-warm" size={36} strokeWidth={1.55} />
              <p className="mt-[0.1cqh] max-w-[14rem] text-[clamp(0.68rem,0.8cqw,0.94rem)] font-medium leading-[1.34] text-control-text">
                You can't improve what you don't measure.
              </p>
              <p className="mt-[0.55cqh] max-w-[14rem] text-[clamp(0.7rem,0.82cqw,0.96rem)] font-medium leading-[1.28] text-control-text">
                The intelligent room <span className="font-semibold text-control-warm">measures what matters.</span>
              </p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(15_23_42/0.75)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>

          <motion.section animate={{ opacity: 1, y: 0 }} className="col-span-2 col-start-1 row-start-2 min-w-0" initial={false} transition={{ duration: 0.74, delay: 0.2, ease }}>
            <section className="h-full overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.75cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight text-control-text">What the Room Understands</h2>
              <div className="mt-[0.65cqh] h-[2px] w-[1.6rem] bg-control-warm" />
              <div className="mt-[0.7cqh] grid grid-cols-7 gap-[0.55cqw]">
                {roomUnderstandsItems.map((item) => (
                  <RoomUnderstandsCard item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function DigitalTwinControlRoomScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "digital-twin-control-room-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[2.4cqh] grid grid-cols-[minmax(15rem,0.31fr)_minmax(50rem,1fr)_minmax(18rem,0.34fr)] grid-rows-[minmax(0,1fr)_18cqh] gap-x-[1.05cqw] gap-y-[1.05cqh]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-[1.6cqh]" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="min-w-0 pt-[0.55cqh]">
              <h1 className="text-[clamp(1.78rem,2.4cqw,3.35rem)] font-bold leading-[1.07] tracking-normal text-control-text md:text-[2cqw]">
                <span className="block">A Digital Twin</span>
                <span className="block">of the Complete</span>
                <span className="block text-control-warm">Control Room.</span>
              </h1>
              <div className="mt-[1.25cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35cqh] max-w-[17.4rem] text-[clamp(0.66rem,0.77cqw,0.9rem)] font-medium leading-[1.44] text-slate-800 md:text-[0.8cqw]">
                A real-time digital replica of your entire control room - people, assets, systems and environment - kept in sync, continuously learning, and always ready to optimize performance.
              </p>
            </div>

            <div className="grid content-start gap-[0.95cqh]">
              {digitalTwinIntroItems.map((item) => (
                <DigitalTwinIntroCard item={item} key={item.title} />
              ))}
            </div>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="min-h-0" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="grid h-full grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72cqw,0.86rem)] font-semibold uppercase leading-tight text-control-text">Digital Twin - Live, Dynamic, Always in Sync</h2>
              <div className="mt-[0.9cqh] flex items-center gap-[0.62cqw]">
                {["3D Overview", "Asset View", "Systems View", "Environment View", "People View"].map((tab, index) => (
                  <DigitalTwinTab active={index === 0} key={tab} label={tab} />
                ))}
              </div>

              <div className="relative mt-[1cqh] min-h-0 overflow-hidden rounded-[0.55rem]">
                <img alt="Isometric digital twin view of a complete control room with live asset, HVAC, power, console and access-control readouts" className="absolute inset-0 h-full w-full object-contain object-center" src="/assets/source-pdf/Modern Operations Center Infographic.png" />
              </div>

              <div className="mt-[1cqh] grid grid-cols-5 gap-[0.55cqw]">
                {digitalTwinMetrics.map((item) => (
                  <DigitalTwinMetric item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="grid grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.15cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-control-text">What the Digital Twin Enables</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid auto-rows-fr divide-y divide-slate-200/80">
                {digitalTwinEnables.map((item) => (
                  <TwinEnablementCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.15cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-control-text">Digital Twin Accuracy</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.15cqh] grid grid-cols-[7.1rem_minmax(0,1fr)] items-center gap-[0.8cqw]">
                <div className="grid h-[6.6rem] w-[6.6rem] place-items-center rounded-full bg-[conic-gradient(#16a34a_0_99%,#e2e8f0_99%_100%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.75)]">
                  <span className="grid h-[5.05rem] w-[5.05rem] place-items-center rounded-full bg-white">
                    <strong className="text-[1.32rem] font-semibold leading-none text-control-text">99.2%</strong>
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[clamp(0.58rem,0.68cqw,0.8rem)] font-semibold leading-tight text-control-text">Model Accuracy</h3>
                  <p className="mt-[0.5cqh] text-[clamp(0.5rem,0.59cqw,0.7rem)] font-medium leading-[1.24] text-slate-800">Live sync with real-world data</p>
                  <p className="mt-[0.95cqh] text-[clamp(0.48rem,0.57cqw,0.66rem)] font-semibold leading-tight text-control-text">Last Updated</p>
                  <p className="mt-0.5 text-[clamp(0.48rem,0.57cqw,0.66rem)] font-medium leading-tight text-slate-700">10:18:32 AM</p>
                </div>
              </div>
            </section>
          </motion.aside>

          <motion.section animate={{ opacity: 1, y: 0 }} className="col-span-3 col-start-1 row-start-2 grid min-w-0 grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.74, delay: 0.2, ease }}>
            <section className="grid h-full grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.8cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-control-text">What the Twin Represents</h2>
              <div className="mt-[0.6cqh] h-[2px] w-[1.6rem] bg-control-warm" />
              <div className="mt-[0.8cqh] grid grid-cols-6 items-center">
                {digitalTwinRepresents.map((item, index) => (
                  <TwinRepresentationCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.53fr)_minmax(0,0.47fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="grid grid-rows-[auto_auto_minmax(0,1fr)] px-[0.8cqw] py-[0.95cqh]">
                <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-control-text">Built for Better Decisions</h2>
                <div className="mt-[0.6cqh] h-[2px] w-[1.6rem] bg-control-warm" />
                <ul className="mt-[0.75cqh] grid content-between">
                  {digitalTwinDecisionBullets.map((bullet) => (
                    <li className="grid grid-cols-[1.1rem_minmax(0,1fr)] items-center gap-[0.35cqw] text-[clamp(0.7rem,0.56cqw,0.66rem)] font-medium leading-tight text-control-text" key={bullet}>
                      <CircleCheck aria-hidden="true" className="text-green-600" size={14} strokeWidth={2} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-0 overflow-hidden bg-slate-950">
                <img alt="Operator reviewing a digital twin model of the control room" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p22_052_1421x800.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.14),rgb(37_99_235/0.18))]" />
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function AiSilentAssistantScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "ai-silent-assistant-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#f0f3f8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[2.4cqh] grid grid-cols-[minmax(15rem,0.31fr)_minmax(50rem,1fr)_minmax(18rem,0.34fr)] gap-[1.05cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-[1.35cqh]" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="min-w-0 pt-[0.55cqh]">
              <h1 className="text-[clamp(2rem,2.75cqw,3.85rem)] font-bold leading-[1.03] tracking-normal text-control-text md:text-[2.5cqw]">
                <span className="block">AI as the</span>
                <span className="block text-violet-600">Silent</span>
                <span className="block text-violet-600">Assistant<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25cqh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35cqh] max-w-[17.6rem] text-[clamp(0.68rem,0.79cqw,0.92rem)] font-medium leading-[1.43] text-slate-800 md:text-[0.8cqw]">
                Always listening. Never interrupting. AI works quietly in the background - understanding context, anticipating needs, and delivering the right information at the right moment.
              </p>
            </div>

            <section className="grid grid-cols-[4.4rem_minmax(0,1fr)] items-center gap-[0.75cqw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.35cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-[0.62rem] border border-violet-100 bg-violet-50 text-violet-600">
                <BrainCircuit aria-hidden="true" size={34} strokeWidth={1.45} />
              </span>
              <p className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold leading-[1.34] text-control-text">
                Proactive. Private.<br />
                Personalized.<br />
                Powerful.
              </p>
            </section>

            <section className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95cqw] py-[1.05cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-violet-600">AI Works Behind the Scenes</h2>
              <div className="mt-[0.65cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.85cqh] grid auto-rows-fr divide-y divide-slate-200/80">
                {AIBehindScenesItems.map((item) => (
                  <AIBehindItem item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_18cqh_8.6cqh] gap-[1cqh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.85cqw] py-[1cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="grid grid-cols-3 gap-[0.85cqw]">
                {AICapabilityCallouts.slice(0, 3).map((item) => (
                  <AICapabilityCard item={item} key={item.title} />
                ))}
              </div>

              <div className="relative mt-[1cqh] min-h-0 overflow-hidden rounded-[0.5rem] bg-slate-950">
                <img alt="Operators working with an AI assistant in a connected control room" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/source-pdf/Futuristic Blue Operations Center.png" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_23_42/0.22),rgb(15_23_42/0.04)_42%,rgb(15_23_42/0.42))]" />

                <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="0.2" x1="18" x2="41" y1="0" y2="27" />
                  <line stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="0.2" x1="50" x2="50" y1="0" y2="13" />
                  <line stroke="#fb923c" strokeOpacity="0.5" strokeWidth="0.2" x1="82" x2="59" y1="0" y2="27" />
                  <line stroke="#4ade80" strokeOpacity="0.5" strokeWidth="0.2" x1="25" x2="42" y1="82" y2="57" />
                  <line stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="0.2" x1="75" x2="58" y1="82" y2="57" />
                </svg>

                <div className="absolute left-1/2 top-[41%] grid h-[13.6rem] w-[13.6rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white [text-shadow:0_0.15rem_1rem_rgb(2_6_23/0.95)]">
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(2_6_23/0.78)_0%,rgb(2_6_23/0.5)_54%,transparent_74%)]" />

                  <span className="text-center">
                    <strong className="block text-[clamp(1.7rem,2.15cqw,2.45rem)] font-semibold leading-none">AI</strong>
                    <span className="mt-[1cqh] block text-[clamp(0.74rem,0.86cqw,1rem)] font-semibold leading-tight">Silent. Smart.</span>
                    <span className="mt-[0.7cqh] block text-[clamp(0.7rem,0.82cqw,0.96rem)] font-semibold leading-tight">Always with you.</span>
                  </span>
                </div>

                {AICapabilityCallouts.slice(3).map((item) => (
                  <AICapabilityCallout item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[1cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72cqw,0.86rem)] font-semibold uppercase leading-tight text-violet-600">How AI Supports Every Operator</h2>
              <div className="mt-[0.9cqh] grid grid-cols-6">
                {AIOperatorSupportItems.map((item, index) => (
                  <AISupportCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.1fr] items-center overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Quote aria-hidden="true" className="mx-auto text-control-warm" size={26} strokeWidth={1.55} />
              <p className="border-r border-slate-200/90 px-[0.8cqw] text-center text-[clamp(0.7rem,0.64cqw,0.75rem)] font-medium leading-tight text-control-text">AI doesn&apos;t replace operators.</p>
              <p className="border-r border-slate-200/90 px-[0.8cqw] text-center text-[clamp(0.7rem,0.64cqw,0.75rem)] font-medium leading-tight text-control-text">AI empowers them.</p>
              <p className="border-r border-slate-200/90 px-[0.8cqw] text-center text-[clamp(0.7rem,0.64cqw,0.75rem)] font-medium leading-tight text-control-text">You stay in control.</p>
              <p className="px-[0.8cqw] text-center text-[clamp(0.54rem,0.64cqw,0.75rem)] font-medium leading-tight text-control-text">AI makes control effortless.</p>
              <Quote aria-hidden="true" className="mx-auto rotate-180 text-control-warm" size={26} strokeWidth={1.55} />
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto_auto] gap-[1.05cqh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.15cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-violet-600">What AI Can Do</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid auto-rows-fr divide-y divide-slate-200/80">
                {AICanDoItems.map((item) => (
                  <AICanDoCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.15cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7cqw,0.84rem)] font-semibold uppercase leading-tight text-violet-600">The Outcome</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid gap-[0.85cqh]">
                {AIOutcomeItems.map((item) => (
                  <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-[0.45cqw]" key={item}>
                    <CircleCheck aria-hidden="true" className="text-green-600" size={17} strokeWidth={1.9} />
                    <span className="text-[clamp(0.7rem,0.62cqw,0.72rem)] font-medium leading-tight text-control-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative grid grid-cols-[3.6rem_minmax(0,1fr)] items-start gap-[0.7cqw] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1cqw] py-[1.3cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[2.9rem] w-[2.9rem] place-items-center rounded-[0.62rem] border border-violet-100 bg-violet-50 text-violet-600">
                <BrainCircuit aria-hidden="true" size={30} strokeWidth={1.45} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[clamp(0.62rem,0.74cqw,0.88rem)] font-semibold leading-tight text-violet-600">AI You Can Trust</strong>
                <span className="mt-[0.55cqh] block text-[clamp(0.5rem,0.59cqw,0.7rem)] font-medium leading-[1.32] text-control-text">
                  Transparent. Explainable.<br />
                  Secure. Built for control rooms.<br />
                  Built for you.
                </span>
              </span>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(124_58_237/0.8)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function SoftwareDefinedControlRoomScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "software-defined-control-room-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eff3f8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6cqh] grid grid-cols-[0.40fr_1fr_0.38fr] grid-rows-[minmax(0,1fr)_17.6cqh_14.4cqh] gap-[0.95cqh_1.05cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="flex min-h-0 flex-col pl-[0.2cqw] pt-[0.5cqh]" initial={false} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[3cqw] font-bold leading-[1.08] tracking-normal text-control-text">
              <span className="block">The</span>
              <span className="block whitespace-nowrap text-red-600">Software Defined</span>
              <span className="block">Control Room<span className="text-control-warm">.</span></span>
            </h1>
            <div className="mt-[1.35cqh] h-[2px] w-[1.67cqw] bg-control-warm" />
            <p className="mt-[1.6cqh] max-w-[17.5cqw] text-[0.79cqw] font-medium leading-[1.45] text-slate-800">
              Modern control rooms are no longer built around hardware-they are defined by software.
            </p>
            <p className="mt-[2.2cqh] max-w-[17.5cqw] text-[0.79cqw] font-medium leading-[1.45] text-slate-800">
              Flexible. Scalable. Intelligent. Your room, your way-today and ready for tomorrow.
            </p>

            <section className={`mt-[2.9cqh] grid grid-cols-[3.3cqw_minmax(0,1fr)] items-center gap-[0.7cqw] px-[1cqw] py-[1.5cqh] ${CARD}`}>
              <span className="grid size-[2.6cqw] place-items-center rounded-[0.55rem] bg-violet-50">
                <Layers aria-hidden="true" className="h-[1.5cqw] w-[1.5cqw] text-violet-600" strokeWidth={1.5} />
              </span>
              <p className="text-[0.78cqw] font-medium leading-[1.42] text-control-text">
                <span className="font-semibold">One platform.</span><br />
                Any layout. Any scale.<br />
                Always up to date.
              </p>
            </section>
          </motion.aside>

          <motion.div animate={{ opacity: 1, y: 0 }} className="col-span-2 grid min-h-0" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <div className="grid min-h-0 grid-cols-[1fr_0.38fr] gap-[1.05cqw]">
              <section className={`grid min-h-0 grid-rows-[auto_minmax(0,1fr)] ${CARD}`}>
                <div className="px-[1cqw] py-[1.25cqh]">
                  <h2 className="text-[0.72cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">Software Defines. You Decide.</h2>
                  <div className="mt-[1.3cqh] grid grid-cols-4">
                    {softwareDefineSteps.map((item, index) => (
                      <SoftwareDefineStepV2 index={index} item={item} key={item.title} />
                    ))}
                  </div>
                </div>
                <div className="relative min-h-0 overflow-hidden">
                  <img
                    alt="Software-defined control room with a curved video wall and reconfigurable operator consoles."
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    draggable={false}
                    src="/assets/generated/rooms/software-defined-control-room.png"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.10),rgb(255_255_255/0.02)_55%,rgb(255_255_255/0.14))]" />
                </div>
              </section>

              <section className={`grid min-h-0 grid-rows-[auto_minmax(0,1fr)] px-[1cqw] py-[1.15cqh] ${CARD}`}>
                <h2 className="text-[0.78cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">Defined by Software. Not Hardware.</h2>
                <div className="mt-[0.7cqh] grid min-h-0 grid-rows-5 divide-y divide-slate-200/90">
                  {softwareDefinedByItems.map((item) => (
                    <SoftwareDefinedByCell item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>
          </motion.div>

          <section className={`col-span-2 row-start-2 grid min-h-0 grid-rows-[auto_minmax(0,1fr)] px-[1.55cqw] py-[3.1cqh] ${CARD}`}>
              <h2 className="text-[0.9cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text mb-3">Software Powering Everything</h2>
              <div className="mt-[0.7cqh] grid min-h-0 grid-cols-7 items-start ">
                {softwarePlatformFlow.map((item, index) => (
                  <SoftwarePlatformNodeV2 index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className={`col-start-3 row-start-2 grid min-h-0 grid-rows-[auto_minmax(0,1fr)] px-[1cqw] py-[1.15cqh] ${CARD}`}>
              <h2 className="text-[0.9cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">Built for Change</h2>
              <div className="mt-[0.5cqh] grid min-h-0 content-between">
                {builtForChangeItems.map((item) => (
                  <div className="grid grid-cols-[1.35cqw_minmax(0,1fr)] items-center gap-[0.5cqw]" key={item}>
                    <CircleCheck aria-hidden="true" className="h-[0.95cqw] w-[0.95cqw] text-violet-600" strokeWidth={1.7} />
                    <span className="text-[0.6cqw] font-medium leading-tight text-control-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="col-span-3 row-start-3 grid min-h-0 grid-cols-[minmax(0,0.49fr)_minmax(0,1fr)_minmax(0,0.38fr)] gap-[1.05cqw]">
              <section className={`grid min-h-0 grid-rows-[auto_minmax(0,1fr)] px-[0.9cqw] py-[1.15cqh] ${CARD}`}>
                <h2 className="text-[0.9cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">Deploy Anywhere</h2>
                <div className="grid min-h-0 grid-cols-5 items-center">
                  {deployAnywhereItems.map((item) => (
                    <DeployAnywhereCell item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className={`grid min-h-0 grid-rows-[auto_minmax(0,1fr)] px-[0.9cqw] py-[1.15cqh] ${CARD}`}>
                <h2 className="text-[0.9cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">Real Benefits</h2>
                <div className="grid min-h-0 grid-cols-4 items-center">
                  {softwareBenefits.map((item, index) => (
                    <SoftwareBenefitCell index={index} item={item} key={item.value} />
                  ))}
                </div>
              </section>

              <section className={`relative grid min-h-0 content-center px-[1.25cqw] py-[1.15cqh] ${CARD}`}>
                <Quote aria-hidden="true" className="mb-[0.7cqh] h-[1.9cqw] w-[1.9cqw] text-violet-600" fill="currentColor" strokeWidth={1.4} />
                <p className="text-[0.92cqw] font-medium leading-[1.55] text-control-text">
                  You don't just build the room.<br />
                  You <span className="font-semibold text-blue-600">define</span> it in software.<br />
                  And it <span className="font-semibold text-violet-600">evolves</span> with you.
                </p>
                <span className="pointer-events-none absolute bottom-0 right-0 h-[5.6rem] w-[5.6rem] opacity-[0.12] [background-image:radial-gradient(circle,rgb(124_58_237/0.9)_1px,transparent_1px)] [background-size:7px_7px]" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-[5.4rem] w-[5.4rem] rounded-tl-full border-l border-t border-blue-200/70" />
              </section>
            </div>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
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
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function RecognitionOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute right-[4%] top-[10%] h-[64%] w-[14%] border border-dashed border-white/70 drop-shadow-[0_0_0.35rem_rgb(15_23_42/0.45)]" />
      {["top-[20%]", "top-[33%]", "top-[47%]", "top-[61%]", "top-[75%]"].map((top, index) => (
        <span className={`absolute right-[-2%] ${top} h-px w-[20%] border-t border-dashed border-white/70 drop-shadow-[0_0_0.35rem_rgb(15_23_42/0.45)]`} key={index} />
      ))}
    </div>
  );
}

function MiniUnderstandingCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.55cqw] text-center ${index % 3 ? "border-l border-slate-200/90" : ""} ${index > 2 ? "border-t border-slate-200/90 pt-[1cqh]" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={28} strokeWidth={1.5} />
      <p className="mx-auto mt-[0.75cqh] max-w-[6.4rem] text-[clamp(0.5rem,0.59cqw,0.68rem)] font-medium leading-[1.22] text-control-text">{item.title}</p>
    </div>
  );
}

function InfoDeliveryCell({ dark = false, item }: { dark?: boolean; item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-[0.52cqw] py-[1.46cqh]">
      <Icon aria-hidden="true" className="text-control-warm" size={22} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.46rem,0.56cqw,0.66rem)] font-semibold leading-tight ${dark ? "text-white" : "text-control-text"}`}>{item.title}</strong>
        <span className={`mt-0.5 block text-[clamp(0.42rem,0.49cqw,0.58rem)] font-medium leading-[1.12] ${dark ? "text-slate-200" : "text-slate-800"}`}>{item.description}</span>
      </span>
    </div>
  );
}

function OperationalStateChip({ item, index }: { item: SimpleItem & { color: string; active?: boolean }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-[0.5cqw] px-[0.7cqw] ${index ? "border-l border-slate-200/90" : ""} ${item.active ? "bg-control-warm/6 ring-1 ring-inset ring-control-warm/22" : ""}`}>
      <Icon aria-hidden="true" className={item.color} size={28} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.99rem,0.58cqw,0.68rem)] font-semibold uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.81rem,0.49cqw,0.58rem)] font-medium leading-[1.08] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function RoomResponseSystem({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-h-0 min-w-0 place-items-center px-[0.42cqw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="mx-auto grid h-[1.8rem] w-[1.8rem] place-items-center">
        <Icon aria-hidden="true" className={item.color ?? "text-control-warm"} size={27} strokeWidth={1.55} />
      </span>
      <h3 className="mt-[0.4cqh] text-[clamp(0.70rem,0.54cqw,0.64rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.32cqh] max-w-[6.4rem] text-[clamp(0.68rem,0.46cqw,0.55rem)] font-medium leading-[1.16] text-slate-700">{item.description}</p>
    </div>
  );
}

function OperationalHowStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative grid min-h-0 min-w-0 place-items-center px-[0.34cqw] text-center">
      {index ? <span className="absolute left-[-0.24cqw] top-[1.5rem] text-[1.05rem] font-light text-control-text">→</span> : null}
      <span className="mx-auto grid h-[2.9rem] w-[2.9rem] place-items-center rounded-full border border-slate-200/90 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.4rem_1rem_rgb(15_23_42/0.05)]">
        <Icon aria-hidden="true" className={index === 1 ? "text-amber-500" : index === 3 ? "text-green-500" : index === 4 ? "text-blue-600" : "text-control-warm"} size={25} strokeWidth={1.5} />
      </span>
      <h3 className="mt-[0.4cqh] text-[clamp(0.70rem,0.52cqw,0.62rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.3cqh] max-w-[6rem] text-[clamp(0.68rem,0.44cqw,0.52rem)] font-medium leading-[1.16] text-slate-700">{item.description}</p>
    </div>
  );
}

function IncidentExampleFrame({ item, index }: { item: { title: string; description: string; image: string }; index: number }) {
  return (
    <article className="relative min-w-0">
      {index ? <span className="absolute left-[-0.38cqw] top-[2.5rem] text-[1rem] font-light text-control-warm">›</span> : null}
      <div className="relative h-[5.9rem] overflow-hidden rounded-[0.34rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} />
      </div>
      <h3 className="mt-[0.5cqh] text-[clamp(0.70rem,0.44cqw,0.52rem)] font-semibold leading-tight text-control-warm">{item.title}</h3>
      {/* <p className="mt-[0.26cqh] text-[clamp(0.33rem,0.4cqw,0.47rem)] font-medium leading-[1.14] text-slate-700">{item.description}</p> */}
    </article>
  );
}

function PerformanceCallout({ item }: { item: SimpleItem & { color: string; className: string } }) {
  const Icon = item.Icon;
  return (
    <div className={`absolute z-20 grid w-[12rem] grid-cols-[2.65rem_minmax(0,1fr)] items-center gap-[0.62rem] rounded-[0.5rem] border border-slate-200 bg-white px-[0.76rem] py-[0.66rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.18)] ${item.className}`}>
      <Icon aria-hidden="true" className={item.color} size={31} strokeWidth={1.5} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.45rem,0.52cqw,0.61rem)] font-medium leading-[1.22] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function MetricCard({ item, index }: { item: (typeof performanceMetrics)[number]; index: number }) {
  return (
    <article className="relative grid min-h-0 min-w-0 grid-rows-[auto_auto_auto_1fr_auto] overflow-hidden rounded-[0.45rem] border border-slate-200/86 bg-white/64 px-[0.58cqw] py-[0.62cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <div className="flex min-w-0 items-start justify-between gap-1.5">
        <h3 className="text-[clamp(0.52rem,0.6cqw,0.7rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</h3>
        <span className="shrink-0 text-[clamp(0.48rem,0.54cqw,0.64rem)] font-medium leading-tight text-slate-700">{item.unit}</span>
      </div>
      <p className={`mt-[0.32cqh] text-[clamp(1.42rem,1.18cqw,1.58rem)] font-semibold leading-none ${item.color}`}>{item.value}</p>
      <p className={`mt-[0.2cqh] text-[clamp(0.52rem,0.58cqw,0.68rem)] font-semibold leading-tight ${item.status === "Good" ? "text-green-600" : "text-slate-700"}`}>{item.status}</p>
      <MiniSparkline color={item.color} index={index} />
      <p className="mt-[0.18cqh] text-[clamp(0.48rem,0.54cqw,0.64rem)] font-medium leading-tight text-control-text">{item.target}</p>
    </article>
  );
}

function MiniSparkline({ color, index }: { color: string; index: number }) {
  const stroke = color.includes("green") ? "#16a34a" : color.includes("blue") ? "#2563eb" : color.includes("violet") ? "#7c3aed" : "#f97316";
  const patterns = [
    "2,25 11,23 20,18 29,24 38,15 47,17 56,11 65,15 74,12 83,18 94,10",
    "2,17 11,15 20,18 29,14 38,19 47,16 56,18 65,13 74,16 83,12 94,15",
    "2,20 11,18 20,23 29,17 38,20 47,16 56,19 65,15 74,18 83,14 94,17",
  ];

  return (
    <svg aria-hidden="true" className="mt-[0.38cqh] h-[1.15rem] w-full overflow-visible" viewBox="0 0 96 30">
      <polyline fill="none" points={patterns[index % patterns.length]} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ComfortIndexCard() {
  return (
    <article className="grid min-h-0 min-w-0 place-items-center rounded-[0.45rem] border border-slate-200/86 bg-white/64 px-[0.85cqw] py-[0.8cqh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <div className="mx-auto grid h-[4.65rem] w-[4.65rem] place-items-center rounded-full bg-[conic-gradient(#84cc16_0_82%,#e2e8f0_82%_100%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.75)]">
        <span className="grid h-[3.5rem] w-[3.5rem] place-items-center rounded-full bg-white">
          <span className="text-center">
            <strong className="block text-[1.25rem] font-semibold leading-none text-control-text">92</strong>
            <span className="mt-[0.15rem] block text-[0.66rem] font-semibold leading-none text-slate-700">Excellent</span>
          </span>
        </span>
      </div>
      <p className="mx-auto mt-[0.9cqh] max-w-[6.15rem] text-[clamp(0.48rem,0.53cqw,0.62rem)] font-medium leading-[1.12] text-slate-700">Environment is optimized for peak performance.</p>
    </article>
  );
}

function AdjustmentCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-h-0 min-w-0 grid-cols-[2.2rem_minmax(0,1fr)] items-center gap-[0.5cqw] px-[0.56cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="grid h-[2rem] w-[2rem] place-items-center">
        <Icon aria-hidden="true" className={item.color ?? "text-control-warm"} size={26} strokeWidth={1.55} />
      </span>
      <span className="min-w-0">
        <strong className="mb-1 block text-[clamp(0.80rem,0.62cqw,0.74rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.60rem,0.55cqw,0.65rem)] font-medium leading-[1.14] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function ImpactCell({ item }: { item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-[0.72cqw]">
      <Icon aria-hidden="true" className={item.color ?? "text-green-600"} size={32} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.54rem,0.62cqw,0.74rem)] font-medium leading-[1.2] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function RightCardPattern() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-1.45rem] right-[-1.25rem] h-[7.8rem] w-[13.5rem] object-contain object-right-bottom opacity-20"
      src="/assets/brand/pattern-bg.png"
    />
  );
}

function QuotePanel({ Icon, emphasis, text }: { Icon?: LucideIcon; emphasis: string; text: string }) {
  const QuoteIcon = Icon;
  return (
    <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.35cqw] py-[1.55cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
      <RightCardPattern />
      {QuoteIcon ? (
        <QuoteIcon aria-hidden="true" className="absolute left-[1.05cqw] top-[2cqh] text-control-warm" size={46} strokeWidth={1.35} />
      ) : (
        <Quote aria-hidden="true" className="absolute left-[1.05cqw] top-[1.55cqh] text-control-warm" size={46} strokeWidth={1.35} />
      )}
      <p className="relative ml-[4.55rem] mt-[1.25cqh] max-w-[13.2rem] text-[clamp(0.82rem,0.94cqw,1.12rem)] font-medium leading-[1.3] text-control-text">{text}</p>
      <p className="relative ml-[4.55rem] mt-[0.7cqh] max-w-[13rem] text-[clamp(0.86rem,0.98cqw,1.16rem)] font-semibold leading-[1.22] text-control-warm">{emphasis}</p>
    </section>
  );
}

function OperatorProfileCard({ profile }: { profile: (typeof personalizedProfiles)[number] }) {
  return (
    <article className="grid h-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white/70 shadow-[0_0.8rem_1.9rem_rgb(15_23_42/0.08)]">
      <div className={`bg-gradient-to-r ${profile.color} px-[0.78cqw] py-[0.78cqh] text-white`}>
        <h3 className="truncate text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight">{profile.name}</h3>
        <p className="mt-0.5 truncate text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold leading-tight">Focus: {profile.focus}</p>
      </div>
      <div className="relative min-h-0 overflow-hidden bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" src={profile.image} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgb(15_23_42/0.18))]" />
      </div>
      <div className="grid grid-cols-5 divide-x divide-slate-200/90 px-[0.4cqw] py-[0.75cqh]">
        {profile.settings.map((setting) => {
          const Icon = setting.Icon;
          return (
            <div className="min-w-0 px-[0.28cqw] text-center" key={setting.title}>
              <Icon aria-hidden="true" className={`mx-auto ${profile.accent}`} size={22} strokeWidth={1.55} />
              <p className="mt-[0.42cqh] text-[clamp(0.38rem,0.45cqw,0.52rem)] font-semibold leading-tight text-control-text">{setting.title}</p>
              <p className="mt-[0.18cqh] text-[clamp(0.35rem,0.42cqw,0.5rem)] font-medium leading-[1.08] text-slate-700">{setting.value}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function PersonalizationFactor({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.45cqw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color ?? "text-blue-600"} size={24} strokeWidth={1.5} />
      <h3 className="mt-[0.55cqh] text-[clamp(0.38rem,0.46cqw,0.54rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.34cqh] max-w-[5.4rem] text-[clamp(0.34rem,0.41cqw,0.49rem)] font-medium leading-[1.1] text-slate-700">{item.description}</p>
    </div>
  );
}

function SwitchUserStep({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.55cqw] text-center">
      {index ? <span className="absolute left-[-0.42cqw] top-[1.15rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <span className={`mx-auto grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border border-current/25 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.55} />
      </span>
      <h3 className="mt-[0.55cqh] text-[clamp(0.43rem,0.51cqw,0.6rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.3cqh] max-w-[6rem] text-[clamp(0.38rem,0.45cqw,0.53rem)] font-medium leading-[1.1] text-slate-700">{item.description}</p>
    </div>
  );
}

function ConsistencyChip({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-[0.32rem] px-[0.45cqw]">
      <SquareCheckBig aria-hidden="true" className="shrink-0 text-blue-600" size={15} strokeWidth={1.8} />
      <span className="text-[clamp(0.36rem,0.45cqw,0.54rem)] font-semibold leading-tight text-control-text">{label}</span>
    </div>
  );
}

function BeyondDeskCategory({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 text-center">
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={35} strokeWidth={1.45} />
      <p className="mt-[0.45cqh] text-[clamp(0.5rem,0.59cqw,0.68rem)] font-semibold leading-tight text-control-text">{item.title}</p>
      <span className={`absolute left-1/2 top-[5.1cqh] h-[25cqh] -translate-x-1/2 border-l border-dotted ${item.color.includes("green") ? "border-green-500" : item.color.includes("cyan") ? "border-cyan-500" : item.color.includes("orange") ? "border-orange-500" : item.color.includes("violet") ? "border-violet-500" : "border-blue-500"}`} />
    </div>
  );
}

function PipelineCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[3.35rem_minmax(0,1fr)] items-center gap-[0.55cqw] px-[1cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color} size={34} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.52rem,0.61cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.46rem,0.54cqw,0.63rem)] font-medium leading-[1.18] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function RoomUnderstandsCard({ item }: { item: SimpleItem & { color: string; bullets: string[] } }) {
  const Icon = item.Icon;
  return (
    <article className="min-w-0 rounded-[0.46rem] border border-slate-200/86 bg-white/66 px-[0.62cqw] py-[0.85cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <Icon aria-hidden="true" className={item.color} size={35} strokeWidth={1.45} />
      <h3 className="mt-[0.65cqh] min-h-[2.5em] text-left text-[clamp(0.62rem,0.72cqw,0.85rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</h3>
      <ul className="mt-[0.75cqh] space-y-[0.4cqh]">
        {item.bullets.map((bullet) => (
          <li className="grid grid-cols-[0.6rem_minmax(0,1fr)] gap-1 text-[clamp(0.55rem,0.63cqw,0.75rem)] font-medium leading-[1.25] text-slate-700" key={bullet}>
            <span className={item.color}>•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function IntelligenceGlanceCard({ item }: { item: (typeof intelligenceGlanceItems)[number] }) {
  const Icon = item.Icon;
  return (
    <article className="grid min-h-[7.2cqh] grid-cols-[3.6rem_minmax(0,1fr)_4.8rem] items-center gap-[0.55cqw] rounded-[0.5rem] border border-slate-200/86 bg-white/66 px-[0.72cqw] py-[0.68cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <span className={`grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border border-current/25 bg-white/62 ${item.color}`}>
        <Icon aria-hidden="true" size={27} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <h3 className="text-[clamp(0.46rem,0.54cqw,0.63rem)] font-semibold uppercase text-bold leading-normal text-control-text">{item.title}</h3>
        <p className="mt-[0.3cqh] text-[clamp(1rem,1.22cqw,1.42rem)] font-medium leading-none text-control-text">
          <span className={`font-semibold ${item.color}`}>{item.value}</span>
          <span className="text-control-text">{item.suffix}</span>
        </p>
        <p className="mt-[0.22cqh] text-[clamp(0.4rem,0.48cqw,0.56rem)] font-medium leading-tight text-slate-700">{item.caption}</p>
      </span>
      <span className="min-w-0 text-right">
        {item.title === "Occupancy" ? <GlanceSparkline /> : null}
        <span className={`block text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold leading-tight ${item.color}`}>{item.side.split(" ")[0]}</span>
        <span className="block text-[clamp(0.38rem,0.45cqw,0.53rem)] font-medium leading-tight text-slate-700">{item.side.split(" ").slice(1).join(" ")}</span>
      </span>
    </article>
  );
}

function GlanceSparkline() {
  return (
    <svg aria-hidden="true" className="mb-[0.2cqh] h-[1.9rem] w-full" viewBox="0 0 72 30">
      <polyline fill="none" points="2,23 10,17 18,20 26,12 34,16 42,8 50,11 60,5 70,2" stroke="#65a30d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/** Soft tinted chip behind a list icon, matched to the icon colour. */
function iconChipTint(color: string) {
  if (color.includes("blue")) return "border-blue-100 bg-blue-50";
  if (color.includes("violet")) return "border-violet-100 bg-violet-50";
  if (color.includes("green")) return "border-green-100 bg-green-50";
  if (color.includes("orange")) return "border-orange-100 bg-orange-50";
  if (color.includes("cyan")) return "border-cyan-100 bg-cyan-50";
  return "border-red-100 bg-red-50";
}

function DigitalTwinIntroCard({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <article className="grid grid-cols-[2.85rem_minmax(0,1fr)] items-center gap-[0.62cqw] rounded-[0.55rem] border border-slate-200/86 bg-white/70 px-[0.72cqw] py-[0.95cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.7rem_1.6rem_rgb(15_23_42/0.06)]">
      <span className={`grid h-[2.5rem] w-[2.5rem] place-items-center rounded-[0.52rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.8rem,0.61cqw,0.72rem)] font-semibold leading-[1.22] text-control-text">{item.title}</strong>
        <span className="mt-[0.3cqh] block text-[clamp(0.65rem,0.54cqw,0.64rem)] font-medium leading-[1.2] text-slate-700">{item.description}</span>
      </span>
    </article>
  );
}

function DigitalTwinTab({ active, label }: { active?: boolean; label: string }) {
  return (
    <button
      className={`h-[4.4cqh] min-w-[7.9rem] rounded-[0.3rem] border px-[1cqw] text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold uppercase tracking-normal shadow-[inset_0_1px_0_rgb(255_255_255/0.92)] ${
        active ? "border-control-warm bg-control-warm text-white shadow-[0_0.75rem_1.7rem_rgb(239_68_68/0.16)]" : "border-slate-200/90 bg-white/64 text-control-text"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}

function DigitalTwinCallout({ item }: { item: (typeof digitalTwinCallouts)[number] }) {
  const Icon = item.Icon;
  return (
    <div className={`absolute z-20 grid w-[10.6rem] grid-cols-[2.05rem_minmax(0,1fr)] gap-[0.5rem] rounded-[0.42rem] border border-slate-200/90 bg-white px-[0.62rem] py-[0.56rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.16)] ${item.className}`}>
      <Icon aria-hidden="true" className={item.color} size={25} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[0.52rem] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
        {item.lines.map((line) => (
          <span className="mt-0.5 block text-[0.5rem] font-medium leading-tight text-slate-800" key={line}>
            {line.includes("Online") || line.includes("Normal") || line.includes("Active") || line.includes("Secure") ? (
              <>
                {line.split(": ")[0]}: <span className="font-semibold text-green-600">{line.split(": ")[1]}</span>
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

function DigitalTwinMetric({ item }: { item: SimpleItem & { value: string; color: string } }) {
  const Icon = item.Icon;
  return (
    <article className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-[0.42cqw] rounded-[0.5rem] border border-slate-200/86 bg-white/72 px-[0.5cqw] py-[0.72cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <span className={`grid h-[2.2rem] w-[2.2rem] place-items-center rounded-[0.48rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <h3 className="truncate text-[clamp(0.42rem,0.5cqw,0.59rem)] font-semibold uppercase leading-tight text-slate-600">{item.title}</h3>
        <p className={`mt-[0.2cqh] text-[clamp(0.9rem,1.05cqw,1.25rem)] font-semibold leading-none ${item.color}`}>{item.value}</p>
        <p className="mt-[0.28cqh] text-[clamp(0.38rem,0.45cqw,0.53rem)] font-medium leading-[1.12] text-slate-700">{item.description}</p>
      </span>
    </article>
  );
}

function TwinRepresentationCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.55cqw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={31} strokeWidth={1.45} />
      <h3 className="mt-[0.62cqh] text-[clamp(0.8rem,0.53cqw,0.62rem)] font-semibold uppercase leading-normal text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.34cqh] max-w-[7.2rem] text-[clamp(0.65rem,0.45cqw,0.53rem)] font-medium leading-[1.14] text-slate-700">{item.description}</p>
    </div>
  );
}

function TwinEnablementCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-[0.62cqw] py-[0.72cqh]">
      <span className={`grid h-[2.5rem] w-[2.5rem] place-items-center rounded-[0.52rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.8rem,0.61cqw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-[0.3cqh] block text-[clamp(0.65rem,0.54cqw,0.64rem)] font-medium leading-[1.2] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function AICapabilityCard({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  const border = item.color.includes("blue")
    ? "border-blue-200/80"
    : item.color.includes("violet")
      ? "border-violet-200/80"
      : item.color.includes("orange")
        ? "border-orange-200/80"
        : item.color.includes("cyan")
          ? "border-cyan-200/80"
          : "border-green-200/80";
  return (
    <article className={`grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-[0.5cqw] rounded-[0.5rem] border bg-white px-[0.6cqw] py-[0.8cqh] shadow-[0_0.7rem_1.6rem_rgb(15_23_42/0.08)] ${border}`}>
      <span className={`grid h-[2.2rem] w-[2.2rem] place-items-center rounded-[0.48rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.48rem,0.57cqw,0.66rem)] font-semibold uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-[0.32cqh] block text-[clamp(0.7rem,0.52cqw,0.61rem)] font-medium leading-[1.22] text-control-text">{item.description}</span>
      </span>
    </article>
  );
}

function AICapabilityCallout({ item }: { item: SimpleItem & { color: string; className: string } }) {
  const Icon = item.Icon;
  return (
    <div className={`absolute z-20 grid w-[13.4rem] grid-cols-[2.3rem_minmax(0,1fr)] gap-[0.5rem] rounded-[0.5rem] border border-slate-200/90 bg-white px-[0.62rem] py-[0.6rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.2)] ${item.className}`}>
      <span className={`grid h-[2.1rem] w-[2.1rem] place-items-center rounded-[0.46rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={21} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[0.7rem] font-semibold uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-1 block text-[0.6rem] font-medium leading-[1.24] text-control-text">{item.description}</span>
      </span>
    </div>
  );
}

function AIBehindItem({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-[0.6cqw] py-[0.62cqh]">
      <span className={`grid h-[2.25rem] w-[2.25rem] place-items-center rounded-[0.48rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
      </span>
      <p className="text-[clamp(0.8rem,0.59cqw,0.7rem)] font-medium leading-[1.22] text-control-text">{item.title}</p>
    </div>
  );
}

function AISupportCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.58cqw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={33} strokeWidth={1.45} />
      <h3 className="mt-[0.7cqh] text-[clamp(0.8rem,0.59cqw,0.7rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.5cqh] max-w-[7.6rem] text-[clamp(0.65rem,0.47cqw,0.56rem)] font-medium leading-[1.18] text-slate-700">{item.description}</p>
    </div>
  );
}

function AICanDoCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-[0.62cqw] py-[0.78cqh]">
      <span className={`grid h-[2.5rem] w-[2.5rem] place-items-center rounded-[0.52rem] border ${iconChipTint(item.color)} ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.8rem,0.61cqw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-[0.3cqh] block text-[clamp(0.65rem,0.54cqw,0.64rem)] font-medium leading-[1.2] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function SoftwareDefineStep({ item, index }: { item: TintedItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative grid min-w-0 grid-cols-[2.9cqw_minmax(0,1fr)] items-center gap-[0.55cqw] px-[0.8cqw]">
      {index ? <span className="absolute left-[-0.36cqw] top-1/2 -translate-y-1/2 text-[1.15cqw] font-light leading-none text-slate-400">›</span> : null}
      <span className={`grid size-[2.35cqw] place-items-center rounded-[0.5rem] ${item.tint}`}>
        <Icon aria-hidden="true" className={`h-[1.35cqw] w-[1.35cqw] ${item.color}`} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[0.68cqw] font-semibold uppercase leading-tight tracking-[0.02em] ${item.color}`}>{item.title}</strong>
        <span className="mt-[0.3cqh] block text-[0.6cqw] font-medium leading-[1.24] text-control-text">{item.description}</span>
      </span>
    </div>
  );
}

function SoftwareDefineStepV2({ item, index }: { item: TintedItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative grid min-w-0 grid-cols-[2.5cqw_minmax(0,1fr)] items-center gap-[0.48cqw] px-0">
      {index ? <RunningDottedConnector className="left-[-3.05cqw] top-1/2 w-[2.05cqw]" /> : null}
      <span className={`grid size-[2.5cqw] place-items-center rounded-[0.5rem] ${item.tint}`}>
        <Icon aria-hidden="true" className={`h-[1.48cqw] w-[1.48cqw] ${item.color}`} strokeWidth={1.55} />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[0.68cqw] font-semibold uppercase leading-tight tracking-[0.02em] ${item.color}`}>{item.title}</strong>
        {/* <span className="mt-[0.3cqh] block text-[0.6cqw] font-medium leading-[1.24] text-control-text">{item.description}</span> */}
      </span>
    </div>
  );
}

function SoftwarePlatformNode({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  const isPlatform = item.title === "OnePWS Platform";

  if (isPlatform) {
    return (
      <div className="relative grid min-w-0 place-items-center px-[0.3cqw] text-center">
        <span className="absolute left-[-0.25cqw] top-1/2 w-[0.9cqw] -translate-y-1/2 border-t border-dotted border-slate-300" />
        <span className="absolute right-[-0.25cqw] top-1/2 w-[0.9cqw] -translate-y-1/2 border-t border-dotted border-slate-300" />
        <span className="grid h-[5.35cqw] w-[5.35cqw] place-items-center rounded-full border border-blue-200 bg-white shadow-[0_0_0_0.38cqw_rgb(37_99_235/0.07),0_0.55rem_1.35rem_rgb(37_99_235/0.10)]">
          <span className="grid place-items-center">
            <Icon aria-hidden="true" className="h-[1.35cqw] w-[1.35cqw] text-blue-600" strokeWidth={1.65} />
          </span>
          <span className="mt-[-0.35cqh] text-[0.62cqw] font-semibold uppercase leading-[1.12] tracking-[0.03em] text-control-text">
            OnePWS<br />Platform
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-w-0 px-[0.42cqw] text-center">
      {index ? <span className="absolute left-[-0.32cqw] top-[1.36cqw] w-[1.1cqw] border-t border-dotted border-slate-400/70" /> : null}
      <span className={`mx-auto grid h-[2.71cqw] w-[2.71cqw] place-items-center rounded-full border border-current/25 bg-white/70 ${item.color}`}>
        <Icon aria-hidden="true" className="h-[1.5cqw] w-[1.5cqw]" strokeWidth={1.45} />
      </span>
      <h3 className="mt-[0.7cqh] text-[0.72cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">{item.title}</h3>
      {item.description ? <p className="mx-auto mt-[0.3cqh] max-w-[7.5cqw] text-[0.66cqw] font-medium leading-[1.18] text-slate-700">{item.description}</p> : null}
    </div>
  );
}

function SoftwarePlatformNodeV2({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  const isPlatform = item.title === "OnePWS Platform";

  if (isPlatform) {
    return (
      <div className="relative grid min-w-0 place-items-center px-[0.16cqw] text-center">
        <RunningDottedConnector className="left-[-1.1cqw] top-[2.355cqw] w-[2.2cqw]" />
        <RunningDottedConnector className="right-[-1.1cqw] top-[2.355cqw] w-[2.2cqw]" />
        <span className="flex h-[5.05cqw] w-[5.05cqw] flex-col items-center justify-center rounded-full border border-blue-200 bg-white px-[0.45cqw] shadow-[0_0_0_0.34cqw_rgb(37_99_235/0.07),0_0.55rem_1.35rem_rgb(37_99_235/0.10)]">
          <span className="grid place-items-center">
            <Icon aria-hidden="true" className="h-[1.32cqw] w-[1.32cqw] text-blue-600" strokeWidth={1.65} />
          </span>
          <span className="mt-[0.38cqh] text-center text-[0.58cqw] font-semibold uppercase leading-[1.02] tracking-[0.03em] text-control-text">
            OnePWS<br />Platform
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-w-0 px-[0.22cqw] text-center">
      {index && softwarePlatformFlow[index - 1]?.title !== "OnePWS Platform" ? <RunningDottedConnector className="left-[-1.1cqw] top-[2.35cqw] w-[2.2cqw]" /> : null}
      <span className={`mx-auto grid h-[2.71cqw] w-[2.71cqw] place-items-center rounded-full border border-current/25 bg-white/70 ${item.color}`}>
        <Icon aria-hidden="true" className="h-[1.5cqw] w-[1.5cqw]" strokeWidth={1.45} />
      </span>
      <h3 className="mt-[0.7cqh] text-[0.72cqw] font-semibold uppercase leading-tight tracking-[0.02em] text-control-text">{item.title}</h3>
      {/* {item.description ? <p className="mx-auto mt-[0.3cqh] max-w-[7.5cqw] text-[0.66cqw] font-medium leading-[1.18] text-slate-700">{item.description}</p> : null} */}
    </div>
  );
}

function RunningDottedConnector({ className }: { className: string }) {
  return (
    <span className={`pointer-events-none absolute block h-[0.72rem] -translate-y-1/2 overflow-hidden ${className}`}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(37_99_235/0.78)_0_2px,transparent_2px_5px)]" />
      <span className="absolute right-[0.02rem] top-1/2 h-[0.36rem] w-[0.36rem] -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-blue-600/80" />
    </span>
  );
}

function DeployAnywhereCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="min-w-0 px-[0.18cqw] text-center">
      <Icon aria-hidden="true" className={`mx-auto h-[1.75cqw] w-[1.75cqw] ${item.color}`} strokeWidth={1.45} />
      <p className="mt-[0.85cqh] whitespace-nowrap text-[0.68cqw] font-medium leading-[1.2] text-control-text">{item.title}</p>
    </div>
  );
}

function SoftwareBenefitCell({ item, index }: { item: (typeof softwareBenefits)[number]; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.68cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="flex items-center gap-[0.42cqw]">
        <Icon aria-hidden="true" className={`h-[1.3cqw] w-[1.3cqw] shrink-0 ${item.color}`} strokeWidth={1.5} />
        <strong className="whitespace-nowrap text-[1.28cqw] font-semibold leading-none tracking-[-0.01em] text-control-text [font-variant-numeric:tabular-nums]">{item.value}</strong>
      </span>
      <span className="mt-[0.7cqh] block text-[0.65cqw] font-medium leading-[1.24] text-slate-700">{item.label}</span>
    </div>
  );
}

function SoftwareDefinedByCell({ item }: { item: TintedItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.85cqw_minmax(0,1fr)] items-center gap-[0.68cqw] py-[0.5cqh]">
      <span className={`grid size-[2.25cqw] place-items-center rounded-[0.5rem] ${item.tint}`}>
        <Icon aria-hidden="true" className={`h-[1.3cqw] w-[1.3cqw] ${item.color}`} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[0.68cqw] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-[0.28cqh] block text-[0.6cqw] font-medium leading-[1.24] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function InfoHeroCallout({ Icon, className, color, text, title }: { Icon: LucideIcon; className: string; color: string; text: string; title: string }) {
  return (
    <div className={`absolute z-20 grid w-[11.4rem] grid-cols-[2.35rem_minmax(0,1fr)] gap-[0.55rem] rounded-[0.45rem] border border-white/28 bg-slate-950/78 px-[0.72rem] py-[0.65rem] text-white shadow-[0_0.9rem_2rem_rgb(15_23_42/0.24)] backdrop-blur-md ${className}`}>
      <Icon aria-hidden="true" className={color} size={28} strokeWidth={1.55} />
      <span>
        <strong className="block text-[0.58rem] font-semibold uppercase leading-tight">{title}</strong>
        <span className="mt-1 block text-[0.54rem] font-medium leading-[1.3] text-slate-100">{text}</span>
      </span>
    </div>
  );
}

function InfoHowStep({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8cqw] text-center">
      {index ? <span className="absolute left-[-0.3cqw] top-[1.5rem] text-[1.35rem] font-light text-control-text">→</span> : null}
      <span className={`mx-auto grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-current/25 bg-white/55 ${item.color}`}>
        <Icon aria-hidden="true" size={30} strokeWidth={1.55} />
      </span>
      <h3 className="mt-[0.8cqh] text-[clamp(0.54rem,0.63cqw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.55cqh] max-w-[8.2rem] text-[clamp(0.48rem,0.56cqw,0.65rem)] font-medium leading-[1.22] text-slate-800">{item.description}</p>
    </div>
  );
}

function ComparisonPanel({ accent, items, title }: { accent: string; items: SimpleItem[]; title: string }) {
  return (
    <section className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.85cqw] py-[0.9cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
      <h2 className="text-[clamp(0.90rem,0.62cqw,0.74rem)] font-semibold uppercase leading-tight text-control-text">{title}</h2>
      <div className={`mt-[0.55cqh] h-[2px] w-[1.55rem] ${accent === "text-green-500" ? "bg-green-500" : "bg-control-warm"}`} />
      <div className="mt-[0.55cqh] grid min-h-0 auto-rows-fr divide-y divide-slate-200/90">
        {items.map((item) => {
          const Icon = item.Icon;
          return (
            <div className="grid min-h-0 grid-cols-[2rem_minmax(0,1fr)] items-center gap-[0.48cqw] py-[0.58cqh]" key={item.title}>
              <Icon aria-hidden="true" className={item.color ?? accent} size={22} strokeWidth={1.55} />
              <p className="text-[clamp(0.80rem,0.5cqw,0.6rem)] font-medium leading-[1.12] text-control-text">{item.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InfoExampleCard({ item }: { item: { title: string; description: string; image: string } }) {
  return (
    <article className="min-w-0">
      <div className="relative h-[3.05rem] overflow-hidden rounded-[0.34rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-92" src={item.image} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(15_23_42/0.14))]" />
      </div>
      <h3 className="mt-[0.45cqh] truncate text-[clamp(0.48rem,0.56cqw,0.65rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.16cqh] text-[clamp(0.44rem,0.51cqw,0.6rem)] font-medium leading-[1.1] text-slate-800">{item.description}</p>
    </article>
  );
}

function ConsoleModeCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`px-[1.15cqw] text-center ${index ? "border-l border-dashed border-slate-300" : ""}`}>
      <span className={`mx-auto grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-current/25 bg-white/55 ${item.color}`}>
        <Icon aria-hidden="true" size={31} strokeWidth={1.55} />
      </span>
      <h3 className={`mt-[1cqh] text-[clamp(0.58rem,0.68cqw,0.78rem)] font-semibold uppercase ${item.color}`}>{item.title}</h3>
      <p className="mx-auto mt-[0.7cqh] max-w-[11.4rem] text-[clamp(0.54rem,0.63cqw,0.73rem)] font-medium leading-[1.32] text-slate-800">{item.description}</p>
    </div>
  );
}

function ConsoleAdaptStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8cqw] text-center">
      {index ? <span className="absolute left-[-0.3cqw] top-[1.05rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={29} strokeWidth={1.55} />
      <h3 className="mt-[0.75cqh] text-[clamp(0.54rem,0.63cqw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.55cqh] max-w-[8rem] text-[clamp(0.49rem,0.57cqw,0.66rem)] font-medium leading-[1.22] text-slate-800">{item.description}</p>
    </div>
  );
}

function BenefitCell({ dark = false, item }: { dark?: boolean; item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.7cqw] py-[1.35cqh]">
      <Icon aria-hidden="true" className="text-control-warm" size={30} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.56rem,0.65cqw,0.76rem)] font-semibold leading-tight ${dark ? "text-white" : "text-control-text"}`}>{item.title}</strong>
        <span className={`mt-0.5 block text-[clamp(0.49rem,0.57cqw,0.67rem)] font-medium leading-[1.24] ${dark ? "text-slate-200" : "text-slate-800"}`}>{item.description}</span>
      </span>
    </div>
  );
}

function TransitionFrame({ item, index }: { item: { title: string; description: string }; index: number }) {
  return (
    <div className="relative min-w-0">
      {index ? <span className="absolute left-[-0.72cqw] top-[1.55cqh] text-[1.55rem] font-light text-slate-400">»</span> : null}
      <div className="relative h-[2.85rem] overflow-hidden rounded-[0.32rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" src={index < 2 ? "/assets/source-pdf/p24_054_1418x798.jpg" : "/assets/source-pdf/p23_053_1418x798.jpg"} />
        <div className={`absolute inset-0 ${index >= 2 ? "bg-control-warm/22" : "bg-slate-950/12"}`} />
        <span className="absolute bottom-[-0.05rem] left-[-0.05rem] grid h-[1.12rem] w-[1.12rem] place-items-center rounded-full bg-control-warm text-[0.55rem] font-semibold text-white">{index + 1}</span>
      </div>
      <h3 className="mt-[0.38cqh] text-[clamp(0.5rem,0.58cqw,0.68rem)] font-medium leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.16cqh] text-[clamp(0.46rem,0.53cqw,0.62rem)] font-medium leading-[1.12] text-slate-800">{item.description}</p>
    </div>
  );
}

function SecurityCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`px-[0.65cqw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={34} strokeWidth={1.55} />
      <p className="mx-auto mt-[1.2cqh] max-w-[6.5rem] text-[clamp(0.58rem,0.68cqw,0.78rem)] font-semibold leading-tight text-control-text">{item.title}</p>
    </div>
  );
}

function ExperienceStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8cqw]">
      {index ? <span className="absolute left-[-0.3cqw] top-[1rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <Icon aria-hidden="true" className="text-control-warm" size={29} strokeWidth={1.55} />
      <h3 className="mt-[0.8cqh] text-[clamp(0.55rem,0.64cqw,0.74rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.65cqh] max-w-[8rem] text-[clamp(0.5rem,0.58cqw,0.67rem)] font-medium leading-[1.28] text-slate-800">{item.description}</p>
    </div>
  );
}

function ReadinessCard({ item }: { item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <article className="grid min-h-0 grid-cols-[4.35rem_minmax(0,1fr)] items-center gap-[0.9cqw] rounded-[0.52rem] border border-slate-200/86 bg-white/64 px-[1cqw] py-[0.82cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.6rem_1.5rem_rgb(15_23_42/0.06)] backdrop-blur-[26px]">
      <span className={`grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-slate-200 bg-white/58 ${item.color ?? "text-control-warm"}`}>
        <Icon aria-hidden="true" size={31} strokeWidth={1.55} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.64rem,0.74cqw,0.86rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.56rem,0.65cqw,0.76rem)] font-medium leading-[1.28] text-slate-800">{item.description}</span>
      </span>
    </article>
  );
}

function OutcomeCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.65cqw] px-[0.95cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="text-control-warm" size={31} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.56rem,0.65cqw,0.76rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.5rem,0.58cqw,0.68rem)] font-medium leading-[1.22] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}
