import { Button } from "@/components/ui/button";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useNavigate, useParams } from "react-router";

export default function SingleUser() {
  const { id } = useParams();
  const { data } = useGetSingleUserQuery(id);
  const navigate = useNavigate();
  return (
    <section className="py-10">
      <Button
        onClick={() => navigate(-1)}
        className="font-semibold text-2xl mb-10 cursor-pointer"
        variant="link"
      >
        Back
      </Button>
      <div className="container px-0 md:px-8">
        <h1 className="text-center px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
          Agent Details
        </h1>
        <Separator />

        <div className="w-[50vw] mx-auto p-5">
          <React.Fragment>
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Fullname</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.fullname}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Phone Number</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.phone}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Role</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.role}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Joined</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {new Date(data?.data?.createdAt).toDateString()}
                </p>
              </div>
            </div>
            {/* <Separator /> */}
          </React.Fragment>
        </div>
      </div>
    </section>
  );
}
