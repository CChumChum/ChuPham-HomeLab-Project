export type ServiceCategory = "media" | "photos" | "requests" | "admin";

export type ServiceAccess = "family" | "admin";

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  access: ServiceAccess;
  icon: string;
  href: string;
}
