import { ConnectError, MqttsReconnectStrategy } from "mqtts";
import { AndroidState } from "./state";

export class ReconnectStrategy implements MqttsReconnectStrategy {
  #attempts = 1;
  constructor(
    readonly state: AndroidState,
    /**
     * Maximum attempts amount
     */
    private maximum: number = 60,
    /**
     * Interval between attempts, milliseconds
     */
    private interval: number = 1000
  ) {}
  check(reason?: any) {
    console.log("ReconnectStrategy.check", reason.message, reason instanceof ConnectError, "user", this.state.user, "attempt #" + this.#attempts);
    if (reason instanceof ConnectError) {
      console.log("Return status for check: ", ["IdentifierRejected", "ServerUnavailable", "NotAuthorized"].includes(reason.status));
      return ["IdentifierRejected", "ServerUnavailable", "NotAuthorized"].includes(reason.status);
    }
    if (typeof reason === "string" && ["Soft disconnect", "Forced disconnect"].includes(reason)) {
      return false;
    }
    console.log("Unknown instance");
    return this.#attempts <= this.maximum;
  }

  reset() {
    this.#attempts = 1;
  }

  wait(): Promise<void> {
    this.#attempts++;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.interval);
    });
  }
}
