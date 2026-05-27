type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-0 transition focus:border-slate-400 ${className}`}
      {...props}
    />
  );
}
