import RecentJoinedUser from "@/components/modules/admin/overview/RecentJoinedUser";
import RecentTransaction from "@/components/modules/admin/overview/RecentTransaction";
import { SectionCards } from "@/components/modules/admin/overview/SectionCards";

export default function Overview() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6">
          <SectionCards />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <RecentTransaction />
          <RecentJoinedUser />
        </div>
      </div>
    </div>
  );
}
