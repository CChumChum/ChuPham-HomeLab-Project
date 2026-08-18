import ServiceGrid from "./ServiceGrid";
import type { Service } from "../service.types";

interface ServiceSectionProps {
  title: string;
  description: string;
  services: Service[];
}

function ServiceSection({ title, description, services }: ServiceSectionProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>

      <ServiceGrid services={services} />
    </section>
  );
}

export default ServiceSection;
