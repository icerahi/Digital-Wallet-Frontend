import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const checkAuth = (Component: ComponentType, requiredRole: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, error } = useMyWalletQuery(undefined);
    console.log(data);
    if (!isLoading && !data?.data?.owner?.phone) {
      return <Navigate to="/login" />;
    }
    if (
      requiredRole &&
      !isLoading &&
      requiredRole !== data?.data?.owner?.role
    ) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};
