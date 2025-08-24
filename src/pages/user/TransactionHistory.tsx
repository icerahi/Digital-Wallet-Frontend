import TransactionTable from "@/components/modules/transaction/TransactionTable";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

export default function TransactionHistory() {
  const { data } = useMyWalletQuery(undefined);

  return (
    <div className="mx-20">
      <h1>Transaction History</h1>
      <TransactionTable user={data?.data?.owner} />
    </div>
  );
}
