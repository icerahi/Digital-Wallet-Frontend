import { Logo } from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { X } from "lucide-react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div>
      <div className="flex justify-around items-center py-6 ">
        <Logo />
        <div className="hover:bg-muted p-3 rounded-full cursor-pointer font-light">
          <Link to="/">
            {" "}
            <X size={40} />
          </Link>
        </div>
      </div>
      <hr />
      <div className="bg-background flex min-h-svh flex-col items-center justify-start gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
