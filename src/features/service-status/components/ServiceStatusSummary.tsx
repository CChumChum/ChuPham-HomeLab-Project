import type { ServiceStatusMap } from "../serviceStatus.types";

interface ServiceStatusSummaryProps {
  totalServices: number;
  statusById: ServiceStatusMap;
  checkedAt: string | null;
  isRefreshing: boolean;
  hasError: boolean;
  onRefresh: () => void;
}

function ServiceStatusSummary({
  totalServices,
  statusById,
  checkedAt,
  isRefreshing,
  hasError,
  onRefresh,
}: ServiceStatusSummaryProps) {
  const statuses = Object.values(statusById);

  const onlineCount = statuses.filter(
    (service) => service?.status === "online",
  ).length;

  const offlineCount = statuses.filter(
    (service) => service?.status === "offline",
  ).length;

  const unconfiguredCount = statuses.filter(
    (service) => service?.status === "unconfigured",
  ).length;

  const lastChecked = checkedAt
    ? new Date(checkedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Not checked yet";

  return (
    <div
      className="
        mt-8
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <div>
          <p className="text-xs text-zinc-500">Services</p>

          <p className="font-semibold text-white">{totalServices}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Online</p>

          <p className="font-semibold text-emerald-400">{onlineCount}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Offline</p>

          <p className="font-semibold text-red-400">{offlineCount}</p>
        </div>

        {unconfiguredCount > 0 && (
          <div>
            <p className="text-xs text-zinc-500">Unconfigured</p>

            <p className="font-semibold text-amber-400">{unconfiguredCount}</p>
          </div>
        )}

        <div>
          <p className="text-xs text-zinc-500">Last checked</p>

          <p className="font-medium text-zinc-300">
            {hasError ? "Status unavailable" : lastChecked}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-zinc-700
          bg-zinc-800
          px-4
          py-2
          text-sm
          font-medium
          text-zinc-200
          transition
          hover:bg-zinc-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
        >
          <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5" />
        </svg>

        {isRefreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

export default ServiceStatusSummary;
