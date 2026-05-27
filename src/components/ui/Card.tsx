export function Card({ title, subtitle, children, className = "" }: { title?: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 ${className}`}>
      {title ? <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2> : null}
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
