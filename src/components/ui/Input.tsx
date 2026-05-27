type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  );
}
