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
import Password from "@/components/ui/Password";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required")
      .min(8, { message: "Password must be at least 8 characters." }),

    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),

    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | undefined>();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    const passwordInfo = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      const res = await changePassword(passwordInfo).unwrap();

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
          <span>Change Password</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-left">
              Change Your Password
            </DialogTitle>
            <DialogDescription>
              Make change your password here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
        </div>
        {errorAlert && (
          <Alert className="mb-3" variant="destructive">
            <InfoIcon />
            <AlertTitle>Fail to Change !</AlertTitle>
            <AlertDescription>{errorAlert}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Form {...form}>
              <form
                id="changepassword-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
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
          <Button form="changepassword-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
