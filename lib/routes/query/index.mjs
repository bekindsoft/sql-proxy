import { sql } from "@databases/pg";

export default async function (fastify, options) {
  fastify.route({
    method: "POST",
    url: "/query",
    async handler(request) {
      request.log.debug(`Query: ${request.body.query_string}`);
      const results = await fastify.pg.query(
        sql`${sql.__dangerous__rawValue(request.body.query_string)}`
      );
      request.log.debug({ results, rows: results.rows }, 'Query result');
      const result = results[0];
      // TODO: this is just trying to parse js types into pg types. I need to find a way to get
      // the actual pg types from the query.
      const metadata = {};
      if (result) {
        Object.keys(result).forEach((key) => {
          const objType = typeof result[key];
          if (objType !== "object") {
            if (objType === "string") {
              metadata[key] = "text";
              return;
            }

            if (objType === "number") {
              metadata[key] = "numeric";
              return;
            }

            metadata[key] = objType;
            return;
          }

          if (result[key] instanceof Date) {
            metadata[key] = "timestamptz";
            return;
          }

          if (result[key] instanceof Buffer) {
            metadata[key] = "buffer";
            return;
          }

          if (result[key] instanceof Array) {
            metadata[key] = "array";
            return;
          }

          if (result[key] instanceof Object) {
            metadata[key] = "object";
            return;
          }

          if (result[key] === null) {
            metadata[key] = "object";
            return;
          }
          metadata[key] = "unknown";
        });
      }

      const data = results.map((result) => Object.values(result));
      return {
        query_string: request.body.query_string,
        metadata,
        data,
      };
    },
  });
}
