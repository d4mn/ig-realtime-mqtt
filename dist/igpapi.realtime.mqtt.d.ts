import { DefaultPacketReadResultMap, DefaultPacketWriteOptions, MqttClient, PacketFlowFunc, PacketType, PublishAckPacket, PublishPacketOptions, PublishRequestPacket } from 'mqtts';
declare type RealtimeMqttReadMap = Omit<Record<keyof DefaultPacketReadResultMap, any>, PacketType.Publish | PacketType.PubAck> & {
    [PacketType.Publish]: PublishRequestPacket;
    [PacketType.PubAck]: PublishAckPacket;
};
declare type RealtimeMqttWriteMap = Omit<Record<keyof DefaultPacketWriteOptions, any>, PacketType.Publish> & {
    [PacketType.Publish]: PublishPacketOptions;
};
export declare type RealtimeMqttClient = MqttClient<RealtimeMqttReadMap, RealtimeMqttWriteMap>;
export declare type RealtimeMqttFlowFunc<T> = PacketFlowFunc<RealtimeMqttReadMap, RealtimeMqttWriteMap, T>;
export {};
//# sourceMappingURL=igpapi.realtime.mqtt.d.ts.map