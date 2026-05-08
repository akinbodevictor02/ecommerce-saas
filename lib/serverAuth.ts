import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ ADMIN ONLY
export async function requireAdminAPI() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return session;
}

// ✅ ANY LOGGED-IN USER
export async function requireUserAPI() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session;
}