import { MqttsReconnectStrategy } from "mqtts";
import { AndroidState } from "./state";
export declare class ReconnectStrategy implements MqttsReconnectStrategy {
    #private;
    readonly state: AndroidState;
    private maximum;
    private interval;
    constructor(state: AndroidState, maximum?: number, interval?: number);
    check(reason?: any): boolean;
    reset(): void;
    wait(): Promise<void>;
}
//# sourceMappingURL=realtime.reconnect.strategy.d.ts.map