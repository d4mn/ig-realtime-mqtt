/**
 * Works with payload. Dont compress the data.
 */
export class RealtimePayloadHandler {
  /**
   * Prepares the data to be sent. This method "converts" the input to a Buffer to be sent as a payload.
   */
  async prepare(payload: object | any[] | string | Buffer): Promise<Buffer> {
    const buf =
      payload instanceof Buffer
        ? payload
        : typeof payload === 'string'
        ? Buffer.from(payload)
        : Buffer.from(JSON.stringify(payload));
    return this.compress(buf);
  }

  async compress(data: Buffer) {
    return data;
  }
}
