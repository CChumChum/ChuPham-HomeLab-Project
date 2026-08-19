import { useCallback, useEffect, useRef, useState } from "react";

import { fetchServiceStatuses } from "../serviceStatusApi";

import type { ServiceStatusMap } from "../serviceStatus.types";

const REFRESH_INTERVAL_MS = 30_000;

export function useServiceStatuses() {
  const [statusById, setStatusById] = useState<ServiceStatusMap>({});

  const [isLoading, setIsLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  const activeControllerRef = useRef<AbortController | null>(null);

  const hasLoadedRef = useRef(false);

  const loadStatuses = useCallback(async () => {
    activeControllerRef.current?.abort();

    const controller = new AbortController();
    activeControllerRef.current = controller;

    if (hasLoadedRef.current) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

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
        setIsRefreshing(false);
        hasLoadedRef.current = true;

        if (activeControllerRef.current === controller) {
          activeControllerRef.current = null;
        }
      }
    }
  }, []);

  useEffect(() => {
    void loadStatuses();

    const intervalId = window.setInterval(() => {
      void loadStatuses();
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      activeControllerRef.current?.abort();
    };
  }, [loadStatuses]);

  return {
    statusById,
    isLoading,
    isRefreshing,
    error,
    checkedAt,
    refresh: loadStatuses,
  };
}
