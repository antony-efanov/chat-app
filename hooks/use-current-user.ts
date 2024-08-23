import { useSession } from "next-auth/react";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export const useCurrentUser = (): SessionUser | null => {
  const { data: session } = useSession();

  const user = session?.user as SessionUser;

  return user ?? {};
};
