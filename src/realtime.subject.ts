import { Subject } from 'rxjs';
import { RealtimeMessage } from './realtime.message';

/**
 * Event bus for all the realtime events.
 */

export class RealtimeSubject extends Subject<RealtimeMessage<any>> {}
