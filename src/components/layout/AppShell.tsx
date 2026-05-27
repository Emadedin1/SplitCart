import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">SplitCart</Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link href="/carts" className="hover:text-slate-900">Carts</Link>
            <Link href="/settings" className="hover:text-slate-900">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col px-6 py-8">{children}</main>
    </div>
  );
}
