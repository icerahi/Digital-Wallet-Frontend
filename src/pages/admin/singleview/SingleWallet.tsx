import { Button } from "@/components/ui/button";
import { useGetSingleWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate, useParams } from "react-router";

export default function SingleWallet() {
  const { id } = useParams();
  const { data } = useGetSingleWalletQuery(id);
  const navigate = useNavigate();
  return (
    <section className="py-10">
      <Button
        onClick={() => navigate(-1)}
        className="font-semibold text-2xl mb-10 cursor-pointer"
        variant="link"
      >
        Back
      </Button>
      <div className="container px-0 md:px-8">
        <h1 className=" px-4 text-3xl font-semibold md:mb-14 md:text-4xl text-center">
          Wallet Details
        </h1>
        <Separator />

        <div className="w-[50vw] mx-auto flex justify-between">
          <div>
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Owner Fullname</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.owner?.fullname}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Phone Number</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.owner?.phone}
                </p>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Balance</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.balance}
                </p>
              </div>
            </div>
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Role</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.owner?.role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-3 items-center">
            <div>
              {" "}
              <p className="">Status</p>
              <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                {data?.data?.isBlocked ? "Blocked" : "Unblocked"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
