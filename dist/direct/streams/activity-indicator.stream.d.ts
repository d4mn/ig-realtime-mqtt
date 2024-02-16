import { Observable } from 'rxjs';
import { RealtimeTopic } from '../../realtime.topic';
import { RealtimeMessage } from '../../realtime.message';
import { ThreadActivityIndicatorPayload } from '../payloads';
import { DirectThreadEvent } from '../direct-thread.event';
export declare function activityIndicatorStream(topics: RealtimeTopic): <T extends RealtimeMessage<any>>(source$: Observable<T>) => Observable<DirectThreadEvent<ThreadActivityIndicatorPayload>>;
//# sourceMappingURL=activity-indicator.stream.d.ts.map