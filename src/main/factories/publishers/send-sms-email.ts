import { RabbitMQInterface } from "@/data/interfaces";
import { SendSMSEmail } from "@/data/usecases";
import { RabbitMQ } from "@/infra/message-broker/rabbitmq-adapter";
import { SendSMSEmailController } from "@/presentation/controllers";

export const makeSendSMSEmail = (
  rabbitMQ: RabbitMQInterface
): SendSMSEmailController => {
  const smsemail = new SendSMSEmail(rabbitMQ);
  return new SendSMSEmailController(smsemail);
};
