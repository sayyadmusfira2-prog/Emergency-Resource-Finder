import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  MapPin,
  Phone,
  Bookmark,
  Clock,
  Settings,
  Heart,
  ChevronRight,
  Hospital,
  Droplet,
  Ambulance,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

// Mock saved resources data
const SAMPLE_SAVED_RESOURCES = [
  {
    id: "1",
    name: "City General Hospital",
    category: "hospitals",
    address: "123 Healthcare Ave, Medical District",
    phone: "+1-555-0101",
    distance: 0.8,
    icon: Hospital,
  },
  {
    id: "3",
    name: "Central Blood Bank",
    category: "blood-banks",
    address: "789 Donor Lane, East Side",
    phone: "+1-555-0201",
    distance: 1.5,
    icon: Droplet,
  },
  {
    id: "5",
    name: "Emergency Ambulance Service",
    category: "ambulance",
    address: "555 Response Ave, Central",
    phone: "+1-555-0301",
    distance: 0.5,
    icon: Ambulance,
  },
];

interface SavedResource {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  distance: number;
  icon: typeof Hospital;
}

export default function Dashboard() {
  const { user, logout, toggleSavedResource } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "saved" | "searches">(
    "overview"
  );

  if (!user) {
    return null;
  }

  const savedResourcesList: SavedResource[] = SAMPLE_SAVED_RESOURCES.filter((r) =>
    user.savedResources.includes(r.id)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Welcome, {user.name}!
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                {user.isAdmin && (
                  <div className="mt-2 inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    Admin Account
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all no-underline"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border sticky top-16 z-20 bg-white dark:bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {[
                { id: "overview" as const, label: "Overview" },
                { id: "saved" as const, label: "Saved Resources" },
                { id: "searches" as const, label: "Recent Searches" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <Bookmark className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Saved Resources</p>
                      <p className="text-3xl font-bold text-foreground">
                        {user.savedResources.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Recent Searches</p>
                      <p className="text-3xl font-bold text-foreground">
                        {user.recentSearches.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Account</p>
                      <p className="text-lg font-bold text-foreground">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Searches Preview */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Recent Searches
                </h2>
                {user.recentSearches.length > 0 ? (
                  <ul className="space-y-3">
                    {user.recentSearches.slice(0, 5).map((search, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors"
                      >
                        <span className="text-foreground">{search}</span>
                        <Link
                          to={`/results?location=${encodeURIComponent(search)}`}
                          className="text-primary hover:underline no-underline font-medium text-sm"
                        >
                          Search Again
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No recent searches yet. Try searching for emergency resources.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Saved Resources Tab */}
          {activeTab === "saved" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Saved Emergency Resources
              </h2>
              {savedResourcesList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {savedResourcesList.map((resource) => {
                    const IconComponent = resource.icon;
                    return (
                      <div
                        key={resource.id}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-foreground mb-2">
                                {resource.name}
                              </h3>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {resource.address}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <a href={`tel:${resource.phone}`} className="text-primary no-underline hover:underline">
                                    {resource.phone}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <div className="text-sm font-semibold text-foreground mb-3">
                              {resource.distance} km
                            </div>
                            <button
                              onClick={() => toggleSavedResource(resource.id)}
                              className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Saved Resources Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Save your frequently used emergency resources for quick access
                  </p>
                  <Link
                    to="/results"
                    className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors no-underline"
                  >
                    Browse Resources
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recent Searches Tab */}
          {activeTab === "searches" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Recent Searches
              </h2>
              {user.recentSearches.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {user.recentSearches.map((search, i) => (
                    <Link
                      key={i}
                      to={`/results?location=${encodeURIComponent(search)}`}
                      className="no-underline"
                    >
                      <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-lg transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-foreground font-medium">{search}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Search History
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Your searches will appear here as you use the app
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors no-underline"
                  >
                    Start Searching
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
