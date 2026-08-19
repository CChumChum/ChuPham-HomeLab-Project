import { useEffect, useState } from "react";

import { fetchServiceStatuses } from "../serviceStatusApi";

import type { ServiceStatusMap } from "../serviceStatus.types";

const REFRESH_INTERVAL_MS = 30_000;

export function useServiceStatuses() {
  const [statusById, setStatusById] = useState<ServiceStatusMap>({});

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStatuses() {
      try {
        const data = await fetchServiceStatuses(controller.signal);

        const statusMap = Object.fromEntries(
          data.services.map((service) => [service.id, service]),
        ) as ServiceStatusMap;

        setStatusById(statusMap);
        setCheckedAt(data.checkedAt);
        setError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load service statuses",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadStatuses();

    const intervalId = window.setInterval(() => {
      void loadStatuses();
    }, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  return {
    statusById,
    isLoading,
    error,
    checkedAt,
  };
}
