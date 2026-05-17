// data.js — content + palette constants for the Reel portfolio

// Palettes: [bg, surface, ink, accent, muted]
export const PALETTES = [
  ["#0e0c0a", "#1a1714", "#f0eae0", "#ff6a3d", "#7a7068"], // warm dark + amber
  ["#0a0e10", "#16191c", "#e8ecf0", "#5ec2ff", "#7d8590"], // arctic + cyan
  ["#0c0a14", "#16131e", "#ece6f4", "#c099ff", "#7d7585"], // plum + lilac
  ["#0a0a0a", "#141414", "#ededed", "#ff3e58", "#7c7c7c"], // black + signal red
];

// Default theme — black + signal red (4th option), per the final design.
export const DEFAULT_PALETTE = PALETTES[3];

export const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const PROJECTS = [
  {
    idx: 1,
    year: "2024—NOW",
    kind: "product · founding",
    title: "bello.art",
    role: "Founder + CEO",
    blurb:
      "A visual operating system for online sellers — the layer between product creation and online distribution. Selling online today means stitching together Photoshop, Canva, AI tools, cloud folders and a dozen upload flows. bello replaces that. The first surface — high-end interior mockups for independent artists — has sold 10K+.",
    details: [
      "bello.art is the layer that sits between product creation and online distribution. Selling online today demands an entire visual identity — listing images, lifestyle photos, mockups, videos, thumbnails, branding assets, sizing diagrams, packaging visuals, and platform-specific content for marketplaces and social media.",
      "Most creators stitch this together from a fragmented stack: Photoshop, Canva, AI generators, cloud folders, and manual uploads across Etsy, Instagram, Pinterest, TikTok, and Shopify. bello replaces that workflow with a single visual studio purpose-built for sellers.",
      "We launched the first surface in 2024 — high-end interior mockups for independent artists. The studio elevates an artist's work while helping their customers visualize how a piece would fit in their own home. Over 10,000 mockups sold to date. The Studio, Packs, Feeds, Sizing, and AI Imaging surfaces are next.",
    ],
    tags: ["product", "ai imaging", "ecommerce"],
    colors: ["#3a1810", "#ff8a4a", "#ffd09c", "#d96030"],
    seed: 3,
    link: "https://bello.art",
  },
  {
    idx: 2,
    year: "2022—2024",
    kind: "partnership · creator",
    title: "Adobe · Photoshop Partner",
    role: "Sponsored Creator",
    blurb:
      "An official Adobe partner sponsored by Photoshop. Created work for the worldwide Photoshop community — demonstrating creative workflows, building visual identities, and pushing the craft of mockup and retouching. The chops built here became the foundation for bello.art.",
    details: [
      "Two years as an official Adobe partner, sponsored by the Photoshop team. Created original work and tutorial content for the worldwide Photoshop community — demonstrating creative workflows, building visual identities, pushing the craft of high-end retouching and mockup composition.",
      "The hands-on practice with Photoshop, Camera Raw, and the rest of the Creative Cloud became the foundation for the bello.art mockup studio.",
    ],
    tags: ["adobe", "photoshop", "creator", "partnership"],
    colors: ["#0d1217", "#31a8ff", "#a8dcff", "#1d4870"],
    seed: 23,
  },
  {
    idx: 3,
    year: "2016—2021",
    kind: "leadership · data",
    title: "AR Experiences @ Meta",
    role: "Head of Data",
    blurb:
      "Led data for the AR Experiences pillar inside Meta's Reality Labs — ~100 people foundational to Meta's AR glasses. Managed 5 data scientists. Identified friction in the creator ecosystem that led to a new content platform; AR inventory grew 40×. Oversaw 90+ A/B tests across Commerce, World, Location, and Remote Presence AR.",
    details: [
      "Head of Data for the AR Experiences pillar inside Meta's Reality Labs — a ~100-person org building the new mobile AR experiences that are foundational to the future success of Meta's AR glasses. Managed a team of five data scientists.",
      "Identified friction in our AR creator ecosystem, which led to new headcount and a dedicated effort to build a simpler content platform for creators to upload 3D models into the metaverse — increasing our AR content inventory by 40×.",
      "On the consumer side, identified opportunities to introduce 3D objects into the Instagram feed, which we pitched to leadership; the result was a cross-org collaboration between the Camera, 3D Scanning, and Instagram Platform teams.",
      "Oversaw 90+ experiments across the Commerce, World Experiences, Location Experiences, and Remote Presence AR verticals. Co-wrote and presented strategy docs to leadership — mission/vision, roadmaps, OKRs.",
    ],
    tags: ["meta", "reality labs", "team lead", "ar"],
    colors: ["#101820", "#3a82c8", "#b8e0ff", "#1a4870"],
    seed: 5,
  },
  {
    idx: 4,
    year: "2015—2016",
    kind: "product · data science",
    title: "Meta · Pages & Search",
    role: "Data Scientist",
    blurb:
      "Shipped 100+ improvements on Pages, Lite, Messenger, Search, Business Platform. +2% page likes, +5% website clicks on biz pages (1B MAU). Caught Pages undercounting visits by 30%; new logging surfaced +1% topline active businesses. Built Meta's first video search engine — presented to MZ, launched.",
    details: [
      "Shipped 100+ product improvements across Facebook Lite, Messenger, Search, Business Platform and Reality Labs. Worked closely with PMs, engineers, designers and researchers to set metrics, identify opportunities through data, design and evaluate A/B tests, and ship.",
      "On the Pages product (1B Monthly Users), identified 10+ usability issues and drove a team to run several experiments to fix them. Results: +2% page likes, +5% website clicks on business pages — helping millions of businesses.",
      "Discovered Pages was under-counting visits by 30%. Convinced leadership to spin up a new team to overhaul all event logging; the new logging surfaced a 1% lift in active businesses (a topline company metric).",
      "On Search: identified common failure patterns; engineers improved keyword suggestions and results, decreasing failed searches by 5M and lifting Facebook search quality by 2%.",
      "Built the first video search engine at the company — quantified video search behavior, mined keyword suggestions, ran UX sessions, coordinated across Search and Video teams. Presented to Mark Zuckerberg; launched across surfaces.",
    ],
    tags: ["meta", "search", "video", "product"],
    colors: ["#1a1a26", "#7a6dd6", "#d4ccff", "#3e3a82"],
    seed: 7,
  },
  {
    idx: 5,
    year: "2013—2015",
    kind: "thesis · field",
    title: "TIRO · Labor NGOs in China",
    role: "Co-author · Developer",
    blurb:
      "Masters capstone at Berkeley. After fieldwork in southern China studying labor NGOs that serve injured migrant workers, my team built TIRO — a mobile + web platform for hotline case logging, demographic reporting, and impact dashboards. Designed for low-trust, low-bandwidth environments.",
    details: [
      "Master's thesis at UC Berkeley. My team conducted field-site research in southern China on the labor NGOs that help injured migrant workers. There we identified opportunities to improve the efficiency and sustainability of those NGOs' services.",
      "Chinese NGOs operate in a challenging political environment, and many lack the resources to operate efficiently or to clearly demonstrate the nature and value of their work. Phone-based consultations are the most integral part of their operations, but were still tracked on paper.",
      "We built TIRO — a hotline management system: an Android app for operators to log conversation content and retrieve call details, plus a web app for NGOs to generate demographic, caller-relationship and service-provisioning reports. Designed for low-trust, low-bandwidth environments where paper logs were still the norm.",
      "Built with my teammates Faye Ip, Jenny Lo, and Sophia Lay. The political environment for Chinese labor NGOs has since worsened; the operator-tooling pattern still travels anywhere helplines run.",
    ],
    tags: ["berkeley", "android", "impact", "field research"],
    colors: ["#1a1812", "#a87838", "#e0c898", "#604830"],
    seed: 17,
    link: "https://www.ischool.berkeley.edu/projects/2015/tiro",
  },
  {
    idx: 6,
    year: "2009—2012",
    kind: "research · simulation",
    title: "Predicting Train Accidents",
    role: "Lead Developer",
    blurb:
      "After Graniteville and Chatsworth, congress required Class I railroads to prove ≥80% accident reduction from Positive Train Control. The FRA hired us to build the method. We invented a multi-level splitting simulator that turned 93 days of compute per study into 3. Co-published, TRR 2289 (2012).",
    details: [
      "After the 2005 Graniteville chlorine collision and the 2008 Chatsworth collision, congress passed the Rail Safety Improvement Act — requiring all Class I railroads carrying passengers or toxic-by-inhalation materials to install Positive Train Control. Final regulations required railroads to demonstrate, via risk assessment, that PTC delivered at least an 80% reduction in risk.",
      "The Federal Railroad Administration hired our firm, DecisionTek, to invent the method. The challenge: train accidents are rare and highly territory-specific, so frequencies cannot be estimated empirically — they must be simulated. We needed to simulate hundreds of years of operations on modeled territories that closely replicated each one in study, accounting for human errors and equipment failures.",
      "Even on a 12-core high-performance server, simulating one day of operations took 22 seconds; 1,000 simulated years would take 93 days of wall time. We solved this with multi-level splitting: three stages — generate errors → generate hazards → generate accidents — freezing and resuming simulator state between stages so compute only goes toward the paths most likely to fail.",
      "Result: PTC risk analyses ran in three days instead of 93, with high statistical confidence. Class I railroads use it to validate their PTC implementations; the FRA uses it to approve. Co-published: Meyers, Stambouli, McClure, Brod (2012), Transportation Research Record 2289, pp. 34–41.",
    ],
    tags: ["decisiontek", "fra", "simulation", "published"],
    colors: ["#162018", "#4a8a64", "#cce4d4", "#2a5840"],
    seed: 11,
  },
  {
    idx: 7,
    year: "2010—2012",
    kind: "tool · data viz",
    title: "GTMS · Rail Visualizer",
    role: "Lead Developer",
    blurb:
      "A visual editor for the railroad-infrastructure data feeding the simulator. 12 spreadsheets per territory became a single interactive canvas; a graph-traversal algorithm validated connectivity in real time. 3 weeks of analyst work became 3 days. Built solo over four months in Silverlight + .NET.",
    details: [
      "The simulator needed extensive railroad infrastructure data — properties of the physical track (length, connectivity, grades, curvatures), equipment (switches, grade crossings, signals), and traffic conditions (train equipment, timetables, schedules). Defining this across 12 spreadsheets per territory was onerous; analysts spent ~3 weeks setting up a 100-mile double-track territory and made connectivity errors constantly.",
      "I built a visual editor over four months in Silverlight + .NET. Drag to lay track. Click any segment, switch, grade, curvature or speed zone to edit it. A graph-traversal algorithm rendered the territory from the underlying data — only valid connectivity would draw, so analysts could see their errors instantly.",
      "The algorithm trimmed or extended segments to handle real-world topology — sidings that parallel the main with different lengths, crossovers, wyes. Users could also build territories from scratch on a blank canvas, clicking out new rail lines and adding interconnects.",
      "Result: a 100-mile double-track territory took 3 days instead of 3 weeks. Analysts saved ~10 hours/week; troubleshooting tickets fell off a cliff. Railroads complimented the depictions.",
    ],
    tags: ["silverlight", ".NET", "graph", "data viz"],
    colors: ["#201912", "#c89844", "#ffe0b0", "#806440"],
    seed: 13,
  },
  {
    idx: 8,
    year: "2012",
    kind: "nonprofit · civic",
    title: "Social Rescue Project",
    role: "Founder",
    blurb:
      "A nonprofit and Android app I founded to help homeless-relief organizations track locations of unhoused individuals in need. Piloted with Seattle's Union Gospel Mission to coordinate their Search-and-Rescue van missions. GPS-tagged needs synced to a central dispatch console.",
    details: [
      "Every day, homeless individuals — particularly those with mental or addiction issues — refuse shelter or are left unattended. Relief organizations search for these people to provide blankets, food, or transportation to a nearby shelter, but could use help tracking locations in need and coordinating among volunteers and staff.",
      "I founded Social Rescue Project to address this. Built an Android app for relief-org staff to record and view locations during search-and-rescue missions. When encountering an individual in need, staff log GPS coordinates and structured needs — \"adult and child require food and water\", \"man with addiction issues is wounded and needs first aid\".",
      "A companion web console at headquarters gave staff a live map of all logged locations, so they could determine resources required and dispatch teams accordingly. Sharing data across the org increased transparency, decreased wait-time, and reduced errors from manual location-writing.",
      "Piloted in 2012 with Seattle's Union Gospel Mission, the largest homeless-relief organization in Seattle and operator of the city's Search-and-Rescue van.",
    ],
    tags: ["founder", "civic tech", "android"],
    colors: ["#181820", "#5664d8", "#c0c4ff", "#28326c"],
    seed: 19,
  },
];

export const EXPERIENCE = [
  { dates: "2024—NOW", org: "bello.art", role: "Founder · CEO" },
  {
    dates: "2022—2024",
    org: "Adobe",
    role: "Photoshop Partner · Sponsored Creator",
  },
  {
    dates: "2015—2021",
    org: "Meta",
    role: "Data Scientist → Head of Data, AR Experiences",
  },
  {
    dates: "2013—2015",
    org: "UC Berkeley",
    role: "Master's in Information Management and Systems (MIMS)",
  },
  { dates: "2013", org: "Vietnam · CSIP", role: "Volunteer Developer" },
  {
    dates: "2009—2012",
    org: "DecisionTek",
    role: "Product Manager & Software Engineer",
  },
];
