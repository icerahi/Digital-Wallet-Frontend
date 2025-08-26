"use client";

import { ArrowRight, InfoIcon } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUserInfoMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const UpdatePhoneSchema = z.object({
  phone: z
    .string("Phone number can not be empty")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
});

export default function UpdatPhoneModal() {
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | undefined>();

  const [updatePhone] = useUpdateUserInfoMutation();

  const form = useForm<z.infer<typeof UpdatePhoneSchema>>({
    resolver: zodResolver(UpdatePhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdatePhoneSchema>) => {
    try {
      const res = await updatePhone(data).unwrap();

      if (res.success) {
        toast.success(res?.message);
        setOpen(false);
        form.reset();
      }
    } catch (error: any) {
      setErrorAlert(error?.data?.message);
    }
  };

  const handleModalClose = (value: boolean) => {
    setOpen(value);
    !open && (form.reset(), setErrorAlert(undefined));
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span>Update Phone Number</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-left">
              Update Your Phone Number
            </DialogTitle>
            <DialogDescription>
              Make change your phone number here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        </div>
        {errorAlert && (
          <Alert className="mb-3" variant="destructive">
            <InfoIcon />
            <AlertTitle>Fail to update !</AlertTitle>
            <AlertDescription>{errorAlert}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Form {...form}>
              <form
                id="updatephone-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="updatephone-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
