import { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./next-auth";
import { AdapterUser } from "next-auth/adapters";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const res: LoginResponse = await authLogin(credentials);

        if (!res) return null;
        const user = { ...res.user, ...res.tokens, ...res };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") return { ...token, ...session.user };
      if (user) {
        token = { ...token, ...user };
      }
      return Promise.resolve(token);
    },
    async session({ token, session }) {
      session.user = { ...session.user, ...token } as AdapterUser &
        LoginResponse &
        User;
      return session;
    },
  },
  pages: {
    signOut: "/login",
    error: "/error",
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

async function authLogin(credentials: Record<string, unknown>) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
