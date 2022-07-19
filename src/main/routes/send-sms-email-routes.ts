import { RabbitMQInterface } from "@/data/interfaces";
import { Router } from "express";
import { makeSendSMSEmail } from "../factories/publishers";
import { AdaptRoute } from "../route-adapter";

export default (router: Router, rabbitMQ: RabbitMQInterface): void => {
  router.post("/send-sms-email", AdaptRoute(makeSendSMSEmail(rabbitMQ)));
};
