import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
	const user = await prisma.user.findUnique({
  		where: { email: credentials.email },
        });
        if (user && user.password && await compare(credentials.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string | undefined;
    	session.user.userType = token.userType as string | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}); 