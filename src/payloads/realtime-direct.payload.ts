export interface RealtimeDirectPayload {
  op: string;
  path: string;
  value: string;
  data: RealtimeDirectData;
}

export interface RealtimeDirectData {
  timestamp: string;
  sender_id: string;
  ttl: number;
  activity_status: number;
}
