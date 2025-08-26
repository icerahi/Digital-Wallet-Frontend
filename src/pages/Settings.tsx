import React from "react";

import ChangePasswordModal from "@/components/modules/settings/ChangePasswordModal";
import UpdateNameModal from "@/components/modules/settings/UpdateNameModal";
import UpdatPhoneModal from "@/components/modules/settings/UpdatePhoneModal";
import { Separator } from "@/components/ui/separator";
import { useGetMeQuery } from "@/redux/features/user/user.api";

const Settings = () => {
  const { data } = useGetMeQuery(undefined);
  return (
    <section className="py-32">
      <div className="container px-0 md:px-8">
        <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
          Account Settings
        </h1>
        <Separator />

        <div className="w-[50vw] mr-auto  p-5">
          <React.Fragment>
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Fullname</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.fullname}
                </p>
              </div>
              <UpdateNameModal />
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Phone Number</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.phone}
                </p>
              </div>
              <UpdatPhoneModal />
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Password</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  **********
                </p>
              </div>
              <ChangePasswordModal />
            </div>
            {/* <Separator /> */}
          </React.Fragment>
        </div>
      </div>
    </section>
  );
};

export default Settings;
