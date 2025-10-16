export interface VersionEntry {
  date: string;
  version: string;
  changes: Change[];
}

export interface Change {
  type: "added" | "updated" | "fixed";
  category: string;
  description: string;
  icons?: string[];
}

// check duplicate file
const checkForDuplicateIcons = (history: VersionEntry[]) => {
  if (typeof window === "undefined") return;
  const allIcons: string[] = [];
  const duplicates: string[] = [];

  history.forEach((entry) => {
    entry.changes.forEach((change) => {
      change.icons?.forEach((icon) => {
        if (allIcons.includes(icon)) {
          duplicates.push(icon);
          console.error(
            `❌ DUPLICATE ICON: "${icon}" in version ${entry.version}`,
          );
        }
        allIcons.push(icon);
      });
    });
  });
  if (duplicates.length > 0) {
    console.error(`\n🚨 FOUND ${duplicates.length} DUPLICATE ICONS!`);
    console.error("Please remove duplicates from your version history.\n");
  } else {
    console.log("✅ No duplicate icons found!");
  }
};

export const versionHistory: VersionEntry[] = [
  {
    date: "2025-10-16",
    version: "1.0.38",
    changes: [
      {
        type: "added",
        category: "AI",
        description: "Add new AI icons",
        icons: ["TensorFlow", "Trello"]
      },
      {
        type: "added",
        category: "Other",
        description: "Add new Other icons",
        icons: ["HackerOne Light", "SuperUser", "UML"]
      },
      {
        type: "added",
        category: "Tools",
        description: "Add new Tools icons",
        icons: ["Prisma Light", "Codecov"]
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Add new Frameworks icons",
        icons: ["Gradle", "TYPO3"]
      },
      {
        type: "added",
        category: "Programming",
        description: "Add new Programming icons",
        icons: ["TheAlgorithms", "Axios"]
      },
    ],
  },
  {
    date: "2025-10-07",
    version: "1.0.37",
    changes: [
      {
        type: "updated",
        category: "SVG icon usage",
        description: `Before usage is icons like GitHubDark changed to GitHub Dark space space with Dark or Light.`,
      },
      {
        type: "added",
        category: "AI",
        description: "Add new AI icons",
        icons: ["GoogleAssistant", "YandexAlice", "Bixby"]
      },
      {
        type: "added",
        category: "Other",
        description: "Add new Other icons",
        icons: ["Ryzen Light", "Nvidia Light", "Vivaldi", "SamsungInternet", "ASUSLogo Light", "ROG", "Taobao"]
      },
      {
        type: "added",
        category: "Tools",
        description: "Add new Tools icons",
        icons: ["GoDaddy", "Firebase", "FirebaseStudio", "FirebaseSDK", "CodePen Light", "Warp"]
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Add new DesignTools icons",
        icons: ["AlightMotion"]
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Add new Frameworks icons",
        icons: ["HeroUI", "Motion"]
      },
    ],
  },
  {
    date: "2025-10-03",
    version: "1.0.36",
    changes: [
      {
        type: "added",
        category: "Apps",
        description: "Add new apps icons",
        icons: ["CyberGhostVPN", "Snapchat", "ProtonVPN", "HolaVPN", "SurfsharkVPN", "ExpressVPN","Netflix", "RedNote", "Line", "QQ"]
      },
      {
        type: "added",
        category: "Programming",
        description: "Add new Other icons",
        icons: ["Oracle", "KaliFill", "MacOS", "SVG", "Xiaomi"]
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Add new Tools icons",
        icons: ["Freepik"]
      },
      {
        type: "added",
        category: "Framework",
        description: "Add new Framework icons",
        icons: ["Shadcn Light", "BlitzJS", "Lit", "Vuetify", "Vuex"]
      },
      {
        type: "added",
        category: "Tools",
        description: "Add new Tools icons",
        icons: ["VueUse"]
      },
      {
        type: "added",
        category: "Other",
        description: "Add new Other icons",
        icons: ["Bash", "Zig"]
      },
    ],
  },
  {
    date: "2025-10-02",
    version: "1.0.35",
    changes: [
      {
        type: "updated",
        category: "Homepage",
        description: "Add logo loop for homepage",
      },
    ],
  },
  {
    date: "2025-10-01",
    version: "1.0.35",
    changes: [
      {
        type: "updated",
        category: "SVG Icons code",
        description: "Shortens and optimizes SVG code for better performance",
      },
    ],
  },
  {
    date: "2025-09-30",
    version: "1.0.34",
    changes: [
      {
        type: "added",
        category: "Other",
        description: "Added new other icons",
        icons: ["PDF", "AMD Light", "NVIDIA", "Snapdragon", "Razer", "Alibaba"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Added new app icons",
        icons: ["Zoom", "ZoomLogo", "Weibo", "Spotify"],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: ["MedusaJS", "KrakenJS", "Symfony Light", "UnJS", "Nginx", "Framework7", ".NET"],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Added new design tool icons",
        icons: ["Fresh", "Elementor", "LottieFiles", "Framer", "AffinityPhoto", "AffinityPublisher"],
      },
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: ["Azure", "Cloudflare", "StackBlitz", "Bitwarden", "Sourcegraph", "Locofy", "Basewell","Yarn", "Stripe", "Envato", "Filmora", "W3Schools", "Airtable", "Moz", "Grammarly", "NordVPN", "NordPass", "NordLocker", "Wise", "MySQL"],
      },
      {
        type: "added",
        category: "Programming",
        description: "Added new programming language icons",
        icons: ["PowerShell", "JSON", "Perl", "ESLint"],
      },
      {
        type: "added",
        category: "AI",
        description: "Added new AI icons",
        icons: ["Kimi Light", "PaLM2", "Cody", "Runway Light", "xAI Light", "GitHubCopilot Light"],
      },
    ],
  },
  {
    date: "2025-09-29",
    version: "1.0.33",
    changes: [
      {
        type: "added",
        category: "AI",
        description: "Added new AI tool icons",
        icons: ["Anthropic Light"],
      },
      {
        type: "added",
        category: "Programming",
        description: "Added new programming language icons",
        icons: ["ReactQuery", "Terraform"],
      },
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: ["Ngrok", "CodeSandbox Light", "Bolt Light", "Builder"],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Added new design tool icons",
        icons: ["AffinityDesigner", "Layers Light", "Designali"],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: ["Remotion", "Hono", "Remix Light", "Ark"],
      },
      {
        type: "added",
        category: "Other",
        description: "Added new other icons",
        icons: ["Binance", "Ton", "Bitcoin"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Added new app icons",
        icons: ["Platzi", "Lemon8", "Bluesky", "Medium"],
      },
    ],
  },
  {
    date: "2025-09-28",
    version: "1.0.32",
    changes: [
      {
        type: "updated",
        category: "Icons explorer",
        description: "Added  source link to each icon",
      },
    ],
  },
  {
    date: "2025-09-27",
    version: "1.0.32",
    changes: [
      {
        type: "added",
        category: "Programming",
        description: "Added new programming language icons",
        icons: ["VisualStudio", "Markdown Light", "NumPy"],
      },
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: [
          "500px Light",
          "Xampp",
          "Swagger",
          "Peer5",
          "RabbitMQ",
          "RaspberryPi",
        ],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: [
          "Unity Light",
          "SpringBoot",
          "Rails",
          "ReactRouter",
          "Svelte",
          "Rax",
          "NextJS",
          "NuxtJS",
          "MagicUI",
        ],
      },
      {
        type: "added",
        category: "Other",
        description: "Added new other icons",
        icons: ["Visa", "RedHat", "Tor"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Added new app icons",
        icons: ["Teamwork", "Udemy", "Pinterest"],
      },
    ],
  },
  {
    date: "2025-09-26",
    version: "1.0.31",
    changes: [
      {
        type: "added",
        category: "Frameworks",
        description: "Added new web framework icons",
        icons: ["CakePHP", "Apache", "Amp", "Ionic"],
      },
      {
        type: "added",
        category: "Programming",
        description: "Added new programming language icons",
        icons: ["Scala", "GraphQL", "EtaLang", "Arduino", "Git"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Added new app icons",
        icons: [
          "Venmo",
          "PayPal",
          "AppStore",
          "PlayStore",
          "Dropbox",
          "Steam",
          "Notion",
          "NotionLogo",
          "Shopify",
          "Xbox",
          "XboxLogo",
          "WeChat",
          "BuyMeACoffeeFill",
          "Discord",
          "Twitch",
        ],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Added new design tool icons",
        icons: [
          "Dribbble",
          "Blender",
          "Sketch",
          "Lunacy",
          "Framer Light",
          "Axure",
        ],
      },
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: [
          "NPM",
          "NPMLogo",
          "PNPM",
          "Gitlab",
          "AWS Light",
          "Homebrew",
          "Akamai",
          "CampaignMonitor",
          "HoundCI",
        ],
      },
      {
        type: "added",
        category: "Other",
        description: "Added new miscellaneous icons",
        icons: [
          "Windows10",
          "Windows11",
          "Windows11Logo",
          "InternetExplorer",
          "ArchLinux",
          "Ubuntu",
          "Brave",
          "StackOverflow",
          "Xing",
          "Android Light",
          "Yahoo",
          "YahooLogo",
          "IBM Light",
          "Ethereum",
          "Debian",
          "Microsoft"
        ],
      },
    ],
  },
  {
    date: "2025-09-20",
    version: "1.0.30",
    changes: [
      {
        type: "added",
        category: "AI",
        description: "New AI tool icons",
        icons: [
          "ChatGPTFill",
          "Perplexity",
          "GoogleAIStudio Light",
          "VercelV0 Light",
          "ClaudeAI",
          "DeepSeek",
          "CursorAI",
          "ElevenLabsAI Light",
          "FluxAI Light",
          "KlingAI",
          "WriteSonicAI",
          "ManusAI Light",
          "MetaAI",
          "QwenAI",
          "FireworksAI",
          "ClineAI Light",
          "DeepAI Light",
          "GrokAI Light",
          "SunoAI Light",
          "Ollama Light",
          "KreaAI Light",
          "LovableAI",
          "PikaAI Light",
          "WindsurferAI Light",
          "AtlassianRovor"
        ],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "New framework icons",
        icons: [
          "Django",
          "AstroJS Light",
          "ReactBits Light",
          "ExpressJS Light",
          "BulmaUI",
          "SemanticUI",
          "ThreeJS Light"
        ],
      },
    ],
  },
  {
    date: "2025-09-15",
    version: "1.0.29",
    changes: [
      {
        type: "added",
        category: "DesignTools",
        description: "New design tools and utilities",
        icons: ["Figma", "Canva", "InVision", "Miro"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Social media platform updates",
        icons: [
          "Thread Light",
          "Reddit",
          "SoundCloud",
          "VK",
          "Chrome",
          "Chromium",
        ],
      },
      {
        type: "added",
        category: "Programming",
        description: "New programming language icons",
        icons: [
          "Vitest",
          "Dlang",
          "Crystal",
          "Swift",
          "Lua",
          "R",
          "Erlang",
          "Dart",
          "Solidity Light",
        ],
      },
      {
        type: "updated",
        category: "Performance",
        description: "Improved icon rendering performance",
      },
    ],
  },
  {
    date: "2025-09-10",
    version: "1.0.28",
    changes: [
      {
        type: "added",
        category: "Programming",
        description: "New programming language icons",
        icons: ["SASS", "Go", "Kotlin", "ApacheKafka Light", "Clojure", "Nim"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Popular application icons",
        icons: [
          "Slack",
          "Telegram",
          "BehanceFill",
          "FacebookSquare",
          "FacebookRound",
          "MessengerBlue",
          "MessengerColor",
        ],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Popular design tool icons",
        icons: [
          "AdobePhotoshop",
          "AdobeFresco",
          "AdobeLightroom",
          "AdobeAfterEffects",
          "AdobeAnimate",
          "AdobeAudition",
          "CharacterAnimator",
          "AdobePremierePro",
          "AdobeRush",
          "AdobeAero",
          "AdobeDimension",
          "SubstanceDesigner",
          "SubstanceSampler",
          "SubstanceStager",
          "AdobeDreamweaver",
          "AdobeXd",
          "AdobeInDesign",
          "AdobeIllustrator",
          "AdobeStock",
          "AdobeFireflyAI",
          "Adobe",
        ],
      },
      {
        type: "fixed",
        category: "Icons",
        description: "Fixed sizing issues on mobile devices",
      },
    ],
  },
  {
    date: "2025-09-08",
    version: "1.0.27",
    changes: [
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: ["i18Next", "Atom", "AlibabaCloud", "Replit", "n8n", "Netlify", "AndroidStudio", "GoogleCloud", "NetBeans", "DigitalOcean", "Atlassian", "Jira", "Docker", "RailwayLight"],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: ["Bootstrap5", "AlpineJS", "ViteJS", "Qwik", "NestJS", "Laravel", "CodeIgniter", "Supabase", "MeteorJS", "MongoDB", "Materialize", "Storybook"],
      },
    ],
  },
  {
    date: "2025-09-06",
    version: "1.0.26",
    changes: [
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: ["MaterialUI", "ElementUI", "AzureDevOps", "Flutter", "BackboneJS", "PandaCSS", "Godot", "Jquery", "HeadlessUI", "TailwindCSS", "RadixUILight"],
      }
    ],
  },
  {
    date: "2025-09-05",
    version: "1.0.25",
    changes: [
      {
        type: "added",
        category: "Initial Release",
        description: "Launch of IconZa with core icon set",
        icons: [
          "Angular",
          "Python",
          "JestJS",
          "Java",
          "C",
          "C++",
          "C#",
          "GitHub Light",
          "Twitter",
          "X Light",
          "Instagram",
          "LinkedIn",
          "YouTube",
          "YouTubeMusic",
          "YouTubeStudio",
          "YouTubeShorts",
          "TikTok",
          "TikTokFill",
          "WhatsApp",
        ],
      },
    ],
  },
  {
    date: "2025-09-03",
    version: "1.0.24",
    changes: [
      {
        type: "added",
        category: "Beta",
        description: "Beta release with foundational icons",
        icons: [
          "React",
          "VueJS",
          "VSCode",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
        ],
      },
      {
        type: "updated",
        category: "Documentation",
        description: "Initial documentation setup",
      },
    ],
  },
];

checkForDuplicateIcons(versionHistory);
