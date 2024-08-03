import { signOut } from "@/actions/signOut";

export function SignOut() {
  return (
    <form action={signOut}>
      <button type="submit">Sign out</button>
    </form>
  );
}
