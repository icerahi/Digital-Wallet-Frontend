import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";

const getInfo = (type: any) => {
  switch (type) {
    case "ADD_MONEY":
      return "sender";

    case "WITHDRAW_MONEY":
      return "receiver";

    case "SEND_MONEY":
      return "receiver";

    case "CASH_OUT":
      return "sender";

    case "CASH_IN":
      return "receiver";

    default:
      return "Unknown";
  }
};

export default function RecentTransaction() {
  const { data } = useMyTransactionQuery({ limit: 5 });
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
        {data?.data.map((item: any) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">
              {item[getInfo(item.type)]?.fullname || "Unknown"}
            </TableCell>
            <TableCell className="font-medium">
              {item[getInfo(item.type)]?.phone || "Unknown"}
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
            <TableCell className="text-right">
              {new Date(item.createdAt).toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
