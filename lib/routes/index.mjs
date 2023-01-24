export default async function (fastify, options) {
  fastify.register(await import("./health/index.mjs"));
  fastify.register(await import("./query/index.mjs"), {
    prefix: "/v1",
  });
}
