import Fastify from "fastify";

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
