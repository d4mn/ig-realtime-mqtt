export abstract class RealtimeTopic {
  abstract SubIris: string;
  abstract SubIrisResponse: string;
  abstract MessageSync: string;
  abstract SendMessage: string;
  abstract SendMessageResponse: string;
  abstract RealtimeSub: string;
  abstract Pubsub: string;
  abstract ForegroundState: string;
  abstract GraphQl: string;
  abstract RegionHint: string;

  decode(value: string) {
    return Object.entries(this).find(([, v]) => v === value)?.[0] ?? value;
  }
}
