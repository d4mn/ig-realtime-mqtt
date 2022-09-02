import { Observable } from 'rxjs';
import { RealtimeOperationTypeEnum } from '../../realtime-operation.type.enum';
import { DirectThreadEvent } from '../direct-thread.event';
export declare function filterThreadByOperation(operation: RealtimeOperationTypeEnum | RealtimeOperationTypeEnum[]): <T extends DirectThreadEvent<any>>(source$: Observable<T>) => Observable<T>;
//# sourceMappingURL=filter-thread-by-operation.d.ts.map