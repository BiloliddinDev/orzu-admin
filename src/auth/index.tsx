import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUserToken = localStorage.getItem("token");

  if (!currentUserToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
