import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050b1a] to-[#0a162b] text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#0f1c33]/80 backdrop-blur-md border border-[#1f2a44] rounded-2xl p-8 shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-[lab(71_-3.17_-35.65)]">
          Posts App
        </h1>
        <p className="text-gray-400 mb-6">
          Aplicación construida con enfoque en rendimiento y experiencia de
          usuario, que permite crear, visualizar y gestionar publicaciones de
          manera eficiente en una interfaz moderna.
        </p>

        <Link
          href="/listado"
          className="inline-block px-6 py-3 rounded-full bg-[lab(71_-3.17_-35.65)] text-black font-medium hover:opacity-90 transition shadow-lg"
        >
          Ver listado
        </Link>
      </div>
      <div className="mt-10 text-center max-w-md">
        <p className="text-m text-gray-400">
          Construido por <span className="text-[lab(71_-3.17_-35.65)]">Alexander Rincon</span> con ❤️
        </p>

        <p className="text-m text-gray-500 mt-3 italic">
          “Cualquier tecnología lo suficientemente avanzada es indistinguible de la magia”
        </p>
        <p className="text-xs text-gray-600 mt-1">
          — Arthur C. Clarke
        </p>
      </div>
    </main>
  );
}