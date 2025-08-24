import RecentTransaction from "@/components/modules/myWallet/RecentTransaction";
import { Button } from "@/components/ui/button";
import { role } from "@/constants/role";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Avatar } from "@radix-ui/react-avatar";
import { BanknoteArrowUp, Ellipsis, Forward, SquarePlus } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function MyWallet() {
  const { data } = useMyWalletQuery(undefined);
  console.log(data?.data?.owner?.role);

  const handleMore = () => {
    toast.info("Hang tight, more is on the way 🚀");
  };
  return (
    <div className="container w-full">
      <div className="grid grid-cols-5 min-h-[40vh] p-5">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <Avatar className="p-5 bg-muted w-15 h-15 text-center rounded-full">
              B
            </Avatar>
            <div>
              {" "}
              <h2 className="text-2xl font-bold">BDT Balance</h2>
              <p className="text-muted-foreground font-semibold">
                {data?.data?.owner?.phone}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center h-1/2">
            <h1 className="text-6xl">{data?.data?.balance} Taka</h1>
          </div>
        </div>
        <div className="col-span-3 content-end  ">
          {data?.data?.owner?.role === role.user ? (
            <div className="flex justify-center  gap-7">
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15">
                  <Link to="/my-wallet/deposit">
                    {" "}
                    <SquarePlus className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Deposit</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15">
                  <Link to="/my-wallet/withdraw">
                    {" "}
                    <BanknoteArrowUp className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Withdraw</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15">
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
                <Button asChild className="size-15">
                  <Link to="/my-wallet/cashin">
                    {" "}
                    <SquarePlus className="size-7" />
                  </Link>
                </Button>
                <p className="text-sm font-medium">Cash In</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button asChild className="size-15">
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
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-muted-foreground">
            Recent Transactions
          </h3>
          <Button variant="link">See All</Button>
        </div>
        <div className="flex justify-between gap-3 mt-3 mx-7">
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
}
