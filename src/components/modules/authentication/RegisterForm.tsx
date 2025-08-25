import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { RadioGroup } from "@/components/ui/radio-group";
import { role } from "@/constants";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const RegisterSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Fullname atleast 2 charecter long" }),
    phone: z.string().regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 charecter." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();
  const [selectedRole, setSelectedRole] = useState<string>(role.user);
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "Imran hasan",
      phone: "01726744303",
      password: "@Imran#420",
      confirmPassword: "@Imran#420",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const userInfo = { ...data, role: selectedRole };

    const toastId = toast.loading("Registering....");
    try {
      const res = await register(userInfo).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Create your Bondhu Pay account</h1>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Imran Hasan" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 01XXXXXXXXX" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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

            <div className="flex gap-2">
              <FormLabel>Role</FormLabel>
              <div className="bg-input/100 inline-flex h-9 rounded-md p-0.5">
                <RadioGroup
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                  className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=USER]:after:translate-x-0 data-[state=AGENT]:after:translate-x-full"
                  data-state={selectedRole}
                >
                  <label className="group-data-[state=AGENT]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                    USER
                    <RadioGroupItem
                      id={`${id}-1`}
                      value="USER"
                      className="sr-only"
                    />
                  </label>
                  <label className="group-data-[state=USER]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                    <span>AGENT</span>
                    <RadioGroupItem
                      id={`${id}-2`}
                      value="AGENT"
                      className="sr-only"
                    />
                  </label>
                </RadioGroup>
              </div>
            </div>
            <Button className="w-full">Register</Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or
          </span>
        </div>
        <div>
          <Button
            onClick={() => toast.info("Feature not available right now!")}
            variant="outline"
            type="button"
            className="w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
