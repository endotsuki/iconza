import { allIconsData, icons } from "../../../packages/iconza/src/index.ts";
import { IconDetailDialog } from "./IconDetailDialog";

const components = icons as Record<string, React.ComponentType<{ size?: number; className?: string; "aria-label"?: string }>>;

export function IconPortal({ name, open, onOpenChange }: { name: string; open: boolean; onOpenChange: (v: boolean) => void }) {
  const data = allIconsData.find((d) => d.name === name);
  const Comp = components[name];
  if (!data || !Comp) return null;
  return (
    <IconDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      name={data.name}
      Component={Comp}
      svgContent={data.svgContent}
      category={data.category}
      keywords={data.keywords}
    />
  );
}
