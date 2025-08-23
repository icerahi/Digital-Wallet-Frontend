import RecentTransaction from "@/components/modules/myWallet/RecentTransaction";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";

export default function MyWallet() {
  console.log("My wallet");
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
              <p className="text-muted-foreground font-semibold">01726744303</p>
            </div>
          </div>

          <div className="flex justify-center items-center h-1/2">
            <h1 className="text-6xl">40 Taka</h1>
          </div>
        </div>
        <div className="col-span-3 content-end  ">
          <div className="flex justify-center  gap-6">
            <div>
              <Button className="size-15">+</Button>
              <p>Deposit</p>
            </div>
            <div>
              <Button className="size-15">+</Button>
              <p>Withdraw</p>
            </div>
            <div>
              <Button className="size-15">+</Button>
              <p>Send Money</p>
            </div>
            <div>
              <Button className="size-15">+</Button>
              <p>Deposit</p>
            </div>
          </div>
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
