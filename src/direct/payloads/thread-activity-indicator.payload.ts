export interface ThreadActivityIndicatorPayload {
  doublePublish: boolean;
  thread_id: string;
  activity_indicator_id: string;
  timestamp: string;
  sender_id: string;
  ttl: number;
  activity_status: number;
}
