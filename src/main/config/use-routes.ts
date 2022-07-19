import { RabbitMQ } from "@/infra/message-broker/rabbitmq-adapter";
import { Express, Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

export default (app: Express): void => {
  const rabbitMQ = new RabbitMQ(process.env.URI_SERVER_RABBITMQ as string);
  rabbitMQ.start();
  const router = Router();
  app.use("/api", router);
  readdirSync(join(__dirname, "../routes")).map(async (file) => {
    if (!file.endsWith(".map")) {
      (await import(`../routes/${file}`)).default(router, rabbitMQ);
    }
  });
};
