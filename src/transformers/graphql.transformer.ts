import { thriftDescriptors, thriftReadToObject } from '@igpapi/mqttot';

export interface GraphQLTransformerResult<T> {
  topic: string;
  message: T;
}

export function graphqlTransformer<T>(data: Buffer): GraphQLTransformerResult<T> {
  const parsed = thriftReadToObject<{ message: string; topic: string }>(data, [
    thriftDescriptors.binary('topic', 1),
    thriftDescriptors.binary('message', 2),
  ]);
  return {
    topic: parsed.topic ?? '',
    message: JSON.parse(parsed.message ?? '""'),
  };
}
