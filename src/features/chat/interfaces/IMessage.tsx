import { ApiResponse } from "../../common/api/interfaces/apiReponse";

export interface IMessage {
    id: number;
    chat: number;
    sender: string;
    message: string;
    status: string;
  }

export interface MessageApiResponse extends ApiResponse<IMessage> {}