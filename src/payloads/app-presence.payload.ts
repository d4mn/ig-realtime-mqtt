export interface AppPresenceEventPayload {
  presence_event: AppPresenceEvent;
}

export interface AppPresenceEvent {
  user_id: string;
  is_active: boolean;
  last_activity_at_ms: string;
  in_threads: any[];
}
