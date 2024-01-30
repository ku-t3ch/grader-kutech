import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "./db";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      console.log(session);
      return session;
    },
    jwt: ({ token, user }) => {
      console.log(token);
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile?.email?.endsWith("@ku.th")) {
        throw new Error("Invalid email");
      }

      const existingUser = await db.user.findUnique({
        where: { email: profile.email },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      await db.user.update({
        where: { email: profile.email },
        data: {
          name: profile.name,
          email: profile.email,
          image: profile.image,
        },
      });
      return true;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
export const getServerAuthSession = () => getServerSession(authOptions);
