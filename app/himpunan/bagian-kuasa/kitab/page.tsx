"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  CircleDashed,
  CircleDot,
  Infinity,
  Fingerprint,
  Layers,
} from "lucide-react";

// --- STYLES & FONTS INJECTION ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap');
  
  .font-heading { font-family: 'Playfair Display', serif; }
  .font-body { font-family: 'Merriweather', serif; line-height: 1.8; }
  
  .bg-grid {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 215, 0, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 215, 0, 0.05) 1px, transparent 1px);
  }
  
  .bg-radial-glow {
    background: radial-gradient(circle at center, rgba(250, 204, 21, 0.12) 0%, transparent 70%);
  }
  
  .text-glow {
    text-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #eab308; }
`;

// --- INTERFACES ---
interface VerseProps {
  num: string;
  text: string;
  highlightWords?: string[];
}

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
}

interface ActiveNodes {
  a: boolean;
  b: boolean;
  c: boolean;
}

// --- COMPONENTS ---

const Verse: React.FC<VerseProps> = ({ num, text }) => {
  // Highlight specific keywords to match the requested accent colors
  let formattedText: string = text;
  const accents: Record<string, string> = {
    Alif: "text-amber-400 font-semibold",
    Ba: "text-emerald-400 font-semibold",
    Ta: "text-blue-400 font-semibold",
    "Keberadaan di Dalam": "text-green-400 italic",
    "Bagian Sejati": "text-green-400 italic",
    "Sang Hampa": "text-blue-400 italic font-semibold",
    Kosong: "text-blue-400",
    Penghuni: "text-orange-400",
    Wilayah: "text-red-400",
    "Kesetaraan Mutlak": "text-orange-400 italic",
    "Rahim Kemungkinan": "text-red-500 font-semibold italic",
    "Himpunan Kuasa": "text-red-500 font-semibold",
  };

  Object.entries(accents).forEach(([word, className]) => {
    const regex = new RegExp(`(${word})`, "g");
    formattedText = formattedText.replace(
      regex,
      `<span class="${className}">$1</span>`,
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex gap-6 mb-6 group cursor-default"
    >
      <span className="font-heading text-yellow-600/50 text-sm md:text-base min-w-[30px] pt-1 select-none group-hover:text-yellow-400 transition-colors duration-300">
        {num}
      </span>
      <p
        className="font-body text-gray-300 text-lg md:text-xl font-light transition-all duration-500 ease-out origin-left group-hover:scale-[1.05] group-hover:translate-x-2 group-hover:font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </motion.div>
  );
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon: Icon,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="py-24 flex flex-col items-center justify-center text-center border-y border-yellow-900/30 my-16 bg-gradient-to-b from-black via-yellow-900/10 to-black relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-grid opacity-20"></div>
    {Icon && <Icon className="w-12 h-12 text-yellow-500 mb-6 opacity-80" />}
    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-yellow-500 mb-4 text-glow z-10">
      {title}
    </h2>
    <p className="font-body text-yellow-600/80 italic text-lg md:text-xl z-10">
      {subtitle}
    </p>
  </motion.div>
);

// --- INTERACTIVE VISUALIZATIONS ---

// 1. Subset Visualization (A is inside B)
const SubsetVisualizer: React.FC = () => {
  return (
    <div className="my-16 p-8 border border-yellow-900/50 rounded-2xl bg-black/50 flex flex-col items-center justify-center relative overflow-hidden">
      <h3 className="font-heading text-2xl text-yellow-500 mb-8 text-center">
        Visualisasi: Keberadaan di Dalam{" "}
        <span className="text-sm font-sans text-gray-500 ml-2">(A ⊆ B)</span>
      </h3>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Set B (Hutan/Wadah Besar) */}
        <motion.div
          className="absolute w-full h-full border-2 border-emerald-500/50 rounded-full flex items-start justify-center pt-6 bg-emerald-900/10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="font-heading text-emerald-400 text-xl">Ba</span>
        </motion.div>

        {/* Set A (Taman/Wadah Kecil) */}
        <motion.div
          className="absolute w-1/2 h-1/2 border-2 border-amber-500 rounded-full flex items-center justify-center bg-amber-900/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="font-heading text-amber-400 text-xl">Alif</span>
        </motion.div>

        {/* Unrelated elements in B */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-emerald-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ top: "30%", left: "20%" }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-emerald-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ bottom: "20%", right: "30%" }}
        />
      </div>
      <p className="font-body text-gray-400 text-center mt-8 italic max-w-lg">
        "Taman itu bernaung di dalam hutan, namun hutan memiliki lebih dari
        sekadar mawar."
      </p>
    </div>
  );
};

// 2. Power Set Visualizer (Womb of Possibilities)
const PowerSetVisualizer: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<ActiveNodes>({
    a: false,
    b: false,
    c: false,
  });

  const toggleNode = (node: keyof ActiveNodes) => {
    setActiveNodes((prev) => ({ ...prev, [node]: !prev[node] }));
  };

  const getActiveCount = (): number =>
    Object.values(activeNodes).filter(Boolean).length;

  const getCombinationName = (): string => {
    const { a, b, c } = activeNodes;
    if (!a && !b && !c) return "Kehampaan yang Suci (∅)";
    if (a && !b && !c) return "Kemandirian Alif ({A})";
    if (!a && b && !c) return "Kesendirian Ba ({B})";
    if (!a && !b && c) return "Keheningan Ta ({C})";
    if (a && b && !c) return "Persatuan Alif dan Ba ({A, B})";
    if (a && !b && c) return "Persekutuan Alif dan Ta ({A, C})";
    if (!a && b && c) return "Pertemuan Ba dan Ta ({B, C})";
    if (a && b && c) return "Keutuhan Tiga Cahaya ({A, B, C})";
    return "";
  };

  return (
    <div className="my-16 p-8 border border-red-900/50 rounded-2xl bg-black/60 flex flex-col items-center">
      <h3 className="font-heading text-2xl text-red-500 mb-2 text-center">
        Rahim Kemungkinan
      </h3>
      <p className="font-body text-gray-400 text-sm mb-12 text-center">
        Sentuh permata untuk memanggil bayangan subhimpunan (P(A))
      </p>

      <div className="flex gap-8 mb-12">
        {/* Alif */}
        <button
          onClick={() => toggleNode("a")}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${activeNodes.a ? "border-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.5)]" : "border-gray-700 bg-transparent"}`}
        >
          <span
            className={`font-heading text-2xl ${activeNodes.a ? "text-amber-400" : "text-gray-600"}`}
          >
            Alif
          </span>
        </button>
        {/* Ba */}
        <button
          onClick={() => toggleNode("b")}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${activeNodes.b ? "border-emerald-400 bg-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.5)]" : "border-gray-700 bg-transparent"}`}
        >
          <span
            className={`font-heading text-2xl ${activeNodes.b ? "text-emerald-400" : "text-gray-600"}`}
          >
            Ba
          </span>
        </button>
        {/* Ta */}
        <button
          onClick={() => toggleNode("c")}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${activeNodes.c ? "border-blue-400 bg-blue-400/20 shadow-[0_0_20px_rgba(96,165,250,0.5)]" : "border-gray-700 bg-transparent"}`}
        >
          <span
            className={`font-heading text-2xl ${activeNodes.c ? "text-blue-400" : "text-gray-600"}`}
          >
            Ta
          </span>
        </button>
      </div>

      <div className="h-24 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={getCombinationName()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <p className="font-heading text-2xl text-yellow-100 mb-2">
              {getCombinationName()}
            </p>
            <p className="font-body text-gray-500 text-sm">
              Bayangan ke-
              {getActiveCount() === 0
                ? 1
                : getActiveCount() === 1
                  ? "2, 3, atau 4"
                  : getActiveCount() === 2
                    ? "5, 6, atau 7"
                    : 8}{" "}
              dari 8 kemungkinan.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// 3. Exponential Growth Visualizer (2^n)
