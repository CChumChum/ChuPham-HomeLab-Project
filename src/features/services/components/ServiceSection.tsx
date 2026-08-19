import ServiceGrid from "./ServiceGrid";

import type { Service } from "../service.types";

import type { ServiceStatusMap } from "../../service-status/serviceStatus.types";

interface ServiceSectionProps {
  title: string;
  description: string;
  services: Service[];
  statusById: ServiceStatusMap;
  isStatusLoading: boolean;
  hasStatusError: boolean;
}

function ServiceSection({
  title,
  description,
  services,
  statusById,
  isStatusLoading,
  hasStatusError,
}: ServiceSectionProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>

      <ServiceGrid
        services={services}
        statusById={statusById}
        isStatusLoading={isStatusLoading}
        hasStatusError={hasStatusError}
      />
    </section>
  );
}

export default ServiceSection;
