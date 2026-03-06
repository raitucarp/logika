"use client";
import { useState, useMemo } from "react";
import {
  MousePointer2,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Box,
} from "lucide-react";

// --- Utility Components ---

// Grid Background Style
const gridBackgroundStyle = {
  backgroundColor: "#09090b", // zinc-950
  backgroundImage: `
    linear-gradient(to right, rgba(250, 204, 21, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(250, 204, 21, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
  backgroundPosition: "center center",
};

// Popover/Tooltip for Math Symbols
// @ts-ignore
const SymbolPopover = ({ symbol, title, description, pulse = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasHovered(true);
  };

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`
        font-mono font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded
        transition-colors duration-300 group-hover:bg-yellow-400 group-hover:text-black
        ${pulse && !hasHovered ? "animate-pulse ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-zinc-950" : ""}
      `}
      >
        {symbol}
      </span>

      {/* Popover Content */}
      <span
        className={`
        absolute flex flex-col bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 
        bg-zinc-800 border border-yellow-500/30 shadow-2xl rounded-xl z-50 pointer-events-none
        transition-all duration-300 origin-bottom text-left
        ${isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"}
      `}
      >
        {/* Triangle pointer */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-zinc-800 block"></span>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-[1px] border-8 border-transparent border-t-yellow-500/30 -z-10 block"></span>

        <strong className="font-bold text-yellow-400 flex items-center gap-2 mb-1">
          <Info size={16} /> {title}
        </strong>
        <span className="text-sm text-zinc-300 leading-relaxed font-normal">
          {description}
        </span>
      </span>
    </span>
  );
};

// --- Main Application ---

export default function InteractiveSetsApp() {
  // State for Subset Playground
  // @ts-ignore
  const [playgroundUniverse, setPlaygroundUniverse] = useState([
    "🍎",
    "🍌",
    "🍒",
    "🍇",
    "🍉",
  ]);
  const [subsetA, setSubsetA] = useState(["🍎", "🍌"]);
  // @ts-ignore
  const [subsetB, setSubsetB] = useState(["🍎", "🍌", "🍒"]); // Target set

  // Subset Logic
  const isSubset = subsetA.every((item) => subsetB.includes(item));
  // @ts-ignore
  const isProperSubset = isSubset && subsetA.length < subsetB.length;
  const isEqual = isSubset && subsetA.length === subsetB.length;

  // @ts-ignore
  const toggleItemInA = (item) => {
    if (subsetA.includes(item)) {
      setSubsetA(subsetA.filter((i) => i !== item));
    } else {
      setSubsetA([...subsetA, item]);
    }
  };

  // State for Power Set Playground
  const availableElements = ["⭐", "🌙", "☀️", "☁️"];
  const [powerSetBase, setPowerSetBase] = useState(["⭐", "🌙"]);

  // @ts-ignore
  const togglePowerSetBaseItem = (item) => {
    if (powerSetBase.includes(item)) {
      setPowerSetBase(powerSetBase.filter((i) => i !== item));
    } else {
      if (powerSetBase.length < 4) setPowerSetBase([...powerSetBase, item]);
    }
  };

  // Calculate Power Set
  const powerSet = useMemo(() => {
    let result = [[]];
    for (let value of powerSetBase) {
      let length = result.length;
      for (let i = 0; i < length; i++) {
        let temp = result[i].slice(0);
        // @ts-ignore
        temp.push(value);
        result.push(temp);
      }
    }
    return result.sort((a, b) => a.length - b.length);
  }, [powerSetBase]);

  return (
    <div
      style={gridBackgroundStyle}
      className="min-h-screen text-zinc-200 font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden"
    >
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Box className="text-yellow-400" />
            <div>
              <span className="text-white">Ribhararnus</span>
              <span className="text-yellow-400">{`<Pracutiar>`}</span>
            </div>
            <span className="text-white-100">|</span>
            <span className="text-white">Teori</span>
            <span className="text-yellow-400">Himpunan</span>
            <span className="text-white-100">|</span>
            <div>
              <span className="text-white">Subset dan Kuasa</span>
            </div>
          </div>
          <a
            href="#mulai"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors hidden sm:block"
          >
            Jelajahi Konsep
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Menjelajahi <span className="text-yellow-400">Semesta</span>
          <br />
          Himpunan
        </h1>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Mari kita membandingkan kelompok demi kelompok. Pelajari bagaimana
          elemen-elemen berinteraksi, membentuk subset, dan menciptakan ruang
          lingkup baru yang tak terhingga.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#konsep-subset"
            className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Mulai Interaksi <ChevronDown size={20} />
          </a>
          <span className="text-zinc-500 text-sm flex items-center gap-2">
            <MousePointer2 size={16} /> Arahkan kursor ke simbol berpendar!
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-32 space-y-32" id="mulai">
        {/* Section 1: Subset & Proper Subset */}
        <section id="konsep-subset" className="relative">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-yellow-400/20">
              Konsep 1: Subset
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Apakah setiap elemenmu ada padaku?
            </h2>

            <p className="text-lg text-zinc-300 leading-relaxed">
              Jika setiap elemen dari sebuah himpunan <strong>A</strong> juga
              merupakan elemen dari himpunan <strong>B</strong>, maka kita
              katakan bahwa <strong>A</strong> adalah sebuah{" "}
              <SymbolPopover
                symbol="Subset"
                title="Subset (Himpunan Bagian)"
                description="Himpunan A adalah subset dari B jika seluruh isinya juga berada di dalam B."
                pulse={true}
              />{" "}
              dari <strong>B</strong>, dan kita menulisnya dengan{" "}
              <SymbolPopover
                symbol="A ⊆ B"
                title="Notasi Subset"
                description="Simbol ⊆ berarti 'adalah subset dari atau sama dengan'."
                pulse={true}
              />
              .
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Namun, jika{" "}
              <SymbolPopover
                symbol="A ⊆ B"
                title="A subset B"
                description="A ada di dalam B"
              />{" "}
              tetapi mereka tidak persis sama (ada sisa elemen di B), kita
              menyebutnya sebagai <strong>Proper Subset</strong> (Subset Murni)
              dan menuliskannya sebagai{" "}
              <SymbolPopover
                symbol="A ⊊ B"
                title="Proper Subset"
                description="Simbol ⊊ berarti 'subset dari tapi tidak sama dengan'. Elemen A semuanya ada di B, tapi B punya sesuatu yang A tidak punya."
              />
              . Jika A bukan subset, kita tulis{" "}
              <SymbolPopover
                symbol="A ⊈ B"
                title="Bukan Subset"
                description="Ada setidaknya satu elemen di A yang tidak dapat ditemukan di B."
              />
              .
            </p>

            {/* Interactive Subset Builder */}
            <div className="mt-10 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="text-yellow-400" size={20} /> Eksperimen
                Subset
              </h3>
              <p className="text-zinc-400 mb-6 text-sm">
                Pilih elemen dari Semesta untuk dimasukkan ke{" "}
                <strong>Himpunan A</strong>. Perhatikan bagaimana statusnya
                berubah terhadap <strong>Himpunan B</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Visual Set B (Target) */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-yellow-400 font-bold mb-4">
                    Himpunan B (Target)
                  </h4>
                  <div className="flex flex-wrap gap-2 text-3xl">
                    {subsetB.map((fruit) => (
                      <span
                        key={fruit}
                        className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-lg"
                      >
                        {fruit}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 font-mono">
                    B = {"{ 🍎, 🍌, 🍒 }"}
                  </p>
                </div>

                {/* Visual Set A (Interactive) */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                  <h4 className="text-white font-bold mb-4">
                    Himpunan A (Bentuk milikmu!)
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {playgroundUniverse.map((fruit) => {
                      const isActive = subsetA.includes(fruit);
                      return (
                        <button
                          key={fruit}
                          onClick={() => toggleItemInA(fruit)}
                          className={`
                            text-3xl w-12 h-12 flex items-center justify-center rounded-lg transition-all
                            ${
                              isActive
                                ? "bg-yellow-400 scale-110 shadow-lg shadow-yellow-400/20"
                                : "bg-zinc-800 hover:bg-zinc-700 opacity-50 grayscale hover:grayscale-0"
                            }
                          `}
                        >
                          {fruit}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    A = {"{"}{" "}
                    {subsetA.length === 0 ? (
                      <SymbolPopover
                        symbol="∅"
                        title="Himpunan Kosong"
                        description="Himpunan yang tidak memiliki elemen. Himpunan kosong adalah subset dari SETIAP himpunan!"
                      />
                    ) : (
                      subsetA.join(", ")
                    )}{" "}
                    {"}"}
                  </p>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`
                mt-8 p-4 rounded-xl flex items-center gap-4 text-lg font-bold transition-colors
                ${isSubset ? (isEqual ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30") : "bg-red-500/20 text-red-400 border border-red-500/30"}
              `}
              >
                {isSubset ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                <div>
                  <div className="flex items-center gap-2">
                    Status:
                    <span className="font-mono bg-zinc-950 px-2 py-1 rounded">
                      {isSubset ? (isEqual ? "A = B" : "A ⊊ B") : "A ⊈ B"}
                    </span>
                  </div>
                  <div className="text-sm font-normal opacity-80 mt-1">
                    {isSubset
                      ? isEqual
                        ? "Wow! Setiap elemen A ada di B, dan setiap elemen B ada di A. Mereka adalah himpunan yang sama!"
                        : "Keren! Setiap elemen yang kamu pilih ada di Himpunan B. Ini adalah Proper Subset."
                      : "Oops! Kamu memilih elemen (seperti Anggur/Semangka) yang tidak ada di Himpunan B."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Formal Notation & Extensionality */}
        <section className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-bold uppercase tracking-wider border border-yellow-400/20">
                Konsep 2: Kesamaan & Notasi
              </div>
              <h2 className="text-3xl font-bold text-white">
                Identitas Sebuah Himpunan
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Kriteria identitas dari himpunan (ekstensionalitas) menyatakan:{" "}
                <strong className="text-white">A = B</strong> jika dan hanya
                jika setiap elemen A adalah elemen B,{" "}
                <em className="text-yellow-400">dan sebaliknya</em>.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Dengan kata lain, dua himpunan itu sama jika mereka saling
                menjadi subset satu sama lain: <br />
                <span className="inline-block mt-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded font-mono text-yellow-400">
                  A = B ⟺ (A ⊆ B) ∧ (B ⊆ A)
                </span>
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-yellow-400" /> Notasi Formal
              </h3>
              <p className="text-zinc-400 mb-6 text-sm">
                Seringkali kita mengatakan "setiap elemen dari A adalah...".
                Matematikawan menggunakan simbol khusus untuk menghemat waktu:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800/50">
                  <div className="text-3xl text-yellow-400 font-serif pt-1">
                    <SymbolPopover
                      symbol="∀"
                      title="Kuantor Universal"
                      description="Dibaca 'Untuk setiap' atau 'Untuk semua'."
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-mono">
                      (∀x ∈ A) φ
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      Menggabungkan ∀ dan{" "}
                      <SymbolPopover
                        symbol="∈"
                        title="Elemen dari"
                        description="x ∈ A berarti 'x adalah elemen dari himpunan A'."
                      />
                      . Dibaca: "Untuk setiap x di dalam A, pernyataan φ
                      berlaku."
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 text-center text-sm font-mono text-yellow-300">
                  Maka, A ⊆ B ditulis: (∀x ∈ A) x ∈ B
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Power Set */}
        <section className="relative">
          <div className="space-y-6 text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-bold uppercase tracking-wider border border-yellow-400/20">
              Konsep 3: The Power Set
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Himpunan dari Semua Subset
            </h2>
            <p className="text-lg text-zinc-300">
              Bagaimana jika kita mengumpulkan <em>semua kemungkinan</em> subset
              dari suatu himpunan dan menjadikannya himpunan baru? Kita
              menyebutnya sebagai{" "}
              <SymbolPopover
                symbol="Power Set"
                title="Power Set (Himpunan Kuasa)"
                description="Kumpulan yang berisi SEMUA kemungkinan himpunan bagian dari himpunan awal."
              />{" "}
              yang disimbolkan dengan{" "}
              <SymbolPopover
                symbol="P(A)"
                title="Notasi Power Set"
                description="P(A) mewakili Power Set dari himpunan A."
              />
              .
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Control Panel */}
            <div className="p-8 md:w-1/3 bg-zinc-950 border-r border-zinc-800 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">
                Bangun Himpunan A
              </h3>
              <p className="text-zinc-400 text-sm mb-8">
                Pilih elemen di bawah ini (Maks. 4) untuk melihat bagaimana
                Power Set terbentuk secara eksponensial.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {availableElements.map((item) => {
                  const isActive = powerSetBase.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => togglePowerSetBaseItem(item)}
                      className={`
                        py-4 text-3xl rounded-xl transition-all border
                        ${
                          isActive
                            ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                        }
                      `}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-800">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-zinc-400">Total Elemen (n)</span>
                  <span className="text-2xl font-bold text-white">
                    {powerSetBase.length}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-zinc-400">
                    Total Subset (<span className="text-yellow-400">2ⁿ</span>)
                  </span>
                  <span className="text-3xl font-bold text-yellow-400">
                    {powerSet.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Power Set Visualization */}
            <div className="p-8 md:w-2/3 min-h-[400px]">
              <h3 className="text-lg font-mono text-zinc-400 mb-6 flex items-center gap-2">
                <span className="text-yellow-400">P(A)</span> = {"{"}
              </h3>

              <div className="flex flex-wrap gap-3">
                {powerSet.map((subset, index) => (
                  <div
                    key={index}
                    className="animate-[fade-in_0.3s_ease-out] bg-zinc-800/50 border border-zinc-700/50 px-3 py-2 rounded-lg font-mono text-sm md:text-base text-zinc-200 flex items-center justify-center min-w-[3rem]"
                  >
                    {subset.length === 0 ? (
                      <span className="text-zinc-500">∅</span>
                    ) : (
                      subset.join(", ")
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-mono text-zinc-400 mt-6 text-right">
                {"}"}
              </h3>

              {powerSetBase.length === 0 && (
                <div className="mt-8 text-center text-zinc-500 p-4 border border-dashed border-zinc-700 rounded-xl">
                  Bahkan dari ketiadaan (himpunan kosong), P(A) selalu memiliki
                  setidaknya satu elemen: Himpunan kosong itu sendiri!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer Concept Wrap up */}
        <section className="text-center py-20">
          <h2 className="text-2xl font-bold text-zinc-300 mb-4">
            Masa depan adalah milik himpunan tak terhingga.
          </h2>
          <p className="text-zinc-500">
            Konsep sederhana bahwa "kumpulan dapat berisi kumpulan lain" adalah
            dasar dari seluruh matematika modern dan ilmu komputer.
          </p>
        </section>
      </main>

      {/* Basic keyframes injected via style tag for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-\\[fade-in_0\\.3s_ease-out\\] {
          animation: fade-in 0.3s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
}
