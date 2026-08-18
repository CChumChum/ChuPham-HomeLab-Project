import ServiceCard from "./ServiceCard";
import type { Service } from "../service.types";

interface ServiceGridProps {
  services: Service[];
}

function ServiceGrid({ services }: ServiceGridProps) {
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
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

export default ServiceGrid;
