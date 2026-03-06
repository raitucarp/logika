import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen min-h-screen bg-black text-gray-200 relative selection:bg-yellow-900/50 selection:text-yellow-200 overflow-x-hidden">
      <main className="flex flex-col items-center gap-2 font-bold text-5xl tracking-tighter">
        <div>
          <span className="text-white">Ribhararnus</span>
          <span className="text-yellow-400">{`<Pracutiar>`}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-white">Logika</span>
        </div>
      </main>
    </div>
  );
}
