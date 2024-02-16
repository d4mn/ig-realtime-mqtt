export interface RealtimeEvent<T = any> {
    name: string;
    data: T;
    [x: string]: any;
    raw(): any;
}
//# sourceMappingURL=realtime.event.d.ts.map