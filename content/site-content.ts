/**
 * Centralized approved website copy from Hephaestus International. Version 3.pdf
 * Do not rewrite without approval. See contentTodos for flagged items.
 * Paragraphs group PDF line wraps; wording is unchanged.
 */

import { siteUrl, withBasePath } from "@/lib/site-url";

export const siteConfig = {
  name: "Hephaestus International",
  tagline: "Center of Excellence and Ethics",
  url: siteUrl,
  contactEmail: "info@hephaestus.international",
  linkedInLabel: "FloLabs Innovation on LinkedIn",
  linkedInUrl: "https://www.linkedin.com/company/flolabs-innovation/",
  youtubeUrl: "https://www.youtube.com/@flolabsinnovation",
  youtubeLabel: "FloLabs Innovation on YouTube",
} as const;

export const contentTodos = [
  "Hypatia link: slide 11 (Insert the link*) needs URL from stakeholder",
  "Grammar: For us, is the place (slide 7)",
  "Typo: But with very system (slide 11)",
  "Slide 2 trailing = on Lemnos date line",
  "Privacy policy body: legal review required",
  "Contact form endpoint: confirm API vs mailto",
  "Footer YouTube URL: confirm channel URL with stakeholder",
] as const;

export const navPrimaryLinks = [
  { href: "/about", label: "About us" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/internships", label: "Internships" },
] as const;

export const navUtilityLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log in" },
] as const;

export const navLinks = [...navPrimaryLinks, ...navUtilityLinks] as const;

export const siteFooter = {
  projectLine: "by FloLabs Innovations Group",
  description:
    "Where ancient history meets modern innovation. Where craft becomes code, curiosity becomes capability, and intention becomes infrastructure.",
  tagline: "Live long and prosper.",
  newsletter: {
    title: "Newsletter",
    prompt: "Receive the newest FloLabs updates at:",
    placeholder: "Enter your email...",
    submitLabel: "Subscribe to newsletter",
  },
  socialTitle: "Social Media",
  navigation: {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      ...navPrimaryLinks,
      navUtilityLinks[0],
    ],
  },
  projects: {
    title: "Projects",
    links: [
      {
        id: "athletic-performance-intelligence",
        label: "Athletic Performance",
      },
      {
        label: "Bootcamp University",
        href: "https://www.bootcampuniversity.org/",
      },
      { id: "caipo", label: "CAIPO" },
      { id: "connecting-the-dots", label: "Connecting the Dots" },
      { id: "flotravel", label: "Flo Travel" },
      { id: "flobrain", label: "FloBrain" },
      { id: "flolabs-international", label: "FloLabs International" },
      { id: "flostudios", label: "FloStudios" },
      { id: "hephaestus-international", label: "Hephaestus International" },
      { id: "moodchanger", label: "MoodChanger" },
      {
        id: "legal-ethics",
        label: "Legal & Ethics Ventures Institute",
      },
      { id: "humanoid-robots", label: "RoboCollective" },
      { id: "space-ventures", label: "Space Ventures Institute" },
      { id: "tarrl", label: "TARRL" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Careers", href: "/internships" },
      { label: "Contact Us", href: "/contact" },
      {
        label: "Merch",
        href: "https://flolabsrd.notion.site/merch-background",
      },
    ],
  },
} as const;

export const hero = {
  title: "Hephaestus International",
  subtitle: "Center of Excellence and Ethics",
  taglines: [
    "From Origins to the Architecture of Intelligence.",
    "Be at the Center of the Future.",
  ],
} as const;

