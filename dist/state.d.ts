export declare type ILauncherMobileConfig = {
    unit_type: string;
    query_hash: string;
};
export declare const Application: {
    android: {
        APP_VERSION: string;
        APP_VERSION_CODE: string;
        BREADCRUMB_KEY: string;
        FACEBOOK_ANALYTICS_APPLICATION_ID: string;
        BLOKS_VERSION_ID: string;
        CAPABILITIES: string;
        SUPPORTED_CAPABILITIES: string;
    };
    ios: {
        APP_VERSION: string;
        APP_VERSION_CODE: string;
        BREADCRUMB_KEY: string;
        FACEBOOK_ANALYTICS_APPLICATION_ID: string;
        BLOKS_VERSION_ID: string;
        CAPABILITIES: string;
        SUPPORTED_CAPABILITIES: string;
    };
};
export declare class AndroidSession {
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
    constructor(session: any);
}
export declare class AndroidState {
    session: AndroidSession;
    application: typeof Application.android;
    device: any;
    constructor(session: any, device: any);
    get userAgent(): string | undefined;
    get cookies(): any;
    get user(): {
        u: string | undefined;
        id: number | undefined;
    };
    get headers(): {
        "X-IG-Bandwidth-Speed-KBPS": string;
        "X-IG-Bandwidth-TotalBytes-B": string;
        "X-IG-Bandwidth-TotalTime-MS": string;
        "X-Ig-Nav-Chain": string;
        "x-ig-eu-dc-enabled": string;
        "x-bloks-version-id": string;
        "x-ig-www-claim": string | undefined;
        "x-bloks-is-layout-rtl": any;
        "x-ig-device-id": any;
        "x-ig-family-device-id": any;
        "x-ig-timezone-offset": any;
        "x-ig-connection-type": string;
        "x-ig-capabilities": string;
        "x-ig-app-id": string;
        priority: string;
        "user-agent": string | undefined;
        "accept-language": any;
        authorization: string | undefined;
        "x-mid": string | undefined;
        "ig-u-ig-direct-region-hint": string | undefined;
        "ig-u-shbid": string | undefined;
        "ig-u-shbts": string | undefined;
        "ig-u-ds-user-id": string | undefined;
        "ig-u-rur": string | undefined;
        "ig-intended-user-id": string | undefined;
        "x-ig-app-locale": any;
        "x-ig-app-startup-country": string;
        "x-ig-device-locale": any;
        "x-ig-mapped-locale": any;
        "x-pigeon-session-id": string;
        "x-pigeon-rawclienttime": string;
        "x-fb-http-engine": string;
        "x-fb-client-ip": string;
        "x-fb-server-cluster": string;
        "accept-encoding": string;
        "x-ig-android-id": any;
    };
    getProxy(): any;
    pigeonSessionId(): string;
    extractUserId(): string;
    xMid(): string | null;
}
//# sourceMappingURL=state.d.ts.map