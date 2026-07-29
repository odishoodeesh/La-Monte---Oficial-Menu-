import React from 'react';
import { motion } from 'motion/react';

export default function BuildBreakfastView() {
  return (
    <motion.div
      key="build-breakfast-view"
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -30 }}
      className="w-full h-screen flex items-center justify-center p-8"
    >
      <h2 className="text-4xl font-serif italic">COMING SOON</h2>
    </motion.div>
  );
}