export const didYouKnow = {
  leadIn: "Did you know …",
  facts: [
    'Hephaestus is pronounced "Efestos".',
    "Lemnos, situated in Greece, a magnificent place yet undiscovered wonder of the world...",
    "Lemnos was believed to be one of Hephaestus\u2019 favourite places, and ancient stories connected the island with his forge.",
    "Hephaestus was probably there around 2,000 BC, or maybe earlier, around 10,000 BC when the first inhabitants were there.",
    "Greek myth imagined Hephaestus building self-moving golden tripods, almost like ancient robot servants for the gods.",
    "Hephaestus was said to have golden assistants with intelligence, speech, and strength, a very old mythological image of artificial helpers.",
    "Talos is the first trace of artificial intelligence created by Hephaestus.",
    'The famous "Pandora\'s Box" saying comes from Greek mythology, where Hephaestus created Pandora with the jar containing all manner of mystery and evil.',
    "One myth says Hephaestus created a magical golden chair that trapped Hera until Dionysus brought him back to Olympus.",
    "Hephaestus once made an almost invisible bronze net to trap Ares and Aphrodite, proving that even on Olympus, the best revenge was engineering.",
  ],
  closing: "Ready to hear the story?",
} as const;

export const positioning = {
  title: "Hephaestus International",
  paragraphs: [
    "Where ancient history meets modern innovation.",
    "Where craft becomes code, curiosity becomes capability, and intention becomes infrastructure.",
    "We don\u2019t shape minds to fit the frame\u2026",
    "We teach them to redraw it.",
  ],
} as const;

export const pillars = {
  title: "How we built the future…",
  items: [
    {
      number: "1",
      title: "What We Do",
      paragraphs: [
        "Build at the intersection of making, learning, and intelligence. Educate, launch ventures. Cultivate jobs of the future.",
      ],
    },
    {
      number: "2",
      title: "How We Do It",
      paragraphs: [
        "Revitalize trade school models for today. Inspire curiosity, creativity, STEM. Foster innovation and problem-solving.",
      ],
    },
    {
      number: "3",
      title: "Why It Matters",
      paragraphs: [
        "Empower learners to make a meaningful impact. Give learners the wings to build, create, and lead. Provide transformative experiences and global perspective.",
      ],
    },
  ],
} as const;

export const roots = {
  lines: [
    "Everything starts somewhere.",
    "Every tradition has roots.",
    "Every great endeavor is shaped by intention.",
    "Ours is too.",
  ],
} as const;

export const mappingLegacy = {
  title: "Mapping the Legacy",
} as const;

export const lemnos = {
  title: "Where Legacy Becomes Innovation",
  paragraphs: [
    "Each journey has a story. Ours bears a legacy…",
    "Long before innovation became a buzzword, it had a place.",
    "An island where creation was not only imagined but forged.",
    "Not theorized. Not abstracted.",
    "Made.",
    "That place was Lemnos.",
    "A cornerstone of craftsmanship, where materials, ideas, and techniques converged, traveled, and evolved.",
    "In ancient history… it was the forge of Hephaestus.",
    "In practice… it was a place where making shaped progress.",
    "For us, is the place where knowledge becomes form, where ideas leave the mind and enter the world…",
    "Our forge.",
    "Our workshop.",
    "Our first lab.",
  ],
} as const;

export const nameBridge = {
  lines: [
    "Before a name exists, the work must speak.",
    "Before a legacy can be claimed, it must be earned.",
    "And so, a name is born...",
  ],
} as const;

export const nameOrigins = {
  title: "The origins of the Name",
  footer:
    "At Hephaestus International, where the wisdom of the past meets the forge of the present.",
  leftBlocks: [
    [
      "We did not borrow it.",
      "We reclaimed it.",
      "We returned to the spark that started it all.",
    ],
    [
      "Hephaestus International was never named at random.",
      "Our mission was never stitched together from trends.",
    ],
    [
      "In the distant past, Hephaestus was the maker.",
      "The builder.",
      "The Greek architect of tools and systems that turned raw material into possibility.",
    ],
  ],
  rightBlocks: [
    [
      "We closed a chapter of what had been.",
      "We opened a path toward what could be.",
    ],
    [
      "What we are building comes from the way humanity has always advanced:",
      "by making,",
      "by learning through doing,",
      "and by questioning what exists.",
    ],
    [
      "At heart, he represents something timeless:",
      "the force that brings craft, knowledge, and creation into one place…",
    ],
  ],
} as const;

export const engineBridge = {
  lines: [
    "We've got the place.",
    "We've got the force.",
    "But tools without knowledge are a journey without a destination…",
  ],
} as const;

