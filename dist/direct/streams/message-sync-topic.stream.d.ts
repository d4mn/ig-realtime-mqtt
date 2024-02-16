import { Observable } from 'rxjs';
import { RealtimeTopic } from '../../realtime.topic';
import { DirectThreadEvent } from '../direct-thread.event';
import { RealtimeMessage } from '../../realtime.message';
export interface DirectThreadEventPathParsingResult {
    attributes: {
        thread_id: string;
    } & Record<string, string>;
    eventName: string;
}
export declare function messageSyncTopicStream(topics: RealtimeTopic): <T extends RealtimeMessage<any>>(source$: Observable<T>) => Observable<DirectThreadEvent<any>>;
//# sourceMappingURL=message-sync-topic.stream.d.ts.map