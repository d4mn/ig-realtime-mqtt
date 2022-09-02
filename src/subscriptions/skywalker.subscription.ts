import { AndroidState } from '../state';
import { SubscriptionEntity } from './subscription-entity';
import { RealtimeTopic } from '../realtime.topic';

export class SkywalkerSubscriptions {
  constructor(private topic: RealtimeTopic, private state: AndroidState) {}

  public directSub(userId: string | number | bigint = this.state.extractUserId()): SubscriptionEntity {
    return {
      topic: this.topic.Pubsub,
      sub: `ig/u/v1/${userId}`,
    };
  }
  public liveSub(userId: string | number | bigint = this.state.extractUserId()): SubscriptionEntity {
    return {
      topic: this.topic.Pubsub,
      sub: `ig/live_notification_subscribe/${userId}`,
    };
  }
}
