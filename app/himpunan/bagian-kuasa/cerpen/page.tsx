"use client";
import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Archive,
  Key,
  Image as ImageIcon,
  Circle,
  Disc,
  Wind,
  Plus,
  Minus,
  Info,
} from "lucide-react";

// --- TYPOGRAPHY & STYLING INJECTION ---
const fontStyles: string = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
  
  .font-serif-heading { font-family: 'Playfair Display', serif; }
  .font-serif-body { font-family: 'Merriweather', serif; }
  
  .grid-bg-dark {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  }
`;

// --- TYPES & INTERFACES ---
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface MathTooltipProps {
  term: string;
  math: string;
  explanation: string;
}

// --- HELPER COMPONENTS ---
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const MathTooltip: React.FC<MathTooltipProps> = ({
  term,
  math,
  explanation,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <span className="relative inline-block">
      <span
        className="text-yellow-400 font-semibold border-b border-yellow-500/30 cursor-help hover:bg-yellow-900/30 transition-colors duration-200 px-1 rounded"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {term}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-zinc-900 text-zinc-200 text-sm rounded-lg shadow-2xl border border-zinc-700 font-serif-body"
          >
            <span className="block font-serif-heading text-yellow-500 text-lg mb-1">
              {math}
            </span>
            <span className="block text-zinc-400 font-light leading-relaxed">
              {explanation}
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-700"></div>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

// --- MAIN SECTIONS ---

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-yellow-500 font-serif-heading tracking-widest uppercase text-sm mb-6"
        >
          Sebuah Eksplorasi Visual & Konseptual
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif-heading text-5xl md:text-7xl font-bold leading-tight mb-12 text-zinc-100"
        >
          Semesta di Dalam <br />
          <span className="text-yellow-500">Kotak Jati</span>
        </motion.h1>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-zinc-300 space-y-8 text-lg leading-loose font-serif-body">
        <FadeIn delay={1.2}>
          <p className="first-letter:text-6xl first-letter:font-serif-heading first-letter:float-left first-letter:mr-4 first-letter:text-yellow-500">
            Angin laut yang membawa aroma garam dan sisa pembusukan kayu tua
            menyusup melalui celah-celah ventilasi Griya Aksara, sebuah bangunan
            kolonial yang tampak lelah namun tetap tegak menantang zaman. Rumah
            itu berdiri di sudut sunyi sebuah kota pesisir yang namanya kian
            memudar dari peta ingatan orang-orang muda, seolah-olah waktu telah
            memutuskan untuk berhenti berdetak di sana, terjebak dalam tumpukan
            inventaris yang dikelola oleh satu-satunya penghuni yang tersisa:
            Pak Aris.
          </p>
        </FadeIn>
        <FadeIn delay={1.4}>
          <p>
            Baskara melangkah melewati pintu jati ganda yang berderit, merasakan
            suhu udara seketika turun beberapa derajat, seolah-olah ia baru saja
            melintasi batas antara dunia yang bising dan sebuah dimensi yang
            hening. Matanya butuh waktu untuk menyesuaikan diri dengan remang
            cahaya yang menembus jendela-jendela tinggi bertralis besi. Ia
            merasa seolah-olah baru saja tertelan oleh sebuah organisme raksasa
            yang perutnya terbuat dari kayu jati, debu halus, dan sejarah yang
            membeku. Di sepanjang dinding ruang tamu hingga lorong menuju dapur,
            peti-peti kayu jati bertumpuk hingga menyentuh langit-langit. Ada
            yang sekecil kotak korek api, ada yang sebesar ranjang bayi,
            masing-masing memiliki label kuningan yang kusam namun bersih dari
            jaring laba-laba.
          </p>
        </FadeIn>
        <FadeIn delay={1.6}>
          <p>
            Pak Aris muncul dari balik tumpukan peti di sudut ruangan. Pria tua
            itu mengenakan celemek kulit yang berlumur lilin lebah, tangannya
            memegang kuas kecil yang tampak sangat akrab dengan jemarinya yang
            gemetar namun presisi. Baskara, yang baru saja tiba dari ibu kota
            dengan membawa keriuhan algoritma dan efisiensi digital di
            kepalanya, merasa seketika menjadi asing. Baginya, rumah ini adalah
            sebuah anomali—sebuah tumpukan benda yang menuntut ruang namun
            memberikan sedikit kegunaan praktis. Ia datang dengan satu niat yang
            belum sempat ia ucapkan: meyakinkan pamannya untuk menjual rumah ini
            dan memindahkan isinya ke gudang yang lebih modern, atau mungkin
            membuang sebagian besar "sampah sejarah" ini demi sebuah masa depan
            yang lebih fungsional.
          </p>
        </FadeIn>
        <FadeIn delay={1.8}>
          <p>
            "Kau sudah sampai, Bas," sapa Pak Aris tanpa mengalihkan
            pandangannya dari sebuah kotak yang sedang ia bersihkan. Suaranya
            rendah, berwibawa, namun mengandung kehangatan yang sulit
            dijelaskan.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

const SubsetSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <section className="py-24 px-6 relative border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto space-y-8 text-lg leading-loose font-serif-body text-zinc-300 mb-16">
        <FadeIn>
          <p>
            "Rumah ini masih saja terasa seperti labirin yang sesak, Paman,"
            sahut Baskara, mencoba menyembunyikan rasa sesak di dadanya. Ia
            meletakkan ranselnya di atas lantai ubin yang dingin, di mana
            pantulan cahaya lampu minyak membentuk bayangan-bayangan panjang
            yang menari di dinding, seolah bayangan itu sendiri adalah penghuni
            rumah yang tidak kasat mata.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Pak Aris tersenyum tenang, sebuah senyuman yang seolah menyiratkan
            bahwa ia tahu persis apa yang sedang berkecamuk di dalam pikiran
            keponakannya. "Labirin hanya terasa menyesatkan bagi mereka yang
            tidak mengerti hubungannya, Bas. Mari masuk lebih dalam. Ada banyak
            hal yang harus kau pahami sebelum kau memutuskan apa yang ingin kau
            lakukan dengan tempat ini."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Mereka berjalan menyusuri lorong yang sempit, di mana setiap langkah
            Baskara terasa seperti sedang menembus lapisan-lapisan waktu yang
            berbeda. Di bawah lampu gantung yang bergoyang pelan ditiup angin
            laut, Pak Aris menarik sebuah kotak kecil dari rak tengah. Kotak itu
            diukir dengan motif sulur yang sangat halus. Dengan penuh khidmat,
            ia membukanya di depan Baskara. Di dalamnya terdapat tiga benda
            sederhana: seuntai kunci kuningan yang sudah menghitam, selembar
            foto hitam putih seorang wanita muda yang tersenyum tipis, dan
            sebuah cincin perak tanpa permata.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Pak Aris kemudian berjalan menuju sebuah peti besar di pojok
            ruangan, peti yang disebutnya sebagai 'Peti Induk Keluarga'. Ia
            membukanya, menyingkap tumpukan kain beludru merah yang menampung
            ratusan benda. Dengan perlahan, ia menunjukkan bahwa kunci kuningan
            yang sama, foto yang sama, dan cincin yang sama juga ada di
            sana—atau lebih tepatnya, peti induk itu memuat segala jenis benda
            yang mungkin ada di rumah itu, termasuk ketiga benda tersebut.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Dalam hidup, kita sering bertemu dengan hubungan seperti ini," kata
            Pak Aris, suaranya kini terdengar seperti gumaman filosofis. "Jika
            setiap kepingan yang kau temukan di kotak kecil ini juga kau temukan
            di dalam peti besar itu, maka kotak kecil ini telah menjadi bagian
            dari peti besar. Ia tidak lagi berdiri sebagai entitas yang asing;
            ia bersemayam di dalam identitas yang lebih luas. Ia menyerahkan
            keangkuhannya untuk menjadi bagian dari sesuatu yang lebih agung."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara memperhatikan benda-benda itu, merasa ada sesuatu yang
            bergeser di dalam logikanya. "Tapi Paman, bukankah itu hanya
            pengulangan? Mengapa harus ada kotak kecil jika isinya sudah ada di
            kotak besar?"
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Karena kotak kecil ini memberikan kita kejelasan," jawab Pak Aris.
            "Lihatlah peti besar ini. Ia memiliki keris, surat-surat tua,
            perhiasan, dan ribuan kenangan lain. Namun, karena ia memiliki
            hal-hal yang tidak dimiliki si kecil, maka kotak kecil ini adalah
            sebuah fragmen yang jujur. Ia adalah bagian murni yang memungkinkan
            kita fokus pada saripati tanpa harus tenggelam dalam keluasan yang
            tak terbatas."
          </p>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-zinc-900/50 p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-sm">
        <FadeIn className="order-2 md:order-1">
          <div className="font-serif-heading text-3xl mb-4 text-zinc-100">
            Bagian dari Keseluruhan
          </div>
          <p className="font-serif-body text-zinc-400 leading-relaxed mb-6">
            Seperti yang diungkapkan Pak Aris, kotak kecil (
            <span className="text-blue-400 font-semibold">A</span>) tidak
            kehilangan maknanya, melainkan menjadi{" "}
            <MathTooltip
              term="himpunan bagian"
              math="A \subseteq B"
              explanation="A adalah himpunan bagian (subset) dari B jika setiap elemen di A juga merupakan elemen di B."
            />{" "}
            dari Peti Induk (
            <span className="text-emerald-400 font-semibold">B</span>). Ia
            mendefinisikan fokus di tengah keluasan yang tak terbatas.
          </p>
          <div className="bg-black/50 p-6 rounded-lg border border-zinc-700/50">
            <h4 className="font-serif-heading font-semibold text-yellow-500 mb-3 flex items-center gap-2">
              <Info size={16} /> Definisi: Subset (Himpunan Bagian)
            </h4>
            <div className="font-mono text-sm bg-zinc-950 p-4 rounded text-zinc-300 mb-3 border border-zinc-800">
              <span className="text-blue-400">A</span> ⊆{" "}
              <span className="text-emerald-400">B</span> ⟺ (∀x ∈{" "}
              <span className="text-blue-400">A</span>) x ∈{" "}
              <span className="text-emerald-400">B</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="order-1 md:order-2 flex justify-center">
          <div
            className="relative w-72 h-72 rounded-full border-2 border-emerald-500/30 bg-emerald-950/20 flex items-center justify-center cursor-pointer transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute top-4 font-serif-heading text-emerald-500 font-semibold">
              Peti Induk (B)
            </div>

            {/* Elements in B but not in A */}
            <Archive
              className="absolute top-1/4 left-1/4 text-emerald-600/40"
              size={24}
            />
            <Archive
              className="absolute bottom-1/4 right-1/4 text-emerald-600/40"
              size={20}
            />
            <Archive
              className="absolute top-1/2 right-1/4 text-emerald-600/40"
              size={16}
            />

            {/* Subset A */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered
                  ? "rgba(96, 165, 250, 0.8)"
                  : "rgba(96, 165, 250, 0.3)",
                backgroundColor: isHovered
                  ? "rgba(30, 58, 138, 0.4)"
                  : "rgba(30, 58, 138, 0.2)",
              }}
              className="w-40 h-40 rounded-full border-2 flex flex-col items-center justify-center relative shadow-lg backdrop-blur-md"
            >
              <div className="absolute -top-6 font-serif-heading text-blue-400 font-semibold text-sm">
                Kotak Kecil (A)
              </div>
              <div className="flex gap-2 text-blue-300">
                <Key size={20} />
                <ImageIcon size={20} />
                <Circle size={20} />
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const ExtensionalitySection: React.FC = () => {
  const [openRose, setOpenRose] = useState<boolean>(false);
  const [openBlack, setOpenBlack] = useState<boolean>(false);

  return (
    <section className="py-24 px-6 relative border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto space-y-8 text-lg leading-loose font-serif-body text-zinc-300 mb-16">
        <FadeIn>
          <p>
            Malam itu, setelah Pak Aris kembali ke kamarnya, Baskara duduk
            sendirian di ruang tamu yang penuh dengan peti. Ia merenungkan
            pekerjaannya di Jakarta—sebuah perusahaan rintisan raksasa tempat ia
            menghabiskan belasan jam sehari untuk menulis kode. Ia mulai
            bertanya-tanya: apakah dirinya hanya sebuah 'bagian murni' dari
            sebuah sistem yang lebih besar? Apakah segala aspirasi dan mimpinya
            sebenarnya telah tercakup dalam visi perusahaan itu, namun ia merasa
            spesial hanya karena ia tidak melihat keseluruhan gambarnya?
            Kegelisahan itu merayap seperti kabut laut, dingin dan tak
            terhindarkan. Jika ia hanyalah bagian dari sesuatu yang lebih luas,
            apakah identitasnya tetap memiliki harga? Ia merasa seperti koin
            yang berada di dalam peti, ada di sana, diakui kehadirannya, namun
            identitasnya melebur dalam tumpukan logam lainnya.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Keesokan malamnya, hujan turun deras, membasahi atap seng dengan
            irama yang riuh dan mengancam. Mereka duduk di meja makan kayu jati
            yang sangat panjang, diterangi oleh beberapa batang lilin karena
            listrik sering padam di kota kecil ini. Pak Aris meletakkan dua
            kotak kayu di depan Baskara. Keduanya tampak berbeda secara
            lahiriah; yang satu berwarna cokelat tua dengan ukiran mawar yang
            mekar, yang lainnya berwarna hitam polos dengan permukaan yang halus
            seperti sutra.
          </p>
        </FadeIn>
        <FadeIn>
          <p>"Buka keduanya, Bas," perintah Pak Aris.</p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara membukanya dengan ragu. Ia tertegun. Isinya identik:
            masing-masing berisi satu koin perunggu tahun 1920 dan sebuah peluit
            bambu kecil yang tampaknya masih bisa berfungsi.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Dua rupa, satu jiwa," bisik Pak Aris. "Dunia mungkin akan
            menghakimi mereka berbeda karena ukirannya. Satu mungkin dianggap
            lebih berharga karena keindahan mawar, yang lain mungkin dianggap
            lebih modern karena kesahajaannya. Namun dalam hukum Griya Aksara,
            mereka adalah satu dan sama. Mengapa? Karena segala yang ada di
            dalam kotak mawar ada di dalam kotak hitam, dan segala yang ada di
            dalam kotak hitam ada di dalam kotak mawar. Mereka saling merengkuh
            secara sempurna. Itulah kesetaraan sejati, Bas. Ia bukan tentang
            rupa yang serupa, tapi tentang isi batin yang saling mencakup tanpa
            sisa."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara menyentuh peluit bambu itu, teringat pada hubungannya yang
            kandas beberapa bulan lalu. Mereka selalu berdebat tentang cara
            berpakaian, tentang selera musik, tentang hal-hal kulit luar.
            Mungkin, pikir Baskara, mereka tidak pernah mencapai titik di mana
            isi hati mereka saling merengkuh secara timbal balik. Mungkin ada
            bagian dari dirinya yang tidak ada di dalam kekasihnya, dan
            sebaliknya, sehingga mereka tidak pernah benar-benar menjadi satu
            identitas yang utuh. Pengetahuan ini datang padanya bukan sebagai
            rumus, melainkan sebagai rasa perih yang nyata di dadanya, sebuah
            kesadaran bahwa kebersamaan mereka hanyalah dua himpunan yang
            kebetulan beririsan, bukan dua jiwa yang saling menyatu sepenuhnya.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h3 className="font-serif-heading text-4xl mb-4 text-zinc-100">
              Prinsip Ekstensionalitas
            </h3>
            <p className="font-serif-body text-zinc-500 italic">
              "Mereka saling merengkuh secara sempurna. Itulah kesetaraan
              sejati."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 mb-12">
            {/* Box A */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setOpenRose(!openRose)}
                className={`w-40 h-40 md:w-56 md:h-56 rounded-xl border-2 transition-all duration-500 relative flex items-center justify-center group
                  ${openRose ? "bg-amber-950/60 border-amber-700/50" : "bg-black border-amber-900 hover:border-amber-700"}`}
              >
                {!openRose && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
                    <span className="font-serif-heading text-4xl">🌹</span>
                  </div>
                )}
                <div className="font-serif-heading text-sm absolute -top-8 text-amber-600">
                  Kotak Mawar (A)
                </div>
                <AnimatePresence>
                  {openRose && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-4 text-zinc-300"
                    >
                      <Disc size={32} /> <Wind size={32} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Box B */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setOpenBlack(!openBlack)}
                className={`w-40 h-40 md:w-56 md:h-56 rounded-xl border-2 transition-all duration-500 relative flex items-center justify-center group
                  ${openBlack ? "bg-zinc-900/80 border-zinc-600/50" : "bg-black border-zinc-800 hover:border-zinc-600"}`}
              >
                {!openBlack && (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent rounded-xl"></div>
                )}
                <div className="font-serif-heading text-sm absolute -top-8 text-zinc-500">
                  Kotak Hitam (B)
                </div>
                <AnimatePresence>
                  {openBlack && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-4 text-zinc-300"
                    >
                      <Disc size={32} /> <Wind size={32} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <motion.div
            animate={{ opacity: openRose && openBlack ? 1 : 0.3 }}
            className="text-center bg-zinc-900/50 p-6 md:p-8 rounded-xl border border-zinc-800 backdrop-blur-sm"
          >
            <div className="font-mono text-lg md:text-xl text-yellow-500 mb-4 bg-black/50 py-3 rounded-lg border border-zinc-800/80">
              <MathTooltip
                term="A = B"
                math="A = B \iff A \subseteq B \land B \subseteq A"
                explanation="Dua himpunan dikatakan sama jika dan hanya jika mereka saling menjadi himpunan bagian satu sama lain (memiliki anggota yang identik)."
              />{" "}
              ⟺ A ⊆ B ∧ B ⊆ A
            </div>
            <p className="font-serif-body text-zinc-400 leading-relaxed">
              Identitas suatu himpunan hanya ditentukan oleh anggotanya
              (ekstensinya). Karena kotak mawar memiliki koin dan peluit yang
              sama persis dengan kotak hitam, secara fundamental, mereka adalah
              entitas yang sama. Kulit luar tidak mengubah substansi.
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

const EmptySetSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto space-y-8 text-lg leading-loose font-serif-body text-zinc-300 mb-16">
        <FadeIn>
          <p>
            Tengah malam, sebuah dentum keras dari ruang inventaris mengejutkan
            mereka di tengah lelap. Angin kencang yang masuk melalui ventilasi
            yang rusak rupanya telah merobohkan salah satu rak kayu yang sudah
            lapuk. Baskara dan Pak Aris bergegas ke sana dengan lampu senter
            yang cahayanya membelah kegelapan yang pekat. Di tengah kekacauan
            peti-peti yang berserakan di atas ubin, Baskara menemukan sebuah
            kotak kecil yang terlempar paling jauh, tergeletak sendirian di
            bawah bayangan lemari besar.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Kotak itu terasa sangat ringan, hampir seperti udara yang diberi
            bentuk. Baskara membukanya dan mendapati kotak itu benar-benar
            kosong. Tidak ada koin, tidak ada foto, tidak ada debu sekalipun.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Kenapa kotak tak berguna ini diletakkan di rak paling atas?" tanya
            Baskara, kelelahannya mulai memicu amarah yang selama ini ia pendam
            di balik kesopanannya. "Ini hanya membuang tempat, Paman! Kita
            menyimpan ketiadaan seolah-olah itu adalah pusaka berharga!"
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Pak Aris mengambil kotak kosong itu dari tangan Baskara dengan
            gerakan yang sangat lembut, seolah-olah ia sedang memegang burung
            kecil yang terluka. Ia menatap Baskara dengan pandangan yang dalam,
            seolah sedang melihat jauh ke dalam lubuk batin keponakannya yang
            sedang goyah.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Inilah Kotak Sunyi, Bas. Kotak yang paling penting di seluruh rumah
            ini. Kau menganggapnya tak berguna karena matamu hanya dilatih untuk
            menghargai kehadiran benda. Tapi pikirkanlah: sebelum kau mengisi
            peti manapun dengan barang, apa yang ada di dalamnya? Ruang hampa
            itu tidak pernah pergi, Bas. Ia tetap di sana, menjadi landasan bagi
            benda apa pun yang kemudian kau masukkan. Kotak Sunyi ini adalah
            bagian dari setiap peti di rumah ini, tanpa terkecuali. Ia ada di
            dalam kotak perhiasan nenekmu, ia ada di dalam peti alat-alat kebun,
            bahkan ia ada di dalam dirimu dan diriku."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara tertegun. Cahaya lampu senternya menyinari debu-debu yang
            menari liar di udara yang lembap. Ia menyadari sesuatu yang selama
            ini ia abaikan dalam hiruk-pikuk ambisinya: bahwa ia selalu takut
            akan kekosongan. Ia takut akan kegagalan karena ia melihat kegagalan
            sebagai ketiadaan makna. Namun, Pak Aris justru merayakan kekosongan
            itu sebagai elemen penyusun yang paling universal. Ketiadaan bukan
            berarti tidak ada; ia adalah prasyarat bagi keberadaan. Ketiadaan
            adalah tamu pertama di setiap rumah. Kotak kosong itu bukan sekadar
            hampa; ia adalah sebuah keanggotaan universal yang mengikat setiap
            peti lainnya menjadi satu keluarga besar.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <FadeIn>
            <h2 className="font-serif-heading text-4xl mb-6 text-zinc-100">
              Ketiadaan Universal
            </h2>
            <blockquote className="border-l-2 border-red-500/50 pl-6 my-8 font-serif-heading text-xl md:text-2xl text-zinc-300 italic leading-snug">
              "Ketiadaan bukan berarti tidak ada; ia adalah prasyarat bagi
              keberadaan. Kotak kosong itu bukan sekadar hampa; ia adalah sebuah
              keanggotaan universal..."
            </blockquote>
            <p className="font-serif-body text-zinc-400 mb-6">
              Dalam matematika, ruang hampa ini diakui secara formal.{" "}
              <MathTooltip
                term="Kotak Sunyi"
                math="\emptyset \subseteq A"
                explanation="Himpunan kosong (disimbolkan dengan ∅) adalah himpunan bagian dari setiap himpunan yang ada."
              />{" "}
              adalah representasi dari kebenaran yang hampa (vacuous truth).
            </p>
            <div className="inline-block bg-red-950/30 text-red-400 px-5 py-3 rounded-lg font-mono text-sm border border-red-900/50">
              Aksioma: ∅ ⊆ A, untuk setiap himpunan A
            </div>
          </FadeIn>
        </div>

        <div className="flex-1 flex justify-center">
          <FadeIn delay={0.3}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0 border border-red-500/20 rounded-2xl rotate-3 shadow-[0_0_40px_rgba(239,68,68,0.1)] bg-black backdrop-blur-sm"></div>
              <div className="absolute inset-0 border border-red-500/30 rounded-2xl -rotate-2 flex items-center justify-center bg-black/50">
                <span className="font-serif-heading text-7xl text-red-500/80 font-light">
                  ∅
                </span>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const PowerSetPlayground: React.FC = () => {
  const [elements, setElements] = useState<number[]>([1, 2, 3]);
  const MAX_ELEMENTS = 6;

  const getSubsets = (arr: number[]): number[][] => {
    if (arr.length > 4) return [];
    return arr.reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
      [[]] as number[][],
    );
  };

  const subsets = getSubsets(elements);
  const powerSetSize = Math.pow(2, elements.length);

  const addElement = () => {
    if (elements.length < MAX_ELEMENTS) {
      setElements([...elements, elements.length + 1]);
    }
  };

  const removeElement = () => {
    if (elements.length > 0) {
      setElements(elements.slice(0, -1));
    }
  };

  return (
    <section className="py-24 px-6 relative border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto space-y-8 text-lg leading-loose font-serif-body text-zinc-300 mb-16">
        <FadeIn>
          <p>
            Keesokan paginya, suasana Griya Aksara terasa lebih ringan, meski
            sisa-sisa badai semalam masih menyisakan udara yang dingin dan
            genangan air di halaman. Pak Aris mengajak Baskara ke meja kerja
            besarnya di ruang tengah, sebuah meja yang terbuat dari potongan
            kayu jati tunggal yang sangat lebar. Ia meletakkan tiga buah batu
            koral berwarna putih yang ia ambil dari taman depan yang berlumut.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Mari kita bermain dengan kemungkinan, Bas," ujar Pak Aris, suaranya
            kini terdengar penuh semangat, seolah ia sedang menyiapkan sebuah
            pertunjukan sulap bagi seorang anak kecil. "Inilah inti dari seluruh
            hidupku di sini. Bukan sekadar menyimpan benda-benda mati, tapi
            menjaga kemungkinan-kemungkinan hidup yang bisa lahir dari mereka."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Pak Aris menjelaskan bahwa dari tiga batu ini saja, ia bisa
            menciptakan berbagai kombinasi 'paket kenangan' yang berbeda. Ia
            mulai menyusun batu-batu itu di atas permukaan meja kayu yang luas.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Lihatlah, Bas. Jika kau ingin memberikan kenangan kepada seseorang
            dari hanya tiga batu ini, kau memiliki banyak cara. Cara pertama
            adalah tidak memberi apa-apa—hanya sebuah kotak kosong, si Kotak
            Sunyi tadi. Cara kedua adalah memberi hanya batu pertama. Ketiga,
            hanya batu kedua. Keempat, hanya batu ketiga."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara, yang pikirannya mulai terbiasa dengan pola yang indah ini,
            menyambung dengan antusias, "Lalu bisa batu pertama dan kedua.
            Pertama dan ketiga. Kedua dan ketiga."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Dan kemungkinan terakhir?" tanya Pak Aris dengan mata yang
            berbinar-binar mencerminkan cahaya matahari pagi.
          </p>
        </FadeIn>
        <FadeIn>
          <p>"Ketiganya sekaligus," jawab Baskara.</p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            "Ada delapan wajah kemungkinan dari hanya tiga batu kecil," kata Pak
            Aris. "Bayangkan jika aku menambah satu batu lagi di sini. Maka
            kemungkinan itu tidak hanya bertambah satu, ia berlipat ganda
            menjadi enam belas. Jika aku menambah satu batu lagi menjadi lima,
            ia meledak menjadi tiga puluh dua. Pertumbuhannya bukan lagi seperti
            langkah manusia, melainkan seperti ledakan cahaya yang meluas ke
            segala penjuru."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Pak Aris menyapu batu-batu itu ke dalam telapak tangannya. "Itulah
            mengapa aku tidak pernah merasa bosan atau sendirian di rumah ini,
            Bas. Setiap kali aku menambahkan satu kepingan kecil ke dalam sistem
            ini—baik itu sebuah surat baru atau sebuah kancing baju yang baru
            ditemukan—aku sebenarnya sedang melahirkan ribuan skenario masa
            depan yang baru. Aku sedang menjaga semesta kuasa yang luasnya tak
            terbayangkan hanya dari beberapa kepingan sederhana. Setiap pilihan
            untuk menggabungkan atau memisahkan benda-benda ini adalah sebuah
            narasi kehidupan yang berbeda, sebuah takdir yang menunggu untuk
            dipilih."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara terdiam cukup lama. Ia menatap ubin lantai yang kusam,
            membayangkan hidupnya sebagai sebuah koleksi elemen yang kompleks.
            Setiap orang yang ia temui, setiap buku yang ia baca, setiap luka
            yang ia terima, ternyata bukan sekadar tambahan linier pada usianya.
            Mereka adalah pengganda bagi semesta kemungkinannya. Ia menyadari
            bahwa selama ini ia melihat hidupnya sebagai satu garis lurus sempit
            yang harus ia tempuh dengan penuh tekanan, padahal ia berdiri di
            tengah sebuah ledakan kemungkinan yang tak terbatas.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Ia merenung tentang bagaimana setiap tindakannya adalah sebuah
            kepingan yang menambah kompleksitas hidupnya secara eksponensial.
            Kesadaran itu datang bukan sebagai beban yang menakutkan, melainkan
            sebagai kebebasan yang membebaskan. Ego-nya yang selama ini terpaku
            pada hasil akhir yang tunggal mulai runtuh, digantikan oleh rasa
            syukur atas keluasan yang ditawarkan oleh setiap momen kecil. Ia
            bukan lagi sekadar elemen tunggal; ia adalah sebuah himpunan kuasa
            yang terus berkembang.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 pt-12">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-serif-heading text-4xl md:text-5xl text-yellow-500 mb-6">
              Ledakan Kemungkinan
            </h2>
            <p className="font-serif-body text-zinc-400 max-w-2xl mx-auto">
              Simulasi{" "}
              <MathTooltip
                term="Semesta Kuasa (Power Set)"
                math="\mathcal{P}(A) = \{B \mid B \subseteq A\}"
                explanation="Himpunan Kuasa (Power set) dari A adalah himpunan yang berisi seluruh kemungkinan subset dari A, termasuk himpunan kosong dan A itu sendiri."
              />
              . Tambahkan batu untuk melihat bagaimana kemungkinan meluas.
            </p>
          </div>
        </FadeIn>

        <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-zinc-800 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Control Panel */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="bg-black p-6 rounded-xl border border-zinc-800">
                <h3 className="font-serif-heading text-xl text-zinc-300 mb-4">
                  Elemen Dasar (A)
                </h3>

                <div className="flex flex-wrap gap-2 mb-6 min-h-[48px]">
                  <AnimatePresence>
                    {elements.length === 0 && (
                      <span className="text-zinc-600 italic">Kosong (∅)</span>
                    )}
                    {elements.map((el) => (
                      <motion.div
                        key={el}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      >
                        {el}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={removeElement}
                    disabled={elements.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-zinc-800"
                  >
                    <Minus size={16} /> Kurangi
                  </button>
                  <button
                    onClick={addElement}
                    disabled={elements.length >= MAX_ELEMENTS}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-yellow-600 hover:bg-yellow-500 text-black font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={16} /> Tambah
                  </button>
                </div>
              </div>

              <div className="bg-black p-6 rounded-xl border border-zinc-800">
                <div className="font-mono text-sm text-yellow-600 mb-2">
                  Rumus Kardinalitas:
                </div>
                <div className="text-3xl font-serif-heading text-zinc-200">
                  |
                  <MathTooltip
                    term="P(A)"
                    math="\mathcal{P}(A)"
                    explanation="Power set dari A"
                  />
                  | = 2<sup className="text-xl">n</sup>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-end">
                  <span className="text-zinc-500">Total Kemungkinan:</span>
                  <span className="text-4xl font-bold text-yellow-500">
                    {powerSetSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="w-full md:w-2/3">
              <h3 className="font-serif-heading text-xl text-zinc-300 mb-4">
                Ruang Kemungkinan P(A)
              </h3>

              {elements.length <= 4 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3"
                >
                  <AnimatePresence>
                    {subsets.map((subset, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="aspect-square bg-black border border-zinc-800 rounded-lg flex items-center justify-center p-2 relative group hover:border-yellow-600/50 transition-colors"
                      >
                        {subset.length === 0 ? (
                          <span className="text-zinc-700 font-light text-2xl">
                            ∅
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {subset.map((item) => (
                              <div
                                key={item}
                                className="w-4 h-4 rounded-full bg-zinc-400"
                              ></div>
                            ))}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <span className="font-mono text-xs text-yellow-500">
                            {subset.length === 0
                              ? "{}"
                              : `{${subset.join(",")}}`}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center bg-black border border-zinc-800 rounded-lg p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md"
                  >
                    <div className="grid grid-cols-8 gap-1 opacity-50 mb-6">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full ${i < powerSetSize ? "bg-yellow-600" : "bg-zinc-800"}`}
                        ></div>
                      ))}
                    </div>
                    <p className="font-serif-body text-zinc-400">
                      Visualisasi mendetail melampaui batas layar yang nyaman.
                      Ledakan cahaya meluas ke segala penjuru—sebanyak{" "}
                      <strong className="text-yellow-500">
                        {powerSetSize}
                      </strong>{" "}
                      kemungkinan.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConclusionSection: React.FC = () => {
  return (
    <section className="py-32 px-6 relative border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto space-y-8 text-lg leading-loose font-serif-body text-zinc-300 mb-24">
        <FadeIn>
          <p>
            Hari terakhir kunjungannya tiba dengan tenang. Baskara berdiri di
            depan pintu jati ganda, siap untuk kembali ke Jakarta. Namun kali
            ini, ia tidak membawa niat untuk menjual rumah itu atau membuang
            isinya. Ia telah berjanji pada pamannya bahwa ia akan kembali
            sebulan lagi dengan peralatan digitalnya, bukan untuk menggantikan
            peti-peti itu dengan angka-angka dingin, melainkan untuk membantu
            Pak Aris memetakan setiap hubungan dan kemungkinan yang tersimpan di
            Griya Aksara agar dunia luar bisa belajar tentang kebijaksanaan
            persemayaman ini.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Paman," panggil Baskara sebelum ia naik ke taksi yang sudah
            menunggu di ujung gang. "Berapa banyak kotak yang sebenarnya kita
            miliki di sini?"
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Ada ratusan, Bas," jawab Pak Aris sambil menyandarkan tubuhnya pada
            kusen pintu yang kokoh, tangannya masih memegang kain lap kusam.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            "Dan berapa banyak kemungkinan yang bisa kita ciptakan dari mereka
            semua?"
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-zinc-200">
            Pak Aris berhenti sejenak, menatap ke arah deretan peti yang seolah
            tak berujung di dalam kegelapan rumah yang agung itu. Ia tersenyum
            bijak, sebuah senyuman yang kini Baskara mengerti maknanya dengan
            sangat mendalam. "Angkanya mungkin melampaui jumlah bintang yang
            bisa kau hitung di langit malam, Bas. Tapi tugas kita bukan untuk
            menghitung semuanya sampai selesai hingga kita lelah. Tugas kita
            adalah menghargai setiap satu kemungkinan yang kita pilih untuk kita
            jalani hari ini dengan penuh kesadaran."
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Baskara mengangguk, merasakan sebuah ketenangan yang belum pernah ia
            rasakan sebelumnya dalam seluruh hidup dewasanya. Ia melangkah
            keluar dari Griya Aksara. Angin laut masih sama, aroma garam masih
            sama, dan kota pesisir itu masih tetap sunyi. Namun bagi Baskara,
            dunia di luar sana kini tampak berbeda secara fundamental. Ia
            melihat orang-orang yang lewat, kendaraan yang berlalu-lalang, dan
            gedung-gedung tinggi di kejauhan sebagai kumpulan sistem yang saling
            beririsan, saling merengkuh, dan masing-masing menyimpan semesta
            kuasa di dalamnya.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Ia meraba saku jaketnya dan menemukan sebuah kotak kayu kecil yang
            diselipkan Pak Aris saat ia berpamitan tadi tanpa ia sadari. Baskara
            membukanya sejenak. Kotak itu kosong.
          </p>
        </FadeIn>
        <FadeIn>
          <p>
            Ia tersenyum sendiri di dalam taksi. Ia tahu apa artinya. Kotak itu
            bukan tidak berisi apa-apa. Kotak itu berisi ruang bagi segala
            kemungkinan masa depan yang akan ia tulis mulai hari ini. Ia membawa
            pulang sebuah kekosongan yang penuh, sebuah ketiadaan yang menjadi
            bagian dari segalanya. Griya Aksara berdiri tegak di belakangnya,
            sebuah monumen kayu yang menjaga rahasia kuno bahwa di dalam
            keterbatasan satu kotak jati, terdapat semesta yang tak terhingga
            luasnya. Ia menyadari bahwa hidup bukanlah tentang apa yang kita
            miliki, melainkan tentang bagaimana kita menyadari bahwa setiap
            kepingan kecil adalah kunci menuju ribuan pintu masa depan yang baru
            saja terbuka.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <div className="w-16 h-[1px] bg-yellow-600/50 mx-auto mb-16"></div>
          <h3 className="font-serif-heading text-4xl font-bold mb-4 text-zinc-100">
            Griya Aksara
          </h3>
          <p className="text-yellow-600/80 font-serif-body text-sm tracking-widest uppercase mb-16">
            Monumen Kemungkinan Tak Terhingga
          </p>
          <div className="w-4 h-4 rounded-full bg-zinc-800 mx-auto"></div>
        </FadeIn>
      </div>
    </section>
  );
};

const Page: React.FC = () => {
  return (
    <div className="min-h-screen font-serif-body bg-black text-zinc-300 selection:bg-yellow-500/30 selection:text-yellow-200 relative">
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="fixed inset-0 grid-bg-dark pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeroSection />
        <SubsetSection />
        <ExtensionalitySection />
        <EmptySetSection />
        <PowerSetPlayground />
        <ConclusionSection />
      </div>
    </div>
  );
};

export default Page;
