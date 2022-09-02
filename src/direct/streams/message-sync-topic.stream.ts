import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RealtimeTopic } from '../../realtime.topic';
import debug from 'debug';
import { IrisPayload } from '../../payloads/iris.payload';
import { createTypedRegex } from '../../utilities';
import { DirectThreadEventEnum } from '../direct-thread-event.enum';
import {
  ThreadAdminUserIdsRegex,
  ThreadApprovalRequiredRegex,
  ThreadItemHasSeenRegex,
  ThreadItemRegex,
  ThreadReactionRegex,
  ThreadShhModeRegex,
  ThreadThemeRegex,
  ThreadUpdateRegex,
} from '../../constants';
import { DirectThreadEvent } from '../direct-thread.event';
import { RealtimeMessage } from '../../realtime.message';

const messageSyncDebug = debug('ig:realtime:core:mixin:message-sync');

const EVENT_REGEX_MAPPING: Array<[ReturnType<typeof createTypedRegex>, DirectThreadEventEnum]> = [
  [ThreadUpdateRegex, DirectThreadEventEnum.update],
  [ThreadItemRegex, DirectThreadEventEnum.message],
  [ThreadItemHasSeenRegex, DirectThreadEventEnum.hasSeen],
  [ThreadAdminUserIdsRegex, DirectThreadEventEnum.adminUserIds],
  [ThreadApprovalRequiredRegex, DirectThreadEventEnum.approvalRequired],
  [ThreadShhModeRegex, DirectThreadEventEnum.shhMode],
  [ThreadThemeRegex, DirectThreadEventEnum.theme],
  [ThreadReactionRegex, DirectThreadEventEnum.reaction],
];

export interface DirectThreadEventPathParsingResult {
  // Attributes extracted from path string
  attributes: {
    thread_id: string;
  } & Record<string, string>;
  eventName: string;
}

function matchDirectThreadPath(path: string): DirectThreadEventPathParsingResult | void {
  for (let [regex, eventName] of EVENT_REGEX_MAPPING) {
    const attributes = regex(path);
    if (attributes !== null) {
      return {
        attributes,
        eventName,
      } as DirectThreadEventPathParsingResult;
    }
  }
}

export function messageSyncTopicStream(topics: RealtimeTopic) {
  return <T extends RealtimeMessage<any>>(source$: Observable<T>) => {
    let _payload: IrisPayload;
    return source$.pipe(
      filter(
        (message: RealtimeMessage<any>): message is RealtimeMessage<IrisPayload[]> =>
          message.topic === topics.MessageSync,
      ),
      /**
       * MessageSync topic emits payload as array of payloads
       * so we use mergeMap here to emit every array item (unpack array)
       */
      mergeMap(message => message.payload),
      // Same as above comment
      mergeMap(payload => {
        _payload = payload;
        return payload.data;
      }),
      map(data => [data, matchDirectThreadPath(data.path), _payload] as const),
      map(([data, metadata, payload]): DirectThreadEvent | undefined => {
        if (!metadata) {
          messageSyncDebug(`Could not match message-sync path: ${data.path}`);
          return void 0;
        }
        let parsed: any;
        try {
          parsed = JSON.parse(data.value);
        } catch (e) {
          parsed = data.value;
        }
        return {
          name: metadata.eventName,
          thread_id: metadata.attributes.thread_id,
          data: Object.assign({}, parsed, metadata.attributes),
          path: data.path,
          operation: data.op,
          raw() {
            return payload;
          },
        };
      }),
      filter(<M>(data: M | undefined): data is M => typeof data !== 'undefined'),
    );
  };
}