export const learningEngine = {
  title: "The Learning Engine",
  paragraphs: [
    "Across history, humanity's greatest advances have emerged where making meets learning.",
    "Alexandria… became the epicenter of that convergence, not simply a place of knowledge, but a system for it.",
    "A place where ideas were collected, tested, shared, and expanded.",
    "Where learning was not preserved for its own sake, but applied, challenged, and advanced.",
    "A system designed to unite people through understanding.",
    "But with very system comes a center…",
    "For Alexandria, that center was Hypatia. (Insert the link*)",
    "Not just a name in history, but a symbol in motion.",
    "A gatekeeper of access, a translator of knowledge, proof that learning only transforms when it is shared, lived, and experienced.",
    "Today, that spirit drives us. Here…",
    "We've created a living system that keeps our ecosystem in motion.",
    "Where exploration sparks practice, ideas evolve through experience, and understanding compounds through use, uniting people in a shared dance of learning.",
  ],
  // TODO: Replace with approved Hypatia URL
  hypatiaHref: undefined as string | undefined,
} as const;

export const formBridge = {
  lines: ["Most stories are told…", "Ours is written and takes a form…"],
} as const;

export const ecosystem = {
  title: "Where Intelligence Takes Form",
  subtitle:
    "The blueprint where learning, making, and innovation collide.",
  items: [
    {
      id: "flobrain",
      title: "FloBrain is Our Alexandria: Where knowledge is gathered, synthesized, and shared.",
      paragraphs: [
        "A unified AI middleware layer designed as a form of streaming intelligence. A single, persistent platform linking AI models, tools, data, and devices across web, mobile, wearables, and robotics.",
        "An always-on, adaptive intelligence layer that can not only power the ecosystem but also be deployed standalone, maintaining context, orchestrating actions, and connecting every piece of it.",
        'The hub where ideas become insight. Our "digital cord" tying all intelligence together.',
      ],
    },
    {
      id: "caipo",
      title: "CAIPO is Our Craftsmanship: The power of Hephaestus made real.",
      paragraphs: [
        "The Chief AI Productivity Officer.",
        "A personal voice assistant that transcribes meetings, translates 110+ languages in real time, and learns to know individuals, helping them live long and prosper.",
        "A wearable embodiment that turns thought into action.",
      ],
    },
    {
      id: "roboshows",
      title: "RoboShows are Our Playground: Bringing History to Life",
      paragraphs: [
        "Just as Hephaestus created Talos and Pandora, displaying innovation and ingenuity in Lemnos, we bring that spirit into the modern era.",
        "Through RoboShows, public performances of robots and embodied AI, we showcase our creations in ways that inspire, entertain, and educate.",
        "We combine entertainment with learning, sparking curiosity, promoting STEM careers, and connecting communities to the future of technology.",
        "We don't just tell stories, we bring them to life. By connecting creativity, technology, and community, we transform ancient history into experiences you can see, touch, and feel.",
      ],
    },
  ],
} as const;

export const closingCta = {
  lead:
    "You've seen the forge. You've seen the library. You've seen the intelligence, the tools, the craft.",
  prompt: "Now the choice is yours:",
  questions: [
    "Do you want to step into the making?",
    "Do you want to turn curiosity into capability?",
    "Do you want to be a part of our story?",
  ],
  headline: "Join us.",
  tagline: "Be at the Center of the Future.",
  primaryHref: "/internships",
  primaryLabel: "Join us",
} as const;

export const seo = {
  defaultTitle: "Hephaestus International | Center of Excellence and Ethics",
  defaultDescription:
    "From Origins to the Architecture of Intelligence. Be at the Center of the Future.",
} as const;

