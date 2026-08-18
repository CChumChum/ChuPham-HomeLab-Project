import type { Service } from "../service.types";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <button
      type="button"
      className="
        group
        w-full
        rounded-2xl
        border border-zinc-800
        bg-zinc-900
        p-5
        text-left
        transition
        hover:-translate-y-1
        hover:border-zinc-700
        hover:bg-zinc-800
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-xl
            bg-zinc-800
            p-2
            transition
            group-hover:bg-zinc-700
          "
        >
          <img
            src={service.icon}
            alt={`${service.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>

        {service.access === "admin" && (
          <span
            className="
              rounded-full
              bg-zinc-800
              px-3 py-1
              text-xs
              font-medium
              text-zinc-400
            "
          >
            Admin
          </span>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">{service.name}</h3>

        <p className="mt-1 text-sm text-zinc-400">{service.description}</p>
      </div>
    </button>
  );
}

export default ServiceCard;
