import ServiceGrid from "./features/services/components/ServiceGrid";
import { serviceCatalog } from "./features/services/serviceCatalog";

function App() {
  const familyServices = serviceCatalog.filter(
    (service) => service.access === "family",
  );

  const adminServices = serviceCatalog.filter(
    (service) => service.access === "admin",
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Home Server
          </p>

          <h1 className="mt-2 text-4xl font-bold">ChuPham HomeLab</h1>

          <p className="mt-3 max-w-xl text-zinc-400">
            One place for all services running on the home server.
          </p>
        </header>

        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Services</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Media, photos, requests and shared applications.
            </p>
          </div>

          <ServiceGrid services={familyServices} />
        </section>

        <section className="mt-14">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Administration</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Server management and automation tools.
            </p>
          </div>

          <ServiceGrid services={adminServices} />
        </section>
      </div>
    </main>
  );
}

export default App;
