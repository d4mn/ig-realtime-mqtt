"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidState = exports.AndroidSession = exports.Application = void 0;
const lodash_1 = require("lodash");
const crypto_1 = __importDefault(require("crypto"));
exports.Application = {
    android: {
        APP_VERSION: "248.0.0.17.109",
        APP_VERSION_CODE: "390438563",
        BREADCRUMB_KEY: "iN4$aGr0m",
        FACEBOOK_ANALYTICS_APPLICATION_ID: "567067343352427",
        BLOKS_VERSION_ID: "4ed53fb65180cd94f1ba2b9ea62be383479d3bb84451fad4070bfec2b65785a2",
        CAPABILITIES: "3brTv10=",
        SUPPORTED_CAPABILITIES: '[{"name":"SUPPORTED_SDK_VERSIONS","value":"119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0"},{"name":"FACE_TRACKER_VERSION","value":"14"},{"name":"segmentation","value":"segmentation_enabled"},{"name":"COMPRESSION","value":"ETC2_COMPRESSION"},{"name":"world_tracker","value":"world_tracker_enabled"},{"name":"gyroscope","value":"gyroscope_enabled"}]',
    },
    ios: {
        APP_VERSION: "248.0.0.13.109",
        APP_VERSION_CODE: "389935066",
        BREADCRUMB_KEY: "iN4$aGr0m",
        FACEBOOK_ANALYTICS_APPLICATION_ID: "124024574287414",
        BLOKS_VERSION_ID: "8939191d9c47a35f5d91b65cc119fbe3c215947d6aedc7a4a6945cec0763c43a",
        CAPABILITIES: "36r/F/8=",
        SUPPORTED_CAPABILITIES: '[{"name":"SUPPORTED_SDK_VERSIONS","value":"119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0"},{"name":"FACE_TRACKER_VERSION","value":"14"},{"name":"segmentation","value":"segmentation_enabled"},{"name":"COMPRESSION","value":"ETC2_COMPRESSION"},{"name":"world_tracker","value":"world_tracker_enabled"},{"name":"gyroscope","value":"gyroscope_enabled"}]',
    },
};
class AndroidSession {
    constructor(session) {
        this.igWWWClaim = session.igWWWClaim ? session.igWWWClaim : '0';
        this.authorization = session.authorization;
        this.regionHint = session.regionHint;
        this.shbid = session.shbid;
        this.shbts = session.shbts;
        this.rur = session.rur;
        this.dsUserId = session.dsUserId;
        this.xMid = session.xMid;
        this.userAgent = session.userAgent;
        this.user = session.user;
        this.uid = session.uid;
    }
}
exports.AndroidSession = AndroidSession;
class AndroidState {
    constructor(session, device) {
        this.session = session;
        this.device = device;
        this.application = device.platform === "android" ? exports.Application.android : exports.Application.ios;
    }
    get userAgent() {
        return this.session.userAgent;
    }
    get authorization() {
        if (this.session.authorization) {
            const dt = Buffer.from(this.session.authorization.replace("Bearer IGT:2:", ""), "base64").toString("utf8");
            return JSON.parse(dt);
        }
        return null;
    }
    ;
    get cookies() {
        return this.authorization;
    }
    get sessionid() {
        if (this.session.authorization) {
            const sess = this.authorization;
            return typeof sess.sessionid === "string" ? sess.sessionid : null;
        }
        return null;
    }
    get user() {
        return { u: this.session.user, id: this.session.uid };
    }
    getHeaders() {
        const headers = {
            "X-IG-Bandwidth-Speed-KBPS": `${(0, lodash_1.random)(500, 3000)}.000`,
            "X-IG-Bandwidth-TotalBytes-B": "0",
            "X-IG-Bandwidth-TotalTime-MS": "0",
            "X-Ig-Nav-Chain": "ExploreFragment:explore_popular:4:main_search::,SingleSearchTypeaheadTabFragment:search_typeahead:5:button::",
            "x-ig-eu-dc-enabled": "0",
            "x-bloks-version-id": this.application.BLOKS_VERSION_ID,
            "x-ig-www-claim": this.session.igWWWClaim,
            "x-bloks-is-layout-rtl": this.device.isLayoutRTL.toString(),
            "x-ig-device-id": this.device.device_id,
            "x-ig-family-device-id": this.device.familyId,
            "x-ig-timezone-offset": this.device.timezoneOffset,
            "x-ig-connection-type": "WiFi",
            "x-ig-capabilities": this.application.CAPABILITIES,
            "x-ig-app-id": this.application.FACEBOOK_ANALYTICS_APPLICATION_ID,
            priority: "u=3",
            "user-agent": this.userAgent,
            "accept-language": this.device.language.replace("_", "-"),
            authorization: this.session.authorization,
            "x-mid": this.session.xMid,
            "ig-u-ig-direct-region-hint": this.session.regionHint,
            "ig-u-shbid": this.session.shbid,
            "ig-u-shbts": this.session.shbts,
            "ig-u-ds-user-id": this.session.dsUserId,
            "ig-u-rur": this.session.rur,
            "ig-intended-user-id": this.session.dsUserId,
            "x-ig-app-locale": this.device.platform == "android" ? this.device.language.replace("-", "_") : this.device.language.split("-")[0],
            "x-ig-app-startup-country": "LT",
            "x-ig-device-locale": this.device.platform == "android" ? this.device.language.replace("-", "_") : this.device.language.split("-")[0],
            "x-ig-mapped-locale": this.device.language.replace("-", "_"),
            "x-pigeon-session-id": this.pigeonSessionId(),
            "x-pigeon-rawclienttime": this.device.platform == "android" ? (Date.now() / 1000).toFixed(3) : (Date.now() / 1000).toFixed(6),
            "x-fb-http-engine": "Liger",
            "x-fb-client-ip": "True",
            "x-fb-server-cluster": "True",
            "accept-encoding": "gzip, deflate",
            "x-ig-android-id": typeof this.device.androidId !== "undefined" ? this.device.androidId : "",
        };
        if (this.device.platform != "android") {
            delete headers["x-ig-android-id"];
        }
        return headers;
    }
    getProxy() {
        return this.device.proxy;
    }
    pigeonSessionId() {
        const guid = crypto_1.default.randomUUID();
        if (this.device.platform == "android") {
            return `UFS-${guid}-0`;
        }
        else {
            return guid;
        }
    }
    extractUserId() {
        if (this.session.dsUserId) {
            return this.session.dsUserId;
        }
        return "";
    }
    xMid() {
        return this.session.xMid || null;
    }
}
exports.AndroidState = AndroidState;
//# sourceMappingURL=state.js.map