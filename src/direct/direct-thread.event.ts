import { RealtimeEvent } from '../realtime.event';
import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';

export interface DirectThreadEvent<T = any> extends RealtimeEvent<T> {
  thread_id: string;
  operation: RealtimeOperationTypeEnum;
  path: string;
}
