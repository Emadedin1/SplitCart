export function Card({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {title ? <h2 className="text-xl font-semibold text-slate-900">{title}</h2> : null}
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
