import { DashboardLoader } from "@/components/loaders/DashboardLoader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { role } from "@/constants";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";

export function SectionCards() {
  const { data: allTransactions, isLoading: loading1 } =
    useGetAllTransactionsQuery(undefined);
  const { data: allSystemUsers, isLoading: loading2 } =
    useGetAllUsersQuery(undefined);
  const { data: allUsers, isLoading: loading3 } = useGetAllUsersQuery({
    role: role.user,
  });
  const { data: allAgents, isLoading: loading4 } = useGetAllUsersQuery({
    role: role.agent,
  });

  if (loading1 || loading2 || loading3 || loading4) {
    return <DashboardLoader />;
  }
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total System Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allSystemUsers?.meta?.total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Included User,Agent,Admin</Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allTransactions?.meta?.total}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allUsers?.meta?.total}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Agents </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {allAgents?.meta?.total}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
