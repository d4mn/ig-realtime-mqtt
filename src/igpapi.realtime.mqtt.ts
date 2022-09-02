// create requirements for the client
import {
  DefaultPacketReadResultMap,
  DefaultPacketWriteOptions,
  MqttClient,
  PacketFlowFunc,
  PacketType,
  PublishAckPacket,
  PublishPacketOptions,
  PublishRequestPacket,
} from 'mqtts';

type RealtimeMqttReadMap = Omit<
  Record<keyof DefaultPacketReadResultMap, any>,
  PacketType.Publish | PacketType.PubAck
> & {
  [PacketType.Publish]: PublishRequestPacket;
  [PacketType.PubAck]: PublishAckPacket;
};
type RealtimeMqttWriteMap = Omit<Record<keyof DefaultPacketWriteOptions, any>, PacketType.Publish> & {
  [PacketType.Publish]: PublishPacketOptions;
};
export type RealtimeMqttClient = MqttClient<RealtimeMqttReadMap, RealtimeMqttWriteMap>;
export type RealtimeMqttFlowFunc<T> = PacketFlowFunc<RealtimeMqttReadMap, RealtimeMqttWriteMap, T>;
