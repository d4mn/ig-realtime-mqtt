"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgpapiRealtimeGraphqlSubscription = void 0;
const crypto_1 = require("crypto");
class IgpapiRealtimeGraphqlSubscription {
    constructor(topic) {
        this.topic = topic;
    }
    generate(queryId, inputParams) {
        const topic = this.topic.RealtimeSub;
        const sub = `1/graphqlsubscriptions/${queryId}/${JSON.stringify({
            input_data: {
                client_subscription_id: (0, crypto_1.randomUUID)(),
                ...inputParams,
            },
            ...(this.clientLogged ? { '%options': { client_logged: this.clientLogged } } : {}),
        })}`;
        return {
            topic,
            sub,
        };
    }
}
exports.IgpapiRealtimeGraphqlSubscription = IgpapiRealtimeGraphqlSubscription;
//# sourceMappingURL=igpapi.realtime.graphql.subscription.js.map