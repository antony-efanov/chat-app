import { signInGoogle } from "@/actions/signInWithGoogle";

export function SignIn() {
  return (
    <form action={signInGoogle}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
