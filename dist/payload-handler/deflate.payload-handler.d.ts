/// <reference types="node" />
import { RealtimePayloadHandler } from './realtime.payload-handler';
export declare class DeflatePayloadHandler extends RealtimePayloadHandler {
    compress(data: Buffer): Promise<Buffer>;
}
//# sourceMappingURL=deflate.payload-handler.d.ts.map