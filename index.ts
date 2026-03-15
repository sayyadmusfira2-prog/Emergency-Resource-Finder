import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full">
              <AlertCircle className="w-16 h-16 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
            <p className="text-2xl text-muted-foreground mb-4">Page Not Found</p>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist. It might have been moved or removed.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors no-underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
