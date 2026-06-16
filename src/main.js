import app from "./interfaces/http/app.js";
import { env } from "./infrastructure/config/env.js";
import { connectMongo, disconnectMongo } from "./infrastructure/database/mongo/conection/mongoConnection.js";
import { createAdminUser } from "./infrastructure/database/mongo/seeds/createAdminUser.js";

const startServer = async () => {
  try {
    await connectMongo();
    await createAdminUser();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

    const shutdown = async () => {
      console.log("Shutting down application...");

      server.close(async () => {
        await disconnectMongo();

        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown); //Captura Ctrl+C
    process.on("SIGTERM", shutdown); //Captura cuando detenemos contenedor de Docker

  } catch (error) {
    console.error("Application startup failed:", error.message);
    process.exit(1);
  }
};

startServer();