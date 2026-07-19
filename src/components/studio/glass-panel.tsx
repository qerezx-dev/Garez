import { cn } from "@/lib/utils";

type GlassPanelProps = React.ComponentProps<"div"> & {
  strong?: boolean;
};

export function GlassPanel({
  className,
  strong = false,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(strong ? "glass-strong" : "glass", "rounded-2xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
