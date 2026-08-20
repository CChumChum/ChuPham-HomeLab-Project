import { useMemo, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";

import ServiceCategoryFilter, {
  type ServiceCategoryFilterValue,
} from "../services/components/ServiceCategoryFilter";

import ServiceSection from "../services/components/ServiceSection";

import { serviceCatalog } from "../services/serviceCatalog";

import { useServiceStatuses } from "../service-status/hooks/useServiceStatuses";

import { useCurrentUser } from "../auth/hooks/useCurrentUser";

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategoryFilterValue>("all");

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

  const { user, isLoading: isUserLoading } = useCurrentUser();

  const adminServices = user?.isAdmin
    ? filteredServices.filter((service) => service.access === "admin")
    : [];

  const hasResults = familyServices.length > 0 || adminServices.length > 0;

  const {
    statusById,
    isLoading: isStatusLoading,
    isRefreshing,
    error: statusError,
    checkedAt,
    refresh,
  } = useServiceStatuses();

  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-10
        "
      >
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalServices={
            user?.isAdmin
              ? serviceCatalog.length
              : serviceCatalog.filter((service) => service.access === "family")
                  .length
          }
          statusById={statusById}
          checkedAt={checkedAt}
          isRefreshing={isRefreshing}
          hasStatusError={statusError !== null}
          onRefresh={refresh}
          userName={user?.name ?? user?.username ?? null}
          userRole={user ? (user.isAdmin ? "Administrator" : "Family") : null}
          isUserLoading={isUserLoading}
        />

        <ServiceCategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showAdmin={user?.isAdmin ?? false}
        />

        {hasResults ? (
          <>
            <ServiceSection
              title="Services"
              description="Media, photos, requests and shared applications."
              services={familyServices}
              statusById={statusById}
              isStatusLoading={isStatusLoading}
              hasStatusError={statusError !== null}
            />

            {adminServices.length > 0 && (
              <div className="mt-14">
                <ServiceSection
                  title="Administration"
                  description="Server management and automation tools."
                  services={adminServices}
                  statusById={statusById}
                  isStatusLoading={isStatusLoading}
                  hasStatusError={statusError !== null}
                />
              </div>
            )}
          </>
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              px-6
              py-12
              text-center
            "
          >
            <h2
              className="
                text-lg
                font-semibold
              "
            >
              No services found
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >
              Try changing your search or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
