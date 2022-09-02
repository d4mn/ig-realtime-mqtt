import { RealtimeMqttStrategy } from './realtime.mqtt.strategy';
import { RealtimeMqttClient } from './igpapi.realtime.mqtt';

export class RealtimeMqttManager {
  private _client?: RealtimeMqttClient;

  constructor(private readonly builder: RealtimeMqttStrategy) {}

  create() {
    this._client = this.builder.build();
    return this._client;
  }

  client() {
    if (!this._client) {
      throw new Error('No mqtt client created. You probably should connect first');
    }
    return this._client;
  }

  hasClient() {
    return !!this._client;
  }
}
