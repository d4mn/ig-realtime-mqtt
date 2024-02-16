export interface DirectItemAckResponse {
    action: string;
    status_code: string;
    payload: DirectItemAckResponsePayload;
    status: string;
}
export interface DirectItemAckResponsePayload {
    client_context: string;
    item_id: string;
    timestamp: string;
    thread_id: string;
}
export interface DirectItemAckResponseErrorPayload {
    client_context: string;
    message: string;
    client_facing_error_message: string;
    is_epd_error?: boolean;
}
export declare enum TypingStatus {
    Off = 0,
    Text = 1,
    Visual = 2
}
export declare type TypedRegex<T extends string> = (input: string) => Record<T, string> | null;
//# sourceMappingURL=types.d.ts.map