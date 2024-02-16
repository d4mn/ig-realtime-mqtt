"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgpapiRealtimeGraphqlQuery = void 0;
const igpapi_realtime_graphql_query_id_1 = require("./igpapi.realtime.graphql.query-id");
class IgpapiRealtimeGraphqlQuery {
    constructor(subscription) {
        this.subscription = subscription;
    }
    appPresence() {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.appPresence, {});
    }
    asyncAd(userId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.asyncAdSub, {
            user_id: userId,
        });
    }
    clientConfigUpdate() {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.clientConfigUpdate, {});
    }
    directStatus() {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.directStatus, {});
    }
    directTyping(userId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.directTyping, {
            user_id: userId,
        });
    }
    liveWave(broadcastId, receiverId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.liveWave, {
            broadcast_id: broadcastId,
            receiver_id: receiverId,
        });
    }
    interactivityActivateQuestion(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.interactivityActivateQuestion, {
            broadcast_id: broadcastId,
        });
    }
    interactivityRealtimeQuestionSubmissionsStatus(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.interactivityRealtimeQuestionSubmissionsStatus, {
            broadcast_id: broadcastId,
        });
    }
    interactivity(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.interactivitySub, {
            broadcast_id: broadcastId,
        });
    }
    liveRealtimeComments(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.liveRealtimeComments, {
            broadcast_id: broadcastId,
        });
    }
    liveTypingIndicator(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.liveTypingIndicator, {
            broadcast_id: broadcastId,
        });
    }
    mediaFeedback(feedbackId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.mediaFeedback, {
            feedback_id: feedbackId,
        });
    }
    reactNativeOTAUpdate(buildNumber) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.reactNativeOTA, {
            build_number: buildNumber,
        });
    }
    videoCallCoWatchControl(videoCallId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.videoCallCoWatchControl, {
            video_call_id: videoCallId,
        });
    }
    videoCallInCallAlert(videoCallId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.videoCallInAlert, {
            video_call_id: videoCallId,
        });
    }
    videoCallPrototypePublish(videoCallId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.videoCallPrototypePublish, {
            video_call_id: videoCallId,
        });
    }
    zeroProvision(deviceId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.zeroProvision, {
            device_id: deviceId,
        });
    }
    livePinnedProduct(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.livePinnedProduct, {
            broadcast_id: broadcastId,
        });
    }
    liveReactions(broadcastId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.liveReactions, {
            broadcast_id: broadcastId,
        });
    }
    userThreadPresence(threadId, userId) {
        return this.subscription.generate(igpapi_realtime_graphql_query_id_1.IgpapiRealtimeGraphqlQueryId.userThreadPresence, {
            thread_id: threadId,
            user_id: userId,
        });
    }
}
exports.IgpapiRealtimeGraphqlQuery = IgpapiRealtimeGraphqlQuery;
//# sourceMappingURL=igpapi.realtime.graphql.query.js.map