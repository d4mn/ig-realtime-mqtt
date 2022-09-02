"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgpapiRealtimeLive = void 0;
class IgpapiRealtimeLive {
    constructor(input, liveComments, liveReaction) {
        this.input = input;
        this.liveComments = liveComments;
        this.liveReaction = liveReaction;
    }
    get comments() {
        return this.liveComments.create(this.input.broadcastId);
    }
    get reaction() {
        return this.liveReaction.create(this.input.broadcastId);
    }
}
exports.IgpapiRealtimeLive = IgpapiRealtimeLive;
//# sourceMappingURL=igpapi.realtime.live.js.map