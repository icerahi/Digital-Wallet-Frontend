import TransactionTable from "@/components/modules/transaction/TransactionTable";
import { useGetMeQuery } from "@/redux/features/user/user.api";

export default function TransactionHistory() {
  const { data } = useGetMeQuery(undefined);

  return (
    <div className="mx-20">
      <h1>Transaction History</h1>
      <TransactionTable user={data?.data} />
    </div>
  );
}
