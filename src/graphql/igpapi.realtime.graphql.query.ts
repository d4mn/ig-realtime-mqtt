import { IgpapiRealtimeGraphqlQueryId } from './igpapi.realtime.graphql.query-id';
import { IgpapiRealtimeGraphqlSubscription } from './igpapi.realtime.graphql.subscription.js';

export class IgpapiRealtimeGraphqlQuery {
  constructor(private subscription: IgpapiRealtimeGraphqlSubscription) {}

  public appPresence() {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.appPresence, {});
  }

  public asyncAd(userId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.asyncAdSub, {
      user_id: userId,
    });
  }

  /**
   * You aren't supposed to use this while connecting, it isn't handled correctly
   */
  public clientConfigUpdate() {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.clientConfigUpdate, {});
  }

  public directStatus() {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.directStatus, {});
  }

  public directTyping(userId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.directTyping, {
      user_id: userId,
    });
  }

  public liveWave(broadcastId: string, receiverId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.liveWave, {
      broadcast_id: broadcastId,
      receiver_id: receiverId,
    });
  }

  public interactivityActivateQuestion(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.interactivityActivateQuestion, {
      broadcast_id: broadcastId,
    });
  }

  public interactivityRealtimeQuestionSubmissionsStatus(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.interactivityRealtimeQuestionSubmissionsStatus, {
      broadcast_id: broadcastId,
    });
  }

  public interactivity(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.interactivitySub, {
      broadcast_id: broadcastId,
    });
  }

  public liveRealtimeComments(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.liveRealtimeComments, {
      broadcast_id: broadcastId,
    });
  }

  public liveTypingIndicator(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.liveTypingIndicator, {
      broadcast_id: broadcastId,
    });
  }

  public mediaFeedback(feedbackId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.mediaFeedback, {
      feedback_id: feedbackId,
    });
  }

  public reactNativeOTAUpdate(buildNumber: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.reactNativeOTA, {
      build_number: buildNumber,
    });
  }

  public videoCallCoWatchControl(videoCallId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.videoCallCoWatchControl, {
      video_call_id: videoCallId,
    });
  }

  public videoCallInCallAlert(videoCallId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.videoCallInAlert, {
      video_call_id: videoCallId,
    });
  }

  public videoCallPrototypePublish(videoCallId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.videoCallPrototypePublish, {
      video_call_id: videoCallId,
    });
  }

  public zeroProvision(deviceId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.zeroProvision, {
      device_id: deviceId,
    });
  }

  public livePinnedProduct(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.livePinnedProduct, {
      broadcast_id: broadcastId,
    });
  }

  public liveReactions(broadcastId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.liveReactions, {
      broadcast_id: broadcastId,
    });
  }

  public userThreadPresence(threadId: string, userId: string) {
    return this.subscription.generate(IgpapiRealtimeGraphqlQueryId.userThreadPresence, {
      thread_id: threadId,
      user_id: userId,
    });
  }
}
