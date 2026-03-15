import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  MapPinIcon,
  ArrowLeft,
  Globe,
  Mail,
} from "lucide-react";
import Layout from "@/components/Layout";

interface Resource {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  hours: string;
  distance: number;
  coordinates: [number, number];
  description: string;
  services: string[];
  rating: number;
  reviews: number;
}

// Mock data
const RESOURCES_MAP: Record<string, Resource> = {
  "1": {
    id: "1",
    name: "City General Hospital",
    category: "hospitals",
    address: "123 Healthcare Ave, Medical District, NY 10001",
    phone: "+1-555-0101",
    email: "info@citygeneralhospital.com",
    website: "www.citygeneralhospital.com",
    hours: "24/7 Emergency Department",
    distance: 0.8,
    coordinates: [40.7128, -74.006],
    description:
      "City General Hospital is a leading healthcare facility providing emergency care, trauma services, and specialized medical treatment.",
    services: [
      "Emergency Care",
      "Trauma Center",
      "Cardiology",
      "Surgery",
      "ICU",
      "Blood Bank",
      "Pharmacy",
    ],
    rating: 4.5,
    reviews: 328,
  },
  "2": {
    id: "2",
    name: "St. Mary's Medical Center",
    category: "hospitals",
    address: "456 Medical Plaza, Downtown, NY 10002",
    phone: "+1-555-0102",
    email: "emergency@stmarysmedical.com",
    website: "www.stmarysmedical.com",
    hours: "24/7 Emergency Department",
    distance: 1.2,
    coordinates: [40.715, -74.007],
    description:
      "St. Mary's Medical Center offers comprehensive emergency and surgical services with state-of-the-art facilities.",
    services: [
      "Emergency Room",
      "General Surgery",
      "Orthopedics",
      "Pediatrics",
      "Neurology",
      "Radiology",
    ],
    rating: 4.3,
    reviews: 215,
  },
  "3": {
    id: "3",
    name: "Central Blood Bank",
    category: "blood-banks",
    address: "789 Donor Lane, East Side, NY 10003",
    phone: "+1-555-0201",
    email: "donations@centralbloodbank.com",
    website: "www.centralbloodbank.com",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    distance: 1.5,
    coordinates: [40.718, -74.005],
    description:
      "Central Blood Bank is committed to ensuring safe blood supply for the community and provides blood transfusion services.",
    services: ["Blood Donation", "Blood Transfusion", "Plasma Collection", "Testing"],
    rating: 4.7,
    reviews: 142,
  },
  "5": {
    id: "5",
    name: "Emergency Ambulance Service",
    category: "ambulance",
    address: "555 Response Ave, Central, NY 10004",
    phone: "+1-555-0301",
    email: "dispatch@emergencyambulance.com",
    website: "www.emergencyambulance.com",
    hours: "24/7",
    distance: 0.5,
    coordinates: [40.714, -74.008],
    description:
      "Emergency Ambulance Service provides rapid emergency medical transport and basic life support to patients.",
    services: ["Emergency Transport", "Basic Life Support", "Patient Care", "Hospital Transfer"],
    rating: 4.8,
    reviews: 456,
  },
  "7": {
    id: "7",
    name: "Downtown Police Station",
    category: "police",
    address: "999 Law Enforcement Plaza, Downtown, NY 10005",
    phone: "+1-555-0401",
    email: "community@downtownpolice.gov",
    website: "www.downtownpolice.gov",
    hours: "24/7",
    distance: 1.1,
    coordinates: [40.7135, -74.007],
    description:
      "Downtown Police Station serves the city center with comprehensive law enforcement and public safety services.",
    services: ["Emergency Response", "Crime Reporting", "Community Policing", "Investigations"],
    rating: 4.2,
    reviews: 189,
  },
};

const CATEGORY_ICONS: Record<string, string> = {
  hospitals: "🏥",
  "blood-banks": "🩸",
  ambulance: "🚑",
  police: "👮",
};

const CATEGORY_COLORS: Record<string, string> = {
  hospitals: "border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10",
  "blood-banks": "border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10",
  ambulance: "border-yellow-200 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/10",
  police: "border-purple-200 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-900/10",
};

export default function ResourceDetail() {
  const { id } = useParams();
  const resource = id ? RESOURCES_MAP[id] : null;

  if (!resource) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Resource Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the emergency service you're looking for.
            </p>
            <Link
              to="/results"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors no-underline"
            >
              Back to Results
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header with Back Button */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/results"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity no-underline mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Card */}
              <div
                className={`border-2 rounded-lg p-6 ${CATEGORY_COLORS[resource.category]}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{CATEGORY_ICONS[resource.category]}</span>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {resource.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < Math.floor(resource.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">
                        {resource.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({resource.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-lg text-primary font-semibold">
                      {resource.distance} km away
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* Services */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Services</h2>
                <div className="grid grid-cols-2 gap-3">
                  {resource.services.map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg"
                    >
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card border border-border rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Location Map</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Coordinates: {resource.coordinates[0]}, {resource.coordinates[1]}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Map integration coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Contact & Actions */}
            <div className="space-y-6">
              {/* Call Button */}
              <a
                href={`tel:${resource.phone}`}
                className="block w-full px-6 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 text-center no-underline shadow-emergency"
              >
                <Phone className="w-6 h-6 inline mr-2" />
                Call Now
              </a>

              {/* Contact Information */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-foreground text-lg">Contact</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a
                      href={`tel:${resource.phone}`}
                      className="text-primary hover:underline font-medium no-underline flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {resource.phone}
                    </a>
                  </div>

                  {resource.email && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a
                        href={`mailto:${resource.email}`}
                        className="text-primary hover:underline font-medium no-underline flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        {resource.email}
                      </a>
                    </div>
                  )}

                  {resource.website && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Website</p>
                      <a
                        href={`https://${resource.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium no-underline flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Address & Hours */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </p>
                  <p className="text-foreground font-medium">{resource.address}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Hours
                  </p>
                  <p className="text-foreground font-medium">{resource.hours}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="space-y-2">
                <button className="w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
                  Share
                </button>
                <button className="w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
