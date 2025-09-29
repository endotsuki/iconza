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
    date: "2025-09-29",
    version: "1.0.33",
    changes: [
      {
        type: "added",
        category: "AI",
        description: "Added new AI tool icons",
        icons: ["AnthropicLight"],
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
        icons: ["Ngrok", "CodeSandboxLight", "BoltLight", "Builder"],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "Added new design tool icons",
        icons: ["AffinityDesigner", "Layers", "Designali"],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "Added new framework icons",
        icons: ["Remotion", "Hono", "RemixLight", "Ark"],
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
        icons: ["VisualStudio", "MarkdownLight", "NumPy"],
      },
      {
        type: "added",
        category: "Tools",
        description: "Added new tool icons",
        icons: [
          "500pxLight",
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
          "UnityLight",
          "SpringBoot",
          "Rails",
          "ReactRouter",
          "Svelte",
          "Rax",
          "NextJs",
          "NuxtJs",
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
          "FramerLight",
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
          "AWS",
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
          "Android",
          "Yahoo",
          "YahooLogo",
          "IBM",
          "Ethereum",
          "Debian",
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
          "GoogleAIStudioLight",
          "VercelV0Light",
          "ClaudeAI",
          "DeepSeek",
          "CursorAI",
          "ElevenLabsAILight",
          "FluxAILight",
          "KlingAI",
          "WriteSonicAI",
          "ManusAILight",
          "MetaAI",
          "QwenAI",
          "FireworksAI",
          "ClineAILight",
          "DeepAILight",
          "GrokAILight",
          "SunoAILight",
          "OllamaLight",
          "KreaAILight",
          "LovableAI",
          "PikaAILight",
          "WindsurferAILight",
          "AtlassianRovor"
        ],
      },
      {
        type: "added",
        category: "Frameworks",
        description: "New framework icons",
        icons: [
          "Django",
          "AstroJsLight",
          "ReactBitsLight",
          "ExpressJsLight",
          "BulmaUI",
          "SemanticUI",
          "ThreeJsLight"
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
          "ThreadLight",
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
          "SolidityLight",
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
        icons: ["SASS", "Go", "Kotlin", "ApacheKafkaLight", "Clojure", "Nim"],
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
        icons: ["Bootstrap5", "AlpineJs", "ViteJs", "Qwik", "NestJs", "Laravel", "CodeIgniter", "Supabase", "MeteorJs", "MongoDB", "Materialize", "Storybook"],
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
        icons: ["MaterialUI", "ElementUI", "AzureDevOps", "Flutter", "BackboneJs", "PandaCSS", "Godot", "Jquery", "HeadlessUI", "TailwindCSS", "RadixUILight"],
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
          "JestJs",
          "Java",
          "C",
          "C++",
          "C#",
          "GitHubLight",
          "Twitter",
          "XLight",
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
          "VueJs",
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
