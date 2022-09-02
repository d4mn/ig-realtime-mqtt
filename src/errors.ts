import { CustomError } from 'ts-custom-error';
import { DirectItemAckResponseErrorPayload } from './types';

export class IgCommandFailedError extends CustomError {
  constructor(public payload: DirectItemAckResponseErrorPayload, public statusCode: number, public status: string) {
    super(`${statusCode} - ${payload.message || payload.client_facing_error_message}`);
  }
}

export class IgRequestTimedOutError extends CustomError {
  constructor(public requestingTopic: string, public receivingTopic: string) {
    super(`After requesting on ${requestingTopic} and waiting, a response on ${receivingTopic} could not be received.`);
  }
}
