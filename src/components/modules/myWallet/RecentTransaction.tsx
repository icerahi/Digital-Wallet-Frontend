import { TableLoader } from "@/components/loaders/TableLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import type { TRole, TTransactionType } from "@/types";
import { getInfo } from "@/utils/getInfo";
import {
  AlertCircle,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";

export default function RecentTransaction({
  user,
}: {
  user: Record<string, string>;
}) {
  const { data, isLoading } = useMyTransactionQuery({ limit: 5 });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    return (
      <Badge
        variant="outline"
        className={cn(
          "capitalize",
          statusLower === "completed" &&
            "border-green-500 text-green-700 dark:border-green-500/50 dark:text-green-400",
          statusLower === "pending" &&
            "border-yellow-500 text-yellow-700 dark:border-yellow-500/50 dark:text-yellow-400",
          statusLower === "failed" &&
            "border-red-500 text-red-700 dark:border-red-500/50 dark:text-red-400"
        )}
      >
        {status}
      </Badge>
    );
  };

  return (
    <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="flex items-center  gap-2">
            <ArrowRightLeft className="h-5 w-5 text-[var(--primary)]" />
            Recent Transactions
          </CardTitle>
          <CardDescription>Your latest 5 transactions</CardDescription>
        </div>
        <Button variant="link">
          <Link to="/my-wallet/transactions">See All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableLoader />
        ) : (
          <div className="rounded-md border border-[var(--border)]">
            <Table>
              <TableHeader className="bg-[var(--muted)]">
                <TableRow>
                  <TableHead className="w-[120px] font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((item: any, index: number) => {
                  const info = getInfo(
                    item?.type as TTransactionType,
                    user?.role as TRole
                  );

                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-[var(--accent)] transition-colors"
                    >
                      <TableCell className="font-medium">
                        {info.source
                          ? item[info.source]?.fullname || "Unknown"
                          : "Unknown"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {info.source
                          ? item[info.source]?.phone || "Unknown"
                          : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span
                          className={cn(
                            "inline-flex items-center",
                            info.balancePrefix === "+" && "text-green-600",
                            info.balancePrefix === "-" && "text-red-600"
                          )}
                        >
                          {info.balancePrefix || ""}{" "}
                          {Number(item.amount).toFixed(2)} BDT
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-[var(--muted-foreground)]">
                        {new Date(item.createdAt).toLocaleDateString("en-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {!isLoading && data?.data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-[var(--muted)] p-4 mb-4">
              <ArrowRightLeft className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium mb-1">No transactions found</h3>
            <p className="text-[var(--muted-foreground)] text-center max-w-md">
              You haven't made any transactions yet. Start using Bondhu Pay to
              see your transaction history here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
