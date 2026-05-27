import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Keep your account details simple.</h1>
      </div>
      <Card title="Profile" subtitle="This demo project stores data in local storage for quick portfolio use.">
        <p className="text-sm text-slate-600">Email: demo.user@example.com</p>
        <button className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Log out</button>
      </Card>
    </AppShell>
  );
}
