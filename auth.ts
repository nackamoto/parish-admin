import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    // let's set the expiration to 24 hours after the user logs in
    maxAge: 24 * 60 * 60,
  },
});
