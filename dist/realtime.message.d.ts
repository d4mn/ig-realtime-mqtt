import { MqttMessage } from 'mqtts';
export interface RealtimeMessage<T> extends Omit<MqttMessage, 'payload'> {
    payload: T;
}
//# sourceMappingURL=realtime.message.d.ts.map