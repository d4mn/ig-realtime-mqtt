import { Observable } from 'rxjs';
import { DirectThreadEvent } from '../direct-thread.event';
import { filter } from 'rxjs/operators';
import { DirectThreadEventEnum } from '../direct-thread-event.enum';
import { DirectEventToPayload } from '../direct-event-to-payload';

type FilteredThreadObservable<T extends DirectThreadEventEnum> = (
  source$: Observable<DirectThreadEvent>,
) => Observable<DirectThreadEvent<DirectEventToPayload[T]>>;

/**
 * Simply filters all direct incoming events by event type and operation type
 * @param event
 */
export function filterThreadByType<T extends DirectThreadEventEnum>(event: T): FilteredThreadObservable<T> {
  return (source$: Observable<DirectThreadEvent>) => {
    return source$.pipe(filter(e => e.name === event));
  };
}