/** Live site functional copy (v1 preserved per plan) */
export const aboutPage = {
  title: "About us",
  heading: "Hephaestus International",
  program: "EXECUTIVE MANAGEMENT PROGRAM",
  intro:
    "Provides students a remote , unique , powerful , and immersive hands on educational experience.",
  objectivesTitle: "Objectives",
  objectives:
    "Experiential Learning: Unique and immersive educational training with hands-on, real world experience. Provide practical experience working on innovative marketable projects.",
  missionTitle: "Mission",
  mission:
    "Inspire and empower individuals through transformative educational experiences that foster global perspectives, innovative thinking, and practical skills. We aim to cultivate a culture of curiosity and creativity, create jobs of the future, and build innovative solutions for a rapidly changing world.",
  teamTitle: "Our Team",
  teamBody:
    "Meet the Flo Team. Our team consists of passionate innovators, researchers, and industry experts dedicated to advancing AI and robotics technologies. Together, we're building the future through cutting-edge research, experiential learning, and collaborative innovation.",
  storyLinkLabel: "Explore our story",
  storyLinkHref: "/#positioning",
} as const;

export const internshipsPage = {
  title: "Internships",
  heading: "Internship Positions",
  intro:
    "Join us and be at the Center of the Future. Explore experiential learning pathways with Hephaestus International.",
  ctaLabel: "View opportunities",
  note: "Subject Matter Accelerator Programs. Over 30 Unique Positions Available.",
} as const;

export type GalleryItemMedia =
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
    }
  | {
      type: "video";
      poster: string;
      posterWidth: number;
      posterHeight: number;
      alt: string;
    };

export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  media: GalleryItemMedia;
  /** Facebook or other iframe embed URL for inline playback on the gallery page. */
  embedSrc?: string;
};

