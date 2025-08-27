import { FullPageLoader } from "@/components/loaders/FullpageLoader";
import ChangePasswordModal from "@/components/modules/settings/ChangePasswordModal";
import UpdateNameModal from "@/components/modules/settings/UpdateNameModal";
import UpdatPhoneModal from "@/components/modules/settings/UpdatePhoneModal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMeQuery } from "@/redux/features/user/user.api";

const Settings = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) return <FullPageLoader />;

  return (
    <section className="py-5">
      <div className="container px-4 md:px-8">
        <h1 className="mb-8 text-2xl font-bold md:mb-12 md:text-4xl">
          Account Settings
        </h1>
        <Separator className="mb-8" />

        <Card className="max-w-3xl">
          <CardContent className="divide-y">
            {/* Fullname */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-medium">{data?.data?.fullname}</p>
              </div>
              <UpdateNameModal />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-lg font-medium">{data?.data?.phone}</p>
              </div>
              <UpdatPhoneModal />
            </div>

            {/* Password */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Password</p>
                <p className="text-lg font-medium">**********</p>
              </div>
              <ChangePasswordModal />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Settings;
