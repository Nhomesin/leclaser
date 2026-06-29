import {
  Slice,
  PenTool,
  Cog,
  Gem,
  Flame,
  Ruler,
  Lightbulb,
  Signpost,
  Hotel,
  LayoutGrid,
  Award,
  Building2,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Slice,
  PenTool,
  Cog,
  Gem,
  Flame,
  Ruler,
  Lightbulb,
  Signpost,
  Hotel,
  LayoutGrid,
  Award,
  Building2,
};

/** Resolves an icon name string (stored in site.ts data) to a lucide icon. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = MAP[name] ?? Cog;
  return <Cmp className={className} strokeWidth={1.6} />;
}
