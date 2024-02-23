import { random } from "lodash";
import crypto from "crypto";

export type ILauncherMobileConfig = {
  unit_type: string;
  query_hash: string;
};

export const Application = {
  android: {
    APP_VERSION: "248.0.0.17.109",
    APP_VERSION_CODE: "390438563",
    BREADCRUMB_KEY: "iN4$aGr0m",
    FBNS_APP_ID: "567310203415052",
    FACEBOOK_ANALYTICS_APPLICATION_ID: "567067343352427",
    BLOKS_VERSION_ID: "4ed53fb65180cd94f1ba2b9ea62be383479d3bb84451fad4070bfec2b65785a2",
    CAPABILITIES: "3brTv10=",
    SUPPORTED_CAPABILITIES:
      [{"name":"SUPPORTED_SDK_VERSIONS","value":"119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0"},{"name":"FACE_TRACKER_VERSION","value":"14"},{"name":"segmentation","value":"segmentation_enabled"},{"name":"COMPRESSION","value":"ETC2_COMPRESSION"},{"name":"world_tracker","value":"world_tracker_enabled"},{"name":"gyroscope","value":"gyroscope_enabled"}],
  },
  ios: {
    APP_VERSION: "289.1.0.21.50",
    APP_VERSION_CODE: "489311218",
    BREADCRUMB_KEY: "iN4$aGr0m",
    FBNS_APP_ID: "567310203415052",
    FACEBOOK_ANALYTICS_APPLICATION_ID: "124024574287414",
    BLOKS_VERSION_ID: "e92613e69e71e8b94426ead31b44d42a54f338aa63787dcdd2df4bd869af3cc4",
    CAPABILITIES: "36r/F/8=",
    SUPPORTED_CAPABILITIES:
    [{"name":"hair_segmentation","value":"hair_segmentation_enabled"},{"name":"body_tracking","value":"body_tracking_enabled"},{"name":"GYROSCOPE","value":"GYROSCOPE_ENABLED"},{"name":"SUPPORTED_SDK_VERSIONS","value":"131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0"},{"name":"COMPRESSION","value":"PVR_COMPRESSION"},{"name":"FACE_TRACKER_VERSION","value":"14"}],
  },
};

export class AndroidSession {
  igWWWClaim?: string;
  authorization?: string;
  regionHint?: string;
  shbid?: string;
  shbts?: string;
  rur?: string;
  dsUserId?: string;
  xMid?: string;
  userAgent?: string;
  user?: string;
  uid?: number;
  fbnsAuth?: {
    ck?: number;
    cs?: string;
    di?: string;
    ds?: string;
    sr?: string;
    rc?: string;
  };

  constructor(session: any) {
    this.igWWWClaim = session.igWWWClaim ? session.igWWWClaim : "0";
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
    this.fbnsAuth = session.fbnsAuth;
  }
}

export class AndroidState {
  session: AndroidSession;
  application: typeof Application.android;
  device: any;
  checkpoint?: string;
  challengePath?: string;

  constructor(session: any, device: any) {
    this.session = session;
    this.device = device;
    this.application = device.platform === "android" ? Application.android : Application.ios;
  }

