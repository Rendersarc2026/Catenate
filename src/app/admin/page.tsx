import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <h1 className="text-2xl font-medium tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/50">{session.email}</span>
            {/* Add logout button functionality later */}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-sm border border-white/10 bg-[#0a0a0a] p-6">
            <h2 className="text-[11px] font-medium tracking-wider text-white/40 uppercase">
              Total Enquiries
            </h2>
            <p className="mt-2 text-3xl font-light">0</p>
          </div>
          <div className="rounded-sm border border-white/10 bg-[#0a0a0a] p-6">
            <h2 className="text-[11px] font-medium tracking-wider text-white/40 uppercase">
              Active Projects
            </h2>
            <p className="mt-2 text-3xl font-light">0</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-medium">Recent Activity</h2>
          <div className="rounded-sm border border-white/10 bg-[#0a0a0a] p-8 text-center text-sm text-white/40">
            No recent activity to show.
          </div>
        </div>
      </div>
    </div>
  );
}
