import type { ServiceStatusResponse } from "./serviceStatus.types";

export async function fetchServiceStatuses(
  signal?: AbortSignal,
): Promise<ServiceStatusResponse> {
  const response = await fetch("/api/services/status", {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch service statuses: ${response.status}`);
  }

  return response.json();
}
