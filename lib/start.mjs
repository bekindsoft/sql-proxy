import { init } from "./index.mjs";

const main = async () => {
  const server = await init();
  try {
    server.listen({
      host: process.env.HOST || "0.0.0.0",
      port: process.env.PORT || 3000,
    });
    server.log.info(`server listening on ${server.server.address()}`);
    console.log("Routes", server.routes);
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
};

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
