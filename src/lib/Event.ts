import { IMessage } from './IMessage';

export interface IEvent extends IMessage {
  Type: string;
}

export abstract class Event<TEventTypes extends string> implements IEvent {
  constructor(type: TEventTypes, streamId: string) {
    this.Type = type;
    this.StreamId = streamId;
  }
  public readonly Type: TEventTypes;
  public readonly StreamId: string;
}

export type EventData = {
  Type: string;
  Event: IEvent;
  TimeStamp: string;
  Version: number;
};
