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
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const jwtPayload = JSON.parse(
          Buffer.from(account.id_token.split(".")[1], "base64").toString()
        );
        console.log("ID Token payload:", jwtPayload);
        token.groups = (jwtPayload["cognito:groups"] as string[]) || [];
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub || "";
      const groups = (token.groups as string[]) || [];

      if (groups.includes("admin")) {
        session.user.role = "admin";
      } else if (groups.includes("participant")) {
        session.user.role = "participant";
      } else {
        session.user.role = "unknown";
      }

      return session;
    },
  },
});
