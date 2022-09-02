import { thriftTypes } from "@igpapi/mqttot";

export type ILauncherMobileConfig = {
  unit_type: string;
  query_hash: string;
};

export const Application = {
  android: {
    APP_VERSION: "248.0.0.17.109",
    APP_VERSION_CODE: "390438563",
    BREADCRUMB_KEY: "iN4$aGr0m",
    FACEBOOK_ANALYTICS_APPLICATION_ID: "567067343352427",
    BLOKS_VERSION_ID: "4ed53fb65180cd94f1ba2b9ea62be383479d3bb84451fad4070bfec2b65785a2",
    CAPABILITIES: "3brTv10=",
    SUPPORTED_CAPABILITIES:
      '[{"name":"SUPPORTED_SDK_VERSIONS","value":"119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0"},{"name":"FACE_TRACKER_VERSION","value":"14"},{"name":"segmentation","value":"segmentation_enabled"},{"name":"COMPRESSION","value":"ETC2_COMPRESSION"},{"name":"world_tracker","value":"world_tracker_enabled"},{"name":"gyroscope","value":"gyroscope_enabled"}]',
  },
  ios: {
    APP_VERSION: "248.0.0.13.109",
    APP_VERSION_CODE: "389935066",
    BREADCRUMB_KEY: "iN4$aGr0m",
    FACEBOOK_ANALYTICS_APPLICATION_ID: "124024574287414",
    BLOKS_VERSION_ID: "8939191d9c47a35f5d91b65cc119fbe3c215947d6aedc7a4a6945cec0763c43a",
    CAPABILITIES: "36r/F/8=",
    SUPPORTED_CAPABILITIES:
      '[{"name":"SUPPORTED_SDK_VERSIONS","value":"119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0"},{"name":"FACE_TRACKER_VERSION","value":"14"},{"name":"segmentation","value":"segmentation_enabled"},{"name":"COMPRESSION","value":"ETC2_COMPRESSION"},{"name":"world_tracker","value":"world_tracker_enabled"},{"name":"gyroscope","value":"gyroscope_enabled"}]',
  },
};

export class AndroidSession {
  igWWWClaim?: string;
  authorization?: string;
  passwordEncryptionPubKey?: string;
  passwordEncryptionKeyId?: string;
  regionHint?: string;
  shbid?: string;
  shbts?: string;
  rur?: string;
  dsUserId?: string;
  xMid?: string;
  userAgent?: string;
  user?: string;
  uid?: number;

  constructor(session: any) {
    this.igWWWClaim = session.igWWWClaim;
    this.authorization = session.authorization;
    this.passwordEncryptionPubKey = session.passwordEncryptionPubKey;
    this.passwordEncryptionKeyId = session.passwordEncryptionKeyId;
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

export class AndroidState {
  session: AndroidSession;
  application: typeof Application.android;
  device: any;

  constructor(session: any, device: any) {
    this.session = session;
    this.device = device;
    this.application = device.platform === "android" ? Application.android : Application.ios;
  }

  public get userAgent() {
    return this.session.userAgent;
  }

  public get cookies() {
    if (this.session.authorization) {
      return JSON.parse(atob(this.session.authorization.replace("Bearer IGT:2:", "")));
    }
    return null;
  }

  public get user() {
    return { u: this.session.user, id: this.session.uid };
  }

  public getProxy() {
    return this.device.proxy;
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
