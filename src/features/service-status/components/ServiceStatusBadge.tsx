import type { ServiceStatusResult } from "../serviceStatus.types";

interface ServiceStatusBadgeProps {
  status?: ServiceStatusResult;
  isLoading: boolean;
  hasError: boolean;
}

function ServiceStatusBadge({
  status,
  isLoading,
  hasError,
}: ServiceStatusBadgeProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="h-2 w-2 rounded-full bg-zinc-500" />
        Checking...
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="h-2 w-2 rounded-full bg-zinc-500" />
        {hasError ? "Unknown" : "Unavailable"}
      </div>
    );
  }

  if (status.status === "online") {
    return (
      <div className="flex items-center gap-2 text-xs text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />

        <span>
          Online
          {status.responseTimeMs !== null && ` · ${status.responseTimeMs} ms`}
        </span>
      </div>
    );
  }

  if (status.status === "offline") {
    return (
      <div className="flex items-center gap-2 text-xs text-red-400">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        Offline
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-amber-400">
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      Unconfigured
    </div>
  );
}

export default ServiceStatusBadge;
