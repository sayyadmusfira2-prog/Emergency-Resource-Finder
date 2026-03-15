import { Link } from "react-router-dom";
import { AlertCircle, Moon, Sun, Map, LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:inline">
                Emergency Finder
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-8 items-center">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors text-sm font-medium no-underline"
              >
                Home
              </Link>
              <Link
                to="/results"
                className="text-foreground hover:text-primary transition-colors text-sm font-medium no-underline"
              >
                Browse Resources
              </Link>
              <Link
                to="/map"
                className="text-foreground hover:text-primary transition-colors text-sm font-medium no-underline flex items-center gap-1"
              >
                <Map className="w-4 h-4" />
                Map
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>

              {/* Auth Links */}
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm no-underline"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm no-underline"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Emergency Finder</h3>
              <p className="text-sm text-muted-foreground">
                Quickly find nearby emergency services when you need them most.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/map" className="hover:text-foreground transition-colors no-underline">
                    Interactive Map
                  </Link>
                </li>
                <li>
                  <Link to="/results" className="hover:text-foreground transition-colors no-underline">
                    Browse Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/login"}
                    className="hover:text-foreground transition-colors no-underline"
                  >
                    {isAuthenticated ? "My Dashboard" : "Sign In"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🏥 Hospitals</li>
                <li>🩸 Blood Banks</li>
                <li>🚑 Ambulance Services</li>
                <li>👮 Police Stations</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>© 2024 Emergency Resource Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
