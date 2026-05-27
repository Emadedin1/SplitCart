type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
      : variant === "danger"
        ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
