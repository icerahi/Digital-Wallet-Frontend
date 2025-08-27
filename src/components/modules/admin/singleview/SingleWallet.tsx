import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSingleWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useNavigate, useParams } from "react-router";

export default function SingleWallet() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleWalletQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading wallet details...</p>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container px-4 md:px-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          className="mb-6 text-lg font-semibold md:mb-10"
          variant="link"
        >
          ← Back
        </Button>

        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-4xl">
          Wallet Details
        </h1>
        <Separator className="mb-8" />

        {/* Wallet Card */}
        <Card className="mx-auto max-w-3xl">
          <CardContent className="divide-y">
            {/* Owner Fullname */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Owner Fullname</p>
                <p className="text-lg font-medium">
                  {data?.data?.owner?.fullname}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-lg font-medium">
                  {data?.data?.owner?.phone}
                </p>
              </div>
            </div>

            {/* Balance */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-lg font-medium">{data?.data?.balance}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-lg font-medium">{data?.data?.owner?.role}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p
                  className={`text-lg font-medium ${
                    data?.data?.isBlocked ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {data?.data?.isBlocked ? "Blocked" : "Unblocked"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
