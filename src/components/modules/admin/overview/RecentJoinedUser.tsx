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
import { role } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetAllWalletsQuery } from "@/redux/features/wallet/wallet.api";
import { Wallet } from "lucide-react";

const RecentJoinedUser = () => {
  const { data, isLoading } = useGetAllWalletsQuery({ limit: 5 });
  return (
    <div>
      {isLoading ? (
        <TableLoader />
      ) : (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm overflow-hidden px-3">
          <CardTitle className="">Recent Joined</CardTitle>
          <Table>
            <TableHeader className="bg-[var(--muted)]">
              <TableRow>
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  className="hover:bg-[var(--accent)] transition-colors"
                >
                  <TableCell className="font-medium">
                    {item?.owner?.fullname}
                  </TableCell>
                  <TableCell>{item?.owner?.phone}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item?.owner?.role === role.user
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      )}
                    >
                      {item?.owner?.role === role.user ? "User" : "Agent"}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4 text-[var(--primary)]" />
                      {item?.balance} {item?.currency || "BDT"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};
export default RecentJoinedUser;
