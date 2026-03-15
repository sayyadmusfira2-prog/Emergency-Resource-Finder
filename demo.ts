import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  MapPinIcon,
  ChevronRight,
  Filter,
  Zap,
  Heart,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

interface EmergencyResource {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  distance: number;
  coordinates: [number, number];
}

// Mock data for demonstration
const MOCK_RESOURCES: EmergencyResource[] = [
  {
    id: "1",
    name: "City General Hospital",
    category: "hospitals",
    address: "123 Healthcare Ave, Medical District",
    phone: "+1-555-0101",
    distance: 0.8,
    coordinates: [40.7128, -74.0060],
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    category: "hospitals",
    address: "456 Medical Plaza, Downtown",
    phone: "+1-555-0102",
    distance: 1.2,
    coordinates: [40.7150, -74.0070],
  },
  {
    id: "3",
    name: "Central Blood Bank",
    category: "blood-banks",
    address: "789 Donor Lane, East Side",
    phone: "+1-555-0201",
    distance: 1.5,
    coordinates: [40.7180, -74.0050],
  },
  {
    id: "4",
    name: "Red Cross Blood Center",
    category: "blood-banks",
    address: "321 Life Save Rd, West Side",
    phone: "+1-555-0202",
    distance: 2.1,
    coordinates: [40.7100, -74.0100],
  },
  {
    id: "5",
    name: "Emergency Ambulance Service",
    category: "ambulance",
    address: "555 Response Ave, Central",
    phone: "+1-555-0301",
    distance: 0.5,
    coordinates: [40.7140, -74.0080],
  },
  {
    id: "6",
    name: "Metro Paramedic Units",
    category: "ambulance",
    address: "666 Emergency Blvd, Downtown",
    phone: "+1-555-0302",
    distance: 1.8,
    coordinates: [40.7160, -74.0040],
  },
  {
    id: "7",
    name: "Downtown Police Station",
    category: "police",
    address: "999 Law Enforcement Plaza, Downtown",
    phone: "+1-555-0401",
    distance: 1.1,
    coordinates: [40.7135, -74.0070],
  },
  {
    id: "8",
    name: "East Side Police Precinct",
    category: "police",
    address: "777 Justice St, East Side",
    phone: "+1-555-0402",
    distance: 2.3,
    coordinates: [40.7190, -74.0030],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  hospitals: "Hospitals",
  "blood-banks": "Blood Banks",
  ambulance: "Ambulance Services",
  police: "Police Stations",
};

const CATEGORY_COLORS: Record<string, string> = {
  hospitals: "bg-red-50 dark:bg-red-900/10",
  "blood-banks": "bg-blue-50 dark:bg-blue-900/10",
  ambulance: "bg-yellow-50 dark:bg-yellow-900/10",
  police: "bg-purple-50 dark:bg-purple-900/10",
};

const CATEGORY_ICONS: Record<string, string> = {
  hospitals: "🏥",
  "blood-banks": "🩸",
  ambulance: "🚑",
  police: "👮",
};

export default function Results() {
  const [searchParams] = useSearchParams();
  const [resources, setResources] = useState<EmergencyResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EmergencyResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"distance" | "name">("distance");
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated, user, toggleSavedResource, addRecentSearch } = useAuth();

  const location = searchParams.get("location") || "";
  const category = searchParams.get("category");
  const isEmergency = searchParams.get("emergency") === "true";

  useEffect(() => {
    // Simulate fetching resources
    setResources(MOCK_RESOURCES);

    // Track search in user history
    if (isAuthenticated && location) {
      addRecentSearch(location);
    }

    // Filter by category if specified
    let filtered = MOCK_RESOURCES;
    if (category && category !== "all") {
      filtered = filtered.filter((r) => r.category === category);
      setSelectedCategory(category);
    }

    // Sort
    if (sortBy === "distance") {
      filtered = filtered.sort((a, b) => a.distance - b.distance);
    } else {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredResources(filtered);
  }, [category, sortBy, isAuthenticated, location, addRecentSearch]);

  const handleCategoryFilter = (cat: string | null) => {
    setSelectedCategory(cat);
    let filtered = resources;

    if (cat && cat !== "all") {
      filtered = filtered.filter((r) => r.category === cat);
    }

    if (sortBy === "distance") {
      filtered = filtered.sort((a, b) => a.distance - b.distance);
    } else {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredResources(filtered);
  };

  const uniqueCategories = [...new Set(resources.map((r) => r.category))];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              {isEmergency && (
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary">EMERGENCY MODE</span>
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Emergency Resources
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {location || "Your location"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                {filteredResources.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Resources found
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="bg-background border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Filters - Desktop Always Visible, Mobile Toggle */}
            <div className={`${showFilters ? "block" : "hidden"} md:block space-y-4`}>
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedCategory === null
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    All Services
                  </button>
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryFilter(cat)}
                      className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Sort By</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("distance")}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      sortBy === "distance"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Distance
                  </button>
                  <button
                    onClick={() => setSortBy("name")}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      sortBy === "name"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Name
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredResources.map((resource) => (
                <Link
                  key={resource.id}
                  to={`/resource/${resource.id}`}
                  className="no-underline"
                >
                  <div
                    className={`${CATEGORY_COLORS[resource.category]} border border-border rounded-lg p-6 hover:shadow-lg transition-all transform hover:scale-102 cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{CATEGORY_ICONS[resource.category]}</span>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {resource.name}
                          </h3>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                            <span>{resource.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <a
                              href={`tel:${resource.phone}`}
                              className="text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {resource.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 space-y-2">
                        <div className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold">
                          {resource.distance} km
                        </div>
                        {isAuthenticated && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSavedResource(resource.id);
                            }}
                            className={`block w-full py-2 px-3 rounded-lg transition-colors text-sm font-medium ${
                              user?.savedResources.includes(resource.id)
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-foreground hover:bg-muted/80"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 inline mr-1 ${
                                user?.savedResources.includes(resource.id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                            {user?.savedResources.includes(resource.id) ? "Saved" : "Save"}
                          </button>
                        )}
                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPinIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                No resources found
              </h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search location
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors no-underline"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
