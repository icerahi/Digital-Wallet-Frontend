import { Button } from "@/components/ui/button";
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
import {
  useBlockWalletMutation,
  useGetAllWalletsQuery,
  useUnblockWalletMutation,
} from "@/redux/features/wallet/wallet.api";
import { EllipsisIcon, Search } from "lucide-react";
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

  const { data } = useGetAllWalletsQuery({
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
    <div>
      <div className="flex items-center justify-end gap-3  py-4">
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
          <label className="font-normal text-muted-foreground  ">
            Filter by
          </label>

          <div className="flex items-end justify-center gap-3">
            <Label className="mb-2">Status</Label>
            <Select
              onValueChange={handleFilterStatus}
              value={selectedWalletStatus}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Wallet Status</SelectLabel>
                  {WalletStatusOptions?.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item?.value}>
                        {item?.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Role filter  */}
            <Label className="mb-2">Role</Label>
            <Select
              onValueChange={handleFilterRole}
              value={selectedRole}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>User Status</SelectLabel>
                  {UserRoleOptions?.map(
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

      <p className="text-sm font-medium border-b">
        Showing {data?.data.length} of {totalRecord} records
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{item?.owner?.fullname}</TableCell>
                <TableCell>{item?.owner?.phone}</TableCell>
                <TableCell>{item?.owner?.role}</TableCell>
                <TableCell>{item?.balance}</TableCell>
                <TableCell>
                  {item?.isBlocked ? "Blocked" : "Unblocked"}
                </TableCell>

                <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                <TableCell>
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
                          <Link to={`/dashboard/wallets/${item._id}`}>
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>

                        {item?.isBlocked ? (
                          <DropdownMenuItem
                            asChild
                            onClick={() => handleUnblock(item._id)}
                          >
                            <span>Unblock</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            asChild
                            onClick={() => handleBlock(item._id)}
                          >
                            <span>Block</span>
                          </DropdownMenuItem>
                        )}
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
