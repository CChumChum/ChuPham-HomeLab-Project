import "dotenv/config";

import Fastify from "fastify";

import { serviceTargets } from "./config/serviceTargets.js";
import { checkServiceStatus } from "./features/service-status/checkServiceStatus.js";

import { getAuthenticatedUser } from "./features/auth/getAuthenticatedUser.js";

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
  const user = getAuthenticatedUser(request);

  if (!user) {
    return reply.status(401).send({
      authenticated: false,
    });
  }

  return {
    authenticated: true,
    user,
  };
});

app.get("/api/services/status", async (request, reply) => {
  const user = getAuthenticatedUser(request);

  if (!user) {
    return reply.status(401).send({
      message: "Authentication required",
    });
  }

  if (!user.isAdmin && !user.isFamily) {
    return reply.status(403).send({
      message: "Access denied",
    });
  }

  const allowedServices = user.isAdmin
    ? serviceTargets
    : serviceTargets.filter((service) => service.access === "family");

  const services = await Promise.all(
    allowedServices.map((service) =>
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
