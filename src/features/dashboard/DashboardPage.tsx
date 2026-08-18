import DashboardHeader from "./components/DashboardHeader";
import ServiceSection from "../services/components/ServiceSection";
import { serviceCatalog } from "../services/serviceCatalog";

function DashboardPage() {
  const familyServices = serviceCatalog.filter(
    (service) => service.access === "family",
  );

  const adminServices = serviceCatalog.filter(
    (service) => service.access === "admin",
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <DashboardHeader />

        <ServiceSection
          title="Services"
          description="Media, photos, requests and shared applications."
          services={familyServices}
        />

        <div className="mt-14">
          <ServiceSection
            title="Administration"
            description="Server management and automation tools."
            services={adminServices}
          />
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
