import { SendSMSEdmilModel } from "@/domain/models";

export interface SendSMSEmailParams {
  type: string;
  key: string;
  content: string;
  partner?: string;
}

export interface UCSendSMSEmail {
  handle(params: SendSMSEmailParams): Promise<SendSMSEdmilModel>;
}
