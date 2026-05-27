type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-700"
      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
