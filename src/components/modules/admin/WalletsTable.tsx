import { TableLoader } from "@/components/loaders/TableLoader";
import { Button } from "@/components/ui/button";
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
import { role } from "@/constants";
import { cn } from "@/lib/utils";
import {
  useBlockWalletMutation,
  useGetAllWalletsQuery,
  useUnblockWalletMutation,
} from "@/redux/features/wallet/wallet.api";
import {
  Ban,
  EllipsisIcon,
  FilterX,
  Search,
  Unlock,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

export default function WalletsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [selectedWalletStatus, setSelectedWalletStatus] = useState("all");
  const [selectedRole, setSelectRole] = useState("all");
  const { data, isLoading } = useGetAllWalletsQuery({
    phone: searchInput.trim(),
    role: selectedRole === "all" ? "" : selectedRole,
    isBlocked: selectedWalletStatus === "all" ? "" : selectedWalletStatus,
    limit,
    page: currentPage,
  });
  const [blockWallet] = useBlockWalletMutation();
  const [unblockWallet] = useUnblockWalletMutation();
  const WalletStatusOptions = [
    { value: "all", label: "All" },
    { value: "true", label: "Blocked" },
    { value: "false", label: "Unblocked" },
  ];
  const UserRoleOptions = [
    { value: "all", label: "All" },
    { value: role.user, label: "User" },
    { value: role.agent, label: "Agent" },
  ];
  const handleFilterStatus = (value: string) => {
    setSelectedWalletStatus(value);
  };
  const handleFilterRole = (value: string) => {
    setSelectRole(value);
  };
  const handleClear = () => {
    setSelectedWalletStatus("all");
    setSelectRole("all");
    setSearchInput("");
    form.reset();
  };

  const totalPage = data?.meta?.totalPages || 1;
  const totalRecord = data?.meta?.total || 0;
  const handleBlock = async (walletId: string) => {
    const toastId = toast.loading("Blocking...");
    try {
      const res = await blockWallet(walletId).unwrap();
      if (res.success) {
        toast.success("Wallet blocked successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };
  const handleUnblock = async (walletId: string) => {
    const toastId = toast.loading("Unblocking...");
    try {
      const res = await unblockWallet(walletId).unwrap();
      if (res.success) {
        toast.success("Wallet unblocked successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wallet Management</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage all user and agent wallets
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Search & Filter Wallets</CardTitle>
          <CardDescription>
            Search by phone number or filter by wallet status and user role
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
                          placeholder="Search by phone number"
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

            {/* Status Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label>Status</Label>
                <Select
                  onValueChange={handleFilterStatus}
                  value={selectedWalletStatus}
                >
                  <SelectTrigger className="w-full rounded-lg border-[var(--border)] bg-[var(--background)]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Wallet Status</SelectLabel>
                      {WalletStatusOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label>Role</Label>
                <Select onValueChange={handleFilterRole} value={selectedRole}>
                  <SelectTrigger className="w-full rounded-lg border-[var(--border)] bg-[var(--background)]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>User Role</SelectLabel>
                      {UserRoleOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
      ) : data?.data?.length ? (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-[var(--muted)]">
              <TableRow>
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Balance</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="w-10"></TableHead>
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
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item?.isBlocked
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      )}
                    >
                      {item?.isBlocked ? (
                        <>
                          <Ban className="mr-1 h-3 w-3" />
                          Blocked
                        </>
                      ) : (
                        <>
                          <Unlock className="mr-1 h-3 w-3" />
                          Unblocked
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">
                    {new Date(item.createdAt).toLocaleDateString()}
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
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/wallets/${item._id}`}>
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          {item?.isBlocked ? (
                            <DropdownMenuItem
                              onClick={() => handleUnblock(item._id)}
                              className="text-green-600 focus:text-green-600 focus:bg-green-50"
                            >
                              <Unlock className="mr-2 h-4 w-4" />
                              Unblock
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleBlock(item._id)}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Block
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-[var(--muted)] p-4 mb-4">
              <Wallet className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium mb-1">No wallets found</h3>
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

          <div className="flex items-center gap-2">
            <Label htmlFor="results-per-page">Rows:</Label>
            <Select
              value={String(limit)}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger id="results-per-page" className="w-fit">
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
    </div>
  );
}
