import ServiceCard from "./ServiceCard";

import type { Service } from "../service.types";

import type { ServiceStatusMap } from "../../service-status/serviceStatus.types";

interface ServiceGridProps {
  services: Service[];
  statusById: ServiceStatusMap;
  isStatusLoading: boolean;
  hasStatusError: boolean;
}

function ServiceGrid({
  services,
  statusById,
  isStatusLoading,
  hasStatusError,
}: ServiceGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          status={statusById[service.id]}
          isStatusLoading={isStatusLoading}
          hasStatusError={hasStatusError}
        />
      ))}
    </div>
  );
}

export default ServiceGrid;
