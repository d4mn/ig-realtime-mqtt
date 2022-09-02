export interface IrisSubscribeErrorResponse {
  succeeded: false;
  seq_id?: any;
  error_type: number;
  error_message: string;
  subscribed_at_ms?: any;
  latest_seq_id?: any;
}

export interface IrisSubscribeSuccessResponse {
  succeeded: true;
  seq_id: number;
  error_type: null;
  error_message: null;
  subscribed_at_ms: number;
  latest_seq_id: number;
}

export type IrisSubscribeResponse = IrisSubscribeErrorResponse | IrisSubscribeSuccessResponse;
