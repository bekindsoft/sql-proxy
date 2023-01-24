import Fastify from "fastify";

export const init = async function () {
  const fastify = Fastify({
    logger: {
      level: "debug",
    },
  });

  fastify.register(await import("./plugins/db.mjs"), {
    connectionString: "postgres://pigeon:aa@localhost/pigeondb",
  });

  fastify.register(await import("@fastify/routes"));

  fastify.register(await import("./routes/index.mjs"));

  return fastify;
};
