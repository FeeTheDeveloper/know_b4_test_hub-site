"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SPLASH_DURATION = 2800; // ms before fade-out starts

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "#0B2A4A" }}
          >
            {/* Radial gold glow */}
            <motion.div
              className="absolute"
              style={{
                width: 340,
                height: 340,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 60%)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo container */}
            <motion.div
              className="relative flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [0.8, 1.05, 1] }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                ease: "easeOut",
              }}
            >
              {/* Logo with shimmer overlay */}
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Know B4 Certification Hub"
                  width={180}
                  height={180}
                  priority
                  className="relative z-10 drop-shadow-lg"
                />

                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 z-20 overflow-hidden rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="absolute top-0 h-full w-1/3"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(232,199,106,0.35), transparent)",
                    }}
                    initial={{ left: "-33%" }}
                    animate={{ left: "133%" }}
                    transition={{
                      delay: 1,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Company name */}
              <motion.p
                className="text-lg font-semibold tracking-widest uppercase"
                style={{ color: "#D4AF37" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                Know B4 Certification Hub
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site content — always rendered underneath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