  public get userAgent() {
    let ua = this.session.userAgent;
    if(typeof ua !== 'undefined' && ua != "") {
      ua = ua.replace(/\b\d+(\.\d+){3,}\b/, this.application.APP_VERSION);
      ua = ua.replace(/;\s(\d+)\)/, `; ${this.application.APP_VERSION_CODE})`);
    }
    return ua;
  }

  public get deviceDescriptor(): string {
    if (!this.userAgent) return "";
    const matches = this.userAgent.match(/\((.*?)\)/);

    // Check if there are matches and return the first group if found
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return "";
  }

  public get authorization() {
    if (this.session.authorization) {
      const dt = Buffer.from(this.session.authorization.replace("Bearer IGT:2:", ""), "base64").toString("utf8");
      return JSON.parse(dt);
    }
    return null;
  }

  public get cookies() {
    return this.authorization;
  }

  public get sessionid() {
    if (this.session.authorization) {
      const sess = this.authorization;
      return typeof sess.sessionid === "string" ? sess.sessionid : null;
    }
    return null;
  }

  public get user() {
    return { u: this.session.user, id: this.session.uid };
  }

  public getHeaders() {
    const nextYear = Math.floor(Date.now() / 1000) + 31536000;
    const headers = {
      "X-IG-Bandwidth-Speed-KBPS": `${random(2500000, 3000000) / 1000}`,
      "X-IG-Bandwidth-TotalBytes-B": `${random(5000000, 90000000)}`,
      "X-IG-Bandwidth-TotalTime-MS": `${random(2000, 9000)}`,
      "X-Ig-Nav-Chain": "ExploreFragment:explore_popular:4:main_search::,SingleSearchTypeaheadTabFragment:search_typeahead:5:button::",
      "x-ig-eu-dc-enabled": "0",
      "x-bloks-version-id": this.application.BLOKS_VERSION_ID,
      "x-ig-www-claim": this.session.igWWWClaim,
      "x-bloks-is-layout-rtl": "false",
      "X-Bloks-Is-Panorama-Enabled": "true",
      "X-IG-SALT-IDS": `${random(1061162222, 1061262222)}`,
      "x-ig-device-id": this.device.device_id,
      "x-ig-family-device-id": this.device.familyId,
      "x-ig-timezone-offset": this.device.timezoneOffset,
      "x-ig-connection-type": "WIFI",
      "x-ig-capabilities": this.application.CAPABILITIES,
      "x-ig-app-id": this.application.FACEBOOK_ANALYTICS_APPLICATION_ID,
      priority: "u=3",
      "user-agent": this.userAgent,
      "accept-language": this.device.language.replace("_", "-"),
      authorization: this.session.authorization,
      "x-mid": this.session.xMid,
      "ig-u-ig-direct-region-hint": this.session.regionHint != "" ? this.session.regionHint : `RVA,${this.session.dsUserId},${nextYear},01f7eb128273f709612a35071025d7ea83f20f178201319a2e0ca30c3c555fffbb41a7ee`,
      "ig-u-shbid": this.session.shbid,
      "ig-u-shbts": this.session.shbts,
      "ig-u-ds-user-id": this.session.dsUserId,
      "ig-u-rur": this.session.rur,
      "ig-intended-user-id": this.session.dsUserId,
      "x-ig-app-locale": this.device.platform == "android" ? this.device.language.replace("-", "_") : this.device.language.split("-")[0],
      "x-ig-app-startup-country": this.device.language.split("-")[1],
      "x-ig-device-locale": this.device.platform == "android" ? this.device.language.replace("-", "_") : this.device.language.split("-")[0],
      "x-ig-mapped-locale": this.device.language.replace("-", "_"),
      "x-pigeon-session-id": this.pigeonSessionId(),
      "x-pigeon-rawclienttime": this.device.platform == "android" ? (Date.now() / 1000).toFixed(3) : (Date.now() / 1000).toFixed(6),
      "x-fb-http-engine": "Liger",
      "x-fb-client-ip": "True",
      "x-fb-server-cluster": "True",
      "x-fb-connection-type": "WIFI",
      "accept-encoding": "gzip, deflate",
      "x-ig-android-id": typeof this.device.androidId !== "undefined" ? this.device.androidId : "",
    };
    if (this.device.platform != "android") {
      delete headers["x-ig-android-id"];
    }
    return headers;
  }

  public getProxy() {
    return this.device.proxy;
  }

  public pigeonSessionId() {
    const guid = crypto.randomUUID();
    if (this.device.platform == "android") {
      return `UFS-${guid}-0`;
    } else {
      return guid;
    }
  }

  public extractUserId(): string {
    if (this.session.dsUserId) {
      return this.session.dsUserId;
    }
    return "";
  }

  xMid() {
    return this.session.xMid || null;
  }
}
