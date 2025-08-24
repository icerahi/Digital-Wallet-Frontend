"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCashInMutation,
  useCashOutMutation,
  useDepositMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
const formInfo: any = {
  deposit: {
    title: "Deposit Money",
    sourceLabel: "Source Number(Agent)",
  },
  withdraw: {
    title: "Withdraw Money",
    sourceLabel: "Destination Number (Agent)",
  },
  sendmoney: {
    title: "Send Money",
    sourceLabel: "Receiver Number",
  },
  cashin: {
    title: "Cash In to a User",
    sourceLabel: "Cashin Number",
  },
  cashout: {
    title: "Cash out from a User",
    sourceLabel: "Cashout Number",
  },
};

const getFormInfo = (path: string) => {
  switch (path) {
    case "deposit":
      return formInfo.deposit;
    case "withdraw":
      return formInfo.withdraw;
    case "sendmoney":
      return formInfo.sendmoney;
    case "cashin":
      return formInfo.cashin;

    case "cashout":
      return formInfo.cashout;
    default:
      return;
  }
};

const TransactionSchema = z.object({
  source: z
    .string("Phone Number is Required")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  amount: z
    .number("Amount is Required")
    .min(1, "Amount must be a positive number"),
});

export const TransactionForm = () => {
  const form = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      source: "",
      amount: 1,
    },
  });
  const [errorAlert, setErrorAlert] = useState<string | undefined>();
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = form;
  const location = useLocation();

  const extractPath = location.pathname.split("/")[2];

  const formInfo = getFormInfo(extractPath);

  const [deposit, depositStatus] = useDepositMoneyMutation();
  const [withdraw, withdrawStatus] = useWithdrawMoneyMutation();
  const [sendmoney, sendmoneyStatus] = useSendMoneyMutation();
  const [cashin, cashinStatus] = useCashInMutation();
  const [cashout, cashoutStatus] = useCashOutMutation();

  const mutation: Record<string, Function> = {
    deposit,
    withdraw,
    sendmoney,
    cashin,
    cashout,
  };

  const onSubmit = async (data: unknown) => {
    if (mutation[extractPath]) {
      try {
        const res = await mutation[extractPath](data).unwrap();
        toast.success("Form successfully submitted");
        navigate("/my-wallet");
        console.log(res);
        reset();
      } catch (error: any) {
        setErrorAlert(error?.data?.message);
      }
    } else {
      console.log("NO mutation found");
    }
  };

  return (
    <div className="space-y-4 w-1/2 mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-center">
            {formInfo?.title}{" "}
          </CardTitle>
          {/* <CardDescription>Current step {step + 1}</CardDescription> */}
        </CardHeader>
        <CardContent>
          {errorAlert && (
            <Alert className="mb-3" variant="destructive">
              <InfoIcon />
              <AlertTitle>Operation fail !</AlertTitle>
              <AlertDescription>{errorAlert}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
              <FormField
                control={control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formInfo?.sourceLabel} </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  onClick={() => navigate("/my-wallet")}
                  type="button"
                  className="font-medium"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="font-medium">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default TransactionForm;
