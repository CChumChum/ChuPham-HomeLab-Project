export type ServiceStatus = "online" | "offline" | "unconfigured";

export interface ServiceStatusResult {
  id: string;
  status: ServiceStatus;
  responseTimeMs: number | null;
  httpStatus: number | null;
}

export interface ServiceStatusResponse {
  services: ServiceStatusResult[];
  checkedAt: string;
}

export type ServiceStatusMap = Partial<Record<string, ServiceStatusResult>>;
