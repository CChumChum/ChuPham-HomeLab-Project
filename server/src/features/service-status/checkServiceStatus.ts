export type ServiceStatus = "online" | "offline" | "unconfigured";

export interface ServiceStatusResult {
  id: string;
  status: ServiceStatus;
  responseTimeMs: number | null;
  httpStatus: number | null;
}

export async function checkServiceStatus(
  id: string,
  url: string | undefined,
): Promise<ServiceStatusResult> {
  if (!url) {
    return {
      id,
      status: "unconfigured",
      responseTimeMs: null,
      httpStatus: null,
    };
  }

  const startTime = performance.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });

    const responseTimeMs = Math.round(performance.now() - startTime);

    // Only reachability matters; release the response stream immediately.
    await response.body?.cancel();

    return {
      id,
      status: "online",
      responseTimeMs,
      httpStatus: response.status,
    };
  } catch {
    return {
      id,
      status: "offline",
      responseTimeMs: null,
      httpStatus: null,
    };
  }
}
