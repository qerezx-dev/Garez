"use client";

import { useCallback, useState } from "react";

type GlowPoint = {
  x: number;
  y: number;
};

export function useMouseGlow() {
  const [point, setPoint] = useState<GlowPoint>({ x: 50, y: 40 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPoint({ x, y });
    setActive(true);
  }, []);

  const onLeave = useCallback(() => {
    setActive(false);
  }, []);

  return { point, active, onMove, onLeave };
}
