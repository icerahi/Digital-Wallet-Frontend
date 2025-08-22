import { Wallet } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex justify-start items-start">
      <Wallet className="text-primary-foreground  " />
      <h1 className="text-2xl font-extrabold text-primary-foreground">
        {" "}
        BONDHU PAY
      </h1>
    </div>
  );
};
