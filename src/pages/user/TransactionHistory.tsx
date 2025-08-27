import { FullPageLoader } from "@/components/loaders/FullpageLoader";
import TransactionTable from "@/components/modules/transaction/TransactionTable";
import { useGetMeQuery } from "@/redux/features/user/user.api";

export default function TransactionHistory() {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div className="py-10">
      <TransactionTable user={data?.data} />
    </div>
  );
}
