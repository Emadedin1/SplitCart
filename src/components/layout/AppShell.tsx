import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#f8fafc_100%)] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">SplitCart</Link>
          <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-sm text-slate-600">
            <Link href="/dashboard" className="rounded-full px-3 py-1.5 hover:bg-white hover:text-slate-900">Dashboard</Link>
            <Link href="/carts" className="rounded-full px-3 py-1.5 hover:bg-white hover:text-slate-900">Carts</Link>
            <Link href="/settings" className="rounded-full px-3 py-1.5 hover:bg-white hover:text-slate-900">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col px-6 py-8">{children}</main>
    </div>
  );
}