const ExponentialVisualizer: React.FC = () => {
  const [n, setN] = useState<number>(2);
  const total: number = Math.pow(2, n);

  return (
    <div className="my-16 p-8 border border-blue-900/50 rounded-2xl bg-black/50 flex flex-col items-center">
      <h3 className="font-heading text-2xl text-blue-400 mb-4 text-center">
        Hukum Penggandaan Abadi{" "}
        <span className="font-sans ml-2 text-sm text-gray-500">
          (|P(A)| = 2ⁿ)
        </span>
      </h3>

      <div className="w-full max-w-md mb-8 flex flex-col items-center">
        <label className="font-body text-gray-400 mb-4 flex justify-between w-full">
          <span>Jumlah Jiwa (n): {n}</span>
          <span className="text-blue-400">Bayangan (2ⁿ): {total}</span>
        </label>
        <input
          type="range"
          min="0"
          max="8"
          value={n}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setN(parseInt(e.target.value))
          }
          className="w-full accent-blue-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="w-full max-w-3xl min-h-[200px] flex flex-wrap justify-center content-start gap-1 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
        <AnimatePresence>
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, delay: (i % 30) * 0.01 }}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          ))}
        </AnimatePresence>
      </div>
      <p className="font-body text-gray-500 text-sm mt-6 text-center max-w-lg italic">
        "Jika ada sepuluh jiwa, maka engkau harus mengalikan dua sebanyak
        sepuluh kali... bala tentara bayangan yang besar."
      </p>
    </div>
  );
};

