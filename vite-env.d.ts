import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Hospital,
  Droplet,
  Ambulance,
  Shield,
  MapPin,
  Phone,
  X,
  Check,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

interface Resource {
  id: string;
  name: string;
  category: "hospitals" | "blood-banks" | "ambulance" | "police";
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

const CATEGORY_OPTIONS = [
  { value: "hospitals", label: "Hospitals", icon: Hospital },
  { value: "blood-banks", label: "Blood Banks", icon: Droplet },
  { value: "ambulance", label: "Ambulance Services", icon: Ambulance },
  { value: "police", label: "Police Stations", icon: Shield },
];

const INITIAL_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "City General Hospital",
    category: "hospitals",
    address: "123 Healthcare Ave, Medical District",
    phone: "+1-555-0101",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    name: "Central Blood Bank",
    category: "blood-banks",
    address: "789 Donor Lane, East Side",
    phone: "+1-555-0201",
    latitude: 40.718,
    longitude: -74.005,
  },
  {
    id: "5",
    name: "Emergency Ambulance Service",
    category: "ambulance",
    address: "555 Response Ave, Central",
    phone: "+1-555-0301",
    latitude: 40.714,
    longitude: -74.008,
  },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Resource>>({
    category: "hospitals",
  });

  if (!user || !user.isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddClick = () => {
    setFormData({ category: "hospitals" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (resource: Resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      setResources(
        resources.map((r) =>
          r.id === editingId ? { ...r, ...formData } : r
        ) as Resource[]
      );
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        name: formData.name || "",
        category: (formData.category as Resource["category"]) || "hospitals",
        address: formData.address || "",
        phone: formData.phone || "",
        latitude: formData.latitude || 40.7128,
        longitude: formData.longitude || -74.006,
      };
      setResources([...resources, newResource]);
    }

    setShowForm(false);
    setFormData({ category: "hospitals" });
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ category: "hospitals" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "latitude" || name === "longitude" ? parseFloat(value) : value,
    });
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
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">Manage all emergency resources</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-all flex items-center gap-2 w-fit"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {CATEGORY_OPTIONS.map((cat) => {
              const count = resources.filter((r) => r.category === cat.value).length;
              const Icon = cat.icon;
              return (
                <div key={cat.value} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{cat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Resource Button */}
          <div className="mb-6">
            {!showForm && (
              <button
                onClick={handleAddClick}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Resource
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingId ? "Edit Resource" : "Add New Resource"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="Resource name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category || "hospitals"}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      placeholder="+1-555-0000"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      placeholder="Full address"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Latitude */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      name="latitude"
                      step="0.0001"
                      value={formData.latitude || ""}
                      onChange={handleInputChange}
                      placeholder="40.7128"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Longitude */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      name="longitude"
                      step="0.0001"
                      value={formData.longitude || ""}
                      onChange={handleInputChange}
                      placeholder="-74.006"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {editingId ? "Update Resource" : "Add Resource"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Resources Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Coordinates
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {resources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{resource.name}</td>
                      <td className="px-6 py-4 text-foreground text-sm">
                        {CATEGORY_OPTIONS.find((c) => c.value === resource.category)?.label}
                      </td>
                      <td className="px-6 py-4 text-foreground text-sm">{resource.phone}</td>
                      <td className="px-6 py-4 text-foreground text-sm text-muted-foreground">
                        {resource.address}
                      </td>
                      <td className="px-6 py-4 text-foreground text-sm text-muted-foreground">
                        {resource.latitude.toFixed(4)}, {resource.longitude.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 space-x-2 flex gap-2">
                        <button
                          onClick={() => handleEditClick(resource)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {resources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources yet. Add one to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
