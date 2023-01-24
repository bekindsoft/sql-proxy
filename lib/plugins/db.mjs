import createConnectionPool from "@databases/pg";
import fp from "fastify-plugin";

async function db(fastify, options) {
  const conn = createConnectionPool(options.connectionString);
  fastify.onClose(() => conn.dispose());
  fastify.decorate("pg", conn);
}

const plugin = fp(db);

export default plugin;
