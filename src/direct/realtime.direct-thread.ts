import { URL_REGEXP } from '../constants';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { DirectItemAckResponse, TypingStatus } from '../types';
import { IgCommandFailedError } from '../errors';
import { RealtimeTopic } from '../realtime.topic';
import { RealtimeRequest } from '../realtime.request';
import { ThreadItemType } from './thread-item-type';
import { DirectThreadOptions } from './direct-thread-options';
import { DirectThreadEvent } from './direct-thread.event';
import { directObservablesFacadeMixin } from './direct-observables-facade.mixin';

export class RealtimeDirectThread {
  public constructor(
    public readonly $: Observable<DirectThreadEvent>,
    private readonly options: DirectThreadOptions,
    private readonly topic: RealtimeTopic,
    private readonly request: RealtimeRequest,
  ) {
    directObservablesFacadeMixin(this);
    console.log(URL_REGEXP);
  }

  public async sendItem(options: { item_type: ThreadItemType } & any) {
    return this.execute({
      is_shh_mode: '0',
      ...options,
      action: 'send_item',
    });
  }

  public async sendHashtag(options: { text?: string; hashtag: string }) {
    return this.sendItem({
      text: '',
      item_id: options.hashtag,
      ...options,
      item_type: ThreadItemType.Hashtag,
    });
  }

  public async sendLike() {
    return this.sendItem({
      item_type: ThreadItemType.Like,
    });
  }

  public async sendLocation(options: { text?: string; venue_id: string }) {
    return this.sendItem({
      text: '',
      item_id: options.venue_id,
      ...options,
      item_type: ThreadItemType.Location,
    });
  }

  public async sendMedia(options: { text?: string; media_id: string }) {
    return this.sendItem({
      text: '',
      ...options,
      item_type: ThreadItemType.MediaShare,
    });
  }

  public async sendProfile(options: { text?: string; profile_user_id: string }) {
    return this.sendItem({
      item_id: options.profile_user_id,
      text: '',
      ...options,
      itemType: 'profile',
    });
  }

  public async sendReaction(options: {
    item_id: string;
    reaction_status?: 'created' | 'deleted';
    target_item_type?: ThreadItemType | string;
    emoji?: string; // defaults to ❤
  }) {
    return this.sendItem({
      reaction_status: 'created',
      target_item_type: ThreadItemType.Text,
      ...options,
      action: 'send_item',
      item_type: ThreadItemType.Reaction,
      node_type: 'item',
      reaction_type: 'like',
      reaction_action_source: 'double_tap',
    });
  }

  public async sendUserStory(options: { text?: string; media_id: string }) {
    return this.sendItem({
      text: '',
      item_id: options.media_id,
      ...options,
      item_type: ThreadItemType.ReelShare,
    });
  }

  public async sendText(options: { text: string; skipUrlCheck?: boolean }) {
    if (!options.skipUrlCheck) {
      const urls = options.text.match(URL_REGEXP);
      if (urls instanceof Array) {
        return this.sendLink({ link_urls: urls, link_text: options.text });
      }
    }
    return this.sendItem({
      ...options,
      item_type: ThreadItemType.Text,
    });
  }

  public async sendLink(options: { link_text: string; link_urls: string[] }) {
    return this.sendItem({
      ...options,
      item_type: ThreadItemType.Link,
      link_urls: JSON.stringify(options.link_urls),
    });
  }

  public async markAsSeen(options: { item_id: string }) {
    return this.execute({
      ...options,
      action: 'mark_seen',
    });
  }

  public markVisualItemSeen(options: { itemId: string }) {
    return this.execute({
      item_ids: JSON.stringify([options.itemId]),
      action: 'mark_visual_item_seen',
      // hard coded ?!
      target_item_type: 'voice_media',
    });
  }

  public async indicateActivity(options: { activity_status?: TypingStatus }) {
    return this.execute({
      activity_status: TypingStatus.Text,
      ...options,
      action: 'indicate_activity',
    });
  }

  private async execute(options: any): Promise<DirectItemAckResponse> {
    const clientContext = options.client_context ?? randomUUID();
    const json = JSON.stringify({
      client_context: clientContext,
      offline_threading_id: clientContext,
      // TODO
      // device_id: this.ig.state.cookies.value('ig_did'),
      ...this.options,
      ...options,
    });
    const response = await this.request.execute<DirectItemAckResponse>({
      topic: this.topic.SendMessage,
      responseTopic: this.topic.SendMessageResponse,
      payload: json,
      transformer: buffer => JSON.parse(buffer.toString()),
    });
    if (response.status !== 'ok') {
      // the payload is different in case of an error
      throw new IgCommandFailedError(response.payload as any, Number(response.status_code), response.status);
    }
    return response;
  }
}
