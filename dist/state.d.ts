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
    getProxy(): any;
    extractUserId(): string;
    xMid(): string | null;
}
//# sourceMappingURL=state.d.ts.map