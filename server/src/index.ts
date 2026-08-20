import "dotenv/config";

import Fastify from "fastify";

import { serviceTargets } from "./config/serviceTargets.js";
import { checkServiceStatus } from "./features/service-status/checkServiceStatus.js";

const app = Fastify({
  logger: true,
});

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "127.0.0.1";

app.get("/api/health", async () => {
  return {
    status: "ok",
    service: "chupham-homelab-api",
  };
});

app.get("/api/auth/me", async (request, reply) => {
  const username = request.headers["x-authentik-username"];
  const email = request.headers["x-authentik-email"];
  const name = request.headers["x-authentik-name"];
  const groupsHeader = request.headers["x-authentik-groups"];

  if (typeof username !== "string") {
    return reply.status(401).send({
      authenticated: false,
    });
  }

  const groups =
    typeof groupsHeader === "string"
      ? groupsHeader
          .split("|")
          .map((group) => group.trim())
          .filter(Boolean)
      : [];

  return {
    authenticated: true,
    user: {
      username,
      email: typeof email === "string" ? email : null,
      name: typeof name === "string" ? name : username,
      groups,
      isAdmin: groups.includes("homelab-admins"),
    },
  };
});

app.get("/api/services/status", async () => {
  const services = await Promise.all(
    serviceTargets.map((service) =>
      checkServiceStatus(service.id, service.url),
    ),
  );

  return {
    services,
    checkedAt: new Date().toISOString(),
  };
});

try {
  const address = await app.listen({
    port,
    host,
  });

  app.log.info(`API server running at ${address}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
