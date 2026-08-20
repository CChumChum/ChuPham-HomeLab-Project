import type { AuthResponse } from "./auth.types";

export async function fetchCurrentUser(
  signal?: AbortSignal,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/me", {
    signal,
  });

  if (!response.ok && response.status !== 401) {
    throw new Error(`Failed to fetch current user: ${response.status}`);
  }

  return response.json();
}
