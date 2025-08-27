import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CalendarIcon, EllipsisIcon, Search } from "lucide-react";
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

  const { data } = useGetAllTransactionsQuery({
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
    <div>
      <div className="flex items-center justify-start gap-3 py-4">
        <div className="relative">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="grid gap-y-4"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      className="pe-9 w-[300px]"
                      placeholder="Search by phone"
                    />
                    <button
                      type="submit"
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Subscribe"
                    >
                      <Search size={16} aria-hidden="true" />
                    </button>
                  </div>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="flex gap-3 items-center">
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
                    <span>Start Date - End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-1 text-center" align="start">
                <Calendar
                  autoFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
                <span className="text-sm text-center  text-muted-foreground">
                  Double Click to Clear
                </span>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-3">
            <Label className="mb-2">Category</Label>
            {/* FIlter by type */}
            <Select
              onValueChange={handleFilterType}
              value={selectedType}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tranaction Category</SelectLabel>
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
            {/* filter by transaction status  */}
            <Label className="mb-2">Status</Label>
            <Select
              onValueChange={handleFilterStatus}
              value={selectedStatus}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tranaction Status</SelectLabel>
                  {transactionStatuseOptions?.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item?.value}>
                        {item?.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={handleClear} variant="link">
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {" "}
        <p className="text-sm font-medium border-b">
          Showing {data?.data.length} of {totalRecord} records
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>

            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{item?.sender?.phone}</TableCell>
                <TableCell>{item?.receiver?.phone}</TableCell>
                <TableCell>{getTransactionType(item.type)?.label}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.status}</TableCell>

                <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell>
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex ">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="shadow-none"
                          aria-label="Edit item"
                        >
                          <EllipsisIcon size={16} aria-hidden="true" />
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/transactions/${item._id}`}>
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {data?.data.length === 0 && (
        <p className="text-center my-20">Not transaction record found!</p>
      )}

      <div>
        <div className="flex items-center justify-between gap-3 max-sm:flex-col">
          {/* Page number information */}
          <p
            className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
            aria-live="polite"
          >
            Page <span className="text-foreground">{currentPage}</span> of{" "}
            <span className="text-foreground">{totalPage}</span>
          </p>

          {/* Pagination buttons */}
          {totalPage > 1 && (
            <div className="flex justify-end mt-4">
              <div>
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
              </div>
            </div>
          )}

          {/* Results per page */}
          <div className="flex flex-1 justify-end">
            <Select
              value={String(limit)}
              onValueChange={(value) => {
                console.log(value);
                setLimit(Number(value));
              }}
              aria-label="Results per page"
            >
              <SelectTrigger
                id="results-per-page"
                className="w-fit whitespace-nowrap"
              >
                <SelectValue placeholder="Select number of results" />
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
    </div>
  );
}
