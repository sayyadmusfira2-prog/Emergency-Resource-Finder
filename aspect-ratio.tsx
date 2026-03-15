import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="animate-spin">
              <AlertCircle className="w-12 h-12 text-primary opacity-50" />
            </div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
