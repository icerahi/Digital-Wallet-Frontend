import { TableLoader } from "@/components/loaders/TableLoader";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { getTransactionType } from "@/utils/getTransactionType";

const RecentTransaction = () => {
  const { data, isLoading } = useGetAllTransactionsQuery({ limit: 5 });
  return (
    <div>
      {/* Table Section */}
      {isLoading ? (
        <TableLoader />
      ) : (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm overflow-hidden px-3">
          <CardTitle>Recent Transactions</CardTitle>
          <Table>
            <TableHeader className="bg-[var(--muted)]">
              <TableRow>
                <TableHead className="font-semibold">Sender</TableHead>
                <TableHead className="font-semibold">Receiver</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item: any, index: number) => {
                const typeInfo = getTransactionType(item.type);
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-[var(--accent)] transition-colors"
                  >
                    <TableCell className="font-medium">
                      {item?.sender?.phone}
                    </TableCell>
                    <TableCell>{item?.receiver?.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center">{typeInfo?.label}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.amount} {item.currency || "BDT"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          item.status === "completed" &&
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                          item.status === "pending" &&
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                          item.status === "failed" &&
                            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        )}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};
export default RecentTransaction;
