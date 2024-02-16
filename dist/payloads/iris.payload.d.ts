import { RealtimeOperationTypeEnum } from '../realtime-operation.type.enum';
export interface IrisPayload {
    event: 'patch' | string;
    data: Array<{
        path: string;
        op: RealtimeOperationTypeEnum;
        value: string;
    }>;
    message_type: number;
    seq_id: number;
    mutation_token: null | string;
    realtime?: boolean;
    sampled?: boolean;
}
//# sourceMappingURL=iris.payload.d.ts.map