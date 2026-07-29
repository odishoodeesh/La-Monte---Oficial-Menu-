import React, { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react';
import { twMerge } from 'tailwind-merge';

export const AIGradientBorder = ({
  children,
  className,
  duration = 3,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: 'linear',
      duration,
      repeat: Infinity,
    });
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={twMerge('relative p-px', className)}>
      {/* Border */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit] z-0"
      />

      {/* Content Container (has overflow: hidden) */}
      <div className="relative rounded-[inherit] overflow-hidden z-20">
        <div className="relative">{children}</div>
      </div>

      {/* Glow (Outside the overflow: hidden div) */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="ai-glow-spill-mask opacity-90 blur-3xl pointer-events-none absolute inset-[-30%] z-10"
      />
    </div>
  );
};
