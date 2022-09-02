import { Observable } from 'rxjs';
import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';
import { DirectEventToPayload } from './direct-event-to-payload';
import { DirectThreadEventEnum } from './direct-thread-event.enum';
import { DirectThreadEvent } from './direct-thread.event';
export declare type DirectEventsOperationObservables<T> = {
    $: Observable<DirectThreadEvent<T>>;
} & {
    [P in keyof typeof RealtimeOperationTypeEnum as `${P}$`]: Observable<DirectThreadEvent<T>>;
};
export declare type DirectEventTypesFacade = {
    [P in keyof typeof DirectThreadEventEnum]: DirectEventsOperationObservables<DirectEventToPayload[typeof DirectThreadEventEnum[P]]>;
};
export declare function directObservablesFacadeMixin<T extends DirectThreadEvent>(obj: {
    $: Observable<T>;
}): void;
//# sourceMappingURL=direct-observables-facade.mixin.d.ts.map