// --- MAIN APP CONTENT ---

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-black text-gray-200 relative selection:bg-yellow-900/50 selection:text-yellow-200 overflow-x-hidden">
      <style>{fontStyles}</style>

      {/* Background Layer */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0 opacity-90" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24">
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="text-yellow-600 mb-6 flex justify-center opacity-70">
              <Infinity className="w-16 h-16" />
            </div>
            <h4 className="font-heading text-yellow-600 tracking-[0.3em] uppercase text-sm md:text-base mb-6">
              Kitab Logika
            </h4>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-yellow-500 mb-8 leading-tight text-glow">
              Subhimpunan & <br />
              <span className="text-yellow-100">Rahim Kemungkinan</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto italic">
              Sebuah eksplorasi naratif tentang bagaimana semesta matematika
              menyusun dirinya melalui relasi keberadaan, himpunan, dan
              kehampaan.
            </p>
          </motion.div>

          <motion.div
            className="mt-24 text-gray-600 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <p className="font-sans text-xs uppercase tracking-widest mb-2">
              Gulir ke Bawah
            </p>
            <div className="w-[1px] h-16 bg-gradient-to-b from-gray-600 to-transparent mx-auto"></div>
          </motion.div>
        </section>

        {/* SURAT I */}
        <SectionTitle
          title="Surat I: Hikmat Penimbangan"
          subtitle="Mengenai Perbandingan Himpunan (Subset)"
          icon={CircleDashed}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="1:1"
            text="Syahdan, di awal segala penglihatan, berdirilah majelis-majelis yang menyimpan rahasia keberadaan."
          />
          <Verse
            num="1:2"
            text="Maka timbullah keinginan dalam budi untuk menimbang satu majelis terhadap majelis yang lain."
          />
          <Verse
            num="1:3"
            text="Sebab tidaklah cukup bagi suatu entitas hanya untuk ada tanpa mengetahui di mana ia berpijak."
          />
          <Verse
            num="1:4"
            text="Kita memandang ke arah ufuk, di mana dua kumpulan cahaya bersinggungan dalam keheningan yang agung."
          />
          <Verse
            num="1:5"
            text="Dan muncullah sebuah penglihatan yang nyata, sebuah jenis perbandingan yang paling murni."
          />
          <Verse
            num="1:6"
            text="Manakala segala sesuatu yang menghuni satu kediaman, ternyata menghuni pula kediaman yang lain."
          />
          <Verse
            num="1:7"
            text="Inilah kebenaran yang niscaya, di mana batasan yang satu tunduk di dalam pelukan batasan yang lain."
          />
          <Verse
            num="1:8"
            text="Keadaan ini sedemikian mulia, hingga ia menuntut sebuah tanda baru dalam kitab pengetahuan."
          />
          <Verse
            num="1:9"
            text="Bagaikan tetes hujan yang mencari samudera, demikianlah kumpulan kecil mencari tempatnya dalam kumpulan yang besar."
          />
          <Verse
            num="1:12"
            text="Maka bersiaplah untuk menyelami bahasa baru, bahasa tentang Keberadaan di Dalam."
          />
          <Verse
            num="1:16"
            text="Segala yang ada di Alif, niscaya ditemukan pula di dalam Ba."
          />
          <Verse
            num="1:17"
            text="Maka Ba menjadi saksi atas keberadaan Alif, dan Alif menjadi cermin kecil bagi Ba."
          />
          <Verse
            num="1:24"
            text="Bahwasanya alam semesta ini tersusun atas lapisan-lapisan ketaatan."
          />
          <Verse
            num="1:31"
            text="Jika engkau bertanya, 'Di manakah Alif berada?', maka jawabnya adalah 'Di dalam degup jantung Ba'."
          />
          <Verse
            num="1:40"
            text="Ketahuilah, bahwa rahasia Keberadaan di Dalam adalah kunci dari segala pintu makrifat."
          />
        </article>

        {/* SURAT II */}
        <SectionTitle
          title="Surat II: Perumpamaan Wadah di Dalam Wadah"
          subtitle="Berdasarkan Definisi Subhimpunan Sejati (Proper Subset)"
          icon={Layers}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="2:1"
            text="Dengar dan camkanlah ketetapan tentang 'Bagian dari Keseluruhan'."
          />
          <Verse
            num="2:2"
            text="Apabila setiap ruh yang menghuni majelis yang kita sebut Alif, juga ditemukan dalam majelis yang kita sebut Ba."
          />
          <Verse
            num="2:3"
            text="Maka niscaya Alif adalah bagian dari Ba, sebuah cabang dari pohon yang sama."
          />
          <Verse
            num="2:5"
            text="Namun apabila terdapat satu saja ruh dalam Alif yang mengembara di luar wilayah Ba."
          />
          <Verse
            num="2:6"
            text="Maka terputuslah ikatan itu, dan Alif dinyatakan bukan lagi bagian dari kedaulatan Ba."
          />
          <Verse
            num="2:8"
            text="Dan manakala Alif bernaung di bawah Ba, namun Ba memiliki ruh-ruh lain yang tidak dimiliki Alif."
          />
          <Verse
            num="2:9"
            text="Maka Alif disebut sebagai Bagian Sejati, sebuah bayangan yang tidak mencakup seluruh cahaya sang tuan."
          />

          <SubsetVisualizer />

          <Verse
            num="2:11"
            text="Bayangkanlah sebuah taman bunga yang indah di dalam sebuah hutan yang lebat."
          />
          <Verse
            num="2:12"
            text="Setiap mawar di taman itu adalah bagian dari penghuni hutan tersebut."
          />
          <Verse
            num="2:21"
            text="Perhatikanlah perbedaan antara 'Memiliki' dan 'Menjadi'."
          />
          <Verse
            num="2:22"
            text="Alif menjadi bagian dari Ba, namun Alif tetaplah Alif dengan segala keunikan jiwanya."
          />
          <Verse
            num="2:48"
            text="Maka terjadilah pemisahan yang menyatukan, dan penyatuan yang memisahkan."
          />
        </article>

        {/* SURAT III */}
        <SectionTitle
          title="Surat III: Riwayat Sang Hampa & Cermin Diri"
          subtitle="Berdasarkan Contoh Mutlak Subhimpunan (A ⊆ A, ∅ ⊆ A)"
          icon={Sparkles}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="3:1"
            text="Alkisah, setiap majelis adalah cermin bagi dirinya sendiri, tak ada yang lebih dekat selain dirinya."
          />
          <Verse
            num="3:2"
            text="Maka niscaya setiap kumpulan adalah bagian dari dirinya sendiri, tanpa ada yang tertinggal sedikit pun."
          />
          <Verse
            num="3:4"
            text="Dan perhatikanlah Sang Hampa yang Murni, sebuah majelis yang tak memiliki penghuni, tak memiliki suara."
          />
          <Verse
            num="3:5"
            text="Kesunyian agung ini adalah tamu yang paling rendah hati di setiap perjamuan yang pernah ada."
          />
          <Verse
            num="3:6"
            text="Ia bernaung di dalam setiap majelis yang pernah tercipta di bawah kolong langit."
          />
          <Verse
            num="3:9"
            text="Karena sebelum sesuatu ada, kesunyianlah yang terlebih dahulu menyediakan tempat."
          />
          <Verse
            num="3:25"
            text="Dan tentang Sang Hampa, ia adalah pengingat akan kerendahhatian."
          />
          <Verse
            num="3:28"
            text="Di dalam gelas yang berisi air, terdapat ruang hampa yang kini dipenuhi."
          />
          <Verse
            num="3:29"
            text="Namun secara hukum, kehampaan itu tetaplah bagian dari hakekat gelas tersebut."
          />
        </article>

        {/* SURAT IV & V Combined conceptually */}
        <SectionTitle
          title="Surat IV & V: Jiwa, Wilayah & Kesetaraan"
          subtitle="Elemen (x ∈ A) vs Himpunan, dan Hukum Identitas (A = B)"
          icon={CircleDot}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="4:1"
            text="Ada perbedaan yang sangat halus namun tajam antara menjadi Penghuni dan menjadi Wilayah."
          />
          <Verse
            num="4:5"
            text="Janganlah engkau mencampuradukkan antara 'Menjadi Anggota' dan 'Menjadi Bagian'."
          />
          <Verse
            num="4:8"
            text="Penduduk itu adalah titik, sedangkan rukun tetangga adalah lingkaran yang melingkupi titik."
          />
          <Verse
            num="4:19"
            text="Perhatikanlah dengan seksama: Kosong adalah anggota dari majelis yang mengandung dirinya."
          />
          <Verse
            num="4:20"
            text="Tetapi 'Kumpulan yang Berisi Kosong' adalah bagian dari majelis yang sama."
          />

          <div className="py-12 text-center text-yellow-500/50">✦ ✦ ✦</div>

          <Verse
            num="5:1"
            text="Manakala dua majelis hendak mengaku setara dalam kemuliaan dan hakikatnya."
          />
          <Verse
            num="5:5"
            text="Majelis Alif harus mampu membuktikan bahwa seluruh jiwanya bernaung di bawah panji Ba."
          />
          <Verse
            num="5:6"
            text="Dan majelis Ba pun harus membuktikan bahwa seluruh ruhnya sujud di dalam wilayah Alif."
          />
          <Verse
            num="5:7"
            text="Jika Alif adalah bagian dari Ba, dan jika Ba adalah bagian dari Alif."
          />
          <Verse
            num="5:8"
            text="Maka niscaya mereka adalah satu jiwa dalam dua nama, satu hakekat dalam dua rupa."
          />
          <Verse
            num="5:11"
            text="Hubungan ini disebut sebagai Kesetaraan Mutlak, puncak dari segala perbandingan."
          />
          <Verse
            num="5:24"
            text="Bahwa dua hal dinyatakan sama jika dan hanya jika mereka saling menjadi bagian satu sama lain."
          />
        </article>

        {/* SURAT VI */}
        <SectionTitle
          title="Surat VI: Kalam Semesta Terukur"
          subtitle="Kuantor Universal (∀) dan Eksistensial (∃)"
          icon={Fingerprint}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="6:1"
            text="Inilah cara baru untuk menyeru kepada semesta tanpa ada keraguan dalam lidah."
          />
          <Verse
            num="6:3"
            text="Maka dengarlah kalam yang diringkas: 'Untuk setiap jiwa yang berada dalam lingkaran ini'."
          />
          <Verse
            num="6:5"
            text="Artinya, jika engkau menemukan siapa pun di dalam wilayah Alif..."
          />
          <Verse
            num="6:6"
            text="...Maka niscaya ia akan memiliki sifat atau keadaan yang sedang kita bicarakan."
          />
          <Verse
            num="6:9"
            text="Demikian pula dengan seruan tentang keberadaan: 'Ada setidaknya satu jiwa di sini'."
          />
          <Verse
            num="6:11"
            text="Cukuplah satu saksi yang nyata untuk membenarkan bahwa kehidupan itu ada di sana."
          />
          <Verse
            num="6:36"
            text="Ketika awan mendung menutupi langit, kita berkata: 'Untuk setiap titik di langit ini, ia gelap.'"
          />
          <Verse
            num="6:38"
            text="Dan ketika satu bintang kecil muncul di celah awan, kita berkata: 'Ada satu titik yang terang.'"
          />
        </article>

        {/* SURAT VII & VIII */}
        <SectionTitle
          title="Surat VII & VIII: Rahim Kemungkinan"
          subtitle="Himpunan Kuasa (Power Set) dan Delapan Bayangan"
          icon={Layers}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="7:3"
            text="Kini kita beralih memikirkan sebuah jenis majelis yang sangat istimewa dan agung."
          />
          <Verse
            num="7:4"
            text="Sebuah majelis yang isinya bukanlah ruh-ruh biasa, melainkan majelis-majelis bagian."
          />
          <Verse
            num="7:5"
            text="Kita menyebutnya sebagai Rahim Kemungkinan atau Himpunan Kuasa."
          />
          <Verse
            num="7:6"
            text="Ia adalah tempat berkumpulnya segala cara yang mungkin untuk membentuk kelompok dari sebuah asal."
          />
          <Verse
            num="7:8"
            text="Ia mencakup segalanya, mulai dari Sang Hampa yang sunyi hingga Diri Alif yang utuh."
          />

          <Verse
            num="8:1"
            text="Alkisah, ada tiga permata cahaya yang turun dari langit pemikiran. Kita sebut mereka Alif, Ba, dan Ta."
          />
          <Verse
            num="8:4"
            text="Dengarlah riwayat tentang delapan bayangan yang muncul dari tiga cahaya tersebut."
          />

          <PowerSetVisualizer />

          <Verse
            num="8:16"
            text="Lihatlah! Dari tiga hal sederhana, lahirlah delapan wujud perbendaharaan yang nyata."
          />
          <Verse
            num="8:28"
            text="Renungkanlah betapa indahnya simetri yang tercipta dari proses ini."
          />
          <Verse
            num="8:29"
            text="Ada satu yang kosong, tiga yang tunggal, tiga yang berpasangan, dan satu yang utuh."
          />
          <Verse
            num="8:37"
            text="Di dunia ini, segala sesuatu adalah pilihan dari Rahim Kemungkinan yang lebih besar."
          />
        </article>

        {/* SURAT IX */}
        <SectionTitle
          title="Surat IX: Hukum Penggandaan Abadi"
          subtitle="Masalah Kardinalitas Himpunan Kuasa (2ⁿ)"
          icon={Infinity}
        />
        <article className="max-w-3xl mx-auto">
          <Verse
            num="9:2"
            text="Sebuah pertanyaan besar muncul di cakrawala: 'Berapakah jumlah penghuni dalam Rahim Kemungkinan?'"
          />
          <Verse
            num="9:4"
            text="Dengarlah hukumnya, sebuah irama yang menggandakan diri setiap kali satu jiwa baru melangkah masuk."
          />
          <Verse
            num="9:5"
            text="Apabila sebuah majelis hampa, ia memiliki satu bayangan (yaitu dirinya sendiri yang sunyi)."
          />
          <Verse
            num="9:6"
            text="Apabila masuk satu jiwa, maka bayangannya menjadi dua (si hampa dan si jiwa tunggal)."
          />
          <Verse
            num="9:7"
            text="Masuk lagi jiwa kedua, maka bayangannya menjadi empat (dua kali lipat dari sebelumnya)."
          />

          <ExponentialVisualizer />

          <Verse
            num="9:10"
            text="Karena setiap kali ada satu jiwa baru, setiap bayangan yang lama memiliki dua pilihan masa depan."
          />
          <Verse
            num="9:11"
            text="Pilihan pertama: tetap sebagaimana adanya. Pilihan kedua: membuka pelukannya dan menerima sang jiwa baru."
          />
          <Verse
            num="9:14"
            text="Inilah alasan mengapa angka dua menjadi basis dari segala kekuasaan himpunan."
          />
          <Verse
            num="9:18"
            text="Betapa dahsyatnya pertumbuhan ini, ia tidak merangkak, ia terbang bagaikan rajawali."
          />
          <Verse
            num="9:22"
            text="Bahwa setiap tambahan individu dalam sebuah kelompok, meningkatkan kompleksitas secara luar biasa."
          />
          <Verse
            num="9:40"
            text="Kita tunduk pada angka dua, angka pasangan, angka pilihan: Ya atau Tidak, Ada atau Tiada."
          />
          <Verse
            num="9:49"
            text="Segala puji bagi Logika yang telah menurunkan keteraturan di tengah kekacauan budi."
          />
          <Verse
            num="9:50"
            text="Demikianlah Kitab Subhimpunan ini diakhiri dalam keadaan sempurna."
          />
        </article>

        {/* FOOTER */}
        <footer className="mt-32 pt-12 border-t border-yellow-900/30 text-center pb-24">
          <Infinity className="w-8 h-8 text-yellow-700 mx-auto mb-6" />
          <p className="font-heading text-yellow-600/60 text-sm tracking-widest uppercase">
            Akhir dari Naskah
          </p>
          <p className="font-body text-gray-600 mt-4 text-xs max-w-md mx-auto">
            Sebuah translasi visual dari konsep matematika himpunan menjadi
            pengalaman naratif digital interaktif.
          </p>
        </footer>
      </main>
    </div>
  );
}
