import ServiceStatusSummary from "../../service-status/components/ServiceStatusSummary";

import type { ServiceStatusMap } from "../../service-status/serviceStatus.types";

import AccountMenu from "../../auth/components/AccountMenu";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  totalServices: number;
  statusById: ServiceStatusMap;
  checkedAt: string | null;
  isRefreshing: boolean;
  hasStatusError: boolean;
  onRefresh: () => void;

  userName: string | null;
  userRole: string | null;
  isUserLoading: boolean;
}

function DashboardHeader({
  searchQuery,
  onSearchChange,
  totalServices,
  statusById,
  checkedAt,
  isRefreshing,
  hasStatusError,
  onRefresh,
  userName,
  userRole,
  isUserLoading,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8">
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="shrink-0">
          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-widest
              text-zinc-500
            "
          >
            Home Server
          </p>

          <h1
            className="
              mt-2
              text-4xl
              font-bold
              text-white
            "
          >
            ChuPham HomeLab
          </h1>

          <p className="mt-3 text-zinc-400">
            One place for all services running on the home server.
          </p>
        </div>

        <div
          className="
            flex
            w-full
            flex-col
            gap-3
            sm:flex-row
            lg:max-w-2xl
          "
        >
          <div className="relative flex-1">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-zinc-500
              "
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              id="service-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search services..."
              className="
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900
                py-3
                pl-12
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-zinc-600
                focus:border-zinc-600
                focus:bg-zinc-900
              "
            />
          </div>

          <AccountMenu
            name={userName}
            role={userRole}
            isLoading={isUserLoading}
          />
        </div>
      </div>

      <ServiceStatusSummary
        totalServices={totalServices}
        statusById={statusById}
        checkedAt={checkedAt}
        isRefreshing={isRefreshing}
        hasError={hasStatusError}
        onRefresh={onRefresh}
      />
    </header>
  );
}

export default DashboardHeader;
