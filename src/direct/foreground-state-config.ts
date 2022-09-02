import { thriftDescriptors, ThriftPacketDescriptor } from '@igpapi/mqttot';

export const foregroundStateConfig: ThriftPacketDescriptor[] = [
  thriftDescriptors.boolean('inForegroundApp', 1),
  thriftDescriptors.boolean('inForegroundDevice', 2),
  thriftDescriptors.int32('keepAliveTimeout', 3),
  thriftDescriptors.listOfBinary('subscribeTopics', 4),
  thriftDescriptors.listOfBinary('subscribeGenericTopics', 5),
  thriftDescriptors.listOfBinary('unsubscribeTopics', 6),
  thriftDescriptors.listOfBinary('unsubscribeGenericTopics', 7),
  thriftDescriptors.int64('requestId', 8),
];
