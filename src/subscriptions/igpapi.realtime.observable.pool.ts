import { Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { SubscriptionManager } from './subscription-manager.js';
import { SubscriptionEntity } from './subscription-entity.js';
import { RealtimeSubject } from '../realtime.subject.js';

/**
 * A higher-level subscription manager.
 * Creates shared observable per unique subscription and returns it if the same subscription was requested twice.
 * Sends unsubscribe signal when there are no more active subscribers on this observable.
 */
export class IgpapiRealtimeObservablePool {
  #storage = new Map<string, Observable<any>>();
  constructor(private readonly subscriptions: SubscriptionManager, private readonly subject: RealtimeSubject) {}
  create(sub: SubscriptionEntity): Observable<any> {
    const cacheKey = `${sub.sub}.${sub.topic}`;
    let observable = this.#storage.get(cacheKey);
    if (observable) {
      return observable;
    }
    observable = new Observable(subscriber => {
      this.subject
        .pipe(
          filter(m => m.topic === sub.topic),
          map(m => m.payload),
        )
        .subscribe(subscriber);
      this.subscriptions.subscribe(sub);
      return () => {
        this.subscriptions.unsubscribe(sub);
        this.#storage.delete(cacheKey);
      };
    }).pipe(share({ resetOnRefCountZero: true }));
    this.#storage.set(cacheKey, observable);
    return observable;
  }
}
