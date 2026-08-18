import { useMemo, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";

import ServiceFilters, {
  type ServiceCategoryFilter,
} from "../services/components/ServiceFilters";

import ServiceSection from "../services/components/ServiceSection";
import { serviceCatalog } from "../services/serviceCatalog";

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategoryFilter>("all");

  const filteredServices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return serviceCatalog.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;

      const matchesSearch =
        normalizedQuery === "" ||
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const familyServices = filteredServices.filter(
    (service) => service.access === "family",
  );

  const adminServices = filteredServices.filter(
    (service) => service.access === "admin",
  );

  const hasResults = familyServices.length > 0 || adminServices.length > 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <DashboardHeader />

        <ServiceFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
        />

        {hasResults ? (
          <>
            <ServiceSection
              title="Services"
              description="Media, photos, requests and shared applications."
              services={familyServices}
            />

            {adminServices.length > 0 && (
              <div className="mt-14">
                <ServiceSection
                  title="Administration"
                  description="Server management and automation tools."
                  services={adminServices}
                />
              </div>
            )}
          </>
        ) : (
          <div
            className="
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              px-6 py-12
              text-center
            "
          >
            <h2 className="text-lg font-semibold">No services found</h2>

            <p className="mt-2 text-sm text-zinc-500">
              Try changing your search or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
