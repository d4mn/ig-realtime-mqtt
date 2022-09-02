import { CustomError } from 'ts-custom-error';
import { DirectItemAckResponseErrorPayload } from './types';
export declare class IgCommandFailedError extends CustomError {
    payload: DirectItemAckResponseErrorPayload;
    statusCode: number;
    status: string;
    constructor(payload: DirectItemAckResponseErrorPayload, statusCode: number, status: string);
}
export declare class IgRequestTimedOutError extends CustomError {
    requestingTopic: string;
    receivingTopic: string;
    constructor(requestingTopic: string, receivingTopic: string);
}
//# sourceMappingURL=errors.d.ts.map