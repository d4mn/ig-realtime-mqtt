import { generateIdentifier, isPubAck, isPublish, PacketType } from 'mqtts';
import { RealtimeMqttFlowFunc } from './igpapi.realtime.mqtt';

export function multiTopicPublish(
  requestTopic: string,
  responseTopic: string,
): (payload: Buffer) => RealtimeMqttFlowFunc<Buffer> {
  return (payload: Buffer) => {
    const id = generateIdentifier();
    return success => ({
      start: () => ({
        type: PacketType.Publish,
        options: {
          topic: requestTopic,
          payload: payload,
          qos: 1,
          retain: false,
          duplicate: false,
          identifier: id,
        },
      }),
      accept: packet =>
        (isPublish(packet) && packet.topic === responseTopic) || (isPubAck(packet) && packet.identifier === id),
      next: packet => {
        if (isPubAck(packet)) return undefined;
        else if (isPublish(packet)) success(packet.payload);
      },
    });
  };
}
