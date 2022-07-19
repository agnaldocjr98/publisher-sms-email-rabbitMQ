import {
  forbidden,
  ok,
  serverError,
  unauthorized,
} from "@/presentation/helpers/http-helper";
import { MissingParamError } from "../errors";
import { Controller } from "@/presentation/interfaces/controller";
import { HttpResponse } from "@/presentation/interfaces/http";
import { SendSMSEmailParams, UCSendSMSEmail } from "@/domain/usecases";

export class SendSMSEmailController implements Controller {
  constructor(private readonly SendSMSEmail: UCSendSMSEmail) {}
  async handle(httpRequest: any): Promise<HttpResponse> {
    const { body }: { body: SendSMSEmailParams } = httpRequest;

    if (!body.key) return forbidden(new MissingParamError("key"));
    if (!body.type) return forbidden(new MissingParamError("type"));
    if (!body.content) return forbidden(new MissingParamError("content"));
    if (body.type === "S") {
      if (!body.partner) return forbidden(new MissingParamError("partner"));
    }

    try {
      const response = await this.SendSMSEmail.handle(body);
      return response.success
        ? ok(response)
        : serverError(
            new Error("Falha ao colocar payload na fila do rabbitMQ")
          );
    } catch (error: any) {
      return serverError(error);
    }
  }
}
