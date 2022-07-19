import { RabbitMQInterface } from "@/data/interfaces";
import { SendSMSEdmilModel } from "@/domain/models";
import { SendSMSEmailParams, UCSendSMSEmail } from "@/domain/usecases";

export class SendSMSEmail implements UCSendSMSEmail {
  constructor(private readonly rabbitmq: RabbitMQInterface) {}

  async handle(params: SendSMSEmailParams): Promise<SendSMSEdmilModel> {
    const response = await this.rabbitmq.publishInExchange(
      "send_sms_email",
      "route_send_pending",
      JSON.stringify(params)
    );
    if (response) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
