import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-tea-light to-white">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-tea-dark">404</h1>
        <h2 className="text-3xl font-semibold text-tea-accent">
          Pagina non trovata
        </h2>
        <p className="text-tea-dark">
          La pagina che stai cercando non esiste.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-tea-dark text-white rounded-lg font-semibold hover:bg-tea-accent transition-colors"
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
