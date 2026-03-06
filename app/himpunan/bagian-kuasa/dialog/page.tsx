"use client";
import React, {
  useState,
  useEffect,
  useId,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Apple,
  Banana,
  Citrus,
  Circle,
  Box,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";

// --- TYPES & INTERFACES ---

type SpeakerType = "Guru" | "Murid";

interface HoverContextType {
  hoveredId: string | null;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SectionHeadingProps {
  children: React.ReactNode;
}

interface DialogLineProps {
  speaker: SpeakerType;
  text: React.ReactNode;
  delay?: number;
}

// --- CONTEXT FOR DIALOG HOVER EFFECT ---
const DialogHoverContext = createContext<HoverContextType>({
  hoveredId: null,
  setHoveredId: () => {},
});

// --- HELPER COMPONENTS ---

const BackgroundGrid: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* Grid abu-abu samar */}
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            className="text-zinc-800 opacity-50"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    {/* Gradient untuk transisi warna hitam di ujung halaman */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
  </div>
);

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="font-playfair text-3xl md:text-5xl text-white mb-12 border-b border-zinc-800 pb-6"
  >
    {children}
  </motion.h2>
);

const DialogLine: React.FC<DialogLineProps> = ({
  speaker,
  text,
  delay = 0,
}) => {
  const isGuru = speaker === "Guru";
  const id = useId();
  const { hoveredId, setHoveredId } = useContext(DialogHoverContext);

  // Logika Dimming: Jika ada dialog yang di-hover, dan itu BUKAN dialog ini, maka buat meredup.
  const isDimmed = hoveredId !== null && hoveredId !== id;

  return (
    <motion.div
      initial={{ opacity: 0, x: isGuru ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`mb-8 md:mb-12 flex flex-col ${isGuru ? "items-start" : "items-start md:items-end"}`}
    >
      <div
        onMouseEnter={() => setHoveredId(id)}
        onMouseLeave={() => setHoveredId(null)}
        className={`transition-all duration-500 ease-in-out cursor-default ${
          isDimmed
            ? "opacity-20 blur-[1px] scale-[0.98]"
            : "opacity-100 scale-100"
        }`}
      >
        <span
          className={`block text-sm tracking-widest uppercase font-bold mb-2 ${isGuru ? "text-amber-400" : "text-blue-400"}`}
        >
          {speaker}
        </span>
        <div
          className={`font-merriweather text-lg md:text-xl leading-relaxed text-zinc-300 ${isGuru ? "text-left" : "text-left md:text-right"} max-w-2xl`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
};

// --- VISUALIZERS (STICKY PANELS) ---

const SubsetVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        {/* Wadah 2 (Besar) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 border-2 border-zinc-700 rounded-full flex items-start justify-center pt-8 bg-zinc-900/30"
        >
          <span className="text-zinc-500 font-playfair italic absolute top-4">
            Wadah 2 (B)
          </span>
          <div
            className="absolute top-1/4 right-1/4 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <Citrus size={40} className="text-orange-400" />
          </div>
        </motion.div>

        {/* Wadah 1 (Kecil - Subset) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-2/3 h-2/3 border-2 border-amber-400 rounded-full flex items-center justify-center bg-amber-400/5 shadow-[0_0_30px_rgba(251,191,36,0.1)]"
        >
          <span className="text-amber-400 font-playfair italic absolute top-4">
            Wadah 1 (A)
          </span>
          <div className="flex gap-4 mt-4">
            <Banana size={40} className="text-yellow-300" />
            <Apple size={40} className="text-red-400" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-12 text-center"
      >
        <p className="font-playfair text-2xl text-amber-400">A ⊆ B</p>
        <p className="font-merriweather text-sm text-zinc-400 mt-2">
          Setiap elemen di A juga berada di B.
        </p>
      </motion.div>
    </div>
  );
};

const VoidVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-zinc-700 rounded-full border-dashed flex items-center justify-center relative"
        >
          <span className="text-zinc-600 font-playfair text-4xl">∅</span>
        </motion.div>

        <span className="text-amber-400 text-2xl font-serif">⊆</span>

        <div className="w-40 h-40 border-2 border-zinc-600 rounded-full flex flex-wrap items-center justify-center gap-2 p-4 bg-zinc-900/50">
          <Box size={20} className="text-blue-400" />
          <Circle size={20} className="text-red-400" />
          <Sparkles size={20} className="text-yellow-400" />
        </div>
      </div>
      <p className="font-merriweather text-center text-zinc-400 mt-12 max-w-xs">
        Kekosongan tidak memiliki isi yang bisa melanggar aturan "bagian".{" "}
        <br />
        <br />
        <span className="text-amber-400 font-playfair text-xl">∅ ⊆ A</span>
      </p>
    </div>
  );
};

// --- INTERACTIVE PLAYGROUND (POWER SET) ---

const PowerSetPlayground: React.FC = () => {
  const [elements, setElements] = useState<string[]>(["A", "B", "C"]);
  const maxElements = 5;

  const addElement = () => {
    if (elements.length < maxElements) {
      const nextChar = String.fromCharCode(65 + elements.length);
      setElements([...elements, nextChar]);
    }
  };

  const removeElement = () => {
    if (elements.length > 1) {
      setElements(elements.slice(0, -1));
    }
  };

  // Generate subsets algorithm dengan strong typing
  const generateSubsets = (arr: string[]): string[][] => {
    return arr.reduce<string[][]>(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]],
    );
  };

  const subsets = generateSubsets(elements).sort((a, b) => a.length - b.length);

  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 p-6 md:p-12 rounded-2xl relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h3 className="font-playfair text-3xl text-white mb-2">
            Eksplorasi Kumpulan Kuasa
          </h3>
          <p className="font-merriweather text-zinc-400">
            Teorema: Jumlah himpunan bagian ={" "}
            <span className="text-amber-400 font-bold font-sans">2ⁿ</span>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-black/50 p-2 rounded-lg border border-zinc-800">
          <button
            onClick={removeElement}
            disabled={elements.length <= 1}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-md text-white transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-playfair text-xl w-32 text-center text-white">
            n = {elements.length} benda
          </span>
          <button
            onClick={addElement}
            disabled={elements.length >= maxElements}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-md text-white transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-zinc-500 mb-2 uppercase tracking-widest">
          Himpunan Asal (Wadah)
        </p>
        <div className="flex gap-2 text-white">
          {"{"}
          <AnimatePresence>
            {elements.map((el, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                key={el}
                className="text-amber-400 font-playfair text-xl font-bold"
              >
                {el}
                {i < elements.length - 1 ? "," : ""}
              </motion.span>
            ))}
          </AnimatePresence>
          {"}"}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
          <p className="text-sm text-zinc-500 uppercase tracking-widest">
            Kumpulan Kuasa (Power Set)
          </p>
          <p className="font-playfair text-2xl text-blue-400">
            Total: {subsets.length} kemungkinan
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {subsets.map((subset, index) => (
              <motion.div
                key={subset.join("") + index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * (0.05 / elements.length),
                }}
                className={`px-3 py-2 rounded-md border text-sm font-merriweather transition-colors duration-300
                  ${
                    subset.length === 0
                      ? "bg-black border-zinc-800 text-zinc-500"
                      : subset.length === elements.length
                        ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                        : "bg-zinc-900 border-zinc-700 text-zinc-300"
                  }`}
              >
                {subset.length === 0
                  ? "∅ (Kosong)"
                  : `{ ${subset.join(", ")} }`}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function Dialog() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Inject Fonts via useEffect
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <DialogHoverContext.Provider value={{ hoveredId, setHoveredId }}>
      {/* Menggunakan bg-black untuk latar absolut Tailwind */}
      <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-amber-400/30 selection:text-amber-200 relative">
        <BackgroundGrid />

        {/* Styles for the imported fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-merriweather { font-family: 'Merriweather', serif; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        `,
          }}
        />

        {/* HERO SECTION */}
        <header className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <p className="text-amber-400 uppercase tracking-[0.3em] text-sm md:text-md mb-6 font-bold">
                Sebuah Dialog Sokrates
              </p>
              <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 text-white drop-shadow-2xl">
                Arsitektur <br />{" "}
                <span className="italic font-light text-zinc-500">dari</span>{" "}
                Kekosongan
              </h1>
              <p className="font-merriweather text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Sebuah eksplorasi visual mengenai himpunan, subset, dan pola
                semesta yang tersembunyi di dalam wadah yang paling sederhana.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-widest text-zinc-600 mb-2">
                Gulir untuk Memulai
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </header>

        {/* NARRATIVE SECTION 1: MENGENAL HUBUNGAN */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Visual Sidebar (Sticky) */}
            <div className="hidden lg:block relative">
              <div className="sticky top-1/4 h-[60vh] rounded-2xl border border-zinc-800 bg-black/50 backdrop-blur-sm overflow-hidden">
                <SubsetVisualizer />
              </div>
            </div>

            {/* Text Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <SectionHeading>
                Bagian 1: Mengenal Hubungan Antar Kumpulan
              </SectionHeading>

              <p className="font-merriweather text-zinc-500 italic mb-12">
                Dalam sebuah pendopo yang tenang, seorang Guru duduk bersama
                Muridnya. Di depan mereka terdapat beberapa wadah anyaman bambu
                yang berisi berbagai macam buah dan benda-benda sederhana.
              </p>

              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Wahai Muridku, lihatlah kedua wadah ini. Wadah pertama
                    berisi pisang dan apel. Wadah kedua berisi pisang, apel, dan
                    jeruk. Apa yang kau perhatikan tentang isi{" "}
                    <span className="text-amber-400">wadah pertama</span> jika
                    dibandingkan dengan{" "}
                    <span className="text-blue-400">wadah kedua</span>?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Saya melihat bahwa semua buah yang ada di wadah pertama, ternyata ada juga di dalam wadah kedua, Guru."
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Tepat sekali. Jika setiap barang di wadah pertama juga bisa
                    ditemukan di wadah kedua, menurutmu apakah adil jika kita
                    menyebut wadah pertama sebagai{" "}
                    <strong className="text-amber-400">"bagian"</strong> dari
                    wadah kedua?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Tentu, Guru. Karena ia seolah-olah 'terkandung' di dalamnya."
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Itulah yang kita sebut sebagai Bagian atau{" "}
                    <strong className="text-white border-b border-amber-400">
                      Sub-kumpulan
                    </strong>
                    . Namun, bagaimana jika di wadah pertama ada buah mangga,
                    sementara di wadah kedua tidak ada mangga? Apakah ia masih
                    bisa disebut bagian dari wadah kedua?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Tentu tidak, Guru. Karena ada satu barang yang tidak dimiliki oleh wadah kedua. Syaratnya haruslah semua isinya ada di wadah lain itu."
              />
              <DialogLine
                speaker="Guru"
                text="Bagus. Sekarang, jika wadah pertama berisi pisang dan apel, dan wadah kedua juga berisi pisang dan apel saja. Apakah wadah pertama masih merupakan bagian dari wadah kedua?"
              />
              <DialogLine
                speaker="Murid"
                text="Masih, Guru. Karena syarat 'setiap isinya ada di sana' tetap terpenuhi, meski isinya persis sama."
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Benar. Tapi, jika wadah pertama adalah bagian dari wadah
                    kedua, namun wadah kedua memiliki lebih banyak jenis barang
                    (seperti tambahan jeruk tadi), kita menyebut wadah pertama
                    sebagai{" "}
                    <strong className="text-orange-400">
                      Bagian Murni (Proper Subset)
                    </strong>
                    . Mengapa menurutmu kita perlu membedakannya?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Mungkin untuk menunjukkan bahwa wadah pertama benar-benar lebih kecil dan bukan sekadar kembaran dari wadah kedua?"
              />
              <DialogLine
                speaker="Guru"
                text="Engkau cerdas. Itu untuk menegaskan bahwa ada sesuatu yang dimiliki wadah kedua yang tidak dimiliki wadah pertama."
              />
            </div>
          </div>
        </section>

        {/* NARRATIVE SECTION 2: SIFAT KEKOSONGAN */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-40 bg-zinc-900/20 border-y border-zinc-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="prose prose-invert prose-lg max-w-none lg:order-2">
              <SectionHeading>
                Bagian 2 & 3: Sifat Kumpulan & Kesamaan
              </SectionHeading>

              <DialogLine
                speaker="Guru"
                text="Mari kita merenung. Jika kau punya sebuah wadah, apakah wadah itu merupakan bagian dari dirinya sendiri?"
              />
              <DialogLine
                speaker="Murid"
                text="(Berpikir sejenak) Hmm, karena setiap isi di wadah itu pastilah ada di wadah itu juga, maka jawabannya iya, Guru."
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Tepat. Sekarang, bayangkan sebuah{" "}
                    <strong className="text-zinc-400">
                      wadah yang benar-benar kosong
                    </strong>
                    . Tidak ada apa pun di dalamnya. Apakah wadah kosong ini
                    merupakan bagian dari wadah yang berisi buah tadi?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Ini membingungkan, Guru. Bagaimana sesuatu yang kosong bisa menjadi bagian dari sesuatu yang berisi?"
              />
              <DialogLine
                speaker="Guru"
                text="Coba pikirkan begini: apakah ada isi di wadah kosong itu yang tidak ada di wadah buah?"
              />
              <DialogLine
                speaker="Murid"
                text="Tidak ada, Guru. Karena memang tidak ada isinya sama sekali."
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Karena tidak ada satu pun isinya yang membantah aturan kita,
                    maka{" "}
                    <strong className="text-amber-400">
                      wadah kosong dianggap sebagai bagian dari wadah mana pun
                    </strong>
                    . Ia adalah awal dari segala kemungkinan. Bisa kau terima?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text="Saya mulai mengerti. Kekosongan tidak memiliki isi yang bisa melanggar aturan 'bagian' tersebut."
              />

              <div className="my-16 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Muridku, jika wadah A adalah bagian dari wadah B, dan di
                    saat yang sama wadah B juga adalah bagian dari wadah A, apa
                    kesimpulanmu?
                  </>
                }
              />
              <DialogLine
                speaker="Murid"
                text={
                  <>
                    Jika A ada di dalam B, tapi B juga ada di dalam A... maka
                    mereka pastilah{" "}
                    <strong className="text-blue-400">
                      barang yang sama persis
                    </strong>
                    , Guru! Tidak mungkin ada yang lebih besar atau lebih kecil.
                  </>
                }
              />
              <DialogLine
                speaker="Guru"
                text={
                  <>
                    Itulah kebenaran sejati. Kesamaan antara dua kumpulan{" "}
                    <span className="font-playfair italic text-xl text-amber-400">
                      ( A = B )
                    </span>{" "}
                    hanya bisa dipastikan jika keduanya saling memiliki satu
                    sama lain tanpa sisa.
                  </>
                }
              />
            </div>

            {/* Visual Sidebar (Sticky) - Left Side */}
            <div className="hidden lg:block relative lg:order-1">
              <div className="sticky top-1/4 h-[60vh] rounded-2xl border border-zinc-800 bg-black/50 backdrop-blur-sm overflow-hidden">
                <VoidVisualizer />
              </div>
            </div>
          </div>
        </section>

        {/* NARRATIVE SECTION 4 & 5: POWER SET */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-40">
          <SectionHeading>
            Bagian 4: Kumpulan dari Segala Kemungkinan
          </SectionHeading>

          <DialogLine
            speaker="Guru"
            text="Sekarang, mari kita naik ke tingkat yang lebih tinggi. Bayangkan kau punya satu kantong berisi tiga batu: batu merah, batu biru, dan batu kuning."
          />
          <DialogLine speaker="Murid" text="Baik, Guru. Ada tiga batu." />
          <DialogLine
            speaker="Guru"
            text="Jika aku memintamu untuk mengambil beberapa batu (boleh ambil semua, boleh tidak ambil sama sekali), ada berapa banyak cara kau bisa membawa pulang 'kelompok batu' tersebut?"
          />
          <DialogLine
            speaker="Murid"
            text={
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-zinc-500 italic mb-2">
                  Mari saya hitung:
                </span>
                <span>1. Tidak mengambil apa-apa (wadah kosong).</span>
                <span>2. Merah saja. / 3. Biru saja. / 4. Kuning saja.</span>
                <span>
                  5. Merah & Biru. / 6. Merah & Kuning. / 7. Biru & Kuning.
                </span>
                <span>8. Ketiganya: Merah, Biru, dan Kuning.</span>
              </div>
            }
          />
          <DialogLine
            speaker="Guru"
            text={
              <>
                Bagus sekali! Jika semua pilihan tadi kita kumpulkan ke dalam
                satu lemari besar, lemari itulah yang kita sebut sebagai{" "}
                <strong className="text-amber-400 text-2xl font-playfair border-b border-amber-400">
                  Kumpulan Kuasa (Power Set)
                </strong>
                . Ia adalah kumpulan yang isinya adalah semua kemungkinan
                "bagian" dari wadah asalmu.
              </>
            }
          />

          <div className="my-20">
            <PowerSetPlayground />
          </div>

          <DialogLine
            speaker="Guru"
            text="Perhatikan polanya. Tadi saat batunya ada 3, jumlah caranya ada 8. Saat bendanya ada 4, jumlah caranya ada 16. Mengapa itu terjadi?"
          />
          <DialogLine
            speaker="Murid"
            text="Jumlahnya berlipat ganda, Guru! 8 dikali 2 adalah 16."
          />
          <DialogLine
            speaker="Guru"
            text={
              <>
                Bayangkan setiap kali kau ingin membentuk kelompok, setiap benda
                punya dua pilihan:{" "}
                <strong className="text-green-400">"Ikut masuk"</strong> atau{" "}
                <strong className="text-red-400">"Tinggal di luar"</strong>.
              </>
            }
          />
          <DialogLine
            speaker="Murid"
            text="Ah! Jadi untuk benda A ada 2 pilihan. Benda B juga ada 2 pilihan. Jika ada 3 benda, maka pilihannya adalah 2 × 2 × 2 = 8."
          />
          <DialogLine
            speaker="Guru"
            text={
              <>
                Tepat sekali. Itulah sebabnya mengapa jumlah kemungkinan
                kelompok bagian akan selalu menjadi dua pangkat dari jumlah
                benda aslinya. Jika ada <span className="italic">n</span> benda,
                maka ada{" "}
                <strong className="text-amber-400 font-sans font-bold text-xl">
                  2ⁿ
                </strong>{" "}
                cara.
              </>
            }
          />
        </section>

        {/* CONCLUSION */}
        <footer className="relative z-10 border-t border-zinc-900 bg-black px-6 py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Box className="w-12 h-12 text-amber-400 mx-auto mb-8 opacity-50" />
              <p className="font-playfair text-2xl md:text-3xl text-zinc-300 leading-relaxed mb-8">
                "Kebenaran selalu rapi bagi mereka yang mau mengamati dengan
                sabar. Setiap kumpulan kecil adalah bagian dari cerita yang
                lebih besar, dan kekosongan adalah awal dari semua kemungkinan."
              </p>
              <p className="font-merriweather text-sm text-zinc-500 uppercase tracking-widest">
                — Sang Guru
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </DialogHoverContext.Provider>
  );
}
