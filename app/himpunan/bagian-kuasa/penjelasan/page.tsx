"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  UserMinus,
  Box,
  CheckCircle2,
  Lightbulb,
  Calculator,
  ChevronDown,
  ListTree,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// --- STYLES & ASSETS INJECTION ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  .font-serif-title { font-family: 'Playfair Display', serif; }
  .font-serif-body { font-family: 'Merriweather', serif; }
  
  .bg-math-grid {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }

  body { background-color: #000000; color: #cbd5e1; }
  
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #000000; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #475569; }
`;

// --- HELPER COMPONENTS ---
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) => {
  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HighlightProps {
  children: React.ReactNode;
  color?: "yellow" | "red" | "blue" | "green";
}

const Highlight: React.FC<HighlightProps> = ({
  children,
  color = "yellow",
}) => {
  const colors: Record<string, string> = {
    yellow: "text-amber-400 bg-amber-400/10 border-b border-amber-400/30",
    red: "text-rose-400 bg-rose-400/10 border-b border-rose-400/30",
    blue: "text-blue-400 bg-blue-400/10 border-b border-blue-400/30",
    green: "text-emerald-400 bg-emerald-400/10 border-b border-emerald-400/30",
  };
  return (
    <motion.span
      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      className={`px-1 rounded-sm ${colors[color]} font-medium transition-colors duration-300 cursor-default`}
    >
      {children}
    </motion.span>
  );
};

interface MathSidebarProps {
  formula: React.ReactNode;
  description: string;
  icon: LucideIcon | React.ElementType;
}

const MathSidebar: React.FC<MathSidebarProps> = ({
  formula,
  description,
  icon: Icon,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, x: 20 }}
    whileInView={{ opacity: 1, scale: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="float-right w-full md:w-64 ml-0 md:ml-8 mb-6 p-6 border-l-2 border-amber-500 bg-zinc-900/50 rounded-r-xl shadow-2xl backdrop-blur-sm"
  >
    <div className="flex items-center gap-3 mb-3 text-amber-500">
      <Icon size={20} />
      <span className="text-xs font-bold tracking-widest uppercase">
        Notasi
      </span>
    </div>
    <div className="text-3xl font-serif-title text-white mb-3 tracking-wide">
      {formula}
    </div>
    <p className="text-sm text-zinc-400 font-serif-body leading-relaxed">
      {description}
    </p>
  </motion.div>
);

// --- ANIMATED SVG ILLUSTRATIONS ---

interface AnimatedPathProps extends React.ComponentProps<typeof motion.path> {
  delay?: number;
}

const AnimatedPath: React.FC<AnimatedPathProps> = ({
  d,
  stroke,
  delay = 0,
  ...props
}) => (
  <motion.path
    d={d as string}
    stroke={stroke as string}
    fill="none"
    strokeWidth={2}
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    {...props}
  />
);

interface AnimatedDotProps {
  cx: number | string;
  cy: number | string;
  r?: number;
  fill: string;
  delay?: number;
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({
  cx,
  cy,
  r = 3,
  fill,
  delay = 0,
}) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r={r}
    fill={fill}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200, damping: 10, delay }}
  />
);

const SvgVillageIntro = () => (
  <figure className="my-12 w-full flex justify-center">
    <svg
      viewBox="0 0 500 250"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl"
    >
      {/* Background abstract grid */}
      <pattern
        id="gridIntro"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <rect
          width="20"
          height="20"
          fill="none"
          stroke="#1f2937"
          strokeWidth="0.5"
        />
      </pattern>
      <rect width="500" height="250" fill="url(#gridIntro)" rx="16" />

      {/* House Silhouette */}
      <AnimatedPath
        d="M 50 180 L 50 120 L 100 80 L 150 120 L 150 180 Z"
        stroke="#3f3f46"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <AnimatedPath
        d="M 350 200 L 350 150 L 400 110 L 450 150 L 450 200 Z"
        stroke="#3f3f46"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Citizens (Dots) */}
      {[...Array(30)].map((_, i) => (
        <AnimatedDot
          key={i}
          cx={Math.random() * 400 + 50}
          cy={Math.random() * 150 + 50}
          r={Math.random() * 2 + 2}
          fill={Math.random() > 0.8 ? "#fbbf24" : "#52525b"}
          delay={i * 0.03}
        />
      ))}

      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        x="250"
        y="230"
        fill="#71717a"
        fontSize="12"
        fontFamily="serif"
        textAnchor="middle"
        fontStyle="italic"
      >
        Setiap titik adalah seorang warga Desa Sukamaju
      </motion.text>
    </svg>
  </figure>
);

const SvgSubset = () => (
  <figure className="my-12 w-full flex justify-center relative">
    <svg
      viewBox="0 0 500 250"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl"
    >
      <rect width="500" height="250" fill="none" rx="16" />

      {/* RT Boundary (Universe) */}
      <AnimatedPath
        d="M 100 125 A 150 90 0 1 0 400 125 A 150 90 0 1 0 100 125"
        stroke="#3f3f46"
        strokeDasharray="4 4"
      />
      <text
        x="250"
        y="30"
        fill="#71717a"
        fontSize="10"
        fontFamily="serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        SELURUH WARGA RT
      </text>

      {/* Kerja Bakti Boundary */}
      <motion.circle
        cx="250"
        cy="135"
        r="70"
        fill="rgba(251, 191, 36, 0.05)"
        stroke="#fbbf24"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />
      <text
        x="250"
        y="140"
        fill="#fbbf24"
        fontSize="12"
        fontFamily="serif"
        textAnchor="middle"
      >
        Kerja Bakti
      </text>

      {/* Dots inside */}
      {[...Array(15)].map((_, i) => (
        <AnimatedDot
          key={`in-${i}`}
          cx={Math.random() * 80 + 210}
          cy={Math.random() * 80 + 95}
          fill="#fbbf24"
          delay={0.8 + i * 0.05}
        />
      ))}

      {/* Dots outside */}
      {[...Array(10)].map((_, i) => (
        <AnimatedDot
          key={`out-${i}`}
          cx={Math.random() * 200 + 150}
          cy={Math.random() * 100 + 75}
          fill="#52525b"
          delay={0.5 + i * 0.05}
        />
      ))}
    </svg>
  </figure>
);

const SvgProperSubset = () => (
  <figure className="my-12 w-full flex justify-center">
    <svg
      viewBox="0 0 500 250"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl"
    >
      {/* Warga RT */}
      <AnimatedPath
        d="M 120 125 A 130 90 0 1 0 380 125 A 130 90 0 1 0 120 125"
        stroke="#fbbf24"
        strokeOpacity="0.4"
      />

      {/* Lomba (Proper Subset) */}
      <motion.circle
        cx="220"
        cy="140"
        r="50"
        fill="rgba(244, 63, 94, 0.1)"
        stroke="#f43f5e"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
      />

      <text
        x="220"
        y="145"
        fill="#f43f5e"
        fontSize="12"
        fontFamily="serif"
        textAnchor="middle"
      >
        Lomba Kerupuk
      </text>

      {/* Sisa warga / Penonton */}
      <AnimatedPath
        d="M 330 90 Q 300 100 280 120"
        stroke="#71717a"
        markerEnd="url(#arrowGray)"
        delay={1.5}
      />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 }}
        x="335"
        y="85"
        fill="#a1a1aa"
        fontSize="11"
        fontFamily="serif"
      >
        Penonton (Sisa Warga)
      </motion.text>

      {/* Sisa warga dots */}
      {[...Array(6)].map((_, i) => (
        <AnimatedDot
          key={i}
          cx={Math.random() * 40 + 280}
          cy={Math.random() * 40 + 110}
          fill="#a1a1aa"
          delay={1.5 + i * 0.1}
        />
      ))}
    </svg>
    <svg width="0" height="0" className="absolute">
      <defs>
        <marker
          id="arrowGray"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717a" />
        </marker>
      </defs>
    </svg>
  </figure>
);

const SvgSpices = () => (
  <figure className="my-12 w-full flex justify-center">
    <svg
      viewBox="0 0 500 220"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl"
    >
      {/* Dapur Bu Sari Table line */}
      <AnimatedPath d="M 50 180 L 450 180" stroke="#27272a" strokeWidth="2" />
      {/* Mangkuk Besar (Himpunan Bumbu) */}
      <AnimatedPath
        d="M 150 180 C 150 220, 250 220, 250 180"
        stroke="#3b82f6"
        strokeWidth="2"
        delay={0}
      />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        x="200"
        y="210"
        fill="#3b82f6"
        fontSize="10"
        fontFamily="serif"
        textAnchor="middle"
      >
        Bumbu Dapur
      </motion.text>
      {/* Bawang Merah, Putih, Cabai */}
      <AnimatedDot cx="180" cy="165" r={8} fill="#ef4444" delay={0.5} />{" "}
      {/* Cabai */}
      <AnimatedDot cx="200" cy="170" r={12} fill="#d8b4fe" delay={0.6} />{" "}
      {/* Bawang Merah */}
      <AnimatedDot cx="220" cy="168" r={10} fill="#f8fafc" delay={0.7} />{" "}
      {/* Bawang Putih */}
      {/* Mangkuk Kosong (Himpunan Kosong) */}
      <AnimatedPath
        d="M 320 180 C 320 210, 380 210, 380 180"
        stroke="#71717a"
        strokeWidth="1"
        strokeDasharray="4 4"
        delay={1}
      />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="350"
        y="160"
        fill="#a1a1aa"
        fontSize="24"
        fontFamily="serif"
        textAnchor="middle"
      >
        ∅
      </motion.text>
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="350"
        y="205"
        fill="#a1a1aa"
        fontSize="10"
        fontFamily="serif"
        textAnchor="middle"
      >
        Daftar Kosong
      </motion.text>
      {/* Merica excluded */}
      <AnimatedDot cx="80" cy="175" r={4} fill="#78716c" delay={1.5} />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        x="80"
        y="160"
        fill="#78716c"
        fontSize="10"
        fontFamily="serif"
        textAnchor="middle"
      >
        Merica
      </motion.text>
    </svg>
  </figure>
);

const SvgEquality = () => (
  <figure className="my-12 w-full flex justify-center">
    <svg
      viewBox="0 0 500 200"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl"
    >
      <motion.circle
        cx="250"
        cy="100"
        r="60"
        fill="rgba(16, 185, 129, 0.1)"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.circle
        cx="250"
        cy="100"
        r="56"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.text
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        x="250"
        y="105"
        fill="#ffffff"
        fontSize="20"
        fontFamily="serif"
        textAnchor="middle"
        letterSpacing="4"
      >
        A = B
      </motion.text>

      <AnimatedPath d="M 140 100 L 170 100" stroke="#10b981" delay={1.2} />
      <AnimatedPath d="M 360 100 L 330 100" stroke="#fbbf24" delay={1.2} />

      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="100"
        y="104"
        fill="#10b981"
        fontSize="12"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        A ⊆ B
      </motion.text>
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="400"
        y="104"
        fill="#fbbf24"
        fontSize="12"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        B ⊆ A
      </motion.text>
    </svg>
  </figure>
);

const SvgTree = () => (
  <figure className="my-12 w-full flex justify-center">
    <svg
      viewBox="0 0 500 250"
      className="w-full max-w-2xl h-auto border border-zinc-800 rounded-2xl bg-[#050505] shadow-2xl overflow-visible"
    >
      {/* Root */}
      <AnimatedDot cx="250" cy="30" r={5} fill="#ffffff" delay={0} />
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        x="250"
        y="20"
        fill="#fff"
        fontSize="10"
        textAnchor="middle"
      >
        Panitia Kosong ∅
      </motion.text>

      {/* Level 1 (1 person) */}
      <AnimatedPath d="M 250 30 L 150 100" stroke="#3f3f46" delay={0.5} />
      <AnimatedPath d="M 250 30 L 250 100" stroke="#3f3f46" delay={0.6} />
      <AnimatedPath d="M 250 30 L 350 100" stroke="#3f3f46" delay={0.7} />

      <AnimatedDot cx="150" cy="100" r={6} fill="#fbbf24" delay={1} />
      <AnimatedDot cx="250" cy="100" r={6} fill="#f43f5e" delay={1.1} />
      <AnimatedDot cx="350" cy="100" r={6} fill="#3b82f6" delay={1.2} />

      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        x="150"
        y="120"
        fill="#fbbf24"
        fontSize="10"
        textAnchor="middle"
      >
        Andi
      </motion.text>
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        x="250"
        y="120"
        fill="#f43f5e"
        fontSize="10"
        textAnchor="middle"
      >
        Budi
      </motion.text>
      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        x="350"
        y="120"
        fill="#3b82f6"
        fontSize="10"
        textAnchor="middle"
      >
        Caca
      </motion.text>

      {/* Level 2 (Combinations) */}
      <AnimatedPath
        d="M 150 100 L 100 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />
      <AnimatedPath
        d="M 150 100 L 200 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />
      <AnimatedPath
        d="M 250 100 L 200 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />
      <AnimatedPath
        d="M 250 100 L 300 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />
      <AnimatedPath
        d="M 350 100 L 300 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />
      <AnimatedPath
        d="M 350 100 L 400 180"
        stroke="#3f3f46"
        strokeDasharray="2 2"
        delay={1.8}
      />

      <motion.text
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        x="250"
        y="220"
        fill="#71717a"
        fontSize="12"
        fontStyle="italic"
        textAnchor="middle"
      >
        ... berkembang eksponensial (2ⁿ)
      </motion.text>
    </svg>
  </figure>
);

const KeyPoints = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="my-16 p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl relative overflow-hidden shadow-2xl"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-rose-600"></div>
    <h3 className="font-serif-title text-2xl text-white mb-8 flex items-center gap-3">
      <BookOpen className="text-amber-500" size={24} /> Poin-Poin Penting
    </h3>
    <ul className="space-y-6 text-zinc-300 font-serif-body text-base">
      {[
        {
          color: "text-amber-500",
          title: "Kelompok Bagian (Subset):",
          desc: "Sebuah kelompok disebut 'bagian' jika semua anggotanya juga terdaftar di kelompok lain yang lebih besar.",
        },
        {
          color: "text-rose-500",
          title: "Bagian Murni (Proper Subset):",
          desc: "Kondisi di mana suatu kelompok adalah bagian dari kelompok lain, tapi jumlah anggotanya tidak sebanyak kelompok besar tersebut.",
        },
        {
          color: "text-emerald-500",
          title: "Kesamaan Kelompok:",
          desc: "Dua kelompok dianggap sama persis jika kelompok pertama adalah bagian dari yang kedua, dan kelompok kedua juga merupakan bagian dari yang pertama.",
        },
        {
          color: "text-blue-500",
          title: "Singkatan Bahasa:",
          desc: "Ada cara singkat untuk menyebut 'semua warga di kelompok ini' atau 'ada setidaknya satu warga di kelompok ini' agar tidak panjang lebar.",
        },
        {
          color: "text-zinc-100",
          title: "Kelompok Segala Kemungkinan (Power Set):",
          desc: "Sebuah wadah besar yang isinya adalah daftar semua kombinasi kelompok kecil yang bisa dibentuk dari anggota yang ada.",
        },
      ].map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="flex gap-4 items-start"
        >
          <span className={`${item.color} mt-1`}>✦</span>
          <p>
            <strong className={`${item.color} font-serif-title`}>
              {item.title}
            </strong>{" "}
            {item.desc}
          </p>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

// --- INTERACTIVE COMPONENTS ---

const SubsetVisualizer = () => {
  const [isProper, setIsProper] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-12 p-8 bg-[#050505] border border-zinc-800 rounded-2xl flex flex-col items-center shadow-2xl"
    >
      <div className="flex gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProper(false)}
          className={`px-6 py-2 rounded-full text-sm transition-all shadow-lg ${!isProper ? "bg-amber-500 text-black font-bold" : "bg-zinc-900 border border-zinc-800 text-zinc-400"}`}
        >
          Subset (⊆)
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProper(true)}
          className={`px-6 py-2 rounded-full text-sm transition-all shadow-lg ${isProper ? "bg-rose-500 text-white font-bold" : "bg-zinc-900 border border-zinc-800 text-zinc-400"}`}
        >
          Proper Subset (⊂)
        </motion.button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{
            scale: isProper ? 1.1 : 1,
            borderColor: isProper ? "#e11d48" : "#d97706",
          }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute inset-0 border-2 border-dashed rounded-full flex items-start justify-center pt-4"
        >
          <span
            className={`font-serif-title ${isProper ? "text-rose-500" : "text-amber-500"}`}
          >
            Warga RT
          </span>
        </motion.div>

        <motion.div
          animate={{
            width: isProper ? "60%" : "95%",
            height: isProper ? "60%" : "95%",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-zinc-900/90 rounded-full flex items-center justify-center border border-zinc-700 shadow-xl z-10"
        >
          <div className="text-center">
            <span className="font-serif-title text-white block">
              {isProper ? "Peserta Lomba" : "Kerja Bakti"}
            </span>
            <AnimatePresence>
              {isProper && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-zinc-500 block mt-2"
                >
                  (Ada sisa warga)
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

type FruitId = "apel" | "belimbing" | "ceri" | "duku";

interface FruitItem {
  id: FruitId;
  label: string;
  color: string;
}

const PowerSetInteractive = () => {
  const allItems: FruitItem[] = [
    {
      id: "apel",
      label: "🍎 Apel",
      color: "bg-red-500/10 text-red-500 border-red-500/50",
    },
    {
      id: "belimbing",
      label: "⭐ Belimbing",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/50",
    },
    {
      id: "ceri",
      label: "🍒 Ceri",
      color: "bg-rose-500/10 text-rose-500 border-rose-500/50",
    },
    {
      id: "duku",
      label: "🟡 Duku",
      color: "bg-amber-700/10 text-amber-500 border-amber-600/50",
    },
  ];

  const [activeItems, setActiveItems] = useState<FruitId[]>([
    "apel",
    "belimbing",
  ]);

  const toggleItem = (id: FruitId) => {
    setActiveItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const n = activeItems.length;
  const possibilities = Math.pow(2, n);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl"
    >
      <div className="text-center mb-8">
        <h3 className="font-serif-title text-2xl text-white mb-2">
          Simulasi Segala Kemungkinan
        </h3>
        <p className="text-zinc-400 font-serif-body text-sm">
          Nyalakan/matikan sakelar (buah) untuk melihat eksponensial kombinasi.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {allItems.map((item) => {
          const isActive = activeItems.includes(item.id);
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`px-5 py-3 rounded-xl border flex items-center gap-3 transition-colors duration-300 ${
                isActive
                  ? `${item.color} shadow-[0_0_20px_rgba(251,191,36,0.1)]`
                  : "bg-[#000000] border-zinc-800 text-zinc-600 hover:border-zinc-600"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-colors ${isActive ? "bg-current shadow-[0_0_10px_currentColor]" : "bg-zinc-800"}`}
              />
              <span className="font-medium font-sans">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-[#000000] rounded-xl border border-zinc-800">
          <div className="text-zinc-500 text-sm mb-2">
            Jumlah Anggota (<i className="font-serif-title">n</i>)
          </div>
          <motion.div
            key={n}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="text-4xl font-light text-zinc-200"
          >
            {n}
          </motion.div>
        </div>
        <div className="p-6 bg-[#000000] rounded-xl border border-amber-500/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="text-amber-500/80 text-sm mb-2">
            Rumus Kemungkinan
          </div>
          <div className="text-4xl font-serif-title text-amber-500">
            2<sup className="text-2xl">{n}</sup>
          </div>
        </div>
        <div className="p-6 bg-[#000000] rounded-xl border border-zinc-800">
          <div className="text-zinc-500 text-sm mb-2">
            Total Kombinasi Panitia
          </div>
          <motion.div
            key={possibilities}
            initial={{ scale: 1.5, color: "#fbbf24" }}
            animate={{ scale: 1, color: "#f8fafc" }}
            className="text-4xl font-bold"
          >
            {possibilities}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN APPLICATION ---

export default function Page() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fontStyles;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-300 relative overflow-hidden">
      <div className="fixed inset-0 bg-math-grid pointer-events-none opacity-20 z-0"></div>

      {/* Decorative Dark Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:px-12 md:py-32">
        {/* HERO SECTION */}
        <header className="mb-32 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase mb-8 shadow-xl"
          >
            <BookOpen size={14} className="text-amber-500" />
            <span>Editorial Visual</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-widest uppercase mb-8 shadow-xl"
          >
            Ribhararnus
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
              &lt;Pracutiar&gt;
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif-title font-bold text-white leading-[1.1] mb-8"
          >
            Logika <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
              Desa Sukamaju
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-zinc-400 font-serif-body max-w-2xl leading-relaxed"
          >
            Bagaimana rutinitas warga, kerja bakti, dan lomba makan kerupuk
            dapat menjelaskan fondasi utama dari matematika:{" "}
            <strong className="text-zinc-200">Teori Himpunan</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 flex justify-center md:justify-start"
          >
            <ChevronDown className="animate-bounce text-zinc-600" size={32} />
          </motion.div>
        </header>

        {/* NARRATIVE SECTIONS */}
        <article className="prose prose-invert prose-lg max-w-none font-serif-body text-zinc-300 leading-loose">
          <KeyPoints />

          <FadeIn direction="up">
            <p className="text-2xl text-zinc-200 leading-relaxed mb-12 border-l-4 border-amber-500 pl-6 bg-gradient-to-r from-zinc-900/50 to-transparent py-4">
              Di sebuah Desa Sukamaju, Pak RT sering kali harus membandingkan
              daftar warga yang ikut kerja bakti dengan daftar seluruh warga di
              wilayahnya.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <SvgVillageIntro />
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-amber-500 mt-20 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <Users className="text-amber-500/50" /> Kelompok Bagian (Subset)
            </h2>
            <MathSidebar
              icon={Users}
              formula={<i>A ⊆ B</i>}
              description="Himpunan A adalah subset dari B jika setiap elemen di A juga ada di B."
            />
            <p className="mb-6">
              Keadaan di mana semua orang yang ada di daftar kerja bakti
              ternyata memang benar warga RT tersebut adalah hal yang sangat
              wajar. Dalam urusan surat-menyurat desa, situasi ini disebut
              sebagai hubungan{" "}
              <Highlight color="yellow">kelompok bagian</Highlight>.
            </p>
            <p className="mb-6">
              Jika setiap orang di Kelompok A (kerja bakti) juga terdaftar
              sebagai anggota di Kelompok B (warga RT), maka Kelompok A sah
              disebut sebagai bagian dari Kelompok B.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <SvgSubset />
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-rose-500 mt-24 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <UserMinus className="text-rose-500/50" /> Bagian Murni (Proper
              Subset)
            </h2>
            <MathSidebar
              icon={UserMinus}
              formula={<i>A ⊂ B</i>}
              description="A adalah proper subset dari B jika A subset B, tetapi A tidak sama persis dengan B."
            />
            <p className="mb-6">
              Kadang-kadang, Pak RT mendapati bahwa daftar peserta lomba makan
              kerupuk berisi nama-nama yang semuanya adalah warga RT 05, tapi{" "}
              <Highlight color="red">
                tidak semua warga RT 05 ikut lomba tersebut
              </Highlight>
              . Ada sisa warga yang hanya menonton di pinggir lapangan.
            </p>
            <p className="mb-6">
              Situasi ini disebut sebagai "bagian murni". Kelompok lomba itu
              adalah bagian dari warga RT, tapi mereka tidak identik atau tidak
              sama jumlahnya karena ada warga yang absen dari perlombaan.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <SvgProperSubset />
          </FadeIn>

          <FadeIn direction="up">
            <SubsetVisualizer />
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-blue-500 mt-24 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <Box className="text-blue-500/50" /> Aturan Dapur & Daftar Kosong
            </h2>
            <MathSidebar
              icon={Box}
              formula={
                <div>
                  <i>A ⊆ A</i>
                  <br />
                  <i>∅ ⊆ A</i>
                </div>
              }
              description="Setiap himpunan adalah subset dari dirinya sendiri. Himpunan kosong adalah subset dari semua himpunan."
            />
            <p className="mb-6">
              Dalam administrasi desa yang teliti, ada aturan unik mengenai
              kelompok ini. Setiap kelompok warga, secara otomatis, dianggap
              sebagai bagian dari dirinya sendiri. Ini seperti mengatakan bahwa
              seluruh warga RT 05 adalah bagian dari warga RT 05 itu sendiri.
              Selain itu, ada yang namanya{" "}
              <Highlight color="blue">"kelompok kosong"</Highlight> atau daftar
              yang tidak ada namanya sama sekali. Uniknya, daftar kosong ini
              dianggap sebagai bagian dari kelompok mana pun yang ada di desa,
              entah itu kelompok pengajian, kelompok ronda, atau tim sepak bola
              desa.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <SvgSpices />
          </FadeIn>

          <FadeIn direction="up">
            <p className="mb-6">
              Mari kita lihat contoh nyata di dapur Bu Sari. Jika Bu Sari punya
              kelompok bumbu dapur yang isinya bawang merah dan bawang putih,
              maka kelompok ini adalah bagian dari kelompok bumbu yang lebih
              besar yang isinya bawang merah, bawang putih, dan cabai. Namun,
              jika Bu Sari menambahkan merica ke dalam kelompok kecil tadi, maka
              kelompok itu bukan lagi bagian dari kelompok bumbu yang isinya
              hanya bawang merah, bawang putih, dan cabai, karena merica tidak
              ada di sana.
            </p>
            <p className="mb-6">
              Ada perbedaan penting antara menjadi "anggota" dan menjadi
              "kelompok bagian". Pak Bambang adalah seorang anggota dari warga
              desa, dia berdiri sendiri sebagai pribadi. Namun, keluarga Pak
              Bambang yang terdiri dari Pak Bambang sendiri adalah sebuah
              kelompok kecil yang merupakan bagian dari warga desa. Terkadang,
              sesuatu bisa menjadi anggota sekaligus menjadi bagian. Misalnya,
              dalam sebuah kotak arsip desa, ada satu map plastik berisi satu
              lembar kertas. Map plastik itu adalah anggota di dalam kotak, tapi
              kumpulan kertas di dalamnya juga merupakan bagian dari isi kotak
              tersebut.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-emerald-500 mt-24 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <CheckCircle2 className="text-emerald-500/50" /> Kesamaan Kelompok
              (Equality)
            </h2>
            <SvgEquality />
            <p className="mb-6">
              Pak RW punya cara sederhana untuk menentukan apakah dua kelompok
              warga itu sebenarnya sama atau tidak. Beliau melihatnya dari dua
              arah.
            </p>
            <motion.blockquote
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#0a0a0a] border-l-4 border-emerald-500 p-8 rounded-r-xl my-10 text-zinc-300 italic shadow-2xl relative"
            >
              <span className="text-6xl text-emerald-500/20 absolute top-2 left-4 font-serif">
                "
              </span>
              "Jika semua anggota Kelompok A adalah anggota Kelompok B, dan di
              saat yang sama semua anggota Kelompok B juga merupakan anggota
              Kelompok A, maka Pak RW berani menjamin bahwa Kelompok A dan
              Kelompok B adalah{" "}
              <Highlight color="green">kelompok yang sama persis</Highlight>.
              Tidak ada bedanya sama sekali selain namanya saja."
            </motion.blockquote>
            <p className="mb-6">
              Dalam rapat desa yang melelahkan, pengurus sering menggunakan
              singkatan agar tidak berbelit-belit. Daripada mengatakan "Untuk
              setiap orang yang merupakan anggota dari kelompok tani, maka orang
              tersebut pasti punya cangkul," mereka menggunakan kode singkat
              untuk "Semua yang ada di kelompok". Begitu juga jika ingin
              mengatakan "Setidaknya ada satu orang di kelompok tani yang punya
              traktor," mereka punya kode sendiri untuk menyebut "Ada sebagian".
              Ini memudahkan pencatatan di buku besar desa.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-amber-500 mt-24 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <ListTree className="text-amber-500/50" /> Daftar Segala
              Kemungkinan (Power Set)
            </h2>
            <MathSidebar
              icon={ListTree}
              formula={<span style={{ fontFamily: "cursive" }}>P(A)</span>}
              description="Power Set adalah himpunan dari semua subset yang mungkin dibentuk, termasuk himpunan kosong dan dirinya sendiri."
            />
            <p className="mb-6">
              Setelah memahami tentang bagian-bagian kelompok, sekarang muncul
              konsep yang lebih besar, yaitu{" "}
              <Highlight color="yellow">"Daftar Segala Kemungkinan"</Highlight>.
              Bayangkan Pak RT ingin membentuk panitia kecil untuk acara tujuh
              belasan dari tiga orang warga: Andi, Budi, dan Caca. Daftar segala
              kemungkinan ini adalah sebuah daftar besar yang mencatat semua
              jenis panitia yang mungkin terbentuk, mulai dari tidak ada panitia
              sama sekali, panitia yang isinya cuma satu orang, panitia berdua,
              sampai panitia yang isinya ketiganya.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <SvgTree />
          </FadeIn>

          <FadeIn direction="up">
            <p className="mb-6">
              Jika kita jabarkan satu per satu panitia yang mungkin dari Andi,
              Budi, dan Caca, maka isinya adalah: pertama, tidak ada orang sama
              sekali. Kedua, panitia yang hanya berisi Andi. Ketiga, hanya Budi.
              Keempat, hanya Caca. Kelima, gabungan Andi dan Budi. Keenam,
              gabungan Andi dan Caca. Ketujuh, gabungan Budi dan Caca. Dan
              terakhir, kedelapan, panitia lengkap berisi Andi, Budi, dan Caca.
              Kumpulan dari kedelapan kemungkinan inilah yang disebut sebagai
              kelompok segala kemungkinan.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <h2 className="text-3xl font-serif-title text-zinc-200 mt-24 mb-6 flex items-center gap-3 border-b border-zinc-800 pb-4">
              <Calculator className="text-zinc-500" /> Memecahkan Pola Rahasia
            </h2>
            <p className="mb-6">
              Sekarang, mari kita coba pecahkan sebuah masalah. Jika kita punya
              empat benda, katakanlah apel, belimbing, ceri, dan duku, apa saja
              semua kemungkinan kelompok kecil yang bisa dibuat? Jawabannya ada
              16 kemungkinan. Kita mulai dari daftar kosong (tidak pilih apa
              pun). Lalu yang isinya satu per satu: apel saja, belimbing saja,
              ceri saja, dan duku saja. Kemudian yang isinya pasangan dua benda:
              apel-belimbing, apel-ceri, apel-duku, belimbing-ceri,
              belimbing-duku, dan ceri-duku.
            </p>
            <p className="mb-6">
              Lalu kita daftar yang isinya tiga benda: apel-belimbing-ceri,
              apel-belimbing-duku, apel-ceri-duku, dan belimbing-ceri-duku.
              Terakhir adalah kelompok lengkap yang berisi keempat-empatnya:
              apel, belimbing, ceri, dan duku. Jika kita hitung semua dari
              daftar kosong sampai daftar lengkap, totalnya ada 16 macam
              kombinasi kelompok yang bisa kita buat dari empat benda tersebut.
            </p>
            <p className="mb-6">
              Mungkin Anda bertanya-tanya, apakah ada pola rahasia untuk
              mengetahui jumlah kemungkinan ini tanpa harus menulisnya satu per
              satu? Ternyata ada cara mudahnya. Setiap kali kita menambah satu
              anggota baru ke dalam kelompok utama, jumlah kemungkinan kelompok
              kecil yang bisa dibentuk akan menjadi{" "}
              <strong className="text-amber-500 font-bold">
                dua kali lipat
              </strong>{" "}
              dari sebelumnya.
            </p>
            <p className="mb-6">
              Coba kita perhatikan: jika tidak ada anggota (nol), kemungkinannya
              hanya 1 (yaitu daftar kosong). Jika ada 1 anggota, kemungkinannya
              jadi 2. Jika ada 2 anggota, kemungkinannya jadi 4. Jika ada 3
              anggota, kemungkinannya jadi 8. Dan jika ada 4 anggota seperti
              contoh apel hingga duku tadi, kemungkinannya jadi 16. Ini terjadi
              karena setiap anggota punya dua pilihan: mau ikut dimasukkan ke
              dalam kelompok kecil atau tidak.
            </p>
          </FadeIn>

          <FadeIn direction="up">
            <PowerSetInteractive />
          </FadeIn>

          <FadeIn direction="up">
            <div className="mt-24 pt-16 border-t border-zinc-800 text-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"
              />
              <Lightbulb
                className="mx-auto text-amber-500 mb-8 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                size={56}
              />
              <p className="text-2xl text-zinc-300 font-serif-title italic max-w-2xl mx-auto leading-relaxed">
                "Logika ini mirip seperti sakelar lampu di balai desa. Jika ada
                tiga sakelar, dan masing-masing bisa dalam posisi mati atau
                nyala, maka total kombinasi cahaya yang bisa dihasilkan adalah
                hasil perkalian dua sebanyak tiga kali. Itulah alasan mengapa
                jumlah daftar segala kemungkinannya akan selalu mengikuti pola
                perkalian angka dua."
              </p>
            </div>
          </FadeIn>
        </article>
      </div>

      {/* FOOTER */}
      <footer className="py-12 text-center text-zinc-600 text-sm font-serif-body border-t border-zinc-900 bg-[#000000] z-10 relative">
        <p>Sebuah eksperimen naratif interaktif.</p>
        <p className="mt-2 text-zinc-700">
          Dibuat menggunakan React, Tailwind & Framer Motion.
        </p>
      </footer>
    </div>
  );
}
