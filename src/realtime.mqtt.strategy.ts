import { RealtimeMqttClient } from './igpapi.realtime.mqtt';

export abstract class RealtimeMqttStrategy {
  /**
   * Should build platform-specific mqtt client
   */
  abstract build(): RealtimeMqttClient;
  /**
   * Should connect to the client returned from the `.build()` method
   */
  abstract connect(client: RealtimeMqttClient): any;
  /**
   * Called after the connection is done.
   */
  abstract setup(client: RealtimeMqttClient): void;
}
