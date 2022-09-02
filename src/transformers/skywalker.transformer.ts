import { thriftDescriptors, thriftReadToObject } from '@igpapi/mqttot';

export enum SkywalkerMessageTopic {
  ActivityIndicator = 1,
  // IgLiveRealtimeEventHandler, probably for managing the ReelsTray and showing who's live; also: they're probably using Kotlin in thi case
  LiveNotification,
  // IgVideoRealtimeEventHandler, probably when the user is "in" the livestream
  LiveUnknown,
  // may overlap with some Gql topic; UnifiedRealtimeEventHandler$onRealtimeEventPayload$1
  VideoCall,
}

export interface SkywalkerTransformerResult<T> {
  topic: SkywalkerMessageTopic;
  message: T;
}

export function skywalkerTransformer<T>(data: Buffer): SkywalkerTransformerResult<T> {
  const parsed = thriftReadToObject<{ message: string; topic: number }>(data, [
    thriftDescriptors.int32('topic', 1),
    thriftDescriptors.binary('message', 2),
  ]);
  return {
    topic: parsed.topic ?? -1,
    message: JSON.parse(parsed.message ?? '""'),
  };
}
