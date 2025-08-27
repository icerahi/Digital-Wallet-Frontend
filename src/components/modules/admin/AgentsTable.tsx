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
  useApproveAgentMutation,
  useGetAllUsersQuery,
  useSuspendAgentMutation,
} from "@/redux/features/user/user.api";
import { EllipsisIcon, FilterX, Search, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

export default function AgentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [selectedAgentStatus, setSelectedAgentStatus] = useState("all");
  const { data, isLoading } = useGetAllUsersQuery({
    phone: searchInput.trim(),
    role: role.agent,
    agentApproval: selectedAgentStatus === "all" ? "" : selectedAgentStatus,
    limit,
    page: currentPage,
  });
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const AgentStatusOptions = [
    { value: "all", label: "All" },
    { value: "true", label: "Approved" },
    { value: "false", label: "Suspended" },
  ];
  const handleFilterAgentStatus = (value: string) => {
    setSelectedAgentStatus(value);
  };
  const handleClear = () => {
    setSelectedAgentStatus("all");
    setSearchInput("");
    form.reset();
  };
  const totalPage = data?.meta?.totalPages || 1;
  const totalRecord = data?.meta?.total || 0;
  const handleApprove = async (agentId: string) => {
    const toastId = toast.loading("Approving...");
    try {
      const res = await approveAgent(agentId).unwrap();
      if (res.success) {
        toast.success("Agent approved successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };
  const handleSuspend = async (walletId: string) => {
    const toastId = toast.loading("Suspending...");
    try {
      const res = await suspendAgent(walletId).unwrap();
      if (res.success) {
        toast.success("Agent suspended successfully", { id: toastId });
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
      {/* Filters Section */}
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Agent Management</CardTitle>
          <CardDescription>
            Search and filter agents by phone number or approval status
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
                  onValueChange={handleFilterAgentStatus}
                  value={selectedAgentStatus}
                >
                  <SelectTrigger className="w-full rounded-lg border-[var(--border)] bg-[var(--background)]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Agent Status</SelectLabel>
                      {AgentStatusOptions.map((item) => (
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
                <TableHead className="font-semibold">Agent Status</TableHead>
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
                    {item?.fullname}
                  </TableCell>
                  <TableCell>{item?.phone}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item?.agentApproval
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      )}
                    >
                      {item?.agentApproval ? (
                        <>
                          <UserCheck className="mr-1 h-3 w-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <UserX className="mr-1 h-3 w-3" />
                          Suspended
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
                            <Link to={`/dashboard/agents/${item._id}`}>
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          {item?.agentApproval ? (
                            <DropdownMenuItem
                              onClick={() => handleSuspend(item._id)}
                              className="text-yellow-600 focus:text-yellow-600 focus:bg-yellow-50"
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleApprove(item._id)}
                              className="text-green-600 focus:text-green-600 focus:bg-green-50"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Approve
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
              <UserX className="h-8 w-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-lg font-medium mb-1">No agents found</h3>
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
