/// <reference types="node" />
export declare enum SkywalkerMessageTopic {
    ActivityIndicator = 1,
    LiveNotification = 2,
    LiveUnknown = 3,
    VideoCall = 4
}
export interface SkywalkerTransformerResult<T> {
    topic: SkywalkerMessageTopic;
    message: T;
}
export declare function skywalkerTransformer<T>(data: Buffer): SkywalkerTransformerResult<T>;
//# sourceMappingURL=skywalker.transformer.d.ts.map