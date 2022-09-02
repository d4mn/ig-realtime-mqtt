import { RealtimeMqttClient } from './igpapi.realtime.mqtt';
export declare abstract class RealtimeMqttStrategy {
    abstract build(): RealtimeMqttClient;
    abstract connect(client: RealtimeMqttClient): any;
    abstract setup(client: RealtimeMqttClient): void;
}
//# sourceMappingURL=realtime.mqtt.strategy.d.ts.map