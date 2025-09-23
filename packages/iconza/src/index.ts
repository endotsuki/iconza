import { createIcon } from "./createIcon";
import React from "react";
import type { IconData } from "./types";

import { iconsData as Programming } from "./categories/Programming";
import { iconsData as AI } from "./categories/AI";
import { iconsData as Frameworks } from "./categories/Frameworks";
import { iconsData as Tools } from "./categories/Tools";
import { iconsData as Apps } from "./categories/Apps";
import { iconsData as DesignTools } from "./categories/DesignTools";
import { iconsData as Other } from "./categories/Other";

export type { IconData };
export { createIcon };

export const Categories = {
  Programming,
  Apps,
  DesignTools,
  AI,
  Frameworks,
  Tools,
  Other,
};

const allCategories = [
  ...Programming,
  ...Apps,
  ...DesignTools,
  ...AI,
  ...Frameworks,
  ...Tools,
  ...Other,
];

const icons = allCategories.reduce<Record<string, ReturnType<typeof createIcon>>>((acc, icon) => {
  acc[icon.name] = createIcon(icon.name, icon.svgContent);
  return acc;
}, {});

export const allIconsData: IconData[] = allCategories;
export { icons };
export type IconName = keyof typeof icons;

export interface DynamicIconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export function Icon({ name, ...rest }: DynamicIconProps) {
  const Comp = icons[name];
  if (!Comp) return null;
  return React.createElement(Comp, rest);
}
