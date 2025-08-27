import RecentTransaction from "@/components/modules/myWallet/RecentTransaction";
import { Button } from "@/components/ui/button";
import { role } from "@/constants";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Avatar } from "@radix-ui/react-avatar";
import { BanknoteArrowUp, Ellipsis, Forward, SquarePlus } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function MyWallet() {
  const { data, isLoading } = useMyWalletQuery(undefined);

  const handleMore = () => {
    toast.info("Hang tight, more is on the way 🚀");
  };

  return (
    <div className="container w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[40vh] p-5">
        <div className="grid items-baseline gap-6 md:col-span-2">
          <div className="flex items-center gap-3">
            <Avatar className="p-5 bg-muted w-15 h-15 text-center rounded-full">
              B
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">BDT Balance</h2>
              <p className="text-muted-foreground font-semibold">
                {data?.data?.owner?.phone}
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-center md:items-center md:h-1/2">
            <h1 className="text-6xl text-center balance">
              {data?.data?.balance} Taka
            </h1>
          </div>
        </div>
        <div className="col-span-3 content-end md:content-end   ">
          {data?.data?.owner?.role === role.user ? (
            <div className="flex justify-center  gap-7">
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15 addMoney">
                  <Link to="/my-wallet/deposit">
                    {" "}
                    <SquarePlus className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Deposit</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15 withdrawMoney">
                  <Link to="/my-wallet/withdraw">
                    {" "}
                    <BanknoteArrowUp className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Withdraw</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15 sendMoney">
                  <Link to="/my-wallet/sendmoney">
                    {" "}
                    <Forward className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium"> Send</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center  gap-7">
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15 cashin">
                  <Link to="/my-wallet/cashin">
                    {" "}
                    <SquarePlus className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Cash In</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15 cashout">
                  <Link to="/my-wallet/cashout">
                    {" "}
                    <Forward className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium"> Cash Out</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button onClick={handleMore} className="size-15">
                  <Ellipsis className="size-7" />
                </Button>
                <p className="text-sm font-medium"> More</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="recentTransactions">
          <RecentTransaction user={data?.data?.owner} />
        </div>
      </div>
    </div>
  );
}
