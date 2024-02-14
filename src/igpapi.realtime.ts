import { MqttMessage } from "mqtts";
import debug from "debug";
import { RealtimeMqttManager } from "./realtime.mqtt.manager";
import { RealtimeMqttStrategy } from "./realtime.mqtt.strategy";
import { SubscriptionManager } from "./subscriptions/subscription-manager";
import { RealtimeSubject } from "./realtime.subject";
import { RealtimeTopic } from "./realtime.topic";
import { fromEvent, Subscription } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { tryUnzipAsync } from "@igpapi/mqttot";
import { RealtimeMessage } from "./realtime.message";
import { graphqlTransformer } from "./transformers/graphql.transformer";
import { skywalkerTransformer } from "./transformers/skywalker.transformer";
import { EventEmitter } from "stream";
import { RealtimeDirect } from "./direct";

const log = debug("ig:realtime:core");

export class IgpapiRealtime extends EventEmitter {
  /**
   * Global event bus.
   */
  public $;
  private safeDisconnect = false;
  #subscription?: Subscription;

  constructor(
    private readonly strategy: RealtimeMqttStrategy,
    public readonly mqtt: RealtimeMqttManager,
    private readonly subject: RealtimeSubject,
    public readonly subscriptions: SubscriptionManager,
    public readonly topic: RealtimeTopic,
    public readonly direct: RealtimeDirect
  ) {
    super();
    this.$ = this.subject.asObservable();
  }

  public async connect() {
    log("Connecting...");
    const client = this.mqtt.hasClient() ? this.mqtt.client() : this.mqtt.create();
    // Need to unsubscribe to prevent memory leaks
    this.#subscription?.unsubscribe();
    this.#subscription = fromEvent<MqttMessage>(client as any, "message")
      .pipe(
        mergeMap(async (message: RealtimeMessage<any>) => {
          message.payload = await tryUnzipAsync(message.payload);
          if (message.topic === this.topic.RealtimeSub) {
            message.payload = graphqlTransformer(message.payload);
          } else if (message.topic === this.topic.Pubsub) {
            message.payload = skywalkerTransformer(message.payload);
          } else if (message.topic === this.topic.RegionHint) {
            message.payload = graphqlTransformer(message.payload).topic;
          } else {
            try {
              message.payload = JSON.parse(message.payload.toString());
            } catch (e) {
              log(`Cant parse message payload ${JSON.stringify(message)}`);
            }
          }
          return message;
        })
      )
      .subscribe(this.subject);
    this.setupListeners();

    // do this so the promise only resolves once the client is fully connected, but support multiple connect attempts
    await Promise.all([
      new Promise<void>((res, rej) =>
        client.on("connect", async (packet) => {
          this.emit("connect", packet);
          log("Connected.");
          try {
            await this.subscriptions.restore();
            await this.strategy.setup(client);
            res();
          } catch (e) {
            rej(e);
          }
        })
      ),
      this.strategy.connect(client),
    ]);
  }

  public disconnect(): Promise<any> {
    this.safeDisconnect = true;
    return this.mqtt.client().disconnect();
  }

  protected setupListeners() {
    log(`Setting up listeners`);
    const messageDebug = log.extend("message");
    this.mqtt.client().on("message", (m) => {
      messageDebug(`topic: ${this.topic.decode(m.topic)} QoS: ${m.qosLevel} length: ${m.payload.byteLength} bytes`);
    });
    this.mqtt.client().on("error", (e) => {
      log(`MQTTS-Error:`, e);
    });
    this.mqtt.client().on("warning", (e) => {
      log(`MQTTS-Warning:`, e);
    });
    this.mqtt.client().on("disconnect", (e) => {
      this.emit("disconnect", e);
      if (!this.safeDisconnect) {
        log("Client disconnected.");
      } else {
        log("Session ended.");
        this.safeDisconnect = false;
      }
    });
  }
}
