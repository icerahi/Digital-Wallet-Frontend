import { Logo } from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-around items-center py-6 ">
        <Logo />
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          size="lg"
          className="hover:bg-muted cursor-pointer rounded-full"
        >
          <span className="text-2xl">X</span>
        </Button>
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
