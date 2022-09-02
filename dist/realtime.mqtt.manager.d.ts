import { RealtimeMqttStrategy } from './realtime.mqtt.strategy';
import { RealtimeMqttClient } from './igpapi.realtime.mqtt';
export declare class RealtimeMqttManager {
    private readonly builder;
    private _client?;
    constructor(builder: RealtimeMqttStrategy);
    create(): RealtimeMqttClient;
    client(): RealtimeMqttClient;
    hasClient(): boolean;
}
//# sourceMappingURL=realtime.mqtt.manager.d.ts.map