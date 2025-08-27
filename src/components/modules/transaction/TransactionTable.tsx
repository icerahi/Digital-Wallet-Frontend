import { TableLoader } from "@/components/loaders/TableLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useGetMeQuery } from "@/redux/features/user/user.api";
import type { TRole, TTransactionType } from "@/types";
import { format } from "date-fns";
import {
  ArrowRightLeft,
  CalendarIcon,
  CheckCircle,
  Clock,
  FilterX,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

type TransactionInfo = {
  source?: "sender" | "receiver";
  balancePrefix?: "+" | "-";
};

const getInfo = (type: TTransactionType, userRole: TRole): TransactionInfo => {
  switch (type) {
    case "ADD_MONEY":
      if (userRole === role.user) {
        return { source: "sender", balancePrefix: "+" };
      } else {
        return { source: "receiver", balancePrefix: "-" };
      }

    case "CASH_IN":
      if (userRole === role.user) {
        return { source: "sender", balancePrefix: "+" };
      } else {
        return { source: "receiver", balancePrefix: "-" };
      }
    case "WITHDRAW_MONEY":
      if (userRole === role.user) {
        return { source: "receiver", balancePrefix: "-" };
      } else {
        return { source: "sender", balancePrefix: "+" };
      }
    case "SEND_MONEY":
      return { source: "sender", balancePrefix: "-" };

    case "CASH_OUT":
      if (userRole === role.user) {
        return { source: "receiver", balancePrefix: "-" };
      } else {
        return { source: "sender", balancePrefix: "+" };
      }
    default:
      return {};
  }
};

export default function TransactionTable() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedType, setSelectedType] = useState("all");

  const { data, isLoading } = useMyTransactionQuery({
    type: selectedType === "all" ? "" : selectedType,
    ...date,
    limit,
    page: currentPage,
  });

  const { data: getMe } = useGetMeQuery(undefined);

  const transactionTypeOptions = [
    { value: "all", label: "All" },
    ...transactionTypes,
  ];
  const handleFilterChange = (value: string) => {
    setSelectedType(value);
  };
  const handleClear = () => {
    setSelectedType("all");
    setDate(undefined);
  };
  const totalPage = data?.meta?.totalPages || 1;
  const totalRecord = data?.meta?.total || 0;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
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
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-[var(--primary)]" />
          Transaction History
        </CardTitle>
        <CardDescription>
          View and filter your transaction history
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Filter by:
            </span>

            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[300px] justify-start text-left font-normal rounded-lg border-[var(--border)] bg-[var(--background)]",
                    !date && "text-[var(--muted-foreground)]"
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
                    <span>Select date range</span>
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

            {/* Transaction Type Filter */}
            <Select onValueChange={handleFilterChange} value={selectedType}>
              <SelectTrigger className="w-full md:w-[180px] rounded-lg border-[var(--border)] bg-[var(--background)]">
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transaction Type</SelectLabel>
                  {transactionTypeOptions.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Clear Button */}
            <Button
              onClick={handleClear}
              variant="outline"
              className="rounded-lg border-[var(--border)] bg-[var(--background)]"
            >
              <FilterX className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted-foreground)]">
            Showing{" "}
            <span className="font-medium text-[var(--foreground)]">
              {data?.data?.length || 0}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[var(--foreground)]">
              {totalRecord}
            </span>{" "}
            records
          </p>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <TableLoader />
        ) : (
          <div className="rounded-md border border-[var(--border)] overflow-hidden">
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
                    item.type as TTransactionType,
                    getMe?.data?.role
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
                          <span>{item?.type}</span>
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
                          {info.balancePrefix || ""}
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

            {data?.data?.length === 0 && !isLoading && (
              <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-[var(--muted)] p-4 mb-4">
                    <ArrowRightLeft className="h-8 w-8 text-[var(--muted-foreground)]" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    No transactions found
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-center max-w-md">
                    Try adjusting your filters to see your transaction history.
                  </p>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--muted-foreground)]">
            Page{" "}
            <span className="font-medium text-[var(--foreground)]">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[var(--foreground)]">
              {totalPage}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {totalPage > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: totalPage },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationItem
                      onClick={() => setCurrentPage(page)}
                      key={page}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className={
                        currentPage === totalPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--muted-foreground)]">
                Rows:
              </span>
              <Select
                value={String(limit)}
                onValueChange={(value) => setLimit(Number(value))}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 25, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize} / page
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
