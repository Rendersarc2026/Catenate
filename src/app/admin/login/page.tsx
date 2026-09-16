"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to login");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-4 text-white">
      <div className="w-full max-w-[400px] rounded-sm border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-medium tracking-tight text-white">
            Catenate Admin
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Sign in to access the dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-sm bg-red-500/10 p-3 text-center text-[13px] text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-medium tracking-wider text-white/40 uppercase"
            >
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-white/15 bg-transparent pb-2 text-[14px] text-white transition-colors focus:border-white focus:outline-none"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[11px] font-medium tracking-wider text-white/40 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-white/15 bg-transparent pb-2 text-[14px] text-white transition-colors focus:border-white focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex h-11 w-full items-center justify-center bg-white text-[13.5px] font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
