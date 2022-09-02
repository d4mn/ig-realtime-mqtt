import { IgpapiRealtimeGraphqlSubscription } from './igpapi.realtime.graphql.subscription.js';
export declare class IgpapiRealtimeGraphqlQuery {
    private subscription;
    constructor(subscription: IgpapiRealtimeGraphqlSubscription);
    appPresence(): import("..").SubscriptionEntity;
    asyncAd(userId: string): import("..").SubscriptionEntity;
    clientConfigUpdate(): import("..").SubscriptionEntity;
    directStatus(): import("..").SubscriptionEntity;
    directTyping(userId: string): import("..").SubscriptionEntity;
    liveWave(broadcastId: string, receiverId: string): import("..").SubscriptionEntity;
    interactivityActivateQuestion(broadcastId: string): import("..").SubscriptionEntity;
    interactivityRealtimeQuestionSubmissionsStatus(broadcastId: string): import("..").SubscriptionEntity;
    interactivity(broadcastId: string): import("..").SubscriptionEntity;
    liveRealtimeComments(broadcastId: string): import("..").SubscriptionEntity;
    liveTypingIndicator(broadcastId: string): import("..").SubscriptionEntity;
    mediaFeedback(feedbackId: string): import("..").SubscriptionEntity;
    reactNativeOTAUpdate(buildNumber: string): import("..").SubscriptionEntity;
    videoCallCoWatchControl(videoCallId: string): import("..").SubscriptionEntity;
    videoCallInCallAlert(videoCallId: string): import("..").SubscriptionEntity;
    videoCallPrototypePublish(videoCallId: string): import("..").SubscriptionEntity;
    zeroProvision(deviceId: string): import("..").SubscriptionEntity;
    livePinnedProduct(broadcastId: string): import("..").SubscriptionEntity;
    liveReactions(broadcastId: string): import("..").SubscriptionEntity;
    userThreadPresence(threadId: string, userId: string): import("..").SubscriptionEntity;
}
//# sourceMappingURL=igpapi.realtime.graphql.query.d.ts.map