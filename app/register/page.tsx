"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Registration failed");
      return;
    }

    toast.success("Account created!");

    router.push("/login");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-glow flex items-center justify-center px-6">
        <div className="card w-full max-w-md p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2">
              Start shopping in seconds
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}