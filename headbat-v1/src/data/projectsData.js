export const projects = [
  {
    id: "passion-finder",
    slug: "passion-finder",
    title: "Passion Finder",
    year: "2023",
    link: "/cases/passion-finder",
    client: "Passion Finder Inc.",
    location: "San Francisco, CA",
    category: "AI & EdTech Platform",
    role: "End-to-End Product Design, 3D Motion & Web Architecture",
    duration: "4 Months",
    liveUrl: "https://passionfinder.io",
    tagline: "AI-powered career & passion discovery platform transforming how millions discover their true calling.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/passion-case-preview.webp",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/passion-case-preview-hover.webp",
    overview:
      "Passion Finder is an intelligent, personality-driven career matching platform that guides students and ambitious professionals to unlock their true potential. Using deep behavioral analytics and interactive assessment journeys, it turns self-discovery into clear, actionable career trajectories.",
    challenge:
      "Traditional career aptitude quizzes were archaic, text-heavy, and suffered an 82% abandonment rate. The founders needed a hyper-engaging digital experience that felt like an inspiring conversation rather than a dry standardized test, while delivering statistically validated career guidance at scale.",
    solution:
      "We engineered an intuitive gamified assessment journey powered by responsive 3D archetypes, fluid micro-transitions, and real-time algorithmic personality scoring. Every interaction provides instant visual feedback, culminating in an interactive career roadmap tailored to each individual.",
    keyFeatures: [
      {
        title: "Adaptive Question Branching",
        description:
          "Algorithmic question logic that dynamically tailors follow-up questions based on the candidate's real-time emotional resonance and aptitude indicators.",
        tag: "AI Engine",
      },
      {
        title: "3D Visual Archetypes",
        description:
          "Custom-crafted 3D visual identities representing 16 core personality archetypes with interactive WebGL lighting and orbital controls.",
        tag: "WebGL & 3D",
      },
      {
        title: "Dynamic Trajectory Roadmaps",
        description:
          "Interactive career milestone timelines featuring real-world salary benchmarks, required skillsets, and vetted educational course pathways.",
        tag: "Data Visualization",
      },
      {
        title: "Mentorship Matching Protocol",
        description:
          "Direct algorithmic matching with senior industry veterans and verified peer community circles for ongoing career growth.",
        tag: "Community",
      },
    ],
    metrics: [
      { value: "450K+", label: "Active Explorers" },
      { value: "89%", label: "Completion Rate (from 18%)" },
      { value: "4.9 / 5", label: "App Store Rating" },
      { value: "$4.2M", label: "Seed Funding Secured" },
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Three.js / WebGL",
      "FastAPI & Python",
      "OpenAI API",
      "Framer Motion",
    ],
    testimonial: {
      quote:
        "HeadBat transformed our raw idea into a digital product that people genuinely fall in love with at first click. The completion rate jumped by over 400%, and the aesthetic blew our venture investors away.",
      author: "Marcus Vance",
      role: "Founder & CEO",
      company: "Passion Finder Inc.",
    },
    gallery: [
      {
        title: "Assessment Journey Interface",
        caption: "Adaptive questioning with responsive 3D archetype feedback.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/passion-case-preview.webp",
      },
      {
        title: "Interactive Career Trajectory Map",
        caption: "Comprehensive roadmap with salary bands and skill milestones.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/passion-case-preview-hover.webp",
      },
    ],
  },
  {
    id: "kazaswap",
    slug: "kazaswap",
    title: "KazaSwap",
    year: "2025",
    link: "/cases/kazaswap",
    client: "KazaSwap Protocol",
    location: "Zug, Switzerland",
    category: "DeFi / Web3 / FinTech",
    role: "Web3 UI/UX Design, Tokenomics Dashboard & DApp Architecture",
    duration: "6 Months",
    liveUrl: "https://kazaswap.fi",
    tagline: "Next-generation decentralized exchange & cross-chain liquidity aggregator with sub-second execution.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview-hover.webp",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/kazaswap-preview-hover-hover-1.webp",
    overview:
      "KazaSwap is an institutional-grade multi-chain decentralized trading exchange engineered for lightning-fast token swaps, near-zero slippage, and automated liquidity provisioning across Ethereum, Arbitrum, Solana, and Base.",
    challenge:
      "Decentralized finance interfaces are notoriously intimidating for mainstream traders—plagued by cluttered terminal charts, opaque gas fees, and high transaction failure rates. KazaSwap needed an ultra-clean, Apple-tier user interface backed by institutional-grade liquidity routing.",
    solution:
      "We conceived a streamlined, friction-free swap interface featuring automated smart-routing visualizers, real-time MEV sandwich protection indicators, and one-click liquidity pool staking with complete account abstraction.",
    keyFeatures: [
      {
        title: "Sub-Second Smart Routing",
        description:
          "Algorithmic route optimizer querying 14 decentralized liquidity pools simultaneously to secure the absolute lowest slippage in <80ms.",
        tag: "Smart Routing",
      },
      {
        title: "Pro Terminal Dark Interface",
        description:
          "High-density data tables, real-time TradingView depth charting, and customizable widget layouts designed for institutional traders.",
        tag: "Pro UI",
      },
      {
        title: "Gasless Intent Swaps",
        description:
          "ERC-4337 account abstraction integration enabling traders to pay gas fees in any token without maintaining native chain gas tokens.",
        tag: "Web3 Core",
      },
      {
        title: "Automated Yield Vaults",
        description:
          "Dynamic algorithmic staking pools with auto-compounding interest and transparent APY calculation models.",
        tag: "Yield Optimization",
      },
    ],
    metrics: [
      { value: "$140M+", label: "Total Value Locked (TVL)" },
      { value: "< 0.8s", label: "Average Execution Speed" },
      { value: "$2.8B", label: "Cumulative Volume" },
      { value: "99.98%", label: "Transaction Success Rate" },
    ],
    techStack: [
      "React 19",
      "Vite",
      "Ethers.js / Wagmi",
      "Solidity",
      "Tailwind CSS",
      "WebSockets",
      "The Graph Protocol",
    ],
    testimonial: {
      quote:
        "The HeadBat team bridged the gap between deep blockchain mathematics and an effortless, beautiful user experience. Our TVL surged 400% within two months of launch.",
      author: "Elena Rostova",
      role: "Co-Founder & Head of Protocol",
      company: "KazaSwap",
    },
    gallery: [
      {
        title: "Swap Terminal & Route Visualizer",
        caption: "Real-time liquidity path visualizer and slippage protection.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/kazaswap-preview-hover-hover-1.webp",
      },
      {
        title: "Liquidity Vaults & Yield Dashboard",
        caption: "Automated portfolio allocation with real-time APY calculation.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview-hover.webp",
      },
    ],
  },
  {
    id: "xefag",
    slug: "xefag",
    title: "Xefag",
    year: "2025",
    link: "/cases/xefag",
    client: "Xefag Security Inc.",
    location: "Stockholm, Sweden",
    category: "Cybersecurity & Cloud Observability",
    role: "Product Design, Component Library & Threat Command Center",
    duration: "5 Months",
    liveUrl: "https://xefag.io",
    tagline: "Autonomous cloud infrastructure & zero-trust cyber defense management suite.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/xefag-case-preview.webp",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/xefag-case-preview-hover.webp",
    overview:
      "Xefag is an AI-powered cloud observability and zero-trust security orchestration system designed to safeguard hybrid Kubernetes and multi-cloud environments against zero-day exploits in real time.",
    challenge:
      "Security operations teams were suffering from acute alert fatigue, wading through tens of thousands of uncorrelated notifications daily across fragmented AWS, GCP, and on-premises server clusters.",
    solution:
      "HeadBat designed a unified cyber command center featuring automated threat incident correlation, 3D global attack heatmaps, and one-click autonomous remediation playbooks that isolate compromised pods in milliseconds.",
    keyFeatures: [
      {
        title: "3D Threat Vector Globe",
        description:
          "Interactive real-time global telemetry visualizer pinpointing distributed DDoS attacks, botnet scans, and unauthorized ingress spikes.",
        tag: "Interactive 3D",
      },
      {
        title: "Instant Pod Quarantine",
        description:
          "Automated zero-trust isolation playbooks that sever compromised microservice containers before lateral movement occurs.",
        tag: "Autonomous SecOps",
      },
      {
        title: "Unified Compliance Auditing",
        description:
          "Continuous automated posture assessments covering SOC2 Type II, ISO 27001, HIPAA, and GDPR regulatory compliance.",
        tag: "Governance",
      },
      {
        title: "Micro-Frontend Dashboard",
        description:
          "High-performance modular widget ecosystem enabling SecOps and DevOps engineers to customize their mission console.",
        tag: "Modular Architecture",
      },
    ],
    metrics: [
      { value: "76%", label: "Faster MTTD (Time to Detect)" },
      { value: "10x", label: "Threat Containment Speed" },
      { value: "99.999%", label: "SLA Infrastructure Uptime" },
      { value: "200+", label: "Enterprise Deployments" },
    ],
    techStack: [
      "React 19",
      "Tailwind CSS",
      "Go / gRPC",
      "Kubernetes & Docker",
      "WebAssembly",
      "ClickHouse",
      "D3.js Data Engine",
    ],
    testimonial: {
      quote:
        "HeadBat's ability to turn dense security telemetry into intuitive visual clarity made Xefag the benchmark security dashboard in our industry.",
      author: "Henrik Lindqvist",
      role: "Chief Information Security Officer",
      company: "Xefag Security Inc.",
    },
    gallery: [
      {
        title: "Autonomous Threat Command Center",
        caption: "Real-time incident triage and distributed vector mapping.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/xefag-case-preview.webp",
      },
      {
        title: "Cloud Infrastructure Topology",
        caption: "Live Kubernetes cluster health and microservice node communication.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/xefag-case-preview-hover.webp",
      },
    ],
  },
  {
    id: "linkmatch",
    slug: "linkmatch",
    title: "Linkmatch",
    year: "2025",
    link: "/cases/linkmatch",
    client: "Linkmatch Global",
    location: "Austin, TX",
    category: "B2B SaaS / HR Tech / CRM Sync",
    role: "Brand Identity, Browser Extension UI & Web Platform",
    duration: "3.5 Months",
    liveUrl: "https://linkmatch.net",
    tagline: "Intelligent CRM & talent sourcing automation platform saving recruiters 15+ hours weekly.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/linkmatch-case-preview.webp",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/linkmatch-case-preview-hover.webp",
    overview:
      "Linkmatch seamlessly connects professional recruitment workflows with CRM pipelines, enabling instantaneous bi-directional candidate synchronization, automated profile enrichment, and comprehensive recruitment funnel analytics.",
    challenge:
      "Recruiters were wasting more than 15 hours every week manually copy-pasting candidate data between LinkedIn and enterprise CRMs like Zoho, HubSpot, and Salesforce, leading to stale pipelines and costly duplicate entries.",
    solution:
      "We conceptualized an elegant floating browser extension companion paired with a high-speed web command center that synchronizes candidates in a single click with zero data loss and automated duplicate resolution.",
    keyFeatures: [
      {
        title: "1-Click Bi-Directional Sync",
        description:
          "Instant parsing and extraction of resumes, work history, skill tags, and contact details directly into CRM pipelines.",
        tag: "Automation",
      },
      {
        title: "Intelligent Duplicate Resolution",
        description:
          "Machine learning algorithms detecting existing applicant records and merging profile updates without overwriting recruiter notes.",
        tag: "Smart Matching",
      },
      {
        title: "Multi-Channel Outreach Engine",
        description:
          "Personalized email cadence sequences with variable tags, follow-up automations, and live reply tracking.",
        tag: "Outreach CRM",
      },
      {
        title: "Team Talent Sourcing Hub",
        description:
          "Shared team tags, candidate pipeline stages, and synchronized recruiter activity feeds for enterprise talent acquisition.",
        tag: "Collaboration",
      },
    ],
    metrics: [
      { value: "15+ hrs", label: "Saved Weekly Per Recruiter" },
      { value: "3.2M", label: "Candidates Synced Monthly" },
      { value: "98.4%", label: "Data Extraction Accuracy" },
      { value: "4.8 / 5", label: "Chrome Web Store Rating" },
    ],
    techStack: [
      "React 19",
      "Chrome Extension Manifest V3",
      "Tailwind CSS",
      "Node.js & Express",
      "Redis",
      "PostgreSQL",
    ],
    testimonial: {
      quote:
        "Our users praise the sleek simplicity every single day. The interface HeadBat designed feels invisible yet indispensable to our 100,000+ recruiters.",
      author: "Sarah Jenkins",
      role: "VP of Product",
      company: "Linkmatch Global",
    },
    gallery: [
      {
        title: "Browser Extension Companion",
        caption: "Contextual candidate badge overlay on social recruitment profiles.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/linkmatch-case-preview.webp",
      },
      {
        title: "Talent Pipeline Command Dashboard",
        caption: "Funnel velocity analytics and recruitment milestone tracking.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/linkmatch-case-preview-hover.webp",
      },
    ],
  },
  {
    id: "inputninja",
    slug: "inputninja",
    title: "InputNinja",
    year: "2022",
    link: "/cases/inputninja",
    client: "InputNinja Labs",
    location: "London, UK",
    category: "No-Code Productivity & Form Engine",
    role: "Full Product Design, Kinetic Motion System & Frontend Engine",
    duration: "4 Months",
    liveUrl: "https://inputninja.app",
    tagline: "High-performance conversational form builder and interactive data collection suite.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/inputninja-case-preview.png",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/inputninja-case-preview-hover.png",
    overview:
      "InputNinja reimagines static online forms into captivating conversational micro-experiences that dramatically elevate submission completion rates, lead quality, and customer brand sentiment.",
    challenge:
      "Traditional static web forms suffer from massive drop-off rates and clunky mobile ergonomics, costing digital businesses billions in lost inbound leads and abandoned checkouts.",
    solution:
      "Designed a keyboard-first, kinetic typography experience with drag-and-drop node graph branching logic, responsive device emulators, and instant sub-50ms embed widgets.",
    keyFeatures: [
      {
        title: "Keyboard-First Ergonomics",
        description:
          "Zero-friction single-keypress navigation allowing respondents to complete in-depth surveys twice as fast as traditional forms.",
        tag: "Ergonomics",
      },
      {
        title: "Visual Logic Tree Builder",
        description:
          "Interactive node-graph canvas for crafting complex conditional logic, scoring pathways, and automated question branching.",
        tag: "No-Code Canvas",
      },
      {
        title: "Sub-50ms Embed SDK",
        description:
          "Lightweight vanilla JavaScript embed runner delivering instant slide-ins, popovers, and full-screen modal takeovers.",
        tag: "Performance",
      },
      {
        title: "Field Drop-Off Heatmaps",
        description:
          "Granular funnel analytics showing exact hesitation times and abandonment rates per individual question.",
        tag: "Conversion Intel",
      },
    ],
    metrics: [
      { value: "+230%", label: "Average Completion Lift" },
      { value: "45ms", label: "Render & Interaction Latency" },
      { value: "25M+", label: "Responses Processed" },
      { value: "#1", label: "Product of the Day on ProductHunt" },
    ],
    techStack: [
      "React 19",
      "Zustand State Engine",
      "Tailwind CSS",
      "Framer Motion",
      "Go & WebAssembly",
      "AWS Lambda & Edge Cache",
    ],
    testimonial: {
      quote:
        "InputNinja went from an experimental prototype to processing tens of millions of answers. HeadBat's obsession with micro-interactions made all the difference.",
      author: "Alexander Wright",
      role: "Co-Founder",
      company: "InputNinja Labs",
    },
    gallery: [
      {
        title: "Conversational Form Runner",
        caption: "Fluid kinetic transitions with instant keyboard shortcuts.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/inputninja-case-preview.png",
      },
      {
        title: "Visual Logic Node Builder",
        caption: "Intuitive node canvas for branching questionnaire logic.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/inputninja-case-preview-hover.png",
      },
    ],
  },
  {
    id: "payoneer",
    slug: "payoneer",
    title: "Payoneer",
    year: "2025",
    link: "/cases/payoneer",
    client: "Payoneer Global Inc.",
    location: "New York, NY",
    category: "Fintech / Global Banking / Enterprise",
    role: "Design Strategy, UX Research & Cross-Border Payment UX",
    duration: "6 Months",
    liveUrl: "https://payoneer.com",
    tagline: "Global multi-currency commerce & freelance payout experience powering millions worldwide.",
    imageDefault:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview.webp",
    imageHover:
      "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview-hover.webp",
    overview:
      "Modernizing international financial commerce for millions of digital freelancers, cross-border marketplaces, and enterprise exporters operating across 190+ countries and 70+ currencies.",
    challenge:
      "Complex international compliance regulations, volatile FX exchange rates, and fragmented balances created friction and confusion for global earners seeking transparent access to their funds.",
    solution:
      "HeadBat crafted an all-new unified financial dashboard featuring instantaneous currency balance conversions, transparent fee breakdowns, and automated local tax documentation generation.",
    keyFeatures: [
      {
        title: "Multi-Currency Receiving Vaults",
        description:
          "Local bank account routing numbers in USD, EUR, GBP, JPY, CAD, and AUD with zero international wire transfer delay.",
        tag: "Global Banking",
      },
      {
        title: "Instant Marketplace Payouts",
        description:
          "Native API integrations with Upwork, Fiverr, Airbnb, and Amazon for immediate balance synchronization.",
        tag: "Ecosystem APIs",
      },
      {
        title: "Automated FX Hedging Alerts",
        description:
          "Predictive currency exchange rate alerts and automated scheduled conversions when currency rates hit target thresholds.",
        tag: "FX Intelligence",
      },
      {
        title: "Enterprise Batch Payouts",
        description:
          "Mass contractor payroll disbursement system supporting thousands of international payees in local currencies with one click.",
        tag: "Enterprise Scale",
      },
    ],
    metrics: [
      { value: "$60B+", label: "Annual Volume Processed" },
      { value: "190+", label: "Countries Supported" },
      { value: "4.7 ★", label: "Mobile App Rating" },
      { value: "38%", label: "Support Ticket Reduction" },
    ],
    techStack: [
      "React 19",
      "Next.js Architecture",
      "Tailwind CSS",
      "Design Token System",
      "Java Spring Boot",
      "Apache Kafka",
      "PostgreSQL",
    ],
    testimonial: {
      quote:
        "HeadBat's deep understanding of enterprise fintech design brought remarkable clarity to one of the most sophisticated multi-currency ecosystems on the planet.",
      author: "David Ben-Ami",
      role: "VP of Global Product Experience",
      company: "Payoneer Global Inc.",
    },
    gallery: [
      {
        title: "Multi-Currency Overview Console",
        caption: "Unified balances across global receiving accounts with live FX rates.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview.webp",
      },
      {
        title: "Batch Payout & Tax Management",
        caption: "Mass disbursement tools and automated cross-border tax compliance.",
        image:
          "https://maksim.nixtio.com/nixtio-wp/wp-content/uploads/2026/05/payoneer-case-preview-hover.webp",
      },
    ],
  },
];

export function getProjectBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return (
    projects.find(
      (p) =>
        p.slug.toLowerCase() === cleanSlug ||
        p.id.toLowerCase() === cleanSlug ||
        p.link.toLowerCase().endsWith(`/${cleanSlug}`)
    ) || null
  );
}

export function getAdjacentProjects(currentSlug) {
  const currentIndex = projects.findIndex(
    (p) =>
      p.slug.toLowerCase() === currentSlug?.toLowerCase() ||
      p.id.toLowerCase() === currentSlug?.toLowerCase()
  );

  if (currentIndex === -1) {
    return { prev: null, next: null, currentIndex: 0, total: projects.length };
  }

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
    currentIndex,
    total: projects.length,
  };
}
