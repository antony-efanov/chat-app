import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export const useCurrentUser = (): User => {
  const session = useSession();

  return session.data.user ?? {};
};
