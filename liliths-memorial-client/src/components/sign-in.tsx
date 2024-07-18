
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("authentik")
      }}
    >
      <button type="submit">Signin with Authentik</button>
    </form>
  )
} 