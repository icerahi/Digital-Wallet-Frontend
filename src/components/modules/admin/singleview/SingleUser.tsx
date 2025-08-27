import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";
import { useNavigate, useParams } from "react-router";

export default function SingleUser() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading user details...</p>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container px-4 md:px-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          className="mb-6 text-lg font-semibold md:mb-10"
          variant="link"
        >
          ← Back
        </Button>

        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-4xl">
          Agent Details
        </h1>
        <Separator className="mb-8" />

        {/* User Card */}
        <Card className="mx-auto max-w-3xl">
          <CardContent className="divide-y">
            {/* Fullname */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-medium">{data?.data?.fullname}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-lg font-medium">{data?.data?.phone}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-lg font-medium">{data?.data?.role}</p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="text-lg font-medium">
                  {new Date(data?.data?.createdAt).toDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
