import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSingleTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useNavigate, useParams } from "react-router";

export default function SingleTransaction() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTransactionQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading transaction...</p>
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
          Transaction Details
        </h1>
        <Separator className="mb-8" />

        {/* Transaction Card */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="divide-y">
            {/* Transaction Type */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction Type
                </p>
                <p className="text-lg font-medium">{data?.data?.type}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-lg font-medium">{data?.data?.amount}</p>
              </div>
            </div>

            {/* Sender & Receiver */}
            <div className="grid gap-8 py-6 sm:grid-cols-2">
              {/* Sender */}
              <div>
                <h2 className="mb-3 border-b pb-2 text-lg font-semibold">
                  Sender Details
                </h2>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="mb-3 text-base font-medium">
                  {data?.data?.sender?.fullname}
                </p>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base font-medium">
                  {data?.data?.sender?.phone}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({data?.data?.sender?.role})
                  </span>
                </p>
              </div>

              {/* Receiver */}
              <div>
                <h2 className="mb-3 border-b pb-2 text-lg font-semibold">
                  Receiver Details
                </h2>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="mb-3 text-base font-medium">
                  {data?.data?.receiver?.fullname}
                </p>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base font-medium">
                  {data?.data?.receiver?.phone}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({data?.data?.receiver?.role})
                  </span>
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction Time
                </p>
                <p className="text-lg font-medium">
                  {new Date(data?.data?.createdAt).toDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
