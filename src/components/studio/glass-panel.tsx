"use client";

import { MouseGlow } from "@/components/studio/mouse-glow";
import { useMouseGlow } from "@/hooks/use-mouse-glow";
import { cn } from "@/lib/utils";

type GlassPanelProps = React.ComponentProps<"div"> & {
  strong?: boolean;
  glow?: boolean;
  framed?: boolean;
};

export function GlassPanel({
  className,
  strong = false,
  glow = false,
  framed = false,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: GlassPanelProps) {
  const mouseGlow = useMouseGlow();

  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "relative overflow-hidden rounded-3xl",
        framed && "glow-border"
      )}
      onMouseMove={(event) => {
        if (glow) mouseGlow.onMove(event);
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        if (glow) mouseGlow.onLeave();
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {glow && (
        <MouseGlow
          x={mouseGlow.point.x}
          y={mouseGlow.point.y}
          active={mouseGlow.active}
        />
      )}
      <div className={cn("relative z-10 h-full", className)}>{children}</div>
    </div>
  );
}
