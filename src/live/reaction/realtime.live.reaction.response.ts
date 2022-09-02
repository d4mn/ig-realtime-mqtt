export declare namespace RealtimeLiveReactionResponse {
  export interface Root {
    client_subscription_id: string;
    broadcast_id: string;
    reaction_unicode: string;
    reactor: Reactor;
  }

  export interface Reactor {
    id: string;
  }
}
