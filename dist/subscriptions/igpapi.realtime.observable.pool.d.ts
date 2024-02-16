import { Observable } from 'rxjs';
import { SubscriptionManager } from './subscription-manager.js';
import { SubscriptionEntity } from './subscription-entity.js';
import { RealtimeSubject } from '../realtime.subject.js';
export declare class IgpapiRealtimeObservablePool {
    #private;
    private readonly subscriptions;
    private readonly subject;
    constructor(subscriptions: SubscriptionManager, subject: RealtimeSubject);
    create(sub: SubscriptionEntity): Observable<any>;
}
//# sourceMappingURL=igpapi.realtime.observable.pool.d.ts.map