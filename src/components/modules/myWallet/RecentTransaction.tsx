import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
const invoices = [
  {
    name: "Imran",
    phone: "01726744303",
    type: "SEND MONEY",
    status: "COMPLETED",
    amount: 10,
    date: "12 Apr, 2023",
  },
  {
    name: "Imran",
    phone: "01726744303",
    type: "SEND MONEY",
    status: "COMPLETED",
    amount: 10,
    date: "12 Apr, 2023",
  },
  {
    name: "Imran",
    phone: "01726744303",
    type: "SEND MONEY",
    status: "COMPLETED",
    amount: 10,
    date: "12 Apr, 2023",
  },
  {
    name: "Imran",
    phone: "01726744303",
    type: "SEND MONEY",
    status: "COMPLETED",
    amount: 10,
    date: "12 Apr, 2023",
  },
  {
    name: "Imran",
    phone: "01726744303",
    type: "SEND MONEY",
    status: "COMPLETED",
    amount: 10,
    date: "12 Apr, 2023",
  },
];
export default function RecentTransaction() {
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
        {data?.data.map((item: any) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">
              {item.sender.fullname}
            </TableCell>
            <TableCell className="font-medium">{item.sender.phone}</TableCell>
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
