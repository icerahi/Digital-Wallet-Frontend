import { Button } from "@/components/ui/button";
import { useGetSingleTransactionQuery } from "@/redux/features/transaction/transaction.api";
import React from "react";
import { useNavigate, useParams } from "react-router";

export default function SingleTransaction() {
  const { id } = useParams();
  const { data } = useGetSingleTransactionQuery(id);
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
          Transaction Details
        </h1>

        <div className="w-[50vw] mx-auto  ">
          <React.Fragment>
            <div className="flex justify-between py-3 items-center">
              <div>
                <p className="">Transaction Type</p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.type}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Amount </p>
                <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                  {data?.data?.amount}
                </p>
              </div>
            </div>

            <div className="flex justify-between ">
              <div className="">
                <h1 className="mb-2 py-2 border-b">Sender Details</h1>

                <div>
                  {" "}
                  <p className="">Fullname</p>
                  <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                    {data?.data?.sender?.fullname}
                  </p>
                </div>
                <div>
                  {" "}
                  <p className="">Phone</p>
                  <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                    {data?.data?.sender?.phone}
                    <span>({data?.data?.sender?.role})</span>
                  </p>
                </div>
              </div>

              <div className="">
                <h1 className="mb-2 py-2 border-b">Receiver Details</h1>
                <div>
                  {" "}
                  <p className="">Fullname</p>
                  <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                    {data?.data?.receiver?.fullname}
                  </p>
                </div>
                <div>
                  {" "}
                  <p className="">Phone</p>
                  <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                    {data?.data?.receiver?.phone}{" "}
                    <span>({data?.data?.receiver?.role})</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-3 items-center">
              <div>
                {" "}
                <p className="">Transaction Time</p>
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
