import { Observable } from 'rxjs';
import { DirectThreadEvent } from '../direct-thread.event';
export declare function filterThreadById(id: string | string[]): <T extends DirectThreadEvent<any>>(source$: Observable<T>) => Observable<T>;
//# sourceMappingURL=filter-thread-by-id.d.ts.map