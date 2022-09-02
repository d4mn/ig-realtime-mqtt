import { RealtimePayloadHandler } from './realtime.payload-handler';
import { deflate } from 'zlib';

/**
 * Just deflates payload
 */
export class DeflatePayloadHandler extends RealtimePayloadHandler {
  async compress(data: Buffer) {
    return new Promise<Buffer>((resolve, reject) =>
      deflate(data, { level: 9 }, (error, result) => (error ? reject(error) : resolve(result))),
    );
  }
}
