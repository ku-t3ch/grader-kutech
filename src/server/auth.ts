import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "./db";
import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    isAdmin: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      const isAdmin = await db.admin.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (isAdmin === null) {
        return {
          ...token,
        };
      }

      return {
        ...token,
        isAdmin: isAdmin.email === token.email,
      };
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
