import { ApiResponse } from "../../common/api/interfaces/apiReponse";

export interface IChat {
    id: number;
    restaurant: string;
    client: string;
    last_message: any;
  }

export interface ChatApiResponse extends ApiResponse<IChat> {}