/** Gallery tiles link to external pages for full stories, articles, or videos. */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: "carl-sagan-cosmos-lost-history",
    title: 'Carl Sagan, Cosmos: "The Knowledge We Lost To History"',
    description:
      "Carl Sagan on Cosmos, shared by Saganism on Facebook. Play here or open the reel.",
    href: "https://www.facebook.com/share/v/1CfWSqLy2j/",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F753412424454490&show_text=false&width=560&height=315",
    media: {
      type: "video",
      poster: withBasePath("/images/carl-sagan-cosmos-lost-history.jpg"),
      posterWidth: 406,
      posterHeight: 720,
      alt: 'Carl Sagan Cosmos reel preview, "The Knowledge We Lost To History"',
    },
  },
  {
    id: "carl-sagan-death-of-hypatia",
    title: "Carl Sagan and the Death of Hypatia (Cosmos Audio)",
    description:
      "Carl Sagan on Hypatia from Cosmos, shared by Saganism on Facebook. Play here or open the reel.",
    href: "https://www.facebook.com/share/v/1HVpEuofjQ/",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F860185246978132&show_text=false&width=560&height=315",
    media: {
      type: "video",
      poster: withBasePath("/images/carl-sagan-hypatia-cosmos.jpg"),
      posterWidth: 1152,
      posterHeight: 2048,
      alt: "Carl Sagan on the death of Hypatia from Cosmos, reel preview",
    },
  },
  {
    id: "limnos-from-above",
    title: "Limnos from Above",
    description:
      "Sunset photography from Limnos from Above. See the full post for more.",
    href: "https://www.facebook.com/groups/236778251861578/permalink/1194551059417621/",
    media: {
      type: "image",
      src: withBasePath("/images/limnos-from-above-gallery.png"),
      width: 1024,
      height: 575,
      alt: "Sunset over Mount Athos and the sea, Limnos from Above photography",
    },
  },
  {
    id: "limnos-from-above-sea-stacks",
    title: "Limnos from Above: Sea Stacks at Sunset",
    description:
      "Sunset between sea stacks on Limnos. See the full post for more.",
    href: "https://www.facebook.com/groups/236778251861578/permalink/1179467540925973",
    media: {
      type: "image",
      src: withBasePath("/images/limnos-from-above-sea-stacks.png"),
      width: 1024,
      height: 575,
      alt: "Sunset between sea stacks on Limnos, Limnos from Above photography",
    },
  },
  {
    id: "limnos-hephaistia-theatre-360",
    title: "Limnos from Above: Ancient Theatre of Hephaistia (360°)",
    description:
      "360° photograph of the Ancient Theatre of Hephaistia on Limnos. See the full post for more.",
    href: "https://www.facebook.com/groups/236778251861578/permalink/1161231762749551/",
    media: {
      type: "image",
      src: withBasePath("/images/limnos-hephaistia-theatre-360.jpg"),
      width: 600,
      height: 600,
      alt: "360° view of the Ancient Theatre of Hephaistia on Limnos, Limnos from Above photography",
    },
  },
  {
    id: "john-hazlewood-five-years-later",
    title: "5 Years Later",
    description:
      "Photos shared by John Andrew Hazlewood on Facebook. See the full post for more.",
    href: "https://www.facebook.com/john.a.hazlewood/posts/5-years-later-/10234695141053810/",
    media: {
      type: "image",
      src: withBasePath("/images/limnos-coastal-bay-sunset.png"),
      width: 550,
      height: 248,
      alt: "Preview image for John Andrew Hazlewood Facebook post, 5 Years Later",
    },
  },
  {
    id: "limnos-from-above-video",
    title: "Limnos from Above (Η Λήμνος από ψηλά)",
    description:
      "Aerial views of Limnos by Dimitris Eleftherakis on Facebook. Play here or open the reel.",
    href: "https://www.facebook.com/share/v/18xaGEJKNA/",
    embedSrc:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F795948636178330&show_text=false&width=560&height=315",
    media: {
      type: "video",
      poster: withBasePath("/images/limnos-from-above-reel.jpg"),
      posterWidth: 1280,
      posterHeight: 720,
      alt: "Aerial reel preview from Limnos from Above by Dimitris Eleftherakis",
    },
  },
  {
    id: "talos-minoan-greek-reporter",
    title: "Was Talos, the Protector of Ancient Crete, Actually a Minoan?",
    description:
      "GreekReporter on Talos, the bronze automaton created by Hephaestus, and links to Minoan Crete.",
    href: "https://greekreporter.com/2026/02/17/talos-protector-ancient-crete-minoan/",
    media: {
      type: "image",
      src: withBasePath("/images/talos-greek-reporter.jpg"),
      width: 1020,
      height: 912,
      alt: "Talos, a giant bronze automaton described as a creation of Hephaestus in Greek mythology",
    },
  },
  {
    id: "hypatia-greek-reporter",
    title: "Hypatia: The Female Greek Philosopher Killed for Her Beliefs",
    description:
      "GreekReporter on Hypatia, the Alexandrian philosopher, astronomer, and mathematician.",
    href: "https://greekreporter.com/2026/03/02/hypatia-greek-philosopher/",
    media: {
      type: "image",
      src: withBasePath("/images/hypatia-greek-reporter.jpg"),
      width: 700,
      height: 335,
      alt: "Death of the Greek philosopher Hypatia in Alexandria, unknown artist, public domain",
    },
  },
  {
    id: "connecting-the-dots",
    title: "Connecting the Dots",
    description:
      "FloLabs conversations on AI, robotics, entrepreneurship, and education.",
    href: "https://www.youtube.com/@flolabsinnovation",
    media: {
      type: "video",
      poster: withBasePath("/images/pillars-background.webp"),
      posterWidth: 1024,
      posterHeight: 682,
      alt: "Connecting the Dots video series preview",
    },
  },
  {
    id: "flolabs-linkedin",
    title: "FloLabs Innovation on LinkedIn",
    description: "Updates, breakthroughs, and emerging tech from the FloLabs ecosystem.",
    href: "https://www.linkedin.com/company/flolabs-innovation/",
    media: {
      type: "image",
      src: withBasePath("/images/positioning.webp"),
      width: 800,
      height: 1200,
      alt: "FloLabs Innovation on LinkedIn",
    },
  },
] as const;

export const galleryPage = {
  title: "Gallery",
  heading: "Gallery",
  empty: "New gallery items will appear here soon.",
  externalLinkLabel: "Learn more",
  watchExternalLabel: "Watch on Facebook",
  viewFullImageLabel: "View full image",
  playVideoLabel: "Play video",
  closeViewerLabel: "Close",
} as const;

export const loginPage = {
  title: "Log in",
  heading: "Centralize your whole journey in one place.",
  body: "Sign in to access your programs, applications, and learning resources. Account access is provided to enrolled participants.",
} as const;

