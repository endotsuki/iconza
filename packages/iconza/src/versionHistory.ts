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
  if (typeof window === 'undefined') return;
  const allIcons: string[] = [];
  const duplicates: string[] = [];
  
  history.forEach(entry => {
    entry.changes.forEach(change => {
      change.icons?.forEach(icon => {
        if (allIcons.includes(icon)) {
          duplicates.push(icon);
          console.error(`❌ DUPLICATE ICON: "${icon}" in version ${entry.version}`);
        }
        allIcons.push(icon);
      });
    });
  });
  if (duplicates.length > 0) {
    console.error(`\n🚨 FOUND ${duplicates.length} DUPLICATE ICONS!`);
    console.error('Please remove duplicates from your version history.\n');
  } else {
    console.log('✅ No duplicate icons found!');
  }
};


export const versionHistory: VersionEntry[] = [
  {
    date: "2025-09-27",
    version: "1.0.32",
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
        icons: ["Git", "Scala", "GraphQL", "EtaLang", "Arduino"],
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
        icons: ["Git", "Scala", "GraphQL", "EtaLang", "Arduino"],
      },
      {
        type: "added",
        category: "Apps",
        description: "New AI service icons",
        icons: [
          "Venmo",
          "PayPal",
          "AppStore",
          "PlayStore",
          "Dropbox",
          "Steam",
          "Notion",
          "Shopify",
          "Xbox",
          "WeChat",
          "BuyMeACoffee",
          "Discord",
          "Twitch",
          "ApplePay",
        ],
      },
      {
        type: "added",
        category: "DesignTools",
        description: "New AI service icons",
        icons: ["Dribble", "Blender", "Sketch"],
      },
      {
        type: "added",
        category: "Tools",
        description: "New AI service icons",
        icons: [
          "NPM",
          "Gitlab",
          "AWS",
          "PNPM",
          "Homebrew",
          "Akamai",
          "CampaignMonitor",
          "HoundCI",
        ],
      },
      {
        type: "added",
        category: "Other",
        description: "New AI service icons",
        icons: [
          "Windows",
          "InternetExplorer",
          "ArchLinux",
          "Ubuntu",
          "Brave",
          "StackOverflow",
          "Xing",
          "Android",
          "Yahoo",
          "IBM",
          "Ethereum",
          "Debian",
          "App",
        ],
      },
    ],
  },
  {
    date: "2025-09-15",
    version: "1.0.28",
    changes: [
      {
        type: "added",
        category: "Design",
        description: "New design tools and utilities",
        icons: ["FigmaDark", "AdobeXD"],
      },
      {
        type: "added",
        category: "Social",
        description: "Social media platform updates",
        icons: ["Threads", "Reddit"],
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
    version: "1.0.25",
    changes: [
      {
        type: "added",
        category: "Programming",
        description: "New programming language icons",
        icons: ["Rust", "Go", "Kotlin"],
      },
      {
        type: "added",
        category: "Apps",
        description: "Popular application icons",
        icons: ["Slack", "Telegram", "Behance", "Facebook", "Messenger"],
      },
      {
        type: "fixed",
        category: "Icons",
        description: "Fixed sizing issues on mobile devices",
      },
    ],
  },
  {
    date: "2025-09-05",
    version: "1.0.22",
    changes: [
      {
        type: "added",
        category: "Initial Release",
        description: "Launch of IconZa with core icon set",
        icons: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "Python",
          "Java",
          "C",
          "C++",
          "C#",
          "Figma",
          "GitHub",
          "Photoshop",
          "Illustrator",
          "Adobe",
          "Twitter",
          "X",
          "Canva",
          "Instagram",
          "LinkedIn",
          "YouTube",
          "TikTok",
          "WhatsApp",
        ],
      },
    ],
  },
  {
    date: "2025-09-03",
    version: "1.0.20",
    changes: [
      {
        type: "added",
        category: "Beta",
        description: "Beta release with foundational icons",
        icons: ["React", "Vue", "VSCode"],
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