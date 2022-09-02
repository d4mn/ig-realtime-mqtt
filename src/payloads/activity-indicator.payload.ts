import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';

export interface ActivityIndicatorBasePayload {
  publish_metadata?: ActivityIndicatorPublishMetadata;
  lazy: boolean;
  event: 'patch' | string;
  num_endpoints?: number;
}

export interface ActivityIndicatorPayload extends ActivityIndicatorBasePayload {
  data: ActivityIndicatorPayloadData[];
}

export interface ActivityIndicatorPayloadData {
  doublePublish: boolean;
  value: string;
  path: string;
  op: RealtimeOperationTypeEnum;
}

export interface ActivityIndicatorPublishMetadata {
  publish_time_ms: string;
  topic_publish_id: number;
}
