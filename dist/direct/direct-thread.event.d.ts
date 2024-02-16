import { RealtimeEvent } from '../realtime.event';
import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';
export interface DirectThreadEvent<T = any> extends RealtimeEvent<T> {
    thread_id: string;
    operation: RealtimeOperationTypeEnum;
    path: string;
}
//# sourceMappingURL=direct-thread.event.d.ts.map