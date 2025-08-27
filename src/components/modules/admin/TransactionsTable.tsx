import { TableLoader } from "@/components/loaders/TableLoader";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { transactionStatus, transactionTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { getTransactionType } from "@/utils/getTransactionType";
import { format } from "date-fns";
import { CalendarIcon, EllipsisIcon, FilterX, Search } from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";

export default function TransactionTable() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { data, isLoading } = useGetAllTransactionsQuery({
    phone: searchInput,
    type: selectedType === "all" ? "" : selectedType,
    status: selectedStatus === "all" ? "" : selectedStatus,
    ...date,
    limit,
    page: currentPage,
  });
  const transactionTypeOptions = [
    { value: "all", label: "All" },
    ...transactionTypes,
  ];
  const transactionStatuseOptions = [
    { value: "all", label: "All" },
    ...transactionStatus,
  ];
  const handleFilterType = (value: string) => {
    setSelectedType(value);
  };
  const handleFilterStatus = (value: string) => {
    setSelectedStatus(value);
  };
  const handleClear = () => {
    setSelectedType("all");
    setSelectedStatus("all");
    setSearchInput("");
    form.reset();
    setDate(undefined);
  };
  const totalPage = data?.meta?.totalPages || 1;
  const totalRecord = data?.meta?.total || 0;
  const form = useForm({
    defaultValues: {
      phone: "",
    },
  });
  const handleSearch: SubmitHandler<FieldValues> = async (data) => {
    setSearchInput(data.phone);
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Transaction Filters</CardTitle>
          <CardDescription>
            Filter transactions by phone, date, type, or status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)}>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          className="pe-9 w-full rounded-lg border-[var(--border)] bg-[var(--background)]"
                          placeholder="Search by phone"
                        />
                        <button
                          type="submit"
                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-colors hover:bg-[var(--accent)]"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    )}
                  />
                </form>
              </Form>
            </div>

            {/* Date Range Picker */}
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-lg border-[var(--border)] bg-[var(--background)] font-normal",
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
            </div>

            {/* Type Filter */}
            <div className="flex-1">
              <Select onValueChange={handleFilterType} value={selectedType}>
                <SelectTrigger className="w-full rounded-lg border-[var(--border)] bg-[var(--background)]">
                  <SelectValue placeholder="Select type" />
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
            </div>

            {/* Status Filter */}
            <div className="flex-1">
              <Select onValueChange={handleFilterStatus} value={selectedStatus}>
                <SelectTrigger className="w-full rounded-lg border-[var(--border)] bg-[var(--background)]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transaction Status</SelectLabel>
                    {transactionStatuseOptions.map(
                      (item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Button */}
            <div className="flex items-end">
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
        </CardContent>
      </Card>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing{" "}
          <span className="font-medium text-[var(--foreground)]">
            {data?.data.length || 0}
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
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm overflow-hidden px-3">
          <Table>
            <TableHeader className="bg-[var(--muted)]">
              <TableRow>
                <TableHead className="font-semibold">Sender</TableHead>
                <TableHead className="font-semibold">Receiver</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="w-10"></TableHead>
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
                    <TableCell className="text-[var(--muted-foreground)]">
                      {format(new Date(item.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-[var(--accent)]"
                          >
                            <EllipsisIcon size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/transactions/${item._id}`}>
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && data?.data.length === 0 && (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-[var(--muted)] p-4 mb-4">
              <Search className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium mb-1">No transactions found</h3>
            <p className="text-[var(--muted-foreground)] text-center max-w-md">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            <Button onClick={handleClear} variant="outline" className="mt-4">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
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
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      onClick={() => setCurrentPage(page)}
                      key={page}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
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
  );
}
