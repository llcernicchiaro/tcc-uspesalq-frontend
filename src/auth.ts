import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Cognito from "next-auth/providers/cognito";

declare module "next-auth" {
  interface DefaultSession {
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
      checks: ["nonce", "pkce"],
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, account }) {
      if (account?.provider === "cognito") {
        return { ...token, accessToken: account.id_token };
      }
      return { ...token };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
