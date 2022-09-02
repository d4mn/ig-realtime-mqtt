import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DirectThreadEvent } from '../direct-thread.event';

/**
 * Filters thread event by thread id
 * @param id - one thread id or array of thread ids
 */
export function filterThreadById(id: string | string[]) {
  const _id = id instanceof Array ? id : [id];
  return <T extends DirectThreadEvent>(source$: Observable<T>) => {
    return source$.pipe(filter(e => _id.includes(e.thread_id)));
  };
}
