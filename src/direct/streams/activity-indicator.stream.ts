import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RealtimeTopic } from '../../realtime.topic';
import { RealtimeMessage } from '../../realtime.message';
import { ActivityIndicatorPayload } from '../../payloads';
import { ActivityIndicatorRegex } from '../../constants';
import { DirectThreadEventEnum } from '../direct-thread-event.enum';
import { ThreadActivityIndicatorPayload } from '../payloads';
import { DirectThreadEvent } from '../direct-thread.event';
import { SkywalkerMessageTopic, SkywalkerTransformerResult } from '../../transformers/skywalker.transformer';

export function activityIndicatorStream(topics: RealtimeTopic) {
  return <T extends RealtimeMessage<any>>(source$: Observable<T>) => {
    let _payload: ActivityIndicatorPayload;
    return source$.pipe(
      filter(
        (
          message: RealtimeMessage<SkywalkerTransformerResult<unknown>>,
        ): message is RealtimeMessage<SkywalkerTransformerResult<ActivityIndicatorPayload>> =>
          message.topic === topics.Pubsub && message.payload.topic === SkywalkerMessageTopic.ActivityIndicator,
      ),
      mergeMap(message => {
        _payload = message.payload.message;
        return message.payload.message.data;
      }),
      // Need to do it because otherwise .raw() method of all previous items will always return the same latest response
      map(data => [data, _payload] as const),
      map(([data, payload]): DirectThreadEvent<ThreadActivityIndicatorPayload> | undefined => {
        const match = ActivityIndicatorRegex(data.path);
        if (!match) {
          return void 0;
        }
        return {
          name: DirectThreadEventEnum.activityIndicator,
          data: Object.assign({ doublePublish: data.doublePublish }, JSON.parse(data.value), match),
          path: data.path,
          operation: data.op,
          thread_id: match.thread_id,
          raw() {
            return payload;
          },
        };
      }),
      filter(<M>(data: M | undefined): data is M => typeof data !== 'undefined'),
    );
  };
}
