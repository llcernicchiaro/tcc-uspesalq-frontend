import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DefaultSession } from "next-auth";

// Extend the User type to include the role property
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});
