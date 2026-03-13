// Media paths
export const MEDIA = {
  heroVideo: "/media/enzo/timeline_section_1_video_1.mp4",
  portrait: "/media/enzo/IMG_0508.jpeg",
  journey: [
    { type: "video" as const, src: "/media/enzo/timeline_section_1_video_0.mp4" },
    { type: "image" as const, src: "/media/enzo/timeline_section_2_image_1.jpeg" },
    { type: "image" as const, src: "/media/enzo/timeline_section_3_image3.jpeg" },
    { type: "image" as const, src: "/media/enzo/timeline_section_4_image1.jpeg" },
  ],
};

export const SITE = {
  name: "Enzo Gilbert",
  tagline: "Talent Beyond His Years",
  email: "hello@enzogilbert.com",
  copyright: `© ${new Date().getFullYear()} Enzo Gilbert | Managed by Parents | All Rights Reserved`,
  social: {
    youtube: "https://youtube.com/@enzogilbert",
    instagram: "https://instagram.com/enzogilbert",
    tiktok: "https://tiktok.com/@enzogilbert",
  },
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Sports", href: "#sports" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

export const HERO_CONTENT = {
  headline: "ENZO GILBERT",
  tagline: "Talent Beyond His Years",
  subheadline:
    "At just three years old, Enzo shows a remarkable gift for golf. His focus, energy, and natural ability on the course have amazed everyone who has seen him play.",
  cta: "Explore Enzo's Journey",
};

export const ABOUT_CONTENT = {
  heading: "Meet Enzo",
  body: [
    "Hi, we are the Gilberts, and this is Enzo. From the moment he could hold a golf club, he showed a natural love for the game. What began as fun time with his dad soon revealed a real spark of talent.",
    "Enzo is determined, funny, and full of life. He loves spending time on the course, learning new skills, and enjoying every challenge golf brings.",
    "As his parents, our goal is to nurture his passion safely and positively, while inspiring other children and families who believe in the joy of sport.",
  ],
  quote:
    "We want Enzo to grow, learn, and inspire others through his love for golf.",
};

export const JOURNEY_CONTENT = {
  heading: "Enzo's Golf Journey",
  subheading: "Every swing tells a story.",
  milestones: [
    {
      id: 1,
      title: "The Beginning",
      description:
        "Enzo first picked up a golf club at just 12 months old. Even then, his natural swing caught attention.",
      caption: "Tiny golfer. Big focus.",
    },
    {
      id: 2,
      title: "Learning and Practice",
      description:
        "Since the age of 18 months, Enzo has been practising on the golf course for around five hours each week, guided and supported by his dad.",
      caption: "Every swing brings a new lesson.",
    },
    {
      id: 3,
      title: "First Tournament",
      description:
        "In October, Enzo entered his very first tournament — and won. Competing against children much older than him, his focus and confidence shone through.",
      caption: "First tournament. First win.",
    },
    {
      id: 4,
      title: "What's Next",
      description:
        "With each swing, Enzo continues to learn and improve. His journey is only just beginning.",
      caption: "The best is yet to come.",
    },
  ],
};

export const SPORTS_CONTENT = {
  heading: "Beyond the Green",
  subheading: "Golf is just the beginning. Enzo loves every sport he tries.",
  sports: [
    { name: "Football", slug: "football" },
    { name: "Motocross", slug: "motocross" },
    { name: "Skiing", slug: "skiing" },
    { name: "Karate", slug: "karate" },
  ],
};

export const SPORTS_MEDIA = [
  {
    name: "Golf",
    slug: "golf",
    media: [
      { type: "image" as const, src: "/media/organised/golf/golf 1.png" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_1_video_0.mp4" },
      { type: "image" as const, src: "/media/organised/golf/golf 2.png" },
      { type: "image" as const, src: "/media/organised/golf/golf 3.jpeg" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_1_video_2.mp4" },
      { type: "image" as const, src: "/media/organised/golf/golf 4.png" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_1_video_3.mp4" },
      { type: "image" as const, src: "/media/organised/golf/golf 5.png" },
      { type: "image" as const, src: "/media/organised/golf/golf 6.png" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_2_video_1.mp4" },
      { type: "image" as const, src: "/media/organised/golf/golf 7.png" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_4_video1.mp4" },
      { type: "image" as const, src: "/media/organised/golf/golf 8.png" },
      { type: "image" as const, src: "/media/organised/golf/golf 11.jpg" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_4_video2.mp4" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_1_video_1.mp4" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_4_video3.mp4" },
      { type: "video" as const, src: "/media/organised/golf/timeline_section_2_video_2.mp4" },
    ],
  },
  {
    name: "Football",
    slug: "football",
    media: [
      { type: "image" as const, src: "/media/organised/football/football 1.jpeg" },
      { type: "video" as const, src: "/media/organised/football/football vid 1.mp4" },
      { type: "image" as const, src: "/media/organised/football/football 2.jpg" },
      { type: "video" as const, src: "/media/organised/football/football vid 2.mp4" },
      { type: "image" as const, src: "/media/organised/football/football 3.jpeg" },
    ],
  },
  {
    name: "Motocross",
    slug: "motocross",
    media: [
      { type: "image" as const, src: "/media/organised/motocross/motocross 1.png" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 1.mp4" },
      { type: "image" as const, src: "/media/organised/motocross/motocross 2.png" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 2.mp4" },
      { type: "image" as const, src: "/media/organised/motocross/motocross 3.png" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 4.mp4" },
      { type: "image" as const, src: "/media/organised/motocross/motocross 4.png" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 5.mp4" },
      { type: "image" as const, src: "/media/organised/motocross/motocross 5.png" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 6.mp4" },
      { type: "image" as const, src: "/media/organised/motocross/motocross 8.jpeg" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 7.mp4" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 3.mp4" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 8.mp4" },
      { type: "video" as const, src: "/media/organised/motocross/motocross vid 9.mp4" },
    ],
  },
  {
    name: "Skiing",
    slug: "skiing",
    media: [
      { type: "image" as const, src: "/media/organised/ski/ski 1.jpeg" },
      { type: "video" as const, src: "/media/organised/ski/ski vid 1.mp4" },
      { type: "image" as const, src: "/media/organised/ski/ski 2.jpeg" },
      { type: "image" as const, src: "/media/organised/ski/ski 3.jpeg" },
      { type: "video" as const, src: "/media/organised/ski/ski vid 3.mp4" },
      { type: "image" as const, src: "/media/organised/ski/ski 4.jpeg" },
      { type: "image" as const, src: "/media/organised/ski/ski 6.jpeg" },
      { type: "image" as const, src: "/media/organised/ski/ski 7.jpeg" },
    ],
  },
  {
    name: "Karate",
    slug: "karate",
    media: [
      { type: "image" as const, src: "/media/organised/karate/karate 1.jpg" },
      { type: "image" as const, src: "/media/organised/karate/karate 2.jpg" },
    ],
  },
];

export const SPONSORS_CONTENT = {
  heading: "Sponsors & Partnerships",
  body: "Enzo's journey is supported by his family, coaches, and the growing community that believes in his potential. The family welcomes sponsorship opportunities that align with Enzo's values and sporting journey.",
  cta: "Enquire About Sponsorships",
  note: "All partnership enquiries are managed by Enzo's parents to ensure safety and alignment with his development goals.",
};

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Enzo's First Tournament Win",
    date: "2025-10-15",
    excerpt:
      "A proud moment as Enzo competed against older children and came out on top in his very first golf tournament.",
    image: "/media/blog-1.jpg",
    slug: "first-tournament-win",
  },
  {
    id: 2,
    title: "A Day on the Course",
    date: "2025-09-20",
    excerpt:
      "Follow Enzo through a typical practice day — from warm-up swings to perfecting his putting.",
    image: "/media/blog-2.jpg",
    slug: "day-on-the-course",
  },
  {
    id: 3,
    title: "Why We Share Enzo's Journey",
    date: "2025-08-10",
    excerpt:
      "As parents, we want to inspire other families while keeping Enzo's childhood safe and fun.",
    image: "/media/blog-3.jpg",
    slug: "why-we-share",
  },
];

export const CONTACT_CONTENT = {
  heading: "Contact Enzo's Team",
  body: "All messages are managed directly by Enzo's parents to ensure privacy and safety. We aim to respond within 24 hours.",
  email: "hello@enzogilbert.com",
  safetyNote:
    "All communications are managed by Enzo's parents. We take the privacy and safety of our family very seriously.",
  socials: [
    { label: "YouTube", url: "https://youtube.com/@enzogilbert" },
    { label: "Instagram", url: "https://instagram.com/enzogilbert" },
    { label: "TikTok", url: "https://tiktok.com/@enzogilbert" },
  ],
};
