export default async function (fastify, options) {
  fastify.route({
    method: "GET",
    url: "/health",
    handler(request) {
      request.log.debug("Health check");
      return {
        status: "healthy",
      };
    },
  });
}
