import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: ExtendedUser["role"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: ExtendedUser["role"];
  }
}
