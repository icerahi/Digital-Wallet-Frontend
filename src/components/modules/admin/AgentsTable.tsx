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
  useApproveAgentMutation,
  useGetAllUsersQuery,
  useSuspendAgentMutation,
} from "@/redux/features/user/user.api";
import { EllipsisIcon, Search } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

export default function AgentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");

  const [selectedAgentStatus, setSelectedAgentStatus] = useState("all");

  const { data } = useGetAllUsersQuery({
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
    { value: "true", label: "Approve" },
    { value: "false", label: "Suspend" },
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
    const toastId = toast.loading("Unblocking...");
    try {
      const res = await suspendAgent(walletId).unwrap();
      if (res.success) {
        toast.success("Agent Suspended", { id: toastId });
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
              onValueChange={handleFilterAgentStatus}
              value={selectedAgentStatus}
              // disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Agent Status</SelectLabel>
                  {AgentStatusOptions?.map(
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
        Showing {data?.data?.length} of {totalRecord} records
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Agent Status</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{item?.fullname}</TableCell>
                <TableCell>{item?.phone}</TableCell>

                <TableCell>
                  {item?.agentApproval ? "Approved" : "Suspended"}
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
                          <Link to={`/dashboard/agents/${item._id}`}>
                            {" "}
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>

                        {item?.agentApproval ? (
                          <DropdownMenuItem
                            asChild
                            onClick={() => handleSuspend(item._id)}
                          >
                            <span>Suspend</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            asChild
                            onClick={() => handleApprove(item._id)}
                          >
                            <span>Approve</span>
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
