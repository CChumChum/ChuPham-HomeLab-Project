import { useEffect, useState } from "react";

import { fetchCurrentUser } from "../authApi";

import type { AuthenticatedUser } from "../auth.types";

export function useCurrentUser() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const data = await fetchCurrentUser(controller.signal);

        setUser(data.authenticated ? data.user : null);

        setError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load user",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    user,
    isLoading,
    error,
  };
}
