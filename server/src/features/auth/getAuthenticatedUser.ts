import type { FastifyRequest } from "fastify";

export interface AuthenticatedUser {
  username: string;
  email: string | null;
  name: string;
  groups: string[];
  isAdmin: boolean;
  isFamily: boolean;
}

export function getAuthenticatedUser(
  request: FastifyRequest,
): AuthenticatedUser | null {
  const username = request.headers["x-authentik-username"];

  if (typeof username !== "string") {
    return null;
  }

  const email = request.headers["x-authentik-email"];

  const name = request.headers["x-authentik-name"];

  const groupsHeader = request.headers["x-authentik-groups"];

  const groups =
    typeof groupsHeader === "string"
      ? groupsHeader
          .split("|")
          .map((group) => group.trim())
          .filter(Boolean)
      : [];

  return {
    username,
    email: typeof email === "string" ? email : null,
    name: typeof name === "string" ? name : username,
    groups,
    isAdmin: groups.includes("homelab-admins"),
    isFamily: groups.includes("family"),
  };
}
