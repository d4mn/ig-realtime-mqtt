export interface ForegroundState {
  inForegroundApp?: boolean;
  inForegroundDevice?: boolean;
  keepAliveTimeout?: number;
  subscribeTopics?: string[];
  subscribeGenericTopics?: string[];
  unsubscribeTopics?: string[];
  unsubscribeGenericTopics?: string[];
  requestId?: bigint;
}
