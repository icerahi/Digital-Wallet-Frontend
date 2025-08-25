import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { role, transactionTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { useMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import type { TRole, TTransactionType } from "@/types";
import { getTransactionType } from "@/utils/getTransactionType";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

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
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });
  const [selectedType, setSelectedType] = useState("all");

  const { data } = useMyTransactionQuery({
    type: selectedType === "all" ? "" : selectedType,
  });

  const transactionTypeOptions = [
    { value: "all", label: "All" },
    ...transactionTypes,
  ];

  const handleFilterChange = (value: string) => {
    setSelectedType(value);
  };

  console.log(console.log(date));
  return (
    <div>
      <div className="flex items-center justify-between items-center py-4">
        <Input
          placeholder="Filter emails..."
          value=""
          onChange={() => {}}
          className="max-w-sm"
        />
        <div className="flex gap-3 items-center">
          <label className="font-normal text-muted-foreground">Filter by</label>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger className="rounded-md" asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  autoFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex">
            {/* <Label className="mb-2">Filter</Label> */}
            <Select
              onValueChange={handleFilterChange}
              value={selectedType}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tranaction type</SelectLabel>
                  {transactionTypeOptions?.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item?.value}>
                        {item?.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <p className="text-sm font-medium border-b">Showing 0 of 100 records</p>
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
                <TableCell>{getTransactionType(item.type)?.label}</TableCell>
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
      {data?.data.length === 0 && (
        <p className="text-center my-20">Not transaction record found!</p>
      )}
    </div>
  );
}
