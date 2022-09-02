import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RealtimeOperationTypeEnum } from '../../realtime-operation.type.enum';
import { DirectThreadEvent } from '../direct-thread.event';

/**
 * Filters thread event by operation type [[RealtimeOperationTypeEnum]]
 * @param operation - one operation or array of operations
 */
export function filterThreadByOperation(operation: RealtimeOperationTypeEnum | RealtimeOperationTypeEnum[]) {
  const _operation = operation instanceof Array ? operation : [operation];
  return <T extends DirectThreadEvent>(source$: Observable<T>) => {
    return source$.pipe(filter(e => _operation.includes(e.operation)));
  };
}
