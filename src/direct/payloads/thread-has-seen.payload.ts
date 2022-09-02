export interface ThreadHasSeenPayload {
  user_id: string;
  item_id: string;
  shh_seen_state: Record<string, unknown>;
}
