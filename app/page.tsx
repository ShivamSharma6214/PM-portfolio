"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const photoUrl = "/images/portrait.png";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  return (
    <main ref={scrollContainerRef} className="relative min-h-screen overflow-hidden text-[#1f2328]">
      <BackgroundPhotoLayer />
      <GlassCanvas />
      <Hero scrollYProgress={scrollYProgress} />
    </main>
  );
}

function BackgroundPhotoLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photoUrl})`,
          filter: "blur(5px) saturate(0.85)",
          transform: "scale(1.03)",
        }}
      />
      <div className="absolute inset-0 bg-[#f7f4ef]/20" />
    </div>
  );
}

function GlassCanvas() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 bg-[rgba(239,231,219,0.6)] backdrop-blur-[40px]"
    />
  );
}

type HeroProps = {
  scrollYProgress: MotionValue<number>;
};

function Hero({ scrollYProgress }: HeroProps) {
  const photoScale = useTransform(scrollYProgress, [0, 0.3, 0.8], [1.1, 0.9, 0.68]);
  const photoX = useTransform(scrollYProgress, [0, 1], ["-20%", "-120%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-15%", "-5%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 80]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.97, 0.9]);
  const cardY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  return (
    <section className="relative min-h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-end px-6 py-16">
          <PhotoIdentity scale={photoScale} x={photoX} y={photoY} radius={radius} />
          <motion.div
            style={{ opacity: cardOpacity, y: cardY }}
            className="relative z-10 w-full max-w-xl rounded-[36px] border border-white/55 bg-[rgba(255,255,255,0.85)] p-8 text-[#2a2520] shadow-[0_35px_120px_rgba(16,14,12,0.35)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-[#837b71]">Shivam Sharma</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1b1916] sm:text-5xl">
              Product leadership, documented behind calm glass.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#3c3730]">
              Partnering with cross-functional leads to ship measured product bets, keep docs living, and remove the drift between intent and delivery.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-[#2d2924]">
              <InfoRow label="Role" value="Head of Product Systems" />
              <InfoRow label="Focus" value="Discovery facilitation, documentation ops, calm launches" />
              <InfoRow label="Location" value="Remote · GMT+5:30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type PhotoIdentityProps = {
  scale: MotionValue<number>;
  x: MotionValue<string>;
  y: MotionValue<string>;
  radius: MotionValue<number>;
};

function PhotoIdentity({ scale, x, y, radius }: PhotoIdentityProps) {
  return (
    <motion.div
      style={{ scale, x, y, borderRadius: radius }}
      className="absolute left-1/4 top-1/2 h-[620px] w-[450px] -translate-y-1/2 -translate-x-1/2 shadow-[0_50px_140px_rgba(15,14,12,0.45)]"
    >
      <div
        className="size-full rounded-[inherit] bg-cover bg-center"
        style={{ backgroundImage: `url(${photoUrl})`, filter: "saturate(0.8)" }}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-black/25 via-transparent to-black/40" />
      </div>
    </motion.div>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-[0.3em] text-[#9c948a]">{label}</span>
      <span className="text-base text-[#2a2723]">{value}</span>
    </div>
  );
}
