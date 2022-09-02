import { forIn } from 'lodash';
import { Observable } from 'rxjs';
import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';
import { DirectEventToPayload } from './direct-event-to-payload';
import { DirectThreadEventEnum } from './direct-thread-event.enum';
import { DirectThreadEvent } from './direct-thread.event';
import { filterThreadByOperation } from './filters/filter-thread-by-operation';
import { filterThreadByType } from './filters/filter-thread-by-type';

export type DirectEventsOperationObservables<T> = { $: Observable<DirectThreadEvent<T>> } & {
  [P in keyof typeof RealtimeOperationTypeEnum as `${P}$`]: Observable<DirectThreadEvent<T>>;
};

export type DirectEventTypesFacade = {
  [P in keyof typeof DirectThreadEventEnum]: DirectEventsOperationObservables<
    DirectEventToPayload[typeof DirectThreadEventEnum[P]]
  >;
};

interface DirectEventsOperationsFacade extends DirectEventsOperationObservables<any> {}

class DirectEventsOperationsFacade {
  constructor(public $: Observable<any>) {
    forIn(RealtimeOperationTypeEnum, (value, key) => {
      Object.assign(this, { [`${key}$`]: $.pipe(filterThreadByOperation(value)) });
    });
  }
}

export function directObservablesFacadeMixin<T extends DirectThreadEvent>(obj: { $: Observable<T> }) {
  forIn(DirectThreadEventEnum, (value, key) => {
    const operations = new DirectEventsOperationsFacade(obj.$.pipe(filterThreadByType(value)));
    Object.assign(obj, {
      [key]: operations,
    });
  });
}
