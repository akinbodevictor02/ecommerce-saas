import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) {
    redirect("/");
  }

  // ❌ Not admin
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}