import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { role } from "@/constants/role";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import type { TRole, TTransactionType } from "@/types";

type TransactionInfo = {
  source?: "sender" | "receiver";
  balancePrefix?: "+" | "-";
};

const getInfo = (type: TTransactionType, userRole: TRole): TransactionInfo => {
  if (userRole === role.user) {
    switch (type) {
      case "ADD_MONEY":
      case "CASH_IN":
        return { source: "sender", balancePrefix: "+" };

      case "WITHDRAW_MONEY":
      case "SEND_MONEY":
      case "CASH_OUT":
        return { source: "receiver", balancePrefix: "-" };

      default:
        return {};
    }
  }

  if (userRole === role.agent) {
    switch (type) {
      case "CASH_IN":
        return { source: "receiver", balancePrefix: "-" };

      case "CASH_OUT":
        return { source: "sender", balancePrefix: "+" };

      default:
        return {};
    }
  }
  return {};
};

export default function TransactionTable({
  user,
}: {
  user: Record<string, string>;
}) {
  const { data } = useMyTransactionQuery(undefined);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((item: any, index: number) => {
          const info = getInfo(
            item.type as TTransactionType,
            user?.role as TRole
          );

          console.log(info, user?.role, item);
          return (
            <TableRow key={index}>
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
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">
                {info.balancePrefix || ""}
                {item.amount}
              </TableCell>
              <TableCell className="text-right">
                {new Date(item.createdAt).toDateString()}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