export const contactPage = {
  title: "Contact Us",
  heading: "Contact Us",
  intro: "Have questions? We'd love to hear from you.",
  formTitle: "Send Us a Message",
  otherTitle: "Other Ways to Reach Us",
} as const;

export const privacyPage = {
  title: "Privacy Policy",
  heading: "Privacy Policy",
  // TODO: Legal review required
  body: "This privacy policy page is a placeholder pending legal review. For inquiries, contact info@hephaestus.international.",
} as const;

/**
 * Initiative names and external URLs.
 * storytellingId: approved Version 3 PDF copy (ecosystem.items).
 * paragraphs / focusPoints: project-specific copy on the catalog entry.
 */
/** Alphabetical by title. Display order is also enforced in getProjectsCatalogSorted(). */
export const projectsCatalog = [
  {
    id: "athletic-performance-intelligence",
    title: "Athletic Performance Intelligence",
    href: "https://www.athleticperformanceintelligence.com/",
  },
  {
    id: "caipo",
    title: "CAIPO",
    href: "https://www.caipo.ai/",
    storytellingId: "caipo",
  },
  {
    id: "connecting-the-dots",
    title: "Connecting The Dots",
    href: "https://www.youtube.com/@flolabsinnovation",
    paragraphs: [
      "Connecting the Dots is a FloLabs media and storytelling project that turns conversations, meetings, and founder insights into clear episodes about innovation. The series helps explain how different FloLabs projects, ideas, and teams connect across AI, robotics, entrepreneurship, education, and real-world problem solving. It gives viewers a behind-the-scenes look at the challenges, thinking, and vision behind building something new.",
    ],
    focusPoints: [
      "Thought leadership and storytelling",
      "Behind-the-scenes FloLabs conversations",
      "AI, robotics, entrepreneurship, and education",
      "Connecting different projects into one bigger vision",
      "Making complex ideas easier to understand publicly",
    ],
  },
  {
    id: "flobrain",
    title: "FloBrain",
    href: "https://www.flobrain.ai/",
    storytellingId: "flobrain",
  },
  {
    id: "flolabs-innovations",
    title: "FloLabs Innovations Group",
    href: "https://www.flolabsinnovations.com/",
  },
  {
    id: "flolabs-international",
    title: "FloLabs International",
    href: "https://www.flolabs.international/",
  },
  { id: "flostudios", title: "FloStudios", href: "https://www.flostudios.ai/" },
  { id: "flotravel", title: "FloTravel", href: "https://www.flomadtravel.com/" },
  {
    id: "hephaestus-international",
    title: "Hephaestus International",
    href: "https://hephaestus.international/",
  },
  {
    id: "humanoid-robots",
    title: "Humanoid Robots",
    href: "https://robocollective.ai/",
  },
  {
    id: "legal-ethics",
    title: "Legal & Ethics Ventures Institute",
    href: "https://www.legalethicsventuresinstitute.com/",
  },
  {
    id: "moodchanger",
    title: "MoodChanger",
    href: "https://www.moodchanger.ai/",
  },
  {
    id: "moodchanger-pets",
    title: "MoodChanger for Pets",
    href: "https://moodchanger.ai/pets",
  },
  {
    id: "roboshows",
    title: "RoboShows",
    href: "https://www.robocollective.ai/",
    storytellingId: "roboshows",
  },
  {
    id: "space-ventures",
    title: "Space Ventures Institute",
    href: "https://www.spaceventuresinstitute.com/",
  },
  { id: "tarrl", title: "TARRL", href: "https://www.tarrl.org/" },
] as const;

export const projectsPage = {
  title: "Our Projects",
  heading: "Our Projects",
  intro:
    "Initiatives in the Hephaestus and FloLabs ecosystem. Open a project for full details.",
  viewDetailsLabel: "View details",
  backToProjectsLabel: "All projects",
  externalSiteLabel: "Visit site",
  focusPointsTitle: "Focus points:",
  noApprovedCopyNote:
    "Approved presentation copy is not available for this initiative. Use the project site link below when provided.",
} as const;
