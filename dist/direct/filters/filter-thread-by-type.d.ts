import { Observable } from 'rxjs';
import { DirectThreadEvent } from '../direct-thread.event';
import { DirectThreadEventEnum } from '../direct-thread-event.enum';
import { DirectEventToPayload } from '../direct-event-to-payload';
declare type FilteredThreadObservable<T extends DirectThreadEventEnum> = (source$: Observable<DirectThreadEvent>) => Observable<DirectThreadEvent<DirectEventToPayload[T]>>;
export declare function filterThreadByType<T extends DirectThreadEventEnum>(event: T): FilteredThreadObservable<T>;
export {};
//# sourceMappingURL=filter-thread-by-type.d.ts.map