import { sql } from "@databases/pg";

export default async function (fastify, options) {
  fastify.route({
    method: "POST",
    url: "/query",
    async handler(request) {
      request.log.debug(`Query: ${request.body.query_string}`);
      const result = await fastify.pg.query(
        sql`${sql.__dangerous__rawValue(request.body.query_string)}`
      );
      return {
        data: result,
      };
    },
  });
